import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import {ITraceNode, ITraceValueReturn} from "../trace-value";

const traceReturnStatement = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ReturnStatement) throw `Node type mismatch: Cannot traceReturnStatement on node of type ${node.type}`;
    if (!node.argument) throw "The argument of the ReturnStatement is undefined.";
    return traceValue(node.argument, context, verify, [...nodeTrace, node]);
}
export default traceReturnStatement;