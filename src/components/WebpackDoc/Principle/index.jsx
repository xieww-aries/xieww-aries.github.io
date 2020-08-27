import React, { Component } from 'react';

export default class Principle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                {/* webpack 大致原理 */}
                <h2>webpack大致原理</h2>
                <h4>1. 初始化参数</h4>
                <p>从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。</p>
                <h4>2. 开始编译</h4>
                <p>从上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译。</p>
                <h4>3. 确定入口文件</h4>
                <p>根据配置中的 entry 找出所有的入口文件。</p>
                <h4>4. 编译模版</h4>
                <p>从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。</p>
                <h4>5. 模块编译完成</h4>
                <p>在经过第四步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。</p>
                <h4>6. 输出资源</h4>
                <p>根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk ，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。</p>
                <h4>7. 输出完成</h4>
                <p>在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。</p>
                <h4>8. 其他</h4>
                <p>整个过程中特定的时间点广播事件，插件可以进行监听和处理。</p>

                {/* Loader 简介 */}
                <h2>Loader</h2>
                <p>～Loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到制定文件中，处理一个文件可以使用多个 Loader ，Loader 的执行顺序和配置中的顺序是相反的，即最后一个 Loader 最先执行，第一个 loader 最后执行，第一个执行的 loader 接收源文件内容作为参数，其它 loader 接收前一个执行的 loader 的返回值作为参数，最后执行的 loader 会返回此模块的 Javascript 源码。</p>
                <p>～编写自己的 loader 时需要引用官方提供的 loader-utils ，调用 loaderUtils.getOptions(this) 拿到 webpack 的配置参数，然后进行自己的处理。</p>
                <p>～Loader 本身仅仅只是一个函数，接收模块代码的内容，然后返回代码内容转化后的结果，并且一个文件还可以链式的经过多个 loader 转化（比如 scss-loader ➡️ css-loader ➡️ style-loader）。</p>
                <p>~一个 Loader 的职责是单一的，只需要完成一种转化。如果一个源文件需要经历多步转化才能正常使用，就通过多个 Loader 去转化。在调用多个 Loader 去转化一个文件时，每个 Loader 会链式的顺序执行，第一个 Loader 将会拿到处理的原内容，上一个 Loader 处理后的结果会传给下一个接着处理，最后的 Loader 将处理后的最终结果返回给 Webpack。</p>

                {/* Plugin 简介 */}
                <h2>Plugin</h2>
                <p>～plugin 功能更强大。它的主要功能要更加丰富，从打包优化和压缩，从重新定义环境变量，功能强大到可以用来处理各种各样的任务。</p>
                <p>～plugin 让 webpack 的机制更加灵活，它在编译过程中留下的一系列生命周期的钩子，通过调用这些钩子来实现不同编译记过对愿模块进行处理。它的编译是基于事件流来编译的，主要通过 tabtable 来实现插件的绑定和执行的，tabtable 主要是基于发布订阅执行的插件架构，是用来创建生命周期钩子的库。调用 complier.hooks.run.tab 开始注册，创建 complilation ，基于配置创建 chunks ，再通过 parse 解析 chunks ，使用模块和依赖管理模块之间的依赖关系，最后使用 template 基于 compliation 数据生成结果代码。</p>
                <p>～plugin 的实现可以是一个类，使用时传入相关配置来创建一个实例，然后放到配置的 plugins 字段中，而 plugin 实例中最重要的方法是 apply，该方法在 webpack compiler 安装插件时会被调用一次，apply 接收对象实例上注册各种事件的钩子函数，来影响 webpack 的所有构建流程，以便完成更多其它的构建任务。</p>
                <p>～Webpack 启动后，在读取配置的过程中会先执行 new BasicPlugin(options) 初始化一个 BasicPlugin 获得其实例。在初始化 compoler 对象后，再调用 basicPlugin.apply(compiler) 给插件传入 compiler 对项。插件的实例在获取到 compiler 对象后，就可以通过 compiler.plugin(事件名称， 回调函数) 监听到 Webpack 广播出来的事件。并且可以通过 compiler 对象去操作 Webpack。</p>
                <p>～开发 Plugin 最主要的就是理解 compiler 和 compilation，它们是 Plugin 和 Webpack 之间的桥梁。这两者提供的各种 hooks 和 api ，则是开发 plugin 所必不可少的材料，通过 compiler 和 compilation 的生命周期 hooks，也可以更好地深入了解 Webpack 的整个构建工作是如何进行的。</p>
            </div>
        );
    }
}
