import { formatProdErrorMessage } from './../utils/index';
import { ReactDOMBlockingRoot,isValidContainer   } from './ReactDOMRoot';
import {legacyRenderSubtreeIntoContainer} from './index';

function ReactDOMRoot(container, options) {
  this._internalRoot = createRootImpl(container, 2, options)
}
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

function render(element, container, callback) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return legacyRenderSubtreeIntoContainer(null, element, container, false, callback)
};

function hydrate(element, container, callback) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return legacyRenderSubtreeIntoContainer(null, element, container, true, callback)
};

function unstable_createRoot(container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMRoot(container, options)
};

function findDOMNode(componentOrElement) {
  if (componentOrElement == null) return null;
  if (componentOrElement.nodeType === 1) return componentOrElement;

  const fiber = componentOrElement._reactInternals;

  if (fiber === undefined) {
    if (typeof componentOrElement.render === "function") throw Error(formatProdErrorMessage(188));

    throw Error(formatProdErrorMessage(268, Object.keys(componentOrElement)));
  }

  componentOrElement = findCurrentHostFiber(fiber);
  componentOrElement = componentOrElement === null ? null : componentOrElement.stateNode;

  return componentOrElement;
};

export {
  render,
  hydrate,
  findDOMNode,
  unstable_createRoot,
}