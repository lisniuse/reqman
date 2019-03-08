/**
 * Represents the request element in the request chain.
 */

class RequestElement {
  constructor(options = {}) {
    this.name = options.name || '';
    this.optionsFn = options.optionsFn || '';
    this.options = options.options || {};
    this.result = options.result || {};
    this.output = '';
  }
}

module.exports = RequestElement;
