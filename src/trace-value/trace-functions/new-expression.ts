import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

// Can only handle new Map().
const traceNewExpression = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.NEW_EXPRESSION) throw `Node type mismatch: Cannot traceNewExpression on node of type ${node.type}`;
    if (node.callee.type !== ENodeTypes.IDENTIFIER && (node.callee as unknown as ESTree.Identifier).name !== "Map") throw "New Expression is not a Map";

    // My favorite line of code ;-)
    const initializationElements = (node.arguments[0] as unknown as ESTree.ArrayExpression).elements as unknown as ESTree.ArrayExpression[];
    // Access the value of every key-value pair.
    const initializationValues = initializationElements.map((mapItem) => mapItem.elements[1]);

    const results = initializationValues.map(value => {
        if (!value) return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};
        else if (value.type === ENodeTypes.SPREAD_ELEMENT) return traceValue(value.argument, context, verify, [...nodeTrace, node]);
        else return traceValue(value, context, verify, [...nodeTrace, node]);
    });

    return makeComponentTrace(results);
}
export default traceNewExpression;