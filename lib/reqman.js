'use strict';
const request = require('request');
const chalk = require('chalk');

module.exports = class Reqman {
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

    only(opt) {
        this.reqList = [opt];
        this.hasOnly = true;
        return this;
    }

    _last() {
        return this.result[this.result.length - 1];
    }

    async do(callback) {
        for (let index = 0; index < this.reqList.length; index++) {
            const element = this.reqList[index].call(this);
            await this._work(element);
        }
        if ( callback.constructor === Function ) {
            callback.call(this);
        }
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
        console.log(`${chalk.green(">>>")} [${this.result.length - 1}] ${chalk.bgGreen(result.method)}: ${result.url}`)
        console.log(`${chalk.blue('[*]response body start[*]:')} `);

        let res = result.body;
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

    _request(rOpts) {
        let that = this;
        return new Promise(function (reslove, reject) {
            rOpts.jar = that._j;
            rOpts.headers = rOpts.headers ? rOpts.headers : {};
            rOpts.headers = Object.assign(rOpts.headers, that.defaultHeader);
            request(rOpts, function (error, response, body) {
                reslove(Object.assign({
                    error: error,
                    response: response,
                    body: body
                }, rOpts))
            });
        })
    }
}
