'use strict';
var _mall=require('util/mall');

var _product={
    //获取商品列表
    getProductList:function (listParam,resolve,reject) {
        _mall.request({
           url:_mall.getServerUrl('/product/get_productList.do'),
           data:listParam,
           success:resolve,
            method:'POST',
           error:reject
        });
    },
    //获取某个商品的详细信息
    getProductDetail:function (productId,resolve,reject) {
        _mall.request({
            url:_mall.getServerUrl('/product/get_detail.do'),
            data:{
                productId:productId
            },
            method:'POST',
            success:resolve,
            error:reject
        });
    }
};
module.exports=_product;