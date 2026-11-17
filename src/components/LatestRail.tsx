import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./LatestRail.module.css";

/**
 * 最新消息，細線列表。
 *
 * 版型比照 spacex.com 的「Upcoming Launches」（指定）：沒有底色、沒有外框，
 * 每一筆之間只有一條細線，右側一顆箭頭，**不放圖片**（指定）。
 * 依指示在首頁取代原本那三格數字，文案是原本排在底下的 Latest News。
 *
 * ⚠️ **兩則都是草稿。** 標題與摘要刻意不含任何成果、數據、期別或時程——
 * 那些是 CLAUDE.md 明訂不能編的。日期同樣是排版用的假值，上線前要換成真的。
 */

type Item = {
  category: string;
  date: string;
  title: string;
  /** 去向。兩則都指向已經存在的內頁。 */
  to: string;
};

const ITEMS: Item[] = [
  {
    category: "Research",
    date: "02 Sep 2026",
    title: "Cancer detection research: where the work currently stands",
    to: "/research/disease-basis",
  },
  {
    category: "Technology",
    date: "19 Aug 2026",
    title: "AFL System: turning scent into data that can be understood",
    to: "/research/digital-health",
  },
];

export default function LatestRail() {
  return (
    <div className={styles.wrap}>
      {/* 標題排在兩則前面（指定）。規格比照參考版的 section title：
          小字、字距、全大寫，上方一條細線。 */}
      <h2 id="latest-news-heading" className={styles.heading}>
        Latest News
      </h2>

      <ul className={styles.list} aria-labelledby="latest-news-heading">
        {ITEMS.map((item) => (
          <li key={item.title} className={styles.item}>
            <Link to={item.to} className={styles.link}>
              <span className={styles.text}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.meta}>
                  {item.category}
                  <span className={styles.dot} aria-hidden="true">
                    ·
                  </span>
                  {item.date}
                </span>
              </span>

              <ArrowRight
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                className={styles.arrow}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
