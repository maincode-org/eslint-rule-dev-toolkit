import {createSourceCode, getVarDeclarationByName, IValueNode} from "../../src/helpers";
import {traceValue} from "../../src";
import ESTree from "estree";
import {ETestFiles} from "../utils/testing";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = createSourceCode(ETestFiles.FILE4);

// Code starts in file-4 at line 7.
describe('Simple tests', () => {
    test('Verifying value of sim_001 - the trivial case of a Literal value', () => {
        const variableName = 'sim_001';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
        expect((result.determiningNode as IValueNode).value).toBe("A safe value");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(1);
        expect(nodeComponentTrace[0].type).toBe("Literal");
        expect((nodeComponentTrace[0] as IValueNode).value).toBe("A safe value");
    });

    test('Verifying value of sim_011 - an identifier where the value is a reference to sim_001', () => {
        const variableName = 'sim_011';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
        expect((result.determiningNode as IValueNode).value).toBe("A safe value");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(2);
        expect(nodeComponentTrace[0].type).toBe("Identifier");
        expect(nodeComponentTrace[1].type).toBe("Literal");
    });

    test('Verifying value of sim_012 - an identifier referencing another identifier', () => {
        const variableName = 'sim_012';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
        expect((result.determiningNode as IValueNode).value).toBe("A safe value");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(3);
        expect(nodeComponentTrace[0].type).toBe("Identifier");
        expect(nodeComponentTrace[1].type).toBe("Identifier");
        expect(nodeComponentTrace[2].type).toBe("Literal");
    });
});