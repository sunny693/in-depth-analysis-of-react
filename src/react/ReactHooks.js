/**
 * @source react/packages/react/src/ReactHooks.js
*/
import { ReactCurrentDispatcher } from './ReactCurrentDispatcher';

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;

  if (dispatcher === null) throw Error(formatProdErrorMessage(321));

  return dispatcher;
}
function useCallback(callback, deps) {
  return resolveDispatcher().useCallback(callback, deps)
};

function useContext(Context, unstable_observedBits) {
  return resolveDispatcher().useContext(Context, unstable_observedBits)
};

function useDebugValue(value, formatterFn) { };

function useEffect(create, deps) {
  return resolveDispatcher().useEffect(create, deps)
};

function useImperativeHandle(ref, create, deps) {
  return resolveDispatcher().useImperativeHandle(ref, create, deps)
};

function useLayoutEffect(create, deps) {
  return resolveDispatcher().useLayoutEffect(create, deps)
};

function useMemo(create, deps) {
  return resolveDispatcher().useMemo(create, deps)
};

function useReducer(reducer, initialArg, init) {
  return resolveDispatcher().useReducer(reducer, initialArg, init)
};

function useRef(initialValue) {
  return resolveDispatcher().useRef(initialValue)
};

function useState(initialState) {
  return resolveDispatcher().useState(initialState)
};

export {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useDebugValue,
}