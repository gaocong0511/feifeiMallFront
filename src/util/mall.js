/*
 * @Author: gaocong 
 * @Date: 2018-07-26 15:34:43 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-26 18:42:01
 */
'use strict'
//引入hogan
var Hogan = require('hogan.js');

var conf = {
    serverHost: ''
}

var _mall = {
    //请求后台数据
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //当发出的请求返回成功时
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //强制登陆 当前并没有登陆
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //参数错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function (e) {
                typeof param.error === 'function' && param.error(e.statusText)
            }

        });
    },

    //获取服务端的地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },

    //获取url参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    //渲染html模板
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;

    },

    //统一登陆处理
    doLogin: function () {
        window.location.href = './login.html?redirect= ' + encodeURIComponent(window.location.href);
    }
};

module.exports = _mall;