import React from 'react';

import Index from '../../components/WebpackDoc/Index';
import Loaders from '../../components/WebpackDoc/Loaders';
import Babel from '../../components/WebpackDoc/Babel';
import PluginDoc from '../../components/WebpackDoc/PluginDoc';
import DocLayout from '../../components/common/DocLayout';
import Writing from '../../components/common/Writing';

import { leftNavData } from './data';

const sections = [Index, Loaders, PluginDoc, Babel, Writing, Writing, Writing, Writing];

export default function WebpackDoc() {
	return <DocLayout navData={leftNavData} firstRouter="software/frontend/webpack" sections={sections} />;
}
