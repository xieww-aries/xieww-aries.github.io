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
            introduce: 'dist/index.html'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ["import", {
                                  "libraryName": "antd",
                                  "libraryDirectory": "es",
                                  "style": "css" // `style: true` 会加载 less 文件
                                }]
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                exclude: [
                    path.resolve(__dirname, '..', 'node_modules'),
                    path.resolve(__dirname, '../src/resource')
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            // 处理非 css module / node_modules下样式的 配置
            {
                test: /\.(scss|css)$/,
                include: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../src/resource')],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
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