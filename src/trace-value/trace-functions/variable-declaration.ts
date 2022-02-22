import ESTree from "estree";
import { SourceCode } from "eslint";
import {ENodeTypes, ITraceValueReturn, traceValue} from "../trace-value";

const traceVariableDeclaration = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.VARIABLE_DECLARATION) throw `Node type mismatch: Cannot traceVariableDeclaration on node of type ${node.type}`;
    if (!node.declarations[0].init) throw "The declaration value of the VariableDeclaration is undefined."
    return traceValue(node.declarations[0].init, context, verify, [...nodeTrace, node]);
}
export default traceVariableDeclaration;