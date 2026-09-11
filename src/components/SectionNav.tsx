import { useEffect, useState } from 'react'
import styles from './SectionNav.module.css'

/**
 * 章節錨點目錄。版型參考 exo-one.com 核心技術頁的側邊目錄：
 * 長頁面一路往下時，讀者需要知道自己在第幾章、也要能直接跳。
 *
 * 桌機固定在左側，1024 以下收成頂部可橫向捲動的一列。
 *
 * 當前章節用 IntersectionObserver 判定，不用 scroll 監聽——
 * 這一頁疊在固定背景上，未節流的 scroll 監聽會直接反映在捲動流暢度上。
 *
 * rootMargin 的上緣扣掉 header 高度：判定基準要是「露在 header 底下的那一段」，
 * 不然章節標題還被 header 蓋住時就已經被算成當前章節。
 */

export type SectionLink = { id: string; label: string }

export default function SectionNav({ items }: { items: SectionLink[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const nodes = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => n !== null)
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        /* 同時有多段在畫面內時取最靠上的那一段，而不是最後一個回報的，
           否則快速捲動時標示會亂跳。 */
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: 0 },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav className={styles.nav} aria-label="On this page">
      <p className={styles.title}>On this page</p>
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${styles.link} ${
                active === item.id ? styles.linkActive : ''
              }`}
              /* 目前章節對讀屏也要標出來，不能只有顏色 */
              aria-current={active === item.id ? 'true' : undefined}
            >
              <span className={styles.num}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span lang="zh-Hant">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
