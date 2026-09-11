import type { FastifyInstance } from 'fastify';

const schema = {
	description: '存活探针，供容器编排与云负载均衡调用',
	response: {
		200: {
			type: 'object',
			properties: {
				status: { type: 'string', enum: ['ok'] },
				uptime: { type: 'number' },
				timestamp: { type: 'string' }
			},
			required: ['status', 'uptime', 'timestamp']
		}
	}
};

/**
 * 注册健康检查路由
 *
 * @param {FastifyInstance} app fastify 实例
 * @return {Promise<void>}
 */
export async function healthRoute(app: FastifyInstance): Promise<void> {
	app.get('/health', { schema }, async () => ({
		status: 'ok' as const,
		uptime: Number(process.uptime().toFixed(3)),
		timestamp: new Date().toISOString()
	}));
}
