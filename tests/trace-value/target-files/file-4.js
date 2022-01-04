/**
 * This file contains values at test-depth "4".
 * This is the bottom level, and the values here may not reference other project files.
 * We define "unsafe" as a_001 value which does not in its entirety come from within the program itself, or its direct environment.
 */

// Const, let, var and re-assignment cases
const a_001 = 'A definite string';

let b_001 = 'A definite string';
b_001 = 'Still a_001 definite string';

const b_002 = a_001;

var c = 'A definite string';
c = fetch('no-longer-a-definite-string!'); // c is now unsafe

const d = fetch('not-a-definite-string!'); // d is now unsafe

let e = fetch('not-a-literal!'); // e is now unsafe
e = 'A literal'; // e is now safe

// Object cases
const f = { a: a_001, b: 'another definite string' };

const g = { a: a_001, b: c }; // g.b is now unsafe

const h = { ...f, ...g }; // h.b is now unsafe

const i = { ...g, ...f };

const j = { ...i, ...h }; // j.b is now unsafe

const k = { ...j, b: f.b };

const l = { ...k, b: g.b }; // l.b is now unsafe

const m = { a: c, b: a_001 }; // m.a is now unsafe

// TODO Use some examples with 4 spreads

// String manipulation, template strings, concatenations
//.. with object properties inside, var references inside, direct values inside good + bad.

// Array cases
// TODO Show that arrays can contain unsafe or only safe values Ex and Ax cases
// TODO Show that single array item access cannot be deemed safe if array contains some unsafe element (we can't know the order at STA time)
// TODO test with push(?)
// TODO test with spread operator
// TODO test with array concat
// TODO test with re-assignment

// Mathematics cases

// Logic expression cases

// Conditional branching - code path analysis

// Function cases - calls

// Function cases - code path analysis

// Simple loops
// TODO concatenation / aggregation
// TODO function calls
// TODO api calls

// Maps cases
// both simple and advanced, like maps of functions!

// Different types of exports
