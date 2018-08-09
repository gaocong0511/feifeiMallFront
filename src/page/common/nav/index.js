/*
 * @Author: gaocong 
 * @Date: 2018-07-30 17:08:00 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-30 19:39:09
 */
'use strict';

require('./index.css');

var _mall = require("util/mall.js");
var _user = require('service/user-service.js');
/*var _cart=require('service/cart-service.js');*/

var nav = {
    init: function () {
        this.bindEvents();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvents: function () {
        //点击登录按钮的时候
        $('.js-login').click(function () {
            _mall.doLogin();
        });
        //点击注册按钮的时候
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        });
        //点击退出按钮的时候
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            }, function (errMsg) {
                _mall.errorTips(errMsg);
            })
        });
    },
    loadUserInfo: function () {
        _user.checkLogin(function (res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        },function (errMsg) {
        });
    },
    loadCartCount: function () {

    }

};
module.exports = nav.init();