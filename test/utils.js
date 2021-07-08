export function inRange(value, [min = -Infinity, max = Infinity]) {
  return min <= value && value <= max;
}

export function typeOf(target) {
  const tp = typeof target;
  if (tp !== "object")
    return tp;
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}
export function isObject(target) {
  return typeOf(target) === "object";
}
export function isObjectLike(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}
export const isBroadlyObj = isObjectLike;
export function isArray(target) {
  return typeOf(target) === "array";
}
export function isString(target) {
  return typeOf(target) === "string";
}
export function isNumber(target) {
  return typeOf(target) === "number";
}
export function isFunction(target) {
  return typeOf(target) === "function";
}
export function isBoolean(target) {
  return typeOf(target) === "boolean";
}