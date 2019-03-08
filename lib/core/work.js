const _ = require('lodash');
const chalk = require('chalk');

/**
 * @description Element-by-element request processing.
 * @param {Object} queueElement Queue element.
 * @return {Void}
 */

async function work(queueElement) {
  let options = queueElement.options;
  let baseUrl = options.baseUrl || this.options.baseUrl;
  let outputPath = options.output || this.options.output;
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
  if (outputPath) {
    this._outputResult(queueElement, outputPath);
  }
  if (_.isFunction(options.complete)) {
    options.complete.call(this, queueElement);
  }
}

module.exports = work;
