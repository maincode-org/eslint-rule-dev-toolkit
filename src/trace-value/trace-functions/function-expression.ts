import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { IClosureDetails, IRuleContext, ITraceValueReturn } from '../trace-value';
import { makeComponentTrace } from '../../helpers';

const traceFunctionExpression = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.FunctionExpression) throw `Node type mismatch: Cannot traceFunctionExpression on node of type ${node.type}`;

    // Call the recursion for all nodes in the function body.
    const results = node.params.length > 0
        ? node.body.body.map(innerNode => innerTraceValue(innerNode, context, verify, { functionParams: node.params }))
        : node.body.body.map(innerNode => innerTraceValue(innerNode, context, verify));

    return makeComponentTrace({ ...node, filename: context.getFilename() }, results);
}
export default traceFunctionExpression;