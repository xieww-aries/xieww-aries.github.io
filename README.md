# aries-web

前后端一体的个人站点：前端是 React SPA，`service/` 是基于 **Fastify 5 + TypeScript** 的 Node 服务端。
service 既能托管前端构建产物（含 SPA 深链回退），也能独立提供 `/api` 接口，镜像可直接部署到任意云环境。

- 前端线上地址：https://xieww-aries.github.io （GitHub Pages，纯静态托管）
- 服务端镜像：`ghcr.io/xieww-aries/xieww-aries.github.io-service`（push 到 master 自动构建并推送）

## 架构

```
.
├── src/                     React 前端（webpack 5 + TypeScript + CSS Modules）
├── static/                  运行时静态数据（地图 GeoJSON、相册图、简历 PDF）
├── demo/index.html          HTML 模板
├── service/                 Node 服务端（Fastify 5 + TypeScript，独立 package）
│   ├── src/index.ts         启动入口：监听端口、信号处理、优雅关闭
│   ├── src/app.ts           fastify 实例装配：helmet / compress / API / 静态资源
│   ├── src/config.ts        环境变量集中解析与校验
│   ├── src/routes/          /api/health、/api/site/info
│   └── src/plugins/web.ts   SPA 托管：静态文件直出 + 未命中回退 index.html
├── Dockerfile               全栈单镜像（前端产物 + service 运行时）
├── docker-compose.yml       本地/单机一键起容器
└── .github/workflows/
    ├── deploy.yml           前端：lint → typecheck → build → GitHub Pages
    └── service.yml          服务端：lint → typecheck → build → 镜像冒烟测试 → GHCR
```

请求流：浏览器 → service → `/api/*` 走接口；其余 GET 命中 `dist/` 下的静态文件，
未命中时回退 `index.html`，把路由交还给 React Router（等价于 devServer 的 historyApiFallback）。
前端首页通过 `/api/site/info` 探测自己是否运行在 service 之上：在 Pages 上接口不存在，徽标自动隐藏。

## 环境

- Node.js >= 20（见 `.nvmrc`）
- Docker（仅构建 / 部署 service 时需要）

## 常用命令

```bash
npm run setup          # 安装根依赖 + service 依赖
npm run dev:all        # 同时起前端 devServer(9000) 与 service(7001)，/api 自动代理到 7001
npm run dev            # 只起前端 devServer（默认 9000，可用 WEB_PORT 覆盖）
npm run dev:service    # 只起 service（tsx watch 热重启）；启动前自动检查 dist/，缺失会先构建前端
npm run build:all      # 构建前端 dist/ 与 service dist/
npm start              # 用构建产物启动 service（托管 dist/，默认 7001 端口）
npm run verify         # lint + typecheck + build 全量自检
npm run changelog      # 根据约定式提交追加 CHANGELOG.md
npm run release        # 升版本 + 写 changelog + 打 tag
```

`service/` 是独立 package，也可以单独进入目录操作：`cd service && npm run dev`。

注意：service 的静态托管在**启动时**对 `dist/` 做路由快照，重新 `npm run build` 后需要重启
service 才能拿到新产物（否则新增文件会落进 SPA 回退、返回 index.html）。
`dev:service` / `dev:all` 已通过 `predev:service` 钩子（`scripts/ensure-web-dist.mjs`）
在启动前自动补齐缺失的 `dist/`；用 `dev:all` 联调时页面来自 devServer 内存，不受该快照影响。

## service API

| 路由 | 方法 | 说明 |
| --- | --- | --- |
| `/api/health` | GET | 存活探针，返回 `status / uptime / timestamp`，供 LB 与容器健康检查使用 |
| `/api/site/info` | GET | 服务名、版本、环境、Node 版本、commit、构建时间、是否托管 SPA |

新增接口时在 `service/src/routes/` 下加文件并在 `routes/index.ts` 注册，统一挂在 `API_PREFIX` 下。

## 环境变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `PORT` | `7001` | 监听端口 |
| `HOST` | `0.0.0.0` | 监听地址，容器内保持默认 |
| `NODE_ENV` | `development` | `development` / `production` / `test` |
| `LOG_LEVEL` | 按环境推导 | 生产默认 `info`，输出结构化 JSON 便于云端采集 |
| `WEB_ROOT` | 仓库根 `dist/` | 前端产物目录；不存在时 service 以纯 API 模式启动 |
| `API_PREFIX` | `/api` | 接口前缀 |
| `TRUST_PROXY` | `false` | 部署在 Nginx / 云负载均衡之后时置为 `true` |
| `GIT_COMMIT` / `BUILD_TIME` | `unknown` | 由 CI / Docker 构建参数注入，`/api/site/info` 回显 |

## 部署

### 前端（GitHub Pages）

线上由 GitHub Actions 构建并发布，构建产物不入库（`dist/` 已写进 `.gitignore`）。

- 工作流 `.github/workflows/deploy.yml`：push 到 `master` 触发
  `npm ci` → `lint` → `typecheck` → `build` → 上传 `dist/` → 发布到 Pages
- 前置设置（仅需一次）：仓库 Settings → Pages → Build and deployment → Source 选 **GitHub Actions**。
  没切换就推送，Pages 会因为没有可服务的分支内容而整站 404
- SPA 深链回退由构建产出的 `dist/404.html` 承担，Pages 对未知路径返回它

### 服务端（云上）

- **镜像**：push 到 `master` 后 `.github/workflows/service.yml` 会构建镜像、起容器做冒烟测试，
  再推送 `ghcr.io/xieww-aries/xieww-aries.github.io-service`（tag 为 `latest` + 完整 commit sha）
- **本地 / 单机**：`docker compose up -d --build`，访问 http://127.0.0.1:7001
- **任意云平台**（ACK / ECS / Render / Railway / Fly.io / Cloud Run）：
  拉取上述镜像直接运行即可，容器监听 `7001`；
  或把 `service/` 当作普通 Node 应用部署：`npm ci && npm run build && npm start`
- **健康检查**：配置为 `GET /api/health`；镜像内已带 `HEALTHCHECK`，编排平台可直接复用
- **反向代理之后**：设置 `TRUST_PROXY=true`，保证日志里的客户端 IP 正确
- **优雅关闭**：已处理 `SIGTERM` / `SIGINT`，容器 stop 时先停止接流再退出；
  编排平台建议给 10s 以上的 terminationGracePeriod

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
      - .eslintrc.js(eslint配置文件，`overrides` 中为 service 关闭浏览器/React 环境)
      - .eslintignore(忽略的文件)
  - 覆盖范围：`src/**` 与 `service/src/**`，`npm run lint:ci` 为不带 `--fix` 的 CI 版本

+ #### prettier 配置
  - 依赖包
    - `prettier`
    - `eslint-plugin-prettier`
    - `eslint-config-prettier`

+ #### husky 配置
  - 依赖包
      - `husky`(git hooks，git 钩子)
      - `lint-staged`(对 git 中变更的文件进行 lint 操作)
      - `@commitlint/cli`
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
  - `output.publicPath` 为 `'auto'`：运行时从 `bundle.js` 自身地址反推 chunk 路径，
    同一份产物在 Pages 站点根（`/`）和 service 托管的任意前缀下都能正确加载
  - html-webpack-plugin 单独指定 `publicPath: '/'`，让 `dist/index.html` 和 `dist/404.html`
    以绝对路径引资源。`404.html` 会在任意深度的路径下被返回，用相对路径会解析到错误的子目录

+ #### Typescript
  - 前端代码由 babel 编译，类型检查走 `npm run typecheck`（根 `tsconfig.json` 为 `noEmit`）
  - service 有独立 `service/tsconfig.json`，`npm run typecheck:service` 检查、`npm run build:service` 产出 `service/dist/`
  - `npm run typecheck:all` 一次检查两端，并在 `.husky/pre-push` 与 CI 中拦截
  - 依赖包
    - `typescript`
    - eslint 相关包
      - `@typescript-eslint/parser`
      - `@typescript-eslint/eslint-plugin`
    - devDependencies 增加 @types 相关包
      - `@types/react`
      - `@types/react-dom`
      - `@types/react-router-dom`
      - `@types/node`（service）
    - react css module 依赖包
      - `@types/react-css-modules`

## Todo
  - [x] css modules
  - [x] eslint
  - [x] husky
  - [x] typescript
  - [x] Node 20 / Webpack 5
  - [x] CHANGELOG
  - [x] 服务端迁移到 Fastify 5 + TypeScript，支持容器化部署
  - [ ] static page add
