'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mall = require('util/mall.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var indexTemplate = require('./index.string');


var page = {
    data: {
        listParam: {
            keyWord: _mall.getUrlParam('keyword') || '',
            categoryId: _mall.getUrlParam('categoryId') || '',
            orderBy: _mall.getUrlParam('orderBy') || 'default',
            pageNum: _mall.getUrlParam('pageNum') || 1,
            pageSize: _mall.getUrlParam('pageSize') || 20
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvents();
    },
    onLoad: function () {
        this.loadList();
    },
    bindEvents: function () {
        var _this = this;
        //点击排序按钮的时候
        $('.sort-item').click(function () {
            var $this = $(this);
            //每次进行排序之后 将展示的页面置为1
            _this.data.listParam.pageNum = 1;
            //当点击的是默认排序的时候
            if ($this.data('type') === 'default') {
                //如果已经是active样式的话
                if ($this.hasClass('active')) {
                    return;
                }
                //如果当前不是active样式的话
                else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }

            //如果点击的是按照价格排序的话
            else if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                //如果当前不是按照升序排序的话
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                $this.addClass('desc').removeClass('asc');
                _this.data.listParam.orderBy = 'price_desc';
                }
            }

            //点击完成并且完成界面相应之后重新加载列表
            _this.loadList();
        });
    },
    loadList: function () {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        //将参数之中不必要的字段给删掉
        listParam.categoryId ? (delete  listParam.keyWord) : (delete listParam.categoryId);
        //从服务器端请求数据
        _product.getProductList(listParam, function (res) {
            listHtml = _mall.renderHtml(indexTemplate, {
                list: res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (errMsg) {
            _mall.errorTips(errMsg);
        })
    },
    //加载分页插件
    loadPagination: function (pageInfo) {
        var _this = this;
        if (!this.pagination) {
            this.pagination = new Pagination();
        }
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};

$(function () {
    page.init();
});