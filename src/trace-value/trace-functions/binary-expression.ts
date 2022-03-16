import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceNode, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from '../../helpers';

const traceBinaryExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.BinaryExpression) throw `Node type mismatch: Cannot traceBinaryExpression on node of type ${node.type}`;

    const leftResult = innerTraceValue(node.left, context, verify, nodeTrace);
    const rightResult = innerTraceValue(node.right, context, verify, nodeTrace);

    return makeComponentTrace(node, [leftResult, rightResult]);
}
export default traceBinaryExpression;