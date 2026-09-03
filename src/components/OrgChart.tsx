import { useRef, useState } from 'react'
import { dutiesFor } from '../data/duties.ts'
import styles from './OrgChart.module.css'

/**
 * 組織架構圖。結構與名稱取自 web_img/about/UDA_BIOMED_組織架構.pdf 第 1 頁。
 *
 * 英文為主標、中文為小字副標。架構圖全是專有名詞，把原文留著，
 * 我的翻譯就不會變成唯一依據——哪些是官方詞、哪些是我翻的見
 * docs/content-about.md。
 *
 * 色彩只做識別用的色條，部門名稱一律深色文字：原件的橘 #e87722（白字
 * 2.96:1）與金 #d6a000（2.36:1）撐不住白字，若照搬會有兩個部讀不到。
 * 顏色與文字資訊重複，所以它是裝飾性的，不受 1.4.11 約束。
 *
 * 用巢狀 ul/li 表達層級，這是階層在語意上的正確寫法，
 * 讀屏會直接報出層數與項目數。
 */

type Unit = { en: string; zh: string }

/** 治理層。由上而下一條主軸，側邊掛委員會或幕僚室。 */
const GOVERNANCE: {
  en: string
  zh: string
  /** 側邊分支。kind 決定樣式：委員會是灰底方塊、幕僚室是白底外框。 */
  aside?: { kind: 'committee' | 'office' | 'origin'; items: Unit[] }
}[] = [
  {
    en: "Shareholders' Meeting",
    zh: '股東會',
    aside: { kind: 'origin', items: [{ en: 'Founder', zh: '創辦人' }] },
  },
  {
    en: 'Board of Directors',
    zh: '董事會',
    aside: {
      kind: 'committee',
      items: [
        { en: 'Compensation Committee', zh: '薪資報酬委員會' },
        { en: 'Personnel Evaluation Committee', zh: '人事評鑑委員會' },
        { en: 'Internal Audit Office', zh: '內部稽核處' },
      ],
    },
  },
  {
    en: 'Chairman',
    zh: '董事長',
    aside: { kind: 'office', items: [{ en: "Chairman's Office", zh: '董事長室' }] },
  },
  {
    en: 'General Manager',
    zh: '總經理',
    aside: { kind: 'office', items: [{ en: "General Manager's Office", zh: '總經理室' }] },
  },
  {
    en: 'Vice General Manager',
    zh: '副總經理',
    aside: { kind: 'office', items: [{ en: "Vice General Manager's Office", zh: '副總室' }] },
  },
]

/** 總經理直轄五室，架構圖上與副總經理同層、位於左側。 */
const OFFICES: Unit[] = [
  { en: 'Secretariat', zh: '秘書室' },
  { en: 'Legal Affairs Office', zh: '法務室' },
  { en: 'Information Technology Office', zh: '資訊室' },
  { en: 'Records Office', zh: '檔案室' },
  { en: 'Advisory Office', zh: '顧問室' },
]

/* 色值自架構圖 PDF 實際取樣，非目測。 */
const DEPARTMENTS: {
  en: string
  zh: string
  color: string
  /** 財務部在原圖是從總經理拉線下來，其餘六部歸副總經理。 */
  reportsTo: 'president' | 'vp'
  units: Unit[]
}[] = [
  {
    en: 'R&D Department',
    zh: '研發部',
    color: '#d71920',
    reportsTo: 'vp',
    units: [
      { en: 'Medical Device Development', zh: '醫材開發' },
      { en: 'Drug Discovery', zh: '藥物研發' },
      { en: 'Software Development', zh: '軟體開發' },
      { en: 'Biotech Products', zh: '生技產品' },
    ],
  },
  {
    en: 'Quality Assurance',
    zh: '品管部',
    color: '#e87722',
    reportsTo: 'vp',
    units: [
      { en: 'Quality Management', zh: '品質管理' },
      { en: 'Regulatory Affairs', zh: '法規管制' },
    ],
  },
  {
    en: 'Business Department',
    zh: '商務部',
    color: '#d6a000',
    reportsTo: 'vp',
    units: [
      { en: 'International Affairs', zh: '國際事務' },
      { en: 'Business Development', zh: '商務發展' },
      { en: 'Project Investment', zh: '專案投資' },
      { en: 'Customer Service', zh: '客戶服務' },
    ],
  },
  {
    en: 'Public Relations',
    zh: '公關部',
    color: '#176b2c',
    reportsTo: 'vp',
    units: [
      { en: 'Media Relations', zh: '媒體公關' },
      { en: 'Reception', zh: '櫃台接待' },
      { en: 'Community Service', zh: '公益服務' },
    ],
  },
  {
    en: 'Administration',
    zh: '行政部',
    color: '#147db3',
    reportsTo: 'vp',
    units: [
      { en: 'Corporate Governance', zh: '公司治理' },
      { en: 'Administrative Affairs', zh: '行政事務' },
      { en: 'Human Resources', zh: '人力資源' },
      { en: 'Environment, Health & Safety', zh: '環安衛' },
    ],
  },
  {
    en: 'General Affairs',
    zh: '總務部',
    color: '#2f3b8f',
    reportsTo: 'vp',
    units: [
      { en: 'Security', zh: '保全' },
      { en: 'Cleaning', zh: '清潔' },
      { en: 'Catering', zh: '炊事' },
      { en: 'Transportation', zh: '運輸' },
      { en: 'Facility Management', zh: '設施管理' },
    ],
  },
  {
    en: 'Finance Department',
    zh: '財務部',
    color: '#5a278a',
    reportsTo: 'president',
    units: [
      { en: 'Accounting', zh: '會計管理' },
      { en: 'Treasury', zh: '資金出納' },
      { en: 'Procurement', zh: '採購管理' },
    ],
  },
]

function Label({ en, zh }: Unit) {
  return (
    <>
      <span className={styles.en}>{en}</span>
      {/* 中文是同一個名稱的另一種寫法，不是補充資訊，所以整塊當一個標籤讀 */}
      <span className={styles.zh} lang="zh-Hant">
        {zh}
      </span>
    </>
  )
}

/**
 * 有職掌說明的節點。滑到（或鍵盤聚焦到）就浮出該節點的職掌。
 *
 * 用 <button> 而不是 div：這是可操作的元素，鍵盤要能 Tab 到，
 * 觸控裝置也要能點開——沒有 hover 的裝置只剩點擊這條路。
 *
 * 說明浮層預設向右展開；若會超出架構圖容器就翻向左邊。這個判斷必須
 * 量測後才知道，所以放在 state 裡，不能只靠 CSS。
 */
function DutyNode({
  en,
  zh,
  className,
}: Unit & { className?: string }) {
  const entries = dutiesFor(zh)
  const [open, setOpen] = useState(false)
  const [flip, setFlip] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  if (entries.length === 0) {
    return (
      <div className={className}>
        <Label en={en} zh={zh} />
      </div>
    )
  }

  const measure = () => {
    const btn = ref.current
    const chart = btn?.closest(`.${styles.chart}`)
    if (!btn || !chart) return
    // 浮層寬度與 CSS 的 --pop-w 一致
    const POP = 440
    const right = chart.getBoundingClientRect().right
    setFlip(btn.getBoundingClientRect().left + POP > right)
  }

  return (
    <button
      type="button"
      ref={ref}
      className={`${className ?? ''} ${styles.hasDuty} ${open ? styles.dutyOpen : ''}`}
      aria-expanded={open}
      onMouseEnter={measure}
      onFocus={measure}
      onClick={() => {
        measure()
        setOpen((v) => !v)
      }}
    >
      <Label en={en} zh={zh} />

      <span
        className={`${styles.pop} ${flip ? styles.popFlip : ''}`}
        role="note"
      >
        {entries.map(({ term, detail }) => (
          <span key={term.en} className={styles.popEntry}>
            <span className={styles.popTerm}>
              {term.en}
              <span className={styles.zh} lang="zh-Hant">
                {term.zh}
              </span>
            </span>
            <span className={styles.popDetail}>{detail.en}</span>
            <span className={`${styles.zh} ${styles.popDetailZh}`} lang="zh-Hant">
              {detail.zh}
            </span>
          </span>
        ))}
      </span>
    </button>
  )
}

export default function OrgChart() {
  return (
    <div className={styles.chart}>
      <ol className={styles.spine}>
        {GOVERNANCE.map(({ en, zh, aside }) => (
          <li key={en} className={styles.spineItem}>
            <DutyNode en={en} zh={zh} className={styles.node} />

            {aside && (
              <ul className={`${styles.aside} ${styles[aside.kind]}`}>
                {aside.items.map((item) => (
                  <li key={item.en}>
                    <DutyNode {...item} className={styles.asideItem} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>

      <div className={styles.officesBlock}>
        <p className={styles.branchLabel}>
          <Label en="Reporting to the General Manager" zh="總經理直轄" />
        </p>
        <ul className={styles.offices}>
          {OFFICES.map((o) => (
            <li key={o.en}>
              <DutyNode {...o} className={styles.officeItem} />
            </li>
          ))}
        </ul>
      </div>

      <ul className={styles.departments}>
        {DEPARTMENTS.map(({ en, zh, color, reportsTo, units }) => (
          <li key={en}>
            {/* 色條靠 --dept 傳入，樣式表不必為七個部各寫一條規則 */}
            <div
              className={styles.dept}
              style={{ '--dept': color } as React.CSSProperties}
            >
              {/* 部門名稱不掛 hover：職掌在下面每個轄下單位上，
                  兩層都做會把同一份內容講兩次。 */}
              <h3 className={styles.deptName}>
                <Label en={en} zh={zh} />
              </h3>
              <p className={styles.deptReports}>
                {reportsTo === 'president'
                  ? 'Reports to the General Manager'
                  : 'Reports to the Vice General Manager'}
              </p>
              <ul className={styles.units}>
                {units.map((u) => (
                  <li key={u.en}>
                    <DutyNode {...u} className={styles.unit} />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <p className={styles.note}>
        The structure is adjusted in line with the company&rsquo;s development,
        legal requirements and operational needs.
      </p>
    </div>
  )
}
