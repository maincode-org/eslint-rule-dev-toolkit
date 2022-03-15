import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceNode, ITraceValueReturn } from "../trace-value";

const traceFunctionExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.FunctionExpression) throw `Node type mismatch: Cannot traceFunctionExpression on node of type ${node.type}`;

    // Call the recursion for all nodes in the function body.
    const results = node.body.body.map(innerNode => innerTraceValue(innerNode, context, verify, nodeTrace));

    const unverifiedNode = results.find(result => !result.result.isVerified);
    if (unverifiedNode) {
        return { result: { isVerified: false, determiningNode: unverifiedNode.result.determiningNode }, nodeComponentTrace: { ...node, children: [unverifiedNode.nodeComponentTrace] } };
    } else {
        return { result: { isVerified: true, determiningNode: results[results.length-1].result.determiningNode }, nodeComponentTrace: { ...node, children: results.map(v => v.nodeComponentTrace) } };
    }
}
export default traceFunctionExpression;