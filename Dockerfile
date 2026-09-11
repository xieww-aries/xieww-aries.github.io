# syntax=docker/dockerfile:1
#
# 全栈单镜像：前端 webpack 产物 + service 运行时
# 本地构建： docker build -t aries-web:local .
# 云上部署： 推送该镜像后，容器监听 7001，健康检查走 /api/health

# ---------- 前端构建 ----------
FROM node:20-alpine AS web-build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY .babelrc .eslintrc.js .eslintignore postcss.config.js tsconfig.json webpack.config.js ./
COPY demo ./demo
COPY src ./src
COPY static ./static
COPY CHANGELOG.md ./
RUN npm run build

# ---------- 服务端构建 ----------
FROM node:20-alpine AS service-build
WORKDIR /app/service

COPY service/package.json service/package-lock.json ./
RUN npm ci --ignore-scripts

COPY service/tsconfig.json ./
COPY service/src ./src
RUN npm run build

# ---------- 生产依赖（与构建依赖分离，保证镜像精简） ----------
FROM node:20-alpine AS service-deps
WORKDIR /app/service

COPY service/package.json service/package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# ---------- 运行时 ----------
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=7001 \
    WEB_ROOT=/app/public \
    LOG_LEVEL=info \
    TRUST_PROXY=true

# 由 CI 注入，/api/site/info 会回显，便于线上核对版本
ARG GIT_COMMIT=unknown
ARG BUILD_TIME=unknown
ENV GIT_COMMIT=$GIT_COMMIT \
    BUILD_TIME=$BUILD_TIME

COPY --from=service-deps  /app/service/node_modules ./service/node_modules
COPY --from=service-build /app/service/dist         ./service/dist
COPY --from=service-build /app/service/package.json ./service/package.json
COPY --from=web-build     /app/dist                 ./public

EXPOSE 7001

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||7001)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

USER node

CMD ["node", "service/dist/index.js"]
