import SectionNav, { type SectionLink } from '../components/SectionNav.tsx'
import VideoBlock from '../components/VideoBlock.tsx'
import Section from '../components/ui/Section.tsx'
import ArrowLink from '../components/ui/ArrowLink.tsx'
import styles from './DigitalHealth.module.css'

/**
 * 數位醫療研發部。
 *
 * 版型參考 exo-one.com 的核心技術頁（指定）：側邊章節錨點 ＋ 一路往下的
 * 圖文說明，而不是輪播式的行銷頁。另外加上該頁沒有的兩樣東西：
 * hero 的動態背景與可播放的影片區塊。
 *
 * 圖片來源 about_img/digital_healthcare/。九張場景圖與 main 都是同一顆
 * 液態晶片的應用情境，圖上本來就帶著中文標籤（氣味偵測／AI 分析／
 * 即時警示…），所以場景名稱直接取自圖面，不是我擬的。
 *
 * ⚠️ **所有敘述性文字都是 `[待補]`。** 晶片的原理、規格、開發階段、
 * 偵測項目一律不編——這正是 CLAUDE.md 第 3 條點名的範圍。
 * 需要補的清單見 docs/content-digital-health.md。
 */

const NAV: SectionLink[] = [
  { id: 'what', label: '什麼是液態晶片' },
  { id: 'how', label: '運作流程' },
  { id: 'applications', label: '應用場景' },
  { id: 'video', label: '影片介紹' },
  { id: 'gallery', label: '圖庫' },
]

/* 流程四步。取自 about_img/digital_healthcare 圖面上既有的中文標籤
   （S__216956956／959 的底排），不是我擬的詞。 */
const FLOW = [
  { zh: '氣味偵測', en: 'Odour sensing' },
  { zh: 'AI 分析', en: 'AI analysis' },
  { zh: '即時警示', en: 'Real-time alert' },
  { zh: '自動應變', en: 'Automated response' },
]

/* 九個應用場景。名稱依圖面內容命名，敘述待補。 */
const SCENES = [
  { file: 'dh-1', zh: '居家健康檢測', en: 'Home health screening' },
  { file: 'dh-2', zh: '食品新鮮度', en: 'Food freshness' },
  { file: 'dh-3', zh: '隨身安全配戴', en: 'Wearable safety' },
  { file: 'dh-4', zh: '住宅安全防護', en: 'Home safety' },
  { file: 'dh-5', zh: '消防救援', en: 'Fire and rescue' },
  { file: 'dh-6', zh: '太空艙環境', en: 'Spacecraft environment' },
  { file: 'dh-7', zh: '零售場域', en: 'Retail environments' },
  { file: 'dh-8', zh: '居家陪伴照護', en: 'Companion care' },
  { file: 'dh-9', zh: '安檢與海關', en: 'Security screening' },
]

export default function DigitalHealth() {
  return (
    <>
      {/* Hero。背景目前是 main.jpg 的靜態圖。
          動態背景的檔案到位後，在這裡加一支與首頁 hero 同規格的
          <video muted loop playsInline poster="…dh-main.jpg">，
          poster 就沿用現在這張，換過去不會有中間的空白狀態。 */}
      <header className={styles.hero}>
        <picture className={styles.heroMedia}>
          <source
            srcSet={`${import.meta.env.BASE_URL}media/dh-main.webp`}
            type="image/webp"
          />
          <img
            src={`${import.meta.env.BASE_URL}media/dh-main.jpg`}
            alt=""
            width={1600}
            height={1600}
            fetchPriority="high"
          />
        </picture>

        <div className={styles.heroText}>
          <p className={styles.eyebrow}>RESEARCH</p>
          <h1 className={styles.title} lang="zh-Hant">
            數位醫療研發部
          </h1>
          <p className={styles.lede} lang="zh-Hant">
            [待補：一句話說明這個部門在做什麼]
          </p>
        </div>
      </header>

      <Section>
        <div className={styles.layout}>
          <SectionNav items={NAV} />

          <div className={styles.body}>
            <section id="what" className={styles.block}>
              <h2 lang="zh-Hant">什麼是液態晶片</h2>
              <p className={styles.prose} lang="zh-Hant">
                [待補：液態晶片的定義與原理，約 200～300 字]
              </p>

              {/* 圖文並排。左圖右文，窄螢幕自動堆疊。 */}
              <div className={styles.split}>
                <picture className={styles.splitMedia}>
                  <source
                    srcSet={`${import.meta.env.BASE_URL}media/dh-main.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`${import.meta.env.BASE_URL}media/dh-main.jpg`}
                    alt="液態晶片的分層結構示意，含晶片本體與展開後的各層。"
                    width={1600}
                    height={1600}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div>
                  <h3 lang="zh-Hant">晶片結構</h3>
                  <p className={styles.prose} lang="zh-Hant">
                    [待補：各層的功能說明]
                  </p>
                </div>
              </div>
            </section>

            <section id="how" className={styles.block}>
              <h2 lang="zh-Hant">運作流程</h2>
              <p className={styles.prose} lang="zh-Hant">
                [待補：四個步驟各自的說明]
              </p>

              <ol className={styles.flow}>
                {FLOW.map((step, i) => (
                  <li key={step.zh} className={styles.flowStep}>
                    <span className={styles.flowNum}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.flowZh} lang="zh-Hant">
                      {step.zh}
                    </span>
                    <span className={styles.flowEn}>{step.en}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section id="applications" className={styles.block}>
              <h2 lang="zh-Hant">應用場景</h2>
              <p className={styles.prose} lang="zh-Hant">
                [待補：導言，說明這顆晶片為何能橫跨這些場域]
              </p>

              <ul role="list" className={styles.scenes}>
                {SCENES.map((s) => (
                  <li key={s.file} className={styles.scene}>
                    <picture className={styles.sceneMedia}>
                      <source
                        srcSet={`${import.meta.env.BASE_URL}media/${s.file}.webp`}
                        type="image/webp"
                      />
                      <img
                        src={`${import.meta.env.BASE_URL}media/${s.file}.jpg`}
                        alt=""
                        width={1100}
                        height={1005}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <h3 className={styles.sceneTitle} lang="zh-Hant">
                      {s.zh}
                      <span className={styles.sceneEn}>{s.en}</span>
                    </h3>
                    <p className={styles.sceneBody} lang="zh-Hant">
                      [待補：{s.zh}的說明]
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="video" className={styles.block}>
              <h2 lang="zh-Hant">影片介紹</h2>
              <VideoBlock poster="dh-main" title="數位醫療研發部" />
            </section>

            <section id="gallery" className={styles.block}>
              <h2 lang="zh-Hant">圖庫</h2>
              <p className={styles.prose} lang="zh-Hant">
                [待補：其餘圖片。丟進 about_img/digital_healthcare/ 之後告訴我，
                我轉檔並排進這個網格]
              </p>
            </section>

            <div className={styles.footerCta}>
              <ArrowLink to="/research">Back to research</ArrowLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
