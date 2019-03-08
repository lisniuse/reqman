const _ = require('lodash');

/**
 * @description Function is to filter out the queue.
 * @return {Array} queue array.
 */

function filterQueue() {
  let newQueue = [];
  let requestQueue = this.requestQueue;
  let specList = this.options.specList;
  let hasSpecList = _.isObject(specList) && specList.list.length > 0;
  let len = requestQueue.length;

  for (let index = 0; index < len; index++) {
    let item = requestQueue[index];
    const push = () => {
      newQueue.push(item);
    }
    if (hasSpecList) {
      if (specList.type === 'invalid' || !specList.type) {
        if (!_.includes(specList.list, item.name)) {
          push();
        }
      } else if (specList.type === 'valid') {
        if (_.includes(specList.list, item.name)) {
          push();
        }
      }
    } else {
      push();
    }
  }

  return newQueue;
}

module.exports = filterQueue;
