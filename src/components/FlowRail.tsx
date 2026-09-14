import { useCallback, useEffect, useRef } from 'react'
import styles from './FlowRail.module.css'

/**
 * 流程四步。窄螢幕做成橫向滑軌（指定「參考 research 的三個」），
 * 768 以上回到四欄並排。
 *
 * 捲動進度的算法與 FocusStack 相同，兩個要注意的地方也一樣：
 *
 *   - **onScroll 不做 rAF 節流。** 用旗標節流時，只要有一幀被丟掉，
 *     旗標就再也不會被清掉，之後所有的 scroll 事件都會被吃掉，
 *     進度條會卡住不動。這個坑在 FocusStack 踩過。
 *   - **捲到底直接視為 1。** scrollLeft 幾乎不會剛好等於 max
 *     （裝置像素比與慣性收尾都會差零點幾 px），不夾的話線永遠停在 99.x%。
 *
 * 進度軌整條 aria-hidden：它是「現在滑到哪」的視覺提示，捲動位置本身
 * 在捲動容器上已經有了，再做成可聚焦的控制項只會多出四個 tab 停留點。
 */

export type FlowStep = { zh: string; en: string; body: string }

export default function FlowRail({
  steps,
  label,
}: {
  steps: FlowStep[]
  /** 捲動容器的無障礙名稱 */
  label: string
}) {
  const viewport = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)

  const sync = useCallback(() => {
    const vp = viewport.current
    const el = rail.current
    if (!vp || !el) return

    const max = vp.scrollWidth - vp.clientWidth
    const raw = max > 0 ? vp.scrollLeft / max : 0
    const p = vp.scrollLeft >= max - 1 ? 1 : raw
    el.style.setProperty('--p', String(p))

    /* 圓點在線走到它的那一刻才亮。1e-3 是浮點與次像素的緩衝，
       否則 p 停在 0.3333 時第二顆不會亮。 */
    const reached =
      p <= 0 ? 0 : steps.filter((_, i) => p + 1e-3 >= i / (steps.length - 1)).length
    el.dataset.reached = String(reached)
  }, [steps])

  /* 斷點跨越時 scrollWidth 會變，要重算一次，否則從桌機縮到手機時
     進度條會停在錯的位置。 */
  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  return (
    <div className={styles.wrap}>
      <div
        className={styles.viewport}
        ref={viewport}
        onScroll={sync}
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        <ol className={styles.rail}>
          {steps.map((step, i) => (
            <li key={step.zh} className={styles.step}>
              <span className={styles.num}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.zh} lang="zh-Hant">
                {step.zh}
              </span>
              <span className={styles.en}>{step.en}</span>
              <span className={styles.body}>{step.body}</span>
            </li>
          ))}
        </ol>
      </div>

      <div
        className={styles.progress}
        ref={rail}
        data-reached="0"
        aria-hidden="true"
        lang="zh-Hant"
      >
        <span className={styles.track} />
        <span className={styles.fill} />
        <ol className={styles.dots}>
          {steps.map((step) => (
            <li key={step.zh} className={styles.dotItem}>
              <span className={styles.dot} />
              <span className={styles.dotLabel}>{step.zh}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
