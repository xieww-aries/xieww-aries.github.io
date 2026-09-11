import { buildApp } from './app';
import { loadConfig } from './config';

/**
 * 启动服务并挂载优雅关闭：容器 stop 时先停止接流再退出，避免请求被硬切
 *
 * @return {Promise<void>}
 */
async function bootstrap(): Promise<void> {
	const app = await buildApp(loadConfig());

	const shutdown = async (signal: string): Promise<void> => {
		app.log.info({ signal }, '收到退出信号，开始优雅关闭');

		try {
			await app.close();
			app.log.info('服务已关闭');
			process.exit(0);
		} catch (error) {
			app.log.error({ err: error }, '关闭失败');
			process.exit(1);
		}
	};

	['SIGINT', 'SIGTERM'].forEach(signal => {
		process.once(signal, () => void shutdown(signal));
	});

	await app.listen({ host: app.config.host, port: app.config.port });
}

bootstrap().catch(error => {
	// 启动阶段 logger 可能还没就绪，直接写 stderr
	console.error('[service] 启动失败:', error);
	process.exit(1);
});
