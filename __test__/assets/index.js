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

console.log(utils.arrowFn());

async function testAsync(){
  return Promise.all([1,2]);
}

(async function(){
  console.log(await testAsync());
})()

export * from './utils';
