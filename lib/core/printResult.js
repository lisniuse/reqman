const chalk = require('chalk');
const WordTable = require('word-table');
const _ = require('lodash');

/**
 * @description Add a line number to the text
 * @param {String} str Source string
 * @return {String} String with line number
 */

function addLineNumber(str) {

  function addPreZero(num, textLines) {
    let zeroLen = textLines.toString().split('').length - 1;
    let zeroStr = _.repeat('0', zeroLen);
    let lineNumber = (zeroStr + num).slice(-10);
    return chalk.white(lineNumber + ' | ');
  }

  let strArr = str.split("\n");
  let newStr = "";
  strArr.forEach((s, index) => {
    newStr += `${addPreZero(index, strArr.length)}${s} \n`;
  });
  return newStr;
}

/**
 * @description Log output function.
 * @param {Object} result http result
 * @return {Void}
 */

function printResult(queueElement) {
  let request = queueElement.result.request;
  let response = queueElement.result.response;
  let options = queueElement.options;
  let tableHeader = ['Name', 'Method', 'Url', 'Data'];
  let tableBody = [
    [queueElement.name, request.method, request.url, JSON.stringify(options.data) || 'None']
  ];
  let wt = new WordTable(tableHeader, tableBody);
  console.log(chalk.green(wt.string()));
  console.log(chalk.bold(chalk.yellow('[ response body ] \n')));
  let res = typeof response.body === "object" ? JSON.stringify(response.body) : response.body;
  res = res.replace(/(^\s*)|(\s*$)/g, "");
  if (res[0] === "{") {
    res = JSON.parse(res);
    console.log(chalk.gray(addLineNumber(JSON.stringify(res, null, 2))));
  } else {
    console.log(chalk.gray(addLineNumber(res)));
  }
  console.log("\n");
}

module.exports = printResult;
