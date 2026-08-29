import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NOT_FOUND_META, PAGE_META } from '../config/site.ts'

/**
 * 依路由更新 document.title 與 description。
 *
 * SPA 換頁不會重載 HTML，index.html 裡的 title 會一直停在首頁那一個——
 * 分享連結、瀏覽器分頁、書籤、搜尋結果都會全部長一樣。
 *
 * 沒有引入 react-helmet：這裡要做的只是設兩個值，一個 effect 就夠，
 * 不值得為此多一個相依套件。
 */
export function usePageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    /* basename 已被 router 去掉，pathname 是站內路徑。
       首頁在某些情況下會是 '' 或 '/'，一併處理。 */
    const key = pathname === '' ? '/' : pathname
    const meta = PAGE_META[key] ?? NOT_FOUND_META

    document.title = meta.title

    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', meta.description)

    /* og:title / og:description 也要跟著換，否則分享出去的預覽永遠是首頁 */
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', meta.title)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', meta.description)
  }, [pathname])
}
