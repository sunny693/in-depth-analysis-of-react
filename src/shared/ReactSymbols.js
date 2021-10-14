/**
 * @source react/packages/shared/ReactSymbols.js
*/
export const REACT_ELEMENT_TYPE = Symbol.for('react.element');
export const REACT_PORTAL_TYPE = Symbol.for('react.portal');
export const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
export const REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
export const REACT_PROFILER_TYPE = Symbol.for('react.profiler');
export const REACT_PROVIDER_TYPE = Symbol.for('react.provider');
export const REACT_CONTEXT_TYPE = Symbol.for('react.context');
export const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
export const REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
export const REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
export const REACT_MEMO_TYPE = Symbol.for('react.memo');
export const REACT_LAZY_TYPE = Symbol.for('react.lazy');
export const REACT_BLOCK_TYPE = Symbol.for('react.block');
export const REACT_SERVER_BLOCK_TYPE = Symbol.for('react.server.block');
export const REACT_FUNDAMENTAL_TYPE = Symbol.for('react.fundamental');
export const REACT_SCOPE_TYPE = Symbol.for('react.scope');
export const REACT_OPAQUE_ID_TYPE = Symbol.for('react.opaque.id');
export const REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for('react.debug_trace_mode');
export const REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
export const REACT_LEGACY_HIDDEN_TYPE = Symbol.for('react.legacy_hidden');

/**
 * 能够遍历
*/
export function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== "object") return null;

  maybeIterable = Symbol.iterator && maybeIterable[Symbol.iterator] || maybeIterable["@@iterator"];

  return typeof maybeIterable === "function" ? maybeIterable : null
};