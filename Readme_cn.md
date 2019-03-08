[English](./README.md) | [简体中文](./Readme_cn.md)

# Reqman

Reqman是一个可以快速帮助后端工程师进行api测试的工具，同时也是一个基于nodejs的爬虫工具。

[![NPM version](https://badge.fury.io/js/reqman.svg)](http://badge.fury.io/js/reqman)

[![npm](https://nodei.co/npm/reqman.png)](https://www.npmjs.com/package/reqman)

## 安装

这是一个通过 [npm registry](https://www.npmjs.com/) 提供的 [Node.js](https://nodejs.org/en/) 模块。

在安装之前，下载并安装Node.js。需要[Node.js 8.0](https://nodejs.org/en/download/)或更高版本。

使用[`npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)命令完成安装：

```bash
$ npm install reqman
```

## 引入使用

```javascript
// 使用的是 Node.js `require()`
const Reqman = require('reqman');

// Using ES6 imports
import Reqman from 'reqman';
```

## 特性

  * ✔︎ 链式API
  * ✔︎ 开箱即用
  * ✔︎ 可爬虫、可模拟请求
  * ✔︎ 适用于复杂强耦合场景
  * ✔︎ 基于nodejs强大请求库 [request](https://github.com/request/request)

## 超简单的入门教程

Reqman被设计成像 [request](https://github.com/request/request) 一样，是进行http调用的最简单的方式。它支持https，默认情况下遵循重定向。

你只需要在返回一个``object`` 的 ``push`` 方法的参数中编写一个匿名函数，返回你的请求参数即可。

### 例子1：单个请求

```javascript
const Reqman = require('reqman');

//只需要设置一个请求基地址
const req = new Reqman({
  baseUrl: "http://127.0.0.1:3000"
});

//比如你想获取所有用户的统计信息，你可以这样写
req
  .push(function () {
    return {
      method: "GET",
      url: `/api/user/count`
    }
  })
  .done();

```

如果你指定showInfo参数为false，那么就不会打印结果到屏幕上，像这样：

```javascript
req
  .push(function () {
    return {
      method: "GET",
      url: `/api/user/count`,
      showInfo: false
    }
  })
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
  username: "admin",
  password: "admin"
}

req
  //请求登陆地址
  .push(function () {
    return {
      method: "POST",
      url: `/api/login`,
      data: user, //传入刚刚定义的user对象到data
      complete: function (selfElement) { //返回该队列的requestElement对象
        let response = selfElement.result.response;
        let body = JSON.parse(response.body);
        //注意：建议不要把公共变量直接挂到reqman的实例上，可能会覆盖requman的属性和方法，reqman提供了一个store对象用于存储请求过程中需要存储的公共变量。
        this.store.userToken = body.data.token; //拿到用户token
      }
    }
  })
  //然后我们以登陆之后的获取到的token来更新用户的信息。
  .push(function () {
    return {
      method: "POST",
      url: `/api/user/updateInfo`,
      headers: {
        'Authorization': this.store.userToken //之后的请求中可以直接使用store里的变量
      },
      data: {
        nickname: "jack ma" //更新昵称为 jack ma
      }
    }
  })
  .done()//just do it.

```

### 例字3：完整体现reqman的api和特性的例子

```javascript
'use strict'

const req = new Reqman({
  baseUrl: "http://127.0.0.1:3000",
  output: "./request-result.txt", //将请求后返回的结果同时追加写入到指定的文件路径
  specList: {
    type: 'valid', //参数：invalid 或 valid。定义有效或者无效的请求。
    list: ['bob'] //让名为bob的请求有效，其余的请求失效。如果type为invalid，则相反。
  }
});

//请求链
req.
  //定义一个名为bob的请求，prevElement参数表示上一个请求的requestElement对象。
  push('bob', function (prevElement) {
    return {
      method: "POST",
      url: `/?name=bob`,
      headers: { //附带自定义headers
        'content-type': 'application/octet-stream'
      },
      complete: function (selfElement) { //请求完毕后的回调函数

      }
    }
  })
  //定义一个名为jack的请求，prevElement参数表示上一个请求的requestElement对象。
  .push('jack', function (prevElement) {
    return {
      baseUrl: 'http://127.0.0.1:4000', //为该请求自定义基地址
      output: "./jack-result.txt", //为该请求自定义输出文件路径
      method: "GET",
      url: `/`,
      data: {
        name: 'jack'
      },
      showInfo: false, //不将返回的body信息打印出来
      complete: function (selfElement) { //请求完毕后的回调函数
        //do something...
      }
    }
  })
  .done(function () {
    //退出程序
    process.exit(1);
  })

```

### 更多例子

更多例子在项目的 examples 文件夹中，你可以直接运行：

```bash
node getHelloworld.js
```

## License

The MIT License (MIT)

Copyright (c) 2015-present ZhiBing \<17560235@qq.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[back to top](#reqman)
