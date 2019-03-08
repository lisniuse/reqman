const _ = require('lodash');
const checkFunctionReturnFalse = require('../utils/checkFunctionReturnFalse');
const RequestElement = require('../core/RequestElement');

/**
 * @description Insert request into request chain
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
  this.requestQueue.push(new RequestElement({
    name: name,
    optionsFn: optionsFn
  }));
  return this;
}

module.exports = push;
