import { TSESTree } from "@typescript-eslint/utils";
import { getVarDeclarationByName, targetFileAST, ETestFiles } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = targetFileAST.get(ETestFiles.FILE4);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-4 at line 170.
describe('Functions with if-else statements tests', () => {
    test('Verifying value of fun_019', () => {
        const variableName = 'fun_019';

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
        expect((result.determiningNode as TSESTree.Literal).value).toBe("A safe value1");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("FunctionExpression");
        expect(nodeComponentTrace.children?.length).toBe(2);
        expect(nodeComponentTrace.children?.[0].type).toBe("IfStatement");
        expect(nodeComponentTrace.children?.[1].type).toBe("ReturnStatement");
    });

    test('Verifying value of fun_020', () => {
        const variableName = 'fun_020';

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
        expect((result.determiningNode as TSESTree.Literal).value).toBe("A safe value1");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("FunctionExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("IfStatement");
    });

    test('Verifying value of fun_021', () => {
        const variableName = 'fun_021';

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
        expect(nodeComponentTrace.type).toBe("FunctionExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("IfStatement");
    });

    test('Verifying value of fun_022', () => {
        const variableName = 'fun_022';

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
        expect(nodeComponentTrace.type).toBe("FunctionExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("IfStatement");
    });
});