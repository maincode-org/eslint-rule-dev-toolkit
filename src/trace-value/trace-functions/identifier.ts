import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceNode, ITraceValueReturn } from "../trace-value";
import { analyzeIdentifierNode } from "../../helpers";

const traceIdentifier = (
    node: TSESTree.Node,
    context: TSESLint.SourceCode,
    verify: (node: TSESTree.Node) => boolean,
): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.Identifier) throw `Node type mismatch: Cannot traceIdentifier on node of type ${node.type}`;

    const result = innerTraceValue(analyzeIdentifierNode(node, context), context, verify);
    return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] } };
}
export default traceIdentifier;