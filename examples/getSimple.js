'use strict'

const server = require("../server/server");
const Reqman = require("../lib/reqman");

//run server on 3000.
server();

//Just need to set up a basic domain.
const req = new Reqman({
  baseUrl: "http://127.0.0.1:3000"
});

req.
  push(function (prevElement) {
    return {
      method: "POST",
      url: `/?a=1`
    }
  })
  .push('name b', function (prevElement) {
    return {
      method: "GET",
      url: `/`,
      data: {
        a: '2'
      }
    }
  })
  .done(function () {
    process.exit(1);
  })
