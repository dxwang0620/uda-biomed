import HeroVideo from '../components/HeroVideo.tsx'
import { SITE } from '../config/site.ts'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <HeroVideo>
        <h1 id="hero-heading" className={styles.heroTitle}>
          {SITE.tagline}
        </h1>
        <p className={styles.heroSubhead}>
          Exploring molecular and atomic-level insights to better understand the
          origins of disease.
        </p>
        {/* TODO Step 4：實心 OUR RESEARCH 鈕 + 外框 CONTACT US 鈕 */}
        <p className={styles.heroSignature}>Unveiling Dynamic Atoms</p>
      </HeroVideo>

      <div className="container">
        {/* 設計稿：三欄圖示 + 標題，欄與欄之間有 1px 分隔線 */}
        <section className={styles.pillars} aria-labelledby="pillars-heading">
          <h2 id="pillars-heading" className="visually-hidden">
            What we do
          </h2>
          <ul role="list">
            <li>MOLECULAR INSIGHTS</li>
            <li>DETECTION RESEARCH</li>
            <li>CLINICAL COLLABORATION</li>
          </ul>
        </section>

        <section className={styles.pillars}>
          <p>[TODO: 首頁各區塊摘要與 CTA，設計稿只畫到三欄圖示為止]</p>
        </section>
      </div>
    </>
  )
}
