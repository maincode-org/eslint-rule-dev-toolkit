/**
 * This file contains values at test-depth "4".
 * This is the bottom level, and the values here may not reference other project files.
 * We define "unsafe" as a_001 value which does not in its entirety come from within the program itself, or its direct environment.
 */

// Const, let, var and re-assignment cases
// sim = simple
const sim_001 = 'A safe value';                                 // safe
const sim_002 = fetch('https://evilcorp.com/hackyhacky'); // unsafe

let sim_003 = 'A safe value';                                  // declared with safe
sim_003 = 'Still a safe value';                                // re-assigned to safe

let sim_004 = 'A safe value';                                 // declared with safe
sim_004 = fetch('https://evilcorp.com/hackyhacky');     // re-assigned to unsafe

let sim_005 = fetch('https://evilcorp.com/hackyhacky'); // declared as unsafe
sim_005 = 'A safe value';                                    // re-assigned to safe

// show var also works
var sim_006 = fetch('https://evilcorp.com/hackyhacky'); // declared as unsafe
sim_006 = fetch('https://evilcorp.com/hackyhacky');     // re-assigned to unsafe

let sim_007 = 'A safe value';                                // declared as safe
sim_007 = sim_001;                                           // re-assigned to safe variable

let sim_008 = 'A safe value';                                // declared as safe
sim_008 = sim_002;                                           // re-assigned to unsafe variable

let sim_009 = fetch('https://evilcorp.com/hackyhacky'); // declared as unsafe
sim_009 = sim_001;                                           // re-assigned to safe variable

let sim_010 = fetch('https://evilcorp.com/hackyhacky'); // declared as unsafe
sim_010 = sim_002;                                           // re-assigned to unsafe variable

const sim_011 = sim_001;                                     // declared with safe identifier

// Object cases
// obj = object
const obj_001 = { a: 'A safe string', b: 'A safe string' };                                                                                      // all properties safe

const obj_002 = { a: fetch('https://evilcorp.com/hackyhacky'), b: 'A safe string' };                                                       // unsafe property

const obj_003 = { a: 'A safe string', b: 'A safe string', c: 'A safe string', d: fetch('https://evilcorp.com/hackyhacky') };               // unsafe property

const obj_004 = { a: sim_001, b: 'A safe string' };                                                                                              // all properties safe

const obj_005 = { a: sim_002, b: 'A safe string' };                                                                                              // unsafe property from variable

const obj_006 = { a: obj_002.a, b: obj_001.b };                                                                                                  // unsafe property

const obj_007 = { ...obj_001, ...obj_002 };                                                                                                      // unsafe property in obj_002

const obj_008 = { ...obj_002, ...obj_001 };                                                                                                      // safe property in obj_002

const obj_009 = { ...{ a: 'A safe string', b: 'A safe string' }, ...{ c: 'A safe string', d: 'A safe string' } };                                // all properties are safe

const obj_010 = { ...{ a: 'A safe string', b: 'A safe string' }, ...{ c: 'A safe string', d: fetch('https://evilcorp.com/hackyhacky') } }; // unsafe property from spread object

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

// Scopes
// ------------ Case 1 ------------
let sco_001 = 'safe';

const outer = () => {
    sco_001 = 'outer';

    const inner = () => {
        sco_001 = 'inner';
        const sco_002 = sco_001;
    }
}
// ---------------------------------
