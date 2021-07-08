export function forEach(arr, callbackFn, elseCB) {
  // 不能直接把arr.length放进循环，否则在循环里新增的话length会变长,原生的不会变长
  const len = arr.length || 0;
  // if (!isArrayLike(arr)) throw new TypeError();
  for (let i = 0; i < len; i++) {
    if (callbackFn(arr[i], i, arr) === false)
      return false;
  }
  elseCB && elseCB();
  return true;
}

export async function forEachAsync(cbAsync, thisArg) {
  const arr = thisArg || this;
  // 不能直接把arr.length放进循环，否则在循环里新增的话length会变长,原生的不会变长
  const len = arr.length;
  // if (!isArrayLike(arr)) throw new TypeError();
  for (let i = 0; i < len; i++) {
    const v = await cbAsync(arr[i], i, arr);
    if (v === false)
      break;
  }
}
export function inRange(value, [min = -Infinity, max = Infinity]) {
  return min <= value && value <= max;
}