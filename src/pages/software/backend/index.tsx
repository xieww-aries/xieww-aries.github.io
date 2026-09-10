import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../../../components/common/Title';

import '../style.scss';

export default function SoftwareBackend() {
	return (
		<div styleName="hub">
			<Link to="/software" styleName="back">
				← Software
			</Link>
			<Title title="Backend" />
			<p styleName="lead">服务端笔记还在整理，先留一个入口。</p>
			<div className="empty-note">
				<strong>暂无内容</strong>
				后续会补上 Node、数据库等笔记。
			</div>
		</div>
	);
}
