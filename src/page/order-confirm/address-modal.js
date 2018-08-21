'use strict';

var _mall = require('util/mall.js');
var _address = require('service/address-service');
var addressModalTemplate = require('./address-modal.string');
var _cities = require('util/cities/index.js');

var addressModal = {
    //显示弹窗
    show: function (option) {
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');

        this.loadModal();
        this.bindEvent();
    },
    //关闭弹窗
    hide: function () {
        this.$modalWrap.empty();
    },
    //注册相应的事件
    bindEvent: function () {
        var _this = this;
        //选择了省份之后对城市进行一下过滤
        this.$modalWrap.find('#receiver-province').change(function () {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });

        //点击保存按钮之后进行收货地址的提交(包括新增和更新)
        this.$modalWrap.find('.address-btn').click(function () {
            var receiverInfo=_this.getReceiverInfo(),
                isUpdate=_this.option.isUpdate;

            //如果是新地址的话
            if(!isUpdate&&receiverInfo.status){
                _address.save(receiverInfo.data,function (res) {
                    _mall.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess==='function'&&_this.option.onSuccess(res);
                },function (errMsg) {
                    _mall.errorTips(errMsg);
                })
            }

            //如果是更新地址的话
            if (isUpdate&&receiverInfo.status){

            }
        })
    },
    //加载弹窗后的数据处理
    loadModal: function () {
        var addressModalHtml = _mall.renderHtml(addressModalTemplate, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        //加载预制的省份城市
        this.loadProvince();
    },
    //加载预制好的省份城市
    loadProvince: function () {
        var provinces = _cities.getProvinces() || [],
            $provinceSelct = this.$modalWrap.find('#receiver-province');

        $provinceSelct.html(this.getSelectOption(provinces));
        //是否回填
        /*if(this.option.isUpdate&&this.option.data.receiverProvince){
            $provinceSelct
        }*/
    },
    //选中省份之后 加载过滤出来的城市
    loadCities: function (provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citiesSelect = this.$modalWrap.find('#receiver-city');
        $citiesSelect.html(this.getSelectOption(cities));
    },
    //组织select框的html
    getSelectOption: function (optionArray) {
        var html = '<option>请选择</option>';
        for (var i = 0, length = optionArray.length; i < length; i++) {
            var str = optionArray[i];
            html += '<option value=\"' + str + '\">' + str + '</option>';
        }
        return html;
    },
    //获取表单信息 并进行表单的验证
    getReceiverInfo: function () {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

        //如果当前的操作是更新的话  那么就给receiverInfo的id字段赋值
        if (this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }

        //如果没有输入收货人姓名的话
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        }
        else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请输入收件人所在的省份';
        }
        else if (!receiverInfo.receiverCity) {
            result.errMsg = '请输入收件人所在的城市';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人的详细地址';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人的电话';
        } else if (!_mall.validate(receiverInfo.receiverPhone, 'phone')) {
            result.errMsg = '输入的电话格式不正确'
        } else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;

    }
};

module.exports = addressModal;