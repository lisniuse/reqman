const _ = require('lodash');

/**
 * @Description Check that a function returns false.
 */

function checkFunctionReturn(fn) {
  return fn.toString().includes('return false')
}

module.exports = checkFunctionReturn;