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
    init: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        var _this = this;
        //验证username是不是已经存在了的事件
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (error) {
                formError.show(error);
            })
        });
        //点击注册按钮进行登录操作
        $('#submit').click(function () {
            _this.submit();
        });
        //回车点击也进行提交 这里使用id选择器没有起作用 这里使用的是class的选择器
        $('.user-content').keyup(function (e) {
            console.log(e.keyCode);
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    //提交表单(实际上并没有表单)
    submit: function () {
        //验证填写是不是正确
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val()),
                passwordConfirm :$.trim($('#password-confirm').val()),
                email: $.trim($('#email').val()),
                phone: $.trim($('#phone').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            //表单数据的验证结果
            validateResult = this.formValidate(formData);
        //验证成功 直接提交
        if (validateResult.status) {
            _user.register(formData, function (res) {
                window.location.href = './result.html?type=register';
                formError.hide();
            }, function (error) {
                formError.show(error);
            })
        }
        //验证失败 弹出提示信息
        else {
            formError.show(validateResult.msg);
        }
    },
    //表单验证
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!mall.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!mall.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length<6){
            result.msg = '密码不能短于6位';
            return result;
        }
        if (!mall.validate(formData.passwordConfirm, 'require')) {
            result.msg = '确认密码不能为空';
            return result;
        }
        if(formData.password!==formData.passwordConfirm){
            result.msg = '两次输入的密码不一致 请检查';
            return result;
        }
        if (!mall.validate(formData.email, 'require')) {
            result.msg = '邮箱不能为空';
            return result;
        }
        if (!mall.validate(formData.email, 'mail')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!mall.validate(formData.phone, 'require')) {
            result.msg = '手机号不能为空';
            return result;
        }
        if (!mall.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!mall.validate(formData.question, 'require')) {
            result.msg = '提示问题不能为空';
            return result;
        }
        if (!mall.validate(formData.answer, 'require')) {
            result.msg = '提示问题答案不能为空';
            return result;
        }
        result.status = true;
        return result;
    }
};

$(function () {
    page.init();
});