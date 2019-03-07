const fly = require('flyio');

/**
 * @Description the method get
 * @param {String} url request url.
 * @param {Object} headers request headers.
 * @return {Promise}
 */

function get(url, headers) {
  return fly.get(url, {}, {
    headers
  });
}

/**
 * @Description the method get with url
 * @param {String} url request url.
 * @param {Object} data request data.
 * @param {Object} headers request headers.
 * @return {Promise}
 */

function get(url, data, headers) {
  return fly.get(url, data, {
    headers
  });
}

/**
 * @Description the method get with url
 * @param {String} url request url.
 * @param {Object} data request data.
 * @return {Promise}
 */

function post(url, data, headers) {
  return fly.post(url, data, {
    headers
  });
}

/**
 * @Description Used to send http requests.
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
  let promiseResult = "";
  switch (method) {
    case 'get':
      if ( options.data ) {
        promiseResult = get(options, options.data, headers);
      } else {
        promiseResult = get(options, headers);
      }
      break;
    case 'post':
      promiseResult = post(options, options.data, headers);
      break;
  }
  return promiseResult;
}

module.exports = request;
