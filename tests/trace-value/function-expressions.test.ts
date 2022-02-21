import {createSourceCode, getVarDeclarationByName, IValueNode} from "../../src/helpers";
import {traceValue} from "../../src";
import ESTree from "estree";
import {ETestFiles} from "../utils/testing";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = createSourceCode(ETestFiles.FILE4);

// Code starts in file-4 at line 166.
describe('Function expressions tests', () => {
    test('Verifying value of fun_009', () => {
        const variableName = 'fun_009';

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
        expect((result.determiningNode as IValueNode).value).toBe('A safe value');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(3);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[2].type).toBe("Literal");
    });

    test('Verifying value of fun_010', () => {
        const variableName = 'fun_010';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(3);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[2].type).toBe("CallExpression");
    });

    test('Verifying value of fun_011', () => {
        const variableName = 'fun_011';

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
        expect(nodeComponentTrace.length).toBe(4);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[2].type).toBe("Identifier");
        expect(nodeComponentTrace[3].type).toBe("Literal");
    });

    test('Verifying value of fun_012', () => {
        const variableName = 'fun_012';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(4);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[2].type).toBe("Identifier");
        expect(nodeComponentTrace[3].type).toBe("CallExpression");
    });

    test('Verifying value of fun_013', () => {
        const variableName = 'fun_013';

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
        expect((result.determiningNode as IValueNode).value).toBe("A safe string");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(5);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[2].type).toBe("Identifier");
        expect(nodeComponentTrace[3].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[4].type).toBe("Literal");
    });

    test('Verifying value of fun_014', () => {
        const variableName = 'fun_014';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(5);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[2].type).toBe("Identifier");
        expect(nodeComponentTrace[3].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[4].type).toBe("CallExpression");
    });

    test('Verifying value of fun_015', () => {
        const variableName = 'fun_015';

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
        expect((result.determiningNode as IValueNode).value).toBe("A safe string1");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(9);
    });

    test('Verifying value of fun_016', () => {
        const variableName = 'fun_016';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(5);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[2].type).toBe("Identifier");
        expect(nodeComponentTrace[3].type).toBe("ArrayExpression");
        expect(nodeComponentTrace[4].type).toBe("CallExpression");
    });

    test('Verifying value of fun_017', () => {
        const variableName = 'fun_017';

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
        expect((result.determiningNode as IValueNode).value).toBe("1");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(10);
    });

    test('Verifying value of fun_018', () => {
        const variableName = 'fun_018';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result, nodeComponentTrace } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(4);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[2].type).toBe("BinaryExpression");
        expect(nodeComponentTrace[3].type).toBe("CallExpression");
    });
});