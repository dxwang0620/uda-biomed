import { Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero.tsx";
import Section from "../components/ui/Section.tsx";
import ArrowLink from "../components/ui/ArrowLink.tsx";
import { RESEARCH_TOPICS } from "../config/site.ts";
import styles from "./Research.module.css";

/**
 * RESEARCH 的三個子頁（指定）。三頁共用這一個元件，靠網址的 slug 分辨——
 * 版型完全相同，複製成三個檔案只會讓之後改版型要改三次。
 *
 * ⚠️ **內文全是 `[待補]`。** 這是研究方向的敘述，屬於 CLAUDE.md 明訂不能編的
 * 範圍；連「我們正在研究什麼」都需要你提供，見 docs/content-research.md。
 *
 * 標題用中文，是你給的原話，沒有自行翻成英文。
 */

export default function ResearchTopic() {
  const { slug } = useParams();
  const topic = RESEARCH_TOPICS.find((t) => t.slug === slug);

  /* 不存在的 slug 導回 RESEARCH，而不是丟 404：
     這幾個網址是站內導覽產生的，打錯多半是連結手滑或舊網址。 */
  if (!topic) return <Navigate to="/research" replace />;

  return (
    <>
      <PageHero
        eyebrow="RESEARCH"
        title={topic.zh}
        titleId="research-topic-heading"
        lede={`[待補：${topic.zh}]`}
      />

      <Section labelledBy="topic-body-heading">
        <h2 id="topic-body-heading" lang="zh-Hant">
          {topic.zh}
        </h2>
        <p className={styles.prose} lang="zh-Hant">
          [待補：{topic.zh}的內容]
        </p>

        <div className={styles.sectionCta}>
          <ArrowLink to="/research">Back to research</ArrowLink>
        </div>
      </Section>
    </>
  );
}
