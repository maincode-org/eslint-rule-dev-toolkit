import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn, getErrorObj } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceFunctionExpression = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.FUNCTION_EXPRESSION) throw `Node type mismatch: Cannot traceFunctionExpression on node of type ${node.type}`;

    // Add the FunctionExpression to the trace.
    const localNodeTrace = [...nodeTrace, node];

    // Call the recursion for all nodes in the function body.
    const results = node.body.body.map(node => {
        if (node.type === ENodeTypes.VARIABLE_DECLARATION) {
            if (!node.declarations[0].init) throw "The declaration value of the VariableDeclaration is undefined."
            return traceValue(node.declarations[0].init, context, verify, [...localNodeTrace, node]);
        }
        else if (node.type === ENodeTypes.RETURN_STATEMENT) {
            return traceValue(node, context, verify, [...localNodeTrace]);
        }
        else if (node.type === ENodeTypes.IF_STATEMENT) {
            return traceValue(node, context, verify, [...localNodeTrace, node]);
        }
        else return getErrorObj(node, localNodeTrace);
    });

    return makeComponentTrace(results);
}
export default traceFunctionExpression;