const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const genericNames = require('generic-names');

const generateScopedName = genericNames('[name]__[local]___[hash:base64:5]', {
	context: process.cwd()
});

const cssLoaderModules = {
	namedExport: false,
	exportLocalsConvention: 'asIs',
	getLocalIdent: (context, _localIdentName, localName) =>
		generateScopedName(localName, context.resourcePath)
};

class CopyToEggPublicPlugin {
	apply(compiler) {
		compiler.hooks.afterEmit.tap('CopyToEggPublicPlugin', () => {
			const from = path.resolve(__dirname, 'dist');
			const to = path.resolve(__dirname, 'service/app/public/dist');
			if (!fs.existsSync(from)) return;
			fs.mkdirSync(to, { recursive: true });
			fs.cpSync(from, to, { recursive: true });
		});
	}
}

const cssLoaders = (withModules) => [
	MiniCssExtractPlugin.loader,
	{
		loader: 'css-loader',
		options: withModules
			? {
				modules: cssLoaderModules,
				sourceMap: true
			}
			: undefined
	},
	{
		loader: 'postcss-loader'
	},
	{
		loader: 'sass-loader'
	}
];

module.exports = (_env, argv) => {
	const isProd = argv.mode === 'production';

	return {
		mode: isProd ? 'production' : 'development',
		devtool: isProd ? false : 'source-map',
		entry: path.resolve(__dirname, 'src/index.tsx'),
		output: {
			clean: true,
			publicPath: '/',
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js'
		},
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss']
		},
		devServer: {
			hot: true,
			open: true,
			port: 8080,
			historyApiFallback: true,
			static: {
				directory: path.resolve(__dirname)
			}
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
				{
					test: /\.(scss|css)$/,
					include: [
						path.resolve(__dirname, 'node_modules'),
						path.resolve(__dirname, 'src/resource')
					],
					use: cssLoaders(false)
				},
				{
					test: /\.(scss|css)$/,
					exclude: [
						path.resolve(__dirname, 'node_modules'),
						path.resolve(__dirname, 'src/resource')
					],
					use: cssLoaders(true)
				},
				{
					test: /\.md$/,
					type: 'asset/source'
				},
				{
					test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2)(\?.*)?$/,
					type: 'asset',
					parser: {
						dataUrlCondition: {
							maxSize: 8192
						}
					}
				}
			]
		},
		plugins: [
			new ESLintPlugin({
				extensions: ['js', 'jsx', 'ts', 'tsx'],
				context: path.resolve(__dirname, 'src'),
				failOnError: isProd,
				lintDirtyModulesOnly: !isProd
			}),
			new MiniCssExtractPlugin({
				filename: '[name].min.css'
			}),
			new HTMLWebpackPlugin({
				title: 'Aries · Notes',
				template: 'demo/index.html'
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, 'CHANGELOG.md'),
						to: 'CHANGELOG.md',
						noErrorOnMissing: true
					},
					{
						from: path.resolve(__dirname, 'static'),
						to: 'static',
						noErrorOnMissing: true
					}
				]
			}),
			new CopyToEggPublicPlugin()
		],
		performance: {
			hints: false
		}
	};
};
