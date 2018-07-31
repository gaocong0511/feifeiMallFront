/*
 * @Author: gaocong 
 * @Date: 2018-07-30 16:19:39 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-31 15:37:37
 */

'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/nav-side/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mall = require('util/mall.js');
navSide.init({
    name: 'order-list'
});