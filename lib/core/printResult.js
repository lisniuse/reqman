const chalk = require('chalk');

/**
 * @Description Log output function.
 * @param {Object} result http result
 * @return {Void}
 */

async function printResult(queueElement) {
  let request = queueElement.result.request;
  let response = queueElement.result.response;
  console.log(chalk.bold(`${chalk.green(">>>")} [${queueElement.name}] ${chalk.bgGreen(request.method)}: ${request.url}`))
  console.log(`${chalk.blue('[*]response body start[*]:')} `);

  let res = typeof response.body === "object" ? JSON.stringify(response.body) : response.body;
  res = res.replace(/(^\s*)|(\s*$)/g, "");
  if (res[0] === "{") {
    res = JSON.parse(res);
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.log(res);
  }
  console.log(`${chalk.blue('[*]response body end[*]:')} `);
  console.log("\n");
}

module.exports = printResult;
