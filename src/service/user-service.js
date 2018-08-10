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
    //检查用户名是不是已经存在了
    checkUsername: function (username, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/checkValid.do'),
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
    checkLogin: function (resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //用户重置密码的时候根据用户名获得用户的密码提示问题
    getQuestion: function (username, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //检查用户的密码提示问题的答案是不是正确
    checkAnswer: function (userInfo, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //将用户的密码进行重置
    resetPassword: function (userInfo, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取当前登录用户的个人信息
    getUserInfo: function (resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //当前登录了的用户退出登录
    logout: function (resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //更新用户信息
    updateUserInfo:function (userInfo,resolve,reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/update_information.do'),
            method: 'POST',
            data:userInfo,
            success: resolve,
            error: reject
        })
    },
    //当用户登录的时候进行密码的更新
    updatePassword:function (userInfo,resolve,reject) {
        _mall.request({
            url: _mall.getServerUrl('/user/reset_password.do'),
            method: 'POST',
            data:userInfo,
            success: resolve,
            error: reject
        })
    },
};

module.exports = _user;