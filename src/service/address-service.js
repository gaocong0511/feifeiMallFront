'use strict';

var _mall = require('util/mall.js');

var _address = {
    //获取收货地址的列表 默认50个
    getAddressList: function (resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    //保存新增的收货地址
    save: function (addressInfo, resolve, reject) {
        _mall.request({
            url: _mall.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //更新收货地址
    update:function (addressInfo,resolve,reject) {
        _mall.request({
            url:_mall.getServerUrl('/shipping/update.do'),
            data:addressInfo,
            success:resolve,
            error:reject
        })
    }
};

module.exports = _address;