import { TSESTree } from "@typescript-eslint/utils";
import { getVarDeclarationByName, ETestFiles, targetFileAST } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-3'.
const sourceCode = targetFileAST.get(ETestFiles.FILE3);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-3 at line ?.
describe('Object with simple values tests', () => {
    test('Verifying value of obj_sim_001', () => {
        const variableName = 'obj_sim_001';

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
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe value');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ObjectExpression");
        expect(nodeComponentTrace.children?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.children?.[0].children?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.children?.[0].children?.[0].children?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.children?.[0].children?.[0].children?.[0].children?.[0].type).toBe("Literal");
    });

    test('Verifying value of obj_sim_002', () => {
        const variableName = 'obj_sim_002';

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
        expect(nodeComponentTrace.type).toBe("ObjectExpression");
        expect(nodeComponentTrace.children?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.children?.[0].children?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.children?.[0].children?.[0].children?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.children?.[0].children?.[0].children?.[0].children?.[0].type).toBe("CallExpression");
    });
});