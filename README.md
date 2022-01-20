# eslint-rule-dev-toolkit
A toolkit of awesome helpers for developing advanced ESLint rules with ease!

## The traceValue algorithm
### The function parameters
The function takes three parameters; an AST node, a rule context, and optionally a verifier function.
Because this function is a helper function for rule developers, the AST node provided by the user, is whatever node the rule developer wants to check.
The rule context is just the context of the rule being developed.
The verifier function is a function that describes a recipe of how to verify the node/deem the node safe.

### The function return
traceValue returns an object containing a result and a trace. The result includes a boolean and an AST node.
This node is the determining node from the process of verifying the provided node.
The boolean describes whether the AST node can be deemed safe or not.

The `nodeComponentTrace` field is a representation of all the value nodes that were visited in the process of verifying the provided node.

{ result: { isVerified: boolean, determiningNode: Node }, nodeComponentTrace: Node[] }

### Input/output examples
#### Example 1

#### Example takeaways
The trace includes all the nodes that were visited in the verification process ending with the node that determined the answer.
In the positive case, the trace includes all value nodes, whereas the negative case (something unsafe is found) the trace includes the value nodes up to the unsafe node.
If the unsafe node is the last the algorithm had to check,
the trace will include the same nodes as if it could be verified, which is the complete set of value nodes involved in the traversal.

TODO: Fix the following section <br/>
It should rather be like: "Use the includes parameter to add tracing of values other than the Literals"
### Analyzing the node identifier
If you want to analyze the identifier of the node instead of the value, you can use the AST returned from traceValue to analyze it yourself.
For example if you wanted to make a rule that checks if all variable names are ice cream flavors, you can traverse the returned AST yourself, and do the checking.

