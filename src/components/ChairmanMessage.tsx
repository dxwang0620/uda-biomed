import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './ChairmanMessage.module.css'

/**
 * 董事長談話。首頁與 ABOUT 共用同一份內容。
 *
 * 版型參考 `index_img/chairman_message_page_mockup_classic.html`：
 * 眉標 → 大字引言 ＋ 短橫線 → 內文 ＋ 肖像 → 署名。
 * 示意檔是整頁版型，麵包屑、中/EN 切換、底部連結列不適用（那些頁面不存在）。
 *
 * 示意檔裡的營收、成長率、毛利率、員工數都是通用模板的填充值，一個都沒有沿用——
 * 那些正是 CLAUDE.md 禁止編造的東西。
 *
 * **談話全文是草稿。** 這一段是理念陳述而非事實主張，所以可以擬，但刻意不含任何
 * 成果、數據、時程、獎項或合作對象。配上真實肖像與署名之後，這段話等於掛在
 * 本人名下，上線前需要本人或客戶確認。
 *
 * 抽成元件而不是在兩頁各放一份：內容是同一份草稿，複製會變成兩份各自漂移。
 */

/** 卡片外觀。glass 給首頁（疊在背景影片上），solid 給 ABOUT（沒有影片的頁面）。 */
type Tone = 'glass' | 'solid'

const QUOTE = 'Patience is not the opposite of urgency.'

const MESSAGE = [
  'Our work begins with a simple conviction: that the earliest changes of disease are written in the molecules of the body, long before anything becomes visible. Reading them is difficult, and we do not pretend otherwise.',
  'What we can commit to is discipline. Every question we pursue has to be answerable. Every method we build has to be reproducible by someone other than ourselves. Every result we report has to survive the scrutiny of clinicians who see patients rather than data.',
  'Detection research rewards those willing to build carefully and verify repeatedly — and that is the company we intend to be, for our team and for anyone who shares the goal.',
]

type Props = {
  tone?: Tone
  /** 讓使用端安排版面位置（首頁靠它在 grid 裡定位） */
  className?: string
  /** 標題的 id，供 aria-labelledby 用。同一頁只會出現一次，但兩頁不能撞名 */
  headingId?: string
}

export default function ChairmanMessage({
  tone = 'glass',
  className,
  headingId = 'chairman-heading',
}: Props) {
  const [open, setOpen] = useState(false)
  const bodyId = `${headingId}-body`

  return (
    <blockquote
      className={[styles.card, styles[tone], className ?? ''].filter(Boolean).join(' ')}
    >
      {/* 肖像。照片來自 index_img/message/，佔卡片右半（指定），左緣淡出。

          用 mask 而不是疊一層漸層色：glass 外觀是半透明玻璃疊在背景影片上，
          照片左邊那一片是「玻璃 ＋ 影片」，色票漸層永遠接不上那個底。
          遮罩讓照片自己淡到全透明，露出的就是旁邊同一片底，兩種外觀都成立。 */}
      <picture className={styles.portrait}>
        <source
          srcSet={`${import.meta.env.BASE_URL}media/chairman.webp`}
          type="image/webp"
        />
        <img
          src={`${import.meta.env.BASE_URL}media/chairman.jpg`}
          alt="UDA BIOMED 董事長黎恭楷於辦公室，背後為 UDA BIOMED 招牌。"
          width={900}
          height={754}
          loading="lazy"
          decoding="async"
        />
      </picture>

      {/* 示意檔把標題當成小眉標，大字引言才是視覺主體。
          但語意上這仍是本區塊的標題，所以維持 h2，只是樣式收小。

          眉標與引言整組放進深色區塊，是為了讓引言能用白字：glass 外觀是
          25% 白疊在影片上，影片亮的時候會合成成純白，白字直接消失（1.00:1）。
          深色底不透明才撐得住。 */}
      <div className={styles.chairmanHead}>
        <h2 id={headingId} className={styles.chairmanEyebrow}>
          Message from the Chairman
        </h2>
        <p className={styles.pullQuote}>{QUOTE}</p>
        <span className={styles.quoteRule} aria-hidden="true" />

        {/* 展開鈕跨在深色區塊的下緣上。這是 disclosure 模式：
            aria-expanded 說明狀態、aria-controls 指向被控制的區塊，
            只有箭頭沒有文字，所以另外給一個唯讀的名稱。 */}
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">
            {open ? 'Hide the full message' : 'Read the full message'}
          </span>
          <ChevronDown
            size={20}
            strokeWidth={2.5}
            aria-hidden="true"
            className={styles.chevron}
          />
        </button>
      </div>

      {/* grid-template-rows 由 0fr 轉 1fr，是能對「高度 auto」做轉場的做法；
          用 max-height 猜一個值會在內容長度改變時卡頓或截斷。
          內層必須 overflow:hidden 且 min-height:0，格線列才收得起來。 */}
      <div
        id={bodyId}
        className={`${styles.collapse} ${open ? styles.collapseOpen : ''}`}
      >
        <div className={styles.collapseInner}>
          <div className={styles.chairmanBody}>
            <div className={styles.chairmanText}>
              {MESSAGE.map((para) => (
                <p key={para.slice(0, 24)} className={styles.quote}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* 署名。名字取自 index_img/message/S__215490575_0.jpg，
              那張圖只是排版好的名字、沒有手寫筆跡，所以直接用文字排——
              可縮放、可選取、讀屏讀得到，不必再多一個圖檔。 */}
          <footer className={styles.signature}>
            <span className={styles.signatureLabel}>Signed</span>
            <span className={styles.signatureName}>
              <span lang="zh-Hant">黎恭楷</span>
              <span className={styles.signatureLatin}>Kung-kai Lee</span>
            </span>
          </footer>
        </div>
      </div>
    </blockquote>
  )
}
