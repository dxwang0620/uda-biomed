import HeroWave from './HeroWave.tsx'
import styles from './PageHero.module.css'

/**
 * 內頁 hero。ABOUT / RESEARCH / TECHNOLOGY 三頁共用同一個結構：
 * eyebrow + H1 + 一句話，底部收在 navy 波浪色帶上。
 *
 * 設計稿的內頁 hero 右側還有一張情境照（實驗室、廠房），左側白底漸隱。
 * **那些照片我沒有**，也不會找圖代替，所以這裡只留結構。
 * 之後要放圖時把照片傳進 media，樣式已經備好。
 */
export default function PageHero({
  eyebrow,
  title,
  titleId,
  lede,
  media,
  focal,
}: {
  /** 可選。設計稿三個內頁都有，但不是每一頁都適合硬掰一個。 */
  eyebrow?: string
  title: string
  titleId: string
  lede: string
  media?: React.ReactNode
  /**
   * 桌機的取景點（object-position）。每張照片的主體位置不同，
   * 共用一個值會切到不該切的地方——ABOUT 的建物要靠上取才保得住屋頂，
   * 三張室內走廊照則要置中，用同一個值天花板會佔掉一半。
   * 不給就用 CSS 裡的預設值。
   */
  focal?: string
}) {
  return (
    <section
      className={styles.hero}
      aria-labelledby={titleId}
      style={
        focal ? ({ '--hero-focal': focal } as React.CSSProperties) : undefined
      }
    >
      {media && <div className={styles.media}>{media}</div>}

      <div className={`container ${styles.content}`}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 id={titleId} className={styles.title}>
          {title}
        </h1>
        <p className={styles.lede}>{lede}</p>
      </div>

      <HeroWave className={styles.wave} />
    </section>
  )
}
