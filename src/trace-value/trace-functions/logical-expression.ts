import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceNode, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceLogicalExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.LogicalExpression) throw `Node type mismatch: Cannot traceLogicalExpression on node of type ${node.type}`;

    const leftResult = innerTraceValue(node.left, context, verify, nodeTrace);
    const rightResult = innerTraceValue(node.right, context, verify, nodeTrace);

    return makeComponentTrace(node, [leftResult, rightResult]);
}
export default traceLogicalExpression;