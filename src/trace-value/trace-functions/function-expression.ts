import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceFunctionExpression = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.FUNCTION_EXPRESSION) throw `Node type mismatch: Cannot traceFunctionExpression on node of type ${node.type}`;

    // Call the recursion for all nodes in the function body.
    const results = node.body.body.map(innerNode => traceValue(innerNode, context, verify, [...nodeTrace, node]));

    return makeComponentTrace(results);
}
export default traceFunctionExpression;