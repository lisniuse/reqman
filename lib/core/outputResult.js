const fs = require('fs');
const WordTable = require('word-table');

/**
 * @description Output content to a file
 * @param {QueueElement} QueueElement QueueElement object
 * @param {String} filePath file output path
 * @return {Void}
 */

function outputResult(queueElement, filePath) {
  let request = queueElement.result.request;
  let response = queueElement.result.response;
  let options = queueElement.options;
  let content = "";
  let tableHeader = ['Name', 'Method', 'Url', 'Data'];
  let tableBody = [
    [queueElement.name, request.method, request.url, JSON.stringify(options.data) || 'None']
  ];
  // basic usage
  let wt = new WordTable(tableHeader, tableBody);
  content += wt.string();
  content += '\n[*response body*] \n';
  let res = typeof response.body === "object" ? JSON.stringify(response.body) : response.body;
  res = res.replace(/(^\s*)|(\s*$)/g, "");
  if (res[0] === "{") {
    res = JSON.parse(res);
    content += JSON.stringify(res, null, 2);
  } else {
    content += res;
  }
  content += "\n";
  fs.appendFileSync(filePath, content, 'utf-8');
}

module.exports = outputResult;
