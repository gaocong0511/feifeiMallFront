'use strict';

var _mall=require('util/mall');

var _cart={
    //获取当前的用户购物车之中有多少的数量
    getCartCount:function (resolve,reject) {
        _mall.request({
            url:_mall.getServerUrl('/cart/get_cart_product_count.do'),
            success:resolve,
            reject:reject
        });
    },
    //将选中的某件商品添加到购物车
    addToCart:function (productInfo,resolve,reject) {
        _mall.request({
            url:_mall.getServerUrl('/cart/add.do'),
            data:productInfo,
            success:resolve,
            error:reject
        })
    }
};

module.exports=_cart;