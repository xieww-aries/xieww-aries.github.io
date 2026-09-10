import React from 'react';

import Index from '../../components/ReactDoc/Index';
import Lifecycle from '../../components/ReactDoc/Lifecycle';
import Hooks from '../../components/ReactDoc/Hooks';
import DocLayout from '../../components/common/DocLayout';

import { leftNavData } from './data';

const sections = [Index, Lifecycle, Hooks];

export default function ReactDoc() {
	return <DocLayout navData={leftNavData} firstRouter="software/frontend/react" sections={sections} />;
}
