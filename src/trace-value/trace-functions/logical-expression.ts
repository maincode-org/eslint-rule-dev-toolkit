import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import { innerTraceValue } from '../../../index';
import { IClosureDetails, IRuleContext, ITraceValueReturn } from '../trace-value';
import { makeComponentTrace } from '../../helpers';

const traceLogicalExpression = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
  if (node.type !== AST_NODE_TYPES.LogicalExpression) throw `Node type mismatch: Cannot traceLogicalExpression on node of type ${node.type}`;

  const leftResult = innerTraceValue(node.left, context, verify, closureDetails);
  const rightResult = innerTraceValue(node.right, context, verify, closureDetails);

  return makeComponentTrace({ ...node, filename: context.getFilename() }, [leftResult, rightResult]);
};
export default traceLogicalExpression;
