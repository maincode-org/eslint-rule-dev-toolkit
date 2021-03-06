import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";

// Import trace functions
import traceArrowFunctionExpression from "./trace-functions/arrow-function-expression";
import traceArrayExpression from "./trace-functions/array-expression";
import traceBinaryExpression from "./trace-functions/binary-expression";
import traceConditionalExpression from "./trace-functions/conditional-expression";
import traceFunctionExpression from "./trace-functions/function-expression";
import traceIdentifier from "./trace-functions/identifier";
import traceIfStatement from "./trace-functions/if-statement";
import traceLogicalExpression from "./trace-functions/logical-expression";
import traceMemberExpression from "./trace-functions/member-expression";
import traceNewExpression from "./trace-functions/new-expression";
import traceObjectExpression from "./trace-functions/object-expression";
import traceReturnStatement from "./trace-functions/return-statement";
import traceTemplateLiteral from "./trace-functions/template-literal";
import traceVariableDeclaration from "./trace-functions/variable-declaration";
import traceImportDeclaration from "./trace-functions/import-declaration";
import traceCallExpression from "./trace-functions/call-expression";
import { stringInEnum } from '../helpers';

export type ITraceNode = (TSESTree.Node & { filename?: string, traceChildren?: ITraceNode[] });

// Helper to construct IRuleContext type
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>

// export type IRuleContext = AtLeast<AtLeast<TSESLint.RuleContext<string, unknown[]>, 'getSourceCode'>, 'getFilename'>
export type IRuleContext = AtLeast<TSESLint.RuleContext<string, unknown[]>, 'getSourceCode' | 'getFilename'>;

export type IClosureDetails = {
    functionParams?: TSESTree.Parameter[];
    accessor?: TSESTree.Identifier;
}

export type ITraceValueReturn = {
    result: {
        isVerified: boolean;
        determiningNode: TSESTree.Node;
    },
    nodeComponentTrace: ITraceNode;
}

type ITraceFunction = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails) => ITraceValueReturn;

const traceFunctionMap = new Map<AST_NODE_TYPES, ITraceFunction>([
    [AST_NODE_TYPES.ArrayExpression, traceArrayExpression],
    [AST_NODE_TYPES.ArrowFunctionExpression, traceArrowFunctionExpression],
    [AST_NODE_TYPES.BinaryExpression, traceBinaryExpression],
    [AST_NODE_TYPES.CallExpression, traceCallExpression],
    [AST_NODE_TYPES.ConditionalExpression, traceConditionalExpression],
    [AST_NODE_TYPES.FunctionExpression, traceFunctionExpression],
    [AST_NODE_TYPES.Identifier, traceIdentifier],
    [AST_NODE_TYPES.IfStatement, traceIfStatement],
    [AST_NODE_TYPES.ImportDeclaration, traceImportDeclaration],
    [AST_NODE_TYPES.LogicalExpression, traceLogicalExpression],
    [AST_NODE_TYPES.MemberExpression, traceMemberExpression],
    [AST_NODE_TYPES.NewExpression, traceNewExpression],
    [AST_NODE_TYPES.ObjectExpression, traceObjectExpression],
    [AST_NODE_TYPES.ReturnStatement, traceReturnStatement],
    [AST_NODE_TYPES.TemplateLiteral, traceTemplateLiteral],
    [AST_NODE_TYPES.VariableDeclaration, traceVariableDeclaration],
]);

// Create 'something went wrong' return object.
export const getErrorObj = (node: TSESTree.Node, nodeTrace: ITraceNode) => {
    return { result: { isVerified: false, determiningNode: node }, nodeComponentTrace: nodeTrace };
};

export const innerTraceValue = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean, closureDetails?: IClosureDetails) => {
    if (node.type === AST_NODE_TYPES.Literal) return { result: { isVerified: verify(node), determiningNode: node }, nodeComponentTrace: { ...node, filename: context.getFilename() } };

    if (!(stringInEnum(AST_NODE_TYPES, node.type))) throw `Node type of ${node.type} is unrecognizable`;

    const traceFunction = traceFunctionMap.get(node.type);
    if (traceFunction) return traceFunction(node, context, verify, closureDetails);
    else return getErrorObj(node, node);
}

export const traceValue = (node: TSESTree.Node, context: IRuleContext, verify: (node: TSESTree.Node) => boolean): ITraceValueReturn => innerTraceValue(node, context, verify);