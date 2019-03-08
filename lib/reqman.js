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

mixin(Reqman, "public", "push", apiPush);
mixin(Reqman, "public", "done", apiDone);
mixin(Reqman, "private", "_work", coreWork);
mixin(Reqman, "private", "_printError", corePrintError);
mixin(Reqman, "private", "_outputResult", coreOutputResult);
mixin(Reqman, "private", "_printResult", corePrintResult);
mixin(Reqman, "private", "_printHead", corePrintHead);
mixin(Reqman, "private", "_mergeHeaders", coreMergeHeaders);
mixin(Reqman, "private", "_filterQueue", coreFilterQueue);
mixin(Reqman, "private", "_request", coreRequest);


module.exports = Reqman;
