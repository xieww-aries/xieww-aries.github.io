import React, { Component } from 'react';

import Title from '../../common/Title';

import './style.scss';

export default class ArrayIndex extends Component {
    render() {
        return (
            <div>
                <table border="2">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>方法</th>
                            <th>作用</th>
                            <th>用法</th>
                            <th>返回值</th>
                            <th>是否影响原数组</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 增 */}
                        <tr>
                            <td rowSpan="2">增</td>
                            <td>unshift()</td>
                            <td>在数组前面增加元素</td>
                            <td>arr.unshift()</td>
                            <td>前增后数组的长度</td>
                            <td>是</td>
                        </tr>
                        <tr>
                            <td>push()</td>
                            <td>在数组后面增加元素</td>
                            <td>arr.push()</td>
                            <td>后增后数组的长度</td>
                            <td>是</td>
                        </tr>
                        {/* 删 */}
                        <tr>
                            <td rowSpan="2">删</td>
                            <td>shift()</td>
                            <td>删除数组的第一个元素</td>
                            <td>arr.shift()</td>
                            <td>被删除的元素</td>
                            <td>是</td>
                        </tr>
                        <tr>
                            <td>pop()</td>
                            <td>删除数组的最后一个元素</td>
                            <td>arr.pop()</td>
                            <td>被删除的元素</td>
                            <td>是</td>
                        </tr>
                        {/* 改 */}
                        <tr>
                            <td>改</td>
                            <td>splice()</td>
                            <td>在数组的任意位置进行增、删、改的操作</td>
                            <td>arr.splice(start,length,newItem)</td>
                            <td>被删除的元素</td>
                            <td>是</td>
                        </tr>
                        {/* 截 */}
                        <tr>
                            <td>截</td>
                            <td>slice()</td>
                            <td>截取指定位置的数组（包含起始位置不包含结束位置）</td>
                            <td>arr.slice(start,end)</td>
                            <td>截取的数组</td>
                            <td>否</td>
                        </tr>
                        {/* 查 */}
                        <tr>
                            <td rowSpan="3">查</td>
                            <td>indexOf()</td>
                            <td>搜索数组中的元素，并返回它所在的位置，未找到返回-1</td>
                            <td>arr.indexOf(searchElement[,fromIndex])</td>
                            <td>查找元素所在位置</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>lastIndexOf()</td>
                            <td>从后往前搜索数组中的元素，并返回它所在的位置，未找到返回-1</td>
                            <td>arr.lastIndexOf(searchElement[,fromIndex])</td>
                            <td>指定元素最后出现的位置</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>valueOf()</td>
                            <td>返回 Array 对象的原始值,该原始值由 Array 对象派生的所有对象继承</td>
                            <td>arr.valueOf()</td>
                            <td>Array 对象的原始值</td>
                            <td>否</td>
                        </tr>
                        {/* 插 */}
                        <tr>
                            <td>插</td>
                            <td>concat()</td>
                            <td>连接两个或更多的数组 / 元素，并返回结果-1</td>
                            <td>arr.concat()</td>
                            <td>拼接后的数组</td>
                            <td>否</td>
                        </tr>
                        {/* 排 */}
                        <tr>
                            <td rowSpan="2">排</td>
                            <td>reverse()</td>
                            <td>逆序数组</td>
                            <td>arr.reverse()</td>
                            <td>逆序后的数组</td>
                            <td>是</td>
                        </tr>
                        <tr>
                            <td>sort()</td>
                            <td>按编码排序数组</td>
                            <td>arr.sort()</td>
                            <td>排序后的数组</td>
                            <td>是</td>
                        </tr>
                        {/* 转 */}
                        <tr>
                            <td rowSpan="3">转</td>
                            <td>toString()</td>
                            <td>将数组转为字符串（不能指定分割符号）</td>
                            <td>arr.toString()</td>
                            <td>操作后的字符串</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>join()</td>
                            <td>将数组转为字符串（可指定分隔符号）</td>
                            <td>arr.join("指定的分隔符号")</td>
                            <td>操作后的字符串</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>toLocaleString()</td>
                            <td>将数组转为本地字符串（时间类型 / 数值型）</td>
                            <td>arr.toLocaleString()</td>
                            <td>操作后的字符串</td>
                            <td>否</td>
                        </tr>
                        {/* reduce */}
                        <tr>
                            <td rowSpan="2"></td>
                            <td>reduce()</td>
                            <td>接受一个函数作为累加器，数组中的每个值从左至右开始缩减，最终计算为一个值。</td>
                            <td>arr.reduce(function(total,currentValue,currentIndex,arr)...,initialValue)</td>
                            <td>回调函数最后一次被调用后的返回值。</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>reduceRight()</td>
                            <td>接受一个函数作为累加器，数组中的每个值从右至左开始缩减，最终计算为一个值。</td>
                            <td>arr.reduce(function(total,currentValue,currentIndex,arr)...,initialValue)</td>
                            <td>回调函数最后一次被调用后的返回值。</td>
                            <td>否</td>
                        </tr>
                    </tbody>
                </table>
                <Title title={'ES6+ 方法'} />
                <table border="2">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>方法</th>
                            <th>作用</th>
                            <th>用法</th>
                            <th>返回值</th>
                            <th>是否影响原数组</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan="4"></td>
                            <td>copyWithin()</td>
                            <td>从数组的指定位置拷贝元素到元素的另一个指定位置中</td>
                            <td>arr.copyWithin(target,start[,end])</td>
                            <td>操作后的数组</td>
                            <td>是</td>
                        </tr>
                        <tr>
                            <td>includes()</td>
                            <td>判断一个数组是否包含一个指定的值</td>
                            <td>arr.includes(searchElement[,fromIndex])</td>
                            <td>true / false</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>keys()</td>
                            <td>返回一个新的Array迭代器，它包含数组中每个索引值的键</td>
                            <td>arr.keys()</td>
                            <td>返回新的Array迭代器</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>fill()</td>
                            <td>用一个固定值填充一个数组中从其实索引到终止索引的全部元素</td>
                            <td>arr.fill(value, start, end)</td>
                            <td>返回操作后的数组</td>
                            <td>是</td>
                        </tr>
                        {/* 迭代/遍历 */}
                        <tr>
                            <td rowSpan="7">迭代/遍历</td>
                            <td>every()</td>
                            <td>用于检测数组中所有元素是否都符合指定的条件</td>
                            <td>arr.every(function(currentValue,index,arr)..., thisArg)</td>
                            <td>true / false</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>some()</td>
                            <td>用户检测数组中的某些元素是否符合指定的条件</td>
                            <td>arr.some(function(currentValue,index,arr)..., thisArg)</td>
                            <td>true / false</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>foreach()</td>
                            <td>调用数组的每个元素，并将元素传递给回调函数</td>
                            <td>arr.forEach(function(currentValue,index,arr)...,thisAtg)</td>
                            <td>undefined</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>filter()</td>
                            <td>创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。</td>
                            <td>arr.filter(function(currentValue,index,arr)...,thisArg)</td>
                            <td>过滤后的新数组</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>map()</td>
                            <td>返回一个新数组，数组中的元素为原始数组远足调用函数处理后的值。</td>
                            <td>arr.map(function(currentValue,index,arr)...,thisArg)</td>
                            <td>操作过后的新数组</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>find()</td>
                            <td>返回数组中满足测试函数的第一个元素的值，否则返回undefined。</td>
                            <td>arr.find(function(currentValue,index,arr)...,thisArg)</td>
                            <td>满足回调函数的第一个元素的值</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>findIndex()</td>
                            <td>返回数组中满足测试函数的第一个元素的位置，否则返回 -1</td>
                            <td>arr.findIndex(function(currentValue,index,arr)...,thisArg)</td>
                            <td>满足测试函数的第一个元素的位置</td>
                            <td>否</td>
                        </tr>
                        <tr>
                            <td>es8</td>
                            <td>entries()</td>
                            <td>返回一个新的Array Iterator对象，该对象包括数组中每个索引的 键 / 值 对。</td>
                            <td>arr.entries()</td>
                            <td>新的Array Iterator对象</td>
                            <td>否</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
