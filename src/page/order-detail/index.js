'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mall = require('util/mall.js');
var _order = require('service/order-service.js');
var orderTemplate = require('./index.string');


var page = {
    data: {
        orderNumber: _mall.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('确认取消该订单吗')) {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _mall.successTips('订单取消成功！');
                    _this.loadDetail();
                }, function (errMsg) {
                    _mall.errorTips(errMsg);
                })
            }
        })
    },
    //加载订单详情
    loadDetail: function () {
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        //处理从服务器端返回的数据
        _order.getOrderDetail(_this.data.orderNumber, function (res) {
            _this.dataFilter(res);
            //渲染html
            orderDetailHtml = _mall.renderHtml(orderTemplate, res);
            $content.html(orderDetailHtml);
        }, function (errMsg) {
            $content.html('<p class="err-tip">' + errMsg + '</p>')
        })

    },
    //对数据进行处理
    dataFilter: function (data) {
        data.needPay = data.status === 10;
        data.isCancelable = data.status === 10;
    }
};

$(function () {
    page.init();
});