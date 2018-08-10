'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mall = require('util/mall.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');

//用户个人信息界面的页面逻辑部分

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    //加载用户的个人信息
    onLoad: function () {
        navSide.init({
            name: 'user-pass-update'
        });
    },
    //绑定事件
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                    password: $.trim($('#password').val()),
                    passwordNew: $.trim($('#password-new').val()),
                    passwordConfirm: $.trim($('#password-confirm').val())
                },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                //进行密码重置
                _user.updatePassword({
                    passwordOld:userInfo.password,
                    passwordNew:userInfo.passwordNew
                }, function (res, msg) {
                    _mall.successTips(msg);
                }, function (errMsg) {
                    _mall.errorTips(errMsg)
                })
            } else {
                _mall.errorTips(validateResult.msg);
            }
        })
    },
    //验证要提交的表单上面的信息是不是正确的
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mall.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg='密码长度不得少于6位';
            return result;
        }
        if(formData.passwordNew!==formData.passwordConfirm){
            result.msg='两次输入的密码不一致';
        }
        result.status = true;
        return result;
    }
};

$(function () {
    page.init();
});