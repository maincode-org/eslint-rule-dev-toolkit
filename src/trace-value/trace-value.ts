import ESTree from 'estree';
import { SourceCode } from "eslint";
import { analyzeIdentifierNode, makeNodeComponentTrace } from "../helpers";

export type ITraceValueReturn = {
    result: {
        isVerified: boolean,
        determiningNode: ESTree.Node,
    },
    nodeComponentTrace: ESTree.Node[]
}

// Create 'something went wrong' return object.
const getErrorObj = (node: ESTree.Node, nodeTrace: ESTree.Node[]) => {
    return { result: { isVerified: false, determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};
};

// TODO: Change type of context to RuleContext
export const traceValue = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type === 'Literal') return { result: { isVerified: verify(node), determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};

    else if (node.type === 'Identifier'){
        const identifierValue = analyzeIdentifierNode(node);
        return traceValue(identifierValue, context, verify, [...nodeTrace, node]);
    }

    else if (node.type === 'ObjectExpression') {
        const objectProperties = node.properties;

        // Call recursively with each value of each property
        const results = objectProperties.map(p => {
            if (p.type === "SpreadElement") return getErrorObj(node, nodeTrace);
            else return traceValue(p.value, context, verify, [...nodeTrace, node]);
        });

        // One of the results are not verified.
        const unverifiedNode = results.find(result => !result.result.isVerified);
        if (unverifiedNode) {
            return { result: { isVerified: false, determiningNode: unverifiedNode.result.determiningNode }, nodeComponentTrace: unverifiedNode.nodeComponentTrace};
        // All results are verified
        } else {
            return { result: { isVerified: true, determiningNode: results[results.length-1].result.determiningNode }, nodeComponentTrace: makeNodeComponentTrace(results)};
        }
    }

    else return getErrorObj(node, nodeTrace);
}