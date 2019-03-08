const _ = require('lodash');

/**
 * @description Mix a method or parameter into an object.
 * @param {Function} callback callback
 * @return {Function}
 */

function mixin(targetClass, descriptor, propertyName, propertyValue) {
  Object.defineProperty(targetClass.prototype, propertyName, {
    enumerable: descriptor === 'public' ? true : false,
    configurable: true,
    writable: true,
    value: propertyValue
  });
  return mixin;
}

module.exports = mixin;
