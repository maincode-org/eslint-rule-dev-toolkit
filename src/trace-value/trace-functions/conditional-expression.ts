import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceNode, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from '../../helpers';

const traceConditionalExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ConditionalExpression) throw `Node type mismatch: Cannot traceConditionalExpression on node of type ${node.type}`;

    const consequentResult = innerTraceValue(node.consequent, context, verify, nodeTrace);
    const alternateResult = innerTraceValue(node.alternate, context, verify, nodeTrace);

    return makeComponentTrace(node, [consequentResult, alternateResult]);
}
export default traceConditionalExpression;