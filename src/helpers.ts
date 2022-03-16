import ESTree from "estree";
import { AST_NODE_TYPES, TSESTree, TSESLintScope, TSESLint } from "@typescript-eslint/utils";
import estraverse from "estraverse";
import { readFileSync } from "fs";
import { ITraceValueReturn } from "./trace-value/trace-value";

export enum ETestFiles {
    FILE1 = 'file-1',
    FILE2 = 'file-2',
    FILE3 = 'file-3',
    FILE4 = 'file-4',
}

export const createSourceCode = (file: ETestFiles): TSESLint.SourceCode => {
    const fileContents = readFileSync('tests/trace-value/target-files/' + file + '.js', 'utf-8');

    // Creating AST
    const linter = new TSESLint.Linter();
    linter.verify(fileContents, { parserOptions: { "ecmaVersion": 2021 }, env: { es6: true } });
    return linter.getSourceCode();
}

export const targetFileAST = new Map<ETestFiles, TSESLint.SourceCode>([
    [ETestFiles.FILE1, createSourceCode(ETestFiles.FILE1)],
    [ETestFiles.FILE2, createSourceCode(ETestFiles.FILE2)],
    [ETestFiles.FILE3, createSourceCode(ETestFiles.FILE3)],
    [ETestFiles.FILE4, createSourceCode(ETestFiles.FILE4)],
]);

export const getVarDeclarationByName = (ast: TSESTree.Program, variableName: string): TSESTree.VariableDeclarator | null => {
    let declarator = null;

    const localAST = ast as ESTree.Program;

    estraverse.traverse(localAST, {
        enter: function (node: ESTree.Node | TSESTree.Node) {
            if (node.type === AST_NODE_TYPES.VariableDeclaration && (node.declarations[0].id as ESTree.Identifier).name === variableName) {
                declarator = node.declarations[0];
            }
        }
    });

    return declarator;
};

/**
 * Takes a name and a scope, where the name is the name of an identifier.
 * Returns the closest ExpressionStatement or VariableDeclaration node where the left side's name is equal to 'name'.
 * Searches recursively through layers of scopes until finally reaching global scope.
 */
const findNodeWithNameInScope = (name: string, location: TSESTree.SourceLocation, scope: TSESLintScope.Scope): TSESTree.ExpressionStatement | TSESTree.VariableDeclaration | TSESTree.ObjectPattern | null => {
    if (!scope) throw "Scope is undefined";
    if (!location) throw "Location is undefined";

    // The type of relevantNodes is actually (ESTree.VariableDeclaration | ESTree.ExpressionStatement)[]
    let relevantNodes: TSESTree.Statement[] = [];

    // Analyze the global scope by looking at the set of variables in the scope.
    if (scope.type === "global") {
        const nameNode = scope.set.get(name);
        if (!nameNode) throw `Node with name ${name} could not be found in global scope`;

        // Check if nameNode is a part of a deconstruction.
        if (nameNode.identifiers[0].parent && nameNode.identifiers[0].parent.type === "Property") {
            return nameNode.identifiers[0].parent.parent as TSESTree.ObjectPattern;
        } else {
            if (!nameNode.identifiers[0].parent) throw "Identifier parent is undefined";
            return nameNode.identifiers[0].parent.parent as TSESTree.VariableDeclaration;
        }
    } else { // Analyze the scope by looking at the nodes in the body of the scope code block.
        if (scope.block.type !== AST_NODE_TYPES.FunctionExpression && scope.block.type !== AST_NODE_TYPES.ArrowFunctionExpression) throw "Unable to analyze scope block type";
        if (scope.block.body.type !== AST_NODE_TYPES.BlockStatement) throw "Unable to analyze scope block body type";
        const codeBlockBody = scope.block.body.body; // Array of code block nodes.
        relevantNodes = codeBlockBody.filter(node => node.type === AST_NODE_TYPES.VariableDeclaration || node.type === AST_NODE_TYPES.ExpressionStatement);
    }

    // If there are no relevant nodes to look at, call recursively with the parent scope.
    if (!scope.upper) throw "Upper scope is undefined";
    if (relevantNodes.length === 0) return findNodeWithNameInScope(name, location, scope.upper);

    /* For each node return whether the name matches the node and if it does return its line number */
    const analyzedNodes = relevantNodes.map(node => node.type === AST_NODE_TYPES.VariableDeclaration
        ?
        (node.declarations[0].id as ESTree.Identifier).name === name ? (node.loc ? node.loc.start.line : Infinity) : Infinity
        :
        (((node as ESTree.ExpressionStatement).expression as ESTree.AssignmentExpression).left as ESTree.Identifier).name === name ? (node.loc ? node.loc.start.line : Infinity) : Infinity
    );

    /**
     * If analyzedNodes does not include a number between 0 and infinity, locations could not be found for relevant nodes.
     * Else return the node closest but less than location.
     */
    if (!analyzedNodes.find(e => e > 0 && e < Infinity)) return findNodeWithNameInScope(name, location, scope.upper);
    else {
        // Return the node closest to and less than the location.
        const goal = location.start.line;
        const closest = analyzedNodes.reduce((prev, curr) => (Math.abs(curr - goal) < Math.abs(prev - goal) && curr <= goal ? curr : prev));
        // @ts-ignore
        return relevantNodes[analyzedNodes.findIndex((e) => e === closest)];
    }
}

/**
 * Takes an identifier node, and recursively searches for the latest value,
 * starting from the scope of which the identifier is being used, going one scope up,
 * until reaching global scope in which the identifier has to be declared (or imported).
 */
export const analyzeIdentifierNode = (identifier: TSESTree.Identifier, context: TSESLint.SourceCode): TSESTree.Node => {
    // Find the scope of the provided identifier node.
    const scopes = context.scopeManager?.scopes;
    if (!scopes) throw "Scopes are undefined";

    const scopeBodies = scopes.map(scope => ((scope.block as TSESTree.ArrowFunctionExpression).body as TSESTree.BlockStatement).body);
    // Find the scope in which there is a node with the same line number as the identifiers'.
    const identifierLineNumber = identifier.loc?.start.line;
    let identifierScopeIndex = scopeBodies.map(body => body && body.findIndex(node => node.loc?.start.line === identifierLineNumber)).findIndex(x => x >= 0);
    if (identifierScopeIndex === -1) { // No scopes found a.k.a. must be in global scope.
        identifierScopeIndex = 0;
    }

    // Find nodes that manipulate the identifier - look first in the scope of which the identifier is being used.
    const a = findNodeWithNameInScope(identifier.name, identifier.loc, scopes[identifierScopeIndex] as unknown as TSESLintScope.Scope);
    if (!a) throw `Could not find any relevant nodes for identifier ${identifier.name}`;
    // The return here is either an ExpressionStatement or a VariableDeclaration or null.
    // Find value of a
    if (a.type === AST_NODE_TYPES.ExpressionStatement) {
        if (a.expression.type !== AST_NODE_TYPES.AssignmentExpression) throw "The expression of the ExpressionStatement is not an assignment";
        return a.expression.right;
    } else if (a.type === AST_NODE_TYPES.ObjectPattern) {
        const valueOfIdentifier = (a.parent as TSESTree.VariableDeclarator).init;
        if (!valueOfIdentifier) throw "Declaration value is null or undefined";
        return valueOfIdentifier;
    } else { // VariableDeclaration
        const valueOfIdentifier = a.declarations[0].init;
        if (!valueOfIdentifier) throw "Declaration value is null or undefined";
        return valueOfIdentifier;
    }
}

/**
 * Takes a ITraceValueReturn[].
 * Returns a merged nodeComponentTrace in accordance to the approach describes in the README.
 */
export const makeComponentTrace = (node: TSESTree.Node, results: ITraceValueReturn[]): ITraceValueReturn => {
    if (node.type === "Program") throw "Program is not a valid node type for trace";

    //TODO: Convince compiler that node can not be of type Program.

    const unverifiedNode = results.find(result => !result.result.isVerified);
    if (unverifiedNode) {
        // @ts-ignore
        return { result: { isVerified: false, determiningNode: unverifiedNode.result.determiningNode }, nodeComponentTrace: { ...node, children: [unverifiedNode.nodeComponentTrace] } };
    } else {
        // @ts-ignore
        return { result: { isVerified: true, determiningNode: results[results.length-1].result.determiningNode }, nodeComponentTrace: { ...node, children: results.map(v => v.nodeComponentTrace) } };
    }
}