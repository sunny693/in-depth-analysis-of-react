export {  getIntrinsicNamespace, getChildNamespace } from './DOMNamespaces';
/**
 * React isn't provided directly.
 * Returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it).
 * Exclude objects that have hasOwnProperty of their own,influence the result. 
*/
export function ownProperty(obj, propsName) {
  return Object.prototype.hasOwnProperty.call(obj, propsName);
}

/**
 * 错误提示
*/
export function formatProdErrorMessage(code, ...arg) {
  let url = `https://reactjs.org/docs/error-decoder.html?invariant=${code}`;

  arg.map(item => url += `&args[]=${encodeURIComponent(item)}`);

  return `Minified React error #${code}; visit ${url} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`;
};

/**
 * 避免用户传递的key值包含正则表达式
*/
export function escapeUserProvidedKey(text) { return text.replace(/\/+/g, '$&/') }

export function compare(a, b) {
  const diff = a.sortIndex - b.sortIndex;

  return diff !== 0 ? diff : a.id - b.id;
};

export function getCurrentTime() { return performance.now() };

/**
 * 保证element的key安全
*/
function escape(key) {
  const escaperLookup = {
    "=": "=0",
    ":": "=2"
  };

  return "$" + key.replace(/[=:]/g, match => escaperLookup[match]);
};

export function getElementKey(element, index) {
  if (typeof element === 'object' && element !== null && element.key != null) return escape( String(element.key) );

  return index.toString(36);
}

/***
 * react-dom utils
 */

export function getToStringValue(value) {
  switch (typeof value) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return value;
    default:
      return ""
  }
}

export default {
  ownProperty,
  escapeUserProvidedKey,
  formatProdErrorMessage,
  getElementKey,
  compare,
  getToStringValue,
};