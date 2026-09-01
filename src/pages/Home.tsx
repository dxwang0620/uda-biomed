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

/* 最新消息。
   標題是草稿、日期一律不填——「某日發生某事」是事實主張，依 CLAUDE.md
   工作方式第 3 條不編造。日期欄位保持 To add 的虛線標記，讓這一列不可能
   被當成正式內容送上線。你給實際消息後，把 draft 拿掉、date 填上即可。 */
const NEWS = [
  { date: null, title: 'Research direction update for cancer-detection technology', draft: true },
  { date: null, title: 'UDA Biochip platform development progress', draft: true },
  { date: null, title: 'Academic and industry collaboration announcement', draft: true },
]

/* 董事長談話草稿。
   這一段是理念陳述，不是事實主張，所以可以擬——但刻意不含任何成果、
   數據、時程、獎項或合作對象。署名待你提供，不自行填人名。 */
const CHAIRMAN_MESSAGE = [
  'Our work begins with a simple conviction: that the earliest changes of disease are written in the molecules of the body, long before anything becomes visible. Reading them is difficult, and we do not pretend otherwise.',
  'What we can commit to is discipline. Every question we pursue has to be answerable. Every method we build has to be reproducible by someone other than ourselves. Every result we report has to survive the scrutiny of clinicians who see patients rather than data.',
  'Patience is not the opposite of urgency. Detection research rewards those willing to build carefully and verify repeatedly — and that is the company we intend to be, for our team and for anyone who shares the goal.',
]

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

      {/* 兩個對等的 h2，用其中之一當 section 名稱會誤導，故不設 labelledBy。 */}
      <Section tone="translucent">
        <div className={styles.split}>
          <div className={styles.newsBlock}>
            <h2 id="news-heading" className={styles.blockTitle}>
              Latest News
            </h2>

            <ol className={styles.newsList}>
              {NEWS.map(({ date, title, draft }) => (
                <li key={title} className={styles.newsItem}>
                  <span className={styles.newsDate}>
                    {date ?? <span className={styles.pendingInline}>To add</span>}
                  </span>
                  <span className={styles.newsTitle}>
                    {title}
                    {draft && (
                      <span className={styles.draftChip}>Draft</span>
                    )}
                  </span>
                </li>
              ))}
            </ol>

            <p className={styles.draftNote}>
              Headlines above are drafts written to show the layout. Dates are
              deliberately unfilled — send the real items and both come off in
              one edit. No news page exists yet, so there is no link out.
            </p>
          </div>

          <blockquote className={`${styles.card} ${styles.chairman}`}>
            <h2 id="chairman-heading" className={styles.blockTitle}>
              Message from the Chairman
            </h2>

            {CHAIRMAN_MESSAGE.map((para) => (
              <p key={para.slice(0, 24)} className={styles.quote}>
                {para}
              </p>
            ))}

            <footer className={styles.signature}>
              <span className={styles.pendingInline}>To add: name</span>
              <span className={styles.role}>Chairman, UDA BIOMED</span>
            </footer>
          </blockquote>
        </div>
      </Section>

      <Section tone="translucent" labelledBy="focus-heading">
        <div className={styles.intro}>
          <p className={styles.eyebrow}>CURRENT R&amp;D FOCUS</p>
          <h2 id="focus-heading" className={styles.sectionTitle}>
            From cancer research to detection technology, building a continuously
            validated R&amp;D pathway
          </h2>
          <p className={styles.lede}>
            UDA maintains broad cross-disciplinary exploration, while its current
            public R&amp;D and industry focus is cancer detection technology. We
            connect cancer biology, life-signal research and structural science
            with recognition, validation, intellectual property and translational
            development.
          </p>
        </div>

        <ul role="list" className={styles.cards}>
          {FOCUS.map(({ icon: Icon, title, body, tags }) => (
            <li key={title}>
              <Card className={styles.card}>
                <IconCircle tone="tint">
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

        <p className={`${styles.note} ${styles.intro}`}>
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
        <div className={styles.intro}>
        {/* 參考影片只拍到「… verifiable technology platform」，
            前半段是依上下文擬的草稿，見 docs/content-home.md */}
        <h2 id="platform-heading" className={styles.sectionTitle}>
          Building a verifiable technology platform
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
        </div>

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
        <div className={styles.intro}>
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
        </div>
        <ul role="list" className={styles.tagRow}>
          {POSITIONING_TAGS.map((tag) => (
            <li key={tag} className={styles.tagLarge}>
              {tag}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="translucent" labelledBy="responsibility-heading">
        <div className={styles.intro}>
          <p className={styles.eyebrow}>CORPORATE RESPONSIBILITY</p>
          <h2 id="responsibility-heading" className={styles.sectionTitle}>
            Protecting every life through responsibility
          </h2>
          <p className={styles.lede}>
            UDA builds long-term trust through scientific integrity, privacy
            governance and respect for life, advancing R&amp;D value alongside
            social responsibility.
          </p>
        </div>

        <div className={styles.todos}>
          <Placeholder title="R&D Portfolio Snapshot">
            Three headline figures with a disclaimer. The figures were not read
            off a handheld recording; supply them, or drop this block.
          </Placeholder>
          <Placeholder title="Corporate Responsibility — sub-items">
            Sub-headings such as Science, Data &amp; Life sit under this section
            in the reference but could not be read in full.
          </Placeholder>
        </div>
      </Section>
    </>
  )
}
