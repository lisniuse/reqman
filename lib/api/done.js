const _ = require('lodash');

/**
 * @Description This is the last step in the callback function, which is used to do some closing work.
 * @param {Function} callback callback
 */

async function done(callback) {
  this._printHead();
  let specList = this.options.specList;
  let hasSpecList = _.isObject(specList) && specList.list.length > 0;
  let requestQueue = this.requestQueue;
  let len = requestQueue.length;
  for (let index = 0; index < len; index++) {
    let item = requestQueue[index];
    const next = async () => {
      let prev = len > 1 && index > 0 ? requestQueue[index - 1] : null;
      item.options = item.optionsFn.call(this, prev);
      await this._work(item);
    }
    if ( hasSpecList ) {
      if ( specList.type === 'invalid' || !specList.type ) {
        if (!_.includes(specList.list, item.name)) {
          await next();
        }
      } else if ( specList.type === 'valid' ) {
        if (_.includes(specList.list, item.name)) {
          await next();
        }
      }
    } else {
      await next();
    }
  }
  if (callback && callback.constructor === Function) {
    callback.call(this);
  } else {
    process.exit(1);
  }
}

module.exports = done;
