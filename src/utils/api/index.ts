export interface ServiceInfo {
	name: string;
	version: string;
	env: string;
	node: string;
	commit?: string;
	buildTime?: string;
	startedAt?: string;
	spa: boolean;
}

const SITE_INFO_URL = '/api/site/info';

/**
 * 读取 service 的站点信息
 *
 * 纯静态托管（GitHub Pages）下没有 /api，接口会返回 404 页面，
 * 这里统一吞掉异常并返回 null，让调用方静默降级，不影响静态站点。
 *
 * @param {AbortSignal} signal 可选的中断信号
 * @return {Promise<ServiceInfo | null>} 拿不到接口时返回 null
 */
export async function fetchServiceInfo(signal?: AbortSignal): Promise<ServiceInfo | null> {
	try {
		const response = await fetch(SITE_INFO_URL, { signal, headers: { accept: 'application/json' } });

		if (!response.ok) {
			return null;
		}

		// 有些静态托管会对未知路径返回 200 + HTML，用 content-type 再挡一层
		if (!String(response.headers.get('content-type') || '').includes('application/json')) {
			return null;
		}

		return (await response.json()) as ServiceInfo;
	} catch {
		return null;
	}
}
