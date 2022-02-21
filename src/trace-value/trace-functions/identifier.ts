import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";
import { analyzeIdentifierNode } from "../../helpers";

const traceIdentifier = (
    node: ESTree.Node,
    context: SourceCode,
    verify: (node: ESTree.Node) => boolean,
    nodeTrace: ESTree.Node[] = []
): ITraceValueReturn => {
    if (node.type !== ENodeTypes.IDENTIFIER) throw `Node type mismatch: Cannot traceIdentifier on node of type ${node.type}`;
    return traceValue(analyzeIdentifierNode(node), context, verify, [...nodeTrace, node]);
}
export default traceIdentifier;