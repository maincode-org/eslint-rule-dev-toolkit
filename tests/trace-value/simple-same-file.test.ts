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
    expect((result.determiningNode as IValueNode).value).toBe('A safe string2');

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
    expect(nodeComponentTrace[1].type).toBe("Literal");
    expect(nodeComponentTrace[2].type).toBe("Literal");
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
    expect(result.isVerified).toBe(false);
    expect(result.determiningNode.type).toBe("CallExpression");

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(2);
    expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
    expect(nodeComponentTrace[1].type).toBe("CallExpression");
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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
    expect(nodeComponentTrace[1].type).toBe("Identifier");
    expect(nodeComponentTrace[2].type).toBe("CallExpression");
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
    expect(result.isVerified).toBe(false);
    expect(result.determiningNode.type).toBe("CallExpression");

    // Analyze trace
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe("ObjectExpression");
    expect(nodeComponentTrace[1].type).toBe("MemberExpression");
    expect(nodeComponentTrace[2].type).toBe("CallExpression");
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
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe('ObjectExpression');
    expect(nodeComponentTrace[1].type).toBe('Identifier');
    expect(nodeComponentTrace[2].type).toBe('ObjectExpression');
    expect(nodeComponentTrace[3].type).toBe('CallExpression');
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
    expect(nodeComponentTrace.length).toBe(4);
    expect(nodeComponentTrace[0].type).toBe('ObjectExpression');
    expect(nodeComponentTrace[1].type).toBe('Identifier');
    expect(nodeComponentTrace[2].type).toBe('ObjectExpression');
    expect(nodeComponentTrace[3].type).toBe('CallExpression');
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
    expect(result.isVerified).toBe(true);
    expect(result.determiningNode.type).toBe("Literal");
    expect((result.determiningNode as IValueNode).value).toBe("A safe string3");

    // Analyze trace
    // Do we want this to be 9?
    expect(nodeComponentTrace.length).toBe(9);
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
    expect(nodeComponentTrace.length).toBe(3);
    expect(nodeComponentTrace[0].type).toBe('ObjectExpression');
    expect(nodeComponentTrace[1].type).toBe('ObjectExpression');
    expect(nodeComponentTrace[2].type).toBe('CallExpression');
  });
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
