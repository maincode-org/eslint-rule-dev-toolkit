/**
 * This file contains values at test-depth "4".
 * This is the bottom level, and the values here may not reference other project files.
 * We define "unsafe" as a_001 value which does not in its entirety come from within the program itself, or its direct environment.
 */

// Const, let, var and re-assignment cases
const a_001 = 'A definite string';

let b_001 = 'A definite string';
b_001 = 'Still a_001 definite string';

var c = 'A definite string';
c = fetch('no-longer-a-definite-string!'); // c is now unsafe

const d = fetch('not-a-definite-string!'); // d is now unsafe

let e = fetch('not-a-literal!'); // e is now unsafe
e = 'A literal'; // e is now safe

// Object cases
const f = { a: a_001, b: 'another definite string' };

const g = { a: a_001, b: c }; // g.b_001 is now unsafe

const h = { ...f, ...g }; // h.b_001 is now unsafe

const i = { ...g, ...f };

const j = { ...i, ...h }; // j.b_001 is now unsafe

const k = { ...j, b: f.b };

const l = { ...k, b: g.b }; // l.b_001 is now unsafe

const m = { a: c, b: a_001 }; // m.a_001 is now unsafe

// Template string cases
//.. with object properties inside, var references inside, direct values inside good + bad.

// Array cases

// Mathematics cases

// Logic expression cases

// Simple loops

// Conditional branching - code path analysis

// Function cases - calls

// Function cases - code path analysis

// Maps cases
//.. both simple and advanced, like maps of functions!
