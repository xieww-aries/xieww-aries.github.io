import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './resource/reset.css';
import './resource/iconfont.css';

import Header from './components/common/Header';

import Home from './pages/home';
import JsDoc from './pages/jsDoc';
import WebpackDoc from './pages/webpackDoc';
import ReactDoc from './pages/reactDoc';
import Game from './pages/Game';
import Snake from './pages/Game/snake';
import Tetris from './pages/Game/tetris';
import Interview from './pages/interview';
import Changelog from './pages/changelog';
import Resume from './pages/resume';
import Album from './pages/album';

export default function App() {
	return (
		<div className="app-shell">
			<Header />
			<main className="app-main">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/index" element={<Home />} />
					<Route path="/js/*" element={<JsDoc />} />
					<Route path="/webpack/*" element={<WebpackDoc />} />
					<Route path="/react/*" element={<ReactDoc />} />
					<Route path="/interview/*" element={<Interview />} />
					<Route path="/game" element={<Game />} />
					<Route path="/game/snake" element={<Snake />} />
					<Route path="/game/tetris" element={<Tetris />} />
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
