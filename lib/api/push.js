const _ = require('lodash');
const checkFunctionReturnFalse = require('../utils/checkFunctionReturnFalse');

/**
 * @Description Insert request into request chain
 * @param {Function} options request options
 * @return {this}
 */

function push(requestName, optionsFn = false) {
  let name = requestName;
  if (_.isFunction(name)) {
    optionsFn = requestName;
    name = this.requestQueue.length.toString();
  }
  if (this.hasOnly) {
    return this;
  }
  if (!_.isFunction(optionsFn)) {
    return this;
  }
  if (checkFunctionReturnFalse(optionsFn)) {
    return this;
  }
  this.requestQueue.push({
    name: name,
    optionsFn: optionsFn,
    options: {},
    result: {}
  });
  return this;
}

module.exports = push;
