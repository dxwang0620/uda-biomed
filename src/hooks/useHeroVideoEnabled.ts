import { useEffect, useState } from 'react'

/* 768px 以下不載入影片，只顯示 poster；reduced-motion 時同樣不播。
   這兩件事都必須在 JS 判斷：CSS 擋得住顯示，擋不住下載。 */
const WIDE = '(min-width: 768px)'
const REDUCED = '(prefers-reduced-motion: reduce)'

const allowed = () =>
  window.matchMedia(WIDE).matches && !window.matchMedia(REDUCED).matches

/**
 * 影片該不該掛上 DOM。
 *
 * 初始值用 lazy initialiser 直接算，不是先 false 再由 effect 修正——
 * 否則窄螢幕會先掛上 <video> 開始下載，再被移除，該省的頻寬已經花掉了。
 */
export function useHeroVideoEnabled() {
  const [enabled, setEnabled] = useState(allowed)

  useEffect(() => {
    const wide = window.matchMedia(WIDE)
    const reduced = window.matchMedia(REDUCED)
    const update = () => setEnabled(allowed())

    wide.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      wide.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  return enabled
}
