import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceConditionalExpression = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.CONDITIONAL_EXPRESSION) throw `Node type mismatch: Cannot traceConditionalExpression on node of type ${node.type}`;

    const consequentResult = traceValue(node.consequent, context, verify, [...nodeTrace, node]);
    const alternateResult = traceValue(node.alternate, context, verify, [...nodeTrace, node]);
    const results = [consequentResult, alternateResult];

    return makeComponentTrace(results);
}
export default traceConditionalExpression;