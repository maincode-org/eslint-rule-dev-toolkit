import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceIfStatement = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.IfStatement) throw `Node type mismatch: Cannot traceIfStatement on node of type ${node.type}`;

    let consequentResults = [];
    if (node.consequent.type === AST_NODE_TYPES.BlockStatement) {
        consequentResults = node.consequent.body.map(n => innerTraceValue(n, context, verify));
    } else {
        consequentResults = [innerTraceValue(node.consequent, context, verify)];
    }

    let alternateResults: ITraceValueReturn[] = [];
    if (node.alternate) {
        if (node.alternate.type === AST_NODE_TYPES.BlockStatement) {
            alternateResults = node.alternate.body.map(n => innerTraceValue(n, context, verify));
        } else {
            alternateResults = [innerTraceValue(node.alternate, context, verify)];
        }
    }

    const results = [...consequentResults, ...alternateResults];

    return makeComponentTrace(node, results);
}
export default traceIfStatement;