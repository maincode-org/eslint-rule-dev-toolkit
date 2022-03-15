import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceNode, ITraceValueReturn } from "../trace-value";

const traceArrowFunctionExpression = (
    node: TSESTree.Node,
    context: TSESLint.SourceCode,
    verify: (node: TSESTree.Node) => boolean,
    nodeTrace: ITraceNode
): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ArrowFunctionExpression) throw `Node type mismatch: Cannot traceArrowFunctionExpression on node of type ${node.type}`;

    const result = innerTraceValue(node.body, context, verify, nodeTrace);
    return { result: result.result, nodeComponentTrace: { ...node, children: [result.nodeComponentTrace] }};
}
export default traceArrowFunctionExpression;