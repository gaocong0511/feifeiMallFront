'use strict';

var _mall = require('util/mall.js');


var _payment = {
    //获得要支付的信息/要支付的二维码
    getPaymentInfo: function (orderNumber, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/order/pay.do'),
            data: {
                orderNumber: orderNumber
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //轮询查询当前订单的支付状态
    getPaymentStatus: function (orderNumber, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNumber: orderNumber
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
};

module.exports=_payment;