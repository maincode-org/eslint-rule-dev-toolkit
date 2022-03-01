import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { SourceCode } from "eslint";
import { ITraceValueReturn, traceValue} from "../trace-value";

const traceVariableDeclaration = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: TSESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.VariableDeclaration) throw `Node type mismatch: Cannot traceVariableDeclaration on node of type ${node.type}`;
    if (!node.declarations[0].init) throw "The declaration value of the VariableDeclaration is undefined."
    return traceValue(node.declarations[0].init, context, verify, [...nodeTrace, node]);
}
export default traceVariableDeclaration;