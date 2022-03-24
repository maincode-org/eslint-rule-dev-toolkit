import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import {IClosureDetails, ITraceValueReturn} from "../trace-value";

const traceReturnStatement = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ReturnStatement) throw `Node type mismatch: Cannot traceReturnStatement on node of type ${node.type}`;
    if (!node.argument) throw "The argument of the ReturnStatement is undefined.";

    const result = innerTraceValue(node.argument, context, verify, closureDetails);
    return { result: result.result, nodeComponentTrace: { ...node, traceChildren: [result.nodeComponentTrace] }};
}
export default traceReturnStatement;