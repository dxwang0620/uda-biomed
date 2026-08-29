import { Dna, ScanSearch, Users } from "lucide-react";
import HeroVideo from "../components/HeroVideo.tsx";
import Button from "../components/ui/Button.tsx";
import IconCircle from "../components/ui/IconCircle.tsx";
import Section from "../components/ui/Section.tsx";
import { SITE } from "../config/site.ts";
import styles from "./Home.module.css";

/* 設計稿首頁折線下方的三欄。圖示依序為分子、放大鏡、人物群組。 */
const PILLARS = [
  { icon: Dna, label: "MOLECULAR INSIGHTS" },
  { icon: ScanSearch, label: "DETECTION RESEARCH" },
  { icon: Users, label: "CLINICAL COLLABORATION" },
];

export default function Home() {
  return (
    <>
      <HeroVideo>
        <h1 id="hero-heading" className={styles.heroTitle}>
          {SITE.tagline}
        </h1>
        <p className={styles.heroSubhead}>
          Exploring molecular and atomic-level insights to better understand the
          origins of disease.
        </p>

        {/* 深底上不能用實心藍鈕，邊界對比只有 2.03:1。見 Button.tsx。 */}
        <div className={styles.heroActions}>
          <Button to="/research" variant="onDarkSolid">
            Our research
          </Button>
          <Button to="/contact" variant="onDark">
            Contact us
          </Button>
        </div>

        <p className={styles.heroSignature}>Unveiling Dynamic Atoms</p>
      </HeroVideo>

      <Section labelledBy="pillars-heading">
        <h2 id="pillars-heading" className="visually-hidden">
          What we do
        </h2>
        <ul role="list" className={styles.pillars}>
          {PILLARS.map(({ icon: Icon, label }) => (
            <li key={label} className={styles.pillar}>
              <IconCircle>
                <Icon size={36} strokeWidth={1.5} />
              </IconCircle>
              <h3 className={styles.pillarLabel}>{label}</h3>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint">
        {/* <p>[TODO: 首頁各區塊摘要與 CTA，設計稿只畫到三欄圖示為止]</p> */}
        <p>[TODO: 首頁各區塊摘要]</p>
      </Section>
    </>
  );
}
