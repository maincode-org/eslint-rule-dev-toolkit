import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceNode, ITraceValueReturn } from "../trace-value";

type IExpression = TSESTree.Expression | { type: AST_NODE_TYPES.SpreadElement, argument: TSESTree.Identifier };

const traceArrayExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ArrayExpression) throw `Node type mismatch: Cannot traceArrayExpression on node of type ${node.type}`;

    // Call recursively with each array value.
    const results = node.elements.map(arrValue => {
        const localArrValue = arrValue as IExpression;
        if (!localArrValue) return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: nodeTrace }; // null or undefined values are safe.
        else if (localArrValue.type === AST_NODE_TYPES.SpreadElement) return innerTraceValue(localArrValue.argument, context, verify, nodeTrace);
        else return innerTraceValue(localArrValue, context, verify, nodeTrace);
    });

    const unverifiedNode = results.find(result => !result.result.isVerified);
    if (unverifiedNode) {
        return { result: { isVerified: false, determiningNode: unverifiedNode.result.determiningNode }, nodeComponentTrace: { ...node, children: [unverifiedNode.nodeComponentTrace] } };
    } else {
        return { result: { isVerified: true, determiningNode: results[results.length-1].result.determiningNode }, nodeComponentTrace: { ...node, children: results.map(v => v.nodeComponentTrace) } };
    }
}
export default traceArrayExpression;