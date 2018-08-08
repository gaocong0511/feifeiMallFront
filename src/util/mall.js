/*
 * @Author: gaocong 
 * @Date: 2018-07-26 15:34:43 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-31 19:26:26
 */
'use strict';
//引入hogan
var Hogan = require('hogan.js');

var conf = {
    serverHost: 'http://127.0.0.1:8088'
};

var _mall = {
    //请求后台数据
    request: function (param) {
        var _this = this;
        console.log(param.url);
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //当发出的请求返回成功时
                if (1 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //强制登陆 当前并没有登陆
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //参数错误
                else if (0 === res.status) {
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
    //错误操作情况下的提示
    successTips: function (msg) {
        alert(msg || '操作成功');
    },
    //成功操作情况下的提示
    errorTips: function (msg) {
        alert(msg || '操作失败');
    },
    //对信息进行验证 值 验证的类型 支持非空 手机 邮箱
    validate:function(str,type){
        //去掉前后空格
        str=$.trim(str);
        //进行非空验证
        if('require'===type){
            return !!str;
        }
        //手机号验证
        if('phone'===type){
            return /^\d{11}$/.test(str);
        }
        //邮箱验证
        if('mail'===type){
            return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(str);
        }
    },
    //统一登陆处理
    doLogin: function () {
        window.location.href = './user-login.html?redirect= ' + encodeURIComponent(window.location.href);
    },
    //跳转回主页
    goHome:function(){
        window.location.href='./index.string'
    }
};

module.exports = _mall;