'use strict'

const server = require("../server/server");
const Reqman = require("../lib/reqman");

//run server on 3000.
server();

//Just need to set up a basic domain.
const req = new Reqman({
  baseUrl: "http://127.0.0.1:3000",
  specList: {
    type: 'invalid', //invalid or valid
    list: ['bob'] //Only jack exists.
  },
});

//Request chain.
req.
push('bob', function (prevElement) {
  return {
    method: "POST",
    url: `/?name=bob`
  }
})
.push('jack', function (prevElement) {
  return {
    method: "GET",
    url: `/`,
    data: {
      name: 'jack'
    }
  }
})
.done(function () {
  process.exit(1);
})
