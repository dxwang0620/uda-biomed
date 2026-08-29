import { SITE } from '../config/site.ts'
import { useRegisterHero } from '../context/heroRegistry.ts'
import styles from './Home.module.css'

export default function Home() {
  /* 把 hero 交給 Header 觀察，決定它要透明還是白底 */
  const registerHero = useRegisterHero()

  return (
    <>
      {/* TODO Step 3：背景影片 + navy 遮罩 + 波浪 SVG。
          目前是純 navy 色塊，用意是讓 header 的透明狀態現在就驗得到，
          高度也先照 hero 的實際尺寸，捲動切換才是真的在測。 */}
      <section
        ref={registerHero}
        className={styles.heroPlaceholder}
        aria-labelledby="hero-heading"
      >
        <div className="container">
          <h1 id="hero-heading" className={styles.heroTitle}>
            {SITE.tagline}
          </h1>
          <p className={styles.heroSubhead}>
            Exploring molecular and atomic-level insights to better understand
            the origins of disease.
          </p>
          {/* TODO Step 4：實心 OUR RESEARCH 鈕 + 外框 CONTACT US 鈕 */}
          <p>Unveiling Dynamic Atoms</p>
        </div>
      </section>

      <div className="container">
        {/* 設計稿：三欄圖示 + 標題，欄與欄之間有 1px 分隔線 */}
        <section aria-labelledby="pillars-heading">
          <h2 id="pillars-heading" className="visually-hidden">
            What we do
          </h2>
          <ul role="list">
            <li>MOLECULAR INSIGHTS</li>
            <li>DETECTION RESEARCH</li>
            <li>CLINICAL COLLABORATION</li>
          </ul>
        </section>

        <section>
          <p>[TODO: 首頁各區塊摘要與 CTA，設計稿只畫到三欄圖示為止]</p>
        </section>

        {/* 暫時撐高，讓捲動測試有東西可捲。Step 3 之後移除。 */}
        <div className={styles.scrollSpacer} aria-hidden="true" />
      </div>
    </>
  )
}
