import type { FastifyInstance } from 'fastify';

const schema = {
	description: '站点运行信息，前端用它判断自己是否运行在 service 之上',
	response: {
		200: {
			type: 'object',
			properties: {
				name: { type: 'string' },
				version: { type: 'string' },
				env: { type: 'string' },
				node: { type: 'string' },
				commit: { type: 'string' },
				buildTime: { type: 'string' },
				startedAt: { type: 'string' },
				spa: { type: 'boolean' }
			},
			required: ['name', 'version', 'env', 'node', 'spa']
		}
	}
};

/**
 * 注册站点信息路由
 *
 * @param {FastifyInstance} app fastify 实例
 * @return {Promise<void>}
 */
export async function siteRoute(app: FastifyInstance): Promise<void> {
	app.get('/site/info', { schema }, async () => {
		const { config } = app;

		return {
			name: config.name,
			version: config.version,
			env: config.env,
			node: process.version,
			commit: config.commit,
			buildTime: config.buildTime,
			startedAt: config.startedAt,
			spa: config.webRoot !== null
		};
	});
}
