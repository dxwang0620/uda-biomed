import styles from './Section.module.css'

/**
 * 頁面區塊。負責兩件事：整幅的區塊底色，以及內部的 container 收邊。
 *
 * CLAUDE.md：「藍白配色容易顯得單薄，靠留白節奏與區塊底色交錯
 * （白 / --color-tint / --color-navy）建立層次，不要靠加陰影或漸層補救。」
 * tone 就是那個交錯用的旋鈕。
 *
 * translucent 是給首頁用的：底下有固定的背景影片，區塊要半透明才看得到它。
 *
 * 因為底色要滿版，Section 必須是 container 的外層，不能包在 container 裡。
 */
type Tone = 'white' | 'tint' | 'navy' | 'translucent'

type Props = {
  children: React.ReactNode
  tone?: Tone
  /** 標題的 id，供 aria-labelledby 用 */
  labelledBy?: string
  className?: string
}

export default function Section({
  children,
  tone = 'white',
  labelledBy,
  className,
}: Props) {
  return (
    <section
      className={[styles.section, styles[tone], className ?? '']
        .filter(Boolean)
        .join(' ')}
      aria-labelledby={labelledBy}
    >
      <div className="container">{children}</div>
    </section>
  )
}
