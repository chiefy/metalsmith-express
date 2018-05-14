'use strict';


function isString(thing) {
  return typeof thing === 'string' || thing instanceof String
};


function isFunction(thing) {
  return typeof thing === 'function' || thing instanceof Function
}

module.exports = {
  isString   : isString,
  isFunction : isFunction
};
