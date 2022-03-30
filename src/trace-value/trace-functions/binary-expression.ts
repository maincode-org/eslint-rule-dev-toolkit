import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { IClosureDetails, IRuleContext, ITraceValueReturn } from '../trace-value';
import { makeComponentTrace } from '../../helpers';

const traceBinaryExpression = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.BinaryExpression) throw `Node type mismatch: Cannot traceBinaryExpression on node of type ${node.type}`;

    const leftResult = innerTraceValue(node.left, context, verify, closureDetails);
    const rightResult = innerTraceValue(node.right, context, verify, closureDetails);

    return makeComponentTrace({ ...node, filename: context.getFilename() }, [leftResult, rightResult]);
}
export default traceBinaryExpression;