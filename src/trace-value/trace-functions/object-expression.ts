import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceObjectExpression = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.OBJECT_EXPRESSION) throw `Node type mismatch: Cannot traceObjectExpression on node of type ${node.type}`;
    const objectProperties = node.properties;

    // Call recursively with each value of each property
    const results = objectProperties.map(p => {
        return traceValue(
            p.type === ENodeTypes.SPREAD_ELEMENT ? p.argument : p.value,
            context,
            verify,
            [...nodeTrace, node]
        );
    });

    return makeComponentTrace(results);
}
export default traceObjectExpression;