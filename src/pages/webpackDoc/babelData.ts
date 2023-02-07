export const babelData = [
	{
		name: 'babel-loader',
		content: '在import或加载模块时，对es6代码进行预处理，es6语法转化为es5语法'
	},
	{
		name: 'babel-core',
		content:
            '<p>允许我们去调用babel的api，可以将js代码分析成ast（抽象语法树），方便各个插件分析语法进行相应的处理。</p><p>babel转译器本身，提供了babel的转译API，如babel.transform等，用于对代码进行转译。像webpack的babel-loader就是调用这些API来完成转译过程的</p>'
	},
	{
		name: 'babel-preset-env',
		content: '指定规范，比如es2015、es2016、es2017，lastest，env（包含前面全部）'
	},
	{
		name: 'babel-polyfill',
		content:
            '效仿一个完整的ES2015+环境，使我们能够使用新的内置对象比如Promise，静态方法比如Array.from 或者 Object.assign，实例方法比如Array.prototype.includes和生成器函数（提供给你regenerator插件）。为达到这一点，polyfill添加到了全局范围，就像原生类型比如String一样'
	},
	{
		name: 'babel-runtime',
		content: '与 babel-polyfill 作用一样，使用场景不一样'
	},
	{
		name: 'babel-plugin-transform-runtime',
		content: '与 babel-polyfill 作用一样，使用场景不一样'
	},
	{
		name: 'babel-preset-react',
		content: '把浏览器不支持的js转译成浏览器支持的js（这也是babel的核心意义）'
	},
	{
		name: 'babel-preset-es2015',
		content: '把浏览器不支持的js转译成浏览器支持的js（这也是babel的核心意义）'
	},
	{
		name: 'babel-preset-stage-0',
		content: '把浏览器不支持的js转译成浏览器支持的js（这也是babel的核心意义）'
	}
];
