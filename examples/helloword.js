'use strict'

const Koa = require('koa');
const app = new Koa();
const Reqman = require("../lib/reqman");

app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(3000);

//Just need to set up a basic domain
const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

req
.push(function() {
    return {
    method: "GET",
    url: `/`
}})
.do(function () {
    console.log("exit!");
    process.exit(1);
})