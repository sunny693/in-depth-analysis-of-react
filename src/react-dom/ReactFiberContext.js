import { createCursor } from './ReactFiberStack';

const didPerformWorkStackCursor = createCursor(false);
const emptyContextObject = {};
const contextStackCursor = createCursor(emptyContextObject);

function isContextProvider(type) {
  type = type.childContextTypes;
  return null !== type && undefined !== type
}

export {
  isContextProvider,
  emptyContextObject,
  didPerformWorkStackCursor,
  contextStackCursor,
}