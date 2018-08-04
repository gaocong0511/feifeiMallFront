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
        //点击登录按钮进行登录操作
        $('#submit').click(function () {
            _this.submit();
        });
        //回车点击也进行提交
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
                password: $.trim($('#password').val())
            },
            //表单数据的验证结果
            validateResult = this.formValidate(formData)
        //验证成功 直接提交
        if (validateResult.status) {
            _user.login(formData, function (res) {
                window.location.href = mall.getUrlParam('redirect') || './index.html';
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
        result.status = true;
        return result;
    }
};

$(function () {
    page.init();
});