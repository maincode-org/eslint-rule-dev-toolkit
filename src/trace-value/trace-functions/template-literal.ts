import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import {ITraceNode, ITraceValueReturn} from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceTemplateLiteral = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.TemplateLiteral) throw `Node type mismatch: Cannot traceTemplateLiteral on node of type ${node.type}`;

    const expressions = node.expressions;
    const results = expressions.map(e => traceValue(e, context, verify, [...nodeTrace, node]));

    return makeComponentTrace(results);
}
export default traceTemplateLiteral;