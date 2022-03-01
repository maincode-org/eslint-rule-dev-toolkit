import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

type IExpression = TSESTree.Expression | { type: AST_NODE_TYPES.SpreadElement, argument: TSESTree.Identifier };

// Can only handle new Map().
const traceNewExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: TSESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.NewExpression) throw `Node type mismatch: Cannot traceNewExpression on node of type ${node.type}`;
    if (node.callee.type !== AST_NODE_TYPES.Identifier && (node.callee as unknown as ESTree.Identifier).name !== "Map") throw "New Expression is not a Map";

    const initializationElements = (node.arguments[0] as TSESTree.ArrayExpression).elements as TSESTree.ArrayExpression[];
    // Access the value of every key-value pair.
    const initializationValues = initializationElements.map((mapItem) => mapItem.elements[1]);

    const results = (initializationValues as IExpression[]).map(value => {
        if (!value) return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};
        else if (value.type === AST_NODE_TYPES.SpreadElement) return traceValue(value.argument, context, verify, [...nodeTrace, node]);
        else return traceValue(value, context, verify, [...nodeTrace, node]);
    });

    return makeComponentTrace(results);
}
export default traceNewExpression;