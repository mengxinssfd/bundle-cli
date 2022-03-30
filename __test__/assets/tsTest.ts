import * as utils from './tsUtils';

// TODO 在该页面调用过的函数会重复声明  是export * from "./utils"导致的重复
console.log(utils.inRange(100, [20]));
debugger;
console.log(utils.isArray({}));
console.log(utils.isArray(utils.isNumber([])));
console.log(utils.isObjectLike({}));
const a = 10;
let b = 1;
b += a;
console.log(b);
const rand = Math.random();
console.log(rand);

let o: undefined | { a: number } = undefined;

if (rand > 1000) {
  o = { a: 111 };
}

console.log(o?.a ?? true);

// export * from "./utils";
