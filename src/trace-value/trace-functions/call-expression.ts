import ESTree from "estree";
import { SourceCode, Linter } from "eslint";
import { readFileSync } from "fs";
import { ENodeTypes, getErrorObj, ITraceValueReturn, traceValue } from "../trace-value";
import estraverse from "estraverse";
import { INodeWithParent } from "../../helpers";

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

    const requireIdentifier: ESTree.Identifier = (((node as INodeWithParent).parent as ESTree.VariableDeclarator).id as ESTree.Identifier);

    // Traverse the new AST and find the export statement matching the requireIdentifier.
    let exportObject = null;

    estraverse.traverse(requireFileAST, {
        enter: function (node: ESTree.Node) {
            if (
                node.type === ENodeTypes.EXPRESSION_STATEMENT &&
                isExpressionExportStatement(node) &&
                exportIncludesIdentifier(node, requireIdentifier)
            ) {
                exportObject = (node.expression as ESTree.AssignmentExpression).right;
            }
        }
    });

    if (!exportObject) throw `Unable to find export exporting identifier with value ${requireIdentifier.name}`;

    // Call the recursive case with the export object on the new AST.
    return traceValue(exportObject, linter.getSourceCode(), verify, [...nodeTrace, node]);
}
export default traceCallExpression;

const isExpressionExportStatement = (node: ESTree.ExpressionStatement) => {
    if (node.expression.type !== ENodeTypes.ASSIGNMENT_EXPRESSION) return false;
    if ((node.expression.left as ESTree.Identifier).name === "exports") return true;
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