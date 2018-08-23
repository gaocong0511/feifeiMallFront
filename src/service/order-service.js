'use strict';

var _mall=require('util/mall.js');

var _order={
    //购物车确认订单获取订单中的商品列表
    getProductList:function (resolve,reject) {
        _mall.request({
            url:_mall.getServerUrl('/order/getOrderCartProduct.do'),
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //提交当前购物车中的内容 进行订单的生成
    createOrder:function (orderInfo,resolve,reject) {
        _mall.request({
            url:_mall.getServerUrl('/order/create.do'),
            data:orderInfo,
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //加载订单列表
    getOrderList:function (listParam,resolve,reject) {
        _mall.request({
            url:_mall.getServerUrl('/order/list.do'),
            data:listParam,
            method:'POST',
            success:resolve,
            error:reject
        })
    }
};

module.exports=_order;