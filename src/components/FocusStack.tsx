import { useCallback, useEffect, useRef } from 'react'
import styles from './FocusStack.module.css'

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
  index: string
  title: string
  body: string
  tags: string[]
  /** public/media/ 下的檔名（不含副檔名），jpg 與 webp 各一份 */
  image: string
  width: number
  height: number
  /** 照片內容，給 alt 用 */
  alt: string
}

/* 卡片底色。取樣自 index_img/card1.jpg～card3.jpg 的實際像素，不是自行配色。
   02 的 #313b87 偏靛紫，嚴格說在專案的藍白色系之外，但那是設計稿上的值。 */
const TONE = ['tone1', 'tone2', 'tone3'] as const

const CARDS: Card[] = [
  {
    index: '01',
    title: '癌症研究與檢測技術',
    body: '從癌症生物學與疾病異質性出發，研究癌症相關生命訊號、背景干擾、辨識與檢測應用之間的關係。',
    tags: ['癌症生物學', '檢測研究', '分子辨識'],
    image: 'focus-1',
    width: 1102,
    height: 884,
    alt: 'UDA BIOMED 檢體運送冷鏈箱、採樣管與條碼掃描器，放在實驗室檯面上。',
  },
  {
    index: '02',
    title: 'UDA 生物晶片技術',
    body: '整合分子辨識、材料介面、生物感測、微型工程與資料分析，建立生命訊號研究與癌症檢測應用的微型化技術平台。',
    tags: ['分子辨識', '感測整合', '平台轉譯'],
    image: 'focus-2',
    width: 1400,
    height: 934,
    alt: '移液器將液滴滴入 UDA BIOMED 微孔盤，畫面標註分子辨識、生物感測、材料介面、微型工程與資料分析。',
  },
  {
    index: '03',
    title: '原構生物學',
    body: '從原子與分子結構到細胞狀態，作為 UDA 整合結構生物學、分子生物物理與生命訊號研究的原創研發框架。',
    tags: ['結構研究', '分子動態', 'UDA研發框架'],
    image: 'focus-3',
    width: 1079,
    height: 866,
    alt: 'UDA BIOMED 研究採樣套組：採樣管、採樣棒、說明卡與防拆回郵袋。',
  },
]

export default function FocusStack() {
  const base = import.meta.env.BASE_URL
  const viewport = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const frame = useRef<number | undefined>(undefined)

  /* 把捲動進度寫成 CSS 變數 --p（0～1），主色線段的寬度直接吃它。

     刻意**不走 React state**：捲動時每幀 setState 會讓整個元件重繪，
     三張卡連照片一起重算，行動裝置上會頓。直接寫 DOM 的 style 與 dataset
     只動這一個節點。 */
  const sync = useCallback(() => {
    const vp = viewport.current
    const el = rail.current
    if (!vp || !el) return

    const max = vp.scrollWidth - vp.clientWidth
    const p = max > 0 ? vp.scrollLeft / max : 0
    el.style.setProperty('--p', String(p))

    /* 圓點預設是白的，藍線走到才變主色（指定）。
       reached = 藍線已經走過幾顆。還沒開始滑時是 0 顆，三顆都維持白色。

       EDGE 是 2% 的容差，不是浮點誤差的緩衝。捲到最後一張時 scrollLeft
       常常停在 656.5 / 657 這種位置（snap 對齊、裝置像素比、慣性收尾都會差
       一點），p 因此永遠差一點到 1，第三顆就不會亮——實際回報就是
       「已經滑到第三張，圓點還沒到」。 */
    const EDGE = 0.02
    const reached =
      p <= 0
        ? 0
        : Math.min(CARDS.length, Math.floor(p * (CARDS.length - 1) + EDGE) + 1)
    el.dataset.reached = String(reached)
  }, [])

  /* scroll 事件用 rAF 節流。原生 scroll 一秒可以派發上百次，
     每次都寫 style 是浪費——一幀畫一次就夠。 */
  const onScroll = useCallback(() => {
    if (frame.current !== undefined) return
    frame.current = requestAnimationFrame(() => {
      frame.current = undefined
      sync()
    })
  }, [sync])

  useEffect(() => {
    sync()
    // 視窗寬度變了，卡片寬與可捲距離都會變，進度要重算
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('resize', sync)
      if (frame.current !== undefined) cancelAnimationFrame(frame.current)
    }
  }, [sync])

  return (
    <div className={styles.stack}>
      {/* 捲動容器要自己拿得到焦點，否則只用鍵盤的人捲不動它——
          Firefox 會自動給，Chrome 不會，所以明寫 tabIndex。 */}
      <div
        className={styles.viewport}
        ref={viewport}
        onScroll={onScroll}
        tabIndex={0}
        role="group"
        aria-label="現階段研發焦點"
        lang="zh-Hant"
      >
        <ol className={styles.rail}>
          {CARDS.map((card, i) => (
            <li key={card.index} className={`${styles.card} ${styles[TONE[i]]}`}>
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
  )
}
