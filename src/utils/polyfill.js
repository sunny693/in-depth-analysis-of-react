/**
 * @source react/packages/shared/objectIs.js
*/
function is(x, y) {
  return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y
}

export const objectIs = "function" === typeof Object.is ? Object.is : is;