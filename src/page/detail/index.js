'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mall = require('util/mall.js');
var _product = require('service/product-service.js');
var _cart=require('service/cart-service.js');
var indexTemplate = require('./index.string');

var page = {
    data: {
        productId: _mall.getUrlParam('productId') || ''
    },
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
        //如果当前没有获取到productId的话 那么就跳转回首页
        if(!this.data.productId){
            _mall.goHome();
        }
        this.loadDetail();
    },
    bindEvent:function () {
        var _this=this;
        //当某个图片获取到鼠标焦点的时候  进行图片预览
        $(document).on('mouseenter','.p-img-item',function () {
            var imageUrl=$(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imageUrl);
        });

        //当用户对界面上面的商品数量进行操作的时候的处理
        $(document).on('click','.p-count-btn',function () {
            var type=$(this).hasClass('plus')?'plus':'minus',
                $pCount=$('.p-count'),
                currentCount=parseInt($pCount.val()),
                minCount=1,
                maxCount=_this.data.detailInfo.stock||1;
            if(type==='plus'){
                $pCount.val(currentCount<maxCount?currentCount+1:maxCount);
            }else if(type==='minus'){
                $pCount.val(currentCount>minCount?currentCount-1:minCount);
            }
        });
        //加入购物车
        $(document).on('click','.cart-add',function () {
            _cart.addToCart({
                productId:_this.data.productId,
                count:$('.p-count').val()
            },function (res) {
                window.location.href='./result.html?type=cart-add'
            },function (errMsg) {
                _mall.errorTips(errMsg);
            })
        });
    },
    //加载商品的详细信息
    loadDetail:function () {
        var _this=this,
            html,
            $pageWrap=$('.page-wrap');
        //加载loading动画
        $pageWrap.html('<div class="loading"></div>');
        //请求detail信息
        _product.getProductDetail(this.data.productId,function (res) {
            _this.filter(res);
            //将detail的数据进行一下缓存
            _this.data.detailInfo=res;           //组织html
            html=_mall.renderHtml(indexTemplate,res);
            $pageWrap.html(html);
        },function (errMsg) {
            $pageWrap.html('<p class="err-tip">没有找到该商品的相信信息</p>')
        })
    },
    //将传回来的数据进行分割划分
    filter:function (data) {
        data.subImages=data.subImages.split(',');
    }
};

$(function () {
    page.init();
});