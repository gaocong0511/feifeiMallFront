'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');

var _mall = require('util/mall.js');
var navSide = require('page/common/nav-side/index.js');
var _order = require('service/order-service.js');
var Pagination = require('util/pagination/index.js');
var orderListTemplate = require('./index.string');


var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        this.loadOrderList();
        navSide.init({
            name: 'order-list'
        });
    },
    //加载订单列表
    loadOrderList: function () {
        var _this = this,
            orderListHtml = '',
            $listCon = $('.order-list-con');

        //首先显示一个加载中的动画
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(_this.data.listParam, function (res) {
            //利用返回回来的数据进行数据的渲染
            orderListHtml = _mall.renderHtml(orderListTemplate, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            }, function (errMsg) {
                $listCon.html('<p class="err-tip">加载订单失败' + errMsg + '</p>')
            })
        });
    },
    //加载分页插件
    loadPagination: function (pageInfo) {
        var _this = this;
        if (!_this.pagination) {
            (this.pagination = new Pagination());
        }
        _this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }))
    }
};

$(function () {
    page.init();
});