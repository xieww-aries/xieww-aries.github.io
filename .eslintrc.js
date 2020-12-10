/* eslint-disable prettier/prettier */
module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true,
        mocha: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            'legacyDecorators': true,
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module',
        'ecmaVersion': 2017
    },
    'globals': {
        'React': true,
        '__DEV__': true
    },
    'plugins': [
        'react',
        'jsx-a11y',
        'react-hooks',
        '@typescript-eslint'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'rules': {
        // 0 = off, 1 = warn, 2 = error
        // 使用 4 个空格缩进
        'indent': [2, 4, { SwitchCase: 1 }],
        // 使用单引号
        'quotes': [2, 'single', { allowTemplateLiterals: true }],
        // 使用分号
        'semi': [2, 'always'],
        // 单行可省略{}，其他情况不允许省略
        'curly': [2, 'multi-line'],
        // 数组中起始位置是否需要空格
        'array-bracket-spacing': [2, 'never'],
        // 不允许在数组或对象最后一项使用逗号
        'comma-dangle': [2, 'never'],
        // 在分号前不适用空格，分号后使用空格
        'comma-spacing': 2,
        // 分号风格，默认放在行尾
        'comma-style': 2,
        // 在变量属性中禁用空格
        'computed-property-spacing': 2,
        // 优先使用点表示法
        'dot-notation': 2,
        // 文件以新行结尾
        'eol-last': 2,
        // 在函数标识和 () 之间禁用空格
        'func-call-spacing': 2,
        // JSX 使用双引号
        'jsx-quotes': [2, 'prefer-double'],
        // 在 key 和 value 之间的空格一个空格
        'key-spacing': 2,
        // 最大两行空白
        'no-multiple-empty-lines': [2, { max: 2 }],
        // 禁用多个空格
        'no-multi-spaces': 2,
        // 禁用 tabs
        'no-tabs': 2,
        // 禁用行末额外的空白
        'no-trailing-spaces': 2,
        // 属性前没有空白
        'no-whitespace-before-property': 2,
        // 在对象 {} 中使用空格
        'object-curly-spacing': [2, 'always'],
        // 使用 === 和 !==
        'eqeqeq': 2,
        // 禁止出现未使用过的变量
        // 'no-unused-vars': 2,
        // 禁用 console
        'no-console': 0,
        // 禁用不必要的转义字符
        'no-useless-escape': 1,
        // 不允许在 case 子句中使用词法声明
        'no-case-declarations': 1,
        // 禁止不规则的空白
        'no-irregular-whitespace': 0,
        // 强制使用一致的换行风格
        'linebreak-style': [1, 'unix'],
        // 禁止不必要的布尔转换
        'no-extra-boolean-cast': 0,
        // 禁止在条件中使用常量表达式
        'no-constant-condition': 0,
        // 禁止直接调用 Object.prototypes 的内置属性
        'no-prototype-builtins': 0,

        'prettier/prettier': 0,

        // Prevent variables used in JSX to be marked as unused
        'react/jsx-uses-vars': 2,
        // Prevent missing props validation in a React component definition
        'react/prop-types': 0,
        // Prevent missing displayName in a React component definition
        'react/display-name': 0,
        // Prevent React to be marked as unused
        'react/jsx-uses-react': 2,

        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unused-vars': 2
    }
};
