import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import {ITraceValueReturn, innerTraceValue, IClosureDetails} from "../trace-value";

const traceVariableDeclaration = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.VariableDeclaration) throw `Node type mismatch: Cannot traceVariableDeclaration on node of type ${node.type}`;
    if (!node.declarations[0].init) throw "The declaration value of the VariableDeclaration is undefined.";

    const result = innerTraceValue(node.declarations[0].init, context, verify, closureDetails);
    return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] }};
}
export default traceVariableDeclaration;