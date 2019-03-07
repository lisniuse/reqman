const chalk = require('chalk');

/**
 * @Description A function that outputs the wrong log.
 * @param {Object} result http result
 * @return {Void}
 */

async function printError(err, queueElement) {
  console.log(chalk.bold(`${chalk.green(">>>")} [${queueElement.name}] ${chalk.bgGreen(queueElement.options.method)}: ${queueElement.options.url}`))
  console.log(chalk.bold(chalk.red('[REQMAN ERROR]: \n\n' + JSON.stringify(err, null, 2))));
  console.log("\n");
}

module.exports = printError;
