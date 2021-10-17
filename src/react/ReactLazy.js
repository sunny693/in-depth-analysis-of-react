/**
 * @source react/packages/react/src/ReactLazy.js
*/
import { REACT_LAZY_TYPE } from './../shared/ReactSymbols';

function lazyInitializer(payload) {
  const Uninitialized = -1;
  const Pending = 0;
  const Resolved = 1;
  const Rejected = 2;

  if (payload._status === Uninitialized) {
    const ctor = payload._result;
    const thenable = ctor();

    payload._status = Pending;
    payload._result = thenable;

    thenable.then(function (moduleObject) {
      if (payload._status === Pending) {
        const defaultExport = moduleObject.default;

        if (defaultExport === undefined) console.error('lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);

        payload._status = Resolved;
        payload._result = defaultExport;
      }
    }, function (error) {
      if (payload._status === Pending) {
        payload._status = Rejected;
        payload._result = error;
      };
    })
  }

  if (payload._status === Resolved) return payload._result;

  throw payload._result;
};

export function lazy(ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: {
      _status: -1,
      _result: ctor
    },
    _init: lazyInitializer
  }
};