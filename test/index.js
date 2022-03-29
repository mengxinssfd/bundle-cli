import * as utils from './utils';

console.log(utils.inRange(100, [20]));
debugger;
console.log(utils.isArray({}));
console.log(utils.isArray(utils.isNumber([])));
const a = 10;
let b = 1;
b += a;
console.log(b);
const rand = Math.random();
console.log(rand);

export * from './utils';
