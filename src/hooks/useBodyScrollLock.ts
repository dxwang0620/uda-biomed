import { useEffect } from 'react'

/**
 * 鎖住 body 捲動。
 *
 * 補上等寬的 padding-right 抵銷捲軸消失造成的位移，否則開關選單時
 * 整個版面會左右跳一下。觸控裝置沒有佔位的捲軸，算出來是 0，不影響。
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const { overflow, paddingRight } = document.body.style
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}
