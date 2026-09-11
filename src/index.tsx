import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './resource/reset.css';
import './resource/iconfont.css';

import Header from './components/common/Header';
import RouteFallback from './components/common/RouteFallback';

// 首屏只保留 Home，其余路由按需加载；同组路由合并成一个 chunk，避免碎片请求
import Home from './pages/home';

const Software = lazy(() => import(/* webpackChunkName: "software" */ './pages/software'));
const SoftwareFrontend = lazy(() => import(/* webpackChunkName: "software" */ './pages/software/frontend'));
const SoftwareBackend = lazy(() => import(/* webpackChunkName: "software" */ './pages/software/backend'));
const JsDoc = lazy(() => import(/* webpackChunkName: "docs" */ './pages/jsDoc'));
const WebpackDoc = lazy(() => import(/* webpackChunkName: "docs" */ './pages/webpackDoc'));
const ReactDoc = lazy(() => import(/* webpackChunkName: "docs" */ './pages/reactDoc'));
const Interview = lazy(() => import(/* webpackChunkName: "docs" */ './pages/interview'));
const Game = lazy(() => import(/* webpackChunkName: "games" */ './pages/Game'));
const Snake = lazy(() => import(/* webpackChunkName: "games" */ './pages/Game/snake'));
const Tetris = lazy(() => import(/* webpackChunkName: "games" */ './pages/Game/tetris'));
const MapExplorer = lazy(() => import(/* webpackChunkName: "map" */ './pages/map'));
const Resume = lazy(() => import(/* webpackChunkName: "resume" */ './pages/resume'));
const Album = lazy(() => import(/* webpackChunkName: "album" */ './pages/album'));
const Changelog = lazy(() => import(/* webpackChunkName: "changelog" */ './pages/changelog'));

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
				<Suspense fallback={<RouteFallback />}>
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
				</Suspense>
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
