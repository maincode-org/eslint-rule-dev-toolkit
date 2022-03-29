import { TSESTree } from "@typescript-eslint/utils";
import { getVarDeclarationByName, ETestFiles, targetFileAST } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-3'.
const sourceCode = targetFileAST.get(ETestFiles.FILE3);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-3 at line 55.
describe('Logical expression with simple values tests', () => {
    test('Verifying value of log_arr_001', () => {
        const variableName = 'log_arr_001';

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
        expect(nodeComponentTrace.type).toBe("ConditionalExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(2);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[1].type).toBe("Identifier");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].type).toBe("CallExpression");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ArrayExpression");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[1].type).toBe("Literal");

        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[1].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[2].type).toBe("Literal");
    });

    test('Verifying value of log_arr_002', () => {
        const variableName = 'log_arr_002';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('Identifier');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ConditionalExpression");
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ArrayExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
    });
});