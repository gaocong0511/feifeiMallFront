'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var  _mall=require('util/mall.js');
var _payment=require('service/payment-service.js');
var paymentTemplate=require('./index.string');

var page={
    data:{
        orderNumber:_mall.getUrlParam('orderNumber')
    },
    init:function () {
        this.onLoad();
    },
    onLoad:function () {
        this.loadPaymentInfo();
    },
    //加载支付二维码
    loadPaymentInfo:function () {
        var _this=this,
            paymentHtml='',
            $pageWrap=$('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(_this.data.orderNumber,function (res) {
            paymentHtml=_mall.renderHtml(paymentTemplate,res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        },function (errMsg) {
            $pageWrap.html('<p class="err-tip">'+errMsg+'</p>')
        });
    },
    //轮询查询当前的订单的支付状态
    listenOrderStatus:function () {
        var _this=this;
        _this.paymentTimmer=window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber,function (res) {
                if(res===true){
                    window.location.href='./result.html?type=payment&orderNumber='+_this.data.orderNumber;
                }
            },function (errMsg) {
                _mall.errorTips(errMsg);
            })
        },5e3)
    }
};

$(function () {
    page.init();
});