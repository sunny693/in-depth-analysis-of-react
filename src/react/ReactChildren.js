/**
 * @source react/packages/react/src/ReactChildren.js
*/
import { isValidElement, cloneAndReplaceKey } from './ReactElement';
import { formatProdErrorMessage, getElementKey, escapeUserProvidedKey, } from './../utils/index';
import {
  REACT_ELEMENT_TYPE,
  REACT_PORTAL_TYPE,
  getIteratorFn,
} from './../shared/ReactSymbols';

function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  const type = typeof children;

  if (type === 'undefined' || type === 'boolean') children = null;

  let invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case "string":
      case "number":
        invokeCallback = true;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    const _child = children;
    let mappedChild = callback(_child);
    const childKey = nameSoFar === '' ? '.' + getElementKey(_child, 0) : nameSoFar;

    if (Array.isArray(mappedChild)) {
      let escapedChildKey = '';

      if (childKey != null) escapedChildKey = escapeUserProvidedKey(childKey) + '/';

      mapIntoArray(mappedChild, array, escapedChildKey, '', c => c);
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        mappedChild = cloneAndReplaceKey(
          mappedChild,
          escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey)
      }

      array.push(mappedChild);
    }

    return 1;
  };

  let child;
  let nextName;
  let subtreeCount = 0;
  const nextNamePrefix = (nameSoFar === '' ? "." : nameSoFar + ":");

  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getElementKey(child, i);
      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
    }
  } else {
    const iteratorFn = getIteratorFn(children);

    if (typeof iteratorFn === 'function') {
      const iterator = iteratorFn.call(children);
      let step;
      let ii = 0;

      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getElementKey(child, ii++);
        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
      }

    } else if (child === "object") {
      const childrenString = "" + children;

      throw Error(formatProdErrorMessage(31, childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString));
    }
  };

  return subtreeCount;
}

function mapChildren(children, func, context) {
  if (children == null) return children;

  let result = [];
  let count = 0;

  mapIntoArray(children, result, "", "", function (child) {
    return func.call(context, child, count++)
  });

  return result
}

export const Children = {
  map: mapChildren,

  forEach: function (children, forEachFunc, forEachContext) {
    mapChildren(children, function () {
      forEachFunc.apply(this, arguments)
    }, forEachContext);
  },

  count: function (children) {
    let n = 0;

    mapChildren(children, function () { n++; });

    return n;
  },

  toArray: function (children) {
    return mapChildren(children, child => child) || [];
  },

  only: function (children) {
    if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));

    return children;
  }
};