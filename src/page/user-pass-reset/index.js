/*
 * @Author: gaocong
 * @Date:   2018-07-25 14:32:26
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-08-01 17:12:33
 */
'use strict';
var mall = require('util/mall.js');
var _user = require('service/user-service.js');
require('page/common/nav-simple/index.js');
require('./index.css');
//统一错误处理的方法 提示表单里的错误信息
var formError = {
    show: function (error) {
        $('.error-item').show().find('.error-msg').text(error);
    },
    hide: function () {
        $('.error-item').hide().find('.error-msg').text('');
    }
};

//page 逻辑部分
var page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        //进入页面的时候把用户名的框给显示出来
        this.onLoad();
        this.bindEvents();
    },
    onLoad: function () {
        this.loadStepUsername();
    },
    //加载用户名容器
    loadStepUsername: function () {
        $('.step-username').show();
    },
    //加载问题答案的容器
    loadStepQuestion: function () {
        formError.hide();
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    //加载密码的容器
    loadStepPassword: function () {
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();
    },
    bindEvents: function () {
        var _this = this;
        //点击登录按钮进行登录操作
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            //如果用户名存在的话
            if (username) {
                _user.getQuestion(username,
                    function (res) {
                        _this.data.username = username;
                        _this.data.question = res;
                        _this.loadStepQuestion();
                    },
                    function (errMsg) {
                        formError.show(errMsg);
                    })
            }
            //如果用户名没有输入的话
            else {
                formError.show('请输入用户名');
            }
        });

        //输入密码提示问题答案中的按钮被点击时
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            //如果已经输入了问题的答案的话
            if (answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function (errMsg) {
                    formError.show(errMsg);
                })
            }
            //如果没有输入用户名的话
            else {
                formError.show('请输入密码提示问题的答案');
            }
        });

        //输入新密码后按钮点击之后进行密码重置
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            //如果已经输入了密码的话  并且密码的长度是大于6位的
            if (password && password.length >= 6) {
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function (errMsg) {
                    formError.show(errMsg);
                })
            }
            //密码不符合规范或者密码的长度不够长的话
            else {
                formError.show('请输入不少于6位的新密码');
            }
        });

    }
};

$(function () {
    page.init();
});