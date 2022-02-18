import {createSourceCode, getVarDeclarationByName, IValueNode} from "../../src/helpers";
import {traceValue} from "../../src/trace-value/trace-value";
import ESTree from "estree";
import {ETestFiles} from "../utils/testing";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = createSourceCode(ETestFiles.FILE4);

// Code starts in file-4 at line 42.
describe('Object tests', () => {
    test('Verifying value of obj_001', () => {
        const variableName = 'obj_001';

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
        expect((result.determiningNode as IValueNode).value).toBe('A safe string');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(2);
        expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[1].type).toBe("Literal");
    });

    test('Verifying value of obj_002', () => {
        const variableName = 'obj_002';

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
        expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[1].type).toBe("CallExpression");
    });

    test('Verifying value of obj_003', () => {
        const variableName = 'obj_003';

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
        expect((result.determiningNode as IValueNode).value).toBe('A safe string2');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(3);
        expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[1].type).toBe("Literal");
        expect(nodeComponentTrace[2].type).toBe("Literal");
    });

    test('Verifying value of obj_004', () => {
        const variableName = 'obj_004';

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
        expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[1].type).toBe("CallExpression");
    });

    test('Verifying value of obj_005', () => {
        const variableName = 'obj_005';

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
        expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[1].type).toBe("CallExpression");
    });

    test('Verifying value of obj_006', () => {
        const variableName = 'obj_006';

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
        expect((result.determiningNode as IValueNode).value).toBe('A safe string3');

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(4);
        expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[1].type).toBe("Identifier");
        expect(nodeComponentTrace[2].type).toBe("Literal");
        expect(nodeComponentTrace[3].type).toBe("Literal");
    });

    test('Verifying value of obj_007', () => {
        const variableName = 'obj_007';

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
        expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[1].type).toBe("Identifier");
        expect(nodeComponentTrace[2].type).toBe("CallExpression");
    });

    test('Verifying value of obj_008', () => {
        const variableName = 'obj_008';

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
        expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
        expect(nodeComponentTrace[1].type).toBe("MemberExpression");
        expect(nodeComponentTrace[2].type).toBe("CallExpression");
    });

    test('Verifying value of obj_009', () => {
        const variableName = 'obj_009';

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
        expect(nodeComponentTrace[0].type).toBe('ObjectExpression');
        expect(nodeComponentTrace[1].type).toBe('Identifier');
        expect(nodeComponentTrace[2].type).toBe('ObjectExpression');
        expect(nodeComponentTrace[3].type).toBe('CallExpression');
    });

    test('Verifying value of obj_010', () => {
        const variableName = 'obj_010';

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
        expect(nodeComponentTrace[0].type).toBe('ObjectExpression');
        expect(nodeComponentTrace[1].type).toBe('Identifier');
        expect(nodeComponentTrace[2].type).toBe('ObjectExpression');
        expect(nodeComponentTrace[3].type).toBe('CallExpression');
    });

    test('Verifying value of obj_011', () => {
        const variableName = 'obj_011';

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
        expect((result.determiningNode as IValueNode).value).toBe("A safe string3");

        // Analyze trace
        // Do we want this to be 9?
        expect(nodeComponentTrace.length).toBe(9);
    });

    test('Verifying value of obj_012', () => {
        const variableName = 'obj_012';

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
        expect(nodeComponentTrace[0].type).toBe('ObjectExpression');
        expect(nodeComponentTrace[1].type).toBe('ObjectExpression');
        expect(nodeComponentTrace[2].type).toBe('CallExpression');
    });

    test('Verifying value of obj_013', () => {
        const variableName = 'obj_013';

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
        expect((result.determiningNode as IValueNode).value).toBe(null);

        // Analyze trace
        expect(nodeComponentTrace.length).toBe(3);
        expect(nodeComponentTrace[0].type).toBe('ObjectExpression');
        expect(nodeComponentTrace[1].type).toBe('Literal');
        expect(nodeComponentTrace[2].type).toBe('Literal');
    });

    /* test('Verifying value of obj_012', () => {
      const variableName = 'obj_012';

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
    });
     */
});