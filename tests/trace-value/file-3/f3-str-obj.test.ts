import { TSESTree } from "@typescript-eslint/utils";
import { getVarDeclarationByName, ETestFiles, targetFileAST } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-3'.
const sourceCode = targetFileAST.get(ETestFiles.FILE3);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-3 at line 33.
describe('String manipulation with object values tests', () => {
    test('Verifying value of str_obj_001', () => {
        const variableName = 'str_obj_001';

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
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.traceChildren?.length).toBe(2);
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[1].type).toBe("MemberExpression");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Literal");
    });

    test('Verifying value of str_obj_002', () => {
        const variableName = 'str_obj_002';

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
        expect(nodeComponentTrace.type).toBe("BinaryExpression");
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("MemberExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
    });

    test('Verifying value of str_obj_003', () => {
        const variableName = 'str_obj_003';

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
        expect(nodeComponentTrace.type).toBe("TemplateLiteral");
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("MemberExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Literal");
    });

    test('Verifying value of str_obj_004', () => {
        const variableName = 'str_obj_004';

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
        expect(nodeComponentTrace.type).toBe("TemplateLiteral");
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("MemberExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
    });

    test('Verifying value of str_obj_005', () => {
        const variableName = 'str_obj_005';

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
        expect(nodeComponentTrace.type).toBe("TemplateLiteral");
        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("MemberExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
    });
});