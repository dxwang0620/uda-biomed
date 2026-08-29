import styles from './Card.module.css'

/**
 * 設計稿實測：卡片**沒有 border**，是白卡放在近白底上，
 * 靠約 10px 的柔和陰影分離，最深處僅比底色暗 3.5%。
 * 圓角實測 4–5px，不是 CLAUDE.md 佔位值的 8px。
 * 依據見 docs/design-node.md「卡片」。
 */
export default function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={[styles.card, className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
