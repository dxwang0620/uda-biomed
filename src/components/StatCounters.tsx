import { useCallback, useEffect, useRef, useState } from 'react'
import { usePress } from '../hooks/usePress.ts'
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
]

const DURATION = 1600

/**
 * 把數字從 0 跑到目標值。**每次捲進畫面都重跑一次**，不是只跑第一次。
 *
 * 用 requestAnimationFrame 而不是 setInterval：setInterval 的間隔不保證，
 * 掉幀時數字會跳動。這裡以實際經過時間換算進度，掉幀只會少畫幾格。
 *
 * `prefers-reduced-motion` 時直接顯示終值，不跑動畫——重播也一樣不跑。
 *
 * 註：`run` 仍然回傳出去，但目前只有 observer 在用。
 */
function useCountUp(target: number | null, decimals: number) {
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const raf = useRef<number | undefined>(undefined)
  const inView = useRef(false)

  /** 從 0 重跑一次。重播前先取消上一輪，否則兩個 rAF 迴圈會同時寫同一個數字 */
  const run = useCallback(() => {
    if (target === null) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target)
      return
    }

    if (raf.current !== undefined) cancelAnimationFrame(raf.current)
    setShown(0)

    const start = performance.now()
    const tick = (now: number) => {
      // 下界一定要夾。rAF 傳進來的時間戳是「該幀開始的時間」，
      // 可能早於上面用 performance.now() 記下的 start，t 會是負數，
      // easeOutCubic 就吐出負值，畫面上第一幀會出現「-0.0」
      const t = Math.min(Math.max((now - start) / DURATION, 0), 1)
      // easeOutCubic：起步快、收尾緩，數字停下來時不會突兀
      const eased = 1 - Math.pow(1 - t, 3)
      setShown(target * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else {
        raf.current = undefined
        setShown(target)
      }
    }
    raf.current = requestAnimationFrame(tick)
  }, [target])

  /* 每次捲進畫面都重跑一次（指定），不是只跑第一次。
     所以 observer 不 disconnect，改用一個「目前在不在畫面內」的旗標，
     只在由外進內的那一刻觸發。

     進場與離場用不同的門檻（40% 進、5% 出）。同一個門檻的話，
     捲動停在邊界上輕微晃動就會反覆跨越，數字會一直重跑。 */
  useEffect(() => {
    const el = ref.current
    if (target === null || !el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        if (!inView.current && ratio >= 0.4) {
          inView.current = true
          run()
        } else if (inView.current && ratio < 0.05) {
          inView.current = false
        }
      },
      { threshold: [0, 0.05, 0.4] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, run])

  useEffect(
    () => () => {
      if (raf.current !== undefined) cancelAnimationFrame(raf.current)
    },
    [],
  )

  return { ref, text: shown.toFixed(decimals), run }
}

function StatCell({ stat }: { stat: Stat }) {
  const { ref, text } = useCountUp(stat.value, stat.decimals ?? 0)
  const { pressed, handlers } = usePress()

  return (
    <li
      className={`${styles.cell} ${pressed ? styles.pressed : ''}`}
      {...handlers}
    >
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
