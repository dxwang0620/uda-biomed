import { useEffect, useState } from 'react'

/* prefers-reduced-motion 時不載入影片，只顯示 poster。
   這件事必須在 JS 判斷：CSS 擋得住顯示，擋不住下載。

   註：claude.md 原本要求「768px 以下不載入影片」，依後續指示改為
   手機也播。代價是每個手機訪客多約 616KB 流量（webm；mp4 為 689KB）。
   要改回只在寬螢幕播，把 WIDE 那一條加回 allowed() 即可。 */
const REDUCED = '(prefers-reduced-motion: reduce)'

const allowed = () => !window.matchMedia(REDUCED).matches

/**
 * 影片該不該掛上 DOM。
 *
 * 初始值用 lazy initialiser 直接算，不是先 false 再由 effect 修正——
 * 否則會先掛上 <video> 開始下載，再被移除，該省的頻寬已經花掉了。
 */
export function useHeroVideoEnabled() {
  const [enabled, setEnabled] = useState(allowed)

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED)
    const update = () => setEnabled(allowed())
    reduced.addEventListener('change', update)
    return () => reduced.removeEventListener('change', update)
  }, [])

  return enabled
}
