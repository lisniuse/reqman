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
    method: "GET",
    url: `/?a=1`, 
    data: {
        bar: 'foo'
    }
}})
.push(function() {
    return {
    method: "GET",
    url: `/`, 
    data: {
        bar: 'foo'
    }
}})
.do(function () {
    console.log("exit!");
    process.exit(1);
})