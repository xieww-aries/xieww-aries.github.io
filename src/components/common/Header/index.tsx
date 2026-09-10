import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { headerData } from './headerData';

import './style.scss';

function isActive(pathname: string, route: string) {
	if (route === 'index') {
		return pathname === '/' || pathname.startsWith('/index');
	}
	return pathname === `/${route}` || pathname.startsWith(`/${route}/`);
}

function Header(props: RouteComponentProps) {
	const { pathname } = props.location;

	return (
		<header styleName="head">
			<Link to="/" styleName="brand">
				<span styleName="mark">A</span>
				Aries
			</Link>
			<nav styleName="nav-wrap">
				<ul styleName="nav">
					{headerData.map(({ name, route }) => (
						<li key={route} styleName={isActive(pathname, route) ? 'item active' : 'item'}>
							<Link to={`/${route}`}>{name}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default withRouter(Header);
