/*
 * @Author: gaocong 
 * @Date: 2018-07-31 15:45:15 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-31 17:21:03
 */
'use strict';
var mall=require('util/mall.js');
require('page/common/nav-simple/index.js');
require('./index.css');

$(function(){
    var type=mall.getUrlParam('type')||'default',
    $element=$('.'+type+'-success');
    $element.show();

})