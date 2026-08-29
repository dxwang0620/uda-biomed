import PageHero from '../components/PageHero.tsx'
import Card from '../components/ui/Card.tsx'
import Placeholder from '../components/ui/Placeholder.tsx'
import Section from '../components/ui/Section.tsx'
import styles from './About.module.css'

/* 文案來源 docs/content-about.md。
   [稿] = 設計稿既有文字；[草稿] = 待你潤稿；[待補] 一律用 <Placeholder>。 */

const APPROACH = [
  {
    title: 'Start at the molecular level',
    body: 'We look at the changes that precede visible disease, rather than the signatures it leaves behind once established.',
  },
  {
    title: 'Build methods that hold up',
    body: 'A finding is only useful if it can be reproduced. Standardised handling and traceable analysis are part of the research, not overhead attached to it.',
  },
  {
    title: 'Work with clinicians, not adjacent to them',
    body: 'Research questions worth pursuing come from clinical practice. We develop ours in conversation with the people who see the problem first-hand.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="WHO WE ARE"
        title="About UDA BIOMED"
        titleId="about-heading"
        lede="We investigate disease through the molecular foundations of life."
      />

      {/* 設計稿：左欄 Our Purpose 文字，右欄 Our Perspective 白卡。
          這一區有兩個對等的 h2，用其中之一當 section 名稱會誤導，故不設 labelledBy。 */}
      <Section>
        <div className={styles.split}>
          <div>
            <h2 id="purpose-heading">Our Purpose</h2>
            <p className={styles.lede}>
              UDA BIOMED advances cancer detection research by connecting
              molecular investigation, analytical technology and clinical
              collaboration.
            </p>
            <p className={styles.body}>
              Cancer rarely announces itself. By the time it becomes visible to
              conventional methods, the biology that produced it has already
              been in motion for a long time. Our work begins earlier than that
              — at the level where those changes first take shape.
            </p>
          </div>

          <Card className={styles.perspective}>
            <h2 id="perspective-heading">Our Perspective</h2>
            <p className={styles.body}>
              Life is built from atoms. Understanding change at its foundations
              may reveal new paths for detecting disease.
            </p>
            <p className={styles.body}>
              We treat detection as a question of resolution. The earlier a
              molecular change can be observed and interpreted with confidence,
              the more room there is for research — and eventually for clinical
              decisions — to respond to it.
            </p>
            <p className={styles.signature}>Unveiling Dynamic Atoms</p>
          </Card>
        </div>
      </Section>

      <Section tone="tint" labelledBy="approach-heading">
        <h2 id="approach-heading">Our Approach</h2>
        <p className={styles.lede}>Three commitments shape how we work.</p>
        <ol className={styles.approach}>
          {APPROACH.map(({ title, body }, i) => (
            <li key={title}>
              <span className={styles.approachNumber} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.approachTitle}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className={styles.todos}>
          <Placeholder title="Our Story">
            需要公司成立年份、地點、成立緣由。這些是可查證的事實，不編造。
          </Placeholder>
          <Placeholder title="Team">
            需要姓名、職稱、經歷、照片。在你給名單之前，這裡不會出現任何人名。
            若暫時不公開個別成員，可改放團隊組成概述，但需要你先說明實際組成。
          </Placeholder>
        </div>
      </Section>
    </>
  )
}
