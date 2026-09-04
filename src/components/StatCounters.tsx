import { useEffect, useRef, useState } from 'react'
import styles from './StatCounters.module.css'

/**
 * 四格數字統計，捲進畫面才開始跑數。
 *
 * ⚠️ **四個數字裡有兩個是假的，畫面上沒有任何標示。**
 *
 * 前兩項是公開統計，有出處：
 *   - 全球人口：UN World Population Prospects（2026-09 約 83.1 億）
 *   - 全球癌症：WHO / IARC GLOBOCAN 2022（每年約 2,000 萬新增病例）
 *
 * 後兩項（研發中項目數、專利申請）是 **UDA 自己的內部數字，我沒有來源**，
 * 目前填的是佔位值，指定要先隨便加的。出處說明列也一併移除了，
 * 所以畫面上看不出哪些是真的。**上線前必須換成實際數字。**
 * 完整說明見 docs/content-home.md。
 */

type Stat = {
  /** null = 尚無數據，顯示待補標記，不跑動畫 */
  value: number | null
  /** 顯示用後綴，例如 B（billion）、M（million） */
  suffix?: string
  decimals?: number
  en: string
  zh: string
}

const STATS: Stat[] = [
  {
    value: 8.3,
    suffix: 'B',
    decimals: 1,
    en: 'People worldwide',
    zh: '全球人口',
  },
  {
    value: 20,
    suffix: 'M',
    decimals: 0,
    en: 'New cancer cases a year',
    zh: '全球每年新增癌症病例',
  },
  {
    /* ⚠️ 佔位值，非實際數據 */
    value: 12,
    en: 'Programmes in development',
    zh: '研發中項目數',
  },
  {
    /* ⚠️ 佔位值，非實際數據 */
    value: 8,
    en: 'Patent applications',
    zh: '專利申請',
  },
]

const DURATION = 1600

/**
 * 捲進畫面時把數字從 0 跑到目標值。
 *
 * 用 requestAnimationFrame 而不是 setInterval：setInterval 的間隔不保證，
 * 掉幀時數字會跳動。這裡以實際經過時間換算進度，掉幀只會少畫幾格。
 *
 * `prefers-reduced-motion` 時直接顯示終值，不跑動畫。
 */
function useCountUp(target: number | null, decimals: number) {
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  useEffect(() => {
    if (target === null) return
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return
        done.current = true
        io.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1)
          // easeOutCubic：起步快、收尾緩，數字停下來時不會突兀
          const eased = 1 - Math.pow(1 - t, 3)
          setShown(target * eased)
          if (t < 1) requestAnimationFrame(tick)
          else setShown(target)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  return { ref, text: shown.toFixed(decimals) }
}

function StatCell({ stat }: { stat: Stat }) {
  const { ref, text } = useCountUp(stat.value, stat.decimals ?? 0)

  return (
    <li className={styles.cell}>
      <span className={styles.value} ref={ref}>
        {stat.value === null ? (
          <span className={styles.pending}>—</span>
        ) : (
          <>
            {text}
            {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
          </>
        )}
      </span>

      <span className={styles.label}>
        <span className={styles.labelEn}>{stat.en}</span>
        <span className={styles.labelZh} lang="zh-Hant">
          {stat.zh}
        </span>
      </span>
    </li>
  )
}

export default function StatCounters() {
  return (
    <div className={styles.wrap}>
      {/* 這一排沒有可見標題（指定移除），讀屏使用者需要知道它是什麼 */}
      <ul className={styles.grid} aria-label="Key figures">
        {STATS.map((s) => (
          <StatCell key={s.en} stat={s} />
        ))}
      </ul>
    </div>
  )
}
