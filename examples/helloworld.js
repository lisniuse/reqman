'use strict'

const Koa = require('koa');
const app = new Koa();
const Reqman = require("../lib/reqman");

app.use(async ctx => {
    async function getBody () {
        return new Promise(function (reslove, reject) {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data;
            })
            ctx.req.addListener("end", function() {
                reslove(postdata);
            });
        });
    }
    let bodyData = await getBody();
    bodyData = bodyData !== "" ? bodyData : 'no body';
    let response = `
> [query data]: \n${JSON.stringify(ctx.query)}
> [body data]: \n${bodyData}
    `;
    ctx.body = response;
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