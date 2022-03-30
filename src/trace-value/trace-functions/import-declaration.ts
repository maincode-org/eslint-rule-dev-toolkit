import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { getErrorObj, IClosureDetails, IRuleContext, ITraceValueReturn } from '../trace-value';

/**
 * Development of dynamically setting parserOptions,
 * and having the traceFunctions adapt needs to be done in order for this handler to work.
 */
const traceImportDeclaration = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails): ITraceValueReturn => {
    if (node.type !== AST_NODE_TYPES.ImportDeclaration) throw `Node type mismatch: Cannot traceImportDeclaration on node of type ${node.type}`;

    const sourceFile = node.source.value.replace('.', '').replace('/','');
    console.log('sourceFile', sourceFile);

    return getErrorObj(node, { ...node, filename: context.getFilename() });

    /*
    const fileContents = readFileSync('tests/trace-value/target-files/' + sourceFile + '.js', 'utf-8');

    console.log('fileContents', fileContents);

    // Creating AST
    const linter = new Linter();
    linter.verify(fileContents, { parserOptions: { "ecmaVersion": 2020 }, env: { es6: true } });
    const importFileAST = linter.getSourceCode().ast;

    const importIdentifier = node.specifiers[0].local;

    // Traverse the new ast and find the export of the importIdentifier
    let identifier = null;

    estraverse.traverse(importFileAST, {
        enter: function (node: ESTree.Node) {
            if (node.type === ENodeTypes.EXPORT_NAMED_DECLARATION && node.specifiers[0].local.name === importIdentifier.name) {
                identifier = node.specifiers[0].local;
            }
        }
    });

    if (!identifier) throw "The imported identifier could not be found in import file";

    console.log('identifier', identifier)

    // Call the recursive case on the export
    return traceValue(identifier, linter.getSourceCode(), verify, [...nodeTrace, node]);

     */

    // example - import { obj_001 } - find the export statement and call the recursive case on the identifier/variable declaration/object of identifiers/assignment of the export.
}
export default traceImportDeclaration;