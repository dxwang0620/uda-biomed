import { FlaskConical, Microscope, Users } from 'lucide-react'
import PageHero from '../components/PageHero.tsx'
import Card from '../components/ui/Card.tsx'
import CtaBand from '../components/ui/CtaBand.tsx'
import IconCircle from '../components/ui/IconCircle.tsx'
import Placeholder from '../components/ui/Placeholder.tsx'
import Section from '../components/ui/Section.tsx'
import styles from './Partnerships.module.css'

/* 文案來源 docs/content-partnerships.md —— 設計稿沒有這一頁，
   版面比照 RESEARCH / TECHNOLOGY 的 hero + 卡片結構。
   三種合作模式是依一般生醫公司型態擬的草稿，很可能與實際不符。 */

const MODELS = [
  {
    icon: FlaskConical,
    title: 'Research Collaboration',
    body: 'Joint investigation on a shared scientific question, with scope, contributions and publication expectations agreed at the outset.',
  },
  {
    icon: Users,
    title: 'Clinical Collaboration',
    body: 'Working with clinical groups to shape research questions around problems encountered in practice, and to interpret findings in that context.',
  },
  {
    icon: Microscope,
    title: 'Technology Collaboration',
    body: 'Applying our laboratory and analytical workflow to questions brought by external research groups.',
  },
]

const STEPS = [
  {
    title: 'Get in touch',
    body: 'Tell us the question you are working on and what you are looking for in a collaborator.',
  },
  {
    title: 'Scope the work',
    body: 'We discuss feasibility, what each side contributes, and what a useful outcome would look like.',
  },
  {
    title: 'Formalise',
    body: 'Scope, responsibilities and terms are agreed before work begins.',
  },
]

export default function Partnerships() {
  return (
    <>
      <PageHero
        eyebrow="HOW WE COLLABORATE"
        title="Partnerships"
        titleId="partnerships-heading"
        lede="Research questions worth answering rarely belong to one group alone."
      />

      <Section tone="tint" labelledBy="models-heading">
        <h2 id="models-heading">Collaboration Models</h2>
        <ul role="list" className={styles.cards}>
          {MODELS.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Card className={styles.card}>
                <IconCircle tone="tint">
                  <Icon size={32} strokeWidth={1.5} />
                </IconCircle>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardBody}>{body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="start-heading">
        <h2 id="start-heading">How to Start</h2>
        {/* 三個步驟有先後順序，用 <ol> */}
        <ol className={styles.steps}>
          {STEPS.map(({ title, body }, i) => (
            <li key={title}>
              <span className={styles.stepNumber} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.cardBody}>{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="tint">
        {/* 這一區塊法律風險最高：未經授權不能列名，也不能放 logo。 */}
        <Placeholder title="Current Partners">
          需要夥伴的正式名稱，以及對方的公開授權。未經同意不能列名，也不能放 logo。
          若合作內容受保密協議約束，連「與某醫學中心合作」這種模糊寫法都要先確認。
          在你給名單與授權之前，這裡不會有任何內容，包括示意用的假 logo。
        </Placeholder>
      </Section>

      <CtaBand
        titleId="partnerships-cta"
        title="Tell us what you are working on."
        body="If you are working on a question about disease at the molecular level, we would like to hear about it."
      />
    </>
  )
}
