import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { ITraceNode, ITraceValueReturn, innerTraceValue } from "../trace-value";

const traceVariableDeclaration = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.VariableDeclaration) throw `Node type mismatch: Cannot traceVariableDeclaration on node of type ${node.type}`;
    if (!node.declarations[0].init) throw "The declaration value of the VariableDeclaration is undefined.";

    const result = innerTraceValue(node.declarations[0].init, context, verify, nodeTrace);
    return { result: result.result, nodeComponentTrace: { ...node, children: [result.nodeComponentTrace] }};
}
export default traceVariableDeclaration;