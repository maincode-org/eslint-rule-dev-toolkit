import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import { innerTraceValue } from '../../../index';
import { getErrorObj, IClosureDetails, IRuleContext, ITraceValueReturn } from '../trace-value';
import { analyzeIdentifierNode } from '../../helpers';

const traceMemberExpression = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
  if (node.type !== AST_NODE_TYPES.MemberExpression) throw `Node type mismatch: Cannot traceMemberExpression on node of type ${node.type}`;

  // Array access
  if (node.computed) {
    // Call recursively with the object and analyze the whole array. Return the analysis of the array.
    const result = innerTraceValue(node.object, context, verify, closureDetails);
    return { result: result.result, nodeComponentTrace: { ...node, filename: context.getFilename(), traceChildren: [result.nodeComponentTrace] } };
  } else {
    // Object access
    if (node.object.type === AST_NODE_TYPES.Identifier) {
      // Find the object being referenced in the MemberExpression.
      const identifierValue = analyzeIdentifierNode(node.object, context);

      // If the value of the identifier could not be found return error.
      if (!identifierValue) return getErrorObj(node, { ...node, filename: context.getFilename() });

      // Check if the identifier being accessed is from a require/import.
      if (identifierValue.type === AST_NODE_TYPES.CallExpression) {
        const result = innerTraceValue(node.object, context, verify, closureDetails);
        return { result: result.result, nodeComponentTrace: { ...node, filename: context.getFilename(), traceChildren: [result.nodeComponentTrace] } };
      }

      /**
       * At this point the identifierValue is an object.
       * Access the specific member being accessed.
       * It is important to access the specific value here, as calling the recursive case,
       * would result in an analysis of all objects properties (when being caught by the ObjectExpression handler)
       */
      const member = (identifierValue as TSESTree.ObjectExpression).properties.find((property) => {
        if (property.type === AST_NODE_TYPES.SpreadElement) return;
        return (property.key as TSESTree.Identifier).name === (node.property as TSESTree.Identifier).name;
      });

      if (!member || member.type === AST_NODE_TYPES.SpreadElement) throw 'The accessed member does not exist on object';

      const result = innerTraceValue(node.object, context, verify, closureDetails);
      return { result: result.result, nodeComponentTrace: { ...node, filename: context.getFilename(), traceChildren: [result.nodeComponentTrace] } };
    } else if (node.object.type === AST_NODE_TYPES.ArrayExpression || node.object.type === AST_NODE_TYPES.Literal) {
      // Member access on arrays and strings depends on safety of the class.
      // Example [1,2,3].length;
      const result = innerTraceValue(node.object, context, verify, closureDetails);
      return { result: result.result, nodeComponentTrace: { ...node, filename: context.getFilename(), traceChildren: [result.nodeComponentTrace] } };
    } else throw 'Class type of the member access not yet implemented';
  }
};
export default traceMemberExpression;
