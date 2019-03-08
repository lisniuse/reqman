const _ = require('lodash');

/**
 * @description Check that a function returns false.
 * @return {Void}
 */

function checkFunctionReturn(fn) {
  return fn.toString().includes('return false');
}

module.exports = checkFunctionReturn;
