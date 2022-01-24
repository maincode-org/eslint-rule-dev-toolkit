import ESTree from 'estree';
import { traceValue } from "../../src/trace-value/trace-value";
import { createSourceCode, getVarDeclarationByName, IValueNode } from "../../src/helpers";

export enum ETestFiles {
  FILE1 = 'file-1',
  FILE2 = 'file-2',
  FILE3 = 'file-3',
  FILE4 = 'file-4',
}

// Code starts at file-4 line 7.
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
});

// Code starts at file-4 line 95.
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
