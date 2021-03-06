import { TSESTree } from '@typescript-eslint/utils';
import { ETestFiles, getVarDeclarationByName, targetFileContext } from '../../../src/helpers';
import { traceValue } from '../../../index';

// All tests in this file uses source code from file 'file-4'.
const context = targetFileContext.get(ETestFiles.FILE4);
if (!context) throw 'Unable to find AST for target file.';

const verifierFunction = (node: TSESTree.Node) => node.type === 'Literal';

// Code starts in file-4 at line 49.
describe('Object tests', () => {
  test('Verifying value of obj_001', () => {
    const variableName = 'obj_001';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Literal');
  });

  test('Verifying value of obj_002', () => {
    const variableName = 'obj_002';

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
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of obj_003', () => {
    const variableName = 'obj_003';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string2');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(2);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('Literal');
  });

  test('Verifying value of obj_004', () => {
    const variableName = 'obj_004';

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
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of obj_005', () => {
    const variableName = 'obj_005';

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
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of obj_006', () => {
    const variableName = 'obj_006';

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
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('MemberExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of obj_007', () => {
    const variableName = 'obj_007';

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
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of obj_008', () => {
    const variableName = 'obj_008';

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
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of obj_009', () => {
    const variableName = 'obj_009';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string3');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(2);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('ObjectExpression');
  });

  test('Verifying value of obj_010', () => {
    const variableName = 'obj_010';

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
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of obj_011', () => {
    const variableName = 'obj_011';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(null);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('ObjectExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(2);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('Literal');
  });

  test('LIMITATION: Verifying value of obj_012', () => {
    const variableName = 'obj_012';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string2');
  });
});
