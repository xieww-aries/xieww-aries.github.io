var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './',
        historyApiFallback: {
            index: 'dist/index.html',
            list: 'dist/index.html',
            document: 'dist/index.html',
            introduce: 'dist/index.html',
            loginRegiste: 'dist/index.html'
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader', 
                    options: {
                        cache: true,
                        emitError: true,
                        emitWarning: true,
                        fix: true
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            // 处理非 css module / node_modules下样式的 配置
            {
                test: /\.(scss|css)$/,
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/resource')
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            // css module 配置
            {
                test: /\.(scss|css)$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/resource')
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        // 提取样式
        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        }),
        new HTMLWebpackPlugin({
            title: 'development',   
            template: 'demo/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'dist/**/*'),
                to: path.resolve(__dirname, 'service/app/public')
            }
        ])
    ]
}