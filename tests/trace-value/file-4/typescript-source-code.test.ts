import { TSESTree } from "@typescript-eslint/utils";
import { ETestFiles, getVarDeclarationByName, targetFileContext } from "../../../src/helpers";
import { traceValue } from "../../../src";

// All tests in this file uses source code from file 'ts-file-4'.
const context = targetFileContext.get(ETestFiles.TSFILE4);
if (!context) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

describe('Typescript source code tests', () => {
  test('Verifying value of arr_001', () => {
    const variableName = 'arr_001';

    const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result, nodeComponentTrace } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(true);
    expect(result.determiningNode.type).toBe("Literal");
    expect((result.determiningNode as TSESTree.Literal).value).toBe('Safe string 1');

    // Analyze trace
    expect(nodeComponentTrace.type).toBe("ArrayExpression");
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe("Literal");
    expect(nodeComponentTrace.traceChildren?.[1].type).toBe("Literal");
  });

  test('Verifying value of fun_001', () => {
    const variableName = 'fun_001';

    const varDeclaration = getVarDeclarationByName(context.getSourceCode().ast, variableName);
    expect(varDeclaration).toBeDefined();
    if (!varDeclaration) return;

    const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, context, verifierFunction);
    expect(traceValueResult).toBeDefined();
    if (!traceValueResult) return;

    const { result, nodeComponentTrace } = traceValueResult;

    // Analyze result
    expect(result.isVerified).toBe(true);
    expect(result.determiningNode.type).toBe("Literal");
    expect((result.determiningNode as TSESTree.Literal).value).toBe(2);

    // Analyze trace
    expect(nodeComponentTrace.type).toBe("ArrowFunctionExpression");
    expect(nodeComponentTrace.traceChildren?.[0].type).toBe("BinaryExpression");
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[0].type).toBe("Literal");
    expect(nodeComponentTrace.traceChildren?.[0].traceChildren?.[1].type).toBe("Literal");
  });
});