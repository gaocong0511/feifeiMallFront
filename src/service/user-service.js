/*
 * @Author: gaocong 
 * @Date: 2018-08-01 16:08:45 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-08-01 17:03:14
 */
'use strict';
var _mall = require('util/mall.js');

var _user = {
    //登录
    login: function (userInfo, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查用户名
    checkUsername: function (username, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/check-valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //用户注册
    register: function (userInfo, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查登录状态
    checkLogin: function (userInfo, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

module.exports = _user;