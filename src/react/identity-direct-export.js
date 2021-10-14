import { 
  REACT_FRAGMENT_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_PROFILER_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_FORWARD_REF_TYPE,
} from './../shared/ReactSymbols';

export const Fragment = REACT_FRAGMENT_TYPE;
export const StrictMode = REACT_STRICT_MODE_TYPE;
export const Profiler = REACT_PROFILER_TYPE;
export const Suspense = REACT_SUSPENSE_TYPE;

export const createRef = function () {
  return {
    current: null
  }
};
export const forwardRef = function (render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render
  }
};