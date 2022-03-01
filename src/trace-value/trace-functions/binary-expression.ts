import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceBinaryExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: TSESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.BinaryExpression) throw `Node type mismatch: Cannot traceBinaryExpression on node of type ${node.type}`;

    const leftResult = traceValue(node.left, context, verify, [...nodeTrace, node]);
    const rightResult = traceValue(node.right, context, verify, [...nodeTrace, node]);
    const results = [leftResult, rightResult];

    return makeComponentTrace(results);
}
export default traceBinaryExpression;