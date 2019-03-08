'use strict'

const server = require("../server/server");
const Reqman = require("../lib/reqman");

//run server on 3000.
server("Hello World!");

//Just need to set up a basic domain
const req = new Reqman({
  baseUrl: "http://127.0.0.1:3000"
});

req
  .push(function () {
    return {
      method: "GET",
      url: `/`
    }
  })
  .done(function () {
    console.log("exit!");
    process.exit(1);
  })
