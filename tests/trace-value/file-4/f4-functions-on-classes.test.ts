import { TSESTree } from '@typescript-eslint/utils';
import { getVarDeclarationByName, targetFileContext, ETestFiles } from '../../../src/helpers';
import { traceValue } from '../../../index';

// All tests in this file uses source code from file 'file-4'.
const context = targetFileContext.get(ETestFiles.FILE4);
if (!context) throw 'Unable to find AST for target file.';

const verifierFunction = (node: TSESTree.Node) => node.type === 'Literal';

// Code starts in file-4 at line 219.
describe('Functions on classes tests', () => {
  test('Verifying value of fun_027', () => {
    const variableName = 'fun_027';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(' string');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('Literal');
  });

  test('Verifying value of fun_028', () => {
    const variableName = 'fun_028';

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
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of fun_029', () => {
    const variableName = 'fun_029';

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
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[2].type).toBe('Literal');
  });

  test('Verifying value of fun_030', () => {
    const variableName = 'fun_030';

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
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of fun_031', () => {
    const variableName = 'fun_031';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(0);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('Literal');
  });

  test('Verifying value of fun_032', () => {
    const variableName = 'fun_032';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('MemberExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Literal');
  });

  test('Verifying value of fun_033', () => {
    const variableName = 'fun_033';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(5);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('ArrayExpression');
  });

  test('Verifying value of fun_034', () => {
    const variableName = 'fun_034';

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
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of fun_035', () => {
    const variableName = 'fun_035';

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
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of fun_036', () => {
    const variableName = 'fun_036';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(2);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('ArrowFunctionExpression');
    expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].type).toBe('BinaryExpression');
    expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[1].type).toBe('Literal');
  });

  test('Verifying value of fun_037', () => {
    const variableName = 'fun_037';

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
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of fun_038', () => {
    const variableName = 'fun_038';

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
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrowFunctionExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of fun_039', () => {
    const variableName = 'fun_039';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(2);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('ArrowFunctionExpression');
    expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].type).toBe('BinaryExpression');
    expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[1].type).toBe('Literal');
  });

  test('Verifying value of fun_040', () => {
    const variableName = 'fun_040';

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
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of fun_041', () => {
    const variableName = 'fun_041';

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
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrowFunctionExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('BinaryExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of fun_042', () => {
    const variableName = 'fun_042';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(4);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('Literal');
  });

  test('Verifying value of fun_043', () => {
    const variableName = 'fun_043';

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
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });

  test('Verifying value of fun_044', () => {
    const variableName = 'fun_044';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(3);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(1);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
  });

  test('Verifying value of fun_045', () => {
    const variableName = 'fun_045';

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
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.length).toBe(3);
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[2].type).toBe('Literal');
  });

  test('Verifying value of fun_046', () => {
    const variableName = 'fun_046';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe(3);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('MemberExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[1].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[2].type).toBe('Literal');
  });

  test('Verifying value of fun_047', () => {
    const variableName = 'fun_047';

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
    expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string1');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe('Identifier');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Literal');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[1].type).toBe('Literal');
  });

  test('Verifying value of fun_048', () => {
    const variableName = 'fun_048';

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
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe('ArrayExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('CallExpression');
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe('Identifier');
  });
});
