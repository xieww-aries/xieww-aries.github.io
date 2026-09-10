import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './resource/reset.css';
import './resource/iconfont.css';

import Header from './components/common/Header';

import Home from './pages/home';
import Software from './pages/software';
import SoftwareFrontend from './pages/software/frontend';
import SoftwareBackend from './pages/software/backend';
import JsDoc from './pages/jsDoc';
import WebpackDoc from './pages/webpackDoc';
import ReactDoc from './pages/reactDoc';
import Game from './pages/Game';
import Snake from './pages/Game/snake';
import Tetris from './pages/Game/tetris';
import MapExplorer from './pages/map';
import Interview from './pages/interview';
import Changelog from './pages/changelog';
import Resume from './pages/resume';
import Album from './pages/album';

function LegacyFrontendRedirect() {
	const { pathname } = useLocation();
	const match = pathname.match(/^\/(js|webpack|react|interview)(\/.*)?$/);

	if (!match) {
		return <Navigate to="/software/frontend" replace />;
	}

	return <Navigate to={`/software/frontend/${match[1]}${match[2] || ''}`} replace />;
}

export default function App() {
	return (
		<div className="app-shell">
			<Header />
			<main className="app-main">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/index" element={<Home />} />
					<Route path="/software" element={<Software />} />
					<Route path="/software/frontend" element={<SoftwareFrontend />} />
					<Route path="/software/frontend/js/*" element={<JsDoc />} />
					<Route path="/software/frontend/webpack/*" element={<WebpackDoc />} />
					<Route path="/software/frontend/react/*" element={<ReactDoc />} />
					<Route path="/software/frontend/interview/*" element={<Interview />} />
					<Route path="/software/backend" element={<SoftwareBackend />} />
					<Route path="/js/*" element={<LegacyFrontendRedirect />} />
					<Route path="/webpack/*" element={<LegacyFrontendRedirect />} />
					<Route path="/react/*" element={<LegacyFrontendRedirect />} />
					<Route path="/interview/*" element={<LegacyFrontendRedirect />} />
					<Route path="/game" element={<Game />} />
					<Route path="/game/snake" element={<Snake />} />
					<Route path="/game/tetris" element={<Tetris />} />
					<Route path="/map" element={<MapExplorer />} />
					<Route path="/resume" element={<Resume />} />
					<Route path="/album" element={<Album />} />
					<Route path="/changelog" element={<Changelog />} />
				</Routes>
			</main>
		</div>
	);
}

const rootEl = document.querySelector('#app');

if (rootEl) {
	createRoot(rootEl).render(
		<Router>
			<App />
		</Router>
	);
}
