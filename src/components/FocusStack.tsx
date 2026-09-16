import { useCallback, useEffect, useRef } from "react";
import styles from "./FocusStack.module.css";

/**
 * 研發重點三張卡，橫向滑動。
 *
 * 版型與文案依 `index_img/card1.jpg`～`card3.jpg`：編號＋眉標、大標、內文、
 * 膠囊標籤，每張卡自己的底色（色值從稿上取樣，見下方 TONE）。
 *
 * **文案是中文（指定）。** 逐字抄自那三張稿，不是翻譯。全站其餘部分目前是
 * 英文為主，這一區塊是例外。
 *
 * 照片（`card1-1`～`card3-1`）鋪滿整張卡，上面壓一層該卡色票的遮罩，
 * 文字再壓在遮罩上——與內頁 hero 同一套語彙。
 *
 * 底下有一條進度軌：線串起三個圓點、每顆底下掛該張卡的標題，往右滑時
 * 主色由左往右延伸，走過的圓點留住主色。版型參考 UDA 現有站 founder-message
 * 頁的 `.uda-letter-rail`（那邊是直的、對應閱讀章節）。
 */

type Card = {
  /** 稿上的編號，01 / 02 / 03 */
  index: string;
  title: string;
  body: string;
  tags: string[];
  /** public/media/ 下的檔名（不含副檔名），jpg 與 webp 各一份 */
  image: string;
  width: number;
  height: number;
  /** 照片內容，給 alt 用 */
  alt: string;
};

/* 卡片底色。取樣自 index_img/card1.jpg～card3.jpg 的實際像素，不是自行配色。
   02 的 #313b87 偏靛紫，嚴格說在專案的藍白色系之外，但那是設計稿上的值。 */
const TONE = ["tone1", "tone2", "tone3"] as const;

const CARDS: Card[] = [
  {
    index: "01",
    title: "癌症研究與檢測技術",
    body: "從癌症生物學與疾病異質性出發，研究癌症相關生命訊號、背景干擾、辨識與檢測應用之間的關係。",
    tags: ["癌症生物學", "檢測研究", "分子辨識"],
    image: "focus-1",
    width: 1102,
    height: 884,
    alt: "UDA BIOMED 檢體運送冷鏈箱、採樣管與條碼掃描器，放在實驗室檯面上。",
  },
  {
    index: "02",
    title: "UDA 生物晶片技術",
    body: "整合分子辨識、材料介面、生物感測、微型工程與資料分析，建立生命訊號研究與癌症檢測應用的微型化技術平台。",
    tags: ["分子辨識", "感測整合", "平台轉譯"],
    image: "focus-2",
    width: 1400,
    height: 934,
    alt: "移液器將液滴滴入 UDA BIOMED 微孔盤，畫面標註分子辨識、生物感測、材料介面、微型工程與資料分析。",
  },
  {
    index: "03",
    title: "原構生物學",
    body: "從原子與分子結構到細胞狀態，作為 UDA 整合結構生物學、分子生物物理與生命訊號研究的原創研發框架。",
    tags: ["結構研究", "分子動態", "UDA研發框架"],
    image: "focus-3",
    width: 1079,
    height: 866,
    alt: "UDA BIOMED 研究採樣套組：採樣管、採樣棒、說明卡與防拆回郵袋。",
  },
];

/* 釘住捲動的條件，與 FocusStack.module.css 最後那段 media query 一字不差。
   兩邊必須一致：CSS 決定版面釘不釘住，這裡決定進度怎麼算，
   對不上就會變成「版面釘住了但卡片不動」或反過來。 */
const PIN_QUERY =
  "(prefers-reduced-motion: no-preference) and (min-width: 768px)";

const pinMedia = () => window.matchMedia(PIN_QUERY);

export default function FocusStack() {
  const base = import.meta.env.BASE_URL;
  const viewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  /* 把捲動進度寫成 CSS 變數 --p（0～1），主色線段的寬度直接吃它。

     刻意**不走 React state**：捲動時每幀 setState 會讓整個元件重繪，
     三張卡連照片一起重算，行動裝置上會頓。直接寫 DOM 的 style 與 dataset
     只動這一個節點。 */
  const sync = useCallback(() => {
    const vp = viewport.current;
    const el = rail.current;
    const box = pin.current;
    if (!vp || !el || !box) return;

    /* 進度有兩個來源，看這個寬度有沒有釘住捲動：

       釘住（桌機）：區塊自己高 300vh、內層 sticky，進度＝「多出來的那段
       高度走了多少」。用 pin 的 top 而不是 window.scrollY，不必再算一次
       元素在文件裡的絕對位置，前面的內容長高了也不會失準。

       沒釘住（手機、或使用者要求減少動態）：維持原本的橫向捲動比例。 */
    let p: number;

    if (pinMedia().matches) {
      const travel = box.offsetHeight - window.innerHeight;
      const passed = -box.getBoundingClientRect().top;
      p = travel > 0 ? Math.min(Math.max(passed / travel, 0), 1) : 0;
    } else {
      const max = vp.scrollWidth - vp.clientWidth;
      const raw = max > 0 ? vp.scrollLeft / max : 0;
      /* 捲到底時直接視為 1。scrollLeft 幾乎不會剛好等於 max——
         裝置像素比與慣性收尾都會差零點幾 px，藍線會永遠停在 99.x%。 */
      p = vp.scrollLeft >= max - 1 ? 1 : raw;
    }

    /* 寫在 .pin 上：卡片列的位移與進度線靠繼承讀到同一個值。
       寫在 .progress 上的話卡片列讀不到——它們是兄弟，不是祖孫。 */
    box.style.setProperty("--p", String(p));

    /* 圓點在「藍線走到它」的那一刻才亮，跟線用同一個依據。

       先前用的是「哪一張卡目前佔畫面最多」，那是為了有露邊的版型：
       第三張卡佔滿畫面時捲動比例只有七、八成，用比例判斷圓點會太晚亮。
       改成一次只顯示一張之後，每張卡剛好落在捲動範圍的 0 / 50% / 100%，
       那個補償不再需要——留著反而讓圓點在兩張卡的中點就先變色，
       線還沒走到（回報「線還沒到圓點就變藍」）。

       還沒開始滑（p 為 0）時維持 0 顆，三顆都是白的（指定）。
       1e-3 是浮點與次像素的緩衝，否則 p 停在 0.4999 時中間那顆不會亮。 */
    const reached =
      p <= 0
        ? 0
        : CARDS.filter((_, i) => p + 1e-3 >= i / (CARDS.length - 1)).length;
    el.dataset.reached = String(reached);
  }, []);

  /* 直接在 scroll 事件裡更新，不做 rAF 節流。

     原本是「先設一個 frame 旗標、等 rAF 回呼再清掉」。那個寫法有個閂鎖：
     **只要那一幀沒跑到，旗標就永遠留著，之後所有 scroll 事件都被忽略**，
     進度條卡在 0 不動——回報的「滑到第三張了，底下還沒走到第二顆圓點」
     就是這個樣子。行動瀏覽器在慣性捲動、分頁不在前景、或合成緊繃時
     都可能延後或吃掉那一幀。

     不節流的代價很小：這裡只寫一個節點的兩個屬性（一個自訂屬性、
     一個 data-*），而瀏覽器本來就把 scroll 事件併到每一幀派發。 */
  useEffect(() => {
    sync();
    /* 釘住模式的進度來自頁面捲動，所以要聽 window 的 scroll。
       沒釘住時這個監聽也無害：每次只是重算一個比例、寫一個屬性。
       passive 明寫，否則瀏覽器得等回呼結束才知道要不要捲。 */
    window.addEventListener("scroll", sync, { passive: true });
    // 視窗寬度變了，卡片寬、可捲距離與釘不釘住都會變，進度要重算
    window.addEventListener("resize", sync);
    const mq = pinMedia();
    mq.addEventListener("change", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      mq.removeEventListener("change", sync);
    };
  }, [sync]);

  return (
    /* 釘住捲動：三張卡先翻完才繼續往下（指定）。
       .pin 是那段「多出來的捲動距離」，.pinInner 貼在視窗上不動。
       兩層在窄螢幕與不支援 scroll-driven animation 的瀏覽器上不做任何事，
       版面回到原本使用者自己橫滑的卡片列（見 CSS 最後一段）。 */
    <div className={styles.pin} ref={pin}>
      <div className={styles.pinInner}>
        <div className={styles.stack}>
          {/* 捲動容器要自己拿得到焦點，否則只用鍵盤的人捲不動它——
          Firefox 會自動給，Chrome 不會，所以明寫 tabIndex。 */}
          <div
            className={styles.viewport}
            ref={viewport}
            onScroll={sync}
            tabIndex={0}
            role="group"
            aria-label="現階段研發焦點"
            lang="zh-Hant"
          >
            <ol className={styles.rail}>
              {CARDS.map((card, i) => (
                <li
                  key={card.index}
                  className={`${styles.card} ${styles[TONE[i]]}`}
                >
                  {/* 照片是底層，色調層疊在它上面，文字再壓在最上層 */}
                  <picture className={styles.media}>
                    <source
                      srcSet={`${base}media/${card.image}.webp`}
                      type="image/webp"
                    />
                    <img
                      src={`${base}media/${card.image}.jpg`}
                      alt={card.alt}
                      width={card.width}
                      height={card.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>

                  <div className={styles.text}>
                    <p className={styles.eyebrow}>
                      <span className={styles.num}>{card.index}</span>
                      <span className={styles.slash} aria-hidden="true">
                        /
                      </span>
                      現階段研發焦點
                    </p>

                    <h2 className={styles.title}>{card.title}</h2>
                    <p className={styles.body}>{card.body}</p>

                    <ul role="list" className={styles.tags}>
                      {card.tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* 進度軌。圓點底下的標題在卡片上就有，這裡是重複的，純粹是
          「現在滑到哪」的視覺提示；捲動位置本身在捲動容器上已經有了，
          再做成一組可聚焦的控制項只會多出三個 tab 停留點，所以整條隱藏。 */}
          <div
            className={styles.progress}
            ref={rail}
            data-reached="0"
            aria-hidden="true"
            lang="zh-Hant"
          >
            <span className={styles.track} />
            <span className={styles.fill} />
            <ol className={styles.dots}>
              {CARDS.map((card) => (
                <li key={card.index} className={styles.dotItem}>
                  <span className={styles.dot} />
                  <span className={styles.dotLabel}>{card.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
