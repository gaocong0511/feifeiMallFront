const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
    entry: {
        common: ['./src/page/common/index.js'],
        index: ['./src/page/index/index.js'],
        login: ['./src/page/login/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            //注意：这里还需要更改一下
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css")
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