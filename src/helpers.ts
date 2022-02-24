import ESTree from "estree";
import estraverse from "estraverse";
import { Linter, Scope, SourceCode } from "eslint";
import { readFileSync } from "fs";
import { ENodeTypes, ITraceValueReturn } from "./trace-value/trace-value";

export type INodeWithParent = ESTree.Node & { parent: ESTree.Node };
export type IValueNode = ESTree.Node & { value: string };
type ILocation = ESTree.SourceLocation | null | undefined;

export enum ETestFiles {
    FILE1 = 'file-1',
    FILE2 = 'file-2',
    FILE3 = 'file-3',
    FILE4 = 'file-4',
}

export const createSourceCode = (file: ETestFiles): SourceCode => {
    const fileContents = readFileSync('tests/trace-value/target-files/' + file + '.js', 'utf-8');

    // Creating AST
    const linter = new Linter();
    linter.verify(fileContents, { parserOptions: { "ecmaVersion": 2021 }, env: { es6: true } });
    return linter.getSourceCode();
}

export const targetFileAST = new Map<ETestFiles, SourceCode>([
    [ETestFiles.FILE1, createSourceCode(ETestFiles.FILE1)],
    [ETestFiles.FILE2, createSourceCode(ETestFiles.FILE2)],
    [ETestFiles.FILE3, createSourceCode(ETestFiles.FILE3)],
    [ETestFiles.FILE4, createSourceCode(ETestFiles.FILE4)],
]);

export const getVarDeclarationByName = (ast: ESTree.Program, variableName: string): ESTree.VariableDeclarator | null => {
    let declarator = null;

    estraverse.traverse(ast, {
        enter: function (node: ESTree.Node) {
            if (node.type === ENodeTypes.VARIABLE_DECLARATION && (node.declarations[0].id as ESTree.Identifier).name === variableName) {
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
const findNodeWithNameInScope = (name: string, location: ILocation, scope: Scope.Scope | null): ESTree.ExpressionStatement | ESTree.VariableDeclaration | ESTree.ObjectPattern | null => {
    if (!scope) throw "Scope is undefined";
    if (!location) throw "Location is undefined";

    // The type of relevantNodes is actually (ESTree.VariableDeclaration | ESTree.ExpressionStatement)[]
    let relevantNodes: ESTree.Statement[] = [];

    // Analyze the global scope by looking at the set of variables in the scope.
    if (scope.type === "global") {
        const nameNode = scope.set.get(name);
        if (!nameNode) throw `Node with name ${name} could not be found in global scope`;

        // Check if nameNode is a part of a deconstruction
        if ((nameNode.identifiers[0] as INodeWithParent).parent.type === "Property") {
            return ((nameNode.identifiers[0] as INodeWithParent).parent as INodeWithParent).parent as ESTree.ObjectPattern;
        } else {
            return ((nameNode.identifiers[0] as INodeWithParent).parent as INodeWithParent).parent as ESTree.VariableDeclaration;
        }
    } else { // Analyze the scope by looking at the nodes in the body of the scope code block.
        if (scope.block.type !== ENodeTypes.FUNCTION_EXPRESSION && scope.block.type !== ENodeTypes.ARROW_FUNCTION_EXPRESSION) throw "Unable to analyze scope block type";
        if (scope.block.body.type !== ENodeTypes.BLOCK_STATEMENT) throw "Unable to analyze scope block body type";
        const codeBlockBody = scope.block.body.body; // Array of code block nodes.
        relevantNodes = codeBlockBody.filter(node => node.type === ENodeTypes.VARIABLE_DECLARATION || node.type === ENodeTypes.EXPRESSION_STATEMENT);
    }

    // If there are no relevant nodes to look at, call recursively with the parent scope.
    if (relevantNodes.length === 0) return findNodeWithNameInScope(name, location, scope.upper);

    /* For each node return whether the name matches the node and if it does return its line number */
    const analyzedNodes = relevantNodes.map(node => node.type === ENodeTypes.VARIABLE_DECLARATION
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
export const analyzeIdentifierNode = (identifier: ESTree.Identifier, context: SourceCode): ESTree.Node => {
    // Find the scope of the provided identifier node.
    const scopes = context.scopeManager.scopes;

    const scopeBodies = scopes.map(scope => ((scope.block as ESTree.ArrowFunctionExpression).body as ESTree.BlockStatement).body);
    // Find the scope in which there is a node with the same line number as the identifiers'.
    const identifierLineNumber = identifier.loc?.start.line;
    let identifierScopeIndex = scopeBodies.map(body => body && body.findIndex(node => node.loc?.start.line === identifierLineNumber)).findIndex(x => x >= 0);
    if (identifierScopeIndex === -1) { // No scopes found a.k.a. must be in global scope.
        identifierScopeIndex = 0;
    }

    // Find nodes that manipulate the identifier - look first in the scope of which the identifier is being used.
    const a = findNodeWithNameInScope(identifier.name, identifier.loc, scopes[identifierScopeIndex]);
    if (!a) throw `Could not find any relevant nodes for identifier ${identifier.name}`;
    // The return here is either an ExpressionStatement or a VariableDeclaration or null.
    // Find value of a
    if (a.type === ENodeTypes.EXPRESSION_STATEMENT) {
        if (a.expression.type !== ENodeTypes.ASSIGNMENT_EXPRESSION) throw "The expression of the ExpressionStatement is not an assignment";
        return a.expression.right;
    } else if (a.type === ENodeTypes.OBJECT_PATTERN) {
        const valueOfIdentifier = ((a as INodeWithParent).parent as ESTree.VariableDeclarator).init;
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
 * Returns a collective nodeComponentTrace of all the recursive paths.
 * Note: Head is removed as it will always be the parent node itself in all its child paths.
 */
export const mergeRecursiveTraces = (traceValueResult: ITraceValueReturn[]) => {
    return traceValueResult.map(result => result.nodeComponentTrace).reduce((acc, cur) => {
        const [, ...tail] = cur;
        return [...acc, ...tail];
    });
}

/**
 * Takes a ITraceValueReturn[].
 * Returns a nodeComponentTrace in accordance to the approach describes in the README.
 */
export const makeComponentTrace = (results: ITraceValueReturn[]) => {
    const unverifiedNode = results.find(result => !result.result.isVerified);
    if (unverifiedNode) {
        return { result: { isVerified: false, determiningNode: unverifiedNode.result.determiningNode }, nodeComponentTrace: unverifiedNode.nodeComponentTrace};
    } else {
        return { result: { isVerified: true, determiningNode: results[results.length-1].result.determiningNode }, nodeComponentTrace: mergeRecursiveTraces(results)};
    }
}