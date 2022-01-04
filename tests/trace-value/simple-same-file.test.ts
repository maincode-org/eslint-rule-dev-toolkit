import ESTree from 'estree';
import estraverse from 'estraverse';
import { Linter, SourceCode } from "eslint";
import { readFileSync } from 'fs';
import { traceValue } from "../../src/trace-value/trace-value";

enum ETestFiles {
  FILE1 = 'file-1',
  FILE2 = 'file-2',
  FILE3 = 'file-3',
  FILE4 = 'file-4',
}

const createSourceCode = (file: ETestFiles): SourceCode => {
  const fileContents = readFileSync('tests/trace-value/target-files/' + file + '.js', 'utf-8');

  // Creating AST
  const linter = new Linter();
  linter.verify(fileContents, { parserOptions: { "ecmaVersion": 2018 }, env: { es6: true } });
  return linter.getSourceCode();
}

const getVarDeclarationByName = (ast: ESTree.Program, variableName: string): ESTree.VariableDeclarator | null => {
  let declarator = null;

  estraverse.traverse(ast, {
    enter: function (node: ESTree.Node) {
      if (node.type === 'VariableDeclaration' && (node.declarations[0].id as ESTree.Identifier).name === variableName) {
        declarator = node.declarations[0];
      }
    }
  });

  return declarator;
};

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('Tracing value of a_001 - the trivial case of a Literal value', () => {
  const variableName = 'a_001';

  // ESLint SourceCode object
  const sourceCode = createSourceCode(ETestFiles.FILE4);

  const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
  // console.log('var decl node', varDeclaration);

  // If the test falls through the bottom - the problem is here.
  const traceValueResult = varDeclaration && varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
  expect(traceValueResult).toBe(true);
});