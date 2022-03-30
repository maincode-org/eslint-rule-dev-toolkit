import { TSESTree } from "@typescript-eslint/utils";
import { traceValue } from "../../../src";
import { ETestFiles, getVarDeclarationByName, targetFileContext } from "../../../src/helpers";

// All tests in this file uses source code from file 'file-3'.
const context = targetFileContext.get(ETestFiles.FILE3);
if (!context) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

// Code starts in file-3 at line 18.
describe('Array with simple values tests', () => {
    test('Verifying value of arr_sim_001', () => {
        const variableName = 'arr_sim_001';

        const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe value');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.filename).toBe("file-3");

        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].filename).toBe("file-3");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].filename).toBe("file-3");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe("file-4");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe("file-4");
    });

    test('Verifying value of arr_sim_002', () => {
        const variableName = 'arr_sim_002';

        const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe('Identifier');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.filename).toBe("file-3");

        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].filename).toBe("file-3");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].filename).toBe("file-3");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe("file-4");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe("file-4");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe("file-4");
    });

    test('Verifying value of arr_sim_003', () => {
        const variableName = 'arr_sim_003';

        const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe('Literal');
        expect((result.determiningNode as TSESTree.Literal).value).toBe('A safe value2');

        // Analyze trace
        expect(nodeComponentTrace.type).toBe("ArrayExpression");
        expect(nodeComponentTrace.filename).toBe("file-3");

        expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].filename).toBe("file-3");
        expect(nodeComponentTrace.traceChildren?.[1].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[1].filename).toBe("file-3");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].filename).toBe("file-3");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].type).toBe("CallExpression");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].filename).toBe("file-3");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe("file-4");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].type).toBe("Identifier");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].filename).toBe("file-4");

        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe("file-4");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].type).toBe("Literal");
        expect(nodeComponentTrace.traceChildren?.[1].traceChildren?.[0].traceChildren?.[0].traceChildren?.[0].filename).toBe("file-4");
    });
});