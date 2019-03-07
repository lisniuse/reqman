# reqman

> Reqman是一个可以快速帮助后端工程师进行api测试的工具。

# 安装

这是一个通过 [npm registry](https://www.npmjs.com/) 提供的 [Node.js](https://nodejs.org/en/) 模块。

在安装之前，下载并安装Node.js。需要[Node.js 8.0](https://nodejs.org/en/download/)或更高版本。

使用[`npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)命令完成安装：

```bash
$ npm install reqman
```

## 特性

  * ✔︎ 开箱即用的简易api测试工具
  * ✔︎ 链式API
  * ✔︎ 基于nodejs强大请求库 [request](https://github.com/request/request)
  * ✔︎ 可以用于``爬虫``
  * ✔︎ 可以在复杂场景中进行测试

## 超简单的入门教程

Reqman被设计成像 [request](https://github.com/request/request) 一样，是进行http调用的最简单的方式。它支持https，默认情况下遵循重定向。

你只需要在返回一个``object`` 的 ``push`` 方法的参数中编写一个匿名函数，返回你的请求参数即可。

### 例1：单个请求

```javascript
const Reqman = require('reqman');

//只需要设置一个请求基地址
const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

//比如你想获取所有用户的统计信息，你可以这样写
req
.push(function() {
    return {
    method: "GET",
    url: `/api/user/count`
}})
.done();
```

如果你指定showInfo参数为false，那么就不会打印结果到屏幕上，像这样：

```javascript
req
.push(function() {
    return {
    method: "GET",
    url: `/api/user/count`,
    showInfo: false
}})
.done();
```

### 例子2: 链式API

链API中，第一个请求的结果作为第二个请求的参数。就像这样：

```javascript
const Reqman = require('reqman');

//需要设置一个请求基地址
const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

//登陆的用户账号密码
const user = {
    username: "admin"
    password: "admin"
}

req

//请求登陆地址
.push(function() {
    return {
    method: "POST",
    url: `/api/login`,
    data: user, //传入刚刚定义的user对象到data
    complete: function (selfElement) { //返回该队列对象
        let response = selfElement.result.response;
        let body = JSON.parse(response.body);
        this.userToken = body.data.token; //拿到用户token
    }
}})
//然后我们以登陆之后的获取到的token来更新用户的信息。
.push(function(){
    return false;
    return {
    method: "POST",
    url: `/api/user/updateInfo`,
    headers: {
        `Authorization`: this.userToken 
    },
    data: {
        nickname: "jack ma" //更新昵称为 jack ma
    }
}})
.done()//just do it.
```

### 更多例子

更多例子在项目的 examples 文件夹中，你可以直接运行：
```bash
node getHelloworld.js
```

[back to top](#reqman)
