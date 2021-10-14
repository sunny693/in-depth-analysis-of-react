/** @license React vundefined
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 (function () {
  'use strict';
  (function (global, factory) {
      "object" === typeof exports && "undefined" !== typeof module ? factory(exports) : "function" === typeof define && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.React = {}))
  })(this, function (exports) {
      function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable :
              null
      }

      function formatProdErrorMessage(code) {
          for (var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code, i = 1; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
          return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      }

      function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue
      }

      function ComponentDummy() {}

      function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue
      }

      function createElement(type, config, children) {
          var propName, props = {},
              key = null,
              ref = null;
          if (null != config)
              for (propName in void 0 !== config.ref && (ref = config.ref), void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config[propName]);
          var childrenLength =
              arguments.length - 2;
          if (1 === childrenLength) props.children = children;
          else if (1 < childrenLength) {
              for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
              props.children = childArray
          }
          if (type && type.defaultProps)
              for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
          return {
              $$typeof: REACT_ELEMENT_TYPE,
              type: type,
              key: key,
              ref: ref,
              props: props,
              _owner: ReactCurrentOwner.current
          }
      }

      function cloneAndReplaceKey(oldElement,
          newKey) {
          return {
              $$typeof: REACT_ELEMENT_TYPE,
              type: oldElement.type,
              key: newKey,
              ref: oldElement.ref,
              props: oldElement.props,
              _owner: oldElement._owner
          }
      }

      function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE
      }

      function escape(key) {
          var escaperLookup = {
              "=": "=0",
              ":": "=2"
          };
          return "$" + key.replace(/[=:]/g, function (match) {
              return escaperLookup[match]
          })
      }

      function getElementKey(element, index) {
          return "object" === typeof element && null !== element && null != element.key ? escape("" +
              element.key) : index.toString(36)
      }

      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type) children = null;
          var invokeCallback = !1;
          if (null === children) invokeCallback = !0;
          else switch (type) {
          case "string":
          case "number":
              invokeCallback = !0;
              break;
          case "object":
              switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                  invokeCallback = !0
              }
          }
          if (invokeCallback) return invokeCallback = children, callback = callback(invokeCallback), children =
              "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar, Array.isArray(callback) ? (escapedPrefix = "", null != children && (escapedPrefix = children.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function (c) {
                  return c
              })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (!callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + children)), array.push(callback)),
              1;
          invokeCallback = 0;
          nameSoFar = "" === nameSoFar ? "." : nameSoFar + ":";
          if (Array.isArray(children))
              for (var i = 0; i < children.length; i++) {
                  type = children[i];
                  var nextName = nameSoFar + getElementKey(type, i);
                  invokeCallback += mapIntoArray(type, array, escapedPrefix, nextName, callback)
              } else if (nextName = getIteratorFn(children), "function" === typeof nextName)
                  for (children = nextName.call(children), i = 0; !(type = children.next()).done;) type = type.value, nextName = nameSoFar + getElementKey(type, i++), invokeCallback += mapIntoArray(type, array, escapedPrefix,
                      nextName, callback);
              else if ("object" === type) throw array = "" + children, Error(formatProdErrorMessage(31, "[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array));
          return invokeCallback
      }

      function mapChildren(children, func, context) {
          if (null == children) return children;
          var result = [],
              count = 0;
          mapIntoArray(children, result, "", "", function (child) {
              return func.call(context, child, count++)
          });
          return result
      }

      function lazyInitializer(payload) {
          if (-1 === payload._status) {
              var ctor = payload._result;
              ctor = ctor();
              payload._status = 0;
              payload._result = ctor;
              ctor.then(function (moduleObject) {
                  0 === payload._status && (moduleObject = moduleObject.default, payload._status = 1, payload._result = moduleObject)
              }, function (error) {
                  0 === payload._status && (payload._status = 2, payload._result = error)
              })
          }
          if (1 === payload._status) return payload._result;
          throw payload._result;
      }

      function lazyInitializer$1(payload) {
          return {
              $$typeof: REACT_BLOCK_TYPE,
              _data: payload.load.apply(null, payload.args),
              _render: payload.render
          }
      }

      function resolveDispatcher() {
          var dispatcher =
              ReactCurrentDispatcher.current;
          if (null === dispatcher) throw Error(formatProdErrorMessage(321));
          return dispatcher
      }

      function push(heap, node) {
          var index = heap.length;
          heap.push(node);
          a: for (;;) {
              var parentIndex = index - 1 >>> 1,
                  parent = heap[parentIndex];
              if (void 0 !== parent && 0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
              else break a
          }
      }

      function peek(heap) {
          heap = heap[0];
          return void 0 === heap ? null : heap
      }

      function pop(heap) {
          var first = heap[0];
          if (void 0 !== first) {
              var last = heap.pop();
              if (last !==
                  first) {
                  heap[0] = last;
                  a: for (var index = 0, length = heap.length; index < length;) {
                      var leftIndex = 2 * (index + 1) - 1,
                          left = heap[leftIndex],
                          rightIndex = leftIndex + 1,
                          right = heap[rightIndex];
                      if (void 0 !== left && 0 > compare(left, last)) void 0 !== right && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
                      else if (void 0 !== right && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;
                      else break a
                  }
              }
              return first
          }
          return null
      }

      function compare(a, b) {
          var diff = a.sortIndex - b.sortIndex;
          return 0 !== diff ? diff : a.id - b.id
      }

      function advanceTimers(currentTime) {
          for (var timer = peek(timerQueue); null !== timer;) {
              if (null === timer.callback) pop(timerQueue);
              else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
              else break;
              timer = peek(timerQueue)
          }
      }

      function handleTimeout(currentTime) {
          isHostTimeoutScheduled = !1;
          advanceTimers(currentTime);
          if (!isHostCallbackScheduled)
              if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, requestHostCallback(flushWork);
              else {
                  var firstTimer = peek(timerQueue);
                  null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime)
              }
      }

      function flushWork(hasTimeRemaining, initialTime) {
          isHostCallbackScheduled = !1;
          isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, cancelHostTimeout());
          isPerformingWork = !0;
          var previousPriorityLevel = currentPriorityLevel;
          try {
              advanceTimers(initialTime);
              for (currentTask = peek(taskQueue); null !== currentTask && (!(currentTask.expirationTime > initialTime) || hasTimeRemaining &&
                  !shouldYieldToHost());) {
                  var callback = currentTask.callback;
                  if ("function" === typeof callback) {
                      currentTask.callback = null;
                      currentPriorityLevel = currentTask.priorityLevel;
                      var continuationCallback = callback(currentTask.expirationTime <= initialTime);
                      initialTime = getCurrentTime();
                      "function" === typeof continuationCallback ? currentTask.callback = continuationCallback : currentTask === peek(taskQueue) && pop(taskQueue);
                      advanceTimers(initialTime)
                  } else pop(taskQueue);
                  currentTask = peek(taskQueue)
              }
              if (null !== currentTask) var JSCompiler_inline_result = !0;
              else {
                  var firstTimer = peek(timerQueue);
                  null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - initialTime);
                  JSCompiler_inline_result = !1
              }
              return JSCompiler_inline_result
          } finally {
              currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1
          }
      }
      var REACT_ELEMENT_TYPE = 60103,
          REACT_PORTAL_TYPE = 60106;
      exports.Fragment = 60107;
      exports.StrictMode = 60108;
      exports.Profiler = 60114;
      var REACT_PROVIDER_TYPE = 60109,
          REACT_CONTEXT_TYPE = 60110,
          REACT_FORWARD_REF_TYPE = 60112;
      exports.Suspense = 60113;
      exports.unstable_SuspenseList = 60120;
      var REACT_MEMO_TYPE = 60115,
          REACT_LAZY_TYPE = 60116,
          REACT_BLOCK_TYPE = 60121;
      exports.unstable_DebugTracingMode = 60129;
      exports.unstable_LegacyHidden = 60131;
      if ("function" === typeof Symbol && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          exports.Fragment = symbolFor("react.fragment");
          exports.StrictMode = symbolFor("react.strict_mode");
          exports.Profiler = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE =
              symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          exports.Suspense = symbolFor("react.suspense");
          exports.unstable_SuspenseList = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          exports.unstable_DebugTracingMode = symbolFor("react.debug_trace_mode");
          exports.unstable_LegacyHidden = symbolFor("react.legacy_hidden")
      }
      var MAYBE_ITERATOR_SYMBOL =
          "function" === typeof Symbol && Symbol.iterator,
          hasOwnProperty = Object.prototype.hasOwnProperty,
          assign = Object.assign || function (target, sources) {
              if (null == target) throw new TypeError("Object.assign target cannot be null or undefined");
              for (var to = Object(target), nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
                  var nextSource = arguments[nextIndex];
                  if (null != nextSource) {
                      var key = void 0;
                      nextSource = Object(nextSource);
                      for (key in nextSource) hasOwnProperty.call(nextSource, key) && (to[key] = nextSource[key])
                  }
              }
              return to
          },
          ReactNoopUpdateQueue = {
              isMounted: function (publicInstance) {
                  return !1
              }, enqueueForceUpdate: function (publicInstance, callback, callerName) {}, enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {}, enqueueSetState: function (publicInstance, partialState, callback, callerName) {}
          },
          emptyObject = {};
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function (partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error(formatProdErrorMessage(85));
          this.updater.enqueueSetState(this, partialState, callback, "setState")
      };
      Component.prototype.forceUpdate = function (callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate")
      };
      ComponentDummy.prototype = Component.prototype;
      symbolFor = PureComponent.prototype = new ComponentDummy;
      symbolFor.constructor = PureComponent;
      assign(symbolFor, Component.prototype);
      symbolFor.isPureReactComponent = !0;
      var ReactCurrentOwner = {
              current: null
          },
          hasOwnProperty$1 = Object.prototype.hasOwnProperty,
          RESERVED_PROPS = {
              key: !0,
              ref: !0,
              __self: !0,
              __source: !0
          },
          userProvidedKeyEscapeRegex = /\/+/g,
          ReactCurrentDispatcher = {
              current: null
          },
          ReactCurrentBatchConfig = {
              transition: 0
          },
          forceFrameRate;
      if ("object" === typeof performance && "function" === typeof performance.now) {
          var localPerformance = performance;
          var getCurrentTime = function () {
              return localPerformance.now()
          }
      } else {
          var localDate = Date,
              initialTime = localDate.now();
          getCurrentTime = function () {
              return localDate.now() - initialTime
          }
      } if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
          var _callback =
              null,
              _timeoutID = null,
              _flushCallback = function () {
                  if (null !== _callback) try {
                      var currentTime = getCurrentTime();
                      _callback(!0, currentTime);
                      _callback = null
                  } catch (e) {
                      throw setTimeout(_flushCallback, 0), e;
                  }
              };
          var requestHostCallback = function (cb) {
              null !== _callback ? setTimeout(requestHostCallback, 0, cb) : (_callback = cb, setTimeout(_flushCallback, 0))
          };
          var requestHostTimeout = function (cb, ms) {
              _timeoutID = setTimeout(cb, ms)
          };
          var cancelHostTimeout = function () {
              clearTimeout(_timeoutID)
          };
          var shouldYieldToHost = function () {
              return !1
          };
          symbolFor = forceFrameRate = function () {}
      } else {
          var setTimeout$1 = window.setTimeout,
              clearTimeout$2 = window.clearTimeout;
          "undefined" !== typeof console && (symbolFor = window.cancelAnimationFrame, "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), "function" !== typeof symbolFor && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"));
          var isMessageLoopRunning = !1,
              scheduledHostCallback = null,
              taskTimeoutID = -1,
              yieldInterval = 5,
              deadline = 0;
          shouldYieldToHost = function () {
              return getCurrentTime() >= deadline
          };
          symbolFor = function () {};
          forceFrameRate = function (fps) {
              0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : yieldInterval = 0 < fps ? Math.floor(1E3 / fps) : 5
          };
          var channel = new MessageChannel,
              port = channel.port2;
          channel.port1.onmessage = function () {
              if (null !== scheduledHostCallback) {
                  var currentTime =
                      getCurrentTime();
                  deadline = currentTime + yieldInterval;
                  try {
                      scheduledHostCallback(!0, currentTime) ? port.postMessage(null) : (isMessageLoopRunning = !1, scheduledHostCallback = null)
                  } catch (error) {
                      throw port.postMessage(null), error;
                  }
              } else isMessageLoopRunning = !1
          };
          requestHostCallback = function (callback) {
              scheduledHostCallback = callback;
              isMessageLoopRunning || (isMessageLoopRunning = !0, port.postMessage(null))
          };
          requestHostTimeout = function (callback, ms) {
              taskTimeoutID = setTimeout$1(function () {
                  callback(getCurrentTime())
              }, ms)
          };
          cancelHostTimeout = function () {
              clearTimeout$2(taskTimeoutID);
              taskTimeoutID = -1
          }
      }
      var taskQueue = [],
          timerQueue = [],
          taskIdCounter = 1,
          currentTask = null,
          currentPriorityLevel = 3,
          isPerformingWork = !1,
          isHostCallbackScheduled = !1,
          isHostTimeoutScheduled = !1,
          threadIDCounter = 0;
      symbolFor = {
          ReactCurrentDispatcher: ReactCurrentDispatcher,
          ReactCurrentOwner: ReactCurrentOwner,
          IsSomeRendererActing: {
              current: !1
          },
          ReactCurrentBatchConfig: ReactCurrentBatchConfig,
          assign: assign,
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
                      priorityLevel = 3
                  }
                  var previousPriorityLevel = currentPriorityLevel;
                  currentPriorityLevel = priorityLevel;
                  try {
                      return eventHandler()
                  } finally {
                      currentPriorityLevel = previousPriorityLevel
                  }
              }, unstable_next: function (eventHandler) {
                  switch (currentPriorityLevel) {
                  case 1:
                  case 2:
                  case 3:
                      var priorityLevel = 3;
                      break;
                  default:
                      priorityLevel =
                          currentPriorityLevel
                  }
                  var previousPriorityLevel = currentPriorityLevel;
                  currentPriorityLevel = priorityLevel;
                  try {
                      return eventHandler()
                  } finally {
                      currentPriorityLevel = previousPriorityLevel
                  }
              }, unstable_scheduleCallback: function (priorityLevel, callback, options) {
                  var currentTime = getCurrentTime();
                  "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
                  switch (priorityLevel) {
                  case 1:
                      var timeout = -1;
                      break;
                  case 2:
                      timeout =
                          250;
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
                  timeout = options + timeout;
                  priorityLevel = {
                      id: taskIdCounter++,
                      callback: callback,
                      priorityLevel: priorityLevel,
                      startTime: options,
                      expirationTime: timeout,
                      sortIndex: -1
                  };
                  options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? cancelHostTimeout() : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) :
                      (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, requestHostCallback(flushWork)));
                  return priorityLevel
              }, unstable_cancelCallback: function (task) {
                  task.callback = null
              }, unstable_wrapCallback: function (callback) {
                  var parentPriorityLevel = currentPriorityLevel;
                  return function () {
                      var previousPriorityLevel = currentPriorityLevel;
                      currentPriorityLevel = parentPriorityLevel;
                      try {
                          return callback.apply(this, arguments)
                      } finally {
                          currentPriorityLevel =
                              previousPriorityLevel
                      }
                  }
              }, unstable_getCurrentPriorityLevel: function () {
                  return currentPriorityLevel
              }, get unstable_shouldYield() {
                  return shouldYieldToHost
              }, unstable_requestPaint: symbolFor,
              unstable_continueExecution: function () {
                      isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, requestHostCallback(flushWork))
                  }, unstable_pauseExecution: function () {}, unstable_getFirstCallbackNode: function () {
                      return peek(taskQueue)
                  }, get unstable_now() {
                      return getCurrentTime
                  }, get unstable_forceFrameRate() {
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
              }, unstable_getCurrent: function () {
                  return null
              }, unstable_getThreadID: function () {
                  return ++threadIDCounter
              }, unstable_trace: function (name, timestamp, callback) {
                  return callback()
              }, unstable_wrap: function (callback) {
                  return callback
              }, unstable_subscribe: function (subscriber) {}, unstable_unsubscribe: function (subscriber) {}
          }
      };
      exports.Children = {
          map: mapChildren,
          forEach: function (children,
              forEachFunc, forEachContext) {
              mapChildren(children, function () {
                  forEachFunc.apply(this, arguments)
              }, forEachContext)
          }, count: function (children) {
              var n = 0;
              mapChildren(children, function () {
                  n++
              });
              return n
          }, toArray: function (children) {
              return mapChildren(children, function (child) {
                  return child
              }) || []
          }, only: function (children) {
              if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
              return children
          }
      };
      exports.Component = Component;
      exports.PureComponent = PureComponent;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
          symbolFor;
      exports.cloneElement = function (element, config, children) {
          if (null === element || void 0 === element) throw Error(formatProdErrorMessage(267, element));
          var props = assign({}, element.props),
              key = element.key,
              ref = element.ref,
              owner = element._owner;
          if (null != config) {
              void 0 !== config.ref && (ref = config.ref, owner = ReactCurrentOwner.current);
              void 0 !== config.key && (key = "" + config.key);
              if (element.type && element.type.defaultProps) var defaultProps = element.type.defaultProps;
              for (propName in config) hasOwnProperty$1.call(config,
                  propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = void 0 === config[propName] && void 0 !== defaultProps ? defaultProps[propName] : config[propName])
          }
          var propName = arguments.length - 2;
          if (1 === propName) props.children = children;
          else if (1 < propName) {
              defaultProps = Array(propName);
              for (var i = 0; i < propName; i++) defaultProps[i] = arguments[i + 2];
              props.children = defaultProps
          }
          return {
              $$typeof: REACT_ELEMENT_TYPE,
              type: element.type,
              key: key,
              ref: ref,
              props: props,
              _owner: owner
          }
      };
      exports.createContext = function (defaultValue,
          calculateChangedBits) {
          void 0 === calculateChangedBits && (calculateChangedBits = null);
          defaultValue = {
              $$typeof: REACT_CONTEXT_TYPE,
              _calculateChangedBits: calculateChangedBits,
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              _threadCount: 0,
              Provider: null,
              Consumer: null
          };
          defaultValue.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: defaultValue
          };
          return defaultValue.Consumer = defaultValue
      };
      exports.createElement = createElement;
      exports.createFactory = function (type) {
          var factory = createElement.bind(null, type);
          factory.type =
              type;
          return factory
      };
      exports.createRef = function () {
          return {
              current: null
          }
      };
      exports.forwardRef = function (render) {
          return {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render: render
          }
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function (ctor) {
          return {
              $$typeof: REACT_LAZY_TYPE,
              _payload: {
                  _status: -1,
                  _result: ctor
              },
              _init: lazyInitializer
          }
      };
      exports.memo = function (type, compare) {
          return {
              $$typeof: REACT_MEMO_TYPE,
              type: type,
              compare: void 0 === compare ? null : compare
          }
      };
      exports.unstable_block = function (render, load) {
          return void 0 === load ?
              function () {
                  return {
                      $$typeof: REACT_BLOCK_TYPE,
                      _data: void 0,
                      _render: render
                  }
              } : function () {
                  return {
                      $$typeof: REACT_LAZY_TYPE,
                      _payload: {
                          load: load,
                          args: arguments,
                          render: render
                      },
                      _init: lazyInitializer$1
                  }
              }
      };
      exports.unstable_createMutableSource = function (source, getVersion) {
          return {
              _getVersion: getVersion,
              _source: source,
              _workInProgressVersionPrimary: null,
              _workInProgressVersionSecondary: null
          }
      };
      exports.unstable_startTransition = function (scope) {
          var prevTransition = ReactCurrentBatchConfig.transition;
          ReactCurrentBatchConfig.transition =
              1;
          try {
              scope()
          } finally {
              ReactCurrentBatchConfig.transition = prevTransition
          }
      };
      exports.unstable_useDeferredValue = function (value) {
          return resolveDispatcher().useDeferredValue(value)
      };
      exports.unstable_useMutableSource = function (source, getSnapshot, subscribe) {
          return resolveDispatcher().useMutableSource(source, getSnapshot, subscribe)
      };
      exports.unstable_useOpaqueIdentifier = function () {
          return resolveDispatcher().useOpaqueIdentifier()
      };
      exports.unstable_useTransition = function () {
          return resolveDispatcher().useTransition()
      };
      exports.useCallback = function (callback, deps) {
          return resolveDispatcher().useCallback(callback, deps)
      };
      exports.useContext = function (Context, unstable_observedBits) {
          return resolveDispatcher().useContext(Context, unstable_observedBits)
      };
      exports.useDebugValue = function (value, formatterFn) {};
      exports.useEffect = function (create, deps) {
          return resolveDispatcher().useEffect(create, deps)
      };
      exports.useImperativeHandle = function (ref, create, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create, deps)
      };
      exports.useLayoutEffect =
          function (create, deps) {
              return resolveDispatcher().useLayoutEffect(create, deps)
          };
      exports.useMemo = function (create, deps) {
          return resolveDispatcher().useMemo(create, deps)
      };
      exports.useReducer = function (reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init)
      };
      exports.useRef = function (initialValue) {
          return resolveDispatcher().useRef(initialValue)
      };
      exports.useState = function (initialState) {
          return resolveDispatcher().useState(initialState)
      };
      exports.version = "17.0.0"
  });
})();