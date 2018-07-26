/*
 * @Author: gaocong 
 * @Date: 2018-07-26 10:53:33 
 * @Last Modified by: gaocong
 * @Last Modified time: 2018-07-26 16:05:39
 */

const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
//获取html-webpack-plugin的方法
var getHtmlConfig = function (name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
}

//webpacjde 
var config = {
    entry: {
        common: ['./src/page/common/index.js'],
        index: ['./src/page/index/index.js'],
        login: ['./src/page/login/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        filename: 'js/[name].js',
    },
    externals: {
        'jquery': "window.jquery"
    }, 
    resolve: {
        alias:{
            util    :__dirname+'/src/util',
            page    :__dirname+'/src/page',
            service :__dirname+'/src/service',
            image   :__dirname+'/src/image',
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
        }, { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        { test: /\.string$/, loader: 'html-loader' },
        ]
    },
    plugins: [
        //css单独打包
        new ExtractTextPlugin("css/[name].css"),
        //Html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),

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
    },
};
module.exports = config;