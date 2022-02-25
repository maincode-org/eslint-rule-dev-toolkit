const sim_001 = require('./file-4');
const sim_002 = require('./file-4');
const { sim_003, sim_004 } = require('./file-4');

const obj_001 = require('./file-4');
const obj_002 = require('./file-4');
const obj_003 = require('./file-4');
const obj_004 = require('./file-4');
const obj_009 = require('./file-4');

const arr_001 = require('./file-4');
const arr_002 = require('./file-4');
const arr_003 = require('./file-4');

const obj_sim_001 = { a: sim_001 };
const obj_sim_002 = { a: sim_002 };

const arr_sim_001 = [ sim_001 ];
const arr_sim_002 = [ sim_002 ];
const arr_sim_003 = [ sim_003, sim_004 ];

const arr_obj_001 = [ obj_001 ];
const arr_obj_002 = [ obj_002 ];
const arr_obj_003 = [ obj_003 ];
const arr_obj_004 = [ obj_004.b ];
const arr_obj_005 = [ obj_009 ];

const str_sim_001 = "A safe value" + sim_001;
const str_sim_002 = "A safe value" + sim_002;
const str_sim_003 = `A safe value ${sim_001}`;
const str_sim_004 = `A safe value ${sim_002}`;

const str_obj_001 = "A safe value" + obj_001.a;
const str_obj_002 = "A safe value" + obj_002.a;
const str_obj_003 = `A safe value ${obj_001.a}`;
const str_obj_004 = `A safe value ${obj_002.a}`;
const str_obj_005 = `A safe value ${obj_004.b}`;

const map_sim_001 = new Map([["a", sim_001]]);
const map_sim_002 = new Map([["a", sim_002]]);

const map_obj_001 = new Map([["a", obj_001]]);
const map_obj_002 = new Map([["a", obj_002]]);
const map_obj_003 = new Map([["a", obj_003]]);

const map_arr_001 = new Map([["a", arr_001]]);
const map_arr_002 = new Map([["a", arr_003]]);

const num = 4;
const log_sim_001 = num > 4 ? sim_001 : sim_004;
const log_sim_002 = num > 4 ? sim_001 : sim_002;

const log_obj_001 = num > 4 ? obj_001 : obj_002;

const log_arr_001 = num > 4 ? arr_001 : arr_002;
const log_arr_002 = num > 4 ? arr_001 : arr_003;

const fun_sim_001 = () => sim_001;
const fun_sim_002 = () => sim_002;
const fun_sim_003 = function () { return sim_001; }
const fun_sim_004 = function () { return sim_002; }

const fun_obj_001 = () => obj_001;
const fun_obj_002 = () => obj_002;
const fun_obj_003 = function () { return obj_001; }
const fun_obj_004 = function () { return obj_002; }
const fun_obj_005 = function () {
    if (num <= 4) return obj_001;
    else return obj_002;
}
const fun_obj_006 = function () {
    const a = obj_001.a;
    if (a === "A safe value") return "Strawberry";
    else return "Blueberry";
}

const fun_arr_001 = () => arr_001;
const fun_arr_002 = () => arr_003;
const fun_arr_003 = function () { return arr_001; }
const fun_arr_004 = function () { return arr_003; }
const fun_arr_005 = function () {
    if (num <= 4) return arr_001;
    else return arr_002;
}
const fun_arr_006 = function () {
    const a = arr_002[1];
    if (a <= 4) return "A safe value";
    else return "A safe value1";
}

