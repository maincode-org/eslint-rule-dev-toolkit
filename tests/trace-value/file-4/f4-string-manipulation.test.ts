import { TSESTree } from '@typescript-eslint/utils';
import { ETestFiles, getVarDeclarationByName, targetFileContext } from '../../../src/helpers';
import { traceValue } from '../../../index';

// All tests in this file uses source code from file 'file-4'.
const context = targetFileContext.get(ETestFiles.FILE4);
if (!context) throw 'Unable to find AST for target file.';

const verifierFunction = (node: TSESTree.Node) => node.type === 'Literal';

// Code starts in file-4 at line 60.
describe('String manipulation tests', () => {
  test('Verifying value of str_001', () => {
    const variableName = 'str_001';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe('1');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('BinaryExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(2);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('Literal');
  });

  test('Verifying value of str_002', () => {
    const variableName = 'str_002';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe('2');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('BinaryExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(2);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('BinaryExpression');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('Literal');
  });

  test('Verifying value of str_003', () => {
    const variableName = 'str_003';

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
    expect(nodeComponentTrace.type).toBe('BinaryExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of str_004', () => {
    const variableName = 'str_004';

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
    expect(nodeComponentTrace.type).toBe('BinaryExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of str_005', () => {
    const variableName = 'str_005';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(1);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('TemplateLiteral');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Literal');
  });

  test('Verifying value of str_006', () => {
    const variableName = 'str_006';

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
    expect(nodeComponentTrace.type).toBe('TemplateLiteral');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });
});
