import ESTree from 'estree';

export const traceValue = (node: ESTree.Node): any => {
    if (node.type === 'Literal') return node.value;
}