export function inRange(value: any, [min = -Infinity, max = Infinity]) {
  return min <= value && value <= max;
}

export function typeOf(target: any) {
  const tp = typeof target;
  if (tp !== 'object') return tp;
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

export function isObject(target: any) {
  return typeOf(target) === 'object';
}

export function isObjectLike(value: any) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export const isBroadlyObj = isObjectLike;

export function isArray(target: any) {
  return typeOf(target) === 'array';
}

export function isString(target: any) {
  return typeOf(target) === 'string';
}

export function isNumber(target: any) {
  return typeOf(target) === 'number';
}

export function isFunction(target: any) {
  return typeOf(target) === 'function';
}

export function isBoolean(target: any) {
  return typeOf(target) === 'boolean';
}
