'use strict';
require('./index.css');
require('page/common/header/index');

var nav = require('page/common/nav/index');
var _mall = require('util/mall');
var _cart = require('service/cart-service');
var indexTemplate = require('./index.string');

var page = {
    data: {
        cartProductVoList: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadCart();
    },
    bindEvent: function () {
        var _this = this;
        //商品选中和取消选中的时候的操作
        $(document).on('click', '.cart-select', function () {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            //选中
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }

            //取消商品的选中
            else {
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showCartError();
                })
            }
        });
        //商品的全选与全部取消选中
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);

            //对购物车中的商品进行全部选中
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showCartError();
                })
            }

            //取消全选
            else {
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showCartError();
                })
            }
        });

        //当商品的数量发生了变化的时候
        $(document).on('click', '.count-btn', function () {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currentCount = parseInt($pCount.val()),
                operation = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;

            //商品数量增加
            if (operation === 'plus') {
                if (currentCount >= maxCount) {
                    _mall.errorTips('该商品的数量已经达到上限');
                    return;
                }
                newCount = currentCount + 1;
            }

            //商品的减少了
            else if (operation === 'minus') {
                if (currentCount <= minCount) {
                    return;
                }
                newCount = currentCount - 1;
            }

            //将购物车的商品数量调整为修改后的商品数量
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderCart(res)
            }, function (errMsg) {
                _this.showCartError();
            });
        });

        //删除单个的商品
        $(document).on('click', '.cart-delete', function () {
            if (window.confirm('确认删除该商品?')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });

        //删除选中的商品
        $(document).on('click', '.delete-selected', function () {
            if (window.confirm('确认删除选中的商品吗?')) {
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');

                //循环选中的商品 对productIds进行拼接
                for (var i = 0, length = $selectedItem.length; i < length; i++) {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if (arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','));
                } else {
                    _mall.errorTips('您还没有选中要删除的商品');
                }
            }
        });

        //提交去结算
        $(document).on('click', '.btn-submit', function () {
            //总价没有问题的话 就进行提交
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './confirm.html';
            } else {
                _mall.errorTips('请选择商品后再进行提交');
            }
        });

    },
    deleteCartProduct: function (productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        })
    },
    loadCart: function () {
        var _this = this;
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },
    //构件购物车的html并进行渲染
    renderCart: function (data) {
        this.filter(data);
        //缓存一下购物车中的信息
        this.data.cartInfo = data;
        //构建html
        var cartHtml = _mall.renderHtml(indexTemplate, data);
        $('.page-wrap').html(cartHtml);

        //更新导航栏之中商品的数量
        nav.loadCartCount();

    },
    //判断当前的数据是不是正确的
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    //显示错误信息
    showCartError: function () {
        $('.page-wrap').html('<p class="err-tip">出错了，请刷新重试</p>')
    }
};
$(function () {
    page.init();
})