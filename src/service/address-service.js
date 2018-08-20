'use strict';

var _mall=require('util/mall.js');

var _address={
    //获取收货地址的列表 默认50个
    getAddressList:function (resolve,reject) {
        _mall.request({
            url:_mall.getServerUrl('/shipping/list.do'),
            data:{
                pageSize:50
            },
            success:resolve,
            error:reject
        })
    }
};

module.exports=_address;