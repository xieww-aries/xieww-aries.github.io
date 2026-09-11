import type { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';

/**
 * 托管前端产物：静态资源直出，未命中的 GET 请求回退到 index.html 交给 React Router
 *
 * @param {FastifyInstance} app fastify 实例
 * @return {Promise<void>}
 */
export async function registerWeb(app: FastifyInstance): Promise<void> {
	const { webRoot, apiPrefix } = app.config;

	if (!webRoot) {
		app.log.warn('未找到前端产物，以纯 API 模式启动（先在仓库根执行 npm run build）');

		return;
	}

	app.log.info({ webRoot }, '托管 SPA 静态资源');

	// wildcard: false 让插件为每个真实文件注册精确路由，其余路径交给 notFound 回退
	await app.register(fastifyStatic, {
		root: webRoot,
		prefix: '/',
		wildcard: false,
		dotfiles: 'deny',
		index: ['index.html']
	});

	app.setNotFoundHandler((request, reply) => {
		if (request.method !== 'GET' || request.url.startsWith(apiPrefix)) {
			return reply.code(404).send({
				statusCode: 404,
				error: 'Not Found',
				message: `路由不存在: ${request.url}`,
				requestId: request.id
			});
		}

		return reply.type('text/html; charset=utf-8').sendFile('index.html');
	});
}
