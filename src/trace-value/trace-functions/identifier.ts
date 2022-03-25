import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import {IClosureDetails, ITraceNode, ITraceValueReturn} from "../trace-value";
import {analyzeIdentifierNode, isIdentifierInParams} from "../../helpers";

const traceIdentifier = (
    node: TSESTree.Node,
    context: TSESLint.SourceCode,
    verify: (node: TSESTree.Node) => boolean,
    closureDetails?: IClosureDetails
): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.Identifier) throw `Node type mismatch: Cannot traceIdentifier on node of type ${node.type}`;

    // Check if the node is in fact just a reference to a parameter of a function in this closure.
    if (closureDetails && closureDetails.functionParams && isIdentifierInParams(node, closureDetails.functionParams)) {
        return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: node }
    } else {
        const result = innerTraceValue(analyzeIdentifierNode(node, context), context, verify, closureDetails);
        return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] } };
    }
}
export default traceIdentifier;