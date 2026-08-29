import styles from './Placeholder.module.css'

/**
 * 尚未有真實資料的區塊。
 *
 * CLAUDE.md 工作方式第 3 條：缺文案時用明確的 placeholder，
 * 絕對不要編造研究成果、臨床試驗階段、論文、專利、合作夥伴或任何數據。
 *
 * 刻意做得顯眼，讓它不可能被誤認成正式內容，也方便上線前用
 * `grep -r Placeholder src/` 一次找齊。
 */
export default function Placeholder({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.placeholder}>
      <p className={styles.tag}>To add</p>
      <p className={styles.title}>{title}</p>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
