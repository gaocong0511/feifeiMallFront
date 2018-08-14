'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mall=require('util/mall.js');
var _product=require('service/product-service.js');
var Pagination=require('util/pagination/index.js');
var indexTemplate=require('./index.css');


var page={
    data:{
        listParam:{
            keyword:_mall.getUrlParam('keyword')||'',
            categoryId:_mall.getUrlParam('categoryId')||'',
            orderBy:_mall.getUrlParam('orderBy')||'default',
            pageNum:_mall.getUrlParam('pageNum')||1,
            pageSize:_mall.getUrlParam('pageSize')||20
        }
    },
    init:function () {
        this.onLoad();
        this.bindEvents();
    },
    onLoad:function () {
        this.loadList();
    },
    bindEvents:function () {
        var _this=this;
        //点击排序按钮的时候
        $('.sort-item').click(function () {
            
        })
    }
}