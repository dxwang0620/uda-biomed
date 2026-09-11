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
 * ⚠️ **全頁文案是依指示擬的草稿，需要你逐句校對。**
 *
 * 撰寫時守的界線：只描述圖面上看得到的情境與流程，**不寫任何規格、
 * 偵測極限、準確率、開發階段、臨床用途或合作對象**——那些是 CLAUDE.md
 * 第 3 條明訂不能編的。即使如此，「晶片如何運作」這類敘述仍然是推論，
 * 需要研發部確認。要校對的項目逐條列在 docs/content-digital-health.md。
 *
 * 語言：頁面走英文（與全站一致），中文以副標形式保留——這是站上既有的
 * 作法（聯絡表單、組織圖、四格數字都是英文主標＋中文副標）。
 */

const NAV: SectionLink[] = [
  { id: 'what', label: 'AFL System' },
  { id: 'how', label: 'How it works' },
  { id: 'applications', label: 'Applications' },
  { id: 'video', label: 'Video' },
]

/* 流程四步。取自 about_img/digital_healthcare 圖面上既有的中文標籤
   （S__216956956／959 的底排），不是我擬的詞。 */
const FLOW = [
  {
    zh: '氣味偵測',
    en: 'Odour sensing',
    body: 'Air or breath passes over the chip, where the sample meets the sensing layer.',
  },
  {
    zh: 'AI 分析',
    en: 'AI analysis',
    body: 'The resulting pattern is compared against known patterns rather than read as a single value.',
  },
  {
    zh: '即時警示',
    en: 'Real-time alert',
    body: 'When a pattern falls outside the expected range, the device reports it immediately.',
  },
  {
    zh: '自動應變',
    en: 'Automated response',
    body: 'Connected systems can act on that report — cutting power, closing a valve, or notifying someone.',
  },
]

/* 九個應用場景。名稱依圖面內容命名，敘述待補。 */
const SCENES = [
  {
    file: 'dh-1',
    zh: '居家健康檢測',
    en: 'Home health screening',
    body: 'A home device reads exhaled breath and presents the result on a screen the household can understand.',
  },
  {
    file: 'dh-2',
    zh: '食品新鮮度',
    en: 'Food freshness',
    body: 'A sensor inside a refrigerator watches how stored food changes, and flags what is no longer fresh.',
  },
  {
    file: 'dh-3',
    zh: '隨身安全配戴',
    en: 'Wearable safety',
    body: 'A wearable unit samples the air around the person carrying it and warns them of hazardous substances nearby.',
  },
  {
    file: 'dh-4',
    zh: '住宅安全防護',
    en: 'Home safety',
    body: 'Wall units watch for gas, smoke and overheating wiring, and can cut power or close a gas valve on their own.',
  },
  {
    file: 'dh-5',
    zh: '消防救援',
    en: 'Fire and rescue',
    body: 'A mobile robot enters where people should not, reports what it finds in the air, and calls it in automatically.',
  },
  {
    file: 'dh-6',
    zh: '太空艙環境',
    en: 'Spacecraft environment',
    body: 'Cabin air is monitored continuously in an environment where the crew cannot simply open a window.',
  },
  {
    file: 'dh-7',
    zh: '零售場域',
    en: 'Retail environments',
    body: 'In-store units watch for conditions that differ from an ordinary day and alert staff quietly.',
  },
  {
    file: 'dh-8',
    zh: '居家陪伴照護',
    en: 'Companion care',
    body: 'A companion robot keeps track of how someone is doing day to day and can connect them to a clinician.',
  },
  {
    file: 'dh-9',
    zh: '安檢與海關',
    en: 'Security screening',
    body: 'A screening robot checks baggage without opening it, and shows inspectors what it found.',
  },
]

export default function DigitalHealth() {
  return (
    <>
      {/* Hero 的動態背景。來源 about_img/digital_healthcare/ 的影片（指定）。

          與首頁 hero 同一套規格：muted + playsInline 缺一不可，否則 iOS Safari
          不會自動播；poster 必備，載入前、載入失敗、reduced-motion 都靠它撐場。
          純裝飾，aria-hidden。

          影片已在轉檔時裁掉左上角的浮水印（指定），轉檔參數見
          docs/content-digital-health.md。 */}
      <header className={styles.hero}>
        <video
          className={styles.heroMedia}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${import.meta.env.BASE_URL}media/dh-hero-poster.jpg`}
          aria-hidden="true"
        >
          <source
            src={`${import.meta.env.BASE_URL}media/dh-hero.webm`}
            type="video/webm"
          />
          <source
            src={`${import.meta.env.BASE_URL}media/dh-hero.mp4`}
            type="video/mp4"
          />
        </video>
        <div className={styles.heroScrim} aria-hidden="true" />

        <div className={styles.heroText}>
          <p className={styles.eyebrow}>RESEARCH</p>
          {/* 英文主標＋中文副標，與站上其他雙語標題同一個處理 */}
          <h1 className={styles.title}>
            Digital Health R&amp;D
            <span className={styles.titleZh} lang="zh-Hant">
              數位醫療研發部
            </span>
          </h1>
          <p className={styles.lede}>
            Turning scent into data that can be understood.
          </p>
        </div>
      </header>

      <Section>
        <div className={styles.layout}>
          <SectionNav items={NAV} />

          <div className={styles.body}>
            {/* 這一段是你提供的文案，翻成英文（2026-09-11）。
                中文原文與對照見 docs/content-digital-health.md。 */}
            <section id="what" className={styles.block}>
              <h2>
                AFL System
                <span className={styles.h2Sub}>
                  AI Flair Language
                  <span lang="zh-Hant"> ／ 嗅覺語言感測晶片</span>
                </span>
              </h2>

              <p className={styles.leadIn}>
                Humans cannot see scent.
              </p>
              <p className={styles.prose}>
                But many substances, once they enter the air, leave behind a
                distinctive volatile chemical signal. AFL System turns the sense of
                smell into data.
              </p>
              <p className={styles.prose}>
                Through a new sensing architecture, signal analysis and artificial
                intelligence models, AFL sets out to build an intelligent olfactory
                system — one that can sense, identify and analyse the scent
                characteristics of an environment.
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
                  <h3>Sensing what cannot be seen</h3>
                  <p className={styles.prose}>
                    Much of the important information in an environment exists
                    neither as an image nor as a sound.
                  </p>
                </div>
              </div>
            </section>

            <section id="how" className={styles.block}>
              <h2>How it works</h2>
              <p className={styles.prose}>
                The same four steps run in every application below. What changes is
                where the device sits and who receives the alert.
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
                    <span className={styles.flowBody}>{step.body}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section id="applications" className={styles.block}>
              <h2>Applications</h2>
              <p className={styles.prose}>
                A sensor small enough to sit inside other equipment ends up in
                places that have little to do with each other — a kitchen, a
                rescue robot, a cabin in orbit. The nine scenes below are the ones
                we are currently exploring.
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
                    <p className={styles.sceneBody}>{s.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="video" className={styles.block}>
              <h2>Video</h2>
              <p className={styles.prose}>
                A short introduction to the chip and where it is being used.
              </p>
              <VideoBlock poster="dh-main" title="Digital Health R&D" />
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
