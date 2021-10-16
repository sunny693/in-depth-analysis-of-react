
/**
 * @source react/packages/react/src/ReactElement.js
*/
import { ownProperty, formatProdErrorMessage, } from './../utils/index';
import { REACT_ELEMENT_TYPE } from './../shared/ReactSymbols';

const ReactCurrentOwner = { current: null };
const RESERVED_PROPS = { key: true, ref: true };

/**
 * <type config> childrenArr </type>
 * defaultProps是如何设置的？
 * 每个createELement是如何串联起来的？[done]
 *  type是定义的函数
 *  config是传入的参数
 * ReactCurrentOwner是如何断定的?
 * _owner的作用是什么？
 **/
function createElement(type, config, ...childrenArr) {
  const { length } = childrenArr;
  let propName;
  let props = {};
  let key = null;
  let ref = null;

  if (config != null) {
    if (config.ref !== undefined) ref = config.ref || null;
    if (config.key !== undefined) key = String(config.key);

    for (propName in config) {
      if (ownProperty(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) props[propName] = config[propName];
    };
  }

  if (length >= 1) props.children = childrenArr.length === 1 ? childrenArr[0] : childrenArr;

  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) props[propName] = defaultProps[propName];
    };
  }

  return {
    type, //包含组件的定义
    key,
    ref,
    props,
    $$typeof: REACT_ELEMENT_TYPE,
    _owner: ReactCurrentOwner.current
  }
}

/**
 * cloneElement 和 createElement有何不同
 *    cloneElement接受的一个函数是经过createElement处理后返回的对象
 *    cloneElement处理后返回的也是个对象（相当于被createElement处理后）
 * cloneElement的实现原理
 *  在createElement的基础上添加扩展
*/
const cloneElement = function (element, config, ...childrenArr) {
  if (element === null || element === undefined) throw Error(formatProdErrorMessage(267, element));
  
  const { length } = childrenArr;
  const props = Object.assign({}, element.props);
  let { key, ref, _owner, } = element;

  if (config != null) {
    if (config.ref !== undefined) {
      ref = config.ref;
      _owner = ReactCurrentOwner.current;
    };

    if (config.key !== undefined) key = String(config.key);

    let defaultProps;
    if (element.type && element.type.defaultProps) defaultProps = element.type.defaultProps;

    for (let propName in config) {
      if (ownProperty(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  if (length >= 1) props.children = childrenArr.length === 1 ? childrenArr[0] : childrenArr;

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: element.type,
    key,
    ref,
    props,
    _owner
  }
};

/**
 * 和 React.createElement()属性无任何不同，不建议使用
*/
const createFactory = function (type) {
  let validatedFactory = createElement.bind(null, type);
  validatedFactory.type = type;

  return validatedFactory;
};

function isValidElement(object) {
  return typeof object === "object" &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
}
export {
  ReactCurrentOwner,
  cloneElement,
  createElement,
  createFactory,
  isValidElement,
}