import { TSESTree } from '@typescript-eslint/utils';
import { ETestFiles, getVarDeclarationByName, targetFileContext } from '../../../src/helpers';
import { traceValue } from '../../../index';

// All tests in this file uses source code from file 'file-4'.
const context = targetFileContext.get(ETestFiles.FILE4);
if (!context) throw 'Unable to find AST for target file.';

const verifierFunction = (node: TSESTree.Node) => node.type === 'Literal';

// Code starts in file-4 at line 7.
describe('Simple tests', () => {
  test('Verifying value of sim_001 - the trivial case of a Literal value', () => {
    const variableName = 'sim_001';

    const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result, nodeComponentTrace } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(true);
    expect(result.determiningNode.type).toBe('Literal');
    expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe value');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren).toBeUndefined();
  });

  test('Verifying value of sim_002', () => {
    const variableName = 'sim_002';

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
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of sim_003', () => {
    const variableName = 'sim_003';

    const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result, nodeComponentTrace } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(true);
    expect(result.determiningNode.type).toBe('Literal');
    expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe value1');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren).toBeUndefined();
  });

  test('Verifying value of sim_004', () => {
    const variableName = 'sim_004';

    const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result, nodeComponentTrace } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(true);
    expect(result.determiningNode.type).toBe('Literal');
    expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe value2');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren).toBeUndefined();
  });

  test('Verifying value of sim_005', () => {
    const variableName = 'sim_005';

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
    expect(nodeComponentTrace.type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });
});
