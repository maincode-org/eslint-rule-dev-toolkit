import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { IClosureDetails, IRuleContext, ITraceValueReturn } from '../trace-value';
import {analyzeIdentifierNode, isIdentifierInParams} from "../../helpers";

const traceIdentifier = (
    node: TSESTree.Node,
    context: IRuleContext,
    verify: (node: TSESTree.Node) => boolean,
    closureDetails?: IClosureDetails
): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.Identifier) throw `Node type mismatch: Cannot traceIdentifier on node of type ${node.type}`;

    // Check if the node is in fact just a reference to a parameter of a function in this closure.
    if (closureDetails && closureDetails.functionParams && isIdentifierInParams(node, closureDetails.functionParams)) {
        return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: node }
    } else {
        const valueOfIdentifier = analyzeIdentifierNode(node, context);

        // If the value of the identifier could not be found return error.
        if (!valueOfIdentifier) return { result: { isVerified: false, determiningNode: node }, nodeComponentTrace: node };
        else {
            const result = innerTraceValue(valueOfIdentifier, context, verify, closureDetails);
            return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] } };
        }
    }
}
export default traceIdentifier;