# aries-web

## 页面地址: https://xieww-aries.github.io

## 环境
- Node.js >= 20（见 `.nvmrc`）

## 常用命令
```bash
npm install
npm run dev          # webpack-dev-server，默认 http://localhost:8080
npm run build
npm run lint
npm run typecheck    # tsc --noEmit，只做类型检查不产出文件
npm run changelog    # 根据约定式提交追加 CHANGELOG.md
npm run release      # 升版本 + 写 changelog + 打 tag
```

## 工程化
+ #### React scss 中 CSS modules 的实现
  - 使用 `babel-plugin-react-css-modules` 插件
  - 配置教程：https://segmentfault.com/a/1190000015715538
  - 兼容 css reset 非 CSS module 的配置

+ #### ESlint 配置
  - 依赖包
      - `eslint`
      - `eslint-webpack-plugin`
      - `eslint-plugin-react`(检测react代码)
      - `eslint-plugin-react-hooks`(检测 react-hooks 代码)
  - 配置文件
      - .eslintrc(eslint配置文件)
      - .eslintignore(忽略的文件)
  - 配置教程：https://juejin.im/post/6844903475793379336

+ #### prettier 配置
  - 依赖包
    - `prettier`
    - `eslint-plugin-prettier`
    - `eslint-config-prettier`

+ #### husky 配置
  - 依赖包
      - `husky`(git hooks，git 钩子)
      - `lint-staged`(对 git 中变更的文件进行 lint 操作)
      - `pre-commit`(在每次提交前检测，如果检测失败则禁止提交)
      - `@commitlint/cli`()
  - 配置文件
      - .husky/
      - .lintstagedrc.json
      - commitlint.config.js / .versionrc.js
      - CHANGELOG.md

+ #### react-router
  - 依赖包
    - `react-router-dom` v6

+ #### 路由懒加载与代码分割
  - `src/index.tsx` 中首屏只保留 Home，其余路由用 `React.lazy` + `Suspense` 按需加载，过渡态见 `src/components/common/RouteFallback`
  - 用 `webpackChunkName` 魔法注释把同组路由合并成一个 chunk，避免碎片请求：
    `software` / `docs` / `games` / `map` / `resume` / `album` / `changelog`
  - `output.publicPath` 必须是 `'auto'`：产物由 GitHub Pages 以 `/dist/` 前缀访问，
    运行时才能从 `bundle.js` 自身地址反推出 chunk 的正确路径，改成 `/` 会导致异步 chunk 404
  - `dist/index.html` 由 html-webpack-plugin 生成（相对路径），仓库根目录的
    `index.html` / `404.html` 才是 Pages 实际入口，两者需手动保持一致

+ #### Typescript
  - https://blog.51cto.com/u_15069486/3468408?b=totalstatistic
  - 使用babel编译还是ts-loader去编译：https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html#babel-vs-tsc-for-typescript
  - 代码由 babel 编译，类型检查单独走 `npm run typecheck`（`tsconfig.json` 为 `noEmit`），并在 `.husky/pre-push` 中拦截
  - 依赖包
    - `typescript`
    - eslint 相关包
      - `@typescript-eslint/eslint-plugin`
      - `@typescript-eslint/parser`
    - devDependencies增加 @types 相关包
      - `@types/react`
      - `@types/react-dom`
      - `@types/react-router-dom`
    - react css module依赖包
      - `@types/react-css-modules`
  - 配置文件
    - tsconfig.json
  - 配合 eslint(https://segmentfault.com/a/1190000019661168)
    - `@typescript-eslint/parser`
      - ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码
    - `@typescript-eslint/eslint-plugin`
      - 这是一个ESLint插件，包含了各类定义好的检测Typescript代码的规范

## Todo
  - [x] css modules
  - [x] eslint
  - [x] husky
  - [x] typescript
  - [x] Node 20 / Webpack 5
  - [x] CHANGELOG
  - [ ] static page add
