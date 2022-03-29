import { TSESTree } from "@typescript-eslint/utils";
import { ETestFiles, getVarDeclarationByName, targetFileAST } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = targetFileAST.get(ETestFiles.FILE4);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-4 at line 137.
describe('Logical expressions tests', () => {
    test('Verifying value of log_001', () => {
        const variableName = 'log_001';

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
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string1');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ConditionalExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(2);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[1].type).toBe("Literal");
    });

    test('Verifying value of log_002', () => {
        const variableName = 'log_002';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("Identifier");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ConditionalExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
    });

    test('Verifying value of log_003', () => {
        const variableName = 'log_003';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("Identifier");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ConditionalExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
    });

    test('Verifying value of log_004', () => {
        const variableName = 'log_004';

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
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe string');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("LogicalExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(2);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("BinaryExpression");
        expect(nodeComponentTrace.traceChildren?.[1].type).toBe("Literal");
    });

    test('Verifying value of log_005', () => {
        const variableName = 'log_005';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("Identifier");

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("LogicalExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(1);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
    });
});