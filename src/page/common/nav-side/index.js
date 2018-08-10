/*
 * @Author: gaocong 
 * @Date: 2018-07-31 11:26:34 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-31 15:36:54
 */
'use strict';
require('./index.css');
var mall = require('util/mall.js');
var templateIndex=require('./index.string');
//侧标导航
var navSide = {
    option: {
        name: '',
        navList: [{
            name: 'user-center',
            desc: '个人中心',
            href: './user-center.html'
        }, {
            name: 'order-list',
            desc: '我的订单',
            href: './order-list.html'
        }, {
            name: 'user-pass-update',
            desc: '修改密码',
            href: './user-pass-update.html'
        }, {
            name: 'about',
            desc: '关于',
            href: './about.html'
        }]
    },
    init: function (option) {
        //extend只对第一层有效
        $.extend(this.option, option);
        this.renderNav();
    },
    /* 渲染左侧导航菜单 */
    renderNav: function () {
        for (var i = 0, length = this.option.navList.length; i < length; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        //渲染list数据
        var navHtml=mall.renderHtml(templateIndex,{
            navList:this.option.navList
        });
        //把html放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;