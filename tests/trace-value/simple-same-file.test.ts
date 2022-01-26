import ESTree from 'estree';
import { traceValue } from "../../src/trace-value/trace-value";
import { createSourceCode, getVarDeclarationByName, IValueNode } from "../../src/helpers";

export enum ETestFiles {
  FILE1 = 'file-1',
  FILE2 = 'file-2',
  FILE3 = 'file-3',
  FILE4 = 'file-4',
}

describe('Verifier function tests', function () {
  test('Verify whether the value node is of type Literal on node sim_001', () => {
    const variableName = 'sim_001';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

    const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(true);
    expect(result.determiningNode.type).toBe("Literal");
  });

  test('Verify whether the value node is of type Literal, and the literal includes the word strawberry, on node sim_001', () => {
    const variableName = 'sim_001';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

    const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const verifier = (node: ESTree.Node) => node.type === "Literal" && (node as IValueNode).value.includes("strawberry");
    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifier);
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(false);
  });

  test('Verify whether the value node is of type Literal on node sim_002', () => {
    const variableName = 'sim_002';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

    const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: ESTree.Node) => node.type === "Literal");
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(false);
    expect(result.determiningNode.type).toBe("CallExpression");
  });
});

// Code starts in file-4 at line 7.
describe('Simple tests', () => {
  test('Verifying value of sim_001 - the trivial case of a Literal value', () => {
    const variableName = 'sim_001';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

// Code starts in file-4 at line 42.
describe('Object tests', () => {
  test('Verifying value of obj_001', () => {
    const variableName = 'obj_001';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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

// Code starts in file-4 at line 60.
describe('String manipulation tests', () => {
  test('Verifying value of str_001', () => {
    const variableName = 'str_001';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe('1');

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Literal");
  });

  test('Verifying value of str_002', () => {
    const variableName = 'str_002';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe('2');

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(6);
  });

  test('Verifying value of str_003', () => {
    const variableName = 'str_003';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  test('Verifying value of str_004', () => {
    const variableName = 'str_004';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  test('Verifying value of str_005', () => {
    const variableName = 'str_005';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("MemberExpression");
    expect(nodeComponentTrace[3].type).toBe("Literal");
  });

  test('Verifying value of str_006', () => {
    const variableName = 'str_006';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("MemberExpression");
    expect(nodeComponentTrace[2].type).toBe("CallExpression");
  });

  test('Verifying value of str_007', () => {
    const variableName = 'str_007';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Identifier");
    expect(nodeComponentTrace[3].type).toBe("Literal");
  });

  test('Verifying value of str_008', () => {
    const variableName = 'str_008';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("Identifier");
    expect(nodeComponentTrace[2].type).toBe("CallExpression");
  });

  test('Verifying value of str_009', () => {
    const variableName = 'str_009';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe(1);

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe('TemplateLiteral');
    expect(nodeComponentTrace[1].type).toBe('Literal');
  });

  test('Verifying value of str_010', () => {
    const variableName = 'str_010';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe('TemplateLiteral');
    expect(nodeComponentTrace[1].type).toBe('CallExpression');
  });

  test('Verifying value of str_011', () => {
    const variableName = 'str_011';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe('TemplateLiteral');
    expect(nodeComponentTrace[1].type).toBe('Identifier');
    expect(nodeComponentTrace[2].type).toBe('Literal');
  });

  test('Verifying value of str_012', () => {
    const variableName = 'str_012';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe('TemplateLiteral');
    expect(nodeComponentTrace[1].type).toBe('Identifier');
    expect(nodeComponentTrace[2].type).toBe('CallExpression');
  });

  test('Verifying value of str_013', () => {
    const variableName = 'str_013';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe('TemplateLiteral');
    expect(nodeComponentTrace[1].type).toBe('MemberExpression');
    expect(nodeComponentTrace[2].type).toBe('Literal');
  });

  test('Verifying value of str_014', () => {
    const variableName = 'str_014';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe('TemplateLiteral');
    expect(nodeComponentTrace[1].type).toBe('MemberExpression');
    expect(nodeComponentTrace[2].type).toBe('CallExpression');
  });
});

// Code starts in file-4 at line 74.
describe('Array tests', () => {
  test('Verifying value of arr_001', () => {
    const variableName = 'arr_001';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe('A safe string1');

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Literal");
  });

  test('Verifying value of arr_002', () => {
    const variableName = 'arr_002';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe(3);

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Literal");
    expect(nodeComponentTrace[3].type).toBe("Literal");
  });

  test('Verifying value of arr_003', () => {
    const variableName = 'arr_003';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  test('Verifying value of arr_004', () => {
    const variableName = 'arr_004';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  test('Verifying value of arr_005', () => {
    const variableName = 'arr_005';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(8);
  });

  test('Verifying value of arr_006', () => {
    const variableName = 'arr_006';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe('A safe string1');

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(8);
  });

  test('Verifying value of arr_007', () => {
    const variableName = 'arr_007';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("Identifier");
    expect(nodeComponentTrace[2].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[3].type).toBe("CallExpression");
  });

  test('Verifying value of arr_008', () => {
    const variableName = 'arr_008';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe("MemberExpression");
    expect(nodeComponentTrace[1].type).toBe("Identifier");
    expect(nodeComponentTrace[2].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[3].type).toBe("CallExpression");
  });

  test('Verifying value of arr_009', () => {
    const variableName = 'arr_009';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe("MemberExpression");
    expect(nodeComponentTrace[1].type).toBe("Identifier");
    expect(nodeComponentTrace[2].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[3].type).toBe("CallExpression");
  });

  test('Verifying value of arr_010', () => {
    const variableName = 'arr_010';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe('A safe string1');

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(7);
  });

  test('Verifying value of arr_011', () => {
    const variableName = 'arr_011';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("MemberExpression");
    expect(nodeComponentTrace[3].type).toBe("Literal");
  });

  test('Verifying value of arr_012', () => {
    const variableName = 'arr_012';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("MemberExpression");
    expect(nodeComponentTrace[2].type).toBe("CallExpression");
  });

  test('Verifying value of arr_013', () => {
    const variableName = 'arr_013';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Identifier");
    expect(nodeComponentTrace[3].type).toBe("Literal");
  });

  test('Verifying value of arr_014', () => {
    const variableName = 'arr_014';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("Identifier");
    expect(nodeComponentTrace[2].type).toBe("CallExpression");
  });

  test('Verifying value of arr_015', () => {
    const variableName = 'arr_015';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe(null);

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[1].type).toBe("Literal");
  });

  test('Verifying value of arr_016', () => {
    const variableName = 'arr_016';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  test('Verifying value of arr_017', () => {
    const variableName = 'arr_017';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
  });

  test('Verifying value of arr_018', () => {
    const variableName = 'arr_018';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("ArrayExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  /* test('Verifying value of arr_019', () => {
    const variableName = 'arr_019';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
  });
   */
});

// Code starts in file-4 at line 95.
describe('Scope tests', () => {
  test('Verifying value of sco_002', () => {
    const variableName = 'sco_002';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe("inner");

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("Identifier");
    expect(nodeComponentTrace[1].type).toBe("Literal");
  });

  test('Verifying value of sco_004', () => {
    const variableName = 'sco_004';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe("outer");

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("Identifier");
    expect(nodeComponentTrace[1].type).toBe("Literal");
  });

  test('Verifying value of sco_006', () => {
    const variableName = 'sco_006';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe("safe");

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("Identifier");
    expect(nodeComponentTrace[1].type).toBe("Literal");
  });

  test('Verifying value of sco_008', () => {
    const variableName = 'sco_008';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect((result.determiningNode as IValueNode).value).toBe("reassignment");

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("Identifier");
    expect(nodeComponentTrace[1].type).toBe("Literal");
  });
});

// Code starts in file-4 at line 111.
describe('Mathematical expressions tests', () => {
  test('Verifying value of mat_001', () => {
    const variableName = 'mat_001';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Literal");
  });

  test('Verifying value of mat_002', () => {
    const variableName = 'mat_002';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  test('Verifying value of mat_003', () => {
    const variableName = 'mat_003';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Literal");
  });

  test('Verifying value of mat_004', () => {
    const variableName = 'mat_004';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  test('Verifying value of mat_005', () => {
    const variableName = 'mat_005';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Literal");
  });

  test('Verifying value of mat_006', () => {
    const variableName = 'mat_006';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  test('Verifying value of mat_007', () => {
    const variableName = 'mat_007';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Literal");
  });

  test('Verifying value of mat_008', () => {
    const variableName = 'mat_008';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });

  test('Verifying value of mat_009', () => {
    const variableName = 'mat_009';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace.length).toBe(6);
  });

  test('Verifying value of mat_010', () => {
    const variableName = 'mat_010';

    const sourceCode = createSourceCode(ETestFiles.FILE4);

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
    expect(nodeComponentTrace[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
  });
});
