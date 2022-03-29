import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { innerTraceValue } from "../../index";
import { IClosureDetails, IRuleContext, ITraceValueReturn } from '../trace-value';
import { makeComponentTrace } from "../../helpers";

const traceIfStatement = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.IfStatement) throw `Node type mismatch: Cannot traceIfStatement on node of type ${node.type}`;

    let consequentResults = [];
    if (node.consequent.type === AST_NODE_TYPES.BlockStatement) {
        consequentResults = node.consequent.body.map(n => innerTraceValue(n, context, verify, closureDetails));
    } else {
        consequentResults = [innerTraceValue(node.consequent, context, verify, closureDetails)];
    }

    let alternateResults: ITraceValueReturn[] = [];
    if (node.alternate) {
        if (node.alternate.type === AST_NODE_TYPES.BlockStatement) {
            alternateResults = node.alternate.body.map(n => innerTraceValue(n, context, verify, closureDetails));
        } else {
            alternateResults = [innerTraceValue(node.alternate, context, verify, closureDetails)];
        }
    }

    const results = [...consequentResults, ...alternateResults];

    return makeComponentTrace(node, results);
}
export default traceIfStatement;