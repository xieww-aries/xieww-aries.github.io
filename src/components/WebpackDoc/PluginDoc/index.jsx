import React, { Component } from 'react';

import Title from '../../common/Title/index.jsx';

export default class PluginDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Title title={'Plugin 知识点'} />
                {/* Plugin 简介 */}
                <h2>Plugin</h2>
                <p>· plugin 功能更强大。它的主要功能要更加丰富，从打包优化和压缩，从重新定义环境变量，功能强大到可以用来处理各种各样的任务。</p>
                <p>· plugin 让 webpack 的机制更加灵活，它在编译过程中留下的一系列生命周期的钩子，通过调用这些钩子来实现不同编译记过对愿模块进行处理。它的编译是基于事件流来编译的，主要通过 tabtable 来实现插件的绑定和执行的，tabtable 主要是基于发布订阅执行的插件架构，是用来创建生命周期钩子的库。调用 complier.hooks.run.tab 开始注册，创建 complilation ，基于配置创建 chunks ，再通过 parse 解析 chunks ，使用模块和依赖管理模块之间的依赖关系，最后使用 template 基于 compliation 数据生成结果代码。</p>
                <p>· plugin 的实现可以是一个类，使用时传入相关配置来创建一个实例，然后放到配置的 plugins 字段中，而 plugin 实例中最重要的方法是 apply，该方法在 webpack compiler 安装插件时会被调用一次，apply 接收对象实例上注册各种事件的钩子函数，来影响 webpack 的所有构建流程，以便完成更多其它的构建任务。</p>
                <p>· Webpack 启动后，在读取配置的过程中会先执行 new BasicPlugin(options) 初始化一个 BasicPlugin 获得其实例。在初始化 compoler 对象后，再调用 basicPlugin.apply(compiler) 给插件传入 compiler 对项。插件的实例在获取到 compiler 对象后，就可以通过 compiler.plugin(事件名称， 回调函数) 监听到 Webpack 广播出来的事件。并且可以通过 compiler 对象去操作 Webpack。</p>
                <p>· 开发 Plugin 最主要的就是理解 compiler 和 compilation，它们是 Plugin 和 Webpack 之间的桥梁。这两者提供的各种 hooks 和 api ，则是开发 plugin 所必不可少的材料，通过 compiler 和 compilation 的生命周期 hooks，也可以更好地深入了解 Webpack 的整个构建工作是如何进行的。</p>
            </div>
        )
    }
}
