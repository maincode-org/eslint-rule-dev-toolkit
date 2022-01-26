/**
 * This file contains values at test-depth "4".
 * This is the bottom level, and the values here may not reference other project files.
 * We define "unsafe" as a_001 value which does not in its entirety come from within the program itself, or its direct environment. ???
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
const sim_012 = sim_011;                                     // declared with identifier referencing an identifier

// Object cases
// obj = object
const obj_001 = { a: 'A safe string', b: 'A safe string2' };                                                                                     // all properties safe
const obj_002 = { a: fetch('https://evilcorp.com/hackyhacky'), b: 'A safe string' };                                                       // unsafe property
const obj_003 = { a: 'A safe string', b: 'A safe string', c: 'A safe string', d: fetch('https://evilcorp.com/hackyhacky') };               // unsafe property
const obj_004 = { c: sim_001, d: 'A safe string3' };                                                                                             // all properties safe
const obj_005 = { a: sim_002, b: 'A safe string' };                                                                                              // unsafe property from variable
const obj_006 = { a: obj_002.a, b: obj_001.b };                                                                                                  // unsafe property
const obj_007 = { ...obj_001, ...obj_002 };                                                                                                      // unsafe property in obj_002
const obj_008 = { ...obj_002, ...obj_001 };                                                                                                      // safe property in obj_002
const obj_009 = { ...{ a: 'A safe string', b: 'A safe string1' }, ...{ c: 'A safe string2', d: 'A safe string3' } };                             // all properties are safe
const obj_010 = { ...{ a: 'A safe string', b: 'A safe string' }, ...{ c: 'A safe string', d: fetch('https://evilcorp.com/hackyhacky') } }; // unsafe property from spread object
const obj_011 = { a: 'A safe string', b: null };                                                                                                 // all properties are safe

// We can't handle reassignments in global scope
let obj_013 = { a: 'A safe string', b: 'A safe string2' };                                                                                       // all properties safe
obj_013 = { a: fetch('https://evilcorp.com/hackyhacky'), b: 'A safe string' };                                                             // reassigned to unsafe
const obj_012 = obj_013;                                                                                                                         // references unsafe

// String manipulation, template strings, concatenations
// str = string
const str_001 = "A safe value" + "1";                                             // safe
const str_002 = "A safe value" + fetch('https://evilcorp.com/hackyhacky');  // unsafe
const str_003 = "A safe value" + obj_001.a;                                       // safe
const str_004 = "A safe value" + obj_002.a;                                       // unsafe
const str_005 = "A safe value" + sim_001;                                         // safe
const str_006 = "A safe value" + sim_002;                                         // unsafe
const str_007 = `A safe value ${1}`;                                              // safe
const str_008 = `A safe value ${fetch('https://evilcorp.com/hackyhacky')}`; // unsafe
const str_009 = `A safe value ${sim_001}`;                                        // safe
const str_010 = `A safe value ${sim_002}`;                                        // unsafe
const str_011 = `A safe value ${obj_001.a}`;                                      // safe
const str_012 = `A safe value ${obj_002.a}`;                                      // unsafe

// Array cases
// arr = array
// TODO Show that arrays can contain unsafe or only safe values Ex and Ax cases
// TODO Show that single array item access cannot be deemed safe if array contains some unsafe element (we can't know the order at STA time)
// TODO test with push(?)
// TODO test with spread operator
// TODO test with array concat
// TODO test with re-assignment
const arr_001 = ['A safe string', 'A safe string1'];                                // safe
const arr_002 = [1,2,3];                                                            // safe
const arr_003 = ['A safe string', fetch('https://evilcorp.com/hackyhacky')];  // unsafe
const arr_004 = [fetch('https://evilcorp.com/hackyhacky'), 'A safe string'];  // unsafe
const arr_005 = [...arr_001, 'A safe string2'];                                       // safe
const arr_006 = ['A safe string2', ...arr_001];                                     // safe
const arr_007 = ['A safe string', ...arr_003];                                      // unsafe
const arr_008 = arr_003[0];                                                         // unsafe
const arr_009 = arr_003[1];                                                         // unsafe
const arr_010 = arr_001[0];                                                         // safe
const arr_011 = ['A safe value', obj_001.a];                                        // safe
const arr_012 = ['A safe value', obj_002.a];                                        // unsafe
const arr_013 = ['A safe value', sim_001];                                          // safe
const arr_014 = ['A safe value', sim_002];                                          // unsafe
const arr_015 = ['A safe value', null];                                             // safe
const arr_016 = [fetch('https://evilcorp.com/hackyhacky'), null];             // unsafe

// We can't handle reassignments in global scope
let arr_018 = ['A safe value', 'A safe value1'];                                   // safe
arr_018 = ['A safe string', fetch('https://evilcorp.com/hackyhacky')];       // reassignment to unsafe
const arr_017 = arr_018;                                                           // references unsafe

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

// ------------ Case 2 ------------
let sco_003 = 'safe';

const outer1 = () => {
    sco_003 = 'outer';

    const inner = () => {
        const sco_004 = sco_003;
    }
}
// ---------------------------------

// ------------ Case 3 ------------
let sco_005 = 'safe';

const outer2 = () => {
    const inner = () => {
        const sco_006 = sco_005;
    }
}
// ---------------------------------

// ------------ Case 4 ------------
const outer3 = () => {
    const inner = () => {
        let sco_007 = 'declaration';
        sco_007 = 'reassignment';
        const sco_008 = sco_007;
    }
}
// ---------------------------------
