import { useLocation } from "react-router-dom";
import ArrowLink from "./ui/ArrowLink.tsx";
import { SUB_PAGES } from "../config/site.ts";
import styles from "./NextTopic.module.css";

/**
 * 頁尾的「下一個細項」連結（指定「每頁都要有連結，點去下一個細項」）。
 *
 * 樣式就是 RESEARCH 那顆 `Explore our technology →`（指定「那樣就好，簡單」），
 * 所以直接用同一個 ArrowLink，不另外做一條有底色的色帶。
 *
 * 也不包 <Section>：那會給它一整格的上下內距（桌機 6rem×2），
 * 一條連結佔掉一整個區塊的高度太刻意（回報「不要這麼刻意給他一大格」）。
 * 現在是靠右 ＋ 上方一條細線，像文章的「下一篇」（指定）。
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
    <div className={`container ${styles.cta}`}>
      <ArrowLink to={next.to}>
        {/* NEXT: 改成看得見（指定）。原本是唯讀文字。
            斜體下在 .cta 的連結上，整條含中文標題都斜體（指定）。 */}
        <span>Next:</span>
        <span lang="zh-Hant">{next.zh}</span>
      </ArrowLink>
    </div>
  );
}
