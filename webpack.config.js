const path = require('path');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const rules = [
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
        test: /\.(js|jsx|ts|tsx)$/,
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
    },
    {
        test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    esModule: false
                }
            }
        ]
    }
];

const plugins = [
    new ProgressBarPlugin(),
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
];

module.exports = smp.wrap({
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        // 以下配置可以在引用文件时省略后缀名
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss']
    },
    devServer: {
        contentBase: './',
        historyApiFallback: {
            index: 'dist/index.html',
            js: 'dist/index.html',
            webpack: 'dist/index.html',
            react: 'dist/index.html',
            list: 'dist/index.html'
        }
    },
    module: {
        rules
    },
    plugins
});
