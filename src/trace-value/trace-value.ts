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

    else if (node.type === 'Identifier') {
        const identifierValue = analyzeIdentifierNode(node);
        return traceValue(identifierValue, context, verify, [...nodeTrace, node]);
    }

    else if (node.type === 'ObjectExpression') {
        const objectProperties = node.properties;

        // Call recursively with each value of each property
        const results = objectProperties.map(p => {
            return traceValue(
                p.type === "SpreadElement" ? p.argument : p.value,
                context,
                verify,
                [...nodeTrace, node]
            );
        });

        /**
         * In the case of an unverified node the trace is only the unverified node's trace.
         * Whereas when all paths are verified, the trace includes all paths.
         */
        const unverifiedNode = results.find(result => !result.result.isVerified);
        if (unverifiedNode) {
            return { result: { isVerified: false, determiningNode: unverifiedNode.result.determiningNode }, nodeComponentTrace: unverifiedNode.nodeComponentTrace};
        } else {
            return { result: { isVerified: true, determiningNode: results[results.length-1].result.determiningNode }, nodeComponentTrace: makeNodeComponentTrace(results)};
        }
    }

    // For now only member accessing on objects.
    else if (node.type === 'MemberExpression') {
        // Array access
        if (node.computed) {
            // Call recursively with the object and analyze the whole array. Return the analysis of the array.
            return traceValue(node.object, context, verify, [...nodeTrace, node]);
        } else { // Object access
            if (node.object.type !== 'Identifier') throw "Node type of object is not an Identifier";

            // Find the object being referenced in the MemberExpression.
            const obj = analyzeIdentifierNode(node.object) as ESTree.ObjectExpression;

            /**
             * Access the specific member being accessed.
             * It is important to access the specific value here, as calling the recursive case,
             * would result in an analysis of all objects properties (when being caught by the ObjectExpression case)
             */
            const member = obj.properties.find(property => {
                if (property.type === "SpreadElement") return;
                return (property.key as ESTree.Identifier).name === (node.property as ESTree.Identifier).name
            });

            if (!member || member.type === "SpreadElement") throw "The accessed member does not exist on object";

            return traceValue(member.value, context, verify, [...nodeTrace, node]);
        }
    }

    else if (node.type === "ArrayExpression") {
        const arrElements = node.elements;

        // Call recursively with each value
        const results = arrElements.map(arrValue => {
            if (!arrValue) return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};
            else if (arrValue.type === "SpreadElement") return traceValue(arrValue.argument, context, verify, [...nodeTrace, node]);
            else return traceValue(arrValue, context, verify, [...nodeTrace, node]);
        });

        /**
         * In the case of an unverified node the trace is only the unverified node's trace.
         * Whereas when all paths are verified, the trace includes all paths.
         */
        const unverifiedNode = results.find(result => !result.result.isVerified);
        if (unverifiedNode) {
            return { result: { isVerified: false, determiningNode: unverifiedNode.result.determiningNode }, nodeComponentTrace: unverifiedNode.nodeComponentTrace};
        } else {
            return { result: { isVerified: true, determiningNode: results[results.length-1].result.determiningNode }, nodeComponentTrace: makeNodeComponentTrace(results)};
        }
    }

    else return getErrorObj(node, nodeTrace);
}