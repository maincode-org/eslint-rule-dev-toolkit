import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from '../../helpers';

const traceArrowFunctionExpression = (
    node: TSESTree.Node,
    context: TSESLint.SourceCode,
    verify: (node: TSESTree.Node) => boolean,
): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ArrowFunctionExpression) throw `Node type mismatch: Cannot traceArrowFunctionExpression on node of type ${node.type}`;

    // Arguments provided
    if (node.params.length > 0) {
        if (node.body.type !== "BinaryExpression") throw "Unable to evaluate safety";

        const param = node.params[0] as TSESTree.Identifier;

        if (node.body.left.type === "Identifier" || node.body.right.type === "Identifier") {

            const leftResult =
              node.body.left.type === "Identifier" && node.body.left.name === param.name
                ? { result: { isVerified: true, determiningNode: param }, nodeComponentTrace: param }
                : innerTraceValue(node.body.left, context, verify);

            const rightResult =
              node.body.right.type === "Identifier" && node.body.right.name === param.name
                ? { result: { isVerified: true, determiningNode: param }, nodeComponentTrace: param }
                : innerTraceValue(node.body.right, context, verify);

            const binaryExpressionResult = makeComponentTrace(node.body, [leftResult, rightResult]);
            return { result: binaryExpressionResult.result, nodeComponentTrace: { ...node, traceChildren: [binaryExpressionResult.nodeComponentTrace] } };
        } else {
            const result = innerTraceValue(node.body, context, verify);
            return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] } };
        }
    } else { // No arguments
        const result = innerTraceValue(node.body, context, verify);
        return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] } };
    }
}
export default traceArrowFunctionExpression;