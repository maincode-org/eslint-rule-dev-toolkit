import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { getVarDeclarationByName } from '../../src/helpers';
import { traceValue } from '../../src';
import fs from 'fs';

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

const rule = createRule({
  create(context) {
    return {
      VariableDeclaration(node) {
        const variableName = 'sim_001';

        const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result } = traceValueResult;

        if (!result) {
          context.report({
            messageId: 'mockRule',
            node: node,
            data: result,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: false,
      description:
        'Mock rule',
    },
    messages: {
      mockRule: 'Mock rule',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'Mock rule',
  defaultOptions: []
});

const ruleTester = new ESLintUtils.RuleTester({ parser: "@typescript-eslint/parser", parserOptions: { "ecmaVersion": 2021 }, env: { es6: true } });

describe('Testing RuleTester',() => {
  ruleTester.run('my-rule', rule, {
    valid: [{ code: fs.readFileSync('tests/trace-value/target-files/file-4.js', 'utf8') }],
    invalid: []
  });
});