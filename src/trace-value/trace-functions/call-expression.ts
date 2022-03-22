import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { readFileSync } from "fs";
import estraverse from "estraverse";
import { getErrorObj, ITraceValueReturn, innerTraceValue } from "../trace-value";
import ESTree from "estree";
import { makeComponentTrace, stringInEnum } from '../../helpers';

enum EClassWhitelistNodeTypes {
    LITERAL = 'Literal',
    ARRAY = 'ArrayExpression',
    IDENTIFIER = 'Identifier',
}
/**
 * Can only analyze functions on classes and require calls atm.
 */
const traceCallExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.CallExpression) throw `Node type mismatch: Cannot traceCallExpression on node of type ${node.type}`;

    // FUNCTION CALLS ON CLASSES
    if (node.callee.type === "MemberExpression") {
        const classInstance = node.callee.object;

        // Check if the class is in the EClassWhitelistNodeTypes enum.
        if (!(stringInEnum(EClassWhitelistNodeTypes, classInstance.type))) return getErrorObj(node, node);

        // Class itself is safe
        const leftResult = innerTraceValue(classInstance, context, verify);

        // Parameter(s) are safe
        const rightResults = node.arguments.map(arg => innerTraceValue(arg, context, verify));

        const results = [leftResult, ...rightResults];
        return makeComponentTrace(node, results);
    }

    // REQUIRE CALLS
    if (!(node.callee.type === AST_NODE_TYPES.Identifier && node.callee.name === "require")) return getErrorObj(node, node);

    // Check if arguments provided to the require call are not literals.
    if (node.arguments.find(arg => arg.type !== "Literal")) throw "Require argument is not of type Literal";

    const callExpressionArgument = node.arguments[0];
    if (callExpressionArgument.type !== AST_NODE_TYPES.Literal) throw "Argument provided to require call is not of type Literal";
    const sourceFile = (callExpressionArgument as TSESTree.StringLiteral).value.replace('.', '').replace('/','');
    const fileContents = readFileSync('tests/trace-value/target-files/' + sourceFile + '.js', 'utf-8');

    // Creating AST
    const linter = new TSESLint.Linter();
    linter.verify(fileContents, { parserOptions: { "ecmaVersion": 2021 }, env: { es6: true } });
    const requireFileAST = linter.getSourceCode().ast;

    // Is of type Identifier or ObjectPattern (deconstruction).
    const requireIdentifier = (node.parent as TSESTree.VariableDeclarator).id;

    // Traverse the new AST and find the export value(s) matching the requireIdentifier.
    let exportValues: (TSESTree.Expression | null)[];

    if (requireIdentifier.type === AST_NODE_TYPES.ObjectPattern) {
        exportValues = requireIdentifier.properties.map(p => {
            if (p.type === AST_NODE_TYPES.RestElement) throw "Deconstruction of require includes RestElement."
            if (p.key.type !== AST_NODE_TYPES.Identifier) throw "Deconstruction value's key is not of type Identifier";
            else return findExportValueForIdentifier(requireFileAST, p.key);
        });
    } else exportValues = [findExportValueForIdentifier(requireFileAST, requireIdentifier as TSESTree.Identifier)];

    // Call the recursive case, for each export value found, on the new AST.
    if (exportValues.includes(null)) throw `Unable to find export statement exporting identifier(s)`;

    const results = exportValues.map(i => i && innerTraceValue(i, linter.getSourceCode(), verify))
        .filter(r => !!r) as ITraceValueReturn[];

    return makeComponentTrace(node, results);
}
export default traceCallExpression;

const findExportValueForIdentifier = (ast: TSESTree.Program, identifier: TSESTree.Identifier): TSESTree.Expression | null => {
    let exportValue = null;

    const localAST = ast as ESTree.Program;

    estraverse.traverse(localAST, {
        enter: function (node: ESTree.Node | TSESTree.Node) {
            if (
                node.type === AST_NODE_TYPES.ExpressionStatement &&
                isExpressionExportStatement(node) &&
                exportIncludesIdentifier(node, identifier)
            ) {
                exportValue = (node.expression as TSESTree.AssignmentExpression).right;
            }
        }
    });

    return exportValue;
}

const isExpressionExportStatement = (node: TSESTree.ExpressionStatement): boolean => {
    if (node.expression.type !== AST_NODE_TYPES.AssignmentExpression) return false;
    return ((node.expression.left as TSESTree.Identifier).name === "exports");
}

const exportIncludesIdentifier = (exportValueNode: TSESTree.ExpressionStatement, identifier: TSESTree.Identifier): boolean => {
    const right = (exportValueNode.expression as TSESTree.AssignmentExpression).right;
    if (!(right.type === AST_NODE_TYPES.ObjectExpression || right.type === AST_NODE_TYPES.Identifier)) throw "Export value is neither of type object nor identifier."
    if (right.type === AST_NODE_TYPES.Identifier) return right.name === identifier.name;
    else {
        return !!(right as TSESTree.ObjectExpression).properties.find(p => {
            if (p.type === AST_NODE_TYPES.SpreadElement) throw "Export object includes spread element";
            return (p.key as TSESTree.Identifier).name === identifier.name;
        });
    }
}