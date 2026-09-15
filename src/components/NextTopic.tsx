import { useLocation } from "react-router-dom";
import ArrowLink from "./ui/ArrowLink.tsx";
import Section from "./ui/Section.tsx";
import { SUB_PAGES } from "../config/site.ts";
import styles from "./NextTopic.module.css";

/**
 * 頁尾的「下一個細項」連結（指定「每頁都要有連結，點去下一個細項」）。
 *
 * 樣式就是 RESEARCH 那顆 `Explore our technology →`（指定「那樣就好，簡單」），
 * 所以直接用同一個 ArrowLink，不另外做一條有底色的色帶。
 *
 * 掛在 App 的 <main> 裡、<Routes> 之後，而不是逐頁貼一次：八個子頁分屬
 * 五個元件（三個獨立頁、兩個共用版型），逐頁貼會漏，之後新增子頁也要記得補。
 * 不在清單裡的路徑回傳 null，所以首頁與其他頁面不受影響。
 *
 * 順序見 site.ts 的 SUB_PAGES：三組串成一條線，最後一頁繞回開頭。
 */

export default function NextTopic() {
  const { pathname } = useLocation();
  const i = SUB_PAGES.findIndex((page) => page.to === pathname);

  if (i === -1) return null;

  const next = SUB_PAGES[(i + 1) % SUB_PAGES.length];

  return (
    <Section>
      {/* 連結的名稱是「Next: 下一頁的標題」。只唸標題的話，
          離開上下文就不知道它要去哪。 */}
      <div className={styles.cta}>
        <ArrowLink to={next.to}>
          <span className="visually-hidden">Next: </span>
          <span lang="zh-Hant">{next.zh}</span>
        </ArrowLink>
      </div>
    </Section>
  );
}
