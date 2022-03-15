import { TSESTree } from "@typescript-eslint/utils";
import { getVarDeclarationByName, targetFileAST, ETestFiles } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = targetFileAST.get(ETestFiles.FILE4);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-4 at line 124.
describe('Mathematical expressions tests', () => {
    test('Verifying value of mat_001', () => {
        const variableName = 'mat_001';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
        expect((result.determiningNode as TSESTree.Literal).value).toBe(2);

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(2);
        expect(nodeComponentTrace.children?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.children?.[1].type).toBe("Literal");
    });

    test('Verifying value of mat_002', () => {
        const variableName = 'mat_002';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("CallExpression");
    });

    test('Verifying value of mat_003', () => {
        const variableName = 'mat_003';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
        expect((result.determiningNode as TSESTree.Literal).value).toBe(2);

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(2);
        expect(nodeComponentTrace.children?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.children?.[1].type).toBe("Literal");
    });

    test('Verifying value of mat_004', () => {
        const variableName = 'mat_004';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("CallExpression");
    });

    test('Verifying value of mat_005', () => {
        const variableName = 'mat_005';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
        expect((result.determiningNode as TSESTree.Literal).value).toBe(2);

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(2);
        expect(nodeComponentTrace.children?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.children?.[1].type).toBe("Literal");
    });

    test('Verifying value of mat_006', () => {
        const variableName = 'mat_006';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("CallExpression");
    });

    test('Verifying value of mat_007', () => {
        const variableName = 'mat_007';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
        expect((result.determiningNode as TSESTree.Literal).value).toBe(2);

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(2);
        expect(nodeComponentTrace.children?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.children?.[1].type).toBe("Literal");
    });

    test('Verifying value of mat_008', () => {
        const variableName = 'mat_008';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("CallExpression");
    });

    test('Verifying value of mat_009', () => {
        const variableName = 'mat_009';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
        expect((result.determiningNode as TSESTree.Literal).value).toBe(3);

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(2);
        expect(nodeComponentTrace.children?.[0].type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.[1].type).toBe("Literal");
    });

    test('Verifying value of mat_010', () => {
        const variableName = 'mat_010';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("CallExpression");
    });

    test('Verifying value of mat_011', () => {
        const variableName = 'mat_011';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
        expect((result.determiningNode as TSESTree.Literal).value).toBe(3);

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(2);
        expect(nodeComponentTrace.children?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.children?.[1].type).toBe("Literal");
    });

    test('Verifying value of mat_012', () => {
        const variableName = 'mat_012';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("CallExpression");
    });
});