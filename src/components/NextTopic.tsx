import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SUB_PAGES } from "../config/site.ts";
import styles from "./NextTopic.module.css";

/**
 * 頁尾的「下一個細項」連結（指定「每頁都要有連結，點去下一個細項」）。
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
    /* aria-label 讓讀屏在區塊清單裡分得出這一塊是什麼。
       連結的名稱是「Next: 下一頁的標題」——只唸標題的話，
       離開上下文就不知道它要去哪。 */
    <nav className={styles.band} aria-label="Next topic">
      <div className={`container ${styles.inner}`}>
        <p className={styles.label}>Next</p>
        <Link to={next.to} className={styles.link} lang="zh-Hant">
          <span className={styles.title}>{next.zh}</span>
          <ArrowRight
            size={20}
            strokeWidth={2}
            aria-hidden="true"
            className={styles.arrow}
          />
        </Link>
      </div>
    </nav>
  );
}
