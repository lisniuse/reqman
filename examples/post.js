'use strict'

const server = require("../server/server");
const Reqman = require("../lib/reqman");

//run server on 3000.
server();

//Just need to set up a basic domain
const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

req
.push(function() {
    return {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    url: `/`,
    data: {
        bar: 'foo'
    }
}})
.push(function() {
    return {
    method: "POST",
    url: `/`,
    data: {
        bar: 'foo'
    }
}})
.do(function () {
    console.log("exit!");
    process.exit(1);
})
