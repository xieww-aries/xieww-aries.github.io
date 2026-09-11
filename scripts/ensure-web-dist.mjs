import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const marker = path.join(root, 'dist', 'index.html');

// service 的静态托管在启动时对 dist/ 做快照，缺产物就会退化成纯 API 模式。
// 这里只在产物缺失时补一次构建，已存在则直接跳过，避免每次重启都等 webpack。
if (existsSync(marker)) {
	console.log('[ensure-web-dist] dist/ 已存在，跳过前端构建');
} else {
	console.log('[ensure-web-dist] 未找到 dist/，先构建前端…');
	execSync('npm run build', { cwd: root, stdio: 'inherit' });
}
