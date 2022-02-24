import ESTree from "estree";
import { traceValue } from "../../../src";
import { ETestFiles, getVarDeclarationByName, IValueNode, targetFileAST } from "../../../src/helpers";

// All tests in this file uses source code from file 'file-3'.
const sourceCode = targetFileAST.get(ETestFiles.FILE3);
if (!sourceCode) throw "Unable to find AST for target file.";

describe('Array with simple values tests', () => {
    test('Verifying value of arr_sim_001', () => {
        const variableName = 'arr_sim_001';

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
});