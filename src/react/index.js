import {
  ownProperty,
  escapeUserProvidedKey,
  formatProdErrorMessage,
  getElementKey,
  compare,
  getCurrentTime,
} from './../utils/index';
import {
  REACT_ELEMENT_TYPE,
  REACT_PORTAL_TYPE,
  REACT_PROVIDER_TYPE,
  REACT_CONTEXT_TYPE,
  REACT_MEMO_TYPE,
  REACT_LAZY_TYPE,
  getIteratorFn,
} from './../shared/ReactSymbols';
export {version} from './../shared/version';
export {
  Fragment,
  StrictMode,
  Profiler,
  Suspense,
  createRef,
  forwardRef,
} from './identity-direct-export';

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
const ReactNoopUpdateQueue = {
  isMounted: function (a) { return false },
  enqueueForceUpdate: function (a, b, c) { },
  enqueueReplaceState: function (a, b, c, d) { },
  enqueueSetState: function (a, b, c, d) { }
};
const ReactCurrentOwner = { current: null };
const ReactCurrentDispatcher = { current: null };

let requestPaint;
let forceFrameRate;
let taskQueue = [];
let timerQueue = [];
let taskIdCounter = 1;
let currentTask = null;
let currentPriorityLevel = 3;
let isPerformingWork = false;
let isHostCallbackScheduled = false;
let isHostTimeoutScheduled = false;
let threadIDCounter = 0;
let requestHostCallback;
let requestHostTimeout;
let cancelHostTimeout;
let shouldYieldToHost;

function createElementWithValidation(type, config, children) {
  let propName;
  let props = {};
  let key = null;
  let ref = null;

  if (config != null) {
    if (config.key !== undefined) ref = config.ref || null;
    if (config.key !== undefined) key = "" + config.key;

    for (propName in config) {
      if (ownProperty(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) props[propName] = config[propName];
    };
  }

  const childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);

    for (let i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];

    props.children = childArray;
  }

  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    };
  }

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    _owner: ReactCurrentOwner.current
  }
}

function cloneAndReplaceKey(oldElement, newKey) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: oldElement.type,
    key: newKey,
    ref: oldElement.ref,
    props: oldElement.props,
    _owner: oldElement._owner
  }
}

export function isValidElement(object) {
  return typeof object === "object" &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
}

function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  let type = typeof children;

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

      throw Error(
        formatProdErrorMessage(
          31,
          childrenString === "[object Object]" ?
            "object with keys {" + Object.keys(children).join(", ") + "}" :
            childrenString
        )
      );
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

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;

  if (dispatcher === null) throw Error(formatProdErrorMessage(321));

  return dispatcher;
}

function push(heap, node) {
  const index = heap.length;
  heap.push(node);

  siftUp(heap, node, index);
}

function peek(heap) { return heap[0] === undefined ? null : heap[0] }

function pop(heap) {
  const first = heap[0];

  if (first !== undefined) {
    const last = heap.pop();

    if (last !== first) {
      heap[0] = last;
      siftDown(heap, last, 0);
    };

    return first;
  }
  return null;
};

function siftUp(heap, node, i) {
  let index = i;

  while (true) {
    let parentIndex = index - 1 >>> 1;
    let parent = heap[parentIndex];

    if (parent !== undefined && compare(parent, node) > 0) {
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      return;
    }
  }
};

function siftDown(heap, node, i) {
  let index = i;
  let length = heap.length;

  while (index < length) {
    let leftIndex = (index + 1) * 2 - 1;
    let left = heap[leftIndex];
    let rightIndex = leftIndex + 1;
    let right = heap[rightIndex];

    if (left !== undefined && compare(left, node) < 0) {
      if (right !== undefined && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (right !== undefined && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      return;
    }
  }
}

function advanceTimers(currentTime) {
  let timer = peek(timerQueue);

  while (timer !== null) {
    if (timer.callback === null) {
      pop(timerQueue);
    } else if (timer.startTime <= currentTime) {
      pop(timerQueue);
      timer.sortIndex = timer.expirationTime;
      push(taskQueue, timer);
      if (enableProfiling) {
        markTaskStart(timer, currentTime);
        timer.isQueued = true;
      }
    } else { return };

    timer = peek(timerQueue);
  }
};

function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false;

  advanceTimers(currentTime);

  if (!isHostCallbackScheduled) {
    if (peek(taskQueue) !== null) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    } else {
      const firstTimer = peek(timerQueue);
      if (firstTimer !== null) requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }
  }
}

function flushWork(hasTimeRemaining, initialTime) {
  let currentTime = initialTime;
  isHostCallbackScheduled = false;

  if (isHostTimeoutScheduled) {
    isHostTimeoutScheduled = false;
    cancelHostTimeout();
  };

  isPerformingWork = true;
  let previousPriorityLevel = currentPriorityLevel;

  try {
    advanceTimers(currentTime);
    for (currentTask = peek(taskQueue); null !== currentTask && (!(currentTask.expirationTime > currentTime) || hasTimeRemaining && !shouldYieldToHost());) {
      const { callback } = currentTask;

      if (typeof callback === "function") {
        currentTask.callback = null;
        currentPriorityLevel = currentTask.priorityLevel;

        const continuationCallback = callback(currentTask.expirationTime <= currentTime);

        currentTime = getCurrentTime();
        if (typeof continuationCallback === "function") {
          currentTask.callback = continuationCallback;
        } else if (currentTask === peek(taskQueue)) {
          pop(taskQueue);
        };

        advanceTimers(currentTime)
      } else {
        pop(taskQueue);
      };

      currentTask = peek(taskQueue)
    }

    if (currentTask !== null) return true;

    const firstTimer = peek(timerQueue);

    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - initialTime);
    };

    return false;

  } finally {
    currentTask = null;
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;
  }
};

const emptyObject = {};
export function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue
}

export function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error(formatProdErrorMessage(85));

  this.updater.enqueueSetState(this, partialState, callback, "setState")
};
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate")
};

function ComponentDummy() { };
ComponentDummy.prototype = Component.prototype;

PureComponent.prototype = new ComponentDummy;
const pureComponentPrototype = PureComponent.prototype;
pureComponentPrototype.constructor = PureComponent;
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

if (typeof window === "undefined" || typeof MessageChannel !== "function") {
  let _callback = null;
  let _timeoutID = null;

  const _flushCallback = function () {
    if (_callback !== null) {
      try {
        const currentTime = getCurrentTime();
        const hasRemainingTime = true;

        _callback(hasRemainingTime, currentTime);
        _callback = null;
      } catch (error) {
        setTimeout(_flushCallback, 0);

        throw error;
      }
    }
  };

  requestHostCallback = function (cb) {
    if (_callback !== null) {
      setTimeout(requestHostCallback, 0, cb);
    } else {
      _callback = cb;
      setTimeout(_flushCallback, 0);
    }
  };

  requestHostTimeout = function (cb, ms) {
    _timeoutID = setTimeout(cb, ms)
  };

  cancelHostTimeout = function () {
    clearTimeout(_timeoutID)
  };

  shouldYieldToHost = function () {
    return false;
  };

  forceFrameRate = function () { };
  requestPaint = forceFrameRate;

} else {
  if (typeof console !== 'undefined') {
    if (typeof window.requestAnimationFrame !== 'function') {
      console['error']("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills');
    }
    if (typeof window.cancelAnimationFrame !== 'function') {
      console['error']("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills');
    }
  };

  let isMessageLoopRunning = false;
  let scheduledHostCallback = null;
  let taskTimeoutID = -1;
  let yieldInterval = 5;
  let deadline = 0;

  shouldYieldToHost = function () {
    return getCurrentTime() >= deadline;
  };

  requestPaint = function () { };

  forceFrameRate = function (fps) {
    if (fps < 0 || fps > 125) {
      console['error']('forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported');
      return;
    }
    if (fps > 0) {
      yieldInterval = Math.floor(1000 / fps);
    } else {
      yieldInterval = 5;
    }
  };

  const channel = new MessageChannel;
  const port = channel.port2;

  channel.port1.onmessage = function () {
    if (scheduledHostCallback !== null) {
      const currentTime = getCurrentTime();
      deadline = currentTime + yieldInterval;

      try {
        if (scheduledHostCallback(true, currentTime)) {
          port.postMessage(null);
        } else {
          isMessageLoopRunning = false;
          scheduledHostCallback = null;
        }
      } catch (error) {
        port.postMessage(null);
        throw error;
      }
    } else {
      isMessageLoopRunning = false;
    }
  };

  requestHostCallback = function (callback) {
    scheduledHostCallback = callback;

    if (!isMessageLoopRunning) {
      isMessageLoopRunning = true;
      port.postMessage(null);
    }
  };

  requestHostTimeout = function (callback, ms) {
    taskTimeoutID = window.setTimeout(function () {
      callback(getCurrentTime())
    }, ms)
  };

  cancelHostTimeout = function () {
    window.clearTimeout(taskTimeoutID);
    taskTimeoutID = -1
  };
};

const ReactSharedInternals$1 = {
  ReactCurrentDispatcher,
  ReactCurrentOwner,
  IsSomeRendererActing: {
    current: false
  },
  ReactCurrentBatchConfig: {
    transition: 0
  },
  assign: Object.assign,
  Scheduler: {
    __proto__: null,
    unstable_ImmediatePriority: 1,
    unstable_UserBlockingPriority: 2,
    unstable_NormalPriority: 3,
    unstable_IdlePriority: 5,
    unstable_LowPriority: 4,
    unstable_runWithPriority: function (priorityLevel, eventHandler) {
      switch (priorityLevel) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          priorityLevel = 3;
      }
      const previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;

      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel
      }
    },
    unstable_next: function (eventHandler) {
      let priorityLevel;
      switch (currentPriorityLevel) {
        case 1:
        case 2:
        case 3:
          priorityLevel = 3;
          break;
        default:
          priorityLevel = currentPriorityLevel;
      }
      const previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler()
      } finally {
        currentPriorityLevel = previousPriorityLevel
      }
    },

    unstable_scheduleCallback: function (priorityLevel, callback, options) {
      const currentTime = getCurrentTime();
      let startTime;

      if (typeof options === 'object' && options !== null) {
        const { delay } = options;

        if (typeof delay === 'number' && delay > 0) {
          startTime = currentTime + delay;
        } else {
          startTime = currentTime;
        }
      } else {
        startTime = currentTime;
      }

      let timeout;
      switch (priorityLevel) {
        case 1:
          timeout = -1;
          break;
        case 2:
          timeout = 250;
          break;
        case 5:
          timeout = 1073741823;
          break;
        case 4:
          timeout = 1E4;
          break;
        default:
          timeout = 5E3
      }

      const expirationTime = startTime + timeout;

      let newTask = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime,
        expirationTime,
        sortIndex: -1
      };
      if (startTime > currentTime) {
        newTask.sortIndex = startTime;
        push(timerQueue, newTask);
        if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
          if (isHostTimeoutScheduled) {
            cancelHostTimeout();
          } else {
            isHostTimeoutScheduled = true;
          }
          requestHostTimeout(handleTimeout, startTime - currentTime);
        }
      } else {
        newTask.sortIndex = expirationTime;
        push(taskQueue, newTask);
        if (!isHostCallbackScheduled && !isPerformingWork) {
          isHostCallbackScheduled = true;
          requestHostCallback(flushWork);
        }
      }
      return newTask;
    },

    unstable_cancelCallback: function (task) {
      task.callback = null
    },
    unstable_wrapCallback: function (callback) {
      const parentPriorityLevel = currentPriorityLevel;

      return function () {
        const previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = parentPriorityLevel;
        try {
          return callback.apply(this, arguments)
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      }
    },
    unstable_getCurrentPriorityLevel: function () {
      return currentPriorityLevel
    },
    get unstable_shouldYield() {
      return shouldYieldToHost
    },
    unstable_requestPaint: requestPaint,
    unstable_continueExecution: function () {
      if (isHostCallbackScheduled || isPerformingWork) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      };
    },
    unstable_pauseExecution: function () { },
    unstable_getFirstCallbackNode: function () {
      return peek(taskQueue)
    },
    get unstable_now() {
      return getCurrentTime
    },
    get unstable_forceFrameRate() {
      return forceFrameRate
    },
    unstable_Profiling: null
  },
  SchedulerTracing: {
    __proto__: null,
    __interactionsRef: null,
    __subscriberRef: null,
    unstable_clear: function (callback) {
      return callback()
    },
    unstable_getCurrent: function () {
      return null
    },
    unstable_getThreadID: function () {
      return ++threadIDCounter;
    },
    unstable_trace: function (name, timestamp, callback) {
      return callback()
    },
    unstable_wrap: function (callback) {
      return callback;
    },
    unstable_subscribe: function (subscriber) { },
    unstable_unsubscribe: function (subscriber) { }
  }
};
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

export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals$1;
export const cloneElement = function (element, config, children) {
  if (element === null || element === undefined) throw Error(formatProdErrorMessage(267, element));

  let propName;
  const props = Object.assign({}, element.props);
  let { key, ref, _owner, } = element;

  if (config != null) {
    if (config.key !== undefined) {
      ref = config.ref;
      _owner = ReactCurrentOwner.current;
    };

    if (config.key !== undefined) {
      key = "" + config.key;
    };

    let defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }

    for (propName in config) {
      if (ownProperty(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);

    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  };

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: element.type,
    key,
    ref,
    props,
    _owner
  }
};

//createContext Path: react\packages\react\src\ReactContext.js
export const createContext = function (defaultValue, calculateChangedBits) {
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

export const createElement = createElementWithValidation;
export const createFactory = function (type) {
  let validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;

  return validatedFactory;
};

export const lazy = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: {
      _status: -1,
      _result: ctor
    },
    _init: lazyInitializer
  }
};
export const memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare
  }
};
export const useCallback = function (callback, deps) { return resolveDispatcher().useCallback(callback, deps) };
export const useContext = function (Context, unstable_observedBits) { return resolveDispatcher().useContext(Context, unstable_observedBits) };
export const useDebugValue = function (a, b) { };
export const useEffect = function (create, deps) { return resolveDispatcher().useEffect(create, deps) };
export const useImperativeHandle = function (ref, create, deps) { return resolveDispatcher().useImperativeHandle(ref, create, deps) };
export const useLayoutEffect = function (create, deps) { return resolveDispatcher().useLayoutEffect(create, deps) };
export const useMemo = function (create, deps) { return resolveDispatcher().useMemo(create, deps) };
export const useReducer = function (reducer, initialArg, init) { return resolveDispatcher().useReducer(reducer, initialArg, init) };
export const useRef = function (initialValue) { return resolveDispatcher().useRef(initialValue) };
export const useState = function (initialState) { return resolveDispatcher().useState(initialState) };