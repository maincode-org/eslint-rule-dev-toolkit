import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { traceValue } from "../../index";
import { ITraceValueReturn } from "../trace-value";
import { analyzeIdentifierNode } from "../../helpers";

const traceMemberExpression = (node: TSESTree.Node, context: TSESLint.SourceCode, verify: (node: TSESTree.Node) => boolean, nodeTrace: TSESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.MemberExpression) throw `Node type mismatch: Cannot traceMemberExpression on node of type ${node.type}`;

    // Array access
    if (node.computed) {
        // Call recursively with the object and analyze the whole array. Return the analysis of the array.
        return traceValue(node.object, context, verify, [...nodeTrace, node]);
    } else { // Object access
        if (node.object.type !== AST_NODE_TYPES.Identifier) throw "Node type of object is not an Identifier";

        // Find the object being referenced in the MemberExpression.
        const identifierValue = analyzeIdentifierNode(node.object, context);

        // Check if the identifier being accessed is from a require/import.
        if (identifierValue.type === AST_NODE_TYPES.CallExpression) return traceValue(identifierValue, context, verify, [...nodeTrace, node]);

        /**
         * At this point the identifierValue is an object.
         * Access the specific member being accessed.
         * It is important to access the specific value here, as calling the recursive case,
         * would result in an analysis of all objects properties (when being caught by the ObjectExpression handler)
         */
        const member = (identifierValue as TSESTree.ObjectExpression).properties.find(property => {
            if (property.type === AST_NODE_TYPES.SpreadElement) return;
            return (property.key as TSESTree.Identifier).name === (node.property as TSESTree.Identifier).name;
        });

        if (!member || member.type === AST_NODE_TYPES.SpreadElement) throw "The accessed member does not exist on object";

        return traceValue(member.value, context, verify, [...nodeTrace, node]);
    }
}
export default traceMemberExpression;