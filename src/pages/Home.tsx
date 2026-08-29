import { SITE } from '../config/site.ts'

export default function Home() {
  return (
    <>
      {/* TODO Step 3：hero 背景影片 + navy 遮罩 + 波浪 SVG */}
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading">{SITE.tagline}</h1>
        <p>
          Exploring molecular and atomic-level insights to better understand the
          origins of disease.
        </p>
        {/* TODO Step 4：實心 OUR RESEARCH 鈕 + 外框 CONTACT US 鈕 */}
        <p>Unveiling Dynamic Atoms</p>
      </section>

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
    </>
  )
}
