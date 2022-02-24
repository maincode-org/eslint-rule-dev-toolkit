import ESTree from "estree";
import { SourceCode, Linter, AST } from "eslint";
import { readFileSync } from "fs";
import estraverse from "estraverse";
import { ENodeTypes, getErrorObj, ITraceValueReturn, traceValue } from "../trace-value";
import { INodeWithParent, makeComponentTrace } from "../../helpers";

/**
 * Can only analyze require calls atm.
 */
const traceCallExpression = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.CALL_EXPRESSION) throw `Node type mismatch: Cannot traceCallExpression on node of type ${node.type}`;

    if (!((node.callee as ESTree.Identifier).name === "require")) return getErrorObj(node, nodeTrace);

    // Check if arguments provided to the require call are not literals.
    if (node.arguments.find(arg => arg.type !== "Literal")) throw "Require argument is not of type Literal";

    const sourceFile = ((node.arguments[0] as ESTree.Literal).value as string).replace('.', '').replace('/','');
    const fileContents = readFileSync('tests/trace-value/target-files/' + sourceFile + '.js', 'utf-8');

    // Creating AST
    const linter = new Linter();
    linter.verify(fileContents, { parserOptions: { "ecmaVersion": 2021 }, env: { es6: true } });
    const requireFileAST = linter.getSourceCode().ast;

    // Is of type Identifier or ObjectPattern (deconstruction).
    const requireIdentifier = ((node as INodeWithParent).parent as ESTree.VariableDeclarator).id;

    // Traverse the new AST and find the export value(s) matching the requireIdentifier.
    let exportValues: (ESTree.Expression | null)[];

    if (requireIdentifier.type === ENodeTypes.OBJECT_PATTERN) {
        exportValues = requireIdentifier.properties.map(p => {
            if (p.type === ENodeTypes.REST_ELEMENT) throw "Deconstruction of require includes RestElement."
            if (p.key.type !== ENodeTypes.IDENTIFIER) throw "Deconstruction value's key is not of type Identifier";
            else return findExportValueForIdentifier(requireFileAST, p.key);
        });
    } else exportValues = [findExportValueForIdentifier(requireFileAST, requireIdentifier as ESTree.Identifier)];

    // Call the recursive case, for each export value found, on the new AST.
    if (exportValues.includes(null)) throw `Unable to find export statement exporting identifier(s)`;

    const results = exportValues.map(i => i && traceValue(i, linter.getSourceCode(), verify, [...nodeTrace, node]))
        .filter(r => !!r) as ITraceValueReturn[];

    return makeComponentTrace(results);
}
export default traceCallExpression;

const findExportValueForIdentifier = (AST: AST.Program, identifier: ESTree.Identifier): ESTree.Expression | null => {
    let exportValue = null;

    estraverse.traverse(AST, {
        enter: function (node: ESTree.Node) {
            if (
                node.type === ENodeTypes.EXPRESSION_STATEMENT &&
                isExpressionExportStatement(node) &&
                exportIncludesIdentifier(node, identifier)
            ) {
                exportValue = (node.expression as ESTree.AssignmentExpression).right;
            }
        }
    });

    return exportValue;
}

const isExpressionExportStatement = (node: ESTree.ExpressionStatement): boolean => {
    if (node.expression.type !== ENodeTypes.ASSIGNMENT_EXPRESSION) return false;
    return (node.expression.left as ESTree.Identifier).name === "exports";
}

const exportIncludesIdentifier = (exportValueNode: ESTree.ExpressionStatement, identifier: ESTree.Identifier): boolean => {
    const right = (exportValueNode.expression as ESTree.AssignmentExpression).right;
    if (!(right.type === ENodeTypes.OBJECT_EXPRESSION || right.type === ENodeTypes.IDENTIFIER)) throw "Export value is neither of type object nor identifier."
    if (right.type === ENodeTypes.IDENTIFIER) return right.name === identifier.name;
    else {
        return !!(right as ESTree.ObjectExpression).properties.find(p => {
            if (p.type === ENodeTypes.SPREAD_ELEMENT) throw "Export object includes spread element";
            return (p.key as ESTree.Identifier).name === identifier.name;
        });
    }
}