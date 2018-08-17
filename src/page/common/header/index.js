/*
 * @Author: gaocong 
 * @Date: 2018-07-30 19:05:21 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-31 10:22:02
 */

'use strict';
require('./index.css');
var mall=require('util/mall.js');
//通用页面的头部
var header = {
    init: function () {
        this.onLoad();
        this.bindEvents();
    },
    onLoad:function(){
        var keyword=mall.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvents: function () {
        var _this=this;
        //点击搜索按钮的时候进行搜索功能
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });

        //给输入框添加监听回车事件
        $('#search-input').keyup(function(e){
            if(e.keyCode===13){
                _this.searchSubmit();
            }
        });
    },
    //点击搜索按钮时的提交动作
    searchSubmit:function(){
        //如果有内容可以进行搜索就进入商品列表页面 如果没有内容就返回主页
        var keyword= $.trim($('#search-input').val());
        if(keyword){
            window.location.href='./list.html?keyword='+keyword;
        }else{
            mall.goHome();
        }
    }
};


$(function () {
    header.init();
});