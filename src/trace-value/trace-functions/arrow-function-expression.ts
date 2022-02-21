import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";

const traceArrowFunctionExpression = (
    node: ESTree.Node,
    context: SourceCode,
    verify: (node: ESTree.Node) => boolean,
    nodeTrace: ESTree.Node[] = []
): ITraceValueReturn => {
    if (node.type !== ENodeTypes.ARROW_FUNCTION_EXPRESSION) throw `Node type mismatch: Cannot traceArrowFunctionExpression on node of type ${node.type}`;
    return traceValue(node.body, context, verify, [...nodeTrace, node]);
}
export default traceArrowFunctionExpression;