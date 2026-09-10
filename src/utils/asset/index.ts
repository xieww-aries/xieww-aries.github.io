/**
 * 取得打包产物的目录，兼容 GitHub Pages 根目录与 egg 的 public/dist 部署
 *
 * @return {string}
 */
function resolveBundleBase() {
	const scripts = Array.prototype.slice.call(document.scripts || []) as HTMLScriptElement[];
	const bundle = scripts.filter(script => script.src && /bundle(?:\.[\w-]+)?\.js(?:\?.*)?$/.test(script.src))[0];

	if (!bundle) {
		return '/';
	}

	return bundle.src.replace(/[^/]+$/, '');
}

/**
 * 拼接 static 目录下资源的绝对地址
 *
 * @param {string} file 相对 static 的路径，如 geo/china.json
 * @return {string}
 */
export function resolveStaticUrl(file: string) {
	return `${resolveBundleBase()}static/${file.replace(/^\/+/, '')}`;
}
