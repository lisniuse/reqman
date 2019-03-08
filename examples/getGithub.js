//Importing Reqman, remember to capitalize the first letter because Reqman is a class.
const Reqman = require('../lib/reqman');

//new Reqman，and then the parameter is passed in a base address.
const req = new Reqman({
  baseUrl: "https://github.com"
});

//For example, you can use reqman to grab the github address of this project, like this:
req
  .push(function () {
    return {
      method: "GET",
      url: `/lisniuse/reqman`
    }
  })
  .done();
