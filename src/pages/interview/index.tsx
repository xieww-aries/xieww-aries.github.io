import React from 'react';

import ThrottleDebounce from '../../components/Interview/ThrottleDebounce';
import Fiber from '../../components/Interview/Fiber';
import PromiseDoc from '../../components/Interview/PromiseDoc';
import DocLayout from '../../components/common/DocLayout';
import Writing from '../../components/common/Writing';

import { leftNavData } from './data';

const sections = [Writing, ThrottleDebounce, Writing, PromiseDoc, Writing, Writing, Fiber];

export default function Interview() {
	return <DocLayout navData={leftNavData} firstRouter="software/frontend/interview" sections={sections} />;
}
