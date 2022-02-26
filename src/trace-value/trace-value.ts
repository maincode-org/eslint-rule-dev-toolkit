import ESTree from 'estree';
import { SourceCode } from "eslint";

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

export type ITraceValueReturn = {
    result: {
        isVerified: boolean,
        determiningNode: ESTree.Node,
    },
    nodeComponentTrace: ESTree.Node[]
}

export enum ENodeTypes {
    LITERAL = 'Literal',
    VARIABLE_DECLARATION = 'VariableDeclaration',
    VARIABLE_DECLARATOR = 'VariableDeclarator',
    IDENTIFIER = 'Identifier',
    TEMPLATE_LITERAL = 'TemplateLiteral',
    OBJECT_EXPRESSION = 'ObjectExpression',
    SPREAD_ELEMENT = 'SpreadElement',
    MEMBER_EXPRESSION = 'MemberExpression',
    ARRAY_EXPRESSION = 'ArrayExpression',
    BINARY_EXPRESSION = 'BinaryExpression',
    NEW_EXPRESSION = 'NewExpression',
    CONDITIONAL_EXPRESSION = 'ConditionalExpression',
    IF_STATEMENT = 'IfStatement',
    RETURN_STATEMENT = 'ReturnStatement',
    BLOCK_STATEMENT = 'BlockStatement',
    ARROW_FUNCTION_EXPRESSION = 'ArrowFunctionExpression',
    FUNCTION_EXPRESSION = 'FunctionExpression',
    LOGICAL_EXPRESSION = 'LogicalExpression',
    CALL_EXPRESSION = 'CallExpression',
    IMPORT_DECLARATION = 'ImportDeclaration',
    EXPRESSION_STATEMENT = 'ExpressionStatement',
    ASSIGNMENT_EXPRESSION = 'AssignmentExpression',
    EXPORT_NAMED_DECLARATION = 'ExportNamedDeclaration',
    OBJECT_PATTERN = 'ObjectPattern',
    REST_ELEMENT = 'RestElement',
}

type ITraceFunction = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace?: ESTree.Node[]) => ITraceValueReturn;

const traceFunctionMap = new Map<ENodeTypes, ITraceFunction>([
    [ENodeTypes.ARRAY_EXPRESSION, traceArrayExpression],
    [ENodeTypes.ARROW_FUNCTION_EXPRESSION, traceArrowFunctionExpression],
    [ENodeTypes.BINARY_EXPRESSION, traceBinaryExpression],
    [ENodeTypes.CONDITIONAL_EXPRESSION, traceConditionalExpression],
    [ENodeTypes.FUNCTION_EXPRESSION, traceFunctionExpression],
    [ENodeTypes.IDENTIFIER, traceIdentifier],
    [ENodeTypes.IF_STATEMENT, traceIfStatement],
    [ENodeTypes.LOGICAL_EXPRESSION, traceLogicalExpression],
    [ENodeTypes.MEMBER_EXPRESSION, traceMemberExpression],
    [ENodeTypes.NEW_EXPRESSION, traceNewExpression],
    [ENodeTypes.OBJECT_EXPRESSION, traceObjectExpression],
    [ENodeTypes.RETURN_STATEMENT, traceReturnStatement],
    [ENodeTypes.TEMPLATE_LITERAL, traceTemplateLiteral],
    [ENodeTypes.VARIABLE_DECLARATION, traceVariableDeclaration],
    [ENodeTypes.IMPORT_DECLARATION, traceImportDeclaration],
    [ENodeTypes.CALL_EXPRESSION, traceCallExpression],
]);

// Create 'something went wrong' return object.
export const getErrorObj = (node: ESTree.Node, nodeTrace: ESTree.Node[]) => {
    return { result: { isVerified: false, determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};
};

// TODO: Change type of context to RuleContext
export const traceValue = (node: ESTree.Node, context: SourceCode, verify: (node: ESTree.Node) => boolean, nodeTrace: ESTree.Node[] = []): ITraceValueReturn => {
    if (node.type === ENodeTypes.LITERAL) return { result: { isVerified: verify(node), determiningNode: node }, nodeComponentTrace: [...nodeTrace, node]};

    const inEnum = (Object.values(ENodeTypes) as string[]).includes(node.type);
    if (!inEnum) throw `Node type of ${node.type} is not implemented yet.`;

    const traceFunction = traceFunctionMap.get(node.type as ENodeTypes);
    if (traceFunction) return traceFunction(node, context, verify, nodeTrace);
    else return getErrorObj(node, nodeTrace);
}