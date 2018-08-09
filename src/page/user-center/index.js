'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mall = require('util/mall');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var template = require('./index.string');

//用户个人信息界面的页面逻辑部分

var page = {
    init: function () {
        this.onLoad();
    },
    //加载用户的个人信息
    onLoad: function () {
        navSide.init({
            name: 'user-center'
        });
        var userInfoHtml = '';
        _user.getUserInfo(function (res) {
            userInfoHtml = _mall.renderHtml(template, res);
            $('.panel-body').html(userInfoHtml)
        }, function (errMsg) {
            _mall.errorTips(errMsg)
        })
    }
};

$(function () {
    page.init();
});