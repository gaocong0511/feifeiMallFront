/*
* @Author: gaocong
* @Date:   2018-07-25 13:35:50
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-26 17:27:16
*/
'use strict';
require('jquery');
require('../test.js');
$('body').html("Hello index");
console.log('index');
require('./index.css');
var _mall=require('util/mall.js');
//alert('123');
$('body').html("Hello index1123413545455");
_mall.request({
    url:'./test.do',
    success:function(res){
        console.log(res);
    },
    error:function(e){
        console.log(e);
    }
})
console.log(_mall.getUrlParam('test'));

var html='<div>{{data}}</div>';
var data='123';
console.log(_mall.renderHtml(html,data));
