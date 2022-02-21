import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceTemplateLiteral = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.TEMPLATE_LITERAL) throw `Node type mismatch: Cannot traceTemplateLiteral on node of type ${node.type}`;

    const expressions = node.expressions;
    const results = expressions.map(e => traceValue(e, context, verify, [...nodeTrace, node]));

    return makeComponentTrace(results);
}
export default traceTemplateLiteral;