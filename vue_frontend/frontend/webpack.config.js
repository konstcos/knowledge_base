const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/main.js',
    output: {
        path: __dirname,
        // filename: './public/build.js'
        filename: '../static/vue_frontend/main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader'}
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // // Requires sass-loader@^7.0.0
                        // options: {
                        //     implementation: require('sass'),
                        //     fiber: require('fibers'),
                        //     indentedSyntax: true // optional
                        // },
                        // Requires sass-loader@^8.0.0
                        // options: {
                        //     implementation: require('sass'),
                        //     sassOptions: {
                        //         fiber: require('fibers'),
                        //         indentedSyntax: true // optional
                        //     },
                        // },
                    }
                ]
            },

        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',
        // }),
        new VueLoaderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
};