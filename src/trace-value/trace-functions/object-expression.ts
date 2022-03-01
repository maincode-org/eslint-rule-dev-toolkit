import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceObjectExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: TSESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ObjectExpression) throw `Node type mismatch: Cannot traceObjectExpression on node of type ${node.type}`;

    // Call recursively with each value of each property
    const results = node.properties.map(p => {
        return traceValue(
            p.type === AST_NODE_TYPES.SpreadElement ? p.argument : p.value,
            context,
            verify,
            [...nodeTrace, node]
        );
    });

    return makeComponentTrace(results);
}
export default traceObjectExpression;