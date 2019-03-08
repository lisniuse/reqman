const _ = require('lodash');

/**
 * @description Used to merge request header information.
 * @param {Array} args As an array of headers.
 * @return {Object} Return a new headers object.
 */

function mergeHeaders(...args) {
  let _args = [];
  args.forEach(headers => {
    if (_.isObject(headers)) {
      let _headers = {};
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          const value = headers[key];
          _headers[key.toLowerCase()] = value;
        }
      }
      _args.push(_headers);
    }
  });
  return _.merge(..._args);
}

module.exports = mergeHeaders;
