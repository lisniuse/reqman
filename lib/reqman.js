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
  ("public", "done", apiDone)
  ("private", "_work", coreWork)
  ("private", "_printError", corePrintError)
  ("private", "_outputResult", coreOutputResult)
  ("private", "_printResult", corePrintResult)
  ("private", "_printHead", corePrintHead)
  ("private", "_mergeHeaders", coreMergeHeaders)
  ("private", "_filterQueue", coreFilterQueue)
  ("private", "_request", coreRequest);

module.exports = Reqman;
