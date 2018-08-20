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
    }
};

module.exports=_order;