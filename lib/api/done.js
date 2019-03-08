/**
 * @description This is the last step in the callback function, which is used to do some closing work.
 * @param {Function} callback callback
 * @return {Void}
 */

async function done(callback) {
  let requestQueue = this._filterQueue();
  let len = requestQueue.length;
  this._printHead(requestQueue);
  for (let index = 0; index < len; index++) {
    let item = requestQueue[index];
    const next = async () => {
      let prev = len > 1 && index > 0 ? requestQueue[index - 1] : null;
      item.options = item.optionsFn.call(this, prev);
      await this._work(item);
    }
    await next();
  }
  if (callback && callback.constructor === Function) {
    callback.call(this);
  } else {
    process.exit(1);
  }
}

module.exports = done;
