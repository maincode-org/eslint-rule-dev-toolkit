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
const obj_001 = { a: 'A safe string' };                                                                                                          // all properties safe
const obj_002 = { a: fetch('https://evilcorp.com/hackyhacky') }                                                                            // unsafe property
const obj_003 = { a: 'A safe string', b: 'A safe string2' };                                                                                     // all properties safe
const obj_004 = { a: fetch('https://evilcorp.com/hackyhacky'), b: 'A safe string' };                                                       // unsafe property
const obj_005 = { a: 'A safe string', b: 'A safe string', c: 'A safe string', d: fetch('https://evilcorp.com/hackyhacky') };               // unsafe property
const obj_006 = { c: sim_001, d: 'A safe string3' };                                                                                             // all properties safe
const obj_007 = { a: sim_002, b: 'A safe string' };                                                                                              // unsafe property from variable
const obj_008 = { a: obj_001.a, b: obj_004.a };                                                                                                  // unsafe property
const obj_009 = { ...obj_001, ...obj_002 };                                                                                                      // unsafe property in obj_002
const obj_010 = { ...obj_002, ...obj_001 };                                                                                                      // safe property in obj_002
const obj_011 = { ...{ a: 'A safe string', b: 'A safe string1' }, ...{ c: 'A safe string2', d: 'A safe string3' } };                             // all properties are safe
const obj_012 = { ...{ a: 'A safe string', b: 'A safe string' }, ...{ c: 'A safe string', d: fetch('https://evilcorp.com/hackyhacky') } }; // unsafe property from spread object
const obj_013 = { a: 'A safe string', b: null };                                                                                                 // all properties are safe

// Reassignment in global scope.
let obj_015 = { a: 'A safe string', b: 'A safe string2' };                                                                                       // all properties safe
obj_015 = { a: fetch('https://evilcorp.com/hackyhacky'), b: 'A safe string' };                                                             // reassigned to unsafe
const obj_014 = obj_015;                                                                                                                         // references unsafe

// String manipulation, template strings, concatenations
// str = string
const str_001 = "A safe value" + "1";                                                  // safe
const str_002 = "A safe value" + "1" + "2";                                            // safe
const str_003 = "A safe value" + "1" + fetch('https://evilcorp.com/hackyhacky'); // unsafe
const str_004 = "A safe value" + fetch('https://evilcorp.com/hackyhacky');       // unsafe
const str_005 = "A safe value" + obj_001.a;                                           // safe
const str_006 = "A safe value" + obj_002.a;                                           // unsafe
const str_007 = "A safe value1" + sim_001;                                            // safe
const str_008 = "A safe value" + sim_002;                                             // unsafe
const str_009 = `A safe value ${1}`;                                                  // safe
const str_010 = `A safe value ${fetch('https://evilcorp.com/hackyhacky')}`;     // unsafe
const str_011 = `A safe value1 ${sim_001}`;                                          // safe
const str_012 = `A safe value ${sim_002}`;                                           // unsafe
const str_013 = `A safe value ${obj_001.a}`;                                         // safe
const str_014 = `A safe value ${obj_002.a}`;                                         // unsafe

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
const arr_005 = [...arr_001, 'A safe string2'];                                     // safe
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
const arr_017 = ['A safe string'];                                                  // safe
const arr_018 = [fetch('https://evilcorp.com/hackyhacky')];                   // unsafe

// Reassignment in global scope.
let arr_020 = ['A safe value', 'A safe value1'];                                   // safe
arr_020 = ['A safe string', fetch('https://evilcorp.com/hackyhacky')];       // reassignment to unsafe
const arr_019 = arr_020;                                                           // references unsafe

// Maps cases
// both simple and advanced, like maps of functions!
const map_001 = new Map([["a", 1]]);
const map_002 = new Map([["a", fetch('https://evilcorp.com/hackyhacky')]]);
const map_003 = new Map([["a", 1], ["b", 2]]);
const map_004 = new Map([["a", 1], ["b", fetch('https://evilcorp.com/hackyhacky')]]);
const map_005 = new Map([["a", obj_001.a]]);
const map_006 = new Map([["a", obj_002.a]]);
const map_007 = new Map([["a", arr_001[0]]]);
const map_008 = new Map([["a", arr_004[0]]]);
const map_009 = new Map([["a", sim_001]]);
const map_010 = new Map([["a", sim_010]]);
const map_011 = new Map([["a", null]]);

// Accessing maps - map.get("a) - has not been implemented since CallExpressions are not implemented.

// Mathematical expression cases
const mat_001 = 1 + 2;
const mat_002 = 1 + fetch('https://evilcorp.com/hackyhacky');
const mat_003 = 1 - 2;
const mat_004 = 1 - fetch('https://evilcorp.com/hackyhacky');
const mat_005 = 2 * 2;
const mat_006 = 1 * fetch('https://evilcorp.com/hackyhacky');
const mat_007 = 2 / 2;
const mat_008 = 1 / fetch('https://evilcorp.com/hackyhacky');
const mat_009 = 1 + 2 + 3;
const mat_010 = 1 + 2 + fetch('https://evilcorp.com/hackyhacky');
const mat_011 = 2 > 3;
const mat_012 = 2 <= fetch('https://evilcorp.com/hackyhacky');

// Logical expression cases
// log = logical expressions
const num = 5;
const log_001 = num > 4 ? 'A safe string' : 'A safe string1';
const log_002 = num > 4 ? 'A safe string' : fetch('https://evilcorp.com/hackyhacky');
const log_003 = num < 4 ? 'A safe string' : fetch('https://evilcorp.com/hackyhacky');
const log_004 = num > 4 ? sim_001 : sim_004;
const log_005 = num > 4 ? sim_001 : sim_002;
const log_006 = num > 4 ? obj_001 : obj_002;
const log_007 = num > 4 ? arr_001 : arr_002;
const log_008 = num > 4 ? arr_001 : arr_003;

const log_009 = num > 4 ?? 'A safe string';
const log_010 = num > 4 ?? fetch('https://evilcorp.com/hackyhacky');

// Conditional branching - code path analysis

// Function cases - calls
const fun_001 = () => 2 + 2;
const fun_002 = () => fetch('https://evilcorp.com/hackyhacky');
const fun_003 = () => sim_001;
const fun_004 = () => sim_002;
const fun_005 = () => obj_001;
const fun_006 = () => obj_002;
const fun_007 = () => arr_001;
const fun_008 = () => arr_003;

const fun_009 = function () {
    return 'A safe value';
}
const fun_010 = function () {
    return fetch('https://evilcorp.com/hackyhacky');
}
const fun_011 = function () { return sim_001; }
const fun_012 = function () { return sim_002; }
const fun_013 = function () { return obj_001; }
const fun_014 = function () { return obj_002; }
const fun_015 = function () { return arr_001; }
const fun_016 = function () { return arr_003; }
const fun_017 = function () {
    const a = 'A safe string';
    return a + "1";
}
const fun_018 = function () {
    const a = 'A safe string';
    return a + fetch('https://evilcorp.com/hackyhacky');
}

// Functions with if-else cases
const fun_019 = function () {
    if (num > 4) return "A safe value";
    return "A safe value1";
}
const fun_020 = function () {
    if (num > 4) return "A safe value";
    else return "A safe value1";
}
const fun_021 = function () {
    if (num > 4) return "A safe value";
    else return fetch('https://evilcorp.com/hackyhacky');
}
const fun_022 = function () {
    if (num <= 4) return fetch('https://evilcorp.com/hackyhacky');
    else return "A safe value";
}
const fun_023 = function () {
    if (num <= 4) return obj_001;
    else return obj_002;
}
const fun_024 = function () {
    if (num <= 4) return arr_001;
    else return arr_002;
}
const fun_025 = function () {
    const a = obj_001.a;
    if (a === "A safe value") return "Strawberry";
    else return "Blueberry";
}
const fun_026 = function () {
    const a = arr_002[1];
    if (a <= 4) return "A safe value";
    else return "A safe value1";
}
// Can't solve this because fun_019 can't be deemed safe because of 'a' - an Identifier it cannot see the value of.
/*
const fun_019 = function (a) {
    return 'A safe value' + a;
}
const fun_020 = fun_019("1");
*/

// Function cases - code path analysis

// Simple loops
// TODO concatenation / aggregation
// TODO function calls
// TODO api calls

// Different types of exports

// Scopes
// sco = scope
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
