'use strict';

require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mall=require('util/mall.js');
var _order=require('service/order-service.js');
var orderTemplate=require('./index.string');


var page={
    data:{
        orderNumber:_mall.getUrlParam('orderNumber')
    },
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    onload:function () {
        this.loadDetail();
    },
    bindEvent:function () {
        
    }
}