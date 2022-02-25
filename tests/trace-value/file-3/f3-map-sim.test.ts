import ESTree from "estree";
import { getVarDeclarationByName, IValueNode, ETestFiles, targetFileAST } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'file-3'.
const sourceCode = targetFileAST.get(ETestFiles.FILE3);
if (!sourceCode) throw "Unable to find AST for target file.";

// Code starts in file-3 at line ?.
describe('Map with simple values tests', () => {
    test('Verifying value of map_sim_001', () => {
        const variableName = 'map_sim_001';

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
        expect((result.determiningNode as IValueNode).value).toBe('A safe value');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(5);
    });

    test('Verifying value of map_sim_002', () => {
        const variableName = 'map_sim_002';

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
        expect(nodeComponentTrace.length).toBe(5);
    });
});