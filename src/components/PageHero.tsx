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
}: {
  eyebrow: string
  title: string
  titleId: string
  lede: string
  media?: React.ReactNode
}) {
  return (
    <section className={styles.hero} aria-labelledby={titleId}>
      {media && <div className={styles.media}>{media}</div>}

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id={titleId} className={styles.title}>
          {title}
        </h1>
        <p className={styles.lede}>{lede}</p>
      </div>

      <HeroWave className={styles.wave} />
    </section>
  )
}
