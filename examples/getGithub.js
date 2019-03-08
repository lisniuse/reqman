//引入Reqman，记得第一个字母要大写，因为是Reqman是一个类。
const Reqman = require('../lib/reqman');

//new Reqman，然后参数传入一个基地址。
const req = new Reqman({
  baseUrl: "https://github.com"
});

//举个例子，你可以用reqman抓取本项目的github地址，像这样：
req
  .push(function () {
    return {
      method: "GET",
      url: `/lisniuse/reqman`
    }
  })
  .done();
