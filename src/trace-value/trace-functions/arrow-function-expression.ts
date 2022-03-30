import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { IRuleContext, ITraceValueReturn } from '../trace-value';
import { makeComponentTrace } from '../../helpers';

const traceArrowFunctionExpression = (
    node: TSESTree.Node,
    context: IRuleContext,
    verify: (node: TSESTree.Node) => boolean,
): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ArrowFunctionExpression) throw `Node type mismatch: Cannot traceArrowFunctionExpression on node of type ${node.type}`;

    // If BlockStatement - check all nodes in the block.
    if (node.body.type === AST_NODE_TYPES.BlockStatement) {
        const results = node.params.length > 0
            ? node.body.body.map(innerNode => innerTraceValue(innerNode, context, verify, { functionParams: node.params }))
            : node.body.body.map(innerNode => innerTraceValue(innerNode, context, verify));

        return makeComponentTrace(node, results);
    } else {
        const result = node.params.length > 0
            ? innerTraceValue(node.body, context, verify, { functionParams: node.params })
            : innerTraceValue(node.body, context, verify)

        return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] } };
    }
}
export default traceArrowFunctionExpression;