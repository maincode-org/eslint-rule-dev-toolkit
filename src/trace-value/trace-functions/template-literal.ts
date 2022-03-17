import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from '../../helpers';

const traceTemplateLiteral = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.TemplateLiteral) throw `Node type mismatch: Cannot traceTemplateLiteral on node of type ${node.type}`;

    const expressions = node.expressions;
    const results = expressions.map(e => innerTraceValue(e, context, verify));

    return makeComponentTrace(node, results);
}
export default traceTemplateLiteral;