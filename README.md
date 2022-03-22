# eslint-rule-dev-toolkit
A toolkit of awesome helpers for developing advanced ESLint rules with ease!

### TODO
- [X] Refactor to enums and Map (traceValue)
- [X] Refactor nodeTrace out to its own helper
- [X] Refactor traceFunctionExpression
- [X] Dependency Injection of traceValue import
- [X] Documentation upgrade
- [X] Multi-file tests
- [X] Improve/Refactor nodeComponentTrace algorithm (returns the parent multiple times)
- [ ] Handle function calls on classes (strings, arrays etc.)
- [ ] Add filename to nodes in nodeComponentTrace

Down prioritized:
- [ ] Improve/Refactor the Identifier handler
- [ ] Implement `includes` parameter to traceValue

### Order of execution
Step 1
- [X] Improve nodeComponentTrace algorithm

Step 2
- [ ] Use traceValue in a rule implementation
- [X] Add function call for .concat, .push .map etc.
- [ ] Add more interesting test cases

Step 3
- [ ] Handle some simple function calls
- [ ] Use the parser provided in the context
- [ ] Add test cases to showcase different parsers

Step 4:
- [ ] Add more functionality (loops, classes etc.)
- [ ] Use traceValue in more rule implementations

Step 5:
- [ ] Add more utilities to the toolkit + tests

## The traceValue algorithm
### Function parameters
The function takes three parameters; an AST node, a rule context, and optionally a verifier function.
Because this function is a helper function for rule developers, the AST node provided by the user, is whatever node the rule developer wants to check.
The rule context is just the context of the rule being developed.
The verifier function is a function that describes a recipe of how to verify the node/deem the node safe.

### Function return
TraceValue returns an object containing a result and a trace. The result includes a boolean and an AST node.
This node is the determining node from the process of verifying the provided node.
The boolean describes whether the AST node can be deemed safe or not.

The `nodeComponentTrace` field is a representation of all the value nodes that were visited in the process of verifying the provided node.
As a result of this approach, whenever the algorithm visits a node that can not be verified, the `nodeComponentTrace` will only include the nodes related to this unverified node.
In cases where there are no unverified nodes, the `nodeComponentTrace` includes all visited nodes.

### The type of the returned object:
{ result: { isVerified: boolean, determiningNode: TSESTree.Node }, nodeComponentTrace: ITraceNode[] }

## TraceValue examples
### Object example - safe
Javascript source code:
```javascript
const obj_001 = { a: "Safe string", b: "Another safe string" };
```

#### Arguments:

Node --> ObjectExpression <br/>
Context --> RuleContext (atm we just provide the AST of the target file) <br/>
Verifier --> (node: ESTree.Node) => node.type === "Literal" <br/>

#### Result
`{ result: { isVerified: true, determiningNode: Literal }, nodeComponentTrace: ESTree.Node[] }`

Where the determining literal node has the value of "Another safe string", and the nodeComponentTrace contains the following nodes: <br/>
ObjectExpression --> Literal --> Literal.

### Object example - unsafe
Javascript source code:
```javascript
const obj_002 = { a: "Safe string", b: fetch('https://evilcorp.com/hacky-hacky') };
```

#### Arguments:

Node --> ObjectExpression <br/>
Context --> RuleContext (atm we just provide the AST of the target file) <br/>
Verifier --> (node: ESTree.Node) => node.type === "Literal" <br/>

#### Result
`{ result: { isVerified: false, determiningNode: CallExpression }, nodeComponentTrace: ESTree.Node[] }`

Where the nodeComponentTrace contains the following nodes: <br/>
ObjectExpression --> CallExpression.

### Analyzing the node identifier
If you want to analyze the identifier of the node instead of the value, you can use the AST returned from traceValue to analyze it yourself.
For example if you wanted to make a rule that checks if all variable names are ice cream flavors, you can traverse the returned AST yourself, and do the checking.

## Test suite
### Approach
The test files in the test suite are separated based on different types of programming constructs.
The traceValue algorithm might be able to correctly analyze additional programming constructs beyond what is present in these tests.
Accompanying the test files are target files containing Javascript source code.
These target files include different test cases for each type of programming construct.
The tests in the test files are simply testing the result of tracing some value in a target file, for example `arr_001`, which is array case 1.

#### Limited keyword
There are a number of tests prefixed with "LIMITED" keyword, which means the result of the tracing is lackluster.
Failing "LIMITED" tests are not necessarily an issue. It could be due to an extension of functionality.

## Work in progress - The includes parameter
Use the includes parameter to add tracing of values other than Literals.