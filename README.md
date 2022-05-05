# ESLint Rule Development Toolkit
A library of awesome helpers for developing advanced ESLint rules with ease! Currently, only includes one central piece of functionality; tracing values mid-analysis.

The aim so to provide a more complete and sound analysis whenever identifiers are considered in ESLint rules.

## Getting started

Below is a description of the details to consider when using the function.

## The Trace Value algorithm
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
```typescript
{ 
  result: { 
    isVerified: boolean;
    determiningNode: TSESTree.Node;
  }
  nodeComponentTrace: ITraceNode[];
}
```

## TraceValue examples
### Determining the value of an object property reference

In the ESLint rule:
```javascript
//... We locate an ObjectExpression node, where we want to analyse the Literal's value of property a.
const result = traceValue(Node, RuleContext, (node) => node.type === "Literal");

if(!result.isVerified) Context.report(node, "Failed to determine value of object.a");
else if(result.determiningNode.value !== "the exact value i want") Context.report(node, "Object.a must be the exact value i want.");
```

Javascript source code:
```javascript
const obj_001 = { a: "This is a string", b: "Another string" };
```
In this example, the rule reports "Object.a must be the exact value I want.", on the node `obj_001`;

Javascript source code:
```javascript
const obj_002 = { a: fetch('https://evilcorp.com/hacky-hacky'), a: "Safe string" };
```
In this example, the rule reports "Failed to determine value of object.a", on the node `obj_002`.

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

#### LIMITATION keyword
There are a number of tests prefixed with "LIMITATION" keyword, which means the result of the tracing is lackluster.
Failing "LIMITATION" tests are not necessarily an issue. It could be due to an extension of functionality.