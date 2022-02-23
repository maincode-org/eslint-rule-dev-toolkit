import ESTree from "estree";
import { SourceCode } from "eslint";
import { traceValue } from "../../index";
import { ENodeTypes, ITraceValueReturn } from "../trace-value";
import { analyzeIdentifierNode } from "../../helpers";

const traceMemberExpression = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type !== ENodeTypes.MEMBER_EXPRESSION) throw `Node type mismatch: Cannot traceMemberExpression on node of type ${node.type}`;

    // Array access
    if (node.computed) {
        // Call recursively with the object and analyze the whole array. Return the analysis of the array.
        return traceValue(node.object, context, verify, [...nodeTrace, node]);
    } else { // Object access
        if (node.object.type !== ENodeTypes.IDENTIFIER) throw "Node type of object is not an Identifier";

        // Find the object being referenced in the MemberExpression.
        const obj = analyzeIdentifierNode(node.object, context) as ESTree.ObjectExpression;

        /**
         * Access the specific member being accessed.
         * It is important to access the specific value here, as calling the recursive case,
         * would result in an analysis of all objects properties (when being caught by the ObjectExpression case)
         */
        const member = obj.properties.find(property => {
            if (property.type === ENodeTypes.SPREAD_ELEMENT) return;
            return (property.key as ESTree.Identifier).name === (node.property as ESTree.Identifier).name;
        });

        if (!member || member.type === ENodeTypes.SPREAD_ELEMENT) throw "The accessed member does not exist on object";

        return traceValue(member.value, context, verify, [...nodeTrace, node]);
    }
}
export default traceMemberExpression;