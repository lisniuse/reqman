[English](./README.md) | [简体中文](./Readme_cn.md)

# Reqman

Reqman is a tool that can quickly help back-end engineers with api testing, as well as a nodejs-based crawler tool.

[![NPM version](https://badge.fury.io/js/reqman.svg)](http://badge.fury.io/js/reqman)

[![npm](https://nodei.co/npm/reqman.png)](https://www.npmjs.com/package/reqman)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 8.0 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install reqman
```

## Importing

```javascript
// 使用的是 Node.js `require()`
const Reqman = require('reqman');

// Using ES6 imports
import Reqman from 'reqman';
```

## Features

  * ✔︎ Chained API
  * ✔︎ Out of the box
  * ✔︎ Crawler, can simulate requests
  * ✔︎ Suitable for complex and strong coupling scenarios
  * ✔︎ Powerful request library [request](https://github.com/request/request) based on nodejs

## Super simple to use

Reqman is designed to be like [request](https://github.com/request/request) and is the easiest way to make http calls. It supports https, to follow redirection by default. 

All you have to do is write an anonymous function in the parameters of the ``push`` method that returns a ``object`` and return your request parameters.

### Example 1: a single request

```javascript
const Reqman = require('reqman');

//All you have to do is set up a request base address
const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

//For example, if you want to get statistics on all users, you can write like this:
req
.push(function() {
    return {
    method: "GET",
    url: `/api/user/count`
}})
.done();
```

If you specify the showInfo parameter as false, the results will not be printed to the screen, like this:

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

### Example 2: Chained API

In the chained API, the result of the first request is used as the argument to the second request. like this:

```javascript
const Reqman = require('reqman');

const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

//Define account password
const user = {
    username: "admin",
    password: "admin"
}

req
//Request a login api
.push(function() {
    return {
    method: "POST",
    url: `/api/login`,
    data: user, //Pass in the user object just defined to data
    complete: function (selfElement) { //Return the requestElement object of the queue
        let response = selfElement.result.response;
        let body = JSON.parse(response.body);
        //Note: It is recommended not to hang public variables directly on the reqman instance, which may override the requman properties and methods. Reqman provides a store object to store the public variables that need to be stored during the request process.
        this.store.userToken = body.data.token; //Get the user token
    }
}})
//Then we update the user's information with the token obtained after login.
.push(function(){
    return {
    method: "POST",
    url: `/api/user/updateInfo`,
    headers: {
        `Authorization`: this.store.userToken //The variables in the store can be directly used in subsequent requests.
    },
    data: {
        nickname: "jack ma" //Update nickname jack ma
    }
}})
.done()//just do it.
```

### Example 3: Example of a complete representation of reqman's api and features

```javascript
'use strict'

const req = new Reqman({
  baseUrl: "http://127.0.0.1:3000",
  output: "./request-result.txt", //Append the result returned after the request to the specified file path at the same time.
  specList: {
    type: 'valid', //Parameters: invalid or valid. Define valid or invalid requests.
    list: ['bob'] //Let the request named bob be valid and the rest of the requests invalid. If type is invalid, the opposite is true.
  }
});

req.
//Define a request named bob, and the prevElement parameter represents the requestElement object of the previous request.
push('bob', function (prevElement) { 
  return {
    method: "POST",
    url: `/?name=bob`,
    headers: { //With custom headers
      'content-type': 'application/octet-stream'
    },
    complete: function(selfElement) { //Callback function after request

    }
  }
})
//Define a request named jack, and the prevElement parameter represents the requestElement object of the previous request.
.push('jack', function (prevElement) {
  return {
    baseUrl: 'http://127.0.0.1:4000', //Customize the base address for this request
    output: "./jack-result.txt", //Customize the output file path for this request
    method: "GET",
    url: `/`,
    data: {
      name: 'jack'
    },
    complete: function(selfElement) { //Callback function after request
      //do something...
    }
  }
})
.done(function () {
  //exit the program
  process.exit(1);
})

```

### More examples

More examples in the projects folder of the project, you can run this command directly:

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
