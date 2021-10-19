import { isContextProvider } from './ReactFiberContext';
import { pop, push } from './ReactFiberStack';
import { didPerformWorkStackCursor,contextStackCursor } from './ReactFiberContext';
import { resetWorkInProgressVersions,updateHostComponent$1 } from './index';
import {
  formatProdErrorMessage,
  getIntrinsicNamespace,
  getToStringValue,
} from './../utils/index';
import { popHostContainer,popHydrationState } from './index';

function updateHostContainer(workInProgress) { };


function updateHostText$1 (current, workInProgress, oldText, newText) {
  oldText !== newText && (workInProgress.flags |= 4)
};

export function completeWork(current, workInProgress, renderLanes) {
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