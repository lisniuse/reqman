const chalk = require('chalk');
const WordTable = require('word-table');

/**
 * @description Print request time
 * @return {Void}
 */

async function printHead(requestQueue) {
  let queusNames = requestQueue.map(i => i.name);
  let tableHeader = ['Request time', new Date().toLocaleString()];
  let tableBody = [
    ["Request chain", queusNames.join(' → ')]
  ];
  let wt = new WordTable(tableHeader, tableBody);
  console.log(chalk.bold(chalk.cyan(wt.string())));
  console.log("\n");
}

module.exports = printHead;
