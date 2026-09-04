import { useEffect, useRef, useState } from 'react'
import styles from './StatCounters.module.css'

/**
 * 四格數字統計，捲進畫面才開始跑數。
 *
 * 前兩項是**公開統計**，有出處，可以放：
 *   - 全球人口：UN World Population Prospects
 *   - 全球癌症：WHO / IARC GLOBOCAN 2022
 *
 * 後兩項是 **UDA 自己的內部數字**，我沒有來源，依 CLAUDE.md 工作方式
 * 第 3 條不編造研發成果與專利數據——填錯一個專利件數，對外就是不實陳述。
 * 所以 value 留 null，畫面上顯示待補標記而不是假數字。
 * 拿到實際數字後把 null 換成數字即可，動畫會自動接上。
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
    value: null,
    en: 'Programmes in development',
    zh: '研發中項目數',
  },
  {
    value: null,
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
      <ul className={styles.grid}>
        {STATS.map((s) => (
          <StatCell key={s.en} stat={s} />
        ))}
      </ul>

      {/* 出處要寫出來。生醫網站放數字卻不說來源，等於要人憑信任接受。 */}
      <p className={styles.sources}>
        Population: UN World Population Prospects. Cancer incidence: WHO/IARC
        GLOBOCAN 2022. The final two figures are UDA&rsquo;s own and are not
        published yet.
      </p>
    </div>
  )
}
