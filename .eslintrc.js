module.exports = {
	env: {
		es2020: true,
		node: true,
		browser: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			legacyDecorators: true,
			jsx: true
		},
		sourceType: 'module',
		ecmaVersion: 2020
	},
	globals: {
		React: true,
		__DEV__: true
	},
	plugins: [
		'react',
		'jsx-a11y',
		'react-hooks',
		'@typescript-eslint'
	],
	settings: {
		react: {
			version: 'detect'
		}
	},
	rules: {
		indent: [2, 'tab', { SwitchCase: 1 }],
		quotes: [2, 'single', { allowTemplateLiterals: true }],
		semi: [2, 'always'],
		curly: [2, 'multi-line'],
		'array-bracket-spacing': [2, 'never'],
		'comma-dangle': [2, 'never'],
		'comma-spacing': 2,
		'comma-style': 2,
		'computed-property-spacing': 2,
		'dot-notation': 2,
		'eol-last': 2,
		'func-call-spacing': 2,
		'jsx-quotes': [2, 'prefer-double'],
		'key-spacing': 2,
		'no-multiple-empty-lines': [2, { max: 2 }],
		'no-multi-spaces': 2,
		'no-tabs': 0,
		'no-trailing-spaces': 2,
		'no-whitespace-before-property': 2,
		'object-curly-spacing': [2, 'always'],
		eqeqeq: 2,
		'no-console': 0,
		'no-useless-escape': 1,
		'no-case-declarations': 1,
		'no-irregular-whitespace': 0,
		'linebreak-style': [1, 'unix'],
		'no-extra-boolean-cast': 0,
		'no-constant-condition': 0,
		'no-prototype-builtins': 0,
		'prettier/prettier': 0,
		'react/jsx-uses-vars': 2,
		'react/no-unknown-property': [2, { ignore: ['styleName'] }],
		'react/prop-types': 0,
		'react/display-name': 0,
		'react/jsx-uses-react': 2,
		'react-hooks/rules-of-hooks': 2,
		'react-hooks/exhaustive-deps': 1,
		'@typescript-eslint/no-empty-function': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/ban-ts-comment': 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/no-unused-vars': 2
	}
};
