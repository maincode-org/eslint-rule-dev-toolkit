import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { IClosureDetails, ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from '../../helpers';

type IExpression = TSESTree.Expression | { type: AST_NODE_TYPES.SpreadElement, argument: TSESTree.Identifier };

const traceArrayExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ArrayExpression) throw `Node type mismatch: Cannot traceArrayExpression on node of type ${node.type}`;

    // Call recursively with each array value.
    const results = node.elements.map(arrValue => {
        const localArrValue = arrValue as IExpression;
        if (!localArrValue) return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: node }; // null or undefined values are safe.
        else if (localArrValue.type === AST_NODE_TYPES.SpreadElement) return innerTraceValue(localArrValue.argument, context, verify, closureDetails);
        else return innerTraceValue(localArrValue, context, verify, closureDetails);
    });

    return makeComponentTrace(node, results);
}
export default traceArrayExpression;