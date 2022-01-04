# eslint-rule-dev-toolkit
A toolkit of awesome helpers for developing advanced ESLint rules with ease!

## The traceValue algorithm
### The function parameters
The function takes three parameters - an AST node, a rule context, and optionally a verifier function.
Because this function is a helper function for rule developers, the AST node provided by the user, is whatever node the rule developer wants to check.
The rule context is just the context of the rule being developed.
The verifier function is a function that describes a recipe of how to deem the node safe.

### The function return
traceValue returns a boolean and an AST. The boolean describes whether the AST node can be deemed safe or not,
and the AST is a representation of the visited nodes in the process of analyzing whether the value of the node is safe.
If no verifier function is provided, the function returns true, and an AST of all relevant nodes in regard to the value of the provided AST node.

### Input/output examples
#### Example 1
**Arguments**

Node --> `b`

Context --> The context with the following program.

```js
const a = "maincode";
let b = a;
b = "eslint";
const c = b;
```
where the value node of `c = b` is b.

Verifier --> `(node: ESTree.Node) => node.type === "Literal";`

**The function call**
`traceValue(bNode, context, verify);`

**Returned value**

{ verified: true, ast: AST }

The AST includes:
```js
[identifierBNode, assignmentBNode, literalNode]
```

Note that the AST does not include values that are not considered in the analysis of deeming the value of the provided node safe or not.

#### Example 2
**Arguments**

**The function call**

**The returned value**

#### Example takeaways
Returns the path to the first node referenced that does not pass verify() or the full path until the value is no longer a reference.

### Analyzing the node identifier
If you want to analyze the identifier of the node instead of the value, you can use the AST returned from traceValue to analyze yourself.

For example if you wanted to make a rule that checks if all variable names are ice cream flavors, you can traverse the returned AST yourself, and do the checking. 

