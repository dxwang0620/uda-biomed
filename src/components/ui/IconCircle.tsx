import styles from './IconCircle.module.css'

/**
 * 圖示的圓形襯底。設計稿有兩種：
 *   filled  navy 實心圓 + 白色線條圖示（首頁三欄）
 *   tint    --color-tint 淺灰圓 + navy 圖示（TECHNOLOGY 流程）
 *   onDark  白圓 + navy 圖示 —— 用於半透明／深色區塊
 *
 * 圖示本身由呼叫端傳入，這裡只負責圓與尺寸。
 * 整個元件是裝飾性的，aria-hidden——意義由旁邊的文字標題承載。
 */
export default function IconCircle({
  children,
  tone = 'filled',
}: {
  children: React.ReactNode
  tone?: 'filled' | 'tint' | 'onDark'
}) {
  return (
    <span className={`${styles.circle} ${styles[tone]}`} aria-hidden="true">
      {children}
    </span>
  )
}
