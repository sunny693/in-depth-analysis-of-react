import {
  formatProdErrorMessage,
  getIntrinsicNamespace,
  getToStringValue,
  getChildNamespace,
  ownProperty,
} from './../utils/index';
import {
  REACT_ELEMENT_TYPE,
  REACT_PORTAL_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_PROFILER_TYPE,
  REACT_PROVIDER_TYPE,
  REACT_CONTEXT_TYPE,
  REACT_FORWARD_REF_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_SUSPENSE_LIST_TYPE,
  REACT_MEMO_TYPE,
  REACT_LAZY_TYPE,
  REACT_BLOCK_TYPE,
  REACT_OPAQUE_ID_TYPE,
  REACT_DEBUG_TRACING_MODE_TYPE,
  REACT_OFFSCREEN_TYPE,
  REACT_LEGACY_HIDDEN_TYPE,
  getIteratorFn,
} from './../shared/ReactSymbols';
import { objectIs } from './../utils/polyfill';
export { version } from './../shared/version';

function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0
}

function functionThatReturnsTrue() { return true }
function functionThatReturnsFalse() { return false }

function isCheckable(elem) {
  var type = elem.type;
  return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type)
}

function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent
}

function schedulerPriorityToLanePriority(schedulerPriorityLevel) {
  switch (schedulerPriorityLevel) {
    case 99:
      return 15;
    case 98:
      return 10;
    case 97:
    case 96:
      return 8;
    case 95:
      return 2;
    default:
      return 0
  }
}

function lanePriorityToSchedulerPriority(lanePriority) {
  switch (lanePriority) {
    case 15:
    case 14:
      return 99;
    case 13:
    case 12:
    case 11:
    case 10:
      return 98;
    case 9:
    case 8:
    case 7:
    case 6:
    case 4:
    case 5:
      return 97;
    case 3:
    case 2:
    case 1:
      return 95;
    case 0:
      return 90;
    default:
      throw Error(formatProdErrorMessage(358, lanePriority));
  }
}

function getHighestPriorityLane(lanes) {
  return lanes & -lanes
}

function createLaneMap(initial) {
  for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
  return laneMap
}

function registerTwoPhaseEvent(registrationName, dependencies) {
  registerDirectEvent(registrationName, dependencies);
  registerDirectEvent(registrationName + "Capture", dependencies)
}

function registerDirectEvent(registrationName, dependencies) {
  registrationNameDependencies[registrationName] = dependencies;
  for (registrationName = 0; registrationName < dependencies.length; registrationName++) allNativeEvents.add(dependencies[registrationName])
}

function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) return true;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) return validatedAttributeNameCache[attributeName] = true;
  illegalAttributeNameCache[attributeName] = true;
  return false
}

function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
  if (null !== propertyInfo && 0 === propertyInfo.type) return false;
  switch (typeof value) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (isCustomComponentTag) return false;
      if (null !== propertyInfo) return !propertyInfo.acceptsBooleans;
      name = name.toLowerCase().slice(0, 5);
      return "data-" !== name && "aria-" !== name;
    default:
      return false
  }
}

function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
  if (null === value || "undefined" === typeof value || shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) return true;
  if (isCustomComponentTag) return false;
  if (null !== propertyInfo) switch (propertyInfo.type) {
    case 3:
      return !value;
    case 4:
      return false === value;
    case 5:
      return isNaN(value);
    case 6:
      return isNaN(value) || 1 > value
  }
  return false
}

function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
  this.removeEmptyString = removeEmptyString
}

function setValueForProperty(node, name, value, isCustomComponentTag) {
  var JSCompiler_inline_result = properties.hasOwnProperty(name) ? properties[name] : null;
  var JSCompiler_inline_result$jscomp$0 = null !== JSCompiler_inline_result ? 0 === JSCompiler_inline_result.type : isCustomComponentTag ? false : !(2 < name.length) || "o" !== name[0] && "O" !== name[0] || "n" !== name[1] && "N" !== name[1] ? false : true;
  JSCompiler_inline_result$jscomp$0 || (shouldRemoveAttribute(name, value, JSCompiler_inline_result, isCustomComponentTag) && (value = null), isCustomComponentTag || null === JSCompiler_inline_result ?
    isAttributeNameSafe(name) && (null === value ? node.removeAttribute(name) : node.setAttribute(name, "" + value)) : JSCompiler_inline_result.mustUseProperty ? node[JSCompiler_inline_result.propertyName] = null === value ? 3 === JSCompiler_inline_result.type ? false : "" : value : (name = JSCompiler_inline_result.attributeName, isCustomComponentTag = JSCompiler_inline_result.attributeNamespace, null === value ? node.removeAttribute(name) : (JSCompiler_inline_result = JSCompiler_inline_result.type, value = 3 === JSCompiler_inline_result || 4 === JSCompiler_inline_result &&
      true === value ? "" : "" + value, isCustomComponentTag ? node.setAttributeNS(isCustomComponentTag, name, value) : node.setAttribute(name, value))))
}

function describeBuiltInComponentFrame(name, source, ownerFn) {
  if (undefined === prefix) try {
    throw Error();
  } catch (x) {
    prefix =
      (source = x.stack.trim().match(/\n( *(at )?)/)) && source[1] || ""
  }
  return "\n" + prefix + name
}

function describeNativeComponentFrame(fn, construct) {
  if (!fn || reentry) return "";
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = undefined;
  try {
    if (construct)
      if (construct = function () {
        throw Error();
      }, Object.defineProperty(construct.prototype, "props", {
        set: function () {
          throw Error();
        }
      }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(construct, [])
        } catch (x) {
          var control =
            x
        }
        Reflect.construct(fn, [], construct)
      } else {
        try {
          construct.call()
        } catch (x$3) {
          control = x$3
        }
        fn.call(construct.prototype)
      } else {
      try {
        throw Error();
      } catch (x$4) {
        control = x$4
      }
      fn()
    }
  } catch (sample) {
    if (sample && control && "string" === typeof sample.stack) {
      for (var sampleLines = sample.stack.split("\n"), controlLines = control.stack.split("\n"), s = sampleLines.length - 1, c = controlLines.length - 1; 1 <= s && 0 <= c && sampleLines[s] !== controlLines[c];) c--;
      for (; 1 <= s && 0 <= c; s--, c--)
        if (sampleLines[s] !== controlLines[c]) {
          if (1 !== s || 1 !== c) {
            do
              if (s--,
                c--, 0 > c || sampleLines[s] !== controlLines[c]) return "\n" + sampleLines[s].replace(" at new ", " at ");
            while (1 <= s && 0 <= c)
          }
          break
        }
    }
  } finally {
    reentry = false, Error.prepareStackTrace = previousPrepareStackTrace
  }
  return (fn = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(fn) : ""
}

function describeFiber(fiber) {
  switch (fiber.tag) {
    case 5:
      return describeBuiltInComponentFrame(fiber.type);
    case 16:
      return describeBuiltInComponentFrame("Lazy");
    case 13:
      return describeBuiltInComponentFrame("Suspense");
    case 19:
      return describeBuiltInComponentFrame("SuspenseList");
    case 0:
    case 2:
    case 15:
      return fiber = describeNativeComponentFrame(fiber.type, false), fiber;
    case 11:
      return fiber = describeNativeComponentFrame(fiber.type.render, false), fiber;
    case 22:
      return fiber = describeNativeComponentFrame(fiber.type._render, false), fiber;
    case 1:
      return fiber = describeNativeComponentFrame(fiber.type, true), fiber;
    default:
      return ""
  }
}

function getComponentName(type) {
  if (null == type) return null;
  if ("function" === typeof type) return type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE:
      return "SuspenseList"
  }
  if ("object" === typeof type) switch (type.$$typeof) {
    case REACT_CONTEXT_TYPE:
      return (type.displayName || "Context") + ".Consumer";
    case REACT_PROVIDER_TYPE:
      return (type._context.displayName || "Context") + ".Provider";
    case REACT_FORWARD_REF_TYPE:
      var innerType = type.render;
      innerType = innerType.displayName ||
        innerType.name || "";
      return type.displayName || ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef");
    case REACT_MEMO_TYPE:
      return getComponentName(type.type);
    case REACT_BLOCK_TYPE:
      return getComponentName(type._render);
    case REACT_LAZY_TYPE:
      innerType = type._payload;
      type = type._init;
      try {
        return getComponentName(type(innerType))
      } catch (x) { }
  }
  return null
}

function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? "checked" : "value",
    descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField),
    currentValue = "" + node[valueField];
  if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
    var get = descriptor.get,
      set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: true,
      get: function () {
        return get.call(this)
      }, set: function (value) {
        currentValue = "" + value;
        set.call(this, value)
      }
    });
    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable
    });
    return {
      getValue: function () {
        return currentValue
      }, setValue: function (value) {
        currentValue = "" + value
      }, stopTracking: function () {
        node._valueTracker = null;
        delete node[valueField]
      }
    }
  }
}

function track(node) {
  node._valueTracker || (node._valueTracker = trackValueOnNode(node))
}

function updateValueIfChanged(node) {
  if (!node) return false;
  var tracker = node._valueTracker;
  if (!tracker) return true;
  var lastValue = tracker.getValue();
  var value = "";
  node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
  node = value;
  return node !== lastValue ? (tracker.setValue(node), true) : false
}

function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : undefined);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body
  } catch (e) {
    return doc.body
  }
}

function getHostProps(element, props) {
  var checked = props.checked;
  return Object.assign({}, props, {
    defaultChecked: undefined,
    defaultValue: undefined,
    value: undefined,
    checked: null != checked ? checked : element._wrapperState.initialChecked
  })
}

function initWrapperState(element, props) {
  var defaultValue = null == props.defaultValue ? "" : props.defaultValue,
    JSCompiler_temp_const = null != props.checked ? props.checked : props.defaultChecked;
  defaultValue = getToStringValue(null != props.value ? props.value : defaultValue);
  element._wrapperState = {
    initialChecked: JSCompiler_temp_const,
    initialValue: defaultValue,
    controlled: "checkbox" === props.type || "radio" === props.type ? null != props.checked : null != props.value
  }
}

function updateChecked(element, props) {
  props = props.checked;
  null != props && setValueForProperty(element, "checked", props, false)
}

function updateWrapper(element, props) {
  updateChecked(element, props);
  var value = getToStringValue(props.value),
    type = props.type;
  if (null != value)
    if ("number" === type) {
      if (0 === value && "" === element.value || element.value != value) element.value = "" + value
    } else element.value !== "" + value && (element.value = "" + value);
  else if ("submit" === type || "reset" === type) {
    element.removeAttribute("value");
    return
  }
  props.hasOwnProperty("value") ? setDefaultValue(element, props.type, value) : props.hasOwnProperty("defaultValue") && setDefaultValue(element, props.type, getToStringValue(props.defaultValue));
  null == props.checked && null != props.defaultChecked && (element.defaultChecked = !!props.defaultChecked)
}

function postMountWrapper(element, props, isHydrating) {
  if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
    var type = props.type;
    if (!("submit" !== type && "reset" !== type || undefined !== props.value && null !== props.value)) return;
    props = "" + element._wrapperState.initialValue;
    isHydrating || props === element.value || (element.value = props);
    element.defaultValue = props
  }
  isHydrating = element.name;
  "" !== isHydrating && (element.name = "");
  element.defaultChecked = !!element._wrapperState.initialChecked;
  "" !== isHydrating && (element.name = isHydrating)
}

function setDefaultValue(node, type, value) {
  if ("number" !== type || getActiveElement(node.ownerDocument) !== node) null == value ?
    node.defaultValue = "" + node._wrapperState.initialValue : node.defaultValue !== "" + value && (node.defaultValue = "" + value)
}

function flattenChildren(children) {
  var content = "";
  React.Children.forEach(children, function (child) {
    null != child && (content += child)
  });
  return content
}

function getHostProps$1(element, props) {
  element = Object.assign({
    children: undefined
  }, props);
  if (props = flattenChildren(props.children)) element.children = props;
  return element
}

function updateOptions(node, multiple, propValue, setDefaultSelected) {
  node = node.options;
  if (multiple) {
    multiple = {};
    for (var i = 0; i < propValue.length; i++) multiple["$" + propValue[i]] = true;
    for (propValue = 0; propValue < node.length; propValue++) i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true)
  } else {
    propValue = "" + getToStringValue(propValue);
    multiple = null;
    for (i = 0; i < node.length; i++) {
      if (node[i].value === propValue) {
        node[i].selected = true;
        setDefaultSelected && (node[i].defaultSelected = true);
        return
      }
      null !==
        multiple || node[i].disabled || (multiple = node[i])
    }
    null !== multiple && (multiple.selected = true)
  }
}

function getHostProps$3(element, props) {
  if (null != props.dangerouslySetInnerHTML) throw Error(formatProdErrorMessage(91));
  return Object.assign({}, props, {
    value: undefined,
    defaultValue: undefined,
    children: "" + element._wrapperState.initialValue
  })
}

function initWrapperState$2(element, props) {
  var initialValue = props.value;
  if (null == initialValue) {
    initialValue = props.children;
    props = props.defaultValue;
    if (null != initialValue) {
      if (null != props) throw Error(formatProdErrorMessage(92));
      if (Array.isArray(initialValue)) {
        if (!(1 >= initialValue.length)) throw Error(formatProdErrorMessage(93));
        initialValue = initialValue[0]
      }
      props = initialValue
    }
    null == props && (props = "");
    initialValue = props
  }
  element._wrapperState = {
    initialValue: getToStringValue(initialValue)
  }
}

function updateWrapper$1(element, props) {
  var value = getToStringValue(props.value),
    defaultValue = getToStringValue(props.defaultValue);
  null != value && (value = "" + value, value !== element.value && (element.value = value), null == props.defaultValue && element.defaultValue !==
    value && (element.defaultValue = value));
  null != defaultValue && (element.defaultValue = "" + defaultValue)
}

function postMountWrapper$3(element, props) {
  props = element.textContent;
  props === element._wrapperState.initialValue && "" !== props && null !== props && (element.value = props)
}

function dangerousStyleValue(name, value, isCustomProperty) {
  return null == value || "boolean" === typeof value || "" === value ? "" : isCustomProperty || "number" !== typeof value || 0 === value || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name] ? ("" + value).trim() : value + "px"
}

function setValueForStyles(node, styles) {
  node = node.style;
  for (var styleName in styles)
    if (styles.hasOwnProperty(styleName)) {
      var isCustomProperty = 0 === styleName.indexOf("--"),
        styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
      "float" === styleName && (styleName = "cssFloat");
      isCustomProperty ? node.setProperty(styleName, styleValue) : node[styleName] = styleValue
    }
}

function assertValidProps(tag, props) {
  if (props) {
    if (voidElementTags[tag] && (null != props.children || null != props.dangerouslySetInnerHTML)) throw Error(formatProdErrorMessage(137,
      tag));
    if (null != props.dangerouslySetInnerHTML) {
      if (null != props.children) throw Error(formatProdErrorMessage(60));
      if (!("object" === typeof props.dangerouslySetInnerHTML && "__html" in props.dangerouslySetInnerHTML)) throw Error(formatProdErrorMessage(61));
    }
    if (null != props.style && "object" !== typeof props.style) throw Error(formatProdErrorMessage(62));
  }
}

function isCustomComponent(tagName, props) {
  if (-1 === tagName.indexOf("-")) return "string" === typeof props.is;
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true
  }
}

function restoreStateOfTarget(target) {
  if (target = getInstanceFromNode(target)) {
    if ("function" !== typeof restoreImpl) throw Error(formatProdErrorMessage(280));
    var stateNode = target.stateNode;
    stateNode && (stateNode = getFiberCurrentPropsFromNode(stateNode),
      restoreImpl(target.stateNode, target.type, stateNode))
  }
}

function enqueueStateRestore(target) {
  restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target
}

function restoreStateIfNeeded() {
  if (restoreTarget) {
    var target = restoreTarget,
      queuedTargets = restoreQueue;
    restoreQueue = restoreTarget = null;
    restoreStateOfTarget(target);
    if (queuedTargets)
      for (target = 0; target < queuedTargets.length; target++) restoreStateOfTarget(queuedTargets[target])
  }
}

function finishEventHandler() {
  if (null !==
    restoreTarget || null !== restoreQueue) flushDiscreteUpdatesImpl(), restoreStateIfNeeded()
}

function batchedEventUpdates(fn, a, b) {
  if (isBatchingEventUpdates) return fn(a, b);
  isBatchingEventUpdates = true;
  try {
    return batchedEventUpdatesImpl(fn, a, b)
  } finally {
    isBatchingEventUpdates = false, finishEventHandler()
  }
}

function getListener(inst, registrationName) {
  var stateNode = inst.stateNode;
  if (null === stateNode) return null;
  var props = getFiberCurrentPropsFromNode(stateNode);
  if (null === props) return null;
  stateNode = props[registrationName];
  a: switch (registrationName) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
      inst = !props;
      break a;
    default:
      inst = false
  }
  if (inst) return null;
  if (stateNode && "function" !== typeof stateNode) throw Error(formatProdErrorMessage(231,
    registrationName, typeof stateNode));
  return stateNode
}

function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = false;
  caughtError = null;
  invokeGuardedCallbackImpl.apply(reporter, arguments)
}

function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
  invokeGuardedCallback.apply(this, arguments);
  if (hasError) {
    if (hasError) {
      var error = caughtError;
      hasError = false;
      caughtError = null
    } else throw Error(formatProdErrorMessage(198));
    hasRethrowError || (hasRethrowError = true, rethrowError = error)
  }
}

function getNearestMountedFiber(fiber) {
  var node = fiber,
    nearestMounted = fiber;
  if (fiber.alternate)
    for (; node.return;) node = node.return;
  else {
    fiber = node;
    do node = fiber, 0 !== (node.flags & 1026) && (nearestMounted = node.return), fiber = node.return; while (fiber)
  }
  return 3 === node.tag ? nearestMounted : null
}

function getSuspenseInstanceFromFiber(fiber) {
  if (13 === fiber.tag) {
    var suspenseState = fiber.memoizedState;
    null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
    if (null !== suspenseState) return suspenseState.dehydrated
  }
  return null
}

function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber) throw Error(formatProdErrorMessage(188));
}

function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    alternate = getNearestMountedFiber(fiber);
    if (null === alternate) throw Error(formatProdErrorMessage(188));
    return alternate !== fiber ? null : fiber
  }
  for (var a = fiber, b = alternate; ;) {
    var parentA = a.return;
    if (null === parentA) break;
    var parentB = parentA.alternate;
    if (null === parentB) {
      b = parentA.return;
      if (null !== b) {
        a = b;
        continue
      }
      break
    }
    if (parentA.child === parentB.child) {
      for (parentB = parentA.child; parentB;) {
        if (parentB === a) return assertIsMounted(parentA), fiber;
        if (parentB === b) return assertIsMounted(parentA), alternate;
        parentB = parentB.sibling
      }
      throw Error(formatProdErrorMessage(188));
    }
    if (a.return !== b.return) a = parentA, b = parentB;
    else {
      for (var didFindChild = false, child$8 = parentA.child; child$8;) {
        if (child$8 === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break
        }
        if (child$8 === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break
        }
        child$8 = child$8.sibling
      }
      if (!didFindChild) {
        for (child$8 =
          parentB.child; child$8;) {
          if (child$8 === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break
          }
          if (child$8 === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break
          }
          child$8 = child$8.sibling
        }
        if (!didFindChild) throw Error(formatProdErrorMessage(189));
      }
    } if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
  }
  if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
  return a.stateNode.current === a ? fiber : alternate
}

function findCurrentHostFiber(parent) {
  parent = findCurrentFiberUsingSlowPath(parent);
  if (!parent) return null;
  for (var node =
    parent; ;) {
    if (5 === node.tag || 6 === node.tag) return node;
    if (node.child) node.child.return = node, node = node.child;
    else {
      if (node === parent) break;
      for (; !node.sibling;) {
        if (!node.return || node.return === parent) return null;
        node = node.return
      }
      node.sibling.return = node.return;
      node = node.sibling
    }
  }
  return null
}

function doesFiberContain(parentFiber, childFiber) {
  for (var parentFiberAlternate = parentFiber.alternate; null !== childFiber;) {
    if (childFiber === parentFiber || childFiber === parentFiberAlternate) return true;
    childFiber = childFiber.return
  }
  return false
}

function createQueuedReplayableEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  return {
    blockedOn: blockedOn,
    domEventName: domEventName,
    eventSystemFlags: eventSystemFlags | 16,
    nativeEvent: nativeEvent,
    targetContainers: [targetContainer]
  }
}

function queueDiscreteEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  blockedOn = createQueuedReplayableEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent);
  queuedDiscreteEvents.push(blockedOn);
  if (1 ===
    queuedDiscreteEvents.length)
    for (; null !== blockedOn.blockedOn;) {
      domEventName = getInstanceFromNode(blockedOn.blockedOn);
      if (null === domEventName) break;
      attemptSynchronousHydration(domEventName);
      if (null === blockedOn.blockedOn) replayUnblockedEvents();
      else break
    }
}

function clearIfContinuousEvent(domEventName, nativeEvent) {
  switch (domEventName) {
    case "focusin":
    case "focusout":
      queuedFocus = null;
      break;
    case "dragenter":
    case "dragleave":
      queuedDrag = null;
      break;
    case "mouseover":
    case "mouseout":
      queuedMouse = null;
      break;
    case "pointerover":
    case "pointerout":
      queuedPointers.delete(nativeEvent.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      queuedPointerCaptures.delete(nativeEvent.pointerId)
  }
}

function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent) return existingQueuedEvent = createQueuedReplayableEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn),
    null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
  existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
  blockedOn = existingQueuedEvent.targetContainers;
  null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
  return existingQueuedEvent
}

function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  switch (domEventName) {
    case "focusin":
      return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus,
        blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), true;
    case "dragenter":
      return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), true;
    case "mouseover":
      return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), true;
    case "pointerover":
      var pointerId = nativeEvent.pointerId;
      queuedPointers.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId) ||
        null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent));
      return true;
    case "gotpointercapture":
      return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)), true
  }
  return false
}

function attemptExplicitHydrationTarget(queuedTarget) {
  var targetInst = getClosestInstanceFromNode(queuedTarget.target);
  if (null !== targetInst) {
    var nearestMounted =
      getNearestMountedFiber(targetInst);
    if (null !== nearestMounted)
      if (targetInst = nearestMounted.tag, 13 === targetInst) {
        if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
          queuedTarget.blockedOn = targetInst;
          attemptHydrationAtPriority(queuedTarget.lanePriority, function () {
            unstable_runWithPriority(queuedTarget.priority, function () {
              attemptHydrationAtCurrentPriority(nearestMounted)
            })
          });
          return
        }
      } else if (3 === targetInst && nearestMounted.stateNode.hydrate) {
        queuedTarget.blockedOn = 3 === nearestMounted.tag ?
          nearestMounted.stateNode.containerInfo : null;
        return
      }
  }
  queuedTarget.blockedOn = null
}

function attemptReplayContinuousQueuedEvent(queuedEvent) {
  if (null !== queuedEvent.blockedOn) return false;
  for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length;) {
    var nextBlockedOn = attemptToDispatchEvent(queuedEvent.domEventName, queuedEvent.eventSystemFlags, targetContainers[0], queuedEvent.nativeEvent);
    if (null !== nextBlockedOn) return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers &&
      attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
    targetContainers.shift()
  }
  return true
}

function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
  attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key)
}

function replayUnblockedEvents() {
  for (hasScheduledReplayAttempt = false; 0 < queuedDiscreteEvents.length;) {
    var nextDiscreteEvent = queuedDiscreteEvents[0];
    if (null !== nextDiscreteEvent.blockedOn) {
      nextDiscreteEvent = getInstanceFromNode(nextDiscreteEvent.blockedOn);
      null !== nextDiscreteEvent && attemptUserBlockingHydration(nextDiscreteEvent);
      break
    }
    for (var targetContainers = nextDiscreteEvent.targetContainers; 0 < targetContainers.length;) {
      var nextBlockedOn = attemptToDispatchEvent(nextDiscreteEvent.domEventName, nextDiscreteEvent.eventSystemFlags, targetContainers[0], nextDiscreteEvent.nativeEvent);
      if (null !== nextBlockedOn) {
        nextDiscreteEvent.blockedOn = nextBlockedOn;
        break
      }
      targetContainers.shift()
    }
    null === nextDiscreteEvent.blockedOn && queuedDiscreteEvents.shift()
  }
  null !== queuedFocus &&
    attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
  null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
  null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
  queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
  queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap)
}

function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
  queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt ||
    (hasScheduledReplayAttempt = true, unstable_scheduleCallback(unstable_NormalPriority, replayUnblockedEvents)))
}

function retryIfBlockedOn(unblocked) {
  if (0 < queuedDiscreteEvents.length) {
    scheduleCallbackIfUnblocked(queuedDiscreteEvents[0], unblocked);
    for (var i = 1; i < queuedDiscreteEvents.length; i++) {
      var queuedEvent$jscomp$0 = queuedDiscreteEvents[i];
      queuedEvent$jscomp$0.blockedOn === unblocked && (queuedEvent$jscomp$0.blockedOn = null)
    }
  }
  null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
  null !== queuedDrag &&
    scheduleCallbackIfUnblocked(queuedDrag, unblocked);
  null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
  i = function (queuedEvent) {
    return scheduleCallbackIfUnblocked(queuedEvent, unblocked)
  };
  queuedPointers.forEach(i);
  queuedPointerCaptures.forEach(i);
  for (i = 0; i < queuedExplicitHydrationTargets.length; i++) queuedEvent$jscomp$0 = queuedExplicitHydrationTargets[i], queuedEvent$jscomp$0.blockedOn === unblocked && (queuedEvent$jscomp$0.blockedOn = null);
  for (; 0 < queuedExplicitHydrationTargets.length && (i =
    queuedExplicitHydrationTargets[0], null === i.blockedOn);) attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift()
}

function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit" + styleProp] = "webkit" + eventName;
  prefixes["Moz" + styleProp] = "moz" + eventName;
  return prefixes
}

function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
  if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName],
    styleProp;
  for (styleProp in prefixMap)
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) return prefixedEventNames[eventName] = prefixMap[styleProp];
  return eventName
}

function registerSimplePluginEventsAndSetTheirPriorities(eventTypes, priority) {
  for (var i = 0; i < eventTypes.length; i += 2) {
    var topEvent = eventTypes[i],
      event = eventTypes[i + 1];
    event = "on" + (event[0].toUpperCase() + event.slice(1));
    eventPriorities.set(topEvent, priority);
    topLevelEventsToReactNames.set(topEvent,
      event);
    registerTwoPhaseEvent(event, [topEvent])
  }
}

function getHighestPriorityLanes(lanes) {
  if (0 !== (1 & lanes)) return return_highestLanePriority = 15, 1;
  if (0 !== (2 & lanes)) return return_highestLanePriority = 14, 2;
  if (0 !== (4 & lanes)) return return_highestLanePriority = 13, 4;
  var inputDiscreteLanes = 24 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 12, inputDiscreteLanes;
  if (0 !== (lanes & 32)) return return_highestLanePriority = 11, 32;
  inputDiscreteLanes = 192 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority =
    10, inputDiscreteLanes;
  if (0 !== (lanes & 256)) return return_highestLanePriority = 9, 256;
  inputDiscreteLanes = 3584 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 8, inputDiscreteLanes;
  if (0 !== (lanes & 4096)) return return_highestLanePriority = 7, 4096;
  inputDiscreteLanes = 4186112 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 6, inputDiscreteLanes;
  inputDiscreteLanes = 62914560 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 5, inputDiscreteLanes;
  if (lanes & 67108864) return return_highestLanePriority =
    4, 67108864;
  if (0 !== (lanes & 134217728)) return return_highestLanePriority = 3, 134217728;
  inputDiscreteLanes = 805306368 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 2, inputDiscreteLanes;
  if (0 !== (1073741824 & lanes)) return return_highestLanePriority = 1, 1073741824;
  return_highestLanePriority = 8;
  return lanes
}

function getNextLanes(root, wipLanes) {
  var pendingLanes = root.pendingLanes;
  if (0 === pendingLanes) return return_highestLanePriority = 0;
  var nextLanes = 0,
    nextLanePriority = 0,
    expiredLanes = root.expiredLanes,
    suspendedLanes = root.suspendedLanes,
    pingedLanes = root.pingedLanes;
  if (0 !== expiredLanes) nextLanes = expiredLanes, nextLanePriority = return_highestLanePriority = 15;
  else if (expiredLanes = pendingLanes & 134217727, 0 !== expiredLanes) {
    var nonIdleUnblockedLanes = expiredLanes & ~suspendedLanes;
    0 !== nonIdleUnblockedLanes ? (nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes), nextLanePriority = return_highestLanePriority) : (pingedLanes &= expiredLanes, 0 !== pingedLanes && (nextLanes = getHighestPriorityLanes(pingedLanes), nextLanePriority =
      return_highestLanePriority))
  } else expiredLanes = pendingLanes & ~suspendedLanes, 0 !== expiredLanes ? (nextLanes = getHighestPriorityLanes(expiredLanes), nextLanePriority = return_highestLanePriority) : 0 !== pingedLanes && (nextLanes = getHighestPriorityLanes(pingedLanes), nextLanePriority = return_highestLanePriority); if (0 === nextLanes) return 0;
  nextLanes = 31 - clz32(nextLanes);
  nextLanes = pendingLanes & ((0 > nextLanes ? 0 : 1 << nextLanes) << 1) - 1;
  if (0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes)) {
    getHighestPriorityLanes(wipLanes);
    if (nextLanePriority <= return_highestLanePriority) return wipLanes;
    return_highestLanePriority = nextLanePriority
  }
  wipLanes = root.entangledLanes;
  if (0 !== wipLanes)
    for (root = root.entanglements, wipLanes &= nextLanes; 0 < wipLanes;) pendingLanes = 31 - clz32(wipLanes), nextLanePriority = 1 << pendingLanes, nextLanes |= root[pendingLanes], wipLanes &= ~nextLanePriority;
  return nextLanes
}

function getLanesToRetrySynchronouslyOnError(root) {
  root = root.pendingLanes & -1073741825;
  return 0 !== root ? root : root & 1073741824 ? 1073741824 : 0
}

function findUpdateLane(lanePriority,
  wipLanes) {
  switch (lanePriority) {
    case 15:
      return 1;
    case 14:
      return 2;
    case 12:
      return lanePriority = getHighestPriorityLane(24 & ~wipLanes), 0 === lanePriority ? findUpdateLane(10, wipLanes) : lanePriority;
    case 10:
      return lanePriority = getHighestPriorityLane(192 & ~wipLanes), 0 === lanePriority ? findUpdateLane(8, wipLanes) : lanePriority;
    case 8:
      return lanePriority = getHighestPriorityLane(3584 & ~wipLanes), 0 === lanePriority && (lanePriority = getHighestPriorityLane(4186112 & ~wipLanes), 0 === lanePriority && (lanePriority = 512)), lanePriority;
    case 2:
      return wipLanes = getHighestPriorityLane(805306368 & ~wipLanes), 0 === wipLanes && (wipLanes = 268435456), wipLanes
  }
  throw Error(formatProdErrorMessage(358, lanePriority));
}

function markRootUpdated(root, updateLane, eventTime) {
  root.pendingLanes |= updateLane;
  var higherPriorityLanes = updateLane - 1;
  root.suspendedLanes &= higherPriorityLanes;
  root.pingedLanes &=
    higherPriorityLanes;
  root = root.eventTimes;
  updateLane = 31 - clz32(updateLane);
  root[updateLane] = eventTime
}

function clz32Fallback(lanes) {
  return 0 === lanes ? 32 : 31 - (log(lanes) / LN2 | 0) | 0
}

function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
  isInsideEventHandler || flushDiscreteUpdatesImpl();
  var fn = dispatchEvent,
    prevIsInsideEventHandler = isInsideEventHandler;
  isInsideEventHandler = true;
  try {
    discreteUpdatesImpl(fn, domEventName, eventSystemFlags, container, nativeEvent)
  } finally {
    (isInsideEventHandler =
      prevIsInsideEventHandler) || finishEventHandler()
  }
}

function dispatchUserBlockingUpdate(domEventName, eventSystemFlags, container, nativeEvent) {
  runWithPriority(UserBlockingPriority$1, dispatchEvent.bind(null, domEventName, eventSystemFlags, container, nativeEvent))
}

function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  if (_enabled) {
    var allowReplay;
    if ((allowReplay = 0 === (eventSystemFlags & 4)) && 0 < queuedDiscreteEvents.length && -1 < discreteReplayableEvents.indexOf(domEventName)) queueDiscreteEvent(null,
      domEventName, eventSystemFlags, targetContainer, nativeEvent);
    else {
      var blockedOn = attemptToDispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent);
      if (null === blockedOn) allowReplay && clearIfContinuousEvent(domEventName, nativeEvent);
      else {
        if (allowReplay) {
          if (-1 < discreteReplayableEvents.indexOf(domEventName)) {
            queueDiscreteEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent);
            return
          }
          if (queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)) return;
          clearIfContinuousEvent(domEventName, nativeEvent)
        }
        dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, null, targetContainer)
      }
    }
  }
}

function attemptToDispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  var nativeEventTarget = getEventTarget(nativeEvent);
  nativeEventTarget = getClosestInstanceFromNode(nativeEventTarget);
  if (null !== nativeEventTarget) {
    var nearestMounted = getNearestMountedFiber(nativeEventTarget);
    if (null === nearestMounted) nativeEventTarget = null;
    else {
      var tag =
        nearestMounted.tag;
      if (13 === tag) {
        nativeEventTarget = getSuspenseInstanceFromFiber(nearestMounted);
        if (null !== nativeEventTarget) return nativeEventTarget;
        nativeEventTarget = null
      } else if (3 === tag) {
        if (nearestMounted.stateNode.hydrate) return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
        nativeEventTarget = null
      } else nearestMounted !== nativeEventTarget && (nativeEventTarget = null)
    }
  }
  dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, nativeEventTarget, targetContainer);
  return null
}

function getData() {
  if (fallbackText) return fallbackText;
  var start, startValue = startText,
    startLength = startValue.length,
    end, endValue = "value" in root ? root.value : root.textContent,
    endLength = endValue.length;
  for (start = 0; start < startLength && startValue[start] === endValue[start]; start++);
  var minEnd = startLength - start;
  for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++);
  return fallbackText = endValue.slice(start, 1 < end ? 1 - end : undefined)
}

function createSyntheticEvent(Interface) {
  function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
    this._reactName = reactName;
    this._targetInst = targetInst;
    this.type =
      reactEventType;
    this.nativeEvent = nativeEvent;
    this.target = nativeEventTarget;
    this.currentTarget = null;
    for (var propName in Interface) Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
    this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
    this.isPropagationStopped = functionThatReturnsFalse;
    return this
  }
  Object.assign(SyntheticBaseEvent.prototype, {
    preventDefault: function () {
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue)
    }, stopPropagation: function () {
      var event = this.nativeEvent;
      event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue)
    }, persist: function () { }, isPersistent: functionThatReturnsTrue
  });
  return SyntheticBaseEvent
}

function modifierStateGetter(keyArg) {
  var nativeEvent = this.nativeEvent;
  return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false
}

function getEventModifierState(nativeEvent) {
  return modifierStateGetter
}

function isFallbackCompositionEnd(domEventName, nativeEvent) {
  switch (domEventName) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false
  }
}

function getDataFromCustomEvent(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null
}

function getNativeBeforeInputChars(domEventName, nativeEvent) {
  switch (domEventName) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;
    case "textInput":
      return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ?
        null : domEventName;
    default:
      return null
  }
}

function getFallbackBeforeInputChars(domEventName, nativeEvent) {
  if (isComposing) return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
  switch (domEventName) {
    case "paste":
      return null;
    case "keypress":
      if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
        if (nativeEvent.char &&
          1 < nativeEvent.char.length) return nativeEvent.char;
        if (nativeEvent.which) return String.fromCharCode(nativeEvent.which)
      }
      return null;
    case "compositionend":
      return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
    default:
      return null
  }
}

function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false
}

function isEventSupported(eventNameSuffix) {
  if (!canUseDOM) return false;
  eventNameSuffix = "on" + eventNameSuffix;
  var isSupported = eventNameSuffix in document;
  isSupported || (isSupported = document.createElement("div"), isSupported.setAttribute(eventNameSuffix, "return;"), isSupported = "function" === typeof isSupported[eventNameSuffix]);
  return isSupported
}

function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
  enqueueStateRestore(target);
  inst = accumulateTwoPhaseListeners(inst, "onChange");
  0 < inst.length && (nativeEvent = new SyntheticEvent("onChange", "change", null, nativeEvent,
    target), dispatchQueue.push({
      event: nativeEvent,
      listeners: inst
    }))
}

function runEventInBatch(dispatchQueue) {
  processDispatchQueue(dispatchQueue, 0)
}

function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst
}

function getTargetInstForChangeEvent(domEventName, targetInst) {
  if ("change" === domEventName) return targetInst
}

function stopWatchingForValueChange() {
  activeElement && (activeElement.detachEvent("onpropertychange", handlePropertyChange),
    activeElementInst = activeElement = null)
}

function handlePropertyChange(nativeEvent) {
  if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst)) {
    var dispatchQueue = [];
    createAndAccumulateChangeEvent(dispatchQueue, activeElementInst, nativeEvent, getEventTarget(nativeEvent));
    nativeEvent = runEventInBatch;
    if (isInsideEventHandler) nativeEvent(dispatchQueue);
    else {
      isInsideEventHandler = true;
      try {
        batchedUpdatesImpl(nativeEvent, dispatchQueue)
      } finally {
        isInsideEventHandler = false, finishEventHandler()
      }
    }
  }
}

function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
  "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement = target, activeElementInst = targetInst, activeElement.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange()
}

function getTargetInstForInputEventPolyfill(domEventName, targetInst) {
  if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName) return getInstIfValueChanged(activeElementInst)
}

function getTargetInstForClickEvent(domEventName, targetInst) {
  if ("click" === domEventName) return getInstIfValueChanged(targetInst)
}

function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
  if ("input" === domEventName || "change" === domEventName) return getInstIfValueChanged(targetInst)
}

function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) return true;
  if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB) return false;
  var keysA = Object.keys(objA),
    keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (keysB = 0; keysB < keysA.length; keysB++)
    if (!ownProperty(objB, keysA[keysB]) || !objectIs(objA[keysA[keysB]], objB[keysA[keysB]])) return false;
  return true
}

function getLeafNode(node) {
  for (; node && node.firstChild;) node = node.firstChild;
  return node
}

function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  root = 0;
  for (var nodeEnd; node;) {
    if (3 === node.nodeType) {
      nodeEnd = root + node.textContent.length;
      if (root <=
        offset && nodeEnd >= offset) return {
          node: node,
          offset: offset - root
        };
      root = nodeEnd
    }
    a: {
      for (; node;) {
        if (node.nextSibling) {
          node = node.nextSibling;
          break a
        }
        node = node.parentNode
      }
      node = undefined
    }
    node = getLeafNode(node)
  }
}

function containsNode(outerNode, innerNode) {
  return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) &
    16) : false : false
}

function getActiveElementDeep() {
  for (var win = window, element = getActiveElement(); element instanceof win.HTMLIFrameElement;) {
    try {
      var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href
    } catch (err) {
      JSCompiler_inline_result = false
    }
    if (JSCompiler_inline_result) win = element.contentWindow;
    else break;
    element = getActiveElement(win.document)
  }
  return element
}

function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && ("input" ===
    nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable)
}

function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
  var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
  mouseDown || null == activeElement$1 || activeElement$1 !== getActiveElement(doc) || (doc = activeElement$1,
    "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = {
      start: doc.selectionStart,
      end: doc.selectionEnd
    } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
      anchorNode: doc.anchorNode,
      anchorOffset: doc.anchorOffset,
      focusNode: doc.focusNode,
      focusOffset: doc.focusOffset
    }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst$1, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent("onSelect", "select", null,
      nativeEvent, nativeEventTarget), dispatchQueue.push({
        event: nativeEvent,
        listeners: doc
      }), nativeEvent.target = activeElement$1)))
}

function executeDispatch(event, listener, currentTarget) {
  var type = event.type || "unknown-event";
  event.currentTarget = currentTarget;
  invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
  event.currentTarget = null
}

function processDispatchQueue(dispatchQueue, eventSystemFlags) {
  eventSystemFlags = 0 !== (eventSystemFlags & 4);
  for (var i = 0; i < dispatchQueue.length; i++) {
    var _dispatchQueue$i =
      dispatchQueue[i],
      event = _dispatchQueue$i.event;
    _dispatchQueue$i = _dispatchQueue$i.listeners;
    a: {
      var previousInstance = undefined;
      if (eventSystemFlags)
        for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
          var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0],
            instance = _dispatchListeners$i.instance,
            currentTarget = _dispatchListeners$i.currentTarget;
          _dispatchListeners$i = _dispatchListeners$i.listener;
          if (instance !== previousInstance && event.isPropagationStopped()) break a;
          executeDispatch(event, _dispatchListeners$i,
            currentTarget);
          previousInstance = instance
        } else
        for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
          _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
          instance = _dispatchListeners$i.instance;
          currentTarget = _dispatchListeners$i.currentTarget;
          _dispatchListeners$i = _dispatchListeners$i.listener;
          if (instance !== previousInstance && event.isPropagationStopped()) break a;
          executeDispatch(event, _dispatchListeners$i, currentTarget);
          previousInstance = instance
        }
    }
  }
  if (hasRethrowError) throw dispatchQueue = rethrowError,
    hasRethrowError = false, rethrowError = null, dispatchQueue;
}

function listenToNonDelegatedEvent(domEventName, targetElement) {
  var listenerSet = getEventListenerSet(targetElement),
    listenerSetKey = domEventName + "__bubble";
  listenerSet.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), listenerSet.add(listenerSetKey))
}

function listenToAllSupportedEvents(rootContainerElement) {
  rootContainerElement[listeningMarker] || (rootContainerElement[listeningMarker] = true, allNativeEvents.forEach(function (domEventName) {
    nonDelegatedEvents.has(domEventName) ||
      listenToNativeEvent(domEventName, false, rootContainerElement, null);
    listenToNativeEvent(domEventName, true, rootContainerElement, null)
  }))
}

function listenToNativeEvent(domEventName, isCapturePhaseListener, rootContainerElement, targetElement) {
  var eventSystemFlags = 4 < arguments.length && undefined !== arguments[4] ? arguments[4] : 0,
    target = rootContainerElement;
  "selectionchange" === domEventName && 9 !== rootContainerElement.nodeType && (target = rootContainerElement.ownerDocument);
  if (null !== targetElement && !isCapturePhaseListener && nonDelegatedEvents.has(domEventName)) {
    if ("scroll" !==
      domEventName) return;
    eventSystemFlags |= 2;
    target = targetElement
  }
  var listenerSet = getEventListenerSet(target),
    listenerSetKey = domEventName + "__" + (isCapturePhaseListener ? "capture" : "bubble");
  listenerSet.has(listenerSetKey) || (isCapturePhaseListener && (eventSystemFlags |= 4), addTrappedEventListener(target, domEventName, eventSystemFlags, isCapturePhaseListener), listenerSet.add(listenerSetKey))
}

function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener, isDeferredListenerForLegacyFBSupport) {
  isDeferredListenerForLegacyFBSupport =
    eventPriorities.get(domEventName);
  switch (undefined === isDeferredListenerForLegacyFBSupport ? 2 : isDeferredListenerForLegacyFBSupport) {
    case 0:
      isDeferredListenerForLegacyFBSupport = dispatchDiscreteEvent;
      break;
    case 1:
      isDeferredListenerForLegacyFBSupport = dispatchUserBlockingUpdate;
      break;
    default:
      isDeferredListenerForLegacyFBSupport = dispatchEvent
  }
  eventSystemFlags = isDeferredListenerForLegacyFBSupport.bind(null, domEventName, eventSystemFlags, targetContainer);
  isDeferredListenerForLegacyFBSupport = undefined;
  !passiveBrowserEventsSupported ||
    "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (isDeferredListenerForLegacyFBSupport = true);
  isCapturePhaseListener ? undefined !== isDeferredListenerForLegacyFBSupport ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
    capture: true,
    passive: isDeferredListenerForLegacyFBSupport
  }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : undefined !== isDeferredListenerForLegacyFBSupport ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
    passive: isDeferredListenerForLegacyFBSupport
  }) :
    targetContainer.addEventListener(domEventName, eventSystemFlags, false)
}

function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
  var ancestorInst = targetInst$jscomp$0;
  if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0) a: for (; ;) {
    if (null === targetInst$jscomp$0) return;
    var nodeTag = targetInst$jscomp$0.tag;
    if (3 === nodeTag || 4 === nodeTag) {
      var container = targetInst$jscomp$0.stateNode.containerInfo;
      if (container === targetContainer ||
        8 === container.nodeType && container.parentNode === targetContainer) break;
      if (4 === nodeTag)
        for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag;) {
          var grandTag = nodeTag.tag;
          if (3 === grandTag || 4 === grandTag)
            if (grandTag = nodeTag.stateNode.containerInfo, grandTag === targetContainer || 8 === grandTag.nodeType && grandTag.parentNode === targetContainer) return;
          nodeTag = nodeTag.return
        }
      for (; null !== container;) {
        nodeTag = getClosestInstanceFromNode(container);
        if (null === nodeTag) return;
        grandTag = nodeTag.tag;
        if (5 === grandTag || 6 === grandTag) {
          targetInst$jscomp$0 =
            ancestorInst = nodeTag;
          continue a
        }
        container = container.parentNode
      }
    }
    targetInst$jscomp$0 = targetInst$jscomp$0.return
  }
  batchedEventUpdates(function () {
    var targetInst = ancestorInst,
      nativeEventTarget = getEventTarget(nativeEvent),
      dispatchQueue = [];
    a: {
      var reactName = topLevelEventsToReactNames.get(domEventName);
      if (undefined !== reactName) {
        var SyntheticEventCtor = SyntheticEvent,
          reactEventType = domEventName;
        switch (domEventName) {
          case "keypress":
            if (0 === getEventCharCode(nativeEvent)) break a;
          case "keydown":
          case "keyup":
            SyntheticEventCtor =
              SyntheticKeyboardEvent;
            break;
          case "focusin":
            reactEventType = "focus";
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "focusout":
            reactEventType = "blur";
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "beforeblur":
          case "afterblur":
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "click":
            if (2 === nativeEvent.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            SyntheticEventCtor = SyntheticMouseEvent;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            SyntheticEventCtor =
              SyntheticDragEvent;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            SyntheticEventCtor = SyntheticTouchEvent;
            break;
          case ANIMATION_END:
          case ANIMATION_ITERATION:
          case ANIMATION_START:
            SyntheticEventCtor = SyntheticAnimationEvent;
            break;
          case TRANSITION_END:
            SyntheticEventCtor = SyntheticTransitionEvent;
            break;
          case "scroll":
            SyntheticEventCtor = SyntheticUIEvent;
            break;
          case "wheel":
            SyntheticEventCtor = SyntheticWheelEvent;
            break;
          case "copy":
          case "cut":
          case "paste":
            SyntheticEventCtor = SyntheticClipboardEvent;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            SyntheticEventCtor = SyntheticPointerEvent
        }
        var inCapturePhase = 0 !== (eventSystemFlags & 4),
          accumulateTargetOnly = !inCapturePhase && "scroll" === domEventName,
          reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
        inCapturePhase = [];
        for (var instance = targetInst, lastHostComponent; null !== instance;) {
          lastHostComponent = instance;
          var stateNode = lastHostComponent.stateNode;
          5 === lastHostComponent.tag && null !== stateNode && (lastHostComponent = stateNode, null !== reactEventName && (stateNode = getListener(instance, reactEventName), null != stateNode && inCapturePhase.push(createDispatchListener(instance, stateNode, lastHostComponent))));
          if (accumulateTargetOnly) break;
          instance = instance.return
        }
        0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(reactName, reactEventType, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
          event: reactName,
          listeners: inCapturePhase
        }))
      }
    }
    if (0 ===
      (eventSystemFlags & 7)) {
      a: {
        reactName = "mouseover" === domEventName || "pointerover" === domEventName;
        SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
        if (reactName && 0 === (eventSystemFlags & 16) && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey])) break a;
        if (SyntheticEventCtor || reactName) {
          reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ?
            reactName.defaultView || reactName.parentWindow : window;
          if (SyntheticEventCtor) {
            if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), reactEventType !== accumulateTargetOnly || 5 !== reactEventType.tag && 6 !== reactEventType.tag)) reactEventType = null
          } else SyntheticEventCtor = null, reactEventType = targetInst; if (SyntheticEventCtor !==
            reactEventType) {
            inCapturePhase = SyntheticMouseEvent;
            stateNode = "onMouseLeave";
            reactEventName = "onMouseEnter";
            instance = "mouse";
            if ("pointerout" === domEventName || "pointerover" === domEventName) inCapturePhase = SyntheticPointerEvent, stateNode = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
            accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
            lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
            reactName = new inCapturePhase(stateNode,
              instance + "leave", SyntheticEventCtor, nativeEvent, nativeEventTarget);
            reactName.target = accumulateTargetOnly;
            reactName.relatedTarget = lastHostComponent;
            stateNode = null;
            getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(reactEventName, instance + "enter", reactEventType, nativeEvent, nativeEventTarget), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, stateNode = inCapturePhase);
            accumulateTargetOnly = stateNode;
            if (SyntheticEventCtor &&
              reactEventType) b: {
                inCapturePhase = SyntheticEventCtor;
                reactEventName = reactEventType;
                instance = 0;
                for (lastHostComponent = inCapturePhase; lastHostComponent; lastHostComponent = getParent(lastHostComponent)) instance++;
                lastHostComponent = 0;
                for (stateNode = reactEventName; stateNode; stateNode = getParent(stateNode)) lastHostComponent++;
                for (; 0 < instance - lastHostComponent;) inCapturePhase = getParent(inCapturePhase), instance--;
                for (; 0 < lastHostComponent - instance;) reactEventName = getParent(reactEventName), lastHostComponent--;
                for (; instance--;) {
                  if (inCapturePhase ===
                    reactEventName || null !== reactEventName && inCapturePhase === reactEventName.alternate) break b;
                  inCapturePhase = getParent(inCapturePhase);
                  reactEventName = getParent(reactEventName)
                }
                inCapturePhase = null
              } else inCapturePhase = null;
            null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(dispatchQueue, reactName, SyntheticEventCtor, inCapturePhase, false);
            null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(dispatchQueue, accumulateTargetOnly, reactEventType, inCapturePhase, true)
          }
        }
      }
      a: {
        reactName =
          targetInst ? getNodeFromInstance(targetInst) : window;
        SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
        if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type) var getTargetInstFunc = getTargetInstForChangeEvent;
        else if (isTextInputElement(reactName))
          if (isInputEventSupported) getTargetInstFunc = getTargetInstForInputOrChangeEvent;
          else {
            getTargetInstFunc = getTargetInstForInputEventPolyfill;
            var handleEventFunc = handleEventsForInputEventPolyfill
          } else (SyntheticEventCtor =
            reactName.nodeName) && "input" === SyntheticEventCtor.toLowerCase() && ("checkbox" === reactName.type || "radio" === reactName.type) && (getTargetInstFunc = getTargetInstForClickEvent); if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
              createAndAccumulateChangeEvent(dispatchQueue, getTargetInstFunc, nativeEvent, nativeEventTarget);
              break a
            }
        handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
        "focusout" === domEventName && (handleEventFunc = reactName._wrapperState) && handleEventFunc.controlled &&
          "number" === reactName.type && setDefaultValue(reactName, "number", reactName.value)
      }
      handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
      switch (domEventName) {
        case "focusin":
          if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable) activeElement$1 = handleEventFunc, activeElementInst$1 = targetInst, lastSelection = null;
          break;
        case "focusout":
          lastSelection = activeElementInst$1 = activeElement$1 = null;
          break;
        case "mousedown":
          mouseDown = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          mouseDown = false;
          constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
          break;
        case "selectionchange":
          if (skipSelectionChangeEvent) break;
        case "keydown":
        case "keyup":
          constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget)
      }
      var fallbackData;
      if (canUseCompositionEvent) b: {
        switch (domEventName) {
          case "compositionstart":
            var eventType = "onCompositionStart";
            break b;
          case "compositionend":
            eventType = "onCompositionEnd";
            break b;
          case "compositionupdate":
            eventType = "onCompositionUpdate";
            break b
        }
        eventType = undefined
      } else isComposing ?
        isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
      eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst,
        eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(eventType, domEventName, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
          event: eventType,
          listeners: handleEventFunc
        }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
      if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent)) targetInst = accumulateTwoPhaseListeners(targetInst,
        "onBeforeInput"), 0 < targetInst.length && (nativeEventTarget = new SyntheticInputEvent("onBeforeInput", "beforeinput", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
          event: nativeEventTarget,
          listeners: targetInst
        }), nativeEventTarget.data = fallbackData)
    }
    processDispatchQueue(dispatchQueue, eventSystemFlags)
  })
}

function createDispatchListener(instance, listener, currentTarget) {
  return {
    instance: instance,
    listener: listener,
    currentTarget: currentTarget
  }
}

function accumulateTwoPhaseListeners(targetFiber, reactName) {
  for (var captureName =
    reactName + "Capture", listeners = []; null !== targetFiber;) {
    var _instance2 = targetFiber,
      stateNode = _instance2.stateNode;
    5 === _instance2.tag && null !== stateNode && (_instance2 = stateNode, stateNode = getListener(targetFiber, captureName), null != stateNode && listeners.unshift(createDispatchListener(targetFiber, stateNode, _instance2)), stateNode = getListener(targetFiber, reactName), null != stateNode && listeners.push(createDispatchListener(targetFiber, stateNode, _instance2)));
    targetFiber = targetFiber.return
  }
  return listeners
}

function getParent(inst) {
  if (null ===
    inst) return null;
  do inst = inst.return; while (inst && 5 !== inst.tag);
  return inst ? inst : null
}

function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
  for (var registrationName = event._reactName, listeners = []; null !== target && target !== common;) {
    var _instance3 = target,
      alternate = _instance3.alternate,
      stateNode = _instance3.stateNode;
    if (null !== alternate && alternate === common) break;
    5 === _instance3.tag && null !== stateNode && (_instance3 = stateNode, inCapturePhase ? (alternate = getListener(target,
      registrationName), null != alternate && listeners.unshift(createDispatchListener(target, alternate, _instance3))) : inCapturePhase || (alternate = getListener(target, registrationName), null != alternate && listeners.push(createDispatchListener(target, alternate, _instance3))));
    target = target.return
  }
  0 !== listeners.length && dispatchQueue.push({
    event: event,
    listeners: listeners
  })
}

function noop() { }

function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!props.autoFocus
  }
  return false
}

function shouldSetTextContent(type, props) {
  return "textarea" === type || "option" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html
}

function clearSuspenseBoundary(parentInstance, suspenseInstance) {
  var node = suspenseInstance,
    depth = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && 8 === nextNode.nodeType)
      if (node =
        nextNode.data, "/$" === node) {
        if (0 === depth) {
          parentInstance.removeChild(nextNode);
          retryIfBlockedOn(suspenseInstance);
          return
        }
        depth--
      } else "$" !== node && "$?" !== node && "$!" !== node || depth++;
    node = nextNode
  } while (node);
  retryIfBlockedOn(suspenseInstance)
}

function clearContainer(container) {
  1 === container.nodeType ? container.textContent = "" : 9 === container.nodeType && (container = container.body, null != container && (container.textContent = ""))
}

function getNextHydratable(node) {
  for (; null != node; node = node.nextSibling) {
    var nodeType =
      node.nodeType;
    if (1 === nodeType || 3 === nodeType) break;
    if (8 === nodeType && (nodeType = node.data, "$" === nodeType || "$!" === nodeType || "$?" === nodeType)) break
  }
  return node
}

function getParentSuspenseInstance(targetInstance) {
  targetInstance = targetInstance.previousSibling;
  for (var depth = 0; targetInstance;) {
    if (8 === targetInstance.nodeType) {
      var data = targetInstance.data;
      if ("$" === data || "$!" === data || "$?" === data) {
        if (0 === depth) return targetInstance;
        depth--
      } else "/$" === data && depth++
    }
    targetInstance = targetInstance.previousSibling
  }
  return null
}

function makeOpaqueHydratingObject(attemptToReadValue) {
  return {
    $$typeof: REACT_OPAQUE_ID_TYPE,
    toString: attemptToReadValue,
    valueOf: attemptToReadValue
  }
}

function getClosestInstanceFromNode(targetNode) {
  var targetInst = targetNode[internalInstanceKey];
  if (targetInst) return targetInst;
  for (var parentNode = targetNode.parentNode; parentNode;) {
    if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
      parentNode = targetInst.alternate;
      if (null !== targetInst.child || null !== parentNode && null !==
        parentNode.child)
        for (targetNode = getParentSuspenseInstance(targetNode); null !== targetNode;) {
          if (parentNode = targetNode[internalInstanceKey]) return parentNode;
          targetNode = getParentSuspenseInstance(targetNode)
        }
      return targetInst
    }
    targetNode = parentNode;
    parentNode = targetNode.parentNode
  }
  return null
}

function getInstanceFromNode(node) {
  node = node[internalInstanceKey] || node[internalContainerInstanceKey];
  return !node || 5 !== node.tag && 6 !== node.tag && 13 !== node.tag && 3 !== node.tag ? null : node
}

function getNodeFromInstance(inst) {
  if (5 ===
    inst.tag || 6 === inst.tag) return inst.stateNode;
  throw Error(formatProdErrorMessage(33));
}

function getFiberCurrentPropsFromNode(node) {
  return node[internalPropsKey] || null
}

function getEventListenerSet(node) {
  var elementListenerSet = node[internalEventHandlersKey];
  undefined === elementListenerSet && (elementListenerSet = node[internalEventHandlersKey] = new Set);
  return elementListenerSet
}

function createCursor(defaultValue) {
  return {
    current: defaultValue
  }
}

function pop(cursor, fiber) {
  0 > index || (cursor.current = valueStack[index],
    valueStack[index] = null, index--)
}

function push(cursor, value, fiber) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value
}

function getMaskedContext(workInProgress, unmaskedContext) {
  var contextTypes = workInProgress.type.contextTypes;
  if (!contextTypes) return emptyContextObject;
  var instance = workInProgress.stateNode;
  if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) return instance.__reactInternalMemoizedMaskedChildContext;
  var context = {},
    key;
  for (key in contextTypes) context[key] =
    unmaskedContext[key];
  instance && (workInProgress = workInProgress.stateNode, workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, workInProgress.__reactInternalMemoizedMaskedChildContext = context);
  return context
}

function isContextProvider(type) {
  type = type.childContextTypes;
  return null !== type && undefined !== type
}

function pushTopLevelContextObject(fiber, context, didChange) {
  if (contextStackCursor.current !== emptyContextObject) throw Error(formatProdErrorMessage(168));
  push(contextStackCursor, context);
  push(didPerformWorkStackCursor, didChange)
}

function processChildContext(fiber, type, parentContext) {
  var instance = fiber.stateNode;
  fiber = type.childContextTypes;
  if ("function" !== typeof instance.getChildContext) return parentContext;
  instance = instance.getChildContext();
  for (var contextKey in instance)
    if (!(contextKey in fiber)) throw Error(formatProdErrorMessage(108, getComponentName(type) || "Unknown", contextKey));
  return Object.assign({}, parentContext, instance)
}

function pushContextProvider(workInProgress) {
  workInProgress =
    (workInProgress = workInProgress.stateNode) && workInProgress.__reactInternalMemoizedMergedChildContext || emptyContextObject;
  previousContext = contextStackCursor.current;
  push(contextStackCursor, workInProgress);
  push(didPerformWorkStackCursor, didPerformWorkStackCursor.current);
  return true
}

function invalidateContextProvider(workInProgress, type, didChange) {
  var instance = workInProgress.stateNode;
  if (!instance) throw Error(formatProdErrorMessage(169));
  didChange ? (workInProgress = processChildContext(workInProgress, type,
    previousContext), instance.__reactInternalMemoizedMergedChildContext = workInProgress, pop(didPerformWorkStackCursor), pop(contextStackCursor), push(contextStackCursor, workInProgress)) : pop(didPerformWorkStackCursor);
  push(didPerformWorkStackCursor, didChange)
}

function getCurrentPriorityLevel() {
  switch (Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return 99;
    case Scheduler_UserBlockingPriority:
      return 98;
    case Scheduler_NormalPriority:
      return 97;
    case Scheduler_LowPriority:
      return 96;
    case Scheduler_IdlePriority:
      return 95;
    default:
      throw Error(formatProdErrorMessage(332));
  }
}

function reactPriorityToSchedulerPriority(reactPriorityLevel) {
  switch (reactPriorityLevel) {
    case 99:
      return Scheduler_ImmediatePriority;
    case 98:
      return Scheduler_UserBlockingPriority;
    case 97:
      return Scheduler_NormalPriority;
    case 96:
      return Scheduler_LowPriority;
    case 95:
      return Scheduler_IdlePriority;
    default:
      throw Error(formatProdErrorMessage(332));
  }
}

function runWithPriority$1(reactPriorityLevel, fn) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_runWithPriority(reactPriorityLevel, fn)
}

function scheduleCallback(reactPriorityLevel, callback, options) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_scheduleCallback(reactPriorityLevel, callback, options)
}

function flushSyncCallbackQueue() {
  if (null !== immediateQueueCallbackNode) {
    var node = immediateQueueCallbackNode;
    immediateQueueCallbackNode = null;
    Scheduler_cancelCallback(node)
  }
  flushSyncCallbackQueueImpl()
}

function flushSyncCallbackQueueImpl() {
  if (!isFlushingSyncQueue &&
    null !== syncQueue) {
    isFlushingSyncQueue = true;
    var i = 0;
    try {
      var queue = syncQueue;
      runWithPriority$1(99, function () {
        for (; i < queue.length; i++) {
          var callback = queue[i];
          do callback = callback(true); while (null !== callback)
        }
      });
      syncQueue = null
    } catch (error) {
      throw null !== syncQueue && (syncQueue = syncQueue.slice(i + 1)), Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueue), error;
    } finally {
      isFlushingSyncQueue = false
    }
  }
}

function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps =
      Object.assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component) undefined === baseProps[propName] && (baseProps[propName] = Component[propName]);
    return baseProps
  }
  return baseProps
}

function resetContextDependencies() {
  lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null
}

function popProvider(providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor);
  providerFiber.type._context._currentValue = currentValue
}

function scheduleWorkOnParentPath(parent, renderLanes) {
  for (; null !==
    parent;) {
    var alternate = parent.alternate;
    if ((parent.childLanes & renderLanes) === renderLanes)
      if (null === alternate || (alternate.childLanes & renderLanes) === renderLanes) break;
      else alternate.childLanes |= renderLanes;
    else parent.childLanes |= renderLanes, null !== alternate && (alternate.childLanes |= renderLanes);
    parent = parent.return
  }
}

function prepareToReadContext(workInProgress, renderLanes) {
  currentlyRenderingFiber = workInProgress;
  lastContextWithAllBitsObserved = lastContextDependency = null;
  workInProgress = workInProgress.dependencies;
  null !== workInProgress && null !== workInProgress.firstContext && (0 !== (workInProgress.lanes & renderLanes) && (didReceiveUpdate = true), workInProgress.firstContext = null)
}

function readContext(context, observedBits) {
  if (lastContextWithAllBitsObserved !== context && false !== observedBits && 0 !== observedBits) {
    if ("number" !== typeof observedBits || 1073741823 === observedBits) lastContextWithAllBitsObserved = context, observedBits = 1073741823;
    observedBits = {
      context: context,
      observedBits: observedBits,
      next: null
    };
    if (null === lastContextDependency) {
      if (null ===
        currentlyRenderingFiber) throw Error(formatProdErrorMessage(308));
      lastContextDependency = observedBits;
      currentlyRenderingFiber.dependencies = {
        lanes: 0,
        firstContext: observedBits,
        responders: null
      }
    } else lastContextDependency = lastContextDependency.next = observedBits
  }
  return context._currentValue
}

function initializeUpdateQueue(fiber) {
  fiber.updateQueue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null
    },
    effects: null
  }
}

function cloneUpdateQueue(current, workInProgress) {
  current =
    current.updateQueue;
  workInProgress.updateQueue === current && (workInProgress.updateQueue = {
    baseState: current.baseState,
    firstBaseUpdate: current.firstBaseUpdate,
    lastBaseUpdate: current.lastBaseUpdate,
    shared: current.shared,
    effects: current.effects
  })
}

function createUpdate(eventTime, lane) {
  return {
    eventTime: eventTime,
    lane: lane,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  }
}

function enqueueUpdate(fiber, update) {
  fiber = fiber.updateQueue;
  if (null !== fiber) {
    fiber = fiber.shared;
    var pending = fiber.pending;
    null === pending ? update.next =
      update : (update.next = pending.next, pending.next = update);
    fiber.pending = update
  }
}

function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
  var queue = workInProgress.updateQueue,
    current = workInProgress.alternate;
  if (null !== current && (current = current.updateQueue, queue === current)) {
    var newFirst = null,
      newLast = null;
    queue = queue.firstBaseUpdate;
    if (null !== queue) {
      do {
        var clone = {
          eventTime: queue.eventTime,
          lane: queue.lane,
          tag: queue.tag,
          payload: queue.payload,
          callback: queue.callback,
          next: null
        };
        null === newLast ? newFirst =
          newLast = clone : newLast = newLast.next = clone;
        queue = queue.next
      } while (null !== queue);
      null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate
    } else newFirst = newLast = capturedUpdate;
    queue = {
      baseState: current.baseState,
      firstBaseUpdate: newFirst,
      lastBaseUpdate: newLast,
      shared: current.shared,
      effects: current.effects
    };
    workInProgress.updateQueue = queue;
    return
  }
  workInProgress = queue.lastBaseUpdate;
  null === workInProgress ? queue.firstBaseUpdate = capturedUpdate : workInProgress.next = capturedUpdate;
  queue.lastBaseUpdate =
    capturedUpdate
}

function processUpdateQueue(workInProgress$jscomp$0, props, instance, renderLanes) {
  var queue = workInProgress$jscomp$0.updateQueue;
  hasForceUpdate = false;
  var firstBaseUpdate = queue.firstBaseUpdate,
    lastBaseUpdate = queue.lastBaseUpdate,
    pendingQueue = queue.shared.pending;
  if (null !== pendingQueue) {
    queue.shared.pending = null;
    var lastPendingUpdate = pendingQueue,
      firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next =
      firstPendingUpdate;
    lastBaseUpdate = lastPendingUpdate;
    var current = workInProgress$jscomp$0.alternate;
    if (null !== current) {
      current = current.updateQueue;
      var currentLastBaseUpdate = current.lastBaseUpdate;
      currentLastBaseUpdate !== lastBaseUpdate && (null === currentLastBaseUpdate ? current.firstBaseUpdate = firstPendingUpdate : currentLastBaseUpdate.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate)
    }
  }
  if (null !== firstBaseUpdate) {
    currentLastBaseUpdate = queue.baseState;
    lastBaseUpdate = 0;
    current = firstPendingUpdate =
      lastPendingUpdate = null;
    do {
      pendingQueue = firstBaseUpdate.lane;
      var updateEventTime = firstBaseUpdate.eventTime;
      if ((renderLanes & pendingQueue) === pendingQueue) {
        null !== current && (current = current.next = {
          eventTime: updateEventTime,
          lane: 0,
          tag: firstBaseUpdate.tag,
          payload: firstBaseUpdate.payload,
          callback: firstBaseUpdate.callback,
          next: null
        });
        a: {
          var workInProgress = workInProgress$jscomp$0,
            update = firstBaseUpdate;
          pendingQueue = props;
          updateEventTime = instance;
          switch (update.tag) {
            case 1:
              workInProgress = update.payload;
              if ("function" ===
                typeof workInProgress) {
                currentLastBaseUpdate = workInProgress.call(updateEventTime, currentLastBaseUpdate, pendingQueue);
                break a
              }
              currentLastBaseUpdate = workInProgress;
              break a;
            case 3:
              workInProgress.flags = workInProgress.flags & -4097 | 64;
            case 0:
              workInProgress = update.payload;
              pendingQueue = "function" === typeof workInProgress ? workInProgress.call(updateEventTime, currentLastBaseUpdate, pendingQueue) : workInProgress;
              if (null === pendingQueue || undefined === pendingQueue) break a;
              currentLastBaseUpdate = Object.assign({}, currentLastBaseUpdate,
                pendingQueue);
              break a;
            case 2:
              hasForceUpdate = true
          }
        }
        null !== firstBaseUpdate.callback && (workInProgress$jscomp$0.flags |= 32, pendingQueue = queue.effects, null === pendingQueue ? queue.effects = [firstBaseUpdate] : pendingQueue.push(firstBaseUpdate))
      } else updateEventTime = {
        eventTime: updateEventTime,
        lane: pendingQueue,
        tag: firstBaseUpdate.tag,
        payload: firstBaseUpdate.payload,
        callback: firstBaseUpdate.callback,
        next: null
      }, null === current ? (firstPendingUpdate = current = updateEventTime, lastPendingUpdate = currentLastBaseUpdate) : current =
        current.next = updateEventTime, lastBaseUpdate |= pendingQueue;
      firstBaseUpdate = firstBaseUpdate.next;
      if (null === firstBaseUpdate)
        if (pendingQueue = queue.shared.pending, null === pendingQueue) break;
        else firstBaseUpdate = pendingQueue.next, pendingQueue.next = null, queue.lastBaseUpdate = pendingQueue, queue.shared.pending = null
    } while (1);
    null === current && (lastPendingUpdate = currentLastBaseUpdate);
    queue.baseState = lastPendingUpdate;
    queue.firstBaseUpdate = firstPendingUpdate;
    queue.lastBaseUpdate = current;
    workInProgressRootSkippedLanes |=
      lastBaseUpdate;
    workInProgress$jscomp$0.lanes = lastBaseUpdate;
    workInProgress$jscomp$0.memoizedState = currentLastBaseUpdate
  }
}

function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  finishedWork = finishedQueue.effects;
  finishedQueue.effects = null;
  if (null !== finishedWork)
    for (finishedQueue = 0; finishedQueue < finishedWork.length; finishedQueue++) {
      var effect = finishedWork[finishedQueue],
        callback = effect.callback;
      if (null !== callback) {
        effect.callback = null;
        effect = instance;
        if ("function" !== typeof callback) throw Error(formatProdErrorMessage(191,
          callback));
        callback.call(effect)
      }
    }
}

function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
  ctor = workInProgress.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps = null === getDerivedStateFromProps || undefined === getDerivedStateFromProps ? ctor : Object.assign({}, ctor, getDerivedStateFromProps);
  workInProgress.memoizedState = getDerivedStateFromProps;
  0 === workInProgress.lanes && (workInProgress.updateQueue.baseState = getDerivedStateFromProps)
}

function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
  workInProgress = workInProgress.stateNode;
  return "function" === typeof workInProgress.shouldComponentUpdate ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true
}

function constructClassInstance(workInProgress, ctor, props) {
  var isLegacyContextConsumer = false,
    unmaskedContext =
      emptyContextObject;
  var context = ctor.contextType;
  "object" === typeof context && null !== context ? context = readContext(context) : (unmaskedContext = isContextProvider(ctor) ? previousContext : contextStackCursor.current, isLegacyContextConsumer = ctor.contextTypes, context = (isLegacyContextConsumer = null !== isLegacyContextConsumer && undefined !== isLegacyContextConsumer) ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject);
  ctor = new ctor(props, context);
  workInProgress.memoizedState = null !== ctor.state && undefined !== ctor.state ?
    ctor.state : null;
  ctor.updater = classComponentUpdater;
  workInProgress.stateNode = ctor;
  ctor._reactInternals = workInProgress;
  isLegacyContextConsumer && (workInProgress = workInProgress.stateNode, workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, workInProgress.__reactInternalMemoizedMaskedChildContext = context);
  return ctor
}

function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
  workInProgress = instance.state;
  "function" === typeof instance.componentWillReceiveProps &&
    instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, null)
}

function mountClassInstance(workInProgress, ctor, newProps, renderLanes) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  initializeUpdateQueue(workInProgress);
  var contextType = ctor.contextType;
  "object" === typeof contextType && null !== contextType ? instance.context = readContext(contextType) : (contextType = isContextProvider(ctor) ? previousContext : contextStackCursor.current, instance.context = getMaskedContext(workInProgress, contextType));
  processUpdateQueue(workInProgress, newProps, instance, renderLanes);
  instance.state = workInProgress.memoizedState;
  contextType = ctor.getDerivedStateFromProps;
  "function" === typeof contextType && (applyDerivedStateFromProps(workInProgress, ctor, contextType,
    newProps), instance.state = workInProgress.memoizedState);
  "function" === typeof ctor.getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || (ctor = instance.state, "function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount(), ctor !== instance.state && classComponentUpdater.enqueueReplaceState(instance,
    instance.state, null), processUpdateQueue(workInProgress, newProps, instance, renderLanes), instance.state = workInProgress.memoizedState);
  "function" === typeof instance.componentDidMount && (workInProgress.flags |= 4)
}

function coerceRef(returnFiber, current, element) {
  returnFiber = element.ref;
  if (null !== returnFiber && "function" !== typeof returnFiber && "object" !== typeof returnFiber) {
    if (element._owner) {
      element = element._owner;
      if (element) {
        if (1 !== element.tag) throw Error(formatProdErrorMessage(309));
        var inst = element.stateNode
      }
      if (!inst) throw Error(formatProdErrorMessage(147,
        returnFiber));
      var stringRef = "" + returnFiber;
      if (null !== current && null !== current.ref && "function" === typeof current.ref && current.ref._stringRef === stringRef) return current.ref;
      current = function (value) {
        var refs = inst.refs;
        refs === emptyRefsObject && (refs = inst.refs = {});
        null === value ? delete refs[stringRef] : refs[stringRef] = value
      };
      current._stringRef = stringRef;
      return current
    }
    if ("string" !== typeof returnFiber) throw Error(formatProdErrorMessage(284));
    if (!element._owner) throw Error(formatProdErrorMessage(290, returnFiber));
  }
  return returnFiber
}

function throwOnInvalidObjectType(returnFiber, newChild) {
  if ("textarea" !== returnFiber.type) throw Error(formatProdErrorMessage(31, "[object Object]" === Object.prototype.toString.call(newChild) ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : newChild));
}

function resolveLazyType(lazyComponent) {
  try {
    var init = lazyComponent._init;
    return init(lazyComponent._payload)
  } catch (x) {
    return lazyComponent
  }
}

function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var last =
        returnFiber.lastEffect;
      null !== last ? (last.nextEffect = childToDelete, returnFiber.lastEffect = childToDelete) : returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
      childToDelete.nextEffect = null;
      childToDelete.flags = 8
    }
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild;) deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
    return null
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    for (returnFiber =
      new Map; null !== currentFirstChild;) null !== currentFirstChild.key ? returnFiber.set(currentFirstChild.key, currentFirstChild) : returnFiber.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
    return returnFiber
  }

  function useFiber(fiber, pendingProps) {
    fiber = createWorkInProgress(fiber, pendingProps);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber
  }

  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) return lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex) return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags = 2, lastPlacedIndex) : newIndex;
    newFiber.flags = 2;
    return lastPlacedIndex
  }

  function placeSingleChild(newFiber) {
    shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags = 2);
    return newFiber
  }

  function updateTextNode(returnFiber, current, textContent, lanes) {
    if (null === current || 6 !== current.tag) return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber,
      current;
    current = useFiber(current, textContent);
    current.return = returnFiber;
    return current
  }

  function updateElement(returnFiber, current, element, lanes) {
    if (null !== current) {
      if (current.elementType === element.type) {
        var existing = useFiber(current, element.props);
        existing.ref = coerceRef(returnFiber, current, element);
        existing.return = returnFiber;
        return existing
      }
      if (22 === current.tag && (existing = element.type, existing.$$typeof === REACT_LAZY_TYPE && (existing = resolveLazyType(existing)), existing.$$typeof === REACT_BLOCK_TYPE &&
        existing._render === current.type._render)) return current = useFiber(current, element.props), current.return = returnFiber, current.type = existing, current
    }
    existing = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, lanes);
    existing.ref = coerceRef(returnFiber, current, element);
    existing.return = returnFiber;
    return existing
  }

  function updatePortal(returnFiber, current, portal, lanes) {
    if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !==
      portal.implementation) return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
    current = useFiber(current, portal.children || []);
    current.return = returnFiber;
    return current
  }

  function updateFragment(returnFiber, current, fragment, lanes, key) {
    if (null === current || 7 !== current.tag) return current = createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current;
    current = useFiber(current, fragment);
    current.return = returnFiber;
    return current
  }

  function createChild(returnFiber,
    newChild, lanes) {
    if ("string" === typeof newChild || "number" === typeof newChild) return newChild = createFiberFromText("" + newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), lanes.ref = coerceRef(returnFiber, null, newChild), lanes.return = returnFiber, lanes;
        case REACT_PORTAL_TYPE:
          return newChild =
            createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          return createChild(returnFiber, init(newChild._payload), lanes)
      }
      if (isArray(newChild) || getIteratorFn(newChild)) return newChild = createFiberFromFragment(newChild, returnFiber.mode, lanes, null), newChild.return = returnFiber, newChild;
      throwOnInvalidObjectType(returnFiber, newChild)
    }
    return null
  }

  function updateSlot(returnFiber, oldFiber, newChild, lanes) {
    var key = null !== oldFiber ? oldFiber.key :
      null;
    if ("string" === typeof newChild || "number" === typeof newChild) return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key ? newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, oldFiber, newChild.props.children, lanes, key) : updateElement(returnFiber, oldFiber, newChild, lanes) : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key ? updatePortal(returnFiber,
            oldFiber, newChild, lanes) : null;
        case REACT_LAZY_TYPE:
          return key = newChild._init, updateSlot(returnFiber, oldFiber, key(newChild._payload), lanes)
      }
      if (isArray(newChild) || getIteratorFn(newChild)) return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
      throwOnInvalidObjectType(returnFiber, newChild)
    }
    return null
  }

  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
    if ("string" === typeof newChild || "number" === typeof newChild) return existingChildren = existingChildren.get(newIdx) ||
      null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, existingChildren, newChild.props.children, lanes, newChild.key) : updateElement(returnFiber, existingChildren, newChild, lanes);
        case REACT_PORTAL_TYPE:
          return existingChildren = existingChildren.get(null ===
            newChild.key ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          return updateFromMap(existingChildren, returnFiber, newIdx, init(newChild._payload), lanes)
      }
      if (isArray(newChild) || getIteratorFn(newChild)) return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
      throwOnInvalidObjectType(returnFiber, newChild)
    }
    return null
  }

  function reconcileChildrenArray(returnFiber,
    currentFirstChild, newChildren, lanes) {
    for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break
      }
      shouldTrackSideEffects && oldFiber && null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber
    }
    if (newIdx === newChildren.length) return deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild;
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++) oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(oldFiber,
        currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
      return resultingFirstChild
    }
    for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); newIdx < newChildren.length; newIdx++) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(null === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber,
      currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
    shouldTrackSideEffects && oldFiber.forEach(function (child) {
      return deleteChild(returnFiber, child)
    });
    return resultingFirstChild
  }

  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, lanes) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    if ("function" !== typeof iteratorFn) throw Error(formatProdErrorMessage(150));
    newChildrenIterable =
      iteratorFn.call(newChildrenIterable);
    if (null == newChildrenIterable) throw Error(formatProdErrorMessage(151));
    for (var previousNewFiber = iteratorFn = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildrenIterable.next(); null !== oldFiber && !step.done; newIdx++, step = newChildrenIterable.next()) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
      if (null === newFiber) {
        null ===
          oldFiber && (oldFiber = nextOldFiber);
        break
      }
      shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber ? iteratorFn = newFiber : previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber
    }
    if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildrenIterable.next()) step = createChild(returnFiber,
        step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
      return iteratorFn
    }
    for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); !step.done; newIdx++, step = newChildrenIterable.next()) step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild =
      placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
    shouldTrackSideEffects && oldFiber.forEach(function (child) {
      return deleteChild(returnFiber, child)
    });
    return iteratorFn
  }

  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, lanes) {
    var isUnkeyedTopLevelFragment = "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key;
    isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
    var isObject = "object" === typeof newChild && null !== newChild;
    if (isObject) switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        a: {
          isObject = newChild.key;
          for (isUnkeyedTopLevelFragment = currentFirstChild; null !== isUnkeyedTopLevelFragment;) {
            if (isUnkeyedTopLevelFragment.key === isObject) {
              switch (isUnkeyedTopLevelFragment.tag) {
                case 7:
                  if (newChild.type === REACT_FRAGMENT_TYPE) {
                    deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment.sibling);
                    currentFirstChild = useFiber(isUnkeyedTopLevelFragment, newChild.props.children);
                    currentFirstChild.return = returnFiber;
                    returnFiber = currentFirstChild;
                    break a
                  }
                  break;
                case 22:
                  if (isObject = newChild.type, isObject.$$typeof === REACT_LAZY_TYPE && (isObject = resolveLazyType(isObject)), isObject.$$typeof === REACT_BLOCK_TYPE && isObject._render === isUnkeyedTopLevelFragment.type._render) {
                    deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment.sibling);
                    currentFirstChild = useFiber(isUnkeyedTopLevelFragment, newChild.props);
                    currentFirstChild.type = isObject;
                    currentFirstChild.return = returnFiber;
                    returnFiber =
                      currentFirstChild;
                    break a
                  }
                default:
                  if (isUnkeyedTopLevelFragment.elementType === newChild.type) {
                    deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment.sibling);
                    currentFirstChild = useFiber(isUnkeyedTopLevelFragment, newChild.props);
                    currentFirstChild.ref = coerceRef(returnFiber, isUnkeyedTopLevelFragment, newChild);
                    currentFirstChild.return = returnFiber;
                    returnFiber = currentFirstChild;
                    break a
                  }
              }
              deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment);
              break
            } else deleteChild(returnFiber, isUnkeyedTopLevelFragment);
            isUnkeyedTopLevelFragment = isUnkeyedTopLevelFragment.sibling
          }
          newChild.type === REACT_FRAGMENT_TYPE ? (currentFirstChild = createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), lanes.ref = coerceRef(returnFiber, currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes)
        }
        return placeSingleChild(returnFiber);
      case REACT_PORTAL_TYPE:
        a: {
          for (isUnkeyedTopLevelFragment = newChild.key; null !== currentFirstChild;) {
            if (currentFirstChild.key === isUnkeyedTopLevelFragment)
              if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                currentFirstChild = useFiber(currentFirstChild, newChild.children || []);
                currentFirstChild.return = returnFiber;
                returnFiber = currentFirstChild;
                break a
              } else {
                deleteRemainingChildren(returnFiber, currentFirstChild);
                break
              } else deleteChild(returnFiber, currentFirstChild);
            currentFirstChild = currentFirstChild.sibling
          }
          currentFirstChild = createFiberFromPortal(newChild, returnFiber.mode, lanes);
          currentFirstChild.return = returnFiber;
          returnFiber = currentFirstChild
        }
        return placeSingleChild(returnFiber);
      case REACT_LAZY_TYPE:
        return isUnkeyedTopLevelFragment = newChild._init, reconcileChildFibers(returnFiber, currentFirstChild, isUnkeyedTopLevelFragment(newChild._payload),
          lanes)
    }
    if ("string" === typeof newChild || "number" === typeof newChild) return newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), currentFirstChild = useFiber(currentFirstChild, newChild), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (deleteRemainingChildren(returnFiber, currentFirstChild), currentFirstChild = createFiberFromText(newChild, returnFiber.mode, lanes), currentFirstChild.return = returnFiber, returnFiber =
      currentFirstChild), placeSingleChild(returnFiber);
    if (isArray(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
    if (getIteratorFn(newChild)) return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
    isObject && throwOnInvalidObjectType(returnFiber, newChild);
    if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment) switch (returnFiber.tag) {
      case 1:
      case 22:
      case 0:
      case 11:
      case 15:
        throw Error(formatProdErrorMessage(152, getComponentName(returnFiber.type) ||
          "Component"));
    }
    return deleteRemainingChildren(returnFiber, currentFirstChild)
  }
  return reconcileChildFibers
}

function requiredContext(c) {
  if (c === NO_CONTEXT) throw Error(formatProdErrorMessage(174));
  return c
}

function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance);
  push(contextFiberStackCursor, fiber);
  push(contextStackCursor$1, NO_CONTEXT);
  fiber = nextRootInstance.nodeType;
  switch (fiber) {
    case 9:
    case 11:
      nextRootInstance = (nextRootInstance = nextRootInstance.documentElement) ?
        nextRootInstance.namespaceURI : getChildNamespace(null, "");
      break;
    default:
      fiber = 8 === fiber ? nextRootInstance.parentNode : nextRootInstance, nextRootInstance = fiber.namespaceURI || null, fiber = fiber.tagName, nextRootInstance = getChildNamespace(nextRootInstance, fiber)
  }
  pop(contextStackCursor$1);
  push(contextStackCursor$1, nextRootInstance)
}

function popHostContainer(fiber) {
  pop(contextStackCursor$1);
  pop(contextFiberStackCursor);
  pop(rootInstanceStackCursor)
}

function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  var context = requiredContext(contextStackCursor$1.current);
  var JSCompiler_inline_result = getChildNamespace(context, fiber.type);
  context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor$1, JSCompiler_inline_result))
}

function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber && (pop(contextStackCursor$1), pop(contextFiberStackCursor))
}

function findFirstSuspended(row) {
  for (var node = row; null !== node;) {
    if (13 === node.tag) {
      var state = node.memoizedState;
      if (null !==
        state && (state = state.dehydrated, null === state || "$?" === state.data || "$!" === state.data)) return node
    } else if (19 === node.tag && undefined !== node.memoizedProps.revealOrder) {
      if (0 !== (node.flags & 64)) return node
    } else if (null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue
    }
    if (node === row) break;
    for (; null === node.sibling;) {
      if (null === node.return || node.return === row) return null;
      node = node.return
    }
    node.sibling.return = node.return;
    node = node.sibling
  }
  return null
}

function deleteHydratableInstance(returnFiber, instance) {
  var fiber =
    createFiber(5, null, null, 0);
  fiber.elementType = "DELETED";
  fiber.type = "DELETED";
  fiber.stateNode = instance;
  fiber.return = returnFiber;
  fiber.flags = 8;
  null !== returnFiber.lastEffect ? (returnFiber.lastEffect.nextEffect = fiber, returnFiber.lastEffect = fiber) : returnFiber.firstEffect = returnFiber.lastEffect = fiber
}

function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case 5:
      var type = fiber.type;
      nextInstance = 1 !== nextInstance.nodeType || type.toLowerCase() !== nextInstance.nodeName.toLowerCase() ? null : nextInstance;
      return null !==
        nextInstance ? (fiber.stateNode = nextInstance, true) : false;
    case 6:
      return nextInstance = "" === fiber.pendingProps || 3 !== nextInstance.nodeType ? null : nextInstance, null !== nextInstance ? (fiber.stateNode = nextInstance, true) : false;
    case 13:
      return nextInstance = 8 !== nextInstance.nodeType ? null : nextInstance, null !== nextInstance ? (fiber.memoizedState = {
        dehydrated: nextInstance,
        retryLane: 1073741824
      }, type = createFiber(18, null, null, 0), type.stateNode = nextInstance, type.return = fiber, fiber.child = type, true) : false;
    default:
      return false
  }
}

function tryToClaimNextHydratableInstance(fiber) {
  if (isHydrating) {
    var nextInstance =
      nextHydratableInstance;
    if (nextInstance) {
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber, nextInstance)) {
        nextInstance = getNextHydratable(firstAttemptedInstance.nextSibling);
        if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
          fiber.flags = fiber.flags & -1025 | 2;
          isHydrating = false;
          hydrationParentFiber = fiber;
          return
        }
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance)
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getNextHydratable(nextInstance.firstChild)
    } else fiber.flags = fiber.flags &
      -1025 | 2, isHydrating = false, hydrationParentFiber = fiber
  }
}

function popToNextHostParent(fiber) {
  for (fiber = fiber.return; null !== fiber && 5 !== fiber.tag && 3 !== fiber.tag && 13 !== fiber.tag;) fiber = fiber.return;
  hydrationParentFiber = fiber
}

function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return false;
  if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
  var type = fiber.type;
  if (5 !== fiber.tag || "head" !== type && "body" !== type && !shouldSetTextContent(type, fiber.memoizedProps))
    for (type = nextHydratableInstance; type;) deleteHydratableInstance(fiber,
      type), type = getNextHydratable(type.nextSibling);
  popToNextHostParent(fiber);
  if (13 === fiber.tag) {
    fiber = fiber.memoizedState;
    fiber = null !== fiber ? fiber.dehydrated : null;
    if (!fiber) throw Error(formatProdErrorMessage(317));
    a: {
      fiber = fiber.nextSibling;
      for (type = 0; fiber;) {
        if (8 === fiber.nodeType) {
          var data = fiber.data;
          if ("/$" === data) {
            if (0 === type) {
              nextHydratableInstance = getNextHydratable(fiber.nextSibling);
              break a
            }
            type--
          } else "$" !== data && "$!" !== data && "$?" !== data || type++
        }
        fiber = fiber.nextSibling
      }
      nextHydratableInstance = null
    }
  } else nextHydratableInstance =
    hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
  return true
}

function resetHydrationState() {
  nextHydratableInstance = hydrationParentFiber = null;
  isHydrating = false
}

function resetWorkInProgressVersions() {
  for (var i = 0; i < workInProgressSources.length; i++) workInProgressSources[i]._workInProgressVersionPrimary = null;
  workInProgressSources.length = 0
}

function throwInvalidHookError() {
  throw Error(formatProdErrorMessage(321));
}

function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return false;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
    if (!objectIs(nextDeps[i], prevDeps[i])) return false;
  return true
}

function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber$1 = workInProgress;
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = 0;
  ReactCurrentDispatcher$1.current = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  current = Component(props,
    secondArg);
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    nextRenderLanes = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      if (!(25 > nextRenderLanes)) throw Error(formatProdErrorMessage(301));
      nextRenderLanes += 1;
      workInProgressHook = currentHook = null;
      workInProgress.updateQueue = null;
      ReactCurrentDispatcher$1.current = HooksDispatcherOnRerender;
      current = Component(props, secondArg)
    } while (didScheduleRenderPhaseUpdateDuringThisPass)
  }
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  workInProgress = null !== currentHook &&
    null !== currentHook.next;
  renderLanes = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
  didScheduleRenderPhaseUpdate = false;
  if (workInProgress) throw Error(formatProdErrorMessage(300));
  return current
}

function bailoutHooks(current, workInProgress, lanes) {
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.flags &= -517;
  current.lanes &= ~lanes
}

function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === workInProgressHook ? currentlyRenderingFiber$1.memoizedState =
    workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
  return workInProgressHook
}

function updateWorkInProgressHook() {
  if (null === currentHook) {
    var nextCurrentHook = currentlyRenderingFiber$1.alternate;
    nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null
  } else nextCurrentHook = currentHook.next;
  var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber$1.memoizedState : workInProgressHook.next;
  if (null !== nextWorkInProgressHook) workInProgressHook = nextWorkInProgressHook,
    currentHook = nextCurrentHook;
  else {
    if (null === nextCurrentHook) throw Error(formatProdErrorMessage(310));
    currentHook = nextCurrentHook;
    nextCurrentHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null
    };
    null === workInProgressHook ? currentlyRenderingFiber$1.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook
  }
  return workInProgressHook
}

function basicStateReducer(state,
  action) {
  return "function" === typeof action ? action(state) : action
}

function updateReducer(reducer, initialArg, init) {
  initialArg = updateWorkInProgressHook();
  init = initialArg.queue;
  if (null === init) throw Error(formatProdErrorMessage(311));
  init.lastRenderedReducer = reducer;
  var current = currentHook,
    baseQueue = current.baseQueue,
    pendingQueue = init.pending;
  if (null !== pendingQueue) {
    if (null !== baseQueue) {
      var baseFirst = baseQueue.next;
      baseQueue.next = pendingQueue.next;
      pendingQueue.next = baseFirst
    }
    current.baseQueue = baseQueue = pendingQueue;
    init.pending = null
  }
  if (null !== baseQueue) {
    baseQueue = baseQueue.next;
    current = current.baseState;
    var newBaseQueueLast = baseFirst = pendingQueue = null,
      update = baseQueue;
    do {
      var updateLane = update.lane;
      if ((renderLanes & updateLane) === updateLane) null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
        lane: 0,
        action: update.action,
        eagerReducer: update.eagerReducer,
        eagerState: update.eagerState,
        next: null
      }), current = update.eagerReducer === reducer ? update.eagerState : reducer(current, update.action);
      else {
        var clone = {
          lane: updateLane,
          action: update.action,
          eagerReducer: update.eagerReducer,
          eagerState: update.eagerState,
          next: null
        };
        null === newBaseQueueLast ? (baseFirst = newBaseQueueLast = clone, pendingQueue = current) : newBaseQueueLast = newBaseQueueLast.next = clone;
        currentlyRenderingFiber$1.lanes |= updateLane;
        workInProgressRootSkippedLanes |= updateLane
      }
      update = update.next
    } while (null !== update && update !== baseQueue);
    null === newBaseQueueLast ? pendingQueue = current : newBaseQueueLast.next = baseFirst;
    objectIs(current, initialArg.memoizedState) || (didReceiveUpdate = true);
    initialArg.memoizedState = current;
    initialArg.baseState = pendingQueue;
    initialArg.baseQueue = newBaseQueueLast;
    init.lastRenderedState = current
  }
  return [initialArg.memoizedState, init.dispatch]
}

function rerenderReducer(reducer, initialArg, init) {
  initialArg = updateWorkInProgressHook();
  init = initialArg.queue;
  if (null === init) throw Error(formatProdErrorMessage(311));
  init.lastRenderedReducer = reducer;
  var dispatch = init.dispatch,
    lastRenderPhaseUpdate = init.pending,
    newState = initialArg.memoizedState;
  if (null !== lastRenderPhaseUpdate) {
    init.pending =
      null;
    var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
    do newState = reducer(newState, update.action), update = update.next; while (update !== lastRenderPhaseUpdate);
    objectIs(newState, initialArg.memoizedState) || (didReceiveUpdate = true);
    initialArg.memoizedState = newState;
    null === initialArg.baseQueue && (initialArg.baseState = newState);
    init.lastRenderedState = newState
  }
  return [newState, dispatch]
}

function readFromUnsubcribedMutableSource(root, source, getSnapshot) {
  var getVersion = source._getVersion;
  getVersion = getVersion(source._source);
  var JSCompiler_inline_result = source._workInProgressVersionPrimary;
  if (null !== JSCompiler_inline_result) root = JSCompiler_inline_result === getVersion;
  else if (root = root.mutableReadLanes, root = (renderLanes & root) === root) source._workInProgressVersionPrimary = getVersion, workInProgressSources.push(source);
  if (root) return getSnapshot(source._source);
  workInProgressSources.push(source);
  throw Error(formatProdErrorMessage(350));
}

function useMutableSource(hook, source, getSnapshot, subscribe) {
  var root = workInProgressRoot;
  if (null === root) throw Error(formatProdErrorMessage(349));
  var getVersion = source._getVersion,
    version = getVersion(source._source),
    dispatcher = ReactCurrentDispatcher$1.current,
    _dispatcher$useState = dispatcher.useState(function () {
      return readFromUnsubcribedMutableSource(root, source, getSnapshot)
    }),
    setSnapshot = _dispatcher$useState[1],
    snapshot = _dispatcher$useState[0];
  _dispatcher$useState = workInProgressHook;
  var memoizedState = hook.memoizedState,
    refs = memoizedState.refs,
    prevGetSnapshot = refs.getSnapshot,
    prevSource =
      memoizedState.source;
  memoizedState = memoizedState.subscribe;
  var fiber = currentlyRenderingFiber$1;
  hook.memoizedState = {
    refs: refs,
    source: source,
    subscribe: subscribe
  };
  dispatcher.useEffect(function () {
    refs.getSnapshot = getSnapshot;
    refs.setSnapshot = setSnapshot;
    var maybeNewVersion = getVersion(source._source);
    if (!objectIs(version, maybeNewVersion)) {
      maybeNewVersion = getSnapshot(source._source);
      objectIs(snapshot, maybeNewVersion) || (setSnapshot(maybeNewVersion), maybeNewVersion = requestUpdateLane(fiber), root.mutableReadLanes |=
        maybeNewVersion & root.pendingLanes);
      maybeNewVersion = root.mutableReadLanes;
      root.entangledLanes |= maybeNewVersion;
      for (var entanglements = root.entanglements, lanes = maybeNewVersion; 0 < lanes;) {
        var index$22 = 31 - clz32(lanes),
          lane = 1 << index$22;
        entanglements[index$22] |= maybeNewVersion;
        lanes &= ~lane
      }
    }
  }, [getSnapshot, source, subscribe]);
  dispatcher.useEffect(function () {
    return subscribe(source._source, function () {
      var latestGetSnapshot = refs.getSnapshot,
        latestSetSnapshot = refs.setSnapshot;
      try {
        latestSetSnapshot(latestGetSnapshot(source._source));
        var lane = requestUpdateLane(fiber);
        root.mutableReadLanes |= lane & root.pendingLanes
      } catch (error) {
        latestSetSnapshot(function () {
          throw error;
        })
      }
    })
  }, [source, subscribe]);
  objectIs(prevGetSnapshot, getSnapshot) && objectIs(prevSource, source) && objectIs(memoizedState, subscribe) || (hook = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: snapshot
  }, hook.dispatch = setSnapshot = dispatchAction.bind(null, currentlyRenderingFiber$1, hook), _dispatcher$useState.queue = hook, _dispatcher$useState.baseQueue =
    null, snapshot = readFromUnsubcribedMutableSource(root, source, getSnapshot), _dispatcher$useState.memoizedState = _dispatcher$useState.baseState = snapshot);
  return snapshot
}

function updateMutableSource(source, getSnapshot, subscribe) {
  var hook = updateWorkInProgressHook();
  return useMutableSource(hook, source, getSnapshot, subscribe)
}

function mountState(initialState) {
  var hook = mountWorkInProgressHook();
  "function" === typeof initialState && (initialState = initialState());
  hook.memoizedState = hook.baseState = initialState;
  initialState =
    hook.queue = {
      pending: null,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: initialState
    };
  initialState = initialState.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, initialState);
  return [hook.memoizedState, initialState]
}

function pushEffect(tag, create, destroy, deps) {
  tag = {
    tag: tag,
    create: create,
    destroy: destroy,
    deps: deps,
    next: null
  };
  create = currentlyRenderingFiber$1.updateQueue;
  null === create ? (create = {
    lastEffect: null
  }, currentlyRenderingFiber$1.updateQueue = create, create.lastEffect =
    tag.next = tag) : (destroy = create.lastEffect, null === destroy ? create.lastEffect = tag.next = tag : (deps = destroy.next, destroy.next = tag, tag.next = deps, create.lastEffect = tag));
  return tag
}

function mountRef(initialValue) {
  var hook = mountWorkInProgressHook();
  initialValue = {
    current: initialValue
  };
  return hook.memoizedState = initialValue
}

function updateRef(initialValue) {
  return updateWorkInProgressHook().memoizedState
}

function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = mountWorkInProgressHook();
  currentlyRenderingFiber$1.flags |=
    fiberFlags;
  hook.memoizedState = pushEffect(1 | hookFlags, create, undefined, undefined === deps ? null : deps)
}

function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = undefined === deps ? null : deps;
  var destroy = undefined;
  if (null !== currentHook) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
      pushEffect(hookFlags, create, destroy, deps);
      return
    }
  }
  currentlyRenderingFiber$1.flags |= fiberFlags;
  hook.memoizedState = pushEffect(1 |
    hookFlags, create, destroy, deps)
}

function mountEffect(create, deps) {
  return mountEffectImpl(516, 4, create, deps)
}

function updateEffect(create, deps) {
  return updateEffectImpl(516, 4, create, deps)
}

function updateLayoutEffect(create, deps) {
  return updateEffectImpl(4, 2, create, deps)
}

function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref) return create = create(), ref(create),
    function () {
      ref(null)
    };
  if (null !== ref && undefined !== ref) return create = create(), ref.current = create,
    function () {
      ref.current = null
    }
}

function updateImperativeHandle(ref,
  create, deps) {
  deps = null !== deps && undefined !== deps ? deps.concat([ref]) : null;
  return updateEffectImpl(4, 2, imperativeHandleEffect.bind(null, create, ref), deps)
}

function mountDebugValue(value, formatterFn) { }

function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  deps = undefined === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (null !== prevState && null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
  hook.memoizedState = [callback, deps];
  return callback
}

function updateMemo(nextCreate,
  deps) {
  var hook = updateWorkInProgressHook();
  deps = undefined === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (null !== prevState && null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
  nextCreate = nextCreate();
  hook.memoizedState = [nextCreate, deps];
  return nextCreate
}

function startTransition(setPending, callback) {
  var priorityLevel = getCurrentPriorityLevel();
  runWithPriority$1(98 > priorityLevel ? 98 : priorityLevel, function () {
    setPending(true)
  });
  runWithPriority$1(97 < priorityLevel ? 97 : priorityLevel, function () {
    var prevTransition =
      ReactCurrentBatchConfig$1.transition;
    ReactCurrentBatchConfig$1.transition = 1;
    try {
      setPending(false), callback()
    } finally {
      ReactCurrentBatchConfig$1.transition = prevTransition
    }
  })
}

function dispatchAction(fiber, queue, action) {
  var eventTime = requestEventTime(),
    lane = requestUpdateLane(fiber),
    update = {
      lane: lane,
      action: action,
      eagerReducer: null,
      eagerState: null,
      next: null
    },
    pending = queue.pending;
  null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
  queue.pending = update;
  pending = fiber.alternate;
  if (fiber === currentlyRenderingFiber$1 || null !== pending && pending === currentlyRenderingFiber$1) didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  else {
    if (0 === fiber.lanes && (null === pending || 0 === pending.lanes) && (pending = queue.lastRenderedReducer, null !== pending)) try {
      var currentState = queue.lastRenderedState,
        eagerState = pending(currentState, action);
      update.eagerReducer = pending;
      update.eagerState = eagerState;
      if (objectIs(eagerState, currentState)) return
    } catch (error) { } finally { }
    scheduleUpdateOnFiber(fiber,
      lane, eventTime)
  }
}

function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  workInProgress.child = null === current ? mountChildFibers(workInProgress, null, nextChildren, renderLanes) : reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes)
}

function updateForwardRef(current, workInProgress, Component, nextProps, renderLanes) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderLanes);
  nextProps = renderWithHooks(current, workInProgress,
    Component, nextProps, ref, renderLanes);
  if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  workInProgress.flags |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderLanes);
  return workInProgress.child
}

function updateMemoComponent(current, workInProgress, Component, nextProps, updateLanes, renderLanes) {
  if (null === current) {
    var type = Component.type;
    if ("function" === typeof type && !shouldConstruct(type) &&
      undefined === type.defaultProps && null === Component.compare && undefined === Component.defaultProps) return workInProgress.tag = 15, workInProgress.type = type, updateSimpleMemoComponent(current, workInProgress, type, nextProps, updateLanes, renderLanes);
    current = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress, workInProgress.mode, renderLanes);
    current.ref = workInProgress.ref;
    current.return = workInProgress;
    return workInProgress.child = current
  }
  type = current.child;
  if (0 === (updateLanes & renderLanes) && (updateLanes =
    type.memoizedProps, Component = Component.compare, Component = null !== Component ? Component : shallowEqual, Component(updateLanes, nextProps) && current.ref === workInProgress.ref)) return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  workInProgress.flags |= 1;
  current = createWorkInProgress(type, nextProps);
  current.ref = workInProgress.ref;
  current.return = workInProgress;
  return workInProgress.child = current
}

function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, updateLanes, renderLanes) {
  if (null !==
    current && shallowEqual(current.memoizedProps, nextProps) && current.ref === workInProgress.ref)
    if (didReceiveUpdate = false, 0 !== (renderLanes & updateLanes)) 0 !== (current.flags & 16384) && (didReceiveUpdate = true);
    else return workInProgress.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  return updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes)
}

function updateOffscreenComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    nextChildren = nextProps.children,
    prevState = null !== current ? current.memoizedState : null;
  if ("hidden" === nextProps.mode || "unstable-defer-without-hiding" === nextProps.mode)
    if (0 === (workInProgress.mode & 4)) workInProgress.memoizedState = {
      baseLanes: 0
    }, pushRenderLanes(workInProgress, renderLanes);
    else if (0 !== (renderLanes & 1073741824)) workInProgress.memoizedState = {
      baseLanes: 0
    }, pushRenderLanes(workInProgress, null !== prevState ? prevState.baseLanes : renderLanes);
    else return current = null !== prevState ? prevState.baseLanes | renderLanes :
      renderLanes, workInProgress.lanes = workInProgress.childLanes = 1073741824, workInProgress.memoizedState = {
        baseLanes: current
      }, pushRenderLanes(workInProgress, current), null;
  else null !== prevState ? (nextProps = prevState.baseLanes | renderLanes, workInProgress.memoizedState = null) : nextProps = renderLanes, pushRenderLanes(workInProgress, nextProps);
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child
}

function markRef(current, workInProgress) {
  var ref = workInProgress.ref;
  if (null ===
    current && null !== ref || null !== current && current.ref !== ref) workInProgress.flags |= 128
}

function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
  var context = isContextProvider(Component) ? previousContext : contextStackCursor.current;
  context = getMaskedContext(workInProgress, context);
  prepareToReadContext(workInProgress, renderLanes);
  Component = renderWithHooks(current, workInProgress, Component, nextProps, context, renderLanes);
  if (null !== current && !didReceiveUpdate) return bailoutHooks(current,
    workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  workInProgress.flags |= 1;
  reconcileChildren(current, workInProgress, Component, renderLanes);
  return workInProgress.child
}

function updateBlock(current, workInProgress, block, nextProps, renderLanes) {
  var render = block._render;
  block = block._data;
  prepareToReadContext(workInProgress, renderLanes);
  nextProps = renderWithHooks(current, workInProgress, render, nextProps, block, renderLanes);
  if (null !== current && !didReceiveUpdate) return bailoutHooks(current,
    workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  workInProgress.flags |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderLanes);
  return workInProgress.child
}

function updateClassComponent(current, workInProgress, Component, nextProps, renderLanes) {
  if (isContextProvider(Component)) {
    var hasContext = true;
    pushContextProvider(workInProgress)
  } else hasContext = false;
  prepareToReadContext(workInProgress, renderLanes);
  if (null === workInProgress.stateNode) null !== current &&
    (current.alternate = null, workInProgress.alternate = null, workInProgress.flags |= 2), constructClassInstance(workInProgress, Component, nextProps), mountClassInstance(workInProgress, Component, nextProps, renderLanes), nextProps = true;
  else if (null === current) {
    var instance = workInProgress.stateNode,
      oldProps = workInProgress.memoizedProps;
    instance.props = oldProps;
    var oldContext = instance.context,
      contextType = Component.contextType;
    "object" === typeof contextType && null !== contextType ? contextType = readContext(contextType) : (contextType =
      isContextProvider(Component) ? previousContext : contextStackCursor.current, contextType = getMaskedContext(workInProgress, contextType));
    var getDerivedStateFromProps = Component.getDerivedStateFromProps,
      hasNewLifecycles = "function" === typeof getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate;
    hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillReceiveProps && "function" !== typeof instance.componentWillReceiveProps || (oldProps !== nextProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress,
      instance, nextProps, contextType);
    hasForceUpdate = false;
    var oldState = workInProgress.memoizedState;
    instance.state = oldState;
    processUpdateQueue(workInProgress, nextProps, instance, renderLanes);
    oldContext = workInProgress.memoizedState;
    oldProps !== nextProps || oldState !== oldContext || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps =
      hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || ("function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount()), "function" === typeof instance.componentDidMount && (workInProgress.flags |= 4)) : ("function" ===
        typeof instance.componentDidMount && (workInProgress.flags |= 4), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), instance.props = nextProps, instance.state = oldContext, instance.context = contextType, nextProps = oldProps) : ("function" === typeof instance.componentDidMount && (workInProgress.flags |= 4), nextProps = false)
  } else {
    instance = workInProgress.stateNode;
    cloneUpdateQueue(current, workInProgress);
    oldProps = workInProgress.memoizedProps;
    contextType = workInProgress.type === workInProgress.elementType ?
      oldProps : resolveDefaultProps(workInProgress.type, oldProps);
    instance.props = contextType;
    hasNewLifecycles = workInProgress.pendingProps;
    oldState = instance.context;
    oldContext = Component.contextType;
    "object" === typeof oldContext && null !== oldContext ? oldContext = readContext(oldContext) : (oldContext = isContextProvider(Component) ? previousContext : contextStackCursor.current, oldContext = getMaskedContext(workInProgress, oldContext));
    var getDerivedStateFromProps$jscomp$0 = Component.getDerivedStateFromProps;
    (getDerivedStateFromProps =
      "function" === typeof getDerivedStateFromProps$jscomp$0 || "function" === typeof instance.getSnapshotBeforeUpdate) || "function" !== typeof instance.UNSAFE_componentWillReceiveProps && "function" !== typeof instance.componentWillReceiveProps || (oldProps !== hasNewLifecycles || oldState !== oldContext) && callComponentWillReceiveProps(workInProgress, instance, nextProps, oldContext);
    hasForceUpdate = false;
    oldState = workInProgress.memoizedState;
    instance.state = oldState;
    processUpdateQueue(workInProgress, nextProps, instance, renderLanes);
    var newState = workInProgress.memoizedState;
    oldProps !== hasNewLifecycles || oldState !== newState || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps$jscomp$0 && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps$jscomp$0, nextProps), newState = workInProgress.memoizedState), (contextType = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, contextType, nextProps, oldState, newState, oldContext)) ? (getDerivedStateFromProps || "function" !==
      typeof instance.UNSAFE_componentWillUpdate && "function" !== typeof instance.componentWillUpdate || ("function" === typeof instance.componentWillUpdate && instance.componentWillUpdate(nextProps, newState, oldContext), "function" === typeof instance.UNSAFE_componentWillUpdate && instance.UNSAFE_componentWillUpdate(nextProps, newState, oldContext)), "function" === typeof instance.componentDidUpdate && (workInProgress.flags |= 4), "function" === typeof instance.getSnapshotBeforeUpdate && (workInProgress.flags |= 256)) : ("function" !==
        typeof instance.componentDidUpdate || oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 256), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = newState), instance.props = nextProps, instance.state = newState, instance.context = oldContext, nextProps = contextType) : ("function" !== typeof instance.componentDidUpdate ||
          oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 256), nextProps = false)
  }
  return finishClassComponent(current, workInProgress, Component, nextProps, hasContext, renderLanes)
}

function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderLanes) {
  markRef(current, workInProgress);
  var didCaptureError =
    0 !== (workInProgress.flags & 64);
  if (!shouldUpdate && !didCaptureError) return hasContext && invalidateContextProvider(workInProgress, Component, false), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$1.current = workInProgress;
  var nextChildren = didCaptureError && "function" !== typeof Component.getDerivedStateFromError ? null : shouldUpdate.render();
  workInProgress.flags |= 1;
  null !== current && didCaptureError ? (workInProgress.child = reconcileChildFibers(workInProgress,
    current.child, null, renderLanes), workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderLanes)) : reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  workInProgress.memoizedState = shouldUpdate.state;
  hasContext && invalidateContextProvider(workInProgress, Component, true);
  return workInProgress.child
}

function pushHostRootContext(workInProgress) {
  var root = workInProgress.stateNode;
  root.pendingContext ? pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !==
    root.context) : root.context && pushTopLevelContextObject(workInProgress, root.context, false);
  pushHostContainer(workInProgress, root.containerInfo)
}

function updateSuspenseComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    suspenseContext = suspenseStackCursor.current,
    showFallback = false,
    didSuspend = 0 !== (workInProgress.flags & 64),
    JSCompiler_temp;
  (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseContext & 2));
  JSCompiler_temp ?
    (showFallback = true, workInProgress.flags &= -65) : null !== current && null === current.memoizedState || undefined === nextProps.fallback || true === nextProps.unstable_avoidThisFallback || (suspenseContext |= 1);
  push(suspenseStackCursor, suspenseContext & 1);
  if (null === current) {
    if (undefined !== nextProps.fallback && (tryToClaimNextHydratableInstance(workInProgress), current = workInProgress.memoizedState, null !== current && (current = current.dehydrated, null !== current))) return 0 === (workInProgress.mode & 2) ? workInProgress.lanes = 1 : "$!" === current.data ?
      workInProgress.lanes = 256 : workInProgress.lanes = 1073741824, null;
    current = nextProps.children;
    var nextFallbackChildren = nextProps.fallback;
    return showFallback ? (current = mountSuspenseFallbackChildren(workInProgress, current, nextFallbackChildren, renderLanes), workInProgress.child.memoizedState = {
      baseLanes: renderLanes
    }, workInProgress.memoizedState = SUSPENDED_MARKER, current) : "number" === typeof nextProps.unstable_expectedLoadTime ? (current = mountSuspenseFallbackChildren(workInProgress, current, nextFallbackChildren, renderLanes),
      workInProgress.child.memoizedState = {
        baseLanes: renderLanes
      }, workInProgress.memoizedState = SUSPENDED_MARKER, workInProgress.lanes = 33554432, current) : mountSuspensePrimaryChildren(workInProgress, current, renderLanes)
  }
  suspenseContext = current.memoizedState;
  if (null !== suspenseContext) {
    JSCompiler_temp = suspenseContext.dehydrated;
    if (null !== JSCompiler_temp) {
      if (didSuspend) {
        if (null !== workInProgress.memoizedState) return workInProgress.child = current.child, workInProgress.flags |= 64, null;
        showFallback = nextProps.fallback;
        nextFallbackChildren = workInProgress.mode;
        nextProps = createFiberFromOffscreen(nextProps.children, nextFallbackChildren, 0, null);
        showFallback = createFiberFromFragment(showFallback, nextFallbackChildren, renderLanes, null);
        showFallback.flags |= 2;
        nextProps.return = workInProgress;
        showFallback.return = workInProgress;
        nextProps.sibling = showFallback;
        workInProgress.child = nextProps;
        0 !== (workInProgress.mode & 2) && reconcileChildFibers(workInProgress, current.child, null, renderLanes);
        workInProgress.child.memoizedState = {
          baseLanes: renderLanes
        };
        workInProgress.memoizedState = SUSPENDED_MARKER;
        return showFallback
      }
      if (0 !== (executionContext & 64) || 0 === (workInProgress.mode & 2) || "$!" === JSCompiler_temp.data) workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
      else if (nextProps = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || nextProps) {
        nextProps = workInProgressRoot;
        if (null !== nextProps) {
          getHighestPriorityLanes(renderLanes);
          switch (return_highestLanePriority) {
            case 15:
            case 14:
              nextFallbackChildren = 0;
              break;
            case 13:
            case 12:
              nextFallbackChildren =
                4;
              break;
            case 11:
            case 10:
              nextFallbackChildren = 32;
              break;
            case 9:
            case 8:
              nextFallbackChildren = 256;
              break;
            case 7:
            case 6:
              nextFallbackChildren = 4096;
              break;
            case 5:
              nextFallbackChildren = 4096;
              break;
            case 4:
              nextFallbackChildren = 67108864;
              break;
            case 3:
            case 2:
              nextFallbackChildren = 134217728;
              break;
            case 1:
            case 0:
              nextFallbackChildren = 0;
              break;
            default:
              throw Error(formatProdErrorMessage(360, nextFallbackChildren));
          }
          nextProps = 0 !== (nextFallbackChildren & (nextProps.suspendedLanes | renderLanes)) ? 0 : nextFallbackChildren;
          0 !== nextProps &&
            nextProps !== suspenseContext.retryLane && (suspenseContext.retryLane = nextProps, scheduleUpdateOnFiber(current, nextProps, -1))
        }
        renderDidSuspendDelayIfPossible();
        workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes)
      } else "$?" === JSCompiler_temp.data ? (workInProgress.flags |= 64, workInProgress.child = current.child, workInProgress = retryDehydratedSuspenseBoundary.bind(null, current), JSCompiler_temp._reactRetry = workInProgress, workInProgress = null) : (nextHydratableInstance = getNextHydratable(JSCompiler_temp.nextSibling),
        popToNextHostParent(workInProgress), isHydrating = true, workInProgress = mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.flags |= 1024);
      return workInProgress
    }
    if (showFallback) return nextProps = updateSuspenseFallbackChildren(current, workInProgress, nextProps.children, nextProps.fallback, renderLanes), showFallback = workInProgress.child, nextFallbackChildren = current.child.memoizedState, showFallback.memoizedState = null === nextFallbackChildren ? {
      baseLanes: renderLanes
    } : {
      baseLanes: nextFallbackChildren.baseLanes | renderLanes
    }, showFallback.childLanes = current.childLanes & ~renderLanes, workInProgress.memoizedState = SUSPENDED_MARKER, nextProps;
    renderLanes = updateSuspensePrimaryChildren(current, workInProgress, nextProps.children, renderLanes);
    workInProgress.memoizedState = null;
    return renderLanes
  }
  if (showFallback) return nextProps = updateSuspenseFallbackChildren(current, workInProgress, nextProps.children, nextProps.fallback, renderLanes), showFallback = workInProgress.child, nextFallbackChildren =
    current.child.memoizedState, showFallback.memoizedState = null === nextFallbackChildren ? {
      baseLanes: renderLanes
    } : {
      baseLanes: nextFallbackChildren.baseLanes | renderLanes
    }, showFallback.childLanes = current.childLanes & ~renderLanes, workInProgress.memoizedState = SUSPENDED_MARKER, nextProps;
  renderLanes = updateSuspensePrimaryChildren(current, workInProgress, nextProps.children, renderLanes);
  workInProgress.memoizedState = null;
  return renderLanes
}

function mountSuspensePrimaryChildren(workInProgress, primaryChildren, renderLanes) {
  primaryChildren =
    createFiberFromOffscreen({
      mode: "visible",
      children: primaryChildren
    }, workInProgress.mode, renderLanes, null);
  primaryChildren.return = workInProgress;
  return workInProgress.child = primaryChildren
}

function mountSuspenseFallbackChildren(workInProgress, primaryChildren, fallbackChildren, renderLanes) {
  var mode = workInProgress.mode,
    progressedPrimaryFragment = workInProgress.child;
  primaryChildren = {
    mode: "hidden",
    children: primaryChildren
  };
  0 === (mode & 2) && null !== progressedPrimaryFragment ? (progressedPrimaryFragment.childLanes =
    0, progressedPrimaryFragment.pendingProps = primaryChildren) : progressedPrimaryFragment = createFiberFromOffscreen(primaryChildren, mode, 0, null);
  fallbackChildren = createFiberFromFragment(fallbackChildren, mode, renderLanes, null);
  progressedPrimaryFragment.return = workInProgress;
  fallbackChildren.return = workInProgress;
  progressedPrimaryFragment.sibling = fallbackChildren;
  workInProgress.child = progressedPrimaryFragment;
  return fallbackChildren
}

function updateSuspensePrimaryChildren(current, workInProgress, primaryChildren,
  renderLanes) {
  var currentPrimaryChildFragment = current.child;
  current = currentPrimaryChildFragment.sibling;
  primaryChildren = createWorkInProgress(currentPrimaryChildFragment, {
    mode: "visible",
    children: primaryChildren
  });
  0 === (workInProgress.mode & 2) && (primaryChildren.lanes = renderLanes);
  primaryChildren.return = workInProgress;
  primaryChildren.sibling = null;
  null !== current && (current.nextEffect = null, current.flags = 8, workInProgress.firstEffect = workInProgress.lastEffect = current);
  return workInProgress.child = primaryChildren
}

function updateSuspenseFallbackChildren(current, workInProgress, primaryChildren, fallbackChildren, renderLanes) {
  var mode = workInProgress.mode,
    currentPrimaryChildFragment = current.child;
  current = currentPrimaryChildFragment.sibling;
  var primaryChildProps = {
    mode: "hidden",
    children: primaryChildren
  };
  0 === (mode & 2) && workInProgress.child !== currentPrimaryChildFragment ? (primaryChildren = workInProgress.child, primaryChildren.childLanes = 0, primaryChildren.pendingProps = primaryChildProps, currentPrimaryChildFragment = primaryChildren.lastEffect,
    null !== currentPrimaryChildFragment ? (workInProgress.firstEffect = primaryChildren.firstEffect, workInProgress.lastEffect = currentPrimaryChildFragment, currentPrimaryChildFragment.nextEffect = null) : workInProgress.firstEffect = workInProgress.lastEffect = null) : primaryChildren = createWorkInProgress(currentPrimaryChildFragment, primaryChildProps);
  null !== current ? fallbackChildren = createWorkInProgress(current, fallbackChildren) : (fallbackChildren = createFiberFromFragment(fallbackChildren, mode, renderLanes, null), fallbackChildren.flags |=
    2);
  fallbackChildren.return = workInProgress;
  primaryChildren.return = workInProgress;
  primaryChildren.sibling = fallbackChildren;
  workInProgress.child = primaryChildren;
  return fallbackChildren
}

function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes) {
  reconcileChildFibers(workInProgress, current.child, null, renderLanes);
  current = mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children, renderLanes);
  current.flags |= 2;
  workInProgress.memoizedState = null;
  return current
}

function scheduleWorkOnFiber(fiber, renderLanes) {
  fiber.lanes |= renderLanes;
  var alternate = fiber.alternate;
  null !== alternate && (alternate.lanes |= renderLanes);
  scheduleWorkOnParentPath(fiber.return, renderLanes)
}

function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode, lastEffectBeforeRendering) {
  var renderState = workInProgress.memoizedState;
  null === renderState ? workInProgress.memoizedState = {
    isBackwards: isBackwards,
    rendering: null,
    renderingStartTime: 0,
    last: lastContentRow,
    tail: tail,
    tailMode: tailMode,
    lastEffect: lastEffectBeforeRendering
  } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.lastEffect = lastEffectBeforeRendering)
}

function updateSuspenseListComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    revealOrder = nextProps.revealOrder,
    tailMode = nextProps.tail;
  reconcileChildren(current, workInProgress,
    nextProps.children, renderLanes);
  nextProps = suspenseStackCursor.current;
  if (0 !== (nextProps & 2)) nextProps = nextProps & 1 | 2, workInProgress.flags |= 64;
  else {
    if (null !== current && 0 !== (current.flags & 64)) a: for (current = workInProgress.child; null !== current;) {
      if (13 === current.tag) null !== current.memoizedState && scheduleWorkOnFiber(current, renderLanes);
      else if (19 === current.tag) scheduleWorkOnFiber(current, renderLanes);
      else if (null !== current.child) {
        current.child.return = current;
        current = current.child;
        continue
      }
      if (current === workInProgress) break a;
      for (; null === current.sibling;) {
        if (null === current.return || current.return === workInProgress) break a;
        current = current.return
      }
      current.sibling.return = current.return;
      current = current.sibling
    }
    nextProps &= 1
  }
  push(suspenseStackCursor, nextProps);
  if (0 === (workInProgress.mode & 2)) workInProgress.memoizedState = null;
  else switch (revealOrder) {
    case "forwards":
      renderLanes = workInProgress.child;
      for (revealOrder = null; null !== renderLanes;) current = renderLanes.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder =
        renderLanes), renderLanes = renderLanes.sibling;
      renderLanes = revealOrder;
      null === renderLanes ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderLanes.sibling, renderLanes.sibling = null);
      initSuspenseListRenderState(workInProgress, false, revealOrder, renderLanes, tailMode, workInProgress.lastEffect);
      break;
    case "backwards":
      renderLanes = null;
      revealOrder = workInProgress.child;
      for (workInProgress.child = null; null !== revealOrder;) {
        current = revealOrder.alternate;
        if (null !== current && null === findFirstSuspended(current)) {
          workInProgress.child =
            revealOrder;
          break
        }
        current = revealOrder.sibling;
        revealOrder.sibling = renderLanes;
        renderLanes = revealOrder;
        revealOrder = current
      }
      initSuspenseListRenderState(workInProgress, true, renderLanes, null, tailMode, workInProgress.lastEffect);
      break;
    case "together":
      initSuspenseListRenderState(workInProgress, false, null, null, undefined, workInProgress.lastEffect);
      break;
    default:
      workInProgress.memoizedState = null
  }
  return workInProgress.child
}

function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  null !== current && (workInProgress.dependencies =
    current.dependencies);
  workInProgressRootSkippedLanes |= workInProgress.lanes;
  if (0 !== (renderLanes & workInProgress.childLanes)) {
    if (null !== current && workInProgress.child !== current.child) throw Error(formatProdErrorMessage(153));
    if (null !== workInProgress.child) {
      current = workInProgress.child;
      renderLanes = createWorkInProgress(current, current.pendingProps);
      workInProgress.child = renderLanes;
      for (renderLanes.return = workInProgress; null !== current.sibling;) current = current.sibling, renderLanes = renderLanes.sibling = createWorkInProgress(current,
        current.pendingProps), renderLanes.return = workInProgress;
      renderLanes.sibling = null
    }
    return workInProgress.child
  }
  return null
}

function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  if (!isHydrating) switch (renderState.tailMode) {
    case "hidden":
      hasRenderedATailFallback = renderState.tail;
      for (var lastTailNode = null; null !== hasRenderedATailFallback;) null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
      null === lastTailNode ?
        renderState.tail = null : lastTailNode.sibling = null;
      break;
    case "collapsed":
      lastTailNode = renderState.tail;
      for (var lastTailNode$91 = null; null !== lastTailNode;) null !== lastTailNode.alternate && (lastTailNode$91 = lastTailNode), lastTailNode = lastTailNode.sibling;
      null === lastTailNode$91 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$91.sibling = null
  }
}

function completeWork(current, workInProgress, renderLanes) {
  var newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return null;
    case 1:
      return isContextProvider(workInProgress.type) && (pop(didPerformWorkStackCursor), pop(contextStackCursor)), null;
    case 3:
      popHostContainer();
      pop(didPerformWorkStackCursor);
      pop(contextStackCursor);
      resetWorkInProgressVersions();
      newProps = workInProgress.stateNode;
      newProps.pendingContext && (newProps.context = newProps.pendingContext, newProps.pendingContext = null);
      if (null === current || null === current.child) popHydrationState(workInProgress) ?
        workInProgress.flags |= 4 : newProps.hydrate || (workInProgress.flags |= 256);
      updateHostContainer(workInProgress);
      return null;
    case 5:
      popHostContext(workInProgress);
      var rootContainerInstance = requiredContext(rootInstanceStackCursor.current);
      renderLanes = workInProgress.type;
      if (null !== current && null != workInProgress.stateNode) updateHostComponent$1(current, workInProgress, renderLanes, newProps, rootContainerInstance), current.ref !== workInProgress.ref && (workInProgress.flags |= 128);
      else {
        if (!newProps) {
          if (null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
          return null
        }
        current = requiredContext(contextStackCursor$1.current);
        if (popHydrationState(workInProgress)) {
          newProps = workInProgress.stateNode;
          renderLanes = workInProgress.type;
          var props = workInProgress.memoizedProps;
          newProps[internalInstanceKey] = workInProgress;
          newProps[internalPropsKey] = props;
          switch (renderLanes) {
            case "dialog":
              listenToNonDelegatedEvent("cancel", newProps);
              listenToNonDelegatedEvent("close", newProps);
              break;
            case "iframe":
            case "object":
            case "embed":
              listenToNonDelegatedEvent("load", newProps);
              break;
            case "video":
            case "audio":
              for (current = 0; current < mediaEventTypes.length; current++) listenToNonDelegatedEvent(mediaEventTypes[current], newProps);
              break;
            case "source":
              listenToNonDelegatedEvent("error", newProps);
              break;
            case "img":
            case "image":
            case "link":
              listenToNonDelegatedEvent("error", newProps);
              listenToNonDelegatedEvent("load", newProps);
              break;
            case "details":
              listenToNonDelegatedEvent("toggle", newProps);
              break;
            case "input":
              initWrapperState(newProps, props);
              listenToNonDelegatedEvent("invalid", newProps);
              break;
            case "select":
              newProps._wrapperState = {
                wasMultiple: !!props.multiple
              };
              listenToNonDelegatedEvent("invalid", newProps);
              break;
            case "textarea":
              initWrapperState$2(newProps, props), listenToNonDelegatedEvent("invalid", newProps)
          }
          assertValidProps(renderLanes, props);
          current = null;
          for (var propKey in props) props.hasOwnProperty(propKey) && (rootContainerInstance = props[propKey], "children" === propKey ? "string" === typeof rootContainerInstance ? newProps.textContent !== rootContainerInstance && (current = ["children", rootContainerInstance]) :
            "number" === typeof rootContainerInstance && newProps.textContent !== "" + rootContainerInstance && (current = ["children", "" + rootContainerInstance]) : registrationNameDependencies.hasOwnProperty(propKey) && null != rootContainerInstance && "onScroll" === propKey && listenToNonDelegatedEvent("scroll", newProps));
          switch (renderLanes) {
            case "input":
              track(newProps);
              postMountWrapper(newProps, props, true);
              break;
            case "textarea":
              track(newProps);
              postMountWrapper$3(newProps);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" ===
                typeof props.onClick && (newProps.onclick = noop)
          }
          newProps = current;
          workInProgress.updateQueue = newProps;
          null !== newProps && (workInProgress.flags |= 4)
        } else {
          propKey = 9 === rootContainerInstance.nodeType ? rootContainerInstance : rootContainerInstance.ownerDocument;
          "http://www.w3.org/1999/xhtml" === current && (current = getIntrinsicNamespace(renderLanes));
          "http://www.w3.org/1999/xhtml" === current ? "script" === renderLanes ? (current = propKey.createElement("div"), current.innerHTML = "<script>\x3c/script>", current = current.removeChild(current.firstChild)) :
            "string" === typeof newProps.is ? current = propKey.createElement(renderLanes, {
              is: newProps.is
            }) : (current = propKey.createElement(renderLanes), "select" === renderLanes && (propKey = current, newProps.multiple ? propKey.multiple = true : newProps.size && (propKey.size = newProps.size))) : current = propKey.createElementNS(current, renderLanes);
          current[internalInstanceKey] = workInProgress;
          current[internalPropsKey] = newProps;
          appendAllChildren(current, workInProgress, false, false);
          workInProgress.stateNode = current;
          propKey = isCustomComponent(renderLanes,
            newProps);
          switch (renderLanes) {
            case "dialog":
              listenToNonDelegatedEvent("cancel", current);
              listenToNonDelegatedEvent("close", current);
              rootContainerInstance = newProps;
              break;
            case "iframe":
            case "object":
            case "embed":
              listenToNonDelegatedEvent("load", current);
              rootContainerInstance = newProps;
              break;
            case "video":
            case "audio":
              for (rootContainerInstance = 0; rootContainerInstance < mediaEventTypes.length; rootContainerInstance++) listenToNonDelegatedEvent(mediaEventTypes[rootContainerInstance], current);
              rootContainerInstance =
                newProps;
              break;
            case "source":
              listenToNonDelegatedEvent("error", current);
              rootContainerInstance = newProps;
              break;
            case "img":
            case "image":
            case "link":
              listenToNonDelegatedEvent("error", current);
              listenToNonDelegatedEvent("load", current);
              rootContainerInstance = newProps;
              break;
            case "details":
              listenToNonDelegatedEvent("toggle", current);
              rootContainerInstance = newProps;
              break;
            case "input":
              initWrapperState(current, newProps);
              rootContainerInstance = getHostProps(current, newProps);
              listenToNonDelegatedEvent("invalid", current);
              break;
            case "option":
              rootContainerInstance = getHostProps$1(current, newProps);
              break;
            case "select":
              current._wrapperState = {
                wasMultiple: !!newProps.multiple
              };
              rootContainerInstance = Object.assign({}, newProps, {
                value: undefined
              });
              listenToNonDelegatedEvent("invalid", current);
              break;
            case "textarea":
              initWrapperState$2(current, newProps);
              rootContainerInstance = getHostProps$3(current, newProps);
              listenToNonDelegatedEvent("invalid", current);
              break;
            default:
              rootContainerInstance = newProps
          }
          assertValidProps(renderLanes, rootContainerInstance);
          var nextProps = rootContainerInstance;
          for (props in nextProps)
            if (nextProps.hasOwnProperty(props)) {
              var nextProp = nextProps[props];
              "style" === props ? setValueForStyles(current, nextProp) : "dangerouslySetInnerHTML" === props ? (nextProp = nextProp ? nextProp.__html : undefined, null != nextProp && setInnerHTML(current, nextProp)) : "children" === props ? "string" === typeof nextProp ? ("textarea" !== renderLanes || "" !== nextProp) && setTextContent(current, nextProp) : "number" === typeof nextProp && setTextContent(current, "" + nextProp) : "suppressContentEditableWarning" !==
                props && "suppressHydrationWarning" !== props && "autoFocus" !== props && (registrationNameDependencies.hasOwnProperty(props) ? null != nextProp && "onScroll" === props && listenToNonDelegatedEvent("scroll", current) : null != nextProp && setValueForProperty(current, props, nextProp, propKey))
            }
          switch (renderLanes) {
            case "input":
              track(current);
              postMountWrapper(current, newProps, false);
              break;
            case "textarea":
              track(current);
              postMountWrapper$3(current);
              break;
            case "option":
              null != newProps.value && current.setAttribute("value", "" + getToStringValue(newProps.value));
              break;
            case "select":
              current.multiple = !!newProps.multiple;
              props = newProps.value;
              null != props ? updateOptions(current, !!newProps.multiple, props, false) : null != newProps.defaultValue && updateOptions(current, !!newProps.multiple, newProps.defaultValue, true);
              break;
            default:
              "function" === typeof rootContainerInstance.onClick && (current.onclick = noop)
          }
          shouldAutoFocusHostComponent(renderLanes, newProps) && (workInProgress.flags |= 4)
        }
        null !== workInProgress.ref && (workInProgress.flags |= 128)
      }
      return null;
    case 6:
      if (current && null != workInProgress.stateNode) updateHostText$1(current,
        workInProgress, current.memoizedProps, newProps);
      else {
        if ("string" !== typeof newProps && null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
        renderLanes = requiredContext(rootInstanceStackCursor.current);
        requiredContext(contextStackCursor$1.current);
        popHydrationState(workInProgress) ? (newProps = workInProgress.stateNode, renderLanes = workInProgress.memoizedProps, newProps[internalInstanceKey] = workInProgress, newProps.nodeValue !== renderLanes && (workInProgress.flags |= 4)) : (newProps = (9 === renderLanes.nodeType ?
          renderLanes : renderLanes.ownerDocument).createTextNode(newProps), newProps[internalInstanceKey] = workInProgress, workInProgress.stateNode = newProps)
      }
      return null;
    case 13:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null !== newProps && null !== newProps.dehydrated) {
        if (null === current) {
          if (!popHydrationState(workInProgress)) throw Error(formatProdErrorMessage(318));
          newProps = workInProgress.memoizedState;
          newProps = null !== newProps ? newProps.dehydrated : null;
          if (!newProps) throw Error(formatProdErrorMessage(317));
          newProps[internalInstanceKey] = workInProgress
        } else resetHydrationState(), 0 === (workInProgress.flags & 64) && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
        return null
      }
      if (0 !== (workInProgress.flags & 64)) return workInProgress.lanes = renderLanes, workInProgress;
      newProps = null !== newProps;
      renderLanes = false;
      null === current ? undefined !== workInProgress.memoizedProps.fallback && popHydrationState(workInProgress) : renderLanes = null !== current.memoizedState;
      newProps && !renderLanes && 0 !== (workInProgress.mode & 2) && (null ===
        current && true !== workInProgress.memoizedProps.unstable_avoidThisFallback || 0 !== (suspenseStackCursor.current & 1) ? 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3) : renderDidSuspendDelayIfPossible());
      if (newProps || renderLanes) workInProgress.flags |= 4;
      return null;
    case 4:
      return popHostContainer(), updateHostContainer(workInProgress), null === current && listenToAllSupportedEvents(workInProgress.stateNode.containerInfo), null;
    case 10:
      return popProvider(workInProgress), null;
    case 17:
      return isContextProvider(workInProgress.type) &&
        (pop(didPerformWorkStackCursor), pop(contextStackCursor)), null;
    case 19:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null === newProps) return null;
      props = 0 !== (workInProgress.flags & 64);
      propKey = newProps.rendering;
      if (null === propKey)
        if (props) cutOffTailIfNeeded(newProps, false);
        else {
          if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 64))
            for (current = workInProgress.child; null !== current;) {
              propKey = findFirstSuspended(current);
              if (null !== propKey) {
                workInProgress.flags |= 64;
                cutOffTailIfNeeded(newProps, false);
                props = propKey.updateQueue;
                null !== props && (workInProgress.updateQueue = props, workInProgress.flags |= 4);
                null === newProps.lastEffect && (workInProgress.firstEffect = null);
                workInProgress.lastEffect = newProps.lastEffect;
                newProps = renderLanes;
                for (renderLanes = workInProgress.child; null !== renderLanes;) props = renderLanes, current = newProps, props.flags &= 2, props.nextEffect = null, props.firstEffect = null, props.lastEffect = null, propKey = props.alternate, null === propKey ? (props.childLanes = 0, props.lanes = current, props.child = null,
                  props.memoizedProps = null, props.memoizedState = null, props.updateQueue = null, props.dependencies = null, props.stateNode = null) : (props.childLanes = propKey.childLanes, props.lanes = propKey.lanes, props.child = propKey.child, props.memoizedProps = propKey.memoizedProps, props.memoizedState = propKey.memoizedState, props.updateQueue = propKey.updateQueue, props.type = propKey.type, current = propKey.dependencies, props.dependencies = null === current ? null : {
                    lanes: current.lanes,
                    firstContext: current.firstContext
                  }), renderLanes = renderLanes.sibling;
                push(suspenseStackCursor, suspenseStackCursor.current & 1 | 2);
                return workInProgress.child
              }
              current = current.sibling
            }
          null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress.flags |= 64, props = true, cutOffTailIfNeeded(newProps, false), workInProgress.lanes = 33554432)
        } else {
        if (!props)
          if (current = findFirstSuspended(propKey), null !== current) {
            if (workInProgress.flags |= 64, props = true, renderLanes = current.updateQueue, null !== renderLanes && (workInProgress.updateQueue = renderLanes, workInProgress.flags |= 4), cutOffTailIfNeeded(newProps, true), null === newProps.tail && "hidden" === newProps.tailMode && !propKey.alternate && !isHydrating) return workInProgress = workInProgress.lastEffect = newProps.lastEffect, null !== workInProgress && (workInProgress.nextEffect = null), null
          } else 2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 1073741824 !== renderLanes && (workInProgress.flags |= 64, props = true, cutOffTailIfNeeded(newProps, false), workInProgress.lanes = 33554432);
        newProps.isBackwards ? (propKey.sibling = workInProgress.child, workInProgress.child = propKey) :
          (renderLanes = newProps.last, null !== renderLanes ? renderLanes.sibling = propKey : workInProgress.child = propKey, newProps.last = propKey)
      }
      return null !== newProps.tail ? (renderLanes = newProps.tail, newProps.rendering = renderLanes, newProps.tail = renderLanes.sibling, newProps.lastEffect = workInProgress.lastEffect, newProps.renderingStartTime = now(), renderLanes.sibling = null, workInProgress = suspenseStackCursor.current, push(suspenseStackCursor, props ? workInProgress & 1 | 2 : workInProgress & 1), renderLanes) : null;
    case 22:
      return null;
    case 23:
    case 24:
      return subtreeRenderLanes =
        subtreeRenderLanesCursor.current, pop(subtreeRenderLanesCursor), null !== current && null !== current.memoizedState !== (null !== workInProgress.memoizedState) && "unstable-defer-without-hiding" !== newProps.mode && (workInProgress.flags |= 4), null
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
}

function unwindWork(workInProgress, renderLanes) {
  switch (workInProgress.tag) {
    case 1:
      return isContextProvider(workInProgress.type) && (pop(didPerformWorkStackCursor), pop(contextStackCursor)), renderLanes = workInProgress.flags,
        renderLanes & 4096 ? (workInProgress.flags = renderLanes & -4097 | 64, workInProgress) : null;
    case 3:
      popHostContainer();
      pop(didPerformWorkStackCursor);
      pop(contextStackCursor);
      resetWorkInProgressVersions();
      renderLanes = workInProgress.flags;
      if (0 !== (renderLanes & 64)) throw Error(formatProdErrorMessage(285));
      workInProgress.flags = renderLanes & -4097 | 64;
      return workInProgress;
    case 5:
      return popHostContext(workInProgress), null;
    case 13:
      pop(suspenseStackCursor);
      renderLanes = workInProgress.memoizedState;
      if (null !== renderLanes &&
        null !== renderLanes.dehydrated) {
        if (null === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
        resetHydrationState()
      }
      renderLanes = workInProgress.flags;
      return renderLanes & 4096 ? (workInProgress.flags = renderLanes & -4097 | 64, workInProgress) : null;
    case 19:
      return pop(suspenseStackCursor), null;
    case 4:
      return popHostContainer(), null;
    case 10:
      return popProvider(workInProgress), null;
    case 23:
    case 24:
      return subtreeRenderLanes = subtreeRenderLanesCursor.current, pop(subtreeRenderLanesCursor), null;
    default:
      return null
  }
}

function createCapturedValue(value, source) {
  try {
    var info = "",
      node = source;
    do info += describeFiber(node), node = node.return; while (node);
    var JSCompiler_inline_result = info
  } catch (x) {
    JSCompiler_inline_result = "\nError generating stack: " + x.message + "\n" + x.stack
  }
  return {
    value: value,
    source: source,
    stack: JSCompiler_inline_result
  }
}

function logCapturedError(boundary, errorInfo) {
  try {
    console.error(errorInfo.value)
  } catch (e$104) {
    setTimeout(function () {
      throw e$104;
    })
  }
}

function createRootErrorUpdate(fiber, errorInfo, lane) {
  lane =
    createUpdate(-1, lane);
  lane.tag = 3;
  lane.payload = {
    element: null
  };
  var error = errorInfo.value;
  lane.callback = function () {
    hasUncaughtError || (hasUncaughtError = true, firstUncaughtError = error);
    logCapturedError(fiber, errorInfo)
  };
  return lane
}

function createClassErrorUpdate(fiber, errorInfo, lane) {
  lane = createUpdate(-1, lane);
  lane.tag = 3;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    lane.payload = function () {
      logCapturedError(fiber,
        errorInfo);
      return getDerivedStateFromError(error)
    }
  }
  var inst = fiber.stateNode;
  null !== inst && "function" === typeof inst.componentDidCatch && (lane.callback = function () {
    "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this), logCapturedError(fiber, errorInfo));
    var stack = errorInfo.stack;
    this.componentDidCatch(errorInfo.value, {
      componentStack: null !== stack ? stack : ""
    })
  });
  return lane
}

function safelyDetachRef(current) {
  var ref = current.ref;
  if (null !== ref)
    if ("function" === typeof ref) try {
      ref(null)
    } catch (refError) {
      captureCommitPhaseError(current, refError)
    } else ref.current = null
}

function commitBeforeMutationLifeCycles(current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      return;
    case 1:
      if (finishedWork.flags & 256 && null !== current) {
        var prevProps = current.memoizedProps,
          prevState = current.memoizedState;
        current = finishedWork.stateNode;
        finishedWork = current.getSnapshotBeforeUpdate(finishedWork.elementType ===
          finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);
        current.__reactInternalSnapshotBeforeUpdate = finishedWork
      }
      return;
    case 3:
      finishedWork.flags & 256 && clearContainer(finishedWork.stateNode.containerInfo);
      return;
    case 5:
    case 6:
    case 4:
    case 17:
      return
  }
  throw Error(formatProdErrorMessage(163));
}

function commitLifeCycles(finishedRoot, current, finishedWork, committedLanes) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      current = finishedWork.updateQueue;
      current = null !==
        current ? current.lastEffect : null;
      if (null !== current) {
        finishedRoot = current = current.next;
        do 3 === (finishedRoot.tag & 3) && (committedLanes = finishedRoot.create, finishedRoot.destroy = committedLanes()), finishedRoot = finishedRoot.next; while (finishedRoot !== current)
      }
      current = finishedWork.updateQueue;
      current = null !== current ? current.lastEffect : null;
      if (null !== current) {
        finishedRoot = current = current.next;
        do {
          var _effect = finishedRoot;
          committedLanes = _effect.next;
          _effect = _effect.tag;
          0 !== (_effect & 4) && 0 !== (_effect & 1) && (enqueuePendingPassiveHookEffectUnmount(finishedWork,
            finishedRoot), enqueuePendingPassiveHookEffectMount(finishedWork, finishedRoot));
          finishedRoot = committedLanes
        } while (finishedRoot !== current)
      }
      return;
    case 1:
      finishedRoot = finishedWork.stateNode;
      finishedWork.flags & 4 && (null === current ? finishedRoot.componentDidMount() : (committedLanes = finishedWork.elementType === finishedWork.type ? current.memoizedProps : resolveDefaultProps(finishedWork.type, current.memoizedProps), finishedRoot.componentDidUpdate(committedLanes, current.memoizedState, finishedRoot.__reactInternalSnapshotBeforeUpdate)));
      current = finishedWork.updateQueue;
      null !== current && commitUpdateQueue(finishedWork, current, finishedRoot);
      return;
    case 3:
      current = finishedWork.updateQueue;
      if (null !== current) {
        finishedRoot = null;
        if (null !== finishedWork.child) switch (finishedWork.child.tag) {
          case 5:
            finishedRoot = finishedWork.child.stateNode;
            break;
          case 1:
            finishedRoot = finishedWork.child.stateNode
        }
        commitUpdateQueue(finishedWork, current, finishedRoot)
      }
      return;
    case 5:
      finishedRoot = finishedWork.stateNode;
      null === current && finishedWork.flags & 4 && shouldAutoFocusHostComponent(finishedWork.type,
        finishedWork.memoizedProps) && finishedRoot.focus();
      return;
    case 6:
      return;
    case 4:
      return;
    case 12:
      return;
    case 13:
      null === finishedWork.memoizedState && (finishedWork = finishedWork.alternate, null !== finishedWork && (finishedWork = finishedWork.memoizedState, null !== finishedWork && (finishedWork = finishedWork.dehydrated, null !== finishedWork && retryIfBlockedOn(finishedWork))));
      return;
    case 19:
    case 17:
    case 20:
    case 21:
    case 23:
    case 24:
      return
  }
  throw Error(formatProdErrorMessage(163));
}

function hideOrUnhideAllChildren(finishedWork,
  isHidden) {
  for (var node = finishedWork; ;) {
    if (5 === node.tag) {
      var instance = node.stateNode;
      if (isHidden) instance = instance.style, "function" === typeof instance.setProperty ? instance.setProperty("display", "none", "important") : instance.display = "none";
      else {
        instance = node.stateNode;
        var styleProp = node.memoizedProps.style;
        styleProp = undefined !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
        instance.style.display = dangerousStyleValue("display", styleProp)
      }
    } else if (6 === node.tag) node.stateNode.nodeValue =
      isHidden ? "" : node.memoizedProps;
    else if ((23 !== node.tag && 24 !== node.tag || null === node.memoizedState || node === finishedWork) && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue
    }
    if (node === finishedWork) break;
    for (; null === node.sibling;) {
      if (null === node.return || node.return === finishedWork) return;
      node = node.return
    }
    node.sibling.return = node.return;
    node = node.sibling
  }
}

function commitUnmount(finishedRoot, current, renderPriorityLevel) {
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount) try {
    injectedHook.onCommitFiberUnmount(rendererID,
      current)
  } catch (err) { }
  switch (current.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      finishedRoot = current.updateQueue;
      if (null !== finishedRoot && (finishedRoot = finishedRoot.lastEffect, null !== finishedRoot)) {
        renderPriorityLevel = finishedRoot = finishedRoot.next;
        do {
          var _effect2 = renderPriorityLevel,
            destroy = _effect2.destroy;
          _effect2 = _effect2.tag;
          if (undefined !== destroy)
            if (0 !== (_effect2 & 4)) enqueuePendingPassiveHookEffectUnmount(current, renderPriorityLevel);
            else {
              _effect2 = current;
              try {
                destroy()
              } catch (error) {
                captureCommitPhaseError(_effect2,
                  error)
              }
            }
          renderPriorityLevel = renderPriorityLevel.next
        } while (renderPriorityLevel !== finishedRoot)
      }
      break;
    case 1:
      safelyDetachRef(current);
      finishedRoot = current.stateNode;
      if ("function" === typeof finishedRoot.componentWillUnmount) try {
        finishedRoot.props = current.memoizedProps, finishedRoot.state = current.memoizedState, finishedRoot.componentWillUnmount()
      } catch (unmountError) {
        captureCommitPhaseError(current, unmountError)
      }
      break;
    case 5:
      safelyDetachRef(current);
      break;
    case 4:
      unmountHostComponents(finishedRoot, current)
  }
}

function detachFiberMutation(fiber) {
  fiber.alternate = null;
  fiber.child = null;
  fiber.dependencies = null;
  fiber.firstEffect = null;
  fiber.lastEffect = null;
  fiber.memoizedProps = null;
  fiber.memoizedState = null;
  fiber.pendingProps = null;
  fiber.return = null;
  fiber.updateQueue = null
}

function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag
}

function commitPlacement(finishedWork) {
  a: {
    for (var parent = finishedWork.return; null !== parent;) {
      if (isHostParent(parent)) break a;
      parent = parent.return
    }
    throw Error(formatProdErrorMessage(160));
  }
  var parentFiber = parent;
  parent = parentFiber.stateNode;
  switch (parentFiber.tag) {
    case 5:
      var isContainer = false;
      break;
    case 3:
      parent = parent.containerInfo;
      isContainer = true;
      break;
    case 4:
      parent = parent.containerInfo;
      isContainer = true;
      break;
    default:
      throw Error(formatProdErrorMessage(161));
  }
  parentFiber.flags & 16 && (setTextContent(parent, ""), parentFiber.flags &= -17);
  a: b: for (parentFiber = finishedWork; ;) {
    for (; null === parentFiber.sibling;) {
      if (null === parentFiber.return || isHostParent(parentFiber.return)) {
        parentFiber = null;
        break a
      }
      parentFiber =
        parentFiber.return
    }
    parentFiber.sibling.return = parentFiber.return;
    for (parentFiber = parentFiber.sibling; 5 !== parentFiber.tag && 6 !== parentFiber.tag && 18 !== parentFiber.tag;) {
      if (parentFiber.flags & 2) continue b;
      if (null === parentFiber.child || 4 === parentFiber.tag) continue b;
      else parentFiber.child.return = parentFiber, parentFiber = parentFiber.child
    }
    if (!(parentFiber.flags & 2)) {
      parentFiber = parentFiber.stateNode;
      break a
    }
  }
  isContainer ? insertOrAppendPlacementNodeIntoContainer(finishedWork, parentFiber, parent) : insertOrAppendPlacementNode(finishedWork,
    parentFiber, parent)
}

function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  var tag = node.tag,
    isHost = 5 === tag || 6 === tag;
  if (isHost) node = isHost ? node.stateNode : node.stateNode.instance, before ? 8 === parent.nodeType ? parent.parentNode.insertBefore(node, before) : parent.insertBefore(node, before) : (8 === parent.nodeType ? (before = parent.parentNode, before.insertBefore(node, parent)) : (before = parent, before.appendChild(node)), parent = parent._reactRootContainer, null !== parent && undefined !== parent || null !== before.onclick ||
    (before.onclick = noop));
  else if (4 !== tag && (node = node.child, null !== node))
    for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node;) insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling
}

function insertOrAppendPlacementNode(node, before, parent) {
  var tag = node.tag,
    isHost = 5 === tag || 6 === tag;
  if (isHost) node = isHost ? node.stateNode : node.stateNode.instance, before ? parent.insertBefore(node, before) : parent.appendChild(node);
  else if (4 !== tag && (node = node.child,
    null !== node))
    for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node;) insertOrAppendPlacementNode(node, before, parent), node = node.sibling
}

function unmountHostComponents(finishedRoot$jscomp$0, current, renderPriorityLevel) {
  renderPriorityLevel = current;
  for (var currentParentIsValid = false, currentParent, currentParentIsContainer; ;) {
    if (!currentParentIsValid) {
      currentParent = renderPriorityLevel.return;
      a: for (; ;) {
        if (null === currentParent) throw Error(formatProdErrorMessage(160));
        currentParentIsContainer =
          currentParent.stateNode;
        switch (currentParent.tag) {
          case 5:
            currentParent = currentParentIsContainer;
            currentParentIsContainer = false;
            break a;
          case 3:
            currentParent = currentParentIsContainer.containerInfo;
            currentParentIsContainer = true;
            break a;
          case 4:
            currentParent = currentParentIsContainer.containerInfo;
            currentParentIsContainer = true;
            break a
        }
        currentParent = currentParent.return
      }
      currentParentIsValid = true
    }
    if (5 === renderPriorityLevel.tag || 6 === renderPriorityLevel.tag) {
      a: for (var finishedRoot = finishedRoot$jscomp$0, root = renderPriorityLevel,
        node = root; ;)
        if (commitUnmount(finishedRoot, node), null !== node.child && 4 !== node.tag) node.child.return = node, node = node.child;
        else {
          if (node === root) break a;
          for (; null === node.sibling;) {
            if (null === node.return || node.return === root) break a;
            node = node.return
          }
          node.sibling.return = node.return;
          node = node.sibling
        } currentParentIsContainer ? (finishedRoot = currentParent, root = renderPriorityLevel.stateNode, 8 === finishedRoot.nodeType ? finishedRoot.parentNode.removeChild(root) : finishedRoot.removeChild(root)) : currentParent.removeChild(renderPriorityLevel.stateNode)
    } else if (18 ===
      renderPriorityLevel.tag) currentParentIsContainer ? (finishedRoot = currentParent, root = renderPriorityLevel.stateNode, 8 === finishedRoot.nodeType ? clearSuspenseBoundary(finishedRoot.parentNode, root) : 1 === finishedRoot.nodeType && clearSuspenseBoundary(finishedRoot, root), retryIfBlockedOn(finishedRoot)) : clearSuspenseBoundary(currentParent, renderPriorityLevel.stateNode);
    else if (4 === renderPriorityLevel.tag) {
      if (null !== renderPriorityLevel.child) {
        currentParent = renderPriorityLevel.stateNode.containerInfo;
        currentParentIsContainer = true;
        renderPriorityLevel.child.return = renderPriorityLevel;
        renderPriorityLevel = renderPriorityLevel.child;
        continue
      }
    } else if (commitUnmount(finishedRoot$jscomp$0, renderPriorityLevel), null !== renderPriorityLevel.child) {
      renderPriorityLevel.child.return = renderPriorityLevel;
      renderPriorityLevel = renderPriorityLevel.child;
      continue
    }
    if (renderPriorityLevel === current) break;
    for (; null === renderPriorityLevel.sibling;) {
      if (null === renderPriorityLevel.return || renderPriorityLevel.return === current) return;
      renderPriorityLevel =
        renderPriorityLevel.return;
      4 === renderPriorityLevel.tag && (currentParentIsValid = false)
    }
    renderPriorityLevel.sibling.return = renderPriorityLevel.return;
    renderPriorityLevel = renderPriorityLevel.sibling
  }
}

function commitWork(current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      var updateQueue = finishedWork.updateQueue;
      updateQueue = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== updateQueue) {
        var effect = updateQueue = updateQueue.next;
        do 3 === (effect.tag & 3) && (current = effect.destroy,
          effect.destroy = undefined, undefined !== current && current()), effect = effect.next; while (effect !== updateQueue)
      }
      return;
    case 1:
      return;
    case 5:
      updateQueue = finishedWork.stateNode;
      if (null != updateQueue) {
        effect = finishedWork.memoizedProps;
        var oldProps = null !== current ? current.memoizedProps : effect;
        current = finishedWork.type;
        var updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        if (null !== updatePayload) {
          updateQueue[internalPropsKey] = effect;
          "input" === current && "radio" === effect.type && null != effect.name && updateChecked(updateQueue,
            effect);
          isCustomComponent(current, oldProps);
          finishedWork = isCustomComponent(current, effect);
          for (oldProps = 0; oldProps < updatePayload.length; oldProps += 2) {
            var propKey = updatePayload[oldProps],
              propValue = updatePayload[oldProps + 1];
            "style" === propKey ? setValueForStyles(updateQueue, propValue) : "dangerouslySetInnerHTML" === propKey ? setInnerHTML(updateQueue, propValue) : "children" === propKey ? setTextContent(updateQueue, propValue) : setValueForProperty(updateQueue, propKey, propValue, finishedWork)
          }
          switch (current) {
            case "input":
              updateWrapper(updateQueue,
                effect);
              break;
            case "textarea":
              updateWrapper$1(updateQueue, effect);
              break;
            case "select":
              current = updateQueue._wrapperState.wasMultiple, updateQueue._wrapperState.wasMultiple = !!effect.multiple, updatePayload = effect.value, null != updatePayload ? updateOptions(updateQueue, !!effect.multiple, updatePayload, false) : current !== !!effect.multiple && (null != effect.defaultValue ? updateOptions(updateQueue, !!effect.multiple, effect.defaultValue, true) : updateOptions(updateQueue, !!effect.multiple, effect.multiple ? [] : "", false))
          }
        }
      }
      return;
    case 6:
      if (null === finishedWork.stateNode) throw Error(formatProdErrorMessage(162));
      finishedWork.stateNode.nodeValue = finishedWork.memoizedProps;
      return;
    case 3:
      updateQueue = finishedWork.stateNode;
      updateQueue.hydrate && (updateQueue.hydrate = false, retryIfBlockedOn(updateQueue.containerInfo));
      return;
    case 12:
      return;
    case 13:
      null !== finishedWork.memoizedState && (globalMostRecentFallbackTime = now(), hideOrUnhideAllChildren(finishedWork.child, true));
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 19:
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 17:
      return;
    case 23:
    case 24:
      hideOrUnhideAllChildren(finishedWork, null !== finishedWork.memoizedState);
      return
  }
  throw Error(formatProdErrorMessage(163));
}

function attachSuspenseRetryListeners(finishedWork) {
  var wakeables = finishedWork.updateQueue;
  if (null !== wakeables) {
    finishedWork.updateQueue = null;
    var retryCache = finishedWork.stateNode;
    null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet);
    wakeables.forEach(function (wakeable) {
      var retry = resolveRetryWakeable.bind(null, finishedWork,
        wakeable);
      retryCache.has(wakeable) || (retryCache.add(wakeable), wakeable.then(retry, retry))
    })
  }
}

function isSuspenseBoundaryBeingHidden(current, finishedWork) {
  return null !== current && (current = current.memoizedState, null === current || null !== current.dehydrated) ? (finishedWork = finishedWork.memoizedState, null !== finishedWork && null === finishedWork.dehydrated) : false
}

function resetRenderTimer() {
  workInProgressRootRenderTargetTime = now() + 500
}

function requestEventTime() {
  return 0 !== (executionContext & 48) ? now() : -1 !== currentEventTime ?
    currentEventTime : currentEventTime = now()
}

function requestUpdateLane(fiber) {
  fiber = fiber.mode;
  if (0 === (fiber & 2)) return 1;
  if (0 === (fiber & 4)) return 99 === getCurrentPriorityLevel() ? 1 : 2;
  0 === currentEventWipLanes && (currentEventWipLanes = workInProgressRootIncludedLanes);
  if (0 !== ReactCurrentBatchConfig.transition) {
    0 !== currentEventPendingLanes && (currentEventPendingLanes = null !== mostRecentlyUpdatedRoot ? mostRecentlyUpdatedRoot.pendingLanes : 0);
    fiber = currentEventWipLanes;
    var lane = 4186112 & ~currentEventPendingLanes;
    lane &=
      -lane;
    0 === lane && (fiber = 4186112 & ~fiber, lane = fiber & -fiber, 0 === lane && (lane = 8192));
    return lane
  }
  fiber = getCurrentPriorityLevel();
  0 !== (executionContext & 4) && 98 === fiber ? fiber = findUpdateLane(12, currentEventWipLanes) : (fiber = schedulerPriorityToLanePriority(fiber), fiber = findUpdateLane(fiber, currentEventWipLanes));
  return fiber
}

function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  if (50 < nestedUpdateCount) throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
  fiber = markUpdateLaneFromFiberToRoot(fiber,
    lane);
  if (null === fiber) return null;
  markRootUpdated(fiber, lane, eventTime);
  fiber === workInProgressRoot && (workInProgressRootUpdatedLanes |= lane, 4 === workInProgressRootExitStatus && markRootSuspended$1(fiber, workInProgressRootRenderLanes));
  var priorityLevel = getCurrentPriorityLevel();
  1 === lane ? 0 !== (executionContext & 8) && 0 === (executionContext & 48) ? performSyncWorkOnRoot(fiber) : (ensureRootIsScheduled(fiber, eventTime), 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue())) : (0 === (executionContext & 4) || 98 !==
    priorityLevel && 99 !== priorityLevel || (null === rootsWithPendingDiscreteUpdates ? rootsWithPendingDiscreteUpdates = new Set([fiber]) : rootsWithPendingDiscreteUpdates.add(fiber)), ensureRootIsScheduled(fiber, eventTime));
  mostRecentlyUpdatedRoot = fiber
}

function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
  sourceFiber.lanes |= lane;
  var alternate = sourceFiber.alternate;
  null !== alternate && (alternate.lanes |= lane);
  alternate = sourceFiber;
  for (sourceFiber = sourceFiber.return; null !== sourceFiber;) sourceFiber.childLanes |= lane,
    alternate = sourceFiber.alternate, null !== alternate && (alternate.childLanes |= lane), alternate = sourceFiber, sourceFiber = sourceFiber.return;
  return 3 === alternate.tag ? alternate.stateNode : null
}

function ensureRootIsScheduled(root, currentTime) {
  for (var existingCallbackNode = root.callbackNode, suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes, expirationTimes = root.expirationTimes, lanes = root.pendingLanes; 0 < lanes;) {
    var index$16 = 31 - clz32(lanes),
      lane = 1 << index$16,
      expirationTime = expirationTimes[index$16];
    if (-1 ===
      expirationTime) {
      if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes)) {
        expirationTime = currentTime;
        getHighestPriorityLanes(lane);
        var priority = return_highestLanePriority;
        expirationTimes[index$16] = 10 <= priority ? expirationTime + 250 : 6 <= priority ? expirationTime + 5E3 : -1
      }
    } else expirationTime <= currentTime && (root.expiredLanes |= lane);
    lanes &= ~lane
  }
  suspendedLanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : 0);
  currentTime = return_highestLanePriority;
  if (0 === suspendedLanes) null !== existingCallbackNode &&
    (existingCallbackNode !== fakeCallbackNode && Scheduler_cancelCallback(existingCallbackNode), root.callbackNode = null, root.callbackPriority = 0);
  else {
    if (null !== existingCallbackNode) {
      if (root.callbackPriority === currentTime) return;
      existingCallbackNode !== fakeCallbackNode && Scheduler_cancelCallback(existingCallbackNode)
    }
    15 === currentTime ? (existingCallbackNode = performSyncWorkOnRoot.bind(null, root), null === syncQueue ? (syncQueue = [existingCallbackNode], immediateQueueCallbackNode = Scheduler_scheduleCallback(Scheduler_ImmediatePriority,
      flushSyncCallbackQueueImpl)) : syncQueue.push(existingCallbackNode), existingCallbackNode = fakeCallbackNode) : 14 === currentTime ? existingCallbackNode = scheduleCallback(99, performSyncWorkOnRoot.bind(null, root)) : (existingCallbackNode = lanePriorityToSchedulerPriority(currentTime), existingCallbackNode = scheduleCallback(existingCallbackNode, performConcurrentWorkOnRoot.bind(null, root)));
    root.callbackPriority = currentTime;
    root.callbackNode = existingCallbackNode
  }
}

function performConcurrentWorkOnRoot(root) {
  currentEventTime = -1;
  currentEventPendingLanes = currentEventWipLanes = 0;
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  var originalCallbackNode = root.callbackNode;
  if (flushPassiveEffects() && root.callbackNode !== originalCallbackNode) return null;
  var lanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : 0);
  if (0 === lanes) return null;
  var exitStatus = lanes;
  var prevExecutionContext = executionContext;
  executionContext |= 16;
  var prevDispatcher = pushDispatcher();
  if (workInProgressRoot !== root ||
    workInProgressRootRenderLanes !== exitStatus) resetRenderTimer(), prepareFreshStack(root, exitStatus);
  do try {
    workLoopConcurrent();
    break
  } catch (thrownValue) {
    handleError(root, thrownValue)
  }
  while (1);
  resetContextDependencies();
  ReactCurrentDispatcher$2.current = prevDispatcher;
  executionContext = prevExecutionContext;
  null !== workInProgress ? exitStatus = 0 : (workInProgressRoot = null, workInProgressRootRenderLanes = 0, exitStatus = workInProgressRootExitStatus);
  if (0 !== (workInProgressRootIncludedLanes & workInProgressRootUpdatedLanes)) prepareFreshStack(root,
    0);
  else if (0 !== exitStatus) {
    2 === exitStatus && (executionContext |= 64, root.hydrate && (root.hydrate = false, clearContainer(root.containerInfo)), lanes = getLanesToRetrySynchronouslyOnError(root), 0 !== lanes && (exitStatus = renderRootSync(root, lanes)));
    if (1 === exitStatus) throw originalCallbackNode = workInProgressRootFatalError, prepareFreshStack(root, 0), markRootSuspended$1(root, lanes), ensureRootIsScheduled(root, now()), originalCallbackNode;
    root.finishedWork = root.current.alternate;
    root.finishedLanes = lanes;
    switch (exitStatus) {
      case 0:
      case 1:
        throw Error(formatProdErrorMessage(345));
      case 2:
        commitRoot(root);
        break;
      case 3:
        markRootSuspended$1(root, lanes);
        if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 500 - now(), 10 < exitStatus)) {
          if (0 !== getNextLanes(root, 0)) break;
          prevExecutionContext = root.suspendedLanes;
          if ((prevExecutionContext & lanes) !== lanes) {
            requestEventTime();
            root.pingedLanes |= root.suspendedLanes & prevExecutionContext;
            break
          }
          root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), exitStatus);
          break
        }
        commitRoot(root);
        break;
      case 4:
        markRootSuspended$1(root, lanes);
        if ((lanes & 4186112) === lanes) break;
        exitStatus = root.eventTimes;
        for (prevExecutionContext = -1; 0 < lanes;) {
          var index$15 = 31 - clz32(lanes);
          prevDispatcher = 1 << index$15;
          index$15 = exitStatus[index$15];
          index$15 > prevExecutionContext && (prevExecutionContext = index$15);
          lanes &= ~prevDispatcher
        }
        lanes = prevExecutionContext;
        lanes = now() - lanes;
        lanes = (120 > lanes ? 120 : 480 > lanes ? 480 : 1080 > lanes ? 1080 : 1920 > lanes ? 1920 : 3E3 > lanes ? 3E3 : 4320 > lanes ? 4320 : 1960 * ceil(lanes / 1960)) - lanes;
        if (10 < lanes) {
          root.timeoutHandle = scheduleTimeout(commitRoot.bind(null,
            root), lanes);
          break
        }
        commitRoot(root);
        break;
      case 5:
        commitRoot(root);
        break;
      default:
        throw Error(formatProdErrorMessage(329));
    }
  }
  ensureRootIsScheduled(root, now());
  return root.callbackNode === originalCallbackNode ? performConcurrentWorkOnRoot.bind(null, root) : null
}

function markRootSuspended$1(root, suspendedLanes) {
  suspendedLanes &= ~workInProgressRootPingedLanes;
  suspendedLanes &= ~workInProgressRootUpdatedLanes;
  root.suspendedLanes |= suspendedLanes;
  root.pingedLanes &= ~suspendedLanes;
  for (root = root.expirationTimes; 0 <
    suspendedLanes;) {
    var index$20 = 31 - clz32(suspendedLanes),
      lane = 1 << index$20;
    root[index$20] = -1;
    suspendedLanes &= ~lane
  }
}

function performSyncWorkOnRoot(root) {
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  if (root === workInProgressRoot && 0 !== (root.expiredLanes & workInProgressRootRenderLanes)) {
    var lanes = workInProgressRootRenderLanes;
    var exitStatus = renderRootSync(root, lanes);
    0 !== (workInProgressRootIncludedLanes & workInProgressRootUpdatedLanes) && (lanes = getNextLanes(root,
      lanes), exitStatus = renderRootSync(root, lanes))
  } else lanes = getNextLanes(root, 0), exitStatus = renderRootSync(root, lanes);
  0 !== root.tag && 2 === exitStatus && (executionContext |= 64, root.hydrate && (root.hydrate = false, clearContainer(root.containerInfo)), lanes = getLanesToRetrySynchronouslyOnError(root), 0 !== lanes && (exitStatus = renderRootSync(root, lanes)));
  if (1 === exitStatus) throw exitStatus = workInProgressRootFatalError, prepareFreshStack(root, 0), markRootSuspended$1(root, lanes), ensureRootIsScheduled(root, now()), exitStatus;
  root.finishedWork = root.current.alternate;
  root.finishedLanes = lanes;
  commitRoot(root);
  ensureRootIsScheduled(root, now());
  return null
}

function flushPendingDiscreteUpdates() {
  if (null !== rootsWithPendingDiscreteUpdates) {
    var roots = rootsWithPendingDiscreteUpdates;
    rootsWithPendingDiscreteUpdates = null;
    roots.forEach(function (root) {
      root.expiredLanes |= 24 & root.pendingLanes;
      ensureRootIsScheduled(root, now())
    })
  }
  flushSyncCallbackQueue()
}

function batchedUpdates$1(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |=
    1;
  try {
    return fn(a)
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue())
  }
}

function unbatchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext &= -2;
  executionContext |= 8;
  try {
    return fn(a)
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue())
  }
}

function flushSync(fn, a) {
  var prevExecutionContext = executionContext;
  if (0 !== (prevExecutionContext & 48)) return fn(a);
  executionContext |=
    1;
  try {
    if (fn) return runWithPriority$1(99, fn.bind(null, a))
  } finally {
    executionContext = prevExecutionContext, flushSyncCallbackQueue()
  }
}

function pushRenderLanes(fiber, lanes) {
  push(subtreeRenderLanesCursor, subtreeRenderLanes);
  subtreeRenderLanes |= lanes;
  workInProgressRootIncludedLanes |= lanes
}

function prepareFreshStack(root, lanes) {
  root.finishedWork = null;
  root.finishedLanes = 0;
  var timeoutHandle = root.timeoutHandle; - 1 !== timeoutHandle && (root.timeoutHandle = -1, cancelTimeout(timeoutHandle));
  if (null !== workInProgress)
    for (timeoutHandle =
      workInProgress.return; null !== timeoutHandle;) {
      var interruptedWork = timeoutHandle;
      switch (interruptedWork.tag) {
        case 1:
          interruptedWork = interruptedWork.type.childContextTypes;
          null !== interruptedWork && undefined !== interruptedWork && (pop(didPerformWorkStackCursor), pop(contextStackCursor));
          break;
        case 3:
          popHostContainer();
          pop(didPerformWorkStackCursor);
          pop(contextStackCursor);
          resetWorkInProgressVersions();
          break;
        case 5:
          popHostContext(interruptedWork);
          break;
        case 4:
          popHostContainer();
          break;
        case 13:
          pop(suspenseStackCursor);
          break;
        case 19:
          pop(suspenseStackCursor);
          break;
        case 10:
          popProvider(interruptedWork);
          break;
        case 23:
        case 24:
          subtreeRenderLanes = subtreeRenderLanesCursor.current, pop(subtreeRenderLanesCursor)
      }
      timeoutHandle = timeoutHandle.return
    }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null);
  workInProgressRootRenderLanes = subtreeRenderLanes = workInProgressRootIncludedLanes = lanes;
  workInProgressRootExitStatus = 0;
  workInProgressRootFatalError = null;
  workInProgressRootPingedLanes = workInProgressRootUpdatedLanes =
    workInProgressRootSkippedLanes = 0
}

function handleError(root$jscomp$0, thrownValue) {
  do {
    var erroredWork = workInProgress;
    try {
      resetContextDependencies();
      ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
      if (didScheduleRenderPhaseUpdate) {
        for (var hook = currentlyRenderingFiber$1.memoizedState; null !== hook;) {
          var queue = hook.queue;
          null !== queue && (queue.pending = null);
          hook = hook.next
        }
        didScheduleRenderPhaseUpdate = false
      }
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      ReactCurrentOwner$2.current = null;
      if (null === erroredWork || null === erroredWork.return) {
        workInProgressRootExitStatus = 1;
        workInProgressRootFatalError = thrownValue;
        workInProgress = null;
        break
      }
      a: {
        var root = root$jscomp$0,
          returnFiber = erroredWork.return,
          sourceFiber = erroredWork,
          value = thrownValue;
        thrownValue = workInProgressRootRenderLanes;
        sourceFiber.flags |= 2048;
        sourceFiber.firstEffect = sourceFiber.lastEffect = null;
        if (null !== value && "object" === typeof value && "function" === typeof value.then) {
          var wakeable = value;
          if (0 ===
            (sourceFiber.mode & 2)) {
            var currentSource = sourceFiber.alternate;
            currentSource ? (sourceFiber.updateQueue = currentSource.updateQueue, sourceFiber.memoizedState = currentSource.memoizedState, sourceFiber.lanes = currentSource.lanes) : (sourceFiber.updateQueue = null, sourceFiber.memoizedState = null)
          }
          var hasInvisibleParentBoundary = 0 !== (suspenseStackCursor.current & 1),
            workInProgress$105 = returnFiber;
          do {
            var JSCompiler_temp;
            if (JSCompiler_temp = 13 === workInProgress$105.tag) {
              var nextState = workInProgress$105.memoizedState;
              if (null !==
                nextState) JSCompiler_temp = null !== nextState.dehydrated ? true : false;
              else {
                var props = workInProgress$105.memoizedProps;
                JSCompiler_temp = undefined === props.fallback ? false : true !== props.unstable_avoidThisFallback ? true : hasInvisibleParentBoundary ? false : true
              }
            }
            if (JSCompiler_temp) {
              var wakeables = workInProgress$105.updateQueue;
              if (null === wakeables) {
                var updateQueue = new Set;
                updateQueue.add(wakeable);
                workInProgress$105.updateQueue = updateQueue
              } else wakeables.add(wakeable); if (0 === (workInProgress$105.mode & 2)) {
                workInProgress$105.flags |= 64;
                sourceFiber.flags |=
                  16384;
                sourceFiber.flags &= -2981;
                if (1 === sourceFiber.tag)
                  if (null === sourceFiber.alternate) sourceFiber.tag = 17;
                  else {
                    var update = createUpdate(-1, 1);
                    update.tag = 2;
                    enqueueUpdate(sourceFiber, update)
                  }
                sourceFiber.lanes |= 1;
                break a
              }
              value = undefined;
              sourceFiber = thrownValue;
              var pingCache = root.pingCache;
              null === pingCache ? (pingCache = root.pingCache = new PossiblyWeakMap, value = new Set, pingCache.set(wakeable, value)) : (value = pingCache.get(wakeable), undefined === value && (value = new Set, pingCache.set(wakeable, value)));
              if (!value.has(sourceFiber)) {
                value.add(sourceFiber);
                var ping = pingSuspendedRoot.bind(null, root, wakeable, sourceFiber);
                wakeable.then(ping, ping)
              }
              workInProgress$105.flags |= 4096;
              workInProgress$105.lanes = thrownValue;
              break a
            }
            workInProgress$105 = workInProgress$105.return
          } while (null !== workInProgress$105);
          value = Error((getComponentName(sourceFiber.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")
        }
        5 !==
          workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
        value = createCapturedValue(value, sourceFiber);
        workInProgress$105 = returnFiber;
        do {
          switch (workInProgress$105.tag) {
            case 3:
              root = value;
              workInProgress$105.flags |= 4096;
              thrownValue &= -thrownValue;
              workInProgress$105.lanes |= thrownValue;
              var update$106 = createRootErrorUpdate(workInProgress$105, root, thrownValue);
              enqueueCapturedUpdate(workInProgress$105, update$106);
              break a;
            case 1:
              root = value;
              var ctor = workInProgress$105.type,
                instance = workInProgress$105.stateNode;
              if (0 === (workInProgress$105.flags & 64) && ("function" === typeof ctor.getDerivedStateFromError || null !== instance && "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance)))) {
                workInProgress$105.flags |= 4096;
                thrownValue &= -thrownValue;
                workInProgress$105.lanes |= thrownValue;
                var update$109 = createClassErrorUpdate(workInProgress$105, root, thrownValue);
                enqueueCapturedUpdate(workInProgress$105, update$109);
                break a
              }
          }
          workInProgress$105 =
            workInProgress$105.return
        } while (null !== workInProgress$105)
      }
      completeUnitOfWork(erroredWork)
    } catch (yetAnotherThrownValue) {
      thrownValue = yetAnotherThrownValue;
      workInProgress === erroredWork && null !== erroredWork && (workInProgress = erroredWork = erroredWork.return);
      continue
    }
    break
  } while (1)
}

function pushDispatcher() {
  var prevDispatcher = ReactCurrentDispatcher$2.current;
  ReactCurrentDispatcher$2.current = ContextOnlyDispatcher;
  return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher
}

function renderDidSuspendDelayIfPossible() {
  if (0 ===
    workInProgressRootExitStatus || 3 === workInProgressRootExitStatus) workInProgressRootExitStatus = 4;
  null === workInProgressRoot || 0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootUpdatedLanes & 134217727) || markRootSuspended$1(workInProgressRoot, workInProgressRootRenderLanes)
}

function renderRootSync(root, lanes) {
  var prevExecutionContext = executionContext;
  executionContext |= 16;
  var prevDispatcher = pushDispatcher();
  workInProgressRoot === root && workInProgressRootRenderLanes === lanes || prepareFreshStack(root,
    lanes);
  do try {
    workLoopSync();
    break
  } catch (thrownValue) {
    handleError(root, thrownValue)
  }
  while (1);
  resetContextDependencies();
  executionContext = prevExecutionContext;
  ReactCurrentDispatcher$2.current = prevDispatcher;
  if (null !== workInProgress) throw Error(formatProdErrorMessage(261));
  workInProgressRoot = null;
  workInProgressRootRenderLanes = 0;
  return workInProgressRootExitStatus
}

function workLoopSync() {
  for (; null !== workInProgress;) performUnitOfWork(workInProgress)
}

function workLoopConcurrent() {
  for (; null !== workInProgress &&
    !shouldYield();) performUnitOfWork(workInProgress)
}

function performUnitOfWork(unitOfWork) {
  var next = beginWork$1(unitOfWork.alternate, unitOfWork, subtreeRenderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  ReactCurrentOwner$2.current = null
}

function completeUnitOfWork(unitOfWork) {
  var completedWork = unitOfWork;
  do {
    var current = completedWork.alternate;
    unitOfWork = completedWork.return;
    if (0 === (completedWork.flags & 2048)) {
      current = completeWork(current,
        completedWork, subtreeRenderLanes);
      if (null !== current) {
        workInProgress = current;
        return
      }
      current = completedWork;
      if (24 !== current.tag && 23 !== current.tag || null === current.memoizedState || 0 !== (subtreeRenderLanes & 1073741824) || 0 === (current.mode & 4)) {
        for (var newChildLanes = 0, child = current.child; null !== child;) newChildLanes |= child.lanes | child.childLanes, child = child.sibling;
        current.childLanes = newChildLanes
      }
      null !== unitOfWork && 0 === (unitOfWork.flags & 2048) && (null === unitOfWork.firstEffect && (unitOfWork.firstEffect = completedWork.firstEffect),
        null !== completedWork.lastEffect && (null !== unitOfWork.lastEffect && (unitOfWork.lastEffect.nextEffect = completedWork.firstEffect), unitOfWork.lastEffect = completedWork.lastEffect), 1 < completedWork.flags && (null !== unitOfWork.lastEffect ? unitOfWork.lastEffect.nextEffect = completedWork : unitOfWork.firstEffect = completedWork, unitOfWork.lastEffect = completedWork))
    } else {
      current = unwindWork(completedWork);
      if (null !== current) {
        current.flags &= 2047;
        workInProgress = current;
        return
      }
      null !== unitOfWork && (unitOfWork.firstEffect = unitOfWork.lastEffect =
        null, unitOfWork.flags |= 2048)
    }
    completedWork = completedWork.sibling;
    if (null !== completedWork) {
      workInProgress = completedWork;
      return
    }
    workInProgress = completedWork = unitOfWork
  } while (null !== completedWork);
  0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5)
}

function commitRoot(root) {
  var renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority$1(99, commitRootImpl.bind(null, root, renderPriorityLevel));
  return null
}

function commitRootImpl(root, renderPriorityLevel) {
  do flushPassiveEffects(); while (null !==
    rootWithPendingPassiveEffects);
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  var finishedWork = root.finishedWork;
  if (null === finishedWork) return null;
  root.finishedWork = null;
  root.finishedLanes = 0;
  if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
  root.callbackNode = null;
  var remainingLanes = finishedWork.lanes | finishedWork.childLanes,
    remainingLanes$jscomp$0 = remainingLanes,
    noLongerPendingLanes = root.pendingLanes & ~remainingLanes$jscomp$0;
  root.pendingLanes = remainingLanes$jscomp$0;
  root.suspendedLanes = 0;
  root.pingedLanes = 0;
  root.expiredLanes &= remainingLanes$jscomp$0;
  root.mutableReadLanes &= remainingLanes$jscomp$0;
  root.entangledLanes &= remainingLanes$jscomp$0;
  remainingLanes$jscomp$0 = root.entanglements;
  for (var eventTimes = root.eventTimes, expirationTimes = root.expirationTimes; 0 < noLongerPendingLanes;) {
    var index$21 = 31 - clz32(noLongerPendingLanes),
      lane = 1 << index$21;
    remainingLanes$jscomp$0[index$21] = 0;
    eventTimes[index$21] = -1;
    expirationTimes[index$21] = -1;
    noLongerPendingLanes &= ~lane
  }
  null !==
    rootsWithPendingDiscreteUpdates && 0 === (remainingLanes & 24) && rootsWithPendingDiscreteUpdates.has(root) && rootsWithPendingDiscreteUpdates.delete(root);
  root === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
  1 < finishedWork.flags ? null !== finishedWork.lastEffect ? (finishedWork.lastEffect.nextEffect = finishedWork, remainingLanes = finishedWork.firstEffect) : remainingLanes = finishedWork : remainingLanes = finishedWork.firstEffect;
  if (null !== remainingLanes) {
    remainingLanes$jscomp$0 =
      executionContext;
    executionContext |= 32;
    ReactCurrentOwner$2.current = null;
    eventsEnabled = _enabled;
    eventTimes = getActiveElementDeep();
    if (hasSelectionCapabilities(eventTimes)) {
      if ("selectionStart" in eventTimes) expirationTimes = {
        start: eventTimes.selectionStart,
        end: eventTimes.selectionEnd
      };
      else a: if (expirationTimes = (expirationTimes = eventTimes.ownerDocument) && expirationTimes.defaultView || window, (lane = expirationTimes.getSelection && expirationTimes.getSelection()) && 0 !== lane.rangeCount) {
        expirationTimes = lane.anchorNode;
        noLongerPendingLanes = lane.anchorOffset;
        index$21 = lane.focusNode;
        lane = lane.focusOffset;
        try {
          expirationTimes.nodeType, index$21.nodeType
        } catch (e$25) {
          expirationTimes = null;
          break a
        }
        var length = 0,
          start = -1,
          end = -1,
          indexWithinAnchor = 0,
          indexWithinFocus = 0,
          node = eventTimes,
          parentNode = null;
        b: for (; ;) {
          for (var next; ;) {
            node !== expirationTimes || 0 !== noLongerPendingLanes && 3 !== node.nodeType || (start = length + noLongerPendingLanes);
            node !== index$21 || 0 !== lane && 3 !== node.nodeType || (end = length + lane);
            3 === node.nodeType && (length += node.nodeValue.length);
            if (null === (next = node.firstChild)) break;
            parentNode = node;
            node = next
          }
          for (; ;) {
            if (node === eventTimes) break b;
            parentNode === expirationTimes && ++indexWithinAnchor === noLongerPendingLanes && (start = length);
            parentNode === index$21 && ++indexWithinFocus === lane && (end = length);
            if (null !== (next = node.nextSibling)) break;
            node = parentNode;
            parentNode = node.parentNode
          }
          node = next
        }
        expirationTimes = -1 === start || -1 === end ? null : {
          start: start,
          end: end
        }
      } else expirationTimes = null;
      expirationTimes = expirationTimes || {
        start: 0,
        end: 0
      }
    } else expirationTimes =
      null;
    selectionInformation = {
      focusedElem: eventTimes,
      selectionRange: expirationTimes
    };
    _enabled = false;
    focusedInstanceHandle = null;
    shouldFireAfterActiveInstanceBlur = false;
    nextEffect = remainingLanes;
    do try {
      commitBeforeMutationEffects()
    } catch (error) {
      if (null === nextEffect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect
    }
    while (null !== nextEffect);
    focusedInstanceHandle = null;
    nextEffect = remainingLanes;
    do try {
      for (eventTimes = root; null !== nextEffect;) {
        var flags =
          nextEffect.flags;
        flags & 16 && setTextContent(nextEffect.stateNode, "");
        if (flags & 128) {
          var current = nextEffect.alternate;
          if (null !== current) {
            var currentRef = current.ref;
            null !== currentRef && ("function" === typeof currentRef ? currentRef(null) : currentRef.current = null)
          }
        }
        switch (flags & 1038) {
          case 2:
            commitPlacement(nextEffect);
            nextEffect.flags &= -3;
            break;
          case 6:
            commitPlacement(nextEffect);
            nextEffect.flags &= -3;
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 1024:
            nextEffect.flags &= -1025;
            break;
          case 1028:
            nextEffect.flags &=
              -1025;
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 4:
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 8:
            expirationTimes = nextEffect;
            unmountHostComponents(eventTimes, expirationTimes);
            var alternate = expirationTimes.alternate;
            detachFiberMutation(expirationTimes);
            null !== alternate && detachFiberMutation(alternate)
        }
        nextEffect = nextEffect.nextEffect
      }
    } catch (error$119) {
      if (null === nextEffect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error$119);
      nextEffect = nextEffect.nextEffect
    }
    while (null !==
      nextEffect);
    currentRef = selectionInformation;
    current = getActiveElementDeep();
    flags = currentRef.focusedElem;
    eventTimes = currentRef.selectionRange;
    if (current !== flags && flags && flags.ownerDocument && containsNode(flags.ownerDocument.documentElement, flags)) {
      null !== eventTimes && hasSelectionCapabilities(flags) && (current = eventTimes.start, currentRef = eventTimes.end, undefined === currentRef && (currentRef = current), "selectionStart" in flags ? (flags.selectionStart = current, flags.selectionEnd = Math.min(currentRef, flags.value.length)) :
        (currentRef = (current = flags.ownerDocument || document) && current.defaultView || window, currentRef.getSelection && (currentRef = currentRef.getSelection(), expirationTimes = flags.textContent.length, alternate = Math.min(eventTimes.start, expirationTimes), eventTimes = undefined === eventTimes.end ? alternate : Math.min(eventTimes.end, expirationTimes), !currentRef.extend && alternate > eventTimes && (expirationTimes = eventTimes, eventTimes = alternate, alternate = expirationTimes), expirationTimes = getNodeForCharacterOffset(flags, alternate),
          noLongerPendingLanes = getNodeForCharacterOffset(flags, eventTimes), expirationTimes && noLongerPendingLanes && (1 !== currentRef.rangeCount || currentRef.anchorNode !== expirationTimes.node || currentRef.anchorOffset !== expirationTimes.offset || currentRef.focusNode !== noLongerPendingLanes.node || currentRef.focusOffset !== noLongerPendingLanes.offset) && (current = current.createRange(), current.setStart(expirationTimes.node, expirationTimes.offset), currentRef.removeAllRanges(), alternate > eventTimes ? (currentRef.addRange(current),
            currentRef.extend(noLongerPendingLanes.node, noLongerPendingLanes.offset)) : (current.setEnd(noLongerPendingLanes.node, noLongerPendingLanes.offset), currentRef.addRange(current))))));
      current = [];
      for (currentRef = flags; currentRef = currentRef.parentNode;) 1 === currentRef.nodeType && current.push({
        element: currentRef,
        left: currentRef.scrollLeft,
        top: currentRef.scrollTop
      });
      "function" === typeof flags.focus && flags.focus();
      for (flags = 0; flags < current.length; flags++) currentRef = current[flags], currentRef.element.scrollLeft =
        currentRef.left, currentRef.element.scrollTop = currentRef.top
    }
    _enabled = !!eventsEnabled;
    selectionInformation = eventsEnabled = null;
    root.current = finishedWork;
    nextEffect = remainingLanes;
    do try {
      for (flags = root; null !== nextEffect;) {
        var flags$jscomp$0 = nextEffect.flags;
        flags$jscomp$0 & 36 && commitLifeCycles(flags, nextEffect.alternate, nextEffect);
        if (flags$jscomp$0 & 128) {
          current = undefined;
          var ref = nextEffect.ref;
          if (null !== ref) {
            var instance = nextEffect.stateNode;
            switch (nextEffect.tag) {
              case 5:
                current = instance;
                break;
              default:
                current =
                  instance
            }
            "function" === typeof ref ? ref(current) : ref.current = current
          }
        }
        nextEffect = nextEffect.nextEffect
      }
    } catch (error$120) {
      if (null === nextEffect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error$120);
      nextEffect = nextEffect.nextEffect
    }
    while (null !== nextEffect);
    nextEffect = null;
    requestPaint();
    executionContext = remainingLanes$jscomp$0
  } else root.current = finishedWork; if (rootDoesHavePassiveEffects) rootDoesHavePassiveEffects = false, rootWithPendingPassiveEffects = root, pendingPassiveEffectsRenderPriority =
    renderPriorityLevel;
  else
    for (nextEffect = remainingLanes; null !== nextEffect;) renderPriorityLevel = nextEffect.nextEffect, nextEffect.nextEffect = null, nextEffect.flags & 8 && (flags$jscomp$0 = nextEffect, flags$jscomp$0.sibling = null, flags$jscomp$0.stateNode = null), nextEffect = renderPriorityLevel;
  remainingLanes = root.pendingLanes;
  0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
  1 === remainingLanes ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : nestedUpdateCount =
    0;
  finishedWork = finishedWork.stateNode;
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot) try {
    injectedHook.onCommitFiberRoot(rendererID, finishedWork, undefined, 64 === (finishedWork.current.flags & 64))
  } catch (err) { }
  ensureRootIsScheduled(root, now());
  if (hasUncaughtError) throw hasUncaughtError = false, root = firstUncaughtError, firstUncaughtError = null, root;
  if (0 !== (executionContext & 8)) return null;
  flushSyncCallbackQueue();
  return null
}

function commitBeforeMutationEffects() {
  for (; null !== nextEffect;) {
    var current =
      nextEffect.alternate;
    shouldFireAfterActiveInstanceBlur || null === focusedInstanceHandle || (0 !== (nextEffect.flags & 8) ? doesFiberContain(nextEffect, focusedInstanceHandle) && (shouldFireAfterActiveInstanceBlur = true) : 13 === nextEffect.tag && isSuspenseBoundaryBeingHidden(current, nextEffect) && doesFiberContain(nextEffect, focusedInstanceHandle) && (shouldFireAfterActiveInstanceBlur = true));
    var flags = nextEffect.flags;
    0 !== (flags & 256) && commitBeforeMutationLifeCycles(current, nextEffect);
    0 === (flags & 512) || rootDoesHavePassiveEffects ||
      (rootDoesHavePassiveEffects = true, scheduleCallback(97, function () {
        flushPassiveEffects();
        return null
      }));
    nextEffect = nextEffect.nextEffect
  }
}

function flushPassiveEffects() {
  if (90 !== pendingPassiveEffectsRenderPriority) {
    var priorityLevel = 97 < pendingPassiveEffectsRenderPriority ? 97 : pendingPassiveEffectsRenderPriority;
    pendingPassiveEffectsRenderPriority = 90;
    return runWithPriority$1(priorityLevel, flushPassiveEffectsImpl)
  }
  return false
}

function enqueuePendingPassiveHookEffectMount(fiber, effect) {
  pendingPassiveHookEffectsMount.push(effect,
    fiber);
  rootDoesHavePassiveEffects || (rootDoesHavePassiveEffects = true, scheduleCallback(97, function () {
    flushPassiveEffects();
    return null
  }))
}

function enqueuePendingPassiveHookEffectUnmount(fiber, effect) {
  pendingPassiveHookEffectsUnmount.push(effect, fiber);
  rootDoesHavePassiveEffects || (rootDoesHavePassiveEffects = true, scheduleCallback(97, function () {
    flushPassiveEffects();
    return null
  }))
}

function flushPassiveEffectsImpl() {
  if (null === rootWithPendingPassiveEffects) return false;
  var root = rootWithPendingPassiveEffects;
  rootWithPendingPassiveEffects =
    null;
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(331));
  var prevExecutionContext = executionContext;
  executionContext |= 32;
  var unmountEffects = pendingPassiveHookEffectsUnmount;
  pendingPassiveHookEffectsUnmount = [];
  for (var i = 0; i < unmountEffects.length; i += 2) {
    var effect$125 = unmountEffects[i],
      fiber = unmountEffects[i + 1],
      destroy = effect$125.destroy;
    effect$125.destroy = undefined;
    if ("function" === typeof destroy) try {
      destroy()
    } catch (error) {
      if (null === fiber) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(fiber,
        error)
    }
  }
  unmountEffects = pendingPassiveHookEffectsMount;
  pendingPassiveHookEffectsMount = [];
  for (i = 0; i < unmountEffects.length; i += 2) {
    effect$125 = unmountEffects[i];
    fiber = unmountEffects[i + 1];
    try {
      var create = effect$125.create;
      effect$125.destroy = create()
    } catch (error$129) {
      if (null === fiber) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(fiber, error$129)
    }
  }
  for (create = root.current.firstEffect; null !== create;) root = create.nextEffect, create.nextEffect = null, create.flags & 8 && (create.sibling = null, create.stateNode =
    null), create = root;
  executionContext = prevExecutionContext;
  flushSyncCallbackQueue();
  return true
}

function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1);
  enqueueUpdate(rootFiber, sourceFiber);
  sourceFiber = requestEventTime();
  rootFiber = markUpdateLaneFromFiberToRoot(rootFiber, 1);
  null !== rootFiber && (markRootUpdated(rootFiber, 1, sourceFiber), ensureRootIsScheduled(rootFiber, sourceFiber))
}

function captureCommitPhaseError(sourceFiber,
  error) {
  if (3 === sourceFiber.tag) captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
  else
    for (var fiber = sourceFiber.return; null !== fiber;) {
      if (3 === fiber.tag) {
        captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
        break
      } else if (1 === fiber.tag) {
        var instance = fiber.stateNode;
        if ("function" === typeof fiber.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
          sourceFiber = createCapturedValue(error,
            sourceFiber);
          var update = createClassErrorUpdate(fiber, sourceFiber, 1);
          enqueueUpdate(fiber, update);
          update = requestEventTime();
          fiber = markUpdateLaneFromFiberToRoot(fiber, 1);
          if (null !== fiber) markRootUpdated(fiber, 1, update), ensureRootIsScheduled(fiber, update);
          else if ("function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) try {
            instance.componentDidCatch(error, sourceFiber)
          } catch (errorToIgnore) { }
          break
        }
      }
      fiber = fiber.return
    }
}

function pingSuspendedRoot(root, wakeable, pingedLanes) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(wakeable);
  wakeable = requestEventTime();
  root.pingedLanes |= root.suspendedLanes & pingedLanes;
  workInProgressRoot === root && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 500 > now() - globalMostRecentFallbackTime ? prepareFreshStack(root, 0) : workInProgressRootPingedLanes |=
    pingedLanes);
  ensureRootIsScheduled(root, wakeable)
}

function retryTimedOutBoundary(boundaryFiber, retryLane) {
  0 === retryLane && (retryLane = boundaryFiber.mode, 0 === (retryLane & 2) ? retryLane = 1 : 0 === (retryLane & 4) ? retryLane = 99 === getCurrentPriorityLevel() ? 1 : 2 : (0 === currentEventWipLanes && (currentEventWipLanes = workInProgressRootIncludedLanes), retryLane = getHighestPriorityLane(62914560 & ~currentEventWipLanes), 0 === retryLane && (retryLane = 4194304)));
  var eventTime = requestEventTime();
  boundaryFiber = markUpdateLaneFromFiberToRoot(boundaryFiber,
    retryLane);
  null !== boundaryFiber && (markRootUpdated(boundaryFiber, retryLane, eventTime), ensureRootIsScheduled(boundaryFiber, eventTime))
}

function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState,
    retryLane = 0;
  null !== suspenseState && (retryLane = suspenseState.retryLane);
  retryTimedOutBoundary(boundaryFiber, retryLane)
}

function resolveRetryWakeable(boundaryFiber, wakeable) {
  var retryLane = 0;
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      var suspenseState =
        boundaryFiber.memoizedState;
      null !== suspenseState && (retryLane = suspenseState.retryLane);
      break;
    case 19:
      retryCache = boundaryFiber.stateNode;
      break;
    default:
      throw Error(formatProdErrorMessage(314));
  }
  null !== retryCache && retryCache.delete(wakeable);
  retryTimedOutBoundary(boundaryFiber, retryLane)
}

function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies =
    this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.flags = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null
}

function shouldConstruct(Component) {
  Component = Component.prototype;
  return !(!Component || !Component.isReactComponent)
}

function resolveLazyComponentTag(Component) {
  if ("function" === typeof Component) return shouldConstruct(Component) ? 1 : 0;
  if (undefined !== Component && null !== Component) {
    Component = Component.$$typeof;
    if (Component ===
      REACT_FORWARD_REF_TYPE) return 11;
    if (Component === REACT_MEMO_TYPE) return 14;
    if (Component === REACT_BLOCK_TYPE) return 22
  }
  return 2
}

function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;
  null === workInProgress ? (workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) :
    (workInProgress.pendingProps = pendingProps, workInProgress.type = current.type, workInProgress.flags = 0, workInProgress.nextEffect = null, workInProgress.firstEffect = null, workInProgress.lastEffect = null);
  workInProgress.childLanes = current.childLanes;
  workInProgress.lanes = current.lanes;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  pendingProps = current.dependencies;
  workInProgress.dependencies =
    null === pendingProps ? null : {
      lanes: pendingProps.lanes,
      firstContext: pendingProps.firstContext
    };
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  return workInProgress
}

function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type) fiberTag = 5;
  else a: switch (type) {
    case REACT_FRAGMENT_TYPE:
      return createFiberFromFragment(pendingProps.children,
        mode, lanes, key);
    case REACT_DEBUG_TRACING_MODE_TYPE:
      fiberTag = 8;
      mode |= 16;
      break;
    case REACT_STRICT_MODE_TYPE:
      fiberTag = 8;
      mode |= 1;
      break;
    case REACT_PROFILER_TYPE:
      return type = createFiber(12, pendingProps, key, mode | 8), type.elementType = REACT_PROFILER_TYPE, type.type = REACT_PROFILER_TYPE, type.lanes = lanes, type;
    case REACT_SUSPENSE_TYPE:
      return type = createFiber(13, pendingProps, key, mode), type.type = REACT_SUSPENSE_TYPE, type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
    case REACT_SUSPENSE_LIST_TYPE:
      return type =
        createFiber(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
    case REACT_OFFSCREEN_TYPE:
      return createFiberFromOffscreen(pendingProps, mode, lanes, key);
    case REACT_LEGACY_HIDDEN_TYPE:
      return type = createFiber(24, pendingProps, key, mode), type.elementType = REACT_LEGACY_HIDDEN_TYPE, type.lanes = lanes, type;
    default:
      if ("object" === typeof type && null !== type) switch (type.$$typeof) {
        case REACT_PROVIDER_TYPE:
          fiberTag = 10;
          break a;
        case REACT_CONTEXT_TYPE:
          fiberTag = 9;
          break a;
        case REACT_FORWARD_REF_TYPE:
          fiberTag =
            11;
          break a;
        case REACT_MEMO_TYPE:
          fiberTag = 14;
          break a;
        case REACT_LAZY_TYPE:
          fiberTag = 16;
          owner = null;
          break a;
        case REACT_BLOCK_TYPE:
          fiberTag = 22;
          break a
      }
      throw Error(formatProdErrorMessage(130, null == type ? type : typeof type, ""));
  }
  key = createFiber(fiberTag, pendingProps, key, mode);
  key.elementType = type;
  key.type = owner;
  key.lanes = lanes;
  return key
}

function createFiberFromFragment(elements, mode, lanes, key) {
  elements = createFiber(7, elements, key, mode);
  elements.lanes = lanes;
  return elements
}

function createFiberFromOffscreen(pendingProps,
  mode, lanes, key) {
  pendingProps = createFiber(23, pendingProps, key, mode);
  pendingProps.elementType = REACT_OFFSCREEN_TYPE;
  pendingProps.lanes = lanes;
  return pendingProps
}

function createFiberFromText(content, mode, lanes) {
  content = createFiber(6, content, null, mode);
  content.lanes = lanes;
  return content
}

function createFiberFromPortal(portal, mode, lanes) {
  mode = createFiber(4, null !== portal.children ? portal.children : [], portal.key, mode);
  mode.lanes = lanes;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode
}

function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority = 0;
  this.eventTimes = createLaneMap(0);
  this.expirationTimes = createLaneMap(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes =
    0;
  this.entanglements = createLaneMap(0);
  this.mutableSourceEagerHydrationData = null
}

function createPortal(children, containerInfo, implementation) {
  var key = 3 < arguments.length && undefined !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: null == key ? null : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  }
}

function updateContainer(element, container, parentComponent, callback) {
  var current = container.current,
    eventTime = requestEventTime(),
    lane = requestUpdateLane(current);
  a: if (parentComponent) {
    parentComponent = parentComponent._reactInternals;
    b: {
      if (getNearestMountedFiber(parentComponent) !== parentComponent || 1 !== parentComponent.tag) throw Error(formatProdErrorMessage(170));
      var JSCompiler_inline_result = parentComponent;
      do {
        switch (JSCompiler_inline_result.tag) {
          case 3:
            JSCompiler_inline_result = JSCompiler_inline_result.stateNode.context;
            break b;
          case 1:
            if (isContextProvider(JSCompiler_inline_result.type)) {
              JSCompiler_inline_result = JSCompiler_inline_result.stateNode.__reactInternalMemoizedMergedChildContext;
              break b
            }
        }
        JSCompiler_inline_result = JSCompiler_inline_result.return
      } while (null !== JSCompiler_inline_result);
      throw Error(formatProdErrorMessage(171));
    }
    if (1 === parentComponent.tag) {
      var Component = parentComponent.type;
      if (isContextProvider(Component)) {
        parentComponent = processChildContext(parentComponent, Component, JSCompiler_inline_result);
        break a
      }
    }
    parentComponent = JSCompiler_inline_result
  } else parentComponent = emptyContextObject;
  null === container.context ? container.context = parentComponent : container.pendingContext =
    parentComponent;
  container = createUpdate(eventTime, lane);
  container.payload = {
    element: element
  };
  callback = undefined === callback ? null : callback;
  null !== callback && (container.callback = callback);
  enqueueUpdate(current, container);
  scheduleUpdateOnFiber(current, lane, eventTime);
  return lane
}

function getPublicRootInstance(container) {
  container = container.current;
  if (!container.child) return null;
  switch (container.child.tag) {
    case 5:
      return container.child.stateNode;
    default:
      return container.child.stateNode
  }
}

function markRetryLaneImpl(fiber,
  retryLane) {
  fiber = fiber.memoizedState;
  if (null !== fiber && null !== fiber.dehydrated) {
    var a = fiber.retryLane;
    fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane
  }
}

function markRetryLaneIfNotHydrated(fiber, retryLane) {
  markRetryLaneImpl(fiber, retryLane);
  (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane)
}

function runWithPriority$2(priority, fn) {
  var previousPriority = currentUpdateLanePriority;
  try {
    return currentUpdateLanePriority = priority, fn()
  } finally {
    currentUpdateLanePriority = previousPriority
  }
}

function findHostInstanceByFiber(fiber) {
  fiber =
    findCurrentHostFiber(fiber);
  return null === fiber ? null : fiber.stateNode
}

function emptyFindFiberByHostInstance(instance) {
  return null
}

function ReactDOMRoot(container, options) {
  this._internalRoot = createRootImpl(container, 2, options)
}

function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options)
}

function createRootImpl(container, tag, options) {
  var mutableSources = null != options && null != options.hydrationOptions && options.hydrationOptions.mutableSources || null;
  options =
    new FiberRootNode(container, tag, null != options && true === options.hydrate);
  tag = createFiber(3, null, null, 2 === tag ? 7 : 1 === tag ? 3 : 0);
  options.current = tag;
  tag.stateNode = options;
  initializeUpdateQueue(tag);
  container[internalContainerInstanceKey] = options.current;
  listenToAllSupportedEvents(8 === container.nodeType ? container.parentNode : container);
  if (mutableSources)
    for (container = 0; container < mutableSources.length; container++) {
      tag = mutableSources[container];
      var getVersion = tag._getVersion;
      getVersion = getVersion(tag._source);
      null == options.mutableSourceEagerHydrationData ? options.mutableSourceEagerHydrationData = [tag, getVersion] : options.mutableSourceEagerHydrationData.push(tag, getVersion)
    }
  return options
}

function isValidContainer(node) {
  return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType && (8 !== node.nodeType || " react-mount-point-unstable " !== node.nodeValue))
}

function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  forceHydrate || (forceHydrate = container ? 9 === container.nodeType ? container.documentElement :
    container.firstChild : null, forceHydrate = !(!forceHydrate || 1 !== forceHydrate.nodeType || !forceHydrate.hasAttribute("data-reactroot")));
  if (!forceHydrate)
    for (var rootSibling; rootSibling = container.lastChild;) container.removeChild(rootSibling);
  return new ReactDOMBlockingRoot(container, 0, forceHydrate ? {
    hydrate: true
  } : undefined)
}

function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  var root = container._reactRootContainer;
  if (root) {
    var fiberRoot = root._internalRoot;
    if ("function" ===
      typeof callback) {
      var originalCallback$132 = callback;
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot);
        originalCallback$132.call(instance)
      }
    }
    updateContainer(children, fiberRoot, parentComponent, callback)
  } else {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
    fiberRoot = root._internalRoot;
    if ("function" === typeof callback) {
      var originalCallback = callback;
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance)
      }
    }
    unbatchedUpdates(function () {
      updateContainer(children,
        fiberRoot, parentComponent, callback)
    })
  }
  return getPublicRootInstance(fiberRoot)
}

function createPortal$1(children, container) {
  var key = 2 < arguments.length && undefined !== arguments[2] ? arguments[2] : null;
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return createPortal(children, container, null, key)
}
if (!React) throw Error(formatProdErrorMessage(227));
var allNativeEvents = new Set,
  registrationNameDependencies = {},
  canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document ||
    "undefined" === typeof window.document.createElement),
  VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {},
  properties = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 0, false, name, null, false, false)
});
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function (_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, false, _ref[1], null, false, false)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 2, false, name.toLowerCase(), null, false, false)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 2, false, name, null, false, false)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (name) {
  properties[name] =
    new PropertyInfoRecord(name, 3, false, name.toLowerCase(), null, false, false)
});
["checked", "multiple", "muted", "selected"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 3, true, name, null, false, false)
});
["capture", "download"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 4, false, name, null, false, false)
});
["cols", "rows", "size", "span"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 6, false, name, null, false, false)
});
["rowSpan", "start"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name,
    5, false, name.toLowerCase(), null, false, false)
});
var CAMELIZE = /[\-:]([a-z])/g,
  capitalize = function (token) {
    return token[1].toUpperCase()
  };
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (attributeName) {
  var name =
    attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, 1, false, attributeName, null, false, false)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, 1, false, attributeName, "http://www.w3.org/1999/xlink", false, false)
});
["xml:base", "xml:lang", "xml:space"].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE,
    capitalize);
  properties[name] = new PropertyInfoRecord(name, 1, false, attributeName, "http://www.w3.org/XML/1998/namespace", false, false)
});
["tabIndex", "crossOrigin"].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, 1, false, attributeName.toLowerCase(), null, false, false)
});
properties.xlinkHref = new PropertyInfoRecord("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName,
    1, false, attributeName.toLowerCase(), null, true, true)
});

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
var prefix, reentry = false,
  reusableSVGContainer, setInnerHTML = function (func) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (arg0, arg1, arg2, arg3) {
      MSApp.execUnsafeLocalFunction(function () {
        return func(arg0, arg1, arg2, arg3)
      })
    } : func
  }(function (node, html) {
    if ("http://www.w3.org/2000/svg" !== node.namespaceURI || "innerHTML" in node) node.innerHTML = html;
    else {
      reusableSVGContainer =
        reusableSVGContainer || document.createElement("div");
      reusableSVGContainer.innerHTML = "<svg>" + html.valueOf().toString() + "</svg>";
      for (html = reusableSVGContainer.firstChild; node.firstChild;) node.removeChild(node.firstChild);
      for (; html.firstChild;) node.appendChild(html.firstChild)
    }
  }),
  setTextContent = function (node, text) {
    if (text) {
      var firstChild = node.firstChild;
      if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
        firstChild.nodeValue = text;
        return
      }
    }
    node.textContent = text
  },
  isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  },
  prefixes = ["Webkit", "ms", "Moz", "O"];
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    prefix = prefix + prop.charAt(0).toUpperCase() + prop.substring(1);
    isUnitlessNumber[prefix] = isUnitlessNumber[prop]
  })
});
var voidElementTags = Object.assign({
  menuitem: true
}, {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
}),
  restoreImpl =
    null,
  restoreTarget = null,
  restoreQueue = null,
  batchedUpdatesImpl = function (fn, bookkeeping) {
    return fn(bookkeeping)
  },
  discreteUpdatesImpl = function (fn, a, b, c, d) {
    return fn(a, b, c, d)
  },
  flushDiscreteUpdatesImpl = function () { },
  batchedEventUpdatesImpl = batchedUpdatesImpl,
  isInsideEventHandler = false,
  isBatchingEventUpdates = false,
  passiveBrowserEventsSupported = false;
if (canUseDOM) try {
  var options$jscomp$0 = {};
  Object.defineProperty(options$jscomp$0, "passive", {
    get: function () {
      passiveBrowserEventsSupported = true
    }
  });
  window.addEventListener("test",
    options$jscomp$0, options$jscomp$0);
  window.removeEventListener("test", options$jscomp$0, options$jscomp$0)
} catch (e) {
  passiveBrowserEventsSupported = false
}
var invokeGuardedCallbackImpl = function (name, func, context, a, b, c, d, e, f) {
  var funcArgs = Array.prototype.slice.call(arguments, 3);
  try {
    func.apply(context, funcArgs)
  } catch (error) {
    this.onError(error)
  }
},
  hasError = false,
  caughtError = null,
  hasRethrowError = false,
  rethrowError = null,
  reporter = {
    onError: function (error) {
      hasError = true;
      caughtError = error
    }
  },
  _ReactInternals$Sched = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler,
  unstable_cancelCallback = _ReactInternals$Sched.unstable_cancelCallback,
  unstable_now = _ReactInternals$Sched.unstable_now,
  unstable_scheduleCallback = _ReactInternals$Sched.unstable_scheduleCallback,
  unstable_shouldYield = _ReactInternals$Sched.unstable_shouldYield,
  unstable_requestPaint = _ReactInternals$Sched.unstable_requestPaint,
  unstable_runWithPriority = _ReactInternals$Sched.unstable_runWithPriority,
  unstable_getCurrentPriorityLevel = _ReactInternals$Sched.unstable_getCurrentPriorityLevel,
  unstable_ImmediatePriority =
    _ReactInternals$Sched.unstable_ImmediatePriority,
  unstable_UserBlockingPriority = _ReactInternals$Sched.unstable_UserBlockingPriority,
  unstable_NormalPriority = _ReactInternals$Sched.unstable_NormalPriority,
  unstable_LowPriority = _ReactInternals$Sched.unstable_LowPriority,
  unstable_IdlePriority = _ReactInternals$Sched.unstable_IdlePriority,
  hasScheduledReplayAttempt = false,
  queuedDiscreteEvents = [],
  queuedFocus = null,
  queuedDrag = null,
  queuedMouse = null,
  queuedPointers = new Map,
  queuedPointerCaptures = new Map,
  queuedExplicitHydrationTargets = [],
  discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),
  vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionend: makePrefixMap("Transition",
      "TransitionEnd")
  },
  prefixedEventNames = {},
  style = {};
canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
var ANIMATION_END = getVendorPrefixedEventName("animationend"),
  ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"),
  ANIMATION_START = getVendorPrefixedEventName("animationstart"),
  TRANSITION_END = getVendorPrefixedEventName("transitionend"),
  topLevelEventsToReactNames = new Map,
  eventPriorities = new Map,
  continuousPairsForSimpleEventPlugin = ["abort", "abort", ANIMATION_END, "animationEnd", ANIMATION_ITERATION, "animationIteration", ANIMATION_START, "animationStart", "canplay", "canPlay", "canplaythrough", "canPlayThrough", "durationchange", "durationChange", "emptied", "emptied", "encrypted", "encrypted", "ended", "ended", "error", "error", "gotpointercapture", "gotPointerCapture", "load", "load", "loadeddata",
    "loadedData", "loadedmetadata", "loadedMetadata", "loadstart", "loadStart", "lostpointercapture", "lostPointerCapture", "playing", "playing", "progress", "progress", "seeking", "seeking", "stalled", "stalled", "suspend", "suspend", "timeupdate", "timeUpdate", TRANSITION_END, "transitionEnd", "waiting", "waiting"
  ];
unstable_now();
var currentUpdateLanePriority = 0,
  return_highestLanePriority = 8,
  clz32 = Math.clz32 ? Math.clz32 : clz32Fallback,
  log = Math.log,
  LN2 = Math.LN2,
  UserBlockingPriority$1 = unstable_UserBlockingPriority,
  runWithPriority =
    unstable_runWithPriority,
  _enabled = true,
  root = null,
  startText = null,
  fallbackText = null,
  EventInterface = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (event) {
      return event.timeStamp || Date.now()
    }, defaultPrevented: 0,
    isTrusted: 0
  },
  SyntheticEvent = createSyntheticEvent(EventInterface),
  UIEventInterface = Object.assign({}, EventInterface, {
    view: 0,
    detail: 0
  }),
  SyntheticUIEvent = createSyntheticEvent(UIEventInterface),
  lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = Object.assign({}, UIEventInterface, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: getEventModifierState,
    button: 0,
    buttons: 0,
    relatedTarget: function (event) {
      return undefined === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget
    }, movementX: function (event) {
      if ("movementX" in event) return event.movementX;
      event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY -
        lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
      return lastMovementX
    }, movementY: function (event) {
      return "movementY" in event ? event.movementY : lastMovementY
    }
  }),
  SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface),
  DragEventInterface = Object.assign({}, MouseEventInterface, {
    dataTransfer: 0
  }),
  SyntheticDragEvent = createSyntheticEvent(DragEventInterface),
  FocusEventInterface = Object.assign({}, UIEventInterface, {
    relatedTarget: 0
  }),
  SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface),
  AnimationEventInterface = Object.assign({}, EventInterface, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface),
  ClipboardEventInterface = Object.assign({}, EventInterface, {
    clipboardData: function (event) {
      return "clipboardData" in event ? event.clipboardData : window.clipboardData
    }
  }),
  SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface),
  CompositionEventInterface = Object.assign({}, EventInterface, {
    data: 0
  }),
  SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface),
  SyntheticInputEvent = SyntheticCompositionEvent,
  normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  },
  KeyboardEventInterface = Object.assign({}, UIEventInterface, {
    key: function (nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key
      }
      return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent),
        13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : ""
    }, code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: getEventModifierState,
    charCode: function (event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0
    }, keyCode: function (event) {
      return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0
    }, which: function (event) {
      return "keypress" ===
        event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0
    }
  }),
  SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface),
  PointerEventInterface = Object.assign({}, MouseEventInterface, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }),
  SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface),
  TouchEventInterface = Object.assign({}, UIEventInterface, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: getEventModifierState
  }),
  SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface),
  TransitionEventInterface = Object.assign({}, EventInterface, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface),
  WheelEventInterface = Object.assign({}, MouseEventInterface, {
    deltaX: function (event) {
      return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0
    }, deltaY: function (event) {
      return "deltaY" in event ?
        event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0
    }, deltaZ: 0,
    deltaMode: 0
  }),
  SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface),
  END_KEYCODES = [9, 13, 27, 32],
  canUseCompositionEvent = canUseDOM && "CompositionEvent" in window,
  documentMode = null;
canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode,
  useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode &&
    8 < documentMode && 11 >= documentMode),
  SPACEBAR_CHAR = String.fromCharCode(32),
  hasSpaceKeypress = false,
  isComposing = false,
  supportedInputTypes = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
  },
  activeElement = null,
  activeElementInst = null,
  isInputEventSupported = false;
canUseDOM && (isInputEventSupported = isEventSupported("input") && (!document.documentMode || 9 < document.documentMode));
var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode,
  activeElement$1 = null,
  activeElementInst$1 = null,
  lastSelection = null,
  mouseDown = false;
registerSimplePluginEventsAndSetTheirPriorities("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
  0);
registerSimplePluginEventsAndSetTheirPriorities("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
registerSimplePluginEventsAndSetTheirPriorities(continuousPairsForSimpleEventPlugin, 2);
(function (eventTypes, priority) {
  for (var i = 0; i < eventTypes.length; i++) eventPriorities.set(eventTypes[i],
    priority)
})("change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), 0);
registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
registerTwoPhaseEvent("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
registerTwoPhaseEvent("onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
registerTwoPhaseEvent("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
registerTwoPhaseEvent("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
registerTwoPhaseEvent("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
registerTwoPhaseEvent("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
  nonDelegatedEvents = new Set("cancel close invalid load scroll toggle".split(" ").concat(mediaEventTypes)),
  listeningMarker = "_reactListening" + Math.random().toString(36).slice(2),
  eventsEnabled = null,
  selectionInformation = null,
  scheduleTimeout = "function" === typeof setTimeout ?
    setTimeout : undefined,
  cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : undefined,
  clientId = 0,
  randomKey = Math.random().toString(36).slice(2),
  internalInstanceKey = "__reactFiber$" + randomKey,
  internalPropsKey = "__reactProps$" + randomKey,
  internalContainerInstanceKey = "__reactContainer$" + randomKey,
  internalEventHandlersKey = "__reactEvents$" + randomKey,
  valueStack = [],
  index = -1,
  emptyContextObject = {},
  contextStackCursor = createCursor(emptyContextObject),
  didPerformWorkStackCursor = createCursor(false),
  previousContext = emptyContextObject,
  rendererID = null,
  injectedHook = null,
  Scheduler_runWithPriority = unstable_runWithPriority,
  Scheduler_scheduleCallback = unstable_scheduleCallback,
  Scheduler_cancelCallback = unstable_cancelCallback,
  Scheduler_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel,
  Scheduler_ImmediatePriority = unstable_ImmediatePriority,
  Scheduler_UserBlockingPriority = unstable_UserBlockingPriority,
  Scheduler_NormalPriority = unstable_NormalPriority,
  Scheduler_LowPriority = unstable_LowPriority,
  Scheduler_IdlePriority = unstable_IdlePriority,
  fakeCallbackNode = {},
  shouldYield = unstable_shouldYield,
  requestPaint = undefined !== unstable_requestPaint ? unstable_requestPaint : function () { },
  syncQueue = null,
  immediateQueueCallbackNode = null,
  isFlushingSyncQueue = false,
  initialTimeMs$1 = unstable_now(),
  now = 1E4 > initialTimeMs$1 ? unstable_now : function () {
    return unstable_now() - initialTimeMs$1
  },
  ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig,
  valueCursor = createCursor(null),
  currentlyRenderingFiber = null,
  lastContextDependency = null,
  lastContextWithAllBitsObserved =
    null,
  hasForceUpdate = false,
  emptyRefsObject = (new React.Component).refs,
  classComponentUpdater = {
    isMounted: function (component) {
      return (component = component._reactInternals) ? getNearestMountedFiber(component) === component : false
    }, enqueueSetState: function (inst, payload, callback) {
      inst = inst._reactInternals;
      var eventTime = requestEventTime(),
        lane = requestUpdateLane(inst),
        update = createUpdate(eventTime, lane);
      update.payload = payload;
      undefined !== callback && null !== callback && (update.callback = callback);
      enqueueUpdate(inst, update);
      scheduleUpdateOnFiber(inst,
        lane, eventTime)
    }, enqueueReplaceState: function (inst, payload, callback) {
      inst = inst._reactInternals;
      var eventTime = requestEventTime(),
        lane = requestUpdateLane(inst),
        update = createUpdate(eventTime, lane);
      update.tag = 1;
      update.payload = payload;
      undefined !== callback && null !== callback && (update.callback = callback);
      enqueueUpdate(inst, update);
      scheduleUpdateOnFiber(inst, lane, eventTime)
    }, enqueueForceUpdate: function (inst, callback) {
      inst = inst._reactInternals;
      var eventTime = requestEventTime(),
        lane = requestUpdateLane(inst),
        update =
          createUpdate(eventTime, lane);
      update.tag = 2;
      undefined !== callback && null !== callback && (update.callback = callback);
      enqueueUpdate(inst, update);
      scheduleUpdateOnFiber(inst, lane, eventTime)
    }
  },
  isArray = Array.isArray,
  reconcileChildFibers = ChildReconciler(true),
  mountChildFibers = ChildReconciler(false),
  NO_CONTEXT = {},
  contextStackCursor$1 = createCursor(NO_CONTEXT),
  contextFiberStackCursor = createCursor(NO_CONTEXT),
  rootInstanceStackCursor = createCursor(NO_CONTEXT),
  suspenseStackCursor = createCursor(0),
  hydrationParentFiber = null,
  nextHydratableInstance =
    null,
  isHydrating = false,
  workInProgressSources = [],
  ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig,
  renderLanes = 0,
  currentlyRenderingFiber$1 = null,
  currentHook = null,
  workInProgressHook = null,
  didScheduleRenderPhaseUpdate = false,
  didScheduleRenderPhaseUpdateDuringThisPass = false,
  ContextOnlyDispatcher = {
    readContext: readContext,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useDeferredValue: throwInvalidHookError,
    useTransition: throwInvalidHookError,
    useMutableSource: throwInvalidHookError,
    useOpaqueIdentifier: throwInvalidHookError,
    unstable_isNewReconciler: false
  },
  HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: function (callback, deps) {
      mountWorkInProgressHook().memoizedState = [callback, undefined === deps ? null : deps];
      return callback
    }, useContext: readContext,
    useEffect: mountEffect,
    useImperativeHandle: function (ref, create, deps) {
      deps = null !== deps && undefined !== deps ? deps.concat([ref]) : null;
      return mountEffectImpl(4, 2, imperativeHandleEffect.bind(null, create, ref), deps)
    }, useLayoutEffect: function (create, deps) {
      return mountEffectImpl(4, 2, create, deps)
    }, useMemo: function (nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = undefined === deps ? null : deps;
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate,
        deps
      ];
      return nextCreate
    }, useReducer: function (reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      initialArg = undefined !== init ? init(initialArg) : initialArg;
      hook.memoizedState = hook.baseState = initialArg;
      reducer = hook.queue = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialArg
      };
      reducer = reducer.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, reducer);
      return [hook.memoizedState, reducer]
    }, useRef: mountRef,
    useState: mountState,
    useDebugValue: mountDebugValue,
    useDeferredValue: function (value) {
      var _mountState =
        mountState(value),
        prevValue = _mountState[0],
        setValue = _mountState[1];
      mountEffect(function () {
        var prevTransition = ReactCurrentBatchConfig$1.transition;
        ReactCurrentBatchConfig$1.transition = 1;
        try {
          setValue(value)
        } finally {
          ReactCurrentBatchConfig$1.transition = prevTransition
        }
      }, [value]);
      return prevValue
    }, useTransition: function () {
      var _mountState2 = mountState(false),
        isPending = _mountState2[0];
      _mountState2 = startTransition.bind(null, _mountState2[1]);
      mountRef(_mountState2);
      return [_mountState2, isPending]
    }, useMutableSource: function (source,
      getSnapshot, subscribe) {
      var hook = mountWorkInProgressHook();
      hook.memoizedState = {
        refs: {
          getSnapshot: getSnapshot,
          setSnapshot: null
        },
        source: source,
        subscribe: subscribe
      };
      return useMutableSource(hook, source, getSnapshot, subscribe)
    }, useOpaqueIdentifier: function () {
      if (isHydrating) {
        var didUpgrade = false,
          id = makeOpaqueHydratingObject(function () {
            didUpgrade || (didUpgrade = true, setId("r:" + (clientId++).toString(36)));
            throw Error(formatProdErrorMessage(355));
          }),
          setId = mountState(id)[1];
        0 === (currentlyRenderingFiber$1.mode & 2) && (currentlyRenderingFiber$1.flags |=
          516, pushEffect(5, function () {
            setId("r:" + (clientId++).toString(36))
          }, undefined, null));
        return id
      }
      id = "r:" + (clientId++).toString(36);
      mountState(id);
      return id
    }, unstable_isNewReconciler: false
  },
  HooksDispatcherOnUpdate = {
    readContext: readContext,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: updateReducer,
    useRef: updateRef,
    useState: function (initialState) {
      return updateReducer(basicStateReducer)
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function (value) {
      var _updateState = updateReducer(basicStateReducer),
        prevValue = _updateState[0],
        setValue = _updateState[1];
      updateEffect(function () {
        var prevTransition = ReactCurrentBatchConfig$1.transition;
        ReactCurrentBatchConfig$1.transition = 1;
        try {
          setValue(value)
        } finally {
          ReactCurrentBatchConfig$1.transition = prevTransition
        }
      }, [value]);
      return prevValue
    }, useTransition: function () {
      var isPending = updateReducer(basicStateReducer)[0];
      return [updateRef().current, isPending]
    },
    useMutableSource: updateMutableSource,
    useOpaqueIdentifier: function () {
      return updateReducer(basicStateReducer)[0]
    }, unstable_isNewReconciler: false
  },
  HooksDispatcherOnRerender = {
    readContext: readContext,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: rerenderReducer,
    useRef: updateRef,
    useState: function (initialState) {
      return rerenderReducer(basicStateReducer)
    }, useDebugValue: mountDebugValue,
    useDeferredValue: function (value) {
      var _rerenderState = rerenderReducer(basicStateReducer),
        prevValue = _rerenderState[0],
        setValue = _rerenderState[1];
      updateEffect(function () {
        var prevTransition = ReactCurrentBatchConfig$1.transition;
        ReactCurrentBatchConfig$1.transition = 1;
        try {
          setValue(value)
        } finally {
          ReactCurrentBatchConfig$1.transition = prevTransition
        }
      }, [value]);
      return prevValue
    }, useTransition: function () {
      var isPending = rerenderReducer(basicStateReducer)[0];
      return [updateRef().current, isPending]
    }, useMutableSource: updateMutableSource,
    useOpaqueIdentifier: function () {
      return rerenderReducer(basicStateReducer)[0]
    }, unstable_isNewReconciler: false
  },
  ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = false,
  SUSPENDED_MARKER = {
    dehydrated: null,
    retryLane: 0
  };
var appendAllChildren = function (parent, workInProgress, needsVisibilityToggle, isHidden) {
  for (needsVisibilityToggle = workInProgress.child; null !== needsVisibilityToggle;) {
    if (5 === needsVisibilityToggle.tag || 6 === needsVisibilityToggle.tag) parent.appendChild(needsVisibilityToggle.stateNode);
    else if (4 !== needsVisibilityToggle.tag && null !== needsVisibilityToggle.child) {
      needsVisibilityToggle.child.return = needsVisibilityToggle;
      needsVisibilityToggle = needsVisibilityToggle.child;
      continue
    }
    if (needsVisibilityToggle === workInProgress) break;
    for (; null === needsVisibilityToggle.sibling;) {
      if (null === needsVisibilityToggle.return || needsVisibilityToggle.return === workInProgress) return;
      needsVisibilityToggle = needsVisibilityToggle.return
    }
    needsVisibilityToggle.sibling.return = needsVisibilityToggle.return;
    needsVisibilityToggle =
      needsVisibilityToggle.sibling
  }
};
var updateHostContainer = function (workInProgress) { };
var updateHostComponent$1 = function (current, workInProgress, type, newProps, rootContainerInstance) {
  var oldProps = current.memoizedProps;
  if (oldProps !== newProps) {
    current = workInProgress.stateNode;
    requiredContext(contextStackCursor$1.current);
    rootContainerInstance = null;
    switch (type) {
      case "input":
        oldProps = getHostProps(current, oldProps);
        newProps = getHostProps(current, newProps);
        rootContainerInstance = [];
        break;
      case "option":
        oldProps =
          getHostProps$1(current, oldProps);
        newProps = getHostProps$1(current, newProps);
        rootContainerInstance = [];
        break;
      case "select":
        oldProps = Object.assign({}, oldProps, {
          value: undefined
        });
        newProps = Object.assign({}, newProps, {
          value: undefined
        });
        rootContainerInstance = [];
        break;
      case "textarea":
        oldProps = getHostProps$3(current, oldProps);
        newProps = getHostProps$3(current, newProps);
        rootContainerInstance = [];
        break;
      default:
        "function" !== typeof oldProps.onClick && "function" === typeof newProps.onClick && (current.onclick = noop)
    }
    assertValidProps(type,
      newProps);
    var styleName;
    type = null;
    for (JSCompiler_inline_result in oldProps)
      if (!newProps.hasOwnProperty(JSCompiler_inline_result) && oldProps.hasOwnProperty(JSCompiler_inline_result) && null != oldProps[JSCompiler_inline_result])
        if ("style" === JSCompiler_inline_result) {
          var lastStyle = oldProps[JSCompiler_inline_result];
          for (styleName in lastStyle) lastStyle.hasOwnProperty(styleName) && (type || (type = {}), type[styleName] = "")
        } else "dangerouslySetInnerHTML" !== JSCompiler_inline_result && "children" !== JSCompiler_inline_result &&
          "suppressContentEditableWarning" !== JSCompiler_inline_result && "suppressHydrationWarning" !== JSCompiler_inline_result && "autoFocus" !== JSCompiler_inline_result && (registrationNameDependencies.hasOwnProperty(JSCompiler_inline_result) ? rootContainerInstance || (rootContainerInstance = []) : (rootContainerInstance = rootContainerInstance || []).push(JSCompiler_inline_result, null));
    for (JSCompiler_inline_result in newProps) {
      var nextProp = newProps[JSCompiler_inline_result];
      lastStyle = null != oldProps ? oldProps[JSCompiler_inline_result] :
        undefined;
      if (newProps.hasOwnProperty(JSCompiler_inline_result) && nextProp !== lastStyle && (null != nextProp || null != lastStyle))
        if ("style" === JSCompiler_inline_result)
          if (lastStyle) {
            for (styleName in lastStyle) !lastStyle.hasOwnProperty(styleName) || nextProp && nextProp.hasOwnProperty(styleName) || (type || (type = {}), type[styleName] = "");
            for (styleName in nextProp) nextProp.hasOwnProperty(styleName) && lastStyle[styleName] !== nextProp[styleName] && (type || (type = {}), type[styleName] = nextProp[styleName])
          } else type || (rootContainerInstance ||
            (rootContainerInstance = []), rootContainerInstance.push(JSCompiler_inline_result, type)), type = nextProp;
        else "dangerouslySetInnerHTML" === JSCompiler_inline_result ? (nextProp = nextProp ? nextProp.__html : undefined, lastStyle = lastStyle ? lastStyle.__html : undefined, null != nextProp && lastStyle !== nextProp && (rootContainerInstance = rootContainerInstance || []).push(JSCompiler_inline_result, nextProp)) : "children" === JSCompiler_inline_result ? "string" !== typeof nextProp && "number" !== typeof nextProp || (rootContainerInstance = rootContainerInstance || []).push(JSCompiler_inline_result, "" + nextProp) : "suppressContentEditableWarning" !== JSCompiler_inline_result && "suppressHydrationWarning" !== JSCompiler_inline_result && (registrationNameDependencies.hasOwnProperty(JSCompiler_inline_result) ? (null != nextProp && "onScroll" === JSCompiler_inline_result && listenToNonDelegatedEvent("scroll", current), rootContainerInstance || lastStyle === nextProp || (rootContainerInstance = [])) : "object" === typeof nextProp && null !== nextProp && nextProp.$$typeof === REACT_OPAQUE_ID_TYPE ? nextProp.toString() :
          (rootContainerInstance = rootContainerInstance || []).push(JSCompiler_inline_result, nextProp))
    }
    type && (rootContainerInstance = rootContainerInstance || []).push("style", type);
    var JSCompiler_inline_result = rootContainerInstance;
    if (workInProgress.updateQueue = JSCompiler_inline_result) workInProgress.flags |= 4
  }
};
var updateHostText$1 = function (current, workInProgress, oldText, newText) {
  oldText !== newText && (workInProgress.flags |= 4)
};
var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map,
  PossiblyWeakSet = "function" ===
    typeof WeakSet ? WeakSet : Set,
  ceil = Math.ceil,
  ReactCurrentDispatcher$2 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  executionContext = 0,
  workInProgressRoot = null,
  workInProgress = null,
  workInProgressRootRenderLanes = 0,
  subtreeRenderLanes = 0,
  subtreeRenderLanesCursor = createCursor(0),
  workInProgressRootExitStatus = 0,
  workInProgressRootFatalError = null,
  workInProgressRootIncludedLanes = 0,
  workInProgressRootSkippedLanes = 0,
  workInProgressRootUpdatedLanes = 0,
  workInProgressRootPingedLanes =
    0,
  mostRecentlyUpdatedRoot = null,
  globalMostRecentFallbackTime = 0,
  workInProgressRootRenderTargetTime = Infinity,
  nextEffect = null,
  hasUncaughtError = false,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  rootDoesHavePassiveEffects = false,
  rootWithPendingPassiveEffects = null,
  pendingPassiveEffectsRenderPriority = 90,
  pendingPassiveHookEffectsMount = [],
  pendingPassiveHookEffectsUnmount = [],
  rootsWithPendingDiscreteUpdates = null,
  nestedUpdateCount = 0,
  rootWithNestedUpdates = null,
  currentEventTime = -1,
  currentEventWipLanes =
    0,
  currentEventPendingLanes = 0,
  focusedInstanceHandle = null,
  shouldFireAfterActiveInstanceBlur = false;
var beginWork$1 = function (current, workInProgress, renderLanes) {
  var updateLanes = workInProgress.lanes;
  if (null !== current)
    if (current.memoizedProps !== workInProgress.pendingProps || didPerformWorkStackCursor.current) didReceiveUpdate = true;
    else if (0 !== (renderLanes & updateLanes)) didReceiveUpdate = 0 !== (current.flags & 16384) ? true : false;
    else {
      didReceiveUpdate = false;
      switch (workInProgress.tag) {
        case 3:
          pushHostRootContext(workInProgress);
          resetHydrationState();
          break;
        case 5:
          pushHostContext(workInProgress);
          break;
        case 1:
          isContextProvider(workInProgress.type) && pushContextProvider(workInProgress);
          break;
        case 4:
          pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          break;
        case 10:
          updateLanes = workInProgress.memoizedProps.value;
          var context = workInProgress.type._context;
          push(valueCursor, context._currentValue);
          context._currentValue = updateLanes;
          break;
        case 13:
          updateLanes = workInProgress.memoizedState;
          if (null !== updateLanes) {
            if (null !==
              updateLanes.dehydrated) return push(suspenseStackCursor, suspenseStackCursor.current & 1), workInProgress.flags |= 64, null;
            if (0 !== (renderLanes & workInProgress.child.childLanes)) return updateSuspenseComponent(current, workInProgress, renderLanes);
            push(suspenseStackCursor, suspenseStackCursor.current & 1);
            workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
            return null !== workInProgress ? workInProgress.sibling : null
          }
          push(suspenseStackCursor, suspenseStackCursor.current & 1);
          break;
        case 19:
          updateLanes =
            0 !== (renderLanes & workInProgress.childLanes);
          if (0 !== (current.flags & 64)) {
            if (updateLanes) return updateSuspenseListComponent(current, workInProgress, renderLanes);
            workInProgress.flags |= 64
          }
          context = workInProgress.memoizedState;
          null !== context && (context.rendering = null, context.tail = null, context.lastEffect = null);
          push(suspenseStackCursor, suspenseStackCursor.current);
          if (updateLanes) break;
          else return null;
        case 23:
        case 24:
          return workInProgress.lanes = 0, updateOffscreenComponent(current, workInProgress, renderLanes)
      }
      return bailoutOnAlreadyFinishedWork(current,
        workInProgress, renderLanes)
    } else didReceiveUpdate = false;
  workInProgress.lanes = 0;
  switch (workInProgress.tag) {
    case 2:
      updateLanes = workInProgress.type;
      null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.flags |= 2);
      current = workInProgress.pendingProps;
      context = getMaskedContext(workInProgress, contextStackCursor.current);
      prepareToReadContext(workInProgress, renderLanes);
      context = renderWithHooks(null, workInProgress, updateLanes, current, context, renderLanes);
      workInProgress.flags |= 1;
      if ("object" ===
        typeof context && null !== context && "function" === typeof context.render && undefined === context.$$typeof) {
        workInProgress.tag = 1;
        workInProgress.memoizedState = null;
        workInProgress.updateQueue = null;
        if (isContextProvider(updateLanes)) {
          var hasContext = true;
          pushContextProvider(workInProgress)
        } else hasContext = false;
        workInProgress.memoizedState = null !== context.state && undefined !== context.state ? context.state : null;
        initializeUpdateQueue(workInProgress);
        var getDerivedStateFromProps = updateLanes.getDerivedStateFromProps;
        "function" === typeof getDerivedStateFromProps &&
          applyDerivedStateFromProps(workInProgress, updateLanes, getDerivedStateFromProps, current);
        context.updater = classComponentUpdater;
        workInProgress.stateNode = context;
        context._reactInternals = workInProgress;
        mountClassInstance(workInProgress, updateLanes, current, renderLanes);
        workInProgress = finishClassComponent(null, workInProgress, updateLanes, true, hasContext, renderLanes)
      } else workInProgress.tag = 0, reconcileChildren(null, workInProgress, context, renderLanes), workInProgress = workInProgress.child;
      return workInProgress;
    case 16:
      context = workInProgress.elementType;
      a: {
        null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.flags |= 2);
        current = workInProgress.pendingProps;
        hasContext = context._init;
        context = hasContext(context._payload);
        workInProgress.type = context;
        hasContext = workInProgress.tag = resolveLazyComponentTag(context);
        getDerivedStateFromProps = resolveDefaultProps(context, current);
        switch (hasContext) {
          case 0:
            workInProgress = updateFunctionComponent(null, workInProgress, context, getDerivedStateFromProps,
              renderLanes);
            break a;
          case 1:
            workInProgress = updateClassComponent(null, workInProgress, context, getDerivedStateFromProps, renderLanes);
            break a;
          case 11:
            workInProgress = updateForwardRef(null, workInProgress, context, getDerivedStateFromProps, renderLanes);
            break a;
          case 14:
            workInProgress = updateMemoComponent(null, workInProgress, context, resolveDefaultProps(context.type, getDerivedStateFromProps), updateLanes, renderLanes);
            break a;
          case 22:
            workInProgress = updateBlock(null, workInProgress, context, current, renderLanes);
            break a
        }
        throw Error(formatProdErrorMessage(306,
          context, ""));
      }
      return workInProgress;
    case 0:
      return updateLanes = workInProgress.type, context = workInProgress.pendingProps, context = workInProgress.elementType === updateLanes ? context : resolveDefaultProps(updateLanes, context), updateFunctionComponent(current, workInProgress, updateLanes, context, renderLanes);
    case 1:
      return updateLanes = workInProgress.type, context = workInProgress.pendingProps, context = workInProgress.elementType === updateLanes ? context : resolveDefaultProps(updateLanes, context), updateClassComponent(current,
        workInProgress, updateLanes, context, renderLanes);
    case 3:
      pushHostRootContext(workInProgress);
      updateLanes = workInProgress.updateQueue;
      if (null === current || null === updateLanes) throw Error(formatProdErrorMessage(282));
      updateLanes = workInProgress.pendingProps;
      context = workInProgress.memoizedState;
      context = null !== context ? context.element : null;
      cloneUpdateQueue(current, workInProgress);
      processUpdateQueue(workInProgress, updateLanes, null, renderLanes);
      updateLanes = workInProgress.memoizedState.element;
      if (updateLanes ===
        context) resetHydrationState(), workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      else {
        context = workInProgress.stateNode;
        if (hasContext = context.hydrate) nextHydratableInstance = getNextHydratable(workInProgress.stateNode.containerInfo.firstChild), hydrationParentFiber = workInProgress, hasContext = isHydrating = true;
        if (hasContext) {
          current = context.mutableSourceEagerHydrationData;
          if (null != current)
            for (context = 0; context < current.length; context += 2) hasContext = current[context], hasContext._workInProgressVersionPrimary =
              current[context + 1], workInProgressSources.push(hasContext);
          renderLanes = mountChildFibers(workInProgress, null, updateLanes, renderLanes);
          for (workInProgress.child = renderLanes; renderLanes;) renderLanes.flags = renderLanes.flags & -3 | 1024, renderLanes = renderLanes.sibling
        } else reconcileChildren(current, workInProgress, updateLanes, renderLanes), resetHydrationState();
        workInProgress = workInProgress.child
      }
      return workInProgress;
    case 5:
      return pushHostContext(workInProgress), null === current && tryToClaimNextHydratableInstance(workInProgress),
        updateLanes = workInProgress.type, context = workInProgress.pendingProps, hasContext = null !== current ? current.memoizedProps : null, getDerivedStateFromProps = context.children, shouldSetTextContent(updateLanes, context) ? getDerivedStateFromProps = null : null !== hasContext && shouldSetTextContent(updateLanes, hasContext) && (workInProgress.flags |= 16), markRef(current, workInProgress), reconcileChildren(current, workInProgress, getDerivedStateFromProps, renderLanes), workInProgress.child;
    case 6:
      return null === current && tryToClaimNextHydratableInstance(workInProgress),
        null;
    case 13:
      return updateSuspenseComponent(current, workInProgress, renderLanes);
    case 4:
      return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), updateLanes = workInProgress.pendingProps, null === current ? workInProgress.child = reconcileChildFibers(workInProgress, null, updateLanes, renderLanes) : reconcileChildren(current, workInProgress, updateLanes, renderLanes), workInProgress.child;
    case 11:
      return updateLanes = workInProgress.type, context = workInProgress.pendingProps, context = workInProgress.elementType ===
        updateLanes ? context : resolveDefaultProps(updateLanes, context), updateForwardRef(current, workInProgress, updateLanes, context, renderLanes);
    case 7:
      return reconcileChildren(current, workInProgress, workInProgress.pendingProps, renderLanes), workInProgress.child;
    case 8:
      return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
    case 12:
      return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
    case 10:
      a: {
        updateLanes = workInProgress.type._context;
        context = workInProgress.pendingProps;
        getDerivedStateFromProps = workInProgress.memoizedProps;
        hasContext = context.value;
        var context$jscomp$0 = workInProgress.type._context;
        push(valueCursor, context$jscomp$0._currentValue);
        context$jscomp$0._currentValue = hasContext;
        if (null !== getDerivedStateFromProps)
          if (context$jscomp$0 = getDerivedStateFromProps.value, hasContext = objectIs(context$jscomp$0, hasContext) ? 0 : ("function" === typeof updateLanes._calculateChangedBits ? updateLanes._calculateChangedBits(context$jscomp$0,
            hasContext) : 1073741823) | 0, 0 === hasContext) {
            if (getDerivedStateFromProps.children === context.children && !didPerformWorkStackCursor.current) {
              workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
              break a
            }
          } else
            for (getDerivedStateFromProps = workInProgress.child, null !== getDerivedStateFromProps && (getDerivedStateFromProps.return = workInProgress); null !== getDerivedStateFromProps;) {
              var list = getDerivedStateFromProps.dependencies;
              if (null !== list) {
                context$jscomp$0 = getDerivedStateFromProps.child;
                for (var dependency = list.firstContext; null !== dependency;) {
                  if (dependency.context === updateLanes && 0 !== (dependency.observedBits & hasContext)) {
                    1 === getDerivedStateFromProps.tag && (dependency = createUpdate(-1, renderLanes & -renderLanes), dependency.tag = 2, enqueueUpdate(getDerivedStateFromProps, dependency));
                    getDerivedStateFromProps.lanes |= renderLanes;
                    dependency = getDerivedStateFromProps.alternate;
                    null !== dependency && (dependency.lanes |= renderLanes);
                    scheduleWorkOnParentPath(getDerivedStateFromProps.return, renderLanes);
                    list.lanes |= renderLanes;
                    break
                  }
                  dependency = dependency.next
                }
              } else if (10 === getDerivedStateFromProps.tag) context$jscomp$0 = getDerivedStateFromProps.type === workInProgress.type ? null : getDerivedStateFromProps.child;
              else if (18 === getDerivedStateFromProps.tag) {
                context$jscomp$0 = getDerivedStateFromProps.return;
                if (null === context$jscomp$0) throw Error(formatProdErrorMessage(341));
                context$jscomp$0.lanes |= renderLanes;
                list = context$jscomp$0.alternate;
                null !== list && (list.lanes |= renderLanes);
                scheduleWorkOnParentPath(context$jscomp$0,
                  renderLanes);
                context$jscomp$0 = getDerivedStateFromProps.sibling
              } else context$jscomp$0 = getDerivedStateFromProps.child; if (null !== context$jscomp$0) context$jscomp$0.return = getDerivedStateFromProps;
              else
                for (context$jscomp$0 = getDerivedStateFromProps; null !== context$jscomp$0;) {
                  if (context$jscomp$0 === workInProgress) {
                    context$jscomp$0 = null;
                    break
                  }
                  getDerivedStateFromProps = context$jscomp$0.sibling;
                  if (null !== getDerivedStateFromProps) {
                    getDerivedStateFromProps.return = context$jscomp$0.return;
                    context$jscomp$0 = getDerivedStateFromProps;
                    break
                  }
                  context$jscomp$0 = context$jscomp$0.return
                }
              getDerivedStateFromProps = context$jscomp$0
            }
        reconcileChildren(current, workInProgress, context.children, renderLanes);
        workInProgress = workInProgress.child
      }
      return workInProgress;
    case 9:
      return context = workInProgress.type, hasContext = workInProgress.pendingProps, updateLanes = hasContext.children, prepareToReadContext(workInProgress, renderLanes), context = readContext(context, hasContext.unstable_observedBits), updateLanes = updateLanes(context), workInProgress.flags |= 1, reconcileChildren(current,
        workInProgress, updateLanes, renderLanes), workInProgress.child;
    case 14:
      return context = workInProgress.type, hasContext = resolveDefaultProps(context, workInProgress.pendingProps), hasContext = resolveDefaultProps(context.type, hasContext), updateMemoComponent(current, workInProgress, context, hasContext, updateLanes, renderLanes);
    case 15:
      return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, updateLanes, renderLanes);
    case 17:
      return updateLanes = workInProgress.type, context =
        workInProgress.pendingProps, context = workInProgress.elementType === updateLanes ? context : resolveDefaultProps(updateLanes, context), null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.flags |= 2), workInProgress.tag = 1, isContextProvider(updateLanes) ? (current = true, pushContextProvider(workInProgress)) : current = false, prepareToReadContext(workInProgress, renderLanes), constructClassInstance(workInProgress, updateLanes, context), mountClassInstance(workInProgress, updateLanes, context, renderLanes),
        finishClassComponent(null, workInProgress, updateLanes, true, current, renderLanes);
    case 19:
      return updateSuspenseListComponent(current, workInProgress, renderLanes);
    case 22:
      return updateBlock(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
    case 23:
      return updateOffscreenComponent(current, workInProgress, renderLanes);
    case 24:
      return updateOffscreenComponent(current, workInProgress, renderLanes)
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
};
var createFiber = function (tag,
  pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode)
};
ReactDOMRoot.prototype.render = ReactDOMBlockingRoot.prototype.render = function (children) {
  updateContainer(children, this._internalRoot, null, null)
};
ReactDOMRoot.prototype.unmount = ReactDOMBlockingRoot.prototype.unmount = function () {
  var root = this._internalRoot,
    container = root.containerInfo;
  updateContainer(null, root, null, function () {
    container[internalContainerInstanceKey] = null
  })
};
var attemptSynchronousHydration = function (fiber) {
  switch (fiber.tag) {
    case 3:
      var root$131 =
        fiber.stateNode;
      if (root$131.hydrate) {
        var lanes = getHighestPriorityLanes(root$131.pendingLanes);
        root$131.expiredLanes |= lanes & root$131.pendingLanes;
        ensureRootIsScheduled(root$131, now());
        0 === (executionContext & 48) && (resetRenderTimer(), flushSyncCallbackQueue())
      }
      break;
    case 13:
      var eventTime = requestEventTime();
      flushSync(function () {
        return scheduleUpdateOnFiber(fiber, 1, eventTime)
      });
      markRetryLaneIfNotHydrated(fiber, 4)
  }
};
var attemptUserBlockingHydration = function (fiber) {
  if (13 === fiber.tag) {
    var eventTime = requestEventTime();
    scheduleUpdateOnFiber(fiber, 4, eventTime);
    markRetryLaneIfNotHydrated(fiber, 4)
  }
};
var attemptContinuousHydration = function (fiber) {
  if (13 === fiber.tag) {
    var eventTime = requestEventTime();
    scheduleUpdateOnFiber(fiber, 67108864, eventTime);
    markRetryLaneIfNotHydrated(fiber, 67108864)
  }
};
var attemptHydrationAtCurrentPriority = function (fiber) {
  if (13 === fiber.tag) {
    var eventTime = requestEventTime(),
      lane = requestUpdateLane(fiber);
    scheduleUpdateOnFiber(fiber, lane, eventTime);
    markRetryLaneIfNotHydrated(fiber, lane)
  }
};
var getCurrentUpdatePriority =
  function () {
    return currentUpdateLanePriority
  };
var attemptHydrationAtPriority = runWithPriority$2;
restoreImpl = function (domElement, tag, props) {
  switch (tag) {
    case "input":
      updateWrapper(domElement, props);
      tag = props.name;
      if ("radio" === props.type && null != tag) {
        for (props = domElement; props.parentNode;) props = props.parentNode;
        props = props.querySelectorAll("input[name=" + JSON.stringify("" + tag) + '][type="radio"]');
        for (tag = 0; tag < props.length; tag++) {
          var otherNode = props[tag];
          if (otherNode !== domElement && otherNode.form === domElement.form) {
            var otherProps =
              getFiberCurrentPropsFromNode(otherNode);
            if (!otherProps) throw Error(formatProdErrorMessage(90));
            updateValueIfChanged(otherNode);
            updateWrapper(otherNode, otherProps)
          }
        }
      }
      break;
    case "textarea":
      updateWrapper$1(domElement, props);
      break;
    case "select":
      tag = props.value, null != tag && updateOptions(domElement, !!props.multiple, tag, false)
  }
};
(function (_batchedUpdatesImpl, _discreteUpdatesImpl, _flushDiscreteUpdatesImpl, _batchedEventUpdatesImpl) {
  batchedUpdatesImpl = _batchedUpdatesImpl;
  discreteUpdatesImpl = _discreteUpdatesImpl;
  flushDiscreteUpdatesImpl = _flushDiscreteUpdatesImpl;
  batchedEventUpdatesImpl = _batchedEventUpdatesImpl
})(batchedUpdates$1, function (fn, a, b, c, d) {
  var prevExecutionContext = executionContext;
  executionContext |= 4;
  try {
    return runWithPriority$1(98, fn.bind(null, a, b, c, d))
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue())
  }
}, function () {
  0 === (executionContext & 49) && (flushPendingDiscreteUpdates(), flushPassiveEffects())
}, function (fn, a) {
  var prevExecutionContext =
    executionContext;
  executionContext |= 2;
  try {
    return fn(a)
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue())
  }
});

(function (devToolsConfig) {
  devToolsConfig = {
    bundleType: devToolsConfig.bundleType,
    version: devToolsConfig.version,
    rendererPackageName: devToolsConfig.rendererPackageName,
    rendererConfig: devToolsConfig.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
    findHostInstanceByFiber: findHostInstanceByFiber,
    findFiberByHostInstance: devToolsConfig.findFiberByHostInstance || emptyFindFiberByHostInstance,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null
  };
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) devToolsConfig = false;
  else {
    var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hook.isDisabled && hook.supportsFiber) try {
      rendererID = hook.inject(devToolsConfig), injectedHook = hook
    } catch (err) { }
    devToolsConfig = true
  }
  return devToolsConfig
})({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 0,
  version: "17.0.0",
  rendererPackageName: "react-dom"
});

const Internals = {
  Events: [
    getInstanceFromNode,
    getNodeFromInstance,
    getFiberCurrentPropsFromNode,
    enqueueStateRestore,
    restoreStateIfNeeded,
    flushPassiveEffects,
    { current: false }
  ]
};

export {
  createPortal$1 as createPortal,
  Internals as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
};

export const findDOMNode = function (componentOrElement) {
  if (null == componentOrElement) return null;
  if (1 === componentOrElement.nodeType) return componentOrElement;
  var fiber = componentOrElement._reactInternals;
  if (undefined === fiber) {
    if ("function" === typeof componentOrElement.render) throw Error(formatProdErrorMessage(188));
    throw Error(formatProdErrorMessage(268, Object.keys(componentOrElement)));
  }
  componentOrElement = findCurrentHostFiber(fiber);
  componentOrElement = null === componentOrElement ?
    null : componentOrElement.stateNode;
  return componentOrElement
};

export { flushSync };

export const hydrate = function (element, container, callback) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return legacyRenderSubtreeIntoContainer(null, element, container, true, callback)
};

export const render = function (element, container, callback) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
};

export const unmountComponentAtNode = function (container) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(40));
  return container._reactRootContainer ? (unbatchedUpdates(function () {
    legacyRenderSubtreeIntoContainer(null, null, container, false, function () {
      container._reactRootContainer = null;
      container[internalContainerInstanceKey] = null
    })
  }), true) : false
};
export const unstable_batchedUpdates = batchedUpdates$1;
export const unstable_createBlockingRoot = function (container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMBlockingRoot(container, 1, options)
};
export const unstable_createPortal = function (children, container) {
  return createPortal$1(children, container, 2 < arguments.length && undefined !== arguments[2] ? arguments[2] : null)
};
export const unstable_createRoot = function (container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMRoot(container, options)
};
export const unstable_flushControlled = function (fn) {
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    runWithPriority$1(99,
      fn)
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue())
  }
};
export const unstable_renderSubtreeIntoContainer = function (parentComponent, element, containerNode, callback) {
  if (!isValidContainer(containerNode)) throw Error(formatProdErrorMessage(200));
  if (null == parentComponent || undefined === parentComponent._reactInternals) throw Error(formatProdErrorMessage(38));
  return legacyRenderSubtreeIntoContainer(parentComponent, element, containerNode, false, callback)
};

export { runWithPriority$2 as unstable_runWithPriority };

export const unstable_scheduleHydration = function (target) {
  if (target) {
    var schedulerPriority = unstable_getCurrentPriorityLevel(),
      updateLanePriority = getCurrentUpdatePriority();
    target = {
      blockedOn: null,
      target: target,
      priority: schedulerPriority,
      lanePriority: updateLanePriority
    };
    for (updateLanePriority = 0; updateLanePriority < queuedExplicitHydrationTargets.length && !(schedulerPriority <= queuedExplicitHydrationTargets[updateLanePriority].priority); updateLanePriority++);
    queuedExplicitHydrationTargets.splice(updateLanePriority,
      0, target);
    0 === updateLanePriority && attemptExplicitHydrationTarget(target)
  }
};