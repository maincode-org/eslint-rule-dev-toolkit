import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceNode, ITraceValueReturn } from "../trace-value";
import { analyzeIdentifierNode } from "../../helpers";

const traceIdentifier = (
    node: TSESTree.Node,
    context: TSESLint.SourceCode,
    verify: (node: TSESTree.Node) => boolean,
    nodeTrace: ITraceNode
): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.Identifier) throw `Node type mismatch: Cannot traceIdentifier on node of type ${node.type}`;

    const result = innerTraceValue(analyzeIdentifierNode(node, context), context, verify, nodeTrace);
    return { result: result.result, nodeComponentTrace: { ...node, children: [result.nodeComponentTrace] } };
}
export default traceIdentifier;