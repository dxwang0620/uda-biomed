import { Dna, Microscope, Share2 } from 'lucide-react'
import HeroCarousel from '../components/HeroCarousel.tsx'
import HeroVideo from '../components/HeroVideo.tsx'
import Card from '../components/ui/Card.tsx'
import IconCircle from '../components/ui/IconCircle.tsx'
import Placeholder from '../components/ui/Placeholder.tsx'
import Section from '../components/ui/Section.tsx'
import styles from './Home.module.css'

/* 版面與文案依 index_video 參考影片重建，逐字內容見 docs/content-home.md。
   標 [抄錄] 的是從錄影讀出、待你校對；日期與數字一律不抄，走 <Placeholder>。 */

const FOCUS = [
  {
    icon: Microscope,
    title: 'Cancer Research & Detection Technology',
    body: 'Studies cancer-related biological signals, background interference, recognition and detection applications in the context of cancer biology and disease heterogeneity.',
    tags: ['Cancer Biology', 'Detection Research', 'Molecular Recognition'],
  },
  {
    icon: Dna,
    title: 'UDA Biochip Technology',
    body: 'Integrates molecular recognition, material interfaces, biosensing, microscale engineering and data analysis into a miniaturized platform for life-signal research and cancer-detection applications.',
    tags: ['Molecular Recognition', 'Sensing Integration', 'Platform Translation'],
  },
  {
    icon: Share2,
    title: 'Proto-Structural Biology',
    body: "UDA's original R&D framework for integrating structural biology, molecular biophysics and life-signal research from atomic and molecular structure to cellular state.",
    tags: ['Structural Research', 'Molecular Dynamics', 'UDA R&D Framework'],
  },
]

const PLATFORM = [
  {
    title: 'Scientific Foundation',
    body: 'Builds testable research questions from established cancer biology and detection science.',
  },
  {
    title: 'Validated',
    body: 'Accumulates evidence through reproducibility, stability, interference assessment and analytical performance.',
  },
  {
    title: 'Translatable',
    body: 'Connects IP, co-development and industry collaboration according to R&D maturity.',
  },
]

const PLATFORM_PILLS = [
  {
    title: 'Interference Control',
    body: 'Assessing background variation and potential interference',
  },
  {
    title: 'Recognition Interface',
    body: 'Building measurable and comparable recognition conditions',
  },
  {
    title: 'Translation & IP',
    body: 'Connecting IP, co-development and industry collaboration',
  },
]

const POSITIONING_TAGS = [
  'Cancer Detection Technology',
  'Cancer Research',
  'Proto-Structural Biology',
  'Cross-Disciplinary R&D',
  'Intellectual Property',
  'Industry Collaboration',
]

export default function Home() {
  return (
    <>
      <HeroVideo>
        <HeroCarousel />
      </HeroVideo>

      <Section tone="translucent" labelledBy="focus-heading">
        <p className={styles.eyebrow}>CURRENT R&amp;D FOCUS</p>
        <h2 id="focus-heading" className={styles.sectionTitle}>
          From cancer research to detection technology, building a continuously
          validated R&amp;D pathway
        </h2>
        <p className={styles.lede}>
          UDA maintains broad cross-disciplinary exploration, while its current
          public R&amp;D and industry focus is cancer detection technology. We
          connect cancer biology, life-signal research and structural science with
          recognition, validation, intellectual property and translational
          development.
        </p>

        <ul role="list" className={styles.cards}>
          {FOCUS.map(({ icon: Icon, title, body, tags }) => (
            <li key={title}>
              <Card className={styles.card}>
                <IconCircle tone="glass">
                  <Icon size={28} strokeWidth={1.5} />
                </IconCircle>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardBody}>{body}</p>
                <ul role="list" className={styles.tags}>
                  {tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          R&amp;D can be broad, while market strategy must remain focused. UDA
          currently starts with cancer detection; animal oncology, advanced
          molecules, signal analysis, animal health and other cross-disciplinary
          topics remain in R&amp;D. Focus does not mean expanding every market
          direction at once; today we concentrate resources on cancer-detection
          technology while converting broader research into technical reserves and
          future innovation capacity.
        </p>
      </Section>

      <Section tone="translucent" labelledBy="platform-heading">
        <h2 id="platform-heading" className={styles.sectionTitle}>
          {/* 參考影片只拍到標題後半段 */}
          <span className={styles.pendingInline}>[待補：標題前半]</span> verifiable
          technology platform
        </h2>
        <p className={styles.lede}>
          UDA Biochip Technology integrates molecular recognition, material
          interfaces, biosensing, microscale engineering, signal transduction and
          data analysis as a key platform for life-signal research and
          cancer-detection technology. Our focus is not only on acquiring signals,
          but also on whether they can be recognized, compared, validated and
          progressively translated into results with application potential. Core
          designs, material structures, recognition mechanisms and final product
          form are disclosed progressively in line with R&amp;D and
          intellectual-property strategy.
        </p>

        <ul role="list" className={styles.pills}>
          {PLATFORM_PILLS.map(({ title, body }) => (
            <li key={title} className={styles.pill}>
              <strong className={styles.pillTitle}>{title}</strong>
              <span className={styles.pillBody}>{body}</span>
            </li>
          ))}
        </ul>

        <ul role="list" className={styles.cards}>
          {PLATFORM.map(({ title, body }) => (
            <li key={title}>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardBody}>{body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="translucent" labelledBy="positioning-heading">
        <h2 id="positioning-heading" className={styles.sectionTitle}>
          UDA BIOMED core positioning
        </h2>
        <p className={styles.lede}>
          UDA BIOMED is a biomedical technology company centered on
          innovation-driven R&amp;D. Its current public focus is cancer research and
          detection technology, supported by UDA Biochip Technology as a key
          platform; Proto-Structural Biology serves as one of UDA&rsquo;s original
          frameworks for integrating structural biology, molecular biophysics,
          biochemistry, materials science and life-signal research. UDA emphasizes
          validation, intellectual property and translational development so that
          technology can progress from concepts and data toward co-development and
          licensing partnerships.
        </p>
        <ul role="list" className={styles.tagRow}>
          {POSITIONING_TAGS.map((tag) => (
            <li key={tag} className={styles.tagLarge}>
              {tag}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="translucent">
        <div className={styles.todos}>
          <Placeholder title="UDA Announcements ／ UDA Updates">
            兩組「日期 + 標題」列表，含 Previous／Next 分頁。
            參考影片裡的日期字級小又有摩爾紋，抄錯一個數字就是錯誤資訊，我不抄。
            需要你提供真實的日期與標題。
          </Placeholder>
          <Placeholder title="R&D Portfolio Snapshot">
            參考網站有三個大數字與一段免責說明。
            數字我不從晃動的錄影裡讀，需要你提供，或直接不做這一區塊。
          </Placeholder>
          <Placeholder title="Corporate Responsibility">
            標題為「Protecting Every Life Through Responsibility」，
            底下有 Science, Data &amp; Life 等子項，影片中讀不完整。
          </Placeholder>
        </div>
      </Section>
    </>
  )
}
