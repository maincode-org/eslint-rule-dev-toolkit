import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceIfStatement = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: TSESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.IfStatement) throw `Node type mismatch: Cannot traceIfStatement on node of type ${node.type}`;

    let consequentResults = [];
    if (node.consequent.type === AST_NODE_TYPES.BlockStatement) {
        consequentResults = node.consequent.body.map(n => traceValue(n, context, verify, [...nodeTrace, node]));
    } else {
        consequentResults = [traceValue(node.consequent, context, verify, [...nodeTrace, node])];
    }

    let alternateResults: ITraceValueReturn[] = [];
    if (node.alternate) {
        if (node.alternate.type === AST_NODE_TYPES.BlockStatement) {
            alternateResults = node.alternate.body.map(n => traceValue(n, context, verify, [...nodeTrace, node]));
        } else {
            alternateResults = [traceValue(node.alternate, context, verify, [...nodeTrace, node])];
        }
    }

    const results = [...consequentResults, ...alternateResults];

    return makeComponentTrace(results);
}
export default traceIfStatement;