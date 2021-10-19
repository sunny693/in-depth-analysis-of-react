export const randomKey = Math.random().toString(36).slice(2);
export const internalContainerInstanceKey = "__reactContainer$" + randomKey;
export const internalInstanceKey = "__reactFiber$" + randomKey;
export const internalPropsKey = "__reactProps$" + randomKey;
export const internalEventHandlersKey = "__reactEvents$" + randomKey;