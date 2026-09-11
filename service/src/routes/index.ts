import type { FastifyInstance } from 'fastify';

import { healthRoute } from './health';
import { siteRoute } from './site';

/**
 * 把所有接口挂在 config.apiPrefix 下，与静态资源彻底隔离
 *
 * @param {FastifyInstance} app fastify 实例
 * @return {Promise<void>}
 */
export async function registerApi(app: FastifyInstance): Promise<void> {
	await app.register(
		async scope => {
			await scope.register(healthRoute);
			await scope.register(siteRoute);
		},
		{ prefix: app.config.apiPrefix }
	);
}
