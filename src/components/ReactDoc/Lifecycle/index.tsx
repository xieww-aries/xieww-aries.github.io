import React from 'react';
import Title from '../../common/Title';

export default function Lifecycle() {
	return (
		<div>
			<Title title={'React Lifecycle'} />
			<div className="link-stack">
				<a href="https://segmentfault.com/a/1190000016617400">生命周期文档整理</a>
				<a href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/">
					React 生命周期流程图
				</a>
			</div>
		</div>
	);
}
