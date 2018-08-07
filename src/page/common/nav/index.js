/*
 * @Author: gaocong 
 * @Date: 2018-07-30 17:08:00 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-30 19:39:09
 */
'use strict';

require('./index.css');

var _mall=require("util/mall.js");
/*var _user=require('service/user-service.js');
var _cart=require('service/cart-service.js');*/

var nav={
    init:function(){
        this.bindEvents();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvents:function(){

    },
    loadUserInfo:function(){

    },

}