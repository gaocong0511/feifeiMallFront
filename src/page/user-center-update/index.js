'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mall = require('util/mall.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var template = require('./index.string');

//用户个人信息界面的页面逻辑部分

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    //加载用户的个人信息
    onLoad: function () {
        navSide.init({
            name: 'user-center'
        });
      this.loadUserInfo();
    },
    //加载当前用户的信息
    loadUserInfo:function () {
        var userInfoHtml = '';
        _user.getUserInfo(function (res) {
            userInfoHtml = _mall.renderHtml(template, res);
            $('.panel-body').html(userInfoHtml)
        }, function (errMsg) {
            _mall.errorTips(errMsg)
        })
    },
    //绑定事件
    bindEvent:function () {
        var _this=this;
        $(document).on('click','.btn-submit',function () {
            var userInfo={
                phone:$.trim($('#phone').val()),
                email:$.trim($('#email').val()),
                question:$.trim($('#question').val()),
                answer:$.trim($('#answer').val())
            },
            validateResult=_this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo,function (res,msg) {
                    _mall.successTips(msg);
                    window.location.href='./user-center.html'
                },function (errMsg) {
                    _mall.errorTips(errMsg)
                })
            }else{
                _mall.errorTips(validateResult.msg);
            }
        })
    },
    //验证要提交的表单上面的信息是不是正确的
    validateForm:function (formData) {
        var result={
            status:false,
            msg:''
        };
        if (!_mall.validate(formData.email, 'require')) {
            result.msg = '邮箱不能为空';
            return result;
        }
        if (!_mall.validate(formData.email, 'mail')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_mall.validate(formData.phone, 'require')) {
            result.msg = '手机号不能为空';
            return result;
        }
        if (!_mall.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_mall.validate(formData.question, 'require')) {
            result.msg = '提示问题不能为空';
            return result;
        }
        if (!_mall.validate(formData.answer, 'require')) {
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