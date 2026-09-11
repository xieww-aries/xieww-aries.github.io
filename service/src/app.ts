import Fastify, { type FastifyError, type FastifyReply, type FastifyRequest, type FastifyServerOptions } from 'fastify';
import compress from '@fastify/compress';
import helmet from '@fastify/helmet';

import type { ServiceConfig } from './config';
import { registerApi } from './routes';
import { registerWeb } from './plugins/web';

// demo/index.html 引了 Google Fonts，React 组件大量使用行内 style，两者都要在 CSP 中放行
const CONTENT_SECURITY_POLICY = {
	directives: {
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'"],
		styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
		fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
		imgSrc: ["'self'", 'data:', 'blob:'],
		mediaSrc: ["'self'", 'data:', 'blob:'],
		connectSrc: ["'self'"],
		workerSrc: ["'self'", 'blob:'],
		objectSrc: ["'none'"],
		frameAncestors: ["'none'"],
		baseUri: ["'self'"],
		formAction: ["'self'"],
		// helmet 默认会带上它，本地 http 调试时会把静态资源强制升级成 https 而失败
		upgradeInsecureRequests: null
	}
};

/**
 * 装配 pino 日志参数：开发环境走 pino-pretty，生产环境输出结构化 JSON 便于云端采集
 *
 * @param {ServiceConfig} config 服务配置
 * @return {FastifyServerOptions['logger']}
 */
function buildLoggerOptions(config: ServiceConfig): FastifyServerOptions['logger'] {
	if (config.logLevel === 'silent') {
		return false;
	}

	if (config.env === 'development') {
		return {
			level: config.logLevel,
			transport: {
				target: 'pino-pretty',
				options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' }
			}
		};
	}

	return { level: config.logLevel };
}

/**
 * 统一错误出口：5xx 记 error 并对外隐藏细节，4xx 记 warn 并回传原因
 *
 * @param {FastifyError} error 抛出的错误
 * @param {FastifyRequest} request 当前请求
 * @param {FastifyReply} reply 当前响应
 * @return {void}
 */
function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply): void {
	const statusCode = error.statusCode && error.statusCode >= 400 && error.statusCode < 600 ? error.statusCode : 500;
	const isServerError = statusCode >= 500;

	if (isServerError) {
		request.log.error({ err: error }, '请求处理失败');
	} else {
		request.log.warn({ err: error }, '请求被拒绝');
	}

	void reply.code(statusCode).send({
		statusCode,
		error: isServerError ? 'Internal Server Error' : error.message,
		message: isServerError ? '服务器内部错误' : error.message,
		requestId: request.id
	});
}

/**
 * 构建 fastify 实例：中间件、API、静态资源按序注册，便于单测直接注入
 *
 * @param {ServiceConfig} config 服务配置
 * @return {Promise<FastifyInstance>} 未监听的 fastify 实例
 */
export async function buildApp(config: ServiceConfig) {
	const app = Fastify({
		logger: buildLoggerOptions(config),
		trustProxy: config.trustProxy,
		bodyLimit: 1024 * 1024,
		connectionTimeout: 20000,
		// 云上负载均衡的空闲超时通常是 60s，keep-alive 要略大于它才能避免竞态断连
		keepAliveTimeout: 65000,
		requestTimeout: 30000
	});

	app.decorate('config', config);
	app.setErrorHandler(errorHandler);

	await app.register(helmet, { contentSecurityPolicy: CONTENT_SECURITY_POLICY });
	await app.register(compress, { global: true, encodings: ['br', 'gzip'] });
	await registerApi(app);
	await registerWeb(app);

	return app;
}
