import ESTree from 'estree';
import { Linter } from "eslint";
import { readFileSync } from 'fs';
import { traceValue } from "../../src/trace-value/trace-value";
import { createSourceCode, getVarDeclarationByName } from "../../src/helpers";

export enum ETestFiles {
  FILE1 = 'file-1',
  FILE2 = 'file-2',
  FILE3 = 'file-3',
  FILE4 = 'file-4',
}

// Used to test a scope test file.
const makeScopeManager = () => {
  const fileContents = readFileSync('tests/trace-value/target-files/scopetest.js', 'utf-8');

  const linter = new Linter();
  linter.verify(fileContents, { parserOptions: { "ecmaVersion": 2018 }, env: { es6: true } });
  return linter.getSourceCode().scopeManager;
}

test('Verifying value of sim_001 - the trivial case of a Literal value', () => {
  const variableName = 'sim_001';

  // ESLint SourceCode object
  const sourceCode = createSourceCode(ETestFiles.FILE4);

  const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
  // console.log('var decl node', varDeclaration);

  const traceValueResult = varDeclaration && varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");

  // const expectedResult: ITraceValueReturn = { result: { isVerified: true, determiningNode: { type: "Literal", value: "A safe value" } }, nodeComponentTrace: []};
  expect(traceValueResult?.result.isVerified).toBe(true);
  expect((traceValueResult?.result.determiningNode as ESTree.SimpleLiteral).type).toBe("Literal");
  expect((traceValueResult?.result.determiningNode as ESTree.SimpleLiteral).value).toBe("A safe value");
});

test('Verifying value of sim_011 - an identifier where the value is a reference to sim_001', () => {
  const variableName = 'sim_011';

  // ESLint SourceCode object
  const sourceCode = createSourceCode(ETestFiles.FILE4);

  const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
  // console.log('var decl node', varDeclaration);

  const traceValueResult = varDeclaration && varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
  expect(traceValueResult?.result.isVerified).toBe(false);
});

test('Verifying value of sco_002', () => {
  const variableName = 'sco_002';

  // ESLint SourceCode object
  const sourceCode = createSourceCode(ETestFiles.FILE4);

  const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
  // console.log('var decl node', varDeclaration);

  const traceValueResult = varDeclaration && varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
  expect(traceValueResult?.result.isVerified).toBe(true);
  expect((traceValueResult?.result.determiningNode as ESTree.SimpleLiteral).type).toBe("Literal");
  expect((traceValueResult?.result.determiningNode as ESTree.SimpleLiteral).value).toBe("inner");
});
