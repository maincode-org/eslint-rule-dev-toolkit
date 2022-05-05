import { TSESTree } from '@typescript-eslint/utils';
import { ETestFiles, getVarDeclarationByName, targetFileContext } from '../../src/helpers';
import { traceValue } from '../../index';

// All tests in this file uses source code from file 'file-4'.
const context = targetFileContext.get(ETestFiles.FILE4);
if (!context) throw 'Unable to find AST for target file.';

const verifierFunction = (node: TSESTree.Node) => node.type === 'Literal';

describe('Verifier function tests', () => {
  test('Verify whether the value node is of type Literal on node sim_001', () => {
    const variableName = 'sim_001';

    const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(true);
    expect(result.determiningNode.type).toBe('Literal');
  });

  test('Verify whether the value node is of type Literal, and the literal includes the word strawberry, on node sim_001', () => {
    const variableName = 'sim_001';

    const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const verifier = (node: TSESTree.Node) => node.type === 'Literal' && (node as TSESTree.StringLiteral).value?.includes('strawberry');
    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifier);
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(false);
  });

  test('Verify whether the value node is of type Literal on node sim_002', () => {
    const variableName = 'sim_002';

    const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, (node: TSESTree.Node) => node.type === 'Literal');
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(false);
    expect(result.determiningNode.type).toBe('Identifier');
  });
});
