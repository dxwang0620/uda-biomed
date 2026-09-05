import styles from './FocusStack.module.css'

/**
 * 研發重點三張卡，橫向滑動。
 *
 * 版型依 `index_img/card1.jpg`～`card3.jpg`：編號＋眉標、大標、內文、膠囊標籤，
 * 每張卡自己的底色（色值從稿上取樣，見下方 TONE）。
 *
 * 照片（`card1-1`～`card3-1`）鋪滿整張卡，上面壓一層該卡色票的漸層遮罩，
 * 文字再壓在遮罩上——與內頁 hero 同一套語彙（指定）。
 *
 * 原本是釘住捲動的橫向推進，搬到消息右邊之後那個做法不能用：釘住會把整個區塊
 * 固定住，左邊的消息也會跟著卡住。改成使用者自己滑的橫向卡片列，配 scroll-snap。
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
    title: 'Cancer Research & Detection Technology',
    body: 'Studies cancer-related biological signals, background interference, recognition and detection applications in the context of cancer biology and disease heterogeneity.',
    tags: ['Cancer Biology', 'Detection Research', 'Molecular Recognition'],
    image: 'focus-1',
    width: 1102,
    height: 884,
    alt: 'UDA BIOMED specimen transport cases with temperature monitoring, sample tubes and a barcode scanner on a laboratory bench.',
  },
  {
    index: '02',
    title: 'UDA Biochip Technology',
    body: 'Integrates molecular recognition, material interfaces, biosensing, microscale engineering and data analysis into a miniaturized platform for life-signal research and cancer-detection applications.',
    tags: ['Molecular Recognition', 'Sensing Integration', 'Platform Translation'],
    image: 'focus-2',
    width: 1400,
    height: 934,
    alt: 'A pipette dispensing a droplet onto a UDA BIOMED microplate, annotated with molecular recognition, biosensing, material interface, microscale engineering and data analysis.',
  },
  {
    index: '03',
    title: 'Proto-Structural Biology',
    body: "UDA's original R&D framework for integrating structural biology, molecular biophysics and life-signal research from atomic and molecular structure to cellular state.",
    tags: ['Structural Research', 'Molecular Dynamics', 'UDA R&D Framework'],
    image: 'focus-3',
    width: 1079,
    height: 866,
    alt: 'A UDA BIOMED research sample collection kit: sample tubes, swabs, instruction cards and a tamper-evident return pouch.',
  },
]

export default function FocusStack() {
  const base = import.meta.env.BASE_URL

  return (
    <div className={styles.stack}>
      {/* 退回成橫向捲動時，這一層才是捲動容器。捲動容器要自己拿得到焦點，
          否則只用鍵盤的人捲不動它——Firefox 會自動給，Chrome 不會。
          釘住捲動生效時它不會捲動，多一個 tab 停留點但不影響操作。 */}
      <div
        className={styles.viewport}
        tabIndex={0}
        role="group"
        aria-label="Current R&D focus"
      >
        <ol className={styles.rail}>
          {CARDS.map((card, i) => (
            <li key={card.index} className={`${styles.card} ${styles[TONE[i]]}`}>
              {/* 照片是底層，遮罩由 .card::after 疊在它上面，文字再壓在最上層 */}
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
                  CURRENT R&amp;D FOCUS
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
    </div>
  )
}
