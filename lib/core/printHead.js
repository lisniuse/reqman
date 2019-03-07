const chalk = require('chalk');

/**
 * @Description 
 */

async function printHead() {
  let now = "| Tested at: " + (new Date()).toString() + " |";
  let topStr = "+";
  let bottomStr = "+";
  Array.from({ length: now.length - 2 }).forEach(function () {
    topStr += "-";
    bottomStr += "-";
  })
  topStr += "+";
  bottomStr += "+";
  console.log(chalk.green(topStr));
  console.log(chalk.green(chalk.bold(now)));
  console.log(chalk.green(bottomStr));
}

module.exports = printHead;
