import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * 換頁時把捲動位置帶回頂端。
 *
 * SPA 換頁不是真的載入新文件，捲動位置會原封不動留著——從 ABOUT 頁底部
 * 點 TECHNOLOGY，會直接落在 TECHNOLOGY 的頁尾，看起來像壞掉。
 *
 * 只在 PUSH（點連結前進）時歸零。POP（上一頁／下一頁）要保留瀏覽器
 * 自己還原的位置，否則使用者按上一頁會失去原本看到的地方。
 *
 * 不用 smooth：換頁時的平滑捲動會讓新頁在移動中繪製，反而更亂，
 * 對 prefers-reduced-motion 的使用者也不友善。
 */
export function useScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return
    window.scrollTo(0, 0)
  }, [pathname, navigationType])
}
