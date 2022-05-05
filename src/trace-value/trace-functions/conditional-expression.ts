import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import { innerTraceValue } from '../../../index';
import { IClosureDetails, IRuleContext, ITraceValueReturn } from '../trace-value';
import { makeComponentTrace } from '../../helpers';

const traceConditionalExpression = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
  if (node.type !== AST_NODE_TYPES.ConditionalExpression) throw `Node type mismatch: Cannot traceConditionalExpression on node of type ${node.type}`;

  const consequentResult = innerTraceValue(node.consequent, context, verify, closureDetails);
  const alternateResult = innerTraceValue(node.alternate, context, verify, closureDetails);

  return makeComponentTrace({ ...node, filename: context.getFilename() }, [consequentResult, alternateResult]);
};
export default traceConditionalExpression;
