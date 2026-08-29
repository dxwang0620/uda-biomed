import { ArrowRight, Cpu, TestTube, Workflow } from 'lucide-react'
import PageHero from '../components/PageHero.tsx'
import ArrowLink from '../components/ui/ArrowLink.tsx'
import Card from '../components/ui/Card.tsx'
import IconCircle from '../components/ui/IconCircle.tsx'
import Placeholder from '../components/ui/Placeholder.tsx'
import Section from '../components/ui/Section.tsx'
import styles from './Technology.module.css'

/* 文案來源 docs/content-technology.md */

const STEPS = [
  {
    icon: TestTube,
    title: 'Sample Preparation',
    body: 'Controlled handling and standardized molecular workflows.',
    detail:
      'Everything downstream inherits the quality of this step. Samples are handled under defined conditions so that what reaches analysis reflects the biology rather than the handling.',
  },
  {
    icon: Cpu,
    title: 'Automated Analysis',
    body: 'Instrument-supported processing designed for consistency and traceability.',
    detail:
      'Automation here is about repeatability rather than throughput. Consistent execution means a difference between two results can be attributed to the samples instead of to the run.',
  },
  {
    icon: Workflow,
    title: 'Data Interpretation',
    body: 'Structured analysis supporting research questions and collaboration.',
    detail:
      'Analysis is structured so that a result can be traced back to the conditions that produced it, and so that collaborators can examine the reasoning rather than only the conclusion.',
  },
]

export default function Technology() {
  return (
    <>
      <PageHero
        eyebrow="OUR TECHNOLOGY"
        title="From Sample to Scientific Insight"
        titleId="tech-heading"
        lede="An integrated research workflow connecting laboratory processes, analytical systems and data interpretation."
      />

      <Section tone="tint" labelledBy="workflow-heading">
        <h2 id="workflow-heading">Integrated Research Workflow</h2>
        {/* 有序清單：這三步是流程，順序有意義，不能用 <ul> */}
        <ol className={styles.steps}>
          {STEPS.map(({ icon: Icon, title, body, detail }, i) => (
            <li key={title} className={styles.step}>
              <Card className={styles.card}>
                <IconCircle tone="tint">
                  <Icon size={32} strokeWidth={1.5} />
                </IconCircle>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardLede}>{body}</p>
                <p className={styles.cardDetail}>{detail}</p>
              </Card>
              {/* 箭頭純裝飾，順序已由 <ol> 表達 */}
              {i < STEPS.length - 1 && (
                <ArrowRight
                  className={styles.arrow}
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
        <div className={styles.sectionCta}>
          <ArrowLink to="/contact">Discuss a research collaboration</ArrowLink>
        </div>
      </Section>

      <Section labelledBy="why-heading">
        <h2 id="why-heading">Why It Is Built This Way</h2>
        <p className={styles.prose}>
          The three stages are treated as one system rather than three handoffs.
          A constraint in analysis changes how a sample should be prepared; an
          ambiguity in interpretation sends a question back upstream. Keeping
          them connected is what makes a result reproducible outside the run
          that produced it.
        </p>
      </Section>

      <Section tone="tint">
        <div className={styles.todos}>
          <Placeholder title="Platform Specifications">
            需要儀器型號與廠牌、自研平台名稱與能力範圍、通量／解析度／偵測極限等數字、
            以及認證或標準（ISO、CLIA、GLP 等）。未取得的認證絕對不能寫。
            若屬不公開資訊，這一區塊就不做——上面的流程敘述已足以撐起這一頁。
          </Placeholder>
          <Placeholder title="Intellectual Property">
            專利、申請中專利、技術授權都需要真實狀態。
            「專利申請中」也是有法律意義的措辭，不能隨手加。
          </Placeholder>
        </div>
      </Section>
    </>
  )
}
