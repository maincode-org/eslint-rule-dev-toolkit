import ESTree from 'estree';
import estraverse from 'estraverse';
import { Linter } from "eslint";
import { readFileSync } from 'fs';

const getIdentifierByName = (ast: ESTree.Program, variableName: string): ESTree.Identifier | null => {
  let identifier = null;

  estraverse.traverse(ast, {
    enter: function (node: ESTree.Node) {
      if (node.type === 'VariableDeclaration' && (node.declarations[0].id as ESTree.Identifier).name === variableName) {
        identifier = node.declarations[0].id;
      }
    }
  });

  return identifier;
};

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('Test of using code from the target files', () => {
  const variableName = 'a_001';
  const fileContents = readFileSync('tests/trace-value/target-files/file-4.js', 'utf-8');

  // Creating AST
  const linter = new Linter();
  linter.verify(fileContents, { parserOptions: { "ecmaVersion": 2018 }, env: { es6: true } });
  const ast = linter.getSourceCode().ast;
  // console.log('ast', ast);
  const identifier = getIdentifierByName(ast, variableName);
  console.log('identifier node', identifier);
});