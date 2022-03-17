import { TSESTree } from "@typescript-eslint/utils";
import { traceValue } from "../../../src";
import { getVarDeclarationByName, targetFileAST, ETestFiles } from "../../../src/helpers";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = targetFileAST.get(ETestFiles.FILE4);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-4 at line 151.
describe('Arrow function expressions tests', () => {
    test('Verifying value of fun_001', () => {
        const variableName = 'fun_001';

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
        expect(nodeComponentTrace.type).toBe("ArrowFunctionExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("BinaryExpression");
    });

    test('Verifying value of fun_002', () => {
        const variableName = 'fun_002';

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
        expect(nodeComponentTrace.type).toBe("ArrowFunctionExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("CallExpression");
    });
});