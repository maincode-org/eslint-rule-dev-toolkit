import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceNode, ITraceValueReturn } from "../trace-value";

const traceConditionalExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ConditionalExpression) throw `Node type mismatch: Cannot traceConditionalExpression on node of type ${node.type}`;

    const consequentResult = innerTraceValue(node.consequent, context, verify, nodeTrace);
    const alternateResult = innerTraceValue(node.alternate, context, verify, nodeTrace);

    const unverifiedNode = [consequentResult, alternateResult].find(result => !result.result.isVerified);
    if (unverifiedNode) {
        return { result: { isVerified: false, determiningNode: unverifiedNode.result.determiningNode }, nodeComponentTrace: { ...node, children: [unverifiedNode.nodeComponentTrace] } };
    } else {
        return { result: { isVerified: true, determiningNode: alternateResult.result.determiningNode }, nodeComponentTrace: { ...node, children: [consequentResult.nodeComponentTrace, alternateResult.nodeComponentTrace] } };
    }
}
export default traceConditionalExpression;