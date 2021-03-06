import { TSESTree } from '@typescript-eslint/utils';
import { getVarDeclarationByName, ETestFiles, targetFileContext } from '../../../src/helpers';
import { traceValue } from '../../../index';

// All tests in this file uses source code from file 'file-3'.
const context = targetFileContext.get(ETestFiles.FILE3);
if (!context) throw 'Unable to find AST for target file.';

const verifierFunction = (node: TSESTree.Node) => node.type === 'Literal';

// Code starts in file-3 at line 53.
describe('Logical expression with simple values tests', () => {
  test('Verifying value of log_obj_001', () => {
    const variableName = 'log_obj_001';

    const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result, nodeComponentTrace } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(false);
    expect(result.determiningNode.type).toBe('Identifier');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('ConditionalExpression');
    expect(nodeComponentTrace.filename).toBe('file-3');

    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.[0].filename).toBe('file-3');

    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].filename).toBe('file-3');

    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe('file-4');

    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe('file-4');

    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe('file-4');

    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe('file-4');
  });
});
