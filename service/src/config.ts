import fs from 'node:fs';
import path from 'node:path';

export type NodeEnv = 'development' | 'production' | 'test';

declare module 'fastify' {
	interface FastifyInstance {
		config: ServiceConfig;
	}
}

export interface ServiceConfig {
	/** 服务名，取自 service/package.json */
	name: string;
	version: string;
	env: NodeEnv;
	/** 监听地址，容器内必须是 0.0.0.0 */
	host: string;
	port: number;
	logLevel: string;
	/** API 路由前缀，SPA 回退会跳过它 */
	apiPrefix: string;
	/** 前端构建产物目录；不存在时以纯 API 模式启动 */
	webRoot: string | null;
	/** 部署在 Nginx / 云负载均衡之后时置为 true */
	trustProxy: boolean;
	/** 构建信息，由 CI / Docker 注入 */
	commit: string;
	buildTime: string;
	startedAt: string;
}

const DEFAULT_LOG_LEVEL: Record<NodeEnv, string> = {
	development: 'debug',
	production: 'info',
	test: 'silent'
};

const KNOWN_ENVS = Object.keys(DEFAULT_LOG_LEVEL) as NodeEnv[];

/**
 * 读取 service/package.json 中的名称与版本，失败时回退到默认值
 *
 * @return {{ name: string, version: string }} 服务元信息
 */
function readPackageMeta(): { name: string; version: string } {
	try {
		const file = path.resolve(__dirname, '..', 'package.json');
		const meta = JSON.parse(fs.readFileSync(file, 'utf8')) as { name?: string; version?: string };

		return { name: meta.name || 'aries-web-service', version: meta.version || '0.0.0' };
	} catch {
		return { name: 'aries-web-service', version: '0.0.0' };
	}
}

/**
 * 解析监听端口，非法值直接抛错让进程在启动阶段就失败
 *
 * @param {string | undefined} value 原始环境变量
 * @param {number} fallback 默认端口
 * @return {number} 合法端口
 */
function resolvePort(value: string | undefined, fallback: number): number {
	const port = Number(value === undefined || value === '' ? fallback : value);

	if (!Number.isInteger(port) || port < 0 || port > 65535) {
		throw new Error(`非法的 PORT 配置: ${value}`);
	}

	return port;
}

/**
 * 定位前端产物目录：优先 WEB_ROOT，其次仓库根的 dist/
 *
 * @param {string | undefined} value WEB_ROOT 环境变量
 * @return {string | null} 目录不存在时返回 null
 */
function resolveWebRoot(value: string | undefined): string | null {
	const candidate = value ? path.resolve(value) : path.resolve(__dirname, '..', '..', 'dist');

	try {
		return fs.statSync(candidate).isDirectory() ? candidate : null;
	} catch {
		return null;
	}
}

/**
 * 从环境变量装配服务配置，所有可调项集中在这里
 *
 * @param {NodeJS.ProcessEnv} source 环境变量，默认 process.env
 * @return {ServiceConfig} 服务配置
 */
export function loadConfig(source: NodeJS.ProcessEnv = process.env): ServiceConfig {
	const rawEnv = source.NODE_ENV || 'development';
	const env: NodeEnv = KNOWN_ENVS.includes(rawEnv as NodeEnv) ? (rawEnv as NodeEnv) : 'development';
	const meta = readPackageMeta();

	return {
		name: meta.name,
		version: meta.version,
		env,
		host: source.HOST || '0.0.0.0',
		port: resolvePort(source.PORT, 7001),
		logLevel: source.LOG_LEVEL || DEFAULT_LOG_LEVEL[env],
		apiPrefix: source.API_PREFIX || '/api',
		webRoot: resolveWebRoot(source.WEB_ROOT),
		trustProxy: source.TRUST_PROXY === 'true' || source.TRUST_PROXY === '1',
		commit: source.GIT_COMMIT || 'unknown',
		buildTime: source.BUILD_TIME || 'unknown',
		startedAt: new Date().toISOString()
	};
}
