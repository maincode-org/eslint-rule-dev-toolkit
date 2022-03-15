import { TSESTree } from "@typescript-eslint/utils";
import { ETestFiles, getVarDeclarationByName, targetFileAST } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = targetFileAST.get(ETestFiles.FILE4);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-4 at line 151.
describe('Function expressions tests', () => {
    test('Verifying value of fun_009', () => {
        const variableName = 'fun_009';

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
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe value');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("FunctionExpression");
        expect(nodeComponentTrace.children?.length).toBe(1);
        expect(nodeComponentTrace.children?.[0].type).toBe("ReturnStatement");
    });

    test('Verifying value of fun_010', () => {
        const variableName = 'fun_010';

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
        expect(nodeComponentTrace.children?.[0].type).toBe("ReturnStatement");
    });

    test('Verifying value of fun_017', () => {
        const variableName = 'fun_017';

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
        expect((result.determiningNode as TSESTree.Literal).value).toBe("1");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("FunctionExpression");
        expect(nodeComponentTrace.children?.length).toBe(2);
        expect(nodeComponentTrace.children?.[0].type).toBe("VariableDeclaration");
        expect(nodeComponentTrace.children?.[1].type).toBe("ReturnStatement");
    });

    test('Verifying value of fun_018', () => {
        const variableName = 'fun_018';

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
        expect(nodeComponentTrace.children?.[0].type).toBe("ReturnStatement");
    });
});