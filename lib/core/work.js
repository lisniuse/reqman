const _ = require('lodash');
const chalk = require('chalk');

/**
 * @Description Element-by-element request processing.
 * @param {Object} queueElement Queue element.
 */

async function work(queueElement) {
  let options = queueElement.options;
  let baseUrl = options.baseUrl || this.options.baseUrl;
  options.url = baseUrl + options.url;
  let result = "";
  try {
    result = await this._request(options);
  } catch (err) {
    this._printError(err, queueElement);
    process.exit(1);
  }
  queueElement.result = result;
  if (options.showInfo !== false) {
    this._printResult(queueElement);
  }
  if (_.isFunction(options.complete)) {
    options.complete.call(this, queueElement);
  }
}

module.exports = work;
