import React from 'react';

import './style.scss';

export default function Dashboard() {
	const rotateValue = 80;
	return (
		<div styleName="wrapper">
			<div styleName="outer">
				<div styleName="mask" style={{ transform: `rotate(${rotateValue}deg)` }}>
					<div styleName="radius-box">
						<div styleName="radius"></div>
					</div>
				</div>
			</div>
			<div styleName="inner">
				<div styleName="arrow-box">
					<div styleName="arrow" style={{ transform: `rotate(${rotateValue}deg)` }}></div>
					<div styleName="anchor" style={{ transform: `rotate(${rotateValue}deg)` }}></div>
					<div styleName="inner-content">
						<p>限量1000件</p>
						<p>剩89件</p>
					</div>
				</div>
			</div>
		</div>
	);
}
