import OrgChart from "../components/OrgChart.tsx";
import Responsibilities from "../components/Responsibilities.tsx";
import PageHero from "../components/PageHero.tsx";
import Card from "../components/ui/Card.tsx";
import CtaBand from "../components/ui/CtaBand.tsx";
import Placeholder from "../components/ui/Placeholder.tsx";
import Section from "../components/ui/Section.tsx";
import styles from "./About.module.css";

/* 文案來源 docs/content-about.md。
   [稿] = 設計稿既有文字；[草稿] = 待你潤稿；[待補] 一律用 <Placeholder>。 */

/* 創辦人理念。文案逐字取自 docs/founder_philosophy.txt 的英文版
   （原檔同時有中文版，站上目前是全英文，之後要做雙語再接中文段落）。
   原檔夾雜零寬空格，已清除。內容是你提供的，一字未改也未增補；
   署名照原檔就是「Founder of UDA BIOMED」，沒有人名，所以不放 placeholder。 */
const FOUNDER_LEDE =
  "The creation of UDA BIOMED wasn't due to a lack of biomedical companies in the market, but rather because I firmly believe the healthcare industry needs a different approach.";

const FOUNDER_BODY = [
  "The essence of drugs, medical devices, and testing technologies is saving lives.",
  "They can have R&D costs, reasonable profits, and should be protected by intellectual property rights; however, they shouldn't become resources affordable only to a few due to monopolies and profit-driven competition. Furthermore, a person's economic capacity shouldn't determine their opportunity for earlier disease detection, treatment, or even survival.",
  "What UDA strives for is not merely developing a product, but rethinking the distance between medical technology and people. We aim to make complex technologies more accessible in daily life, shifting disease detection from passively waiting for symptoms to earlier, more proactive, and more easily accessible methods for the general public.",
  "For me, prevention is never just a slogan. The earlier abnormalities are detected, the more time is gained for intervention; the earlier action is taken, the greater the chance of reducing the harm that disease causes to individuals and families.",
  "Therefore, UDA BIOMED has chosen to start with early cancer detection, continuously investing in the independent research and development of non-invasive biomedical testing, biosensing, and digital analysis technologies. We respect science, medical expertise, and regulations, and insist that all results must be validated. Because technologies that concern life cannot rely on imagination, nor can they gain market attention through exaggerated promises.",
  "UDA will not exploit people's fear of disease for business purposes, nor will it package incomplete research as miracles. What we aim to do is to build, step by step, truly reliable, sustainable technologies that ultimately have the potential to help more people.",
  "I am not against corporate profits. Without reasonable profits, companies cannot continue research and development, nor can they bear the responsibility of long-term investment. However, I oppose using disease as a tool for monopoly, and even more so, I oppose allowing exorbitant prices to become a barrier to life.",
  "A company's success should not only be measured by its revenue generation, but also by how many problems it solves, how much harm it reduces, and whether it brings previously unattainable technologies into people's lives.",
  "I expect the future UDA BIOMED to be not just a company with technology and products, but a company willing to take responsibility for life, be honest with science, and dare to challenge existing industry frameworks.",
  "If one day our technology allows someone to detect physical abnormalities earlier, and saves a family from the regret of not having enough time to heal, then everything UDA does will have true value.",
];

const FOUNDER_QUOTE =
  "Technology shouldn't determine who deserves to be saved, but rather give more people the opportunity to be protected.";

const FOUNDER_CLOSING =
  "This is my original intention in founding UDA BIOMED, and it's the direction we will never change.";

const FOUNDER_SIGNATURE = "Founder of UDA BIOMED";

const APPROACH = [
  {
    title: "Start at the molecular level",
    body: "We look at the changes that precede visible disease, rather than the signatures it leaves behind once established.",
  },
  {
    title: "Build methods that hold up",
    body: "A finding is only useful if it can be reproduced. Standardised handling and traceable analysis are part of the research, not overhead attached to it.",
  },
  {
    title: "Work with clinicians, not adjacent to them",
    body: "Research questions worth pursuing come from clinical practice. We develop ours in conversation with the people who see the problem first-hand.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="WHO WE ARE"
        title="About UDA BIOMED"
        titleId="about-heading"
        lede="We investigate disease through the molecular foundations of life."
        media={
          /* 設計稿的情境照。純裝飾——標題已經說完這張圖能說的事，
             所以 alt=""，不描述畫面內容。width/height 是原圖尺寸，避免 CLS。 */
          <picture>
            <source
              srcSet={`${import.meta.env.BASE_URL}media/about-hero.webp`}
              type="image/webp"
            />
            <img
              src={`${import.meta.env.BASE_URL}media/about-hero.jpg`}
              alt=""
              width={1600}
              height={900}
              fetchPriority="high"
            />
          </picture>
        }
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
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.approachTitle}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 創辦人理念。這一段是全站最長的閱讀型文字，桌機分兩欄，
          行長才不會拉到難讀。 */}
      <Section labelledBy="founder-heading">
        <div className={styles.founderHead}>
          <p className={styles.eyebrow}>FOUNDER&rsquo;S PHILOSOPHY</p>
          <h2 id="founder-heading">Founder&rsquo;s Philosophy</h2>
          <p className={styles.lede}>{FOUNDER_LEDE}</p>
        </div>

        <div className={styles.founderBody}>
          {FOUNDER_BODY.map((para) => (
            <p key={para.slice(0, 24)} className={styles.body}>
              {para}
            </p>
          ))}
        </div>

        <blockquote className={styles.founderQuote}>
          <p>{FOUNDER_QUOTE}</p>
        </blockquote>

        <p className={styles.founderClosing}>{FOUNDER_CLOSING}</p>
        <p className={styles.founderSignature}>{FOUNDER_SIGNATURE}</p>
      </Section>

      {/* 組織架構。資料在 OrgChart 元件裡，之後改組織只動那一份常數。 */}
      <Section tone="tint" labelledBy="org-heading">
        <div className={styles.founderHead}>
          <p className={styles.eyebrow}>ORGANISATION</p>
          <h2 id="org-heading">Organisational Structure</h2>
          <p className={styles.lede}>
            How responsibility is divided across governance, oversight and the
            seven operating departments.
          </p>
        </div>
        <OrgChart />
      </Section>

      {/* 職掌說明。收合式，預設全部收起——展開全部會是兩千多字。 */}
      <Section labelledBy="duties-heading">
        <div className={styles.founderHead}>
          <p className={styles.eyebrow}>DUTIES</p>
          <h2 id="duties-heading">Roles and Responsibilities</h2>
          <p className={styles.lede}>
            What each level of governance and each department is accountable
            for. Select a heading to read the detail.
          </p>
        </div>
        <Responsibilities />
      </Section>

      <Section>
        <div className={styles.todos}>
          <Placeholder title="Our Story">
            需要公司成立年份、地點、成立緣由。
          </Placeholder>
          <Placeholder title="Team">需要姓名、職稱、經歷、照片。</Placeholder>
        </div>
      </Section>

      <CtaBand
        titleId="about-cta"
        title="Let's look at it together."
        body="Our work depends on the questions other people bring us."
      />
    </>
  );
}
