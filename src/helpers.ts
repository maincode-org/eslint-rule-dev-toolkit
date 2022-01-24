import { Linter, Scope, SourceCode } from "eslint";
import { readFileSync } from "fs";
import ESTree from "estree";
import estraverse from "estraverse";
import { ETestFiles } from "../tests/trace-value/simple-same-file.test";

type INodeWithParent = ESTree.Node & { parent: ESTree.Node };
export type IValueNode = ESTree.Node & { value: string };

export const createSourceCode = (file: ETestFiles): SourceCode => {
    const fileContents = readFileSync('tests/trace-value/target-files/' + file + '.js', 'utf-8');

    // Creating AST
    const linter = new Linter();
    linter.verify(fileContents, { parserOptions: { "ecmaVersion": 2018 }, env: { es6: true } });
    return linter.getSourceCode();
}

export const getVarDeclarationByName = (ast: ESTree.Program, variableName: string): ESTree.VariableDeclarator | null => {
    let declarator = null;

    estraverse.traverse(ast, {
        enter: function (node: ESTree.Node) {
            if (node.type === 'VariableDeclaration' && (node.declarations[0].id as ESTree.Identifier).name === variableName) {
                declarator = node.declarations[0];
            }
        }
    });

    return declarator;
};

/**
 * Takes a name and a scope, where the name a name of an identifier.
 * Returns the first ExpressionStatement or VariableDeclaration node where the left side's name is equal to 'name'.
 * Searches recursively through layers of scopes until finally reaching global scope.
 * TODO: Handle cases where multiple nodes have left sides that matches 'name'.
 */
const findNodeWithNameInScope = (name: string, scope: Scope.Scope | null): ESTree.ExpressionStatement | ESTree.VariableDeclaration | null => {
    if (!scope) return null;

    // The type of relevantNodes is actually (ESTree.VariableDeclaration | ESTree.ExpressionStatement)[]
    let relevantNodes: ESTree.Statement[] = [];
    // Analyze the global scope by looking at the set of variables in the scope.
    if (scope.type === "global") {
        const nameNode = scope.set.get(name);
        if (!nameNode) throw `Node with name ${name} could not be found in global scope`;
        return ((nameNode.identifiers[0] as INodeWithParent).parent as INodeWithParent).parent as ESTree.VariableDeclaration;
    } else { // Analyze the scope by looking at the nodes in the body of the scope code block.
        if (scope.block.type !== "ArrowFunctionExpression") return null;
        if (scope.block.body.type !== 'BlockStatement') return null;
        const codeBlockBody = scope.block.body.body; // Array of code block nodes.
        relevantNodes = codeBlockBody.filter(node => node.type === "VariableDeclaration" || node.type === "ExpressionStatement");
    }

    // If there are no relevant nodes to look at, call recursively with the parent scope.
    if (relevantNodes.length === 0) return findNodeWithNameInScope(name, scope.upper);

    const analyzedNodes = relevantNodes.map(node => node.type === "VariableDeclaration"
        ?
        (node.declarations[0].id as ESTree.Identifier).name === name
        :
        (((node as ESTree.ExpressionStatement).expression as ESTree.AssignmentExpression).left as ESTree.Identifier).name === name);

    // console.log('analyzed nodes', analyzedNodes);

    /**
     * If analyzedNodes does not include true, the 'name' does not occur. Call recursively with parent scope.
     * If analyzedNodes includes true either a relevant declaration or reassignment has happened in this scope.
     * TODO: Add case for if analyzedNodes includes more than one true
     */
    if (analyzedNodes.includes(true)) {
        // @ts-ignore
        return relevantNodes[analyzedNodes.findIndex(() => true)];
    } else return findNodeWithNameInScope(name, scope.upper);
}

/**
 * Takes an identifier node, and recursively searches for the latest value,
 * starting from the scope of which the identifier is being used, going one scope up,
 * until reaching global scope in which the identifier has to be declared (or imported).
 */
export const analyzeIdentifierNode = (identifier: ESTree.Identifier): ESTree.Node => {
    // Find the scope of the provided identifier node
    const scopes = createSourceCode(ETestFiles.FILE4).scopeManager.scopes;

    const scopeBodies = scopes.map(scope => ((scope.block as ESTree.ArrowFunctionExpression).body as ESTree.BlockStatement).body);
    // Find the scope in which there is a node with the same line number as the identifiers'.
    const identifierLineNumber = identifier.loc?.start.line;
    let identifierScopeIndex = scopeBodies.map(body => body && body.findIndex(node => node.loc?.start.line === identifierLineNumber)).findIndex(x => x >= 0);
    if (identifierScopeIndex === -1) { // No scopes found a.k.a. must be in global scope.
        identifierScopeIndex = 0;
    }

    // Find nodes that manipulate the identifier - look first in the scope of which the identifier is being used.
    const a = findNodeWithNameInScope(identifier.name, scopes[identifierScopeIndex]);
    if (!a) throw `Could not find any relevant nodes for identifier ${identifier.name}`;
    // The return here is either an ExpressionStatement or a VariableDeclaration or null.
    // Find value of a
    if (a.type === "ExpressionStatement") {
        if (a.expression.type !== "AssignmentExpression") throw "The expression of the ExpressionStatement is not an assignment";
        return a.expression.right;
    } else { // VariableDeclaration
        const valueOfIdentifier = a.declarations[0].init;
        if (!valueOfIdentifier) throw "Declaration value is null or undefined";
        return valueOfIdentifier;
    }
}