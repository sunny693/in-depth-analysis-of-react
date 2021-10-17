/**
 * @source react/packages/react/src/ReactMemo.js
*/
import { REACT_MEMO_TYPE } from './../shared/ReactSymbols';

export const memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare
  }
};