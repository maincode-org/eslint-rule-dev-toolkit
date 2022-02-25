import ESTree from "estree";
import { ETestFiles, getVarDeclarationByName, IValueNode, targetFileAST } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = targetFileAST.get(ETestFiles.FILE4);
if (!sourceCode) throw "Unable to find AST for target file.";

// Code starts in file-4 at line 60.
describe('String manipulation tests', () => {
    test('Verifying value of str_001', () => {
        const variableName = 'str_001';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as IValueNode).value).toBe('1');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(3);
        expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
        expect(nodeComponentTrace[1].type).toBe("Literal");
        expect(nodeComponentTrace[2].type).toBe("Literal");
    });

    test('Verifying value of str_002', () => {
        const variableName = 'str_002';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as IValueNode).value).toBe('2');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(6);
    });

    test('Verifying value of str_003', () => {
        const variableName = 'str_003';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(2);
        expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
        expect(nodeComponentTrace[1].type).toBe("CallExpression");
    });

    test('Verifying value of str_004', () => {
        const variableName = 'str_004';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(2);
        expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
        expect(nodeComponentTrace[1].type).toBe("CallExpression");
    });

    test('Verifying value of str_005', () => {
        const variableName = 'str_005';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as IValueNode).value).toBe(1);

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(2);
        expect(nodeComponentTrace[0].type).toBe('TemplateLiteral');
        expect(nodeComponentTrace[1].type).toBe('Literal');
    });

    test('Verifying value of str_006', () => {
        const variableName = 'str_006';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('CallExpression');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(2);
        expect(nodeComponentTrace[0].type).toBe('TemplateLiteral');
        expect(nodeComponentTrace[1].type).toBe('CallExpression');
    });
});