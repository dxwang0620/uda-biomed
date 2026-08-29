import { Dna, ScanSearch, Users } from 'lucide-react'
import PageHero from '../components/PageHero.tsx'
import ArrowLink from '../components/ui/ArrowLink.tsx'
import Card from '../components/ui/Card.tsx'
import IconCircle from '../components/ui/IconCircle.tsx'
import Placeholder from '../components/ui/Placeholder.tsx'
import Section from '../components/ui/Section.tsx'
import styles from './Research.module.css'

/* 文案來源 docs/content-research.md */

const FOCUS = [
  {
    icon: Dna,
    title: 'Molecular Insights',
    body: 'Investigating molecular changes that may contribute to disease.',
    detail:
      'Disease begins as a change in molecular behaviour long before it becomes measurable by conventional means. We study how those changes arise, how they propagate, and which of them carry enough signal to be worth detecting.',
  },
  {
    icon: ScanSearch,
    title: 'Cancer Detection Research',
    body: 'Exploring analytical approaches for earlier and more precise detection.',
    detail:
      'Earlier detection is not only a matter of looking sooner — it is a matter of distinguishing a real signal from ordinary biological variation. Our research examines analytical approaches that aim to make that distinction more reliable.',
  },
  {
    icon: Users,
    title: 'Clinical Collaboration',
    body: 'Working with research and clinical partners to translate scientific questions.',
    detail:
      'A laboratory result becomes meaningful when it answers a question someone actually has. We shape our research alongside clinical and academic partners so that what we investigate stays connected to what is needed.',
  },
]

export default function Research() {
  return (
    <>
      <PageHero
        eyebrow="OUR RESEARCH"
        title="Researching Disease at Its Foundations"
        titleId="research-heading"
        lede="Connecting molecular investigation, analytical methods and collaborative research."
      />

      <Section tone="tint" labelledBy="focus-heading">
        <h2 id="focus-heading">Research Focus</h2>
        <ul role="list" className={styles.cards}>
          {FOCUS.map(({ icon: Icon, title, body, detail }) => (
            <li key={title}>
              <Card className={styles.card}>
                <IconCircle tone="tint">
                  <Icon size={32} strokeWidth={1.5} />
                </IconCircle>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardLede}>{body}</p>
                <p className={styles.cardDetail}>{detail}</p>
              </Card>
            </li>
          ))}
        </ul>
        <div className={styles.sectionCta}>
          <ArrowLink to="/technology">Explore our technology</ArrowLink>
        </div>
      </Section>

      <Section labelledBy="how-heading">
        <h2 id="how-heading">How We Work</h2>
        <p className={styles.prose}>
          Our research is iterative rather than linear. A question from a
          clinical partner shapes a molecular investigation; the analytical
          constraints of that investigation shape what can be asked next. We
          document each step so that a result can be traced back to the
          conditions that produced it.
        </p>
      </Section>

      <Section tone="tint">
        {/* 絕對不編造。見 CLAUDE.md 工作方式第 3 條。 */}
        <div className={styles.todos}>
          <Placeholder title="Publications">
            需要真實清單，每筆包含作者、標題、期刊或會議、年份、DOI 或連結。
            沒有發表就不做這一區塊，比放假的好。
          </Placeholder>
          <Placeholder title="Clinical Progress">
            風險最高的一區。試驗期別（Phase I / II / III）不能推測或近似；
            「臨床驗證中」「已進入試驗」都有法規意涵。若目前僅為研究階段、
            尚未進入任何臨床試驗，直接這樣寫最安全。等你給明確說法。
          </Placeholder>
        </div>
      </Section>
    </>
  )
}
