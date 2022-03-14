import {AST_NODE_TYPES, TSESLint, TSESTree} from "@typescript-eslint/utils";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import {ITraceNode, ITraceValueReturn} from "../trace-value";
import { makeComponentTrace } from "../../helpers";

const traceConditionalExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: ITraceNode): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ConditionalExpression) throw `Node type mismatch: Cannot traceConditionalExpression on node of type ${node.type}`;

    const consequentResult = traceValue(node.consequent, context, verify, [...nodeTrace, node]);
    const alternateResult = traceValue(node.alternate, context, verify, [...nodeTrace, node]);
    const results = [consequentResult, alternateResult];

    return makeComponentTrace(results);
}
export default traceConditionalExpression;