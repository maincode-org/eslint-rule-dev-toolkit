import ESTree from 'estree';
import { SourceCode } from "eslint";

export type ITraceValueReturn = {
    result: {
        isVerified: boolean,
        determiningNode: ESTree.Node,
    },
    nodeComponentTrace: ESTree.Node[]
}

// const getRecentValueOfIdentifier = (identifier: ESTree.Identifier, srcCode: SourceCode) => {}

// TODO: Change type of context to RuleContext
export const traceValue = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean): ITraceValueReturn => {
    if (node.type === 'Literal') return { result: { isVerified: verify(node), determiningNode: node }, nodeComponentTrace: []};
    if (node.type === 'Identifier'){
        // Look in the nodes scope

        return { result: { isVerified: false, determiningNode: node }, nodeComponentTrace: []};
    }
    else return { result: { isVerified: false, determiningNode: node }, nodeComponentTrace: []};
}