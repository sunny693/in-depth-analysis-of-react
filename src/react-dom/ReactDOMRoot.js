import { FiberRootNode } from './ReactFiberRoot';
import { createFiber } from './ReactFiber';
import { initializeUpdateQueue } from './ReactUpdateQueue';
import { internalContainerInstanceKey } from './ReactDOMComponentTree';
import { listenToAllSupportedEvents } from './DOMPluginEventSystem';

const ELEMENT_NODE = 1;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 11;

function isValidContainer(node) {
  return Boolean(
    node &&
    (
      node.nodeType === ELEMENT_NODE ||
      node.nodeType === DOCUMENT_NODE ||
      node.nodeType === DOCUMENT_FRAGMENT_NODE ||
      (node.nodeType === COMMENT_NODE && node.nodeValue === ' react-mount-point-unstable ')
    )
  );
}

function createRootImpl(container, tag, options) {
  const mutableSources = (options != null && options.hydrationOptions != null && options.hydrationOptions.mutableSources) || null;

  options = new FiberRootNode(container, tag, null != options && true === options.hydrate);
  tag = createFiber(3, null, null, 2 === tag ? 7 : 1 === tag ? 3 : 0);

  options.current = tag;
  tag.stateNode = options;
  initializeUpdateQueue(tag);
  container[internalContainerInstanceKey] = options.current;
  listenToAllSupportedEvents(8 === container.nodeType ? container.parentNode : container);

  if (mutableSources) {
    for (container = 0; container < mutableSources.length; container++) {
      tag = mutableSources[container];
      var getVersion = tag._getVersion;
      getVersion = getVersion(tag._source);
      null == options.mutableSourceEagerHydrationData ? options.mutableSourceEagerHydrationData = [tag, getVersion] : options.mutableSourceEagerHydrationData.push(tag, getVersion)
    }
  }

  return options
}

function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options)
}

export {
  isValidContainer,
  ReactDOMBlockingRoot,
  createRootImpl,
}