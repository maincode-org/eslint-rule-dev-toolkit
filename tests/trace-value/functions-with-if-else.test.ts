import {createSourceCode, getVarDeclarationByName, IValueNode} from "../../src/helpers";
import {traceValue} from "../../src/trace-value/trace-value";
import ESTree from "estree";
import {ETestFiles} from "../utils/testing";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = createSourceCode(ETestFiles.FILE4);

// Code starts in file-4 at line 187.
describe('Functions with if-else statements tests', () => {
    test('Verifying value of fun_019', () => {
        const variableName = 'fun_019';

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
        expect((result.determiningNode as IValueNode).value).toBe("A safe value1");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(7);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("IfStatement");
        expect(nodeComponentTrace[2].type).toBe("IfStatement");
        expect(nodeComponentTrace[3].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[4].type).toBe("Literal");
        expect(nodeComponentTrace[5].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[6].type).toBe("Literal");
    });

    test('Verifying value of fun_020', () => {
        const variableName = 'fun_020';

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
        expect((result.determiningNode as IValueNode).value).toBe("A safe value1");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(9);
        expect(nodeComponentTrace[0].type).toBe("FunctionExpression");
        expect(nodeComponentTrace[1].type).toBe("IfStatement");
        expect(nodeComponentTrace[2].type).toBe("IfStatement");
        expect(nodeComponentTrace[3].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[4].type).toBe("Literal");
        expect(nodeComponentTrace[5].type).toBe("IfStatement");
        expect(nodeComponentTrace[6].type).toBe("IfStatement");
        expect(nodeComponentTrace[7].type).toBe("ReturnStatement");
        expect(nodeComponentTrace[8].type).toBe("Literal");
    });

    test('Verifying value of fun_021', () => {
        const variableName = 'fun_021';

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
    });

    test('Verifying value of fun_022', () => {
        const variableName = 'fun_022';

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
    });

    test('Verifying value of fun_023', () => {
        const variableName = 'fun_023';

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
        expect(nodeComponentTrace.length).toBe(7);
    });

    test('Verifying value of fun_024', () => {
        const variableName = 'fun_024';

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
        expect((result.determiningNode as IValueNode).value).toBe(3);

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(31);
    });

    test('Verifying value of fun_025', () => {
        const variableName = 'fun_025';

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
        expect((result.determiningNode as IValueNode).value).toBe("Blueberry");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(12);
    });

    test('Verifying value of fun_026', () => {
        const variableName = 'fun_026';

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
        expect((result.determiningNode as IValueNode).value).toBe("A safe value1");

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(24);
    });
});