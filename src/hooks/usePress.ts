import { useEffect, useRef, useState } from 'react'

/**
 * 按壓回饋。觸控裝置沒有 hover，整組 hover 效果關在
 * `@media (hover: hover)` 裡，手機上點下去完全沒有反應。
 *
 * 這裡用 pointer 事件補一個 `.pressed`，效果與桌機 hover 相同。
 * 用 pointerdown 而不是 :active——:active 在 iOS Safari 上對非互動元素
 * 不一定會觸發，除非頁面上剛好有 touch 監聽器，不能依賴。
 *
 * 放開後至少維持 260ms 再收：手指點一下往往不到 100ms，
 * 不留一段最短顯示時間的話效果會一閃而過，等於沒有。
 */
export function usePress() {
  const [pressed, setPressed] = useState(false)
  const until = useRef(0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return {
    pressed,
    handlers: {
      onPointerDown: () => {
        window.clearTimeout(timer.current)
        until.current = performance.now() + 260
        setPressed(true)
      },
      onPointerUp: () => {
        const wait = Math.max(0, until.current - performance.now())
        timer.current = window.setTimeout(() => setPressed(false), wait)
      },
      onPointerCancel: () => setPressed(false),
      onPointerLeave: () => setPressed(false),
    },
  }
}
