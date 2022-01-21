import ESTree from 'estree';
import { SourceCode } from "eslint";
import { analyzeIdentifierNode } from "../helpers";

export type ITraceValueReturn = {
    result: {
        isVerified: boolean,
        determiningNode: ESTree.Node,
    },
    nodeComponentTrace: ESTree.Node[]
}

// TODO: Change type of context to RuleContext
export const traceValue = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean): ITraceValueReturn => {
    if (node.type === 'Literal') return { result: { isVerified: verify(node), determiningNode: node }, nodeComponentTrace: []};
    if (node.type === 'Identifier'){
        const identifierValue = analyzeIdentifierNode(node);
        return traceValue(identifierValue, context, verify);
    }
    else return { result: { isVerified: false, determiningNode: node }, nodeComponentTrace: []};
}