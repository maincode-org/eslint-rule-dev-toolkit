import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from '../../helpers';

const traceFunctionExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.FunctionExpression) throw `Node type mismatch: Cannot traceFunctionExpression on node of type ${node.type}`;

    // Call the recursion for all nodes in the function body.
    const results = node.body.body.map(innerNode => innerTraceValue(innerNode, context, verify));

    return makeComponentTrace(node, results);
}
export default traceFunctionExpression;