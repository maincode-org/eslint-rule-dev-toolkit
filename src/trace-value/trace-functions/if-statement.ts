import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceIfStatement = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.IF_STATEMENT) throw `Node type mismatch: Cannot traceIfStatement on node of type ${node.type}`;

    let consequentResults = [];
    if (node.consequent.type === ENodeTypes.BLOCK_STATEMENT) {
        consequentResults = node.consequent.body.map(n => traceValue(n, context, verify, [...nodeTrace, node]));
    } else {
        consequentResults = [traceValue(node.consequent, context, verify, [...nodeTrace, node])];
    }

    let alternateResults: ITraceValueReturn[] = [];
    if (node.alternate) {
        if (node.alternate.type === ENodeTypes.BLOCK_STATEMENT) {
            alternateResults = node.alternate.body.map(n => traceValue(n, context, verify, [...nodeTrace, node]));
        } else {
            alternateResults = [traceValue(node.alternate, context, verify, [...nodeTrace, node])];
        }
    }

    const results = [...consequentResults, ...alternateResults];

    return makeComponentTrace(results);
}
export default traceIfStatement;