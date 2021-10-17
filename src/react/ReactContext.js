/**
 * @source react\packages\react\src\ReactContext.js
*/
import {
  REACT_PROVIDER_TYPE,
  REACT_CONTEXT_TYPE,
} from './../shared/ReactSymbols';

export function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) calculateChangedBits = null;

  const context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };

  context.Consumer = context;

  return context;
};