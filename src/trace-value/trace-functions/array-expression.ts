import ESTree from "estree";
import { SourceCode } from "eslint";
import { makeComponentTrace } from "../../helpers";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";

const traceArrayExpression = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.ARRAY_EXPRESSION) throw `Node type mismatch: Cannot traceArrayExpression on node of type ${node.type}`;
    const arrElements = node.elements;

    // Call recursively with each array value.
    const results = arrElements.map(arrValue => {
        if (!arrValue) return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};
        else if (arrValue.type === ENodeTypes.SPREAD_ELEMENT) return traceValue(arrValue.argument, context, verify, [...nodeTrace, node]);
        else return traceValue(arrValue, context, verify, [...nodeTrace, node]);
    });

    return makeComponentTrace(results);
}
export default traceArrayExpression;