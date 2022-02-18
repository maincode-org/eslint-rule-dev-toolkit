import {createSourceCode, getVarDeclarationByName, IValueNode} from "../../src/helpers";
import {traceValue} from "../../src/trace-value/trace-value";
import ESTree from "estree";
import {ETestFiles} from "../utils/testing";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = createSourceCode(ETestFiles.FILE4);

// Code starts in file-4 at line 151.
describe('Arrow function expressions tests', () => {
    test('Verifying value of fun_001', () => {
        const variableName = 'fun_001';

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
        expect((result.determiningNode as IValueNode).value).toBe(2);

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(5);
        expect(nodeComponentTrace[0].type).toBe("ArrowFunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("BinaryExpression");
        expect(nodeComponentTrace[2].type).toBe("Literal");
        expect(nodeComponentTrace[3].type).toBe("BinaryExpression");
        expect(nodeComponentTrace[4].type).toBe("Literal");
    });

    test('Verifying value of fun_002', () => {
        const variableName = 'fun_002';

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
        expect(nodeComponentTrace.length).toBe(2);
        expect(nodeComponentTrace[0].type).toBe("ArrowFunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("CallExpression");
    });

    test('Verifying value of fun_003', () => {
        const variableName = 'fun_003';

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
        expect(nodeComponentTrace[0].type).toBe("ArrowFunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("Identifier");
        expect(nodeComponentTrace[2].type).toBe("Literal");
    });

    test('Verifying value of fun_004', () => {
        const variableName = 'fun_004';

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
        expect(nodeComponentTrace[0].type).toBe("ArrowFunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("Identifier");
        expect(nodeComponentTrace[2].type).toBe("CallExpression");
    });

    test('Verifying value of fun_005', () => {
        const variableName = 'fun_005';

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
        expect(nodeComponentTrace.length).toBe(4);
        expect(nodeComponentTrace[0].type).toBe("ArrowFunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("Identifier");
        expect(nodeComponentTrace[2].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[3].type).toBe("Literal");
    });

    test('Verifying value of fun_006', () => {
        const variableName = 'fun_006';

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
        expect(nodeComponentTrace[0].type).toBe("ArrowFunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("Identifier");
        expect(nodeComponentTrace[2].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[3].type).toBe("CallExpression");
    });

    test('Verifying value of fun_007', () => {
        const variableName = 'fun_007';

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
        expect(nodeComponentTrace.length).toBe(7);
    });

    test('Verifying value of fun_008', () => {
        const variableName = 'fun_008';

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
        expect(nodeComponentTrace[0].type).toBe("ArrowFunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("Identifier");
        expect(nodeComponentTrace[2].type).toBe("ArrayExpression");
        expect(nodeComponentTrace[3].type).toBe("CallExpression");
    });
});