import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import {ITraceNode, ITraceValueReturn} from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceObjectExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ObjectExpression) throw `Node type mismatch: Cannot traceObjectExpression on node of type ${node.type}`;

    // Call recursively with each value of each property
    const results = node.properties.map(p => {
        return innerTraceValue(
          p.type === AST_NODE_TYPES.SpreadElement ? p.argument : p.value,
          context,
          verify,
          nodeTrace
        );
    });

    const unverifiedNode = results.find(result => !result.result.isVerified);
    if (unverifiedNode) {
        return { result: { isVerified: false, determiningNode: unverifiedNode.result.determiningNode }, nodeComponentTrace: { ...node, children: [unverifiedNode.nodeComponentTrace] } };
    } else {
        return { result: { isVerified: true, determiningNode: results[results.length-1].result.determiningNode }, nodeComponentTrace: { ...node, children: results.map(v => v.nodeComponentTrace) } };
    }
}
export default traceObjectExpression;