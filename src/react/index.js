import { compare, getCurrentTime } from './../utils/index';
import {
  Fragment,
  StrictMode,
  Profiler,
  Suspense,
  createRef,
  forwardRef,
} from './identity-direct-export';
import {
  createElement,
  cloneElement,
  createFactory,
  ReactCurrentOwner,
  isValidElement,
} from './ReactElement';
import { createContext } from './ReactContext';
import { Children } from './ReactChildren';
import { Component, PureComponent } from './ReactBaseClasses';
import { ReactCurrentDispatcher } from './ReactCurrentDispatcher';
import {
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
} from './ReactHooks';
import { lazy } from './ReactLazy';
import { memo } from './ReactMemo';
import { version } from './../shared/version';

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
let requestHostCallback;
let requestHostTimeout;
let cancelHostTimeout;
let shouldYieldToHost;

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

export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
  ReactCurrentDispatcher,
  ReactCurrentOwner,
  ReactCurrentBatchConfig: {
    transition: 0
  },
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
  }
};

export {
  Fragment,
  StrictMode,
  Profiler,
  Suspense,
  Component,
  PureComponent,
  createContext,
  createRef,
  forwardRef,
  isValidElement,
  createElement,
  cloneElement,
  createFactory,
  Children,
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
  lazy,
  memo,
  version,
};