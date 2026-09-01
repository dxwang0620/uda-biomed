import { Dna, ScanSearch, Users } from "lucide-react";
import PageHero from "../components/PageHero.tsx";
import ArrowLink from "../components/ui/ArrowLink.tsx";
import Card from "../components/ui/Card.tsx";
import IconCircle from "../components/ui/IconCircle.tsx";
import Placeholder from "../components/ui/Placeholder.tsx";
import Section from "../components/ui/Section.tsx";
import styles from "./Research.module.css";

/* 文案來源 docs/content-research.md */

const FOCUS = [
  {
    icon: Dna,
    title: "Molecular Insights",
    body: "Investigating molecular changes that may contribute to disease.",
    detail:
      "Disease begins as a change in molecular behaviour long before it becomes measurable by conventional means. We study how those changes arise, how they propagate, and which of them carry enough signal to be worth detecting.",
  },
  {
    icon: ScanSearch,
    title: "Cancer Detection Research",
    body: "Exploring analytical approaches for earlier and more precise detection.",
    detail:
      "Earlier detection is not only a matter of looking sooner — it is a matter of distinguishing a real signal from ordinary biological variation. Our research examines analytical approaches that aim to make that distinction more reliable.",
  },
  {
    icon: Users,
    title: "Clinical Collaboration",
    body: "Working with research and clinical partners to translate scientific questions.",
    detail:
      "A laboratory result becomes meaningful when it answers a question someone actually has. We shape our research alongside clinical and academic partners so that what we investigate stays connected to what is needed.",
  },
];

export default function Research() {
  return (
    <>
      <PageHero
        eyebrow="OUR RESEARCH"
        title="Researching Disease at Its Foundations"
        titleId="research-heading"
        lede="Connecting molecular investigation, analytical methods and collaborative research."
        focal="center"
        media={
          /* web_img/research 的情境照。純裝飾——標題已經說完這張圖能說的事，
             所以 alt=""，不描述畫面內容。width/height 是原圖尺寸，避免 CLS。
             focal 用 center：這是室內走廊照，主體在中段，
             沿用 ABOUT 的 right 25% 會讓天花板佔掉一半畫面。 */
          <picture>
            <source
              srcSet={`${import.meta.env.BASE_URL}media/research-hero.webp`}
              type="image/webp"
            />
            <img
              src={`${import.meta.env.BASE_URL}media/research-hero.jpg`}
              alt=""
              width={1672}
              height={941}
              fetchPriority="high"
            />
          </picture>
        }
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
            作者、標題、期刊或會議、年份、DOI 或連結。
          </Placeholder>
          <Placeholder title="Clinical Progress">
            試驗期別（Phase I / II / III）
          </Placeholder>
        </div>
      </Section>
    </>
  );
}
