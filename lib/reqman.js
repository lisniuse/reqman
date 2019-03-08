'use strict';

const mixin = require('./utils/mixin');
const apiPush = require('./api/push');
const apiDone = require('./api/done');
const corePrintError = require('./core/printError');
const coreOutputResult = require('./core/outputResult');
const corePrintResult = require('./core/printResult');
const corePrintHead = require('./core/printHead');
const coreFilterQueue = require('./core/filterQueue');
const coreRequest = require('./core/request');
const coreWork = require('./core/work');
const coreMergeHeaders = require('./core/mergeHeaders');
const constDefaultHeader = require('./const/defaultHeaders');

/**
 * Main class
 */
class Reqman {

  /**
   * @description Necessary parameters, usually only need one basic domain
   * @param {Object} options options
   */

  constructor(options = {
    baseUrl: '', //Basic request address.
    output: '', //Outputs all results to a file with the specified path.
    specList: false, //Special list.
  }) {
    //Initialization parameter.
    this.options = options;
    this.store = {};
    this.requestQueue = [];
    this._defaultHeader = constDefaultHeader;
  }

}

mixin(Reqman, "public", "push", apiPush)
  (Reqman, "public", "done", apiDone)
  (Reqman, "private", "_work", coreWork)
  (Reqman, "private", "_printError", corePrintError)
  (Reqman, "private", "_outputResult", coreOutputResult)
  (Reqman, "private", "_printResult", corePrintResult)
  (Reqman, "private", "_printHead", corePrintHead)
  (Reqman, "private", "_mergeHeaders", coreMergeHeaders)
  (Reqman, "private", "_filterQueue", coreFilterQueue)
  (Reqman, "private", "_request", coreRequest);

module.exports = Reqman;
