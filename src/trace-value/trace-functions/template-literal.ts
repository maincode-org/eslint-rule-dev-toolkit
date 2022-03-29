import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { IClosureDetails, IRuleContext, ITraceValueReturn } from '../trace-value';
import { makeComponentTrace } from '../../helpers';

const traceTemplateLiteral = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.TemplateLiteral) throw `Node type mismatch: Cannot traceTemplateLiteral on node of type ${node.type}`;

    const expressions = node.expressions;
    const results = expressions.map(e => innerTraceValue(e, context, verify, closureDetails));

    return makeComponentTrace(node, results);
}
export default traceTemplateLiteral;