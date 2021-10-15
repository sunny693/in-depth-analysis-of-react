
/**
 * @source react/packages/react/src/ReactElement.js
*/
import { ownProperty, formatProdErrorMessage, } from './../utils/index';
import { REACT_ELEMENT_TYPE } from './../shared/ReactSymbols';

export const ReactCurrentOwner = { current: null };

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

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

    if (config.key !== undefined) key = "" + config.key;

    let defaultProps;
    if (element.type && element.type.defaultProps) defaultProps = element.type.defaultProps;

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

export const createElement = createElementWithValidation;
export const createFactory = function (type) {
  let validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;

  return validatedFactory;
};