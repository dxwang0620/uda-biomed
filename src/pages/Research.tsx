import { Dna, ScanSearch, Users } from 'lucide-react'
import Card from '../components/ui/Card.tsx'
import IconCircle from '../components/ui/IconCircle.tsx'
import Section from '../components/ui/Section.tsx'
import styles from './Research.module.css'

/* 文案取自設計稿，見 docs/content-research.md 標為 [稿] 的段落 */
const FOCUS = [
  {
    icon: Dna,
    title: 'Molecular Insights',
    body: 'Investigating molecular changes that may contribute to disease.',
  },
  {
    icon: ScanSearch,
    title: 'Cancer Detection Research',
    body: 'Exploring analytical approaches for earlier and more precise detection.',
  },
  {
    icon: Users,
    title: 'Clinical Collaboration',
    body: 'Working with research and clinical partners to translate scientific questions.',
  },
]

export default function Research() {
  return (
    <>
      <Section labelledBy="research-heading">
        <p className={styles.eyebrow}>OUR RESEARCH</p>
        <h1 id="research-heading">Researching Disease at Its Foundations</h1>
        <p className={styles.lede}>
          Connecting molecular investigation, analytical methods and
          collaborative research.
        </p>
      </Section>

      <Section tone="tint" labelledBy="focus-heading">
        <h2 id="focus-heading">Research Focus</h2>
        <ul role="list" className={styles.cards}>
          {FOCUS.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Card className={styles.card}>
                <IconCircle tone="tint">
                  <Icon size={32} strokeWidth={1.5} />
                </IconCircle>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p>{body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        {/* 絕對不要在這裡編造內容。見 CLAUDE.md 工作方式第 3 條。 */}
        <p>[TODO: 發表 —— 需要真實的論文清單，不編造]</p>
        <p>[TODO: 臨床進展 —— 需要你確認可公開的階段敘述，不編造試驗期別]</p>
      </Section>
    </>
  )
}
