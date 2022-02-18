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

type IMapItem = [ESTree.Literal, ESTree.Node];

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

    else if (node.type === 'TemplateLiteral') {
        const expressions = node.expressions;
        const results = expressions.map(e => traceValue(e, context, verify, [...nodeTrace, node]));

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

    else if (node.type === "BinaryExpression") {
        const leftResult = traceValue(node.left, context, verify, [...nodeTrace, node]);
        const rightResult = traceValue(node.right, context, verify, [...nodeTrace, node]);
        const results = [leftResult, rightResult];

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

    // Maps
    else if (node.type === "NewExpression") {
        if (node.callee.type !== "Identifier" && (node.callee as unknown as ESTree.Identifier).name !== "Map") throw "New Expression is not a Map";

        // My favorite line of code - so beautiful -.-
        const initializationElements = (node.arguments[0] as unknown as ESTree.ArrayExpression).elements as unknown as ESTree.ArrayExpression[];
        // Access the value of every key value pair.
        const initializationValues = initializationElements.map((mapItem) => mapItem.elements[1]);

        const results = initializationValues.map(value => {
            if (!value) return { result: { isVerified: true, determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};
            else if (value.type === "SpreadElement") return traceValue(value.argument, context, verify, [...nodeTrace, node]);
            else return traceValue(value, context, verify, [...nodeTrace, node]);
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

    else if (node.type === "ConditionalExpression") {
        const consequentResult = traceValue(node.consequent, context, verify, [...nodeTrace, node]);
        const alternateResult = traceValue(node.alternate, context, verify, [...nodeTrace, node]);
        const results = [consequentResult, alternateResult];

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

    /**
     * If the IfStatement is a block analyze all nodes.
     * Else analyze the node.
     */
    else if (node.type === "IfStatement") {
        let consequentResults = [];
        if (node.consequent.type === "BlockStatement") {
            consequentResults = node.consequent.body.map(n => traceValue(n, context, verify, [...nodeTrace, node]));
        } else {
            consequentResults = [traceValue(node.consequent, context, verify, [...nodeTrace, node])];
        }

        let alternateResults: ITraceValueReturn[] = [];
        if (node.alternate) {
            if (node.alternate.type === "BlockStatement") {
                alternateResults = node.alternate.body.map(n => traceValue(n, context, verify, [...nodeTrace, node]));
            } else {
                alternateResults = [traceValue(node.alternate, context, verify, [...nodeTrace, node])];
            }
        }

        const results = [...consequentResults, ...alternateResults];

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

    else if (node.type === "ReturnStatement") {
        if (!node.argument) throw "The argument of the ReturnStatement is undefined.";
        return traceValue(node.argument, context, verify, [...nodeTrace, node]);
    }

    else if (node.type === "ArrowFunctionExpression") return traceValue(node.body, context, verify, [...nodeTrace, node]);

    else if (node.type === "LogicalExpression") {
        const leftResult = traceValue(node.left, context, verify, [...nodeTrace, node]);
        const rightResult = traceValue(node.right, context, verify, [...nodeTrace, node]);
        const results = [leftResult, rightResult];

        /**
         * In the case of an unverified node the trace is only the unverified node's trace.
         * Whereas when all paths are verified, the trace includes all paths.
         */
        const unverifiedNode = results.find(result => !result.result.isVerified);
        if (unverifiedNode) {
            return {
                result: {isVerified: false, determiningNode: unverifiedNode.result.determiningNode},
                nodeComponentTrace: unverifiedNode.nodeComponentTrace
            };
        } else {
            return {
                result: {isVerified: true, determiningNode: results[results.length - 1].result.determiningNode},
                nodeComponentTrace: makeNodeComponentTrace(results)
            };
        }
    }

    else if (node.type === "FunctionExpression") {
        // Add the FunctionExpression to the trace.
        const localNodeTrace = [...nodeTrace, node];

        // Call the recursion for all nodes in the function body.
        const results = node.body.body.map(node => {
            if (node.type === "VariableDeclaration") {
                if (!node.declarations[0].init) throw "The declaration value of the VariableDeclaration is undefined."
                return traceValue(node.declarations[0].init, context, verify, [...localNodeTrace, node]);
            }
            else if (node.type === "ReturnStatement") {
                return traceValue(node, context, verify, [...localNodeTrace]);
            }
            else if (node.type === "IfStatement") {
                return traceValue(node, context, verify, [...localNodeTrace, node]);
            }
            else return getErrorObj(node, localNodeTrace);
        });

        /**
         * In the case of an unverified node the trace is only the unverified node's trace.
         * Whereas when all paths are verified, the trace includes all paths.
         */
        const unverifiedNode = results.find(result => !result.result.isVerified);
        if (unverifiedNode) {
            return {
                result: {isVerified: false, determiningNode: unverifiedNode.result.determiningNode},
                nodeComponentTrace: unverifiedNode.nodeComponentTrace
            };
        } else {
            return {
                result: {isVerified: true, determiningNode: results[results.length - 1].result.determiningNode},
                nodeComponentTrace: makeNodeComponentTrace(results)
            };
        }
    }

    /**
     * A CallExpression is safe if the callee node is safe, and the arguments are safe.
     * This is not quite ready yet.
     */

    /*
    else if (node.type === "CallExpression") {
        const calleeResult = traceValue(node.callee, context, verify, [...nodeTrace, node]);
        const argumentsResults = node.arguments.map(arg => traceValue(arg, context, verify, [...nodeTrace, node]));
        const results = [calleeResult, ...argumentsResults];
     */

        /**
         * In the case of an unverified node the trace is only the unverified node's trace.
         * Whereas when all paths are verified, the trace includes all paths.
         */
        /*
        const unverifiedNode = results.find(result => !result.result.isVerified);
        if (unverifiedNode) {
            return {
                result: {isVerified: false, determiningNode: unverifiedNode.result.determiningNode},
                nodeComponentTrace: unverifiedNode.nodeComponentTrace
            };
        } else {
            return {
                result: {isVerified: true, determiningNode: results[results.length - 1].result.determiningNode},
                nodeComponentTrace: makeNodeComponentTrace(results)
            };
        }
    }
    */

    else return getErrorObj(node, nodeTrace);
}