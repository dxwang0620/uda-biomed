/**
 * 為每個路由產生一份實體的 index.html。
 *
 * GitHub Pages 沒有 SPA fallback，一般做法是把 index.html 複製成 404.html，
 * 讓找不到的路徑落到 SPA 手上。畫面是對的，但**狀態碼是 404**——
 * 搜尋引擎會把 /about 這類網址當成不存在。CLAUDE.md 之所以否決 HashRouter，
 * 就是因為這些網址會出現在名片、簡報與搜尋結果上，回 404 等於白做。
 *
 * 產生 dist/about/index.html 之後，GitHub Pages 就會以 200 回應。
 * 404.html 仍然保留，處理真正不存在的路徑。
 *
 * 路由清單直接從 src/config/site.ts 取，避免兩邊各記一份而走鐘。
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const indexHtml = join(dist, 'index.html')

if (!existsSync(indexHtml)) {
  console.error('prerender-routes: 找不到 dist/index.html，請先執行 vite build')
  process.exit(1)
}

const site = readFileSync(join(root, 'src/config/site.ts'), 'utf8')
const routes = [...site.matchAll(/to:\s*'(\/[^']*)'/g)]
  .map((m) => m[1])
  .filter((r) => r !== '/')

const unique = [...new Set(routes)]
if (unique.length === 0) {
  console.error('prerender-routes: 從 site.ts 取不到任何路由，格式可能改了')
  process.exit(1)
}

const html = readFileSync(indexHtml, 'utf8')
for (const route of unique) {
  const dir = join(dist, route.replace(/^\//, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

console.log(`prerender-routes: 已產生 ${unique.length} 個路由 → ${unique.join(' ')}`)
