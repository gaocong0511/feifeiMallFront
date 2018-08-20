'use strict';

require('page/common/header/index.js');
require('./index.css');
require('page/common/nav/index.js');

var _mall = require('util/mall.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var productTemplate=require('./product-list.string');
var addressTemplate = require('./address-list.string');

var page = {
    data: {
        selectedAddressId: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function () {
        var _this = this;
        //地址选中和地址取消选中
        $(document).on('click', '.address-item', function () {
            var $this = $(this);
            $this.addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $this.data('id');
        });

        //点击确认提交订单

    },
    //加载地址列表
    loadAddressList: function () {
        var _this = this;
        //加载一下正在加载中的动画
        $('.address-list').html('<div class="loading"></div>>');
        _address.getAddressList(function (res) {
            _this.addressFilter(res);
            var addressListHtml = _mall.renderHtml(addressTemplate, res);
            $('.address-list').html(addressListHtml);
        }, function (errMsg) {
            $('.address-list').html('<p class="err-tip">地址读取时出现了问题</p>');
        })
    },
    //处理地址列表的选择状态 给列表地址一个默认的选中状态
    addressFilter: function (data) {

    },
    //加载订单中的商品列表
    loadProductList: function () {
        $('.order-product').html('<div class="loading"></div>');
        _order.getProductList(function (res) {
            var productListHtml=_mall.renderHtml(productTemplate,res);
            $('.order-product').html(productListHtml);
        }, function (errMsg) {
            $('.order-product').html('<p class="err-tip">'+errMsg+'</p>');
        })
    }

};

$(function () {
    page.init();
})