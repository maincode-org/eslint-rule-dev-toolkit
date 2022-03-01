import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { analyzeIdentifierNode } from "../../helpers";

const traceIdentifier = (
    node: TSESTree.Node,
    context: TSESLint.SourceCode,
    verify: (node: TSESTree.Node) => boolean,
    nodeTrace: TSESTree.Node[] = []
): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.Identifier) throw `Node type mismatch: Cannot traceIdentifier on node of type ${node.type}`;
    return traceValue(analyzeIdentifierNode(node, context), context, verify, [...nodeTrace, node]);
}
export default traceIdentifier;