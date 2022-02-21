import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceLogicalExpression = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.LOGICAL_EXPRESSION) throw `Node type mismatch: Cannot traceLogicalExpression on node of type ${node.type}`;

    const leftResult = traceValue(node.left, context, verify, [...nodeTrace, node]);
    const rightResult = traceValue(node.right, context, verify, [...nodeTrace, node]);
    const results = [leftResult, rightResult];

    return makeComponentTrace(results);
}
export default traceLogicalExpression;