import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import {IClosureDetails, ITraceValueReturn} from "../trace-value";
import {isIdentifierInParams, makeComponentTrace} from '../../helpers';

const traceArrowFunctionExpression = (
    node: TSESTree.Node,
    context: TSESLint.SourceCode,
    verify: (node: TSESTree.Node) => boolean,
    closureDetails?: IClosureDetails
): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ArrowFunctionExpression) throw `Node type mismatch: Cannot traceArrowFunctionExpression on node of type ${node.type}`;

    // Arguments provided
    if (node.params.length > 0) {
        if (node.body.type !== AST_NODE_TYPES.BinaryExpression) throw "Unable to evaluate safety of ArrowFunctionExpression";

        if (node.body.left.type === AST_NODE_TYPES.Identifier || node.body.right.type === AST_NODE_TYPES.Identifier) {
            const leftResult =
              node.body.left.type === AST_NODE_TYPES.Identifier && isIdentifierInParams(node.body.left, node.params)
                ? { result: { isVerified: true, determiningNode: node.body.left }, nodeComponentTrace: node.body.left }
                : innerTraceValue(node.body.left, context, verify, closureDetails);

            const rightResult =
              node.body.right.type === AST_NODE_TYPES.Identifier && isIdentifierInParams(node.body.right, node.params)
                ? { result: { isVerified: true, determiningNode: node.body.right }, nodeComponentTrace: node.body.right }
                : innerTraceValue(node.body.right, context, verify, closureDetails);

            const binaryExpressionResult = makeComponentTrace(node.body, [leftResult, rightResult]);
            return { result: binaryExpressionResult.result, nodeComponentTrace: { ...node, traceChildren: [binaryExpressionResult.nodeComponentTrace] } };
        } else {
            const result = innerTraceValue(node.body, context, verify, closureDetails);
            return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] } };
        }
    } else { // No arguments
        if (node.body.type === AST_NODE_TYPES.BlockStatement) {
            // Call the recursion for all nodes in the function body.
            const results = node.body.body.map(innerNode => innerTraceValue(innerNode, context, verify, closureDetails));

            return makeComponentTrace(node, results);
        } else {
            const result = innerTraceValue(node.body, context, verify, closureDetails);
            return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] } };
        }
    }
}
export default traceArrowFunctionExpression;