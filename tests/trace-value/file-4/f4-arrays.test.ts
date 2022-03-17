import { TSESTree } from "@typescript-eslint/utils";
import { getVarDeclarationByName, ETestFiles, targetFileAST } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = targetFileAST.get(ETestFiles.FILE4);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-4 at line 79.
describe('Array tests', () => {
    test('Verifying value of arr_001', () => {
        const variableName = 'arr_001';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string1');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(2);
    });

    test('Verifying value of arr_002', () => {
        const variableName = 'arr_002';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as TSESTree.Literal).value).toBe(3);

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(3);
    });

    test('Verifying value of arr_003', () => {
        const variableName = 'arr_003';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("CallExpression");
    });

    test('Verifying value of arr_004', () => {
        const variableName = 'arr_004';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("CallExpression");
    });

    test('Verifying value of arr_005', () => {
        const variableName = 'arr_005';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string2');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(2);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[1].type).toBe("Literal");
    });

    test('Verifying value of arr_006', () => {
        const variableName = 'arr_006';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string1');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(2);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[1].type).toBe("Identifier");
    });

    test('Verifying value of arr_007', () => {
        const variableName = 'arr_007';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Identifier");
    });

    test('Verifying value of arr_008', () => {
        const variableName = 'arr_008';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("MemberExpression");
    });

    test('Verifying value of arr_009', () => {
        const variableName = 'arr_009';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("MemberExpression");
    });

    test('Verifying value of arr_010', () => {
        const variableName = 'arr_010';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string1');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("MemberExpression");
    });

    test('Verifying value of arr_011', () => {
        const variableName = 'arr_011';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as TSESTree.Literal).value).toBe(null);

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(2);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[1].type).toBe("Literal");
    });

    test('Verifying value of arr_012', () => {
        const variableName = 'arr_012';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("CallExpression");
    });

    test('Verifying value of arr_013', () => {
        const variableName = 'arr_013';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Literal");
    });

    test('Verifying value of arr_014', () => {
        const variableName = 'arr_014';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("CallExpression");
    });

    test('LIMITATION: Verifying value of arr_015', () => {
      const variableName = 'arr_015';

      const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
      expect(varDeclaration).toBeDefined();
      if (!varDeclaration) return;

      const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
      expect(traceValueResult).toBeDefined();
      if (!traceValueResult) return;

      const { result } = traceValueResult;

      // Analyze result
      expect(result.isVerified).toBe(true);
      expect(result.determiningNode.type).toBe('Literal');
      expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe value1');
    });
});