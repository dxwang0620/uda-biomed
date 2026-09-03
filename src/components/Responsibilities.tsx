import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { GROUPS, type Group } from '../data/duties.ts'
import styles from './Responsibilities.module.css'

/**
 * 職掌說明的收合清單。資料在 src/data/duties.ts，與組織架構圖共用同一份。
 *
 * 1024 以上：滑到（或聚焦到）標題就浮出說明，點擊釘住。
 * 1023 以下：沒有 hover 可用，維持點擊展開的手風琴。
 */

const SCOPE_LABEL: Record<Group['scope'], { en: string; zh: string }> = {
  governance: {
    en: 'Governance, authority and direct units',
    zh: '治理層級、管轄與直屬單位職責',
  },
  operations: {
    en: 'Departments and their units',
    zh: '各部及轄下單位執掌說明',
  },
}

function Panel({ group }: { group: Group }) {
  /* 桌機靠 hover／focus 浮出，這個 state 是「釘住」——點過就留著，
     滑鼠移開也不收。手機沒有 hover，它就是單純的展開狀態。 */
  const [open, setOpen] = useState(false)
  const panelId = `resp-${group.id}`

  return (
    <div className={`${styles.item} ${open ? styles.itemPinned : ''}`}>
      <h4 className={styles.itemHeading}>
        <button
          type="button"
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.triggerText}>
            <span className={styles.en}>{group.title.en}</span>
            <span className={styles.zh} lang="zh-Hant">
              {group.title.zh}
            </span>
          </span>
          <span className={styles.count}>{group.entries.length}</span>
          <ChevronDown
            size={18}
            strokeWidth={2.5}
            aria-hidden="true"
            className={styles.chevron}
          />
        </button>
      </h4>

      {/* 0fr → 1fr，同董事長談話那一段的做法：唯一能對「高度 auto」做轉場的
          穩定方式。內層需要 overflow:hidden + min-height:0 才收得回 0。 */}
      <div
        id={panelId}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
      >
        <div className={styles.panelInner}>
          <dl className={styles.entries}>
            {group.entries.map(({ term, detail }) => (
              <div key={term.en} className={styles.entry}>
                <dt className={styles.term}>
                  <span className={styles.en}>{term.en}</span>
                  <span className={styles.zh} lang="zh-Hant">
                    {term.zh}
                  </span>
                </dt>
                <dd className={styles.detail}>
                  <span>{detail.en}</span>
                  <span className={styles.zh} lang="zh-Hant">
                    {detail.zh}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default function Responsibilities() {
  const scopes: Group['scope'][] = ['governance', 'operations']

  /* WCAG 1.4.13：靠 hover 浮出的內容會遮住後面的項目，所以必須能在
     不移動游標的情況下關掉。Esc 關閉，游標離開清單後再恢復。 */
  const [dismissed, setDismissed] = useState(false)

  return (
    <div
      className={`${styles.wrap} ${dismissed ? styles.wrapDismissed : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setDismissed(true)
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
          }
        }
      }}
      onMouseLeave={() => setDismissed(false)}
    >
      {scopes.map((scope) => (
        <section key={scope} className={styles.scope}>
          <h3 className={styles.scopeTitle}>
            <span className={styles.en}>{SCOPE_LABEL[scope].en}</span>
            <span className={styles.zh} lang="zh-Hant">
              {SCOPE_LABEL[scope].zh}
            </span>
          </h3>

          <div className={styles.list}>
            {GROUPS.filter((g) => g.scope === scope).map((g) => (
              <Panel key={g.id} group={g} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
