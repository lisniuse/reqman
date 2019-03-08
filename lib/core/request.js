const fly = require('flyio');

/**
 * @description Used to send http requests.
 * @param {Object} options request options.
 * @return {Void}
 */

async function request(options = {
  headers: {},
  method: 'GET',
  url: '/'
}) {
  let method = options.method.toLowerCase();
  let headers = this._mergeHeaders(this._defaultHeader, options.headers);
  let promiseResult = fly.request(options.url, options.data, {
    method: method,
    headers: headers
  });
  return promiseResult;
}

module.exports = request;
