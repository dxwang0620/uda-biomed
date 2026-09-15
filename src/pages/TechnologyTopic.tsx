import { Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero.tsx";
import Section from "../components/ui/Section.tsx";
import ArrowLink from "../components/ui/ArrowLink.tsx";
import { TECHNOLOGY_TOPICS } from "../config/site.ts";
import styles from "./Research.module.css";

/**
 * TECHNOLOGY 的兩個子頁（指定）。兩頁共用這一個元件，靠網址的 slug 分辨——
 * 與 ResearchTopic 同一套作法，版型相同就不複製成兩個檔案。
 *
 * ⚠️ **內文全是 `[待補]`。** 技術說明屬於 CLAUDE.md 明訂不能編的範圍：
 * 寫錯一句「我們的技術做得到什麼」，後果比版面難看嚴重得多。
 * 連這兩頁各自涵蓋什麼都需要你提供。
 *
 * 標題用中文，是你給的原話，沒有自行翻成英文。
 */

export default function TechnologyTopic() {
  const { slug } = useParams();
  const topic = TECHNOLOGY_TOPICS.find((t) => t.slug === slug);

  /* 不存在的 slug 導回 TECHNOLOGY，而不是丟 404：
     這幾個網址是站內導覽產生的，打錯多半是連結手滑或舊網址。 */
  if (!topic) return <Navigate to="/technology" replace />;

  return (
    <>
      <PageHero
        eyebrow="TECHNOLOGY"
        title={topic.zh}
        titleId="technology-topic-heading"
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
          <ArrowLink to="/technology">Back to technology</ArrowLink>
        </div>
      </Section>
    </>
  );
}
