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
        },
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

    }
}