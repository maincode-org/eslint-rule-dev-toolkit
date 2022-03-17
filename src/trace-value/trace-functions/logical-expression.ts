import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceLogicalExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.LogicalExpression) throw `Node type mismatch: Cannot traceLogicalExpression on node of type ${node.type}`;

    const leftResult = innerTraceValue(node.left, context, verify);
    const rightResult = innerTraceValue(node.right, context, verify);

    return makeComponentTrace(node, [leftResult, rightResult]);
}
export default traceLogicalExpression;