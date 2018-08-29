/*
 * @Author: gaocong 
 * @Date: 2018-07-30 16:19:39 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-31 15:37:37
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index');
var _mall = require('util/mall.js');
var bannerTemplate=require('./banner.string');

$(function () {
    //渲染html
    var bannerHtml=_mall.renderHtml(bannerTemplate);
    $('.banner-con').html(bannerHtml);

    //初始化banner
    var $slider=$('.banner').unslider({
        dots:true
    });
    //前一张按钮和后一张按钮的事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forward=$(this).hasClass('prev')?'prev':'next';
        $slider.data('unslider')[forward]();
    })
})