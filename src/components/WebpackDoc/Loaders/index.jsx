import React, { Component } from 'react';

import './style.scss';

import Title from '../../common/Title/index.jsx';

import { loaderData } from './loaderData';

export default class Loaders extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <ul>
                <Title title={'Loaders 知识点'} />
                {/* Loader 简介 */}
                <h2>Loader 简介</h2>
                <p>· Loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到制定文件中，处理一个文件可以使用多个 Loader ，Loader 的执行顺序和配置中的顺序是相反的，即最后一个 Loader 最先执行，第一个 loader 最后执行，第一个执行的 loader 接收源文件内容作为参数，其它 loader 接收前一个执行的 loader 的返回值作为参数，最后执行的 loader 会返回此模块的 Javascript 源码。</p>
                <p>· 编写自己的 loader 时需要引用官方提供的 loader-utils ，调用 loaderUtils.getOptions(this) 拿到 webpack 的配置参数，然后进行自己的处理。</p>
                <p>· Loader 本身仅仅只是一个函数，接收模块代码的内容，然后返回代码内容转化后的结果，并且一个文件还可以链式的经过多个 loader 转化（比如 scss-loader ➡️ css-loader ➡️ style-loader）。</p>
                <p>· 一个 Loader 的职责是单一的，只需要完成一种转化。如果一个源文件需要经历多步转化才能正常使用，就通过多个 Loader 去转化。在调用多个 Loader 去转化一个文件时，每个 Loader 会链式的顺序执行，第一个 Loader 将会拿到处理的原内容，上一个 Loader 处理后的结果会传给下一个接着处理，最后的 Loader 将处理后的最终结果返回给 Webpack。</p>
                {
                    loaderData.map(({ name, content }) => (
                        <li key={name}>
                            <h4>{name}</h4>
                            <p>{content}</p>
                        </li>
                    ))
                }
            </ul>
        );
    }
}
