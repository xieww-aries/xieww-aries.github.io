# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Features

- 增加 Map 页，提供可拖动缩放的中国省级地图与世界地图
- Game 页增加贪吃蛇与俄罗斯方块，记录本机最高分
- 增加 Resume 页，整理个人简历的阅读版展示
- 增加 Album 页，按相册浏览照片并支持大图查看
- Album 页增加前端口令，未解锁不展示照片
- Resume 页增加前端口令，未解锁不展示简历

### Improvements

- 按最新简历更新状态、京东项目与下载 PDF
- 移除电影 List 页面与导航入口

## [2.0.0] - 2026-09-10

### Features

- 站点 UI 重做为深色笔记风格，补充首页目录、文档侧栏和空状态
- 增加 Changelog 页面与 `npm run changelog` / `npm run release` 版本日志能力

### Improvements

- 工程升级到 Node 20：Webpack 5、React 18、React Router 6、TypeScript 5
- 用 Dart Sass、postcss-preset-env 替换已停止维护的 node-sass / cssnext
- Husky 9 接管 git hooks，ESLint 8 适配当前工具链

## [1.0.0] - 2020-12-01

### Features

- 个人站点初版：JavaScript / Webpack / React / Interview 笔记与电影列表
