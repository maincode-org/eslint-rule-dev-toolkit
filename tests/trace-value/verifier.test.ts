import { TSESTree } from "@typescript-eslint/utils";
import { ETestFiles, getVarDeclarationByName, targetFileAST} from "../../src/helpers";
import { traceValue } from "../../src";

// All tests in this file uses source code from file 'file-4'.
const sourceCode = targetFileAST.get(ETestFiles.FILE4);
if (!sourceCode) throw "Unable to find AST for target file.";

const verifierFunction = (node: TSESTree.Node) => node.type === "Literal";

describe('Verifier function tests',() => {
    test('Verify whether the value node is of type Literal on node sim_001', () => {
        const variableName = 'sim_001';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifierFunction);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(true);
        expect(result.determiningNode.type).toBe("Literal");
    });

    test('Verify whether the value node is of type Literal, and the literal includes the word strawberry, on node sim_001', () => {
        const variableName = 'sim_001';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const verifier = (node: TSESTree.Node) => node.type === "Literal" && (node as TSESTree.StringLiteral).value?.includes("strawberry");
        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, verifier);
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
    });

    test('Verify whether the value node is of type Literal on node sim_002', () => {
        const variableName = 'sim_002';

        const varDeclaration = getVarDeclarationByName(sourceCode.ast, variableName);
        expect(varDeclaration).toBeDefined();
        if (!varDeclaration) return;

        const traceValueResult = varDeclaration.init && traceValue(varDeclaration.init, sourceCode, (node: TSESTree.Node) => node.type === "Literal");
        expect(traceValueResult).toBeDefined();
        if (!traceValueResult) return;

        const { result } = traceValueResult;

        // Analyze result
        expect(result.isVerified).toBe(false);
        expect(result.determiningNode.type).toBe("CallExpression");
    });
});