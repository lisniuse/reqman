'use strict';

const request = require('request');
const chalk = require('chalk');

module.exports = class Reqman {

    /**
     * Necessary parameters, usually only need one basic domain
     * @param {Object} options options
     */
    constructor(options = {}) {
        this.options = options;
        let that = this;
        this.hasOnly = false;
        this.result = [];
        this.reqList = [];
        this._j = request.jar()
        this.defaultHeader = {
            'Accept-Encoding': 'gzip, deflate, br',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
        }
        this.cookies = {
            get: function (key) {
                if ( this._j.getCookies().length === 0 ) {
                    return "";
                }
                let temp = this._j.getCookies(this._last().url)[0];
                temp = temp.toString();
                if ( !key ) return temp;
                let param = temp.split("; ");
                let value = "";
                param.forEach(element => {
                    let _cookies = element.split("=");
                    if ( _cookies[0] === key ) {
                        value = _cookies[1];
                    }
                });
                return value;
            }.bind(that)
        }
    }

    /**
     * 
     * @param {Function} opt http options
     */
    push(opt) {
        if ( this.hasOnly ) {
            return this;
        }
        let reqObj = opt.call(this);
        if ( reqObj !== false ) {
            this.reqList.push(opt);
        }
        return this;
    }

    /**
     * 
     * @param {Function} opt http options
     */
    only(opt) {
        this.reqList = [opt];
        this.hasOnly = true;
        return this;
    }

    /**
     * 
     * @param {Function} callback callback
     */
    async do(callback) {
        this._logStart();
        for (let index = 0; index < this.reqList.length; index++) {
            const element = this.reqList[index].call(this);
            await this._work(element);
        }
        if ( callback.constructor === Function ) {
            callback.call(this);
        }
    }

    async _logStart() {
        let now = "| Tested at: " + (new Date()).toString() + " |";
        let topStr = "+";
        let bottomStr = "+";
        Array.from({length: now.length - 2}).forEach(function () {
            topStr+="-";
            bottomStr+="-";
        })
        topStr+="+";
        bottomStr+="+";
        console.log(chalk.green(topStr));
        console.log(chalk.green(chalk.bold(now)));
        console.log(chalk.green(bottomStr));
    }

    async _work(opts) {
        let options = Object.assign({}, opts);
        delete options.after;
        options.url = this.options.baseUrl + options.url;
        let result = await this._request(options);
        this.result.push(result);
        if (opts.showInfo !== false) {
            this._log(result)
        }
        if ( opts.after ) {
            opts.after.call(this, result);
        }
    }

    _log(result) {
        console.log(chalk.bold(`${chalk.green(">>>")} [${this.result.length - 1}] ${chalk.bgGreen(result.method)}: ${result.url}`))
        console.log(`${chalk.blue('[*]response body start[*]:')} `);

        let res = typeof result.response.body === "object" ? JSON.stringify(result.response.body) : result.response.body;
        res = res.replace(/(^\s*)|(\s*$)/g, "");
        if ( res[0] === "{" ) {
            res = JSON.parse(res);
            console.log(JSON.stringify(res, null, 2));
        } else {
            console.log(res);
        }
        console.log(`${chalk.blue('[*]response body end[*]:')} `);
        console.log("\n");
    }

    _toReqOpts(options) {
        let rOpts = Object.assign(options, {});
        rOpts.jar = this._j;
        rOpts.method = rOpts.method.toUpperCase();
        let _headers = {},
        headers = rOpts.headers ? rOpts.headers : {};
        headers = Object.assign(headers, this.defaultHeader);
        for(let key in headers) {
            _headers[key.toLocaleLowerCase()] = headers[key];
        }
        if ( rOpts.method !== "GET" && _headers["content-type"] === "application/json" ) {
            rOpts.body = JSON.stringify(rOpts.data);
        } else if ( rOpts.method !== "GET" && _headers["multipart/form-data"] ) {
            rOpts.formData = rOpts.data;
        } else if ( rOpts.method === "GET" ) {
            let ulen = rOpts.url.length;
            let ulast = rOpts.url[ulen-1];
            if ( rOpts.data ) {
                if ( ulast === "?" ) {
                    rOpts.url+=this._JsontoUrlParams(rOpts.data);
                } else if ( rOpts.url.indexOf("?") > 0 ) {
                    rOpts.url+="&" + this._JsontoUrlParams(rOpts.data);
                } else if ( rOpts.url.indexOf("?") === -1 ) {
                    rOpts.url+="?" + this._JsontoUrlParams(rOpts.data);
                }
            }
        } else {
            rOpts.form = rOpts.data;
        }
        rOpts.headers = _headers;
        delete rOpts.data;
        return rOpts;
    }

    _JsontoUrlParams(jsonObj) {
        return Object.keys(jsonObj).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(jsonObj[key]);
        }).join("&");
    }

    _request(options) {
        let rOpts = this._toReqOpts(options); 
        let that = this;
        return new Promise(function (reslove, reject) {
            request(rOpts, function (error, response, body) {
                reslove(Object.assign({
                    error: error,
                    response: response,
                    body: body
                }, rOpts))
            });
        })
    }

    _last() {
        return this.result[this.result.length - 1];
    }
}
