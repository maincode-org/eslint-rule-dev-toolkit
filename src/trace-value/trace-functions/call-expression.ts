import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import estraverse from 'estraverse';
import { getErrorObj, IClosureDetails, innerTraceValue, IRuleContext, ITraceValueReturn } from '../trace-value';
import ESTree from 'estree';
import { EFileExtensions, makeComponentTrace, makeContext, stringInEnum } from '../../helpers';

enum EClassWhitelistNodeTypes {
    LITERAL = 'Literal',
    ARRAY = 'ArrayExpression',
    IDENTIFIER = 'Identifier',
}

/**
 * Can only analyze functions on classes and require calls atm.
 */
const traceCallExpression = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.CallExpression) throw `Node type mismatch: Cannot traceCallExpression on node of type ${node.type}`;

    // FUNCTION CALLS ON CLASSES
    if (node.callee.type === AST_NODE_TYPES.MemberExpression) {
        const classInstance = node.callee.object;

        // Check if the class is in the EClassWhitelistNodeTypes enum.
        if (!(stringInEnum(EClassWhitelistNodeTypes, classInstance.type))) return getErrorObj(node, node);

        // Class itself is safe
        const leftResult = innerTraceValue(classInstance, context, verify, closureDetails);

        // Parameter(s) are safe
        const rightResults = node.arguments.map(arg => innerTraceValue(arg, context, verify, closureDetails));

        const results = [leftResult, ...rightResults];
        return makeComponentTrace({ ...node, filename: context.getFilename() }, results);
    }

    // REQUIRE CALLS
    else if (node.callee.type === AST_NODE_TYPES.Identifier && node.callee.name === "require") {
        // Check if argument provided to the require call is a literal.
        if (node.arguments.find(arg => arg.type !== AST_NODE_TYPES.Literal)) throw "Require argument is not of type Literal";

        const callExpressionArgument = node.arguments[0];
        if (callExpressionArgument.type !== AST_NODE_TYPES.Literal) throw "Argument provided to require call is not of type Literal";

        // Find the filename of the import file.
        const sourceFile = (callExpressionArgument as TSESTree.StringLiteral).value.replace('.', '').replace('/', '');
        // Create new context of the import file.
        const newContext = makeContext(sourceFile, EFileExtensions.JAVASCRIPT);

        // This is of type Identifier or ObjectPattern (deconstruction).
        const requireIdentifier = (node.parent as TSESTree.VariableDeclarator).id;

        // Traverse the new AST and find the export value(s) matching the requireIdentifier.
        let exportValues: (TSESTree.Expression | null)[];

        if (requireIdentifier.type === AST_NODE_TYPES.ObjectPattern) {
            exportValues = requireIdentifier.properties.map(p => {
                if (p.type === AST_NODE_TYPES.RestElement) throw "Deconstruction of require includes RestElement."
                if (p.key.type !== AST_NODE_TYPES.Identifier) throw "Deconstruction value's key is not of type Identifier";
                else return findExportValueForIdentifier(newContext.getSourceCode().ast, p.key);
            });
        } else exportValues = [findExportValueForIdentifier(newContext.getSourceCode().ast, requireIdentifier as TSESTree.Identifier)];

        // Call the recursive case, for each export value found, on the new AST.
        if (exportValues.includes(null)) throw `Unable to find export statement exporting identifier(s)`;

        const results = exportValues.map(i => i && innerTraceValue(i, newContext, verify, closureDetails))
            .filter(r => !!r) as ITraceValueReturn[];

        return makeComponentTrace({ ...node, filename: context.getFilename() }, results);
    }

    // NORMAL FUNCTION CALLS
    else if (node.callee.type === AST_NODE_TYPES.Identifier) {
        let rightResults: ITraceValueReturn[] = [];

        const leftResult = innerTraceValue(node.callee, context, verify, closureDetails);

        // If arguments are provided analyze them.
        if (node.arguments.length > 0) {
            rightResults = node.arguments.map(arg => innerTraceValue(arg, context, verify, closureDetails));
        }

        const results = [leftResult, ...rightResults];
        return makeComponentTrace({ ...node, filename: context.getFilename() }, results);
    } else return getErrorObj(node, { ...node, filename: context.getFilename() });
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