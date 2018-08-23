/*
 * @Author: gaocong 
 * @Date: 2018-07-26 10:53:33 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-08-01 09:00:39
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
//获取html-webpack-plugin的方法
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};

//webpack的配置
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'result': ['./src/page/result/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': "window.jquery"
    },
    resolve: {
        alias: {
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
            node_modules: __dirname + '/node_modules'
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            //注意：这里还需要更改一下
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
            {test: /\.string$/, loader: 'html-loader'}
        ]
    },
    plugins: [
        //css单独打包
        new ExtractTextPlugin("css/[name].css"),
        //Html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '确认订单')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '更新个人信息')),


    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 3000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: 'common',
            filename: 'js/base.js',
        }
    }, devServer: {
        host: '127.0.0.1',
        port: 8088
    }
};

if('dev'===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;