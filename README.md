# reqman
> 随性所欲测，测你想测。
> Reqman is a tool that can quickly help nodejs engineers with api testing

# Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 8.0 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install reqman
```

## Features
  * out-of-the-box
  * Chain API
  * Based on request.js
  * Can test in complex scenarios
  * Easy test tool

## Super simple to use

Reqman is designed to be the simplest way possible to make http calls  just like request.js. It supports HTTPS and follows redirects by default.

You only need to write an anonymous function in the parameters of the ``push`` method, which returns an ``object``.

### examples1: Single request

```javascript
const Reqman = require('reqman');

//Just need to set up a basic domain
const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

req
//Get statistics for all users
.push(function() {
    return {
    method: "GET",
    url: `/api/user/count`
}})
.do()
```

### examples2: Chain API

Chain API, The result of the first request is taken as the parameter of the second request. like this:

```javascript
const Reqman = require('reqman');

//Just need to set up a basic domain
const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

//Define an object for the user
const user = {
    username: "admin"
    password: "admin"
}

//login
.push(function(){return {
    method: "POST",
    url: `/api/login`,
    data: user, // object for the user
    after: function (result) { //This callback function is called when this request ends.
        let body = JSON.parse(result.body);
        this.userToken = body.data.token;
    }
}})
//Update a user`s profile.
.push(function(){
    return false;
    return {
    method: "POST",
    url: `/api/user/updateInfo`,
    headers: {
        `Authorization`: this.userToken 
    },
    data: {
        nickname: "jack ma"
    }
}})
.do()//just do it.
```

### examples3: Only one

If you rename the ``push`` method to the ``only`` method, all other methods except it will fail.

```javascript
const Reqman = require('reqman');

//Just need to set up a basic domain
const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

//api a
.push(function(){return {
    method: "POST",
    url: `/api/a`
}})
//api b
.only(function(){return {
    method: "POST",
    url: `/api/b`
}})
//and api c
.push(function(){return {
    method: "POST",
    url: `/api/c`
}})
.do()//just do it.
```

Now, Only ``api-b`` is valid.

### examples4: Disable one

You return false before returning the option object. Easily disable a request.

```javascript
const Reqman = require('reqman');

//Just need to set up a basic domain
const req = new Reqman({
    baseUrl: "http://127.0.0.1:3000"
});

//api a
.push(function(){return {
    method: "POST",
    url: `/api/a`
}})
//api b
.push(function(){
    return false;
    return {
    method: "POST",
    url: `/api/b`
}})
//and api c
.push(function(){return {
    method: "POST",
    url: `/api/c`
}})
.do()//just do it.
```

The ``api-b`` will not execute.

[back to top](#reqman)