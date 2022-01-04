import ESTree from 'estree';
import { SourceCode } from "eslint";

// TODO: Change type of context to RuleContext
export const traceValue = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean): boolean => {
    if (node.type === 'Literal') return verify(node);
    else return false;
}