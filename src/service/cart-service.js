'use strict';

var _mall = require('util/mall');

var _cart = {
    //获取当前的用户购物车之中有多少的数量
    getCartCount: function (resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            reject: reject
        });
    },
    //将选中的某件商品添加到购物车
    addToCart: function (productInfo, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    //加载购物车列表
    getCartList: function (resovle, reject) {
        _mall.request({
            url: _mall.getServerUrl('/cart/get_cart_list.do'),
            success: resovle,
            error: reject
        });
    },
    //选中购物车中的商品
    selectProduct: function (productId, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        })
    },
    //取消选中购物车中的商品
    unselectProduct: function (productId, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        })
    },
    //选中全部商品
    selectAllProduct: function (resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        })
    },
    //取消选中全部商品
    unselectAllProduct: function (resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        })
    },
    //更新购物车之中商品的数量
    updateProduct: function (productInfo, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    //删除指定商品
    deleteProduct: function (productIds, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        })
    }
};

module.exports = _cart;