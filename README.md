# aries-web

## 页面地址: https://xieww-aries.github.io

## 工程化
+ React scss 中 CSS modules 的实现
  - 使用 `babel-plugin-react-css-modules` 插件
  - 配置教程：https://segmentfault.com/a/1190000015715538
  - 兼容 antd 和 css reset 非 CSS module 的配置

+ ESlint 配置
  - 依赖包
      - `eslint`
      - `eslint-loader`
      - `babel-eslint`(检测es6代码)
      - `eslint-plugin-react`(检测react代码)
  - 配置文件
      - .eslintrc(eslint配置文件)
      - .eslintignore(忽略的文件)
  - 配置教程：https://juejin.im/post/6844903475793379336

+ husky 配置
  - 依赖包
      - `husky`(git hooks，git 钩子)
      - `lint-staged`(对 git 中变更的文件进行 lint 操作)
      - `pre-commit`(在每次提交前检测，如果检测失败则禁止提交)
  - 配置文件
      - .huskyrc.json
      - .lintstagedrc.json
      - commitlint.config.js(commit提交规范)

+ react-router
  - 依赖包
    - `react-router`
    - `react-router-dom`

## Todo
  - [x] css modules
  - [x] eslint
  - [x] husky
  - [ ] static page add
  - [ ] typescript
  - [ ] webpack optimization
  - [ ] node optimization
