# eslint-rule-dev-toolkit
A toolkit of awesome helpers for developing advanced ESLint rules with ease!

### TODO
- [X] Refactor to enums and Map (index)
- [X] Refactor nodeTrace out to its own helper
- [ ] Check traceFunctionExpression - seems wrong...
- [ ] Dependency Injection of index import
- [ ] Documentation upgrade
- [ ] Multi-file tests
- [ ] Handle CallExpressions (Function calls)

## The index algorithm
### Function parameters
The function takes three parameters; an AST node, a rule context, and optionally a verifier function.
Because this function is a helper function for rule developers, the AST node provided by the user, is whatever node the rule developer wants to check.
The rule context is just the context of the rule being developed.
The verifier function is a function that describes a recipe of how to verify the node/deem the node safe.

### Function return
index returns an object containing a result and a trace. The result includes a boolean and an AST node.
This node is the determining node from the process of verifying the provided node.
The boolean describes whether the AST node can be deemed safe or not.

The `nodeComponentTrace` field is a representation of all the value nodes that were visited in the process of verifying the provided node.
As a result of this approach, whenever the algorithm visits a node that can not be verified, the `nodeComponentTrace` will only include the nodes related to this unverified node.
In cases where there are no unverified nodes, the `nodeComponentTrace` includes all visited nodes.

### The type of the returned object:
{ result: { isVerified: boolean, determiningNode: Node }, nodeComponentTrace: Node[] }

### Input/output examples
#### Example 1

TODO: Fix the following section <br/>
It should rather be like: "Use the includes parameter to add tracing of values other than the Literals"
### Analyzing the node identifier
If you want to analyze the identifier of the node instead of the value, you can use the AST returned from index to analyze it yourself.
For example if you wanted to make a rule that checks if all variable names are ice cream flavors, you can traverse the returned AST yourself, and do the checking.

