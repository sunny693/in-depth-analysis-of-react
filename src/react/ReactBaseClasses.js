/**
 * @source react/packages/react/src/ReactBaseClasses.js
*/
import { formatProdErrorMessage } from './../utils/index';

const emptyObject = {};
const ReactNoopUpdateQueue = {
  isMounted: function (a) { return false },
  enqueueForceUpdate: function (a, b, c) { },
  enqueueReplaceState: function (a, b, c, d) { },
  enqueueSetState: function (a, b, c, d) { }
};

function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue
}

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue
}
Component.prototype.isReactComponent = {};
/**
 * 目前在使用上看，setState可以接收俩个参数 setState(updater, [callback])
 * updater可以是函数也可以是object
 *    updater如果是函数的话，参数为整个state对象，直接在其上修改就会触发更新
 *    ？？？目前还不知道具体的触发规则
 * 可选参数callback是回调，不接收参数
*/
Component.prototype.setState = function (partialState, callback) {
  if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) throw Error(formatProdErrorMessage(85));
  /**
   * 实例调用原型中的方法，该方法内部的this实际指向该实例本身
  */
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

export {
  Component,
  PureComponent,
}