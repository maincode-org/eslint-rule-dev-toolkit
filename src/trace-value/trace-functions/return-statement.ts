import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";

const traceReturnStatement = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.RETURN_STATEMENT) throw `Node type mismatch: Cannot traceReturnStatement on node of type ${node.type}`;
    if (!node.argument) throw "The argument of the ReturnStatement is undefined.";
    return traceValue(node.argument, context, verify, [...nodeTrace, node]);
}
export default traceReturnStatement;