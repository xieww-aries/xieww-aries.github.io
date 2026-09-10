import React from 'react';

import ArrayIndex from '../../components/JsDoc/Array';
import ObjectIndex from '../../components/JsDoc/Object';
import StringIndex from '../../components/JsDoc/String';
import DocLayout from '../../components/common/DocLayout';
import Writing from '../../components/common/Writing';

import { leftNavData } from './data';

const sections = [ArrayIndex, ObjectIndex, StringIndex, Writing];

export default function JsDoc() {
	return (
		<DocLayout
			navData={leftNavData}
			firstRouter="software/frontend/js"
			sections={sections}
			titleFor={item => `${item.title}方法`}
		/>
	);
}
