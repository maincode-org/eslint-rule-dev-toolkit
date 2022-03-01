import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { SourceCode } from "eslint";
import { makeComponentTrace } from "../../helpers";
import { traceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";

type IExpression = TSESTree.Expression | { type: AST_NODE_TYPES.SpreadElement, argument: TSESTree.Identifier };

const traceArrayExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: TSESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ArrayExpression) throw `Node type mismatch: Cannot traceArrayExpression on node of type ${node.type}`;

    // Call recursively with each array value.
    const results = node.elements.map(arrValue => {
        const localArrValue = arrValue as IExpression;
        if (!localArrValue) return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};
        else if (localArrValue.type === AST_NODE_TYPES.SpreadElement) return traceValue(localArrValue.argument, context, verify, [...nodeTrace, node]);
        else return traceValue(localArrValue, context, verify, [...nodeTrace, node]);
    });

    return makeComponentTrace(results);
}
export default traceArrayExpression;