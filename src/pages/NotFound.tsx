import { Link } from 'react-router-dom'

/**
 * GitHub Pages 沒有 SPA fallback，deploy workflow 會把 index.html 複製成
 * 404.html。使用者直接開一個不存在的網址時，會載入同一支 SPA 並由這裡接手。
 */
export default function NotFound() {
  return (
    <section aria-labelledby="notfound-heading">
      <h1 id="notfound-heading">Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Back to home</Link>
    </section>
  )
}
