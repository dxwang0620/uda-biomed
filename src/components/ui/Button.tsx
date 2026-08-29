import { Link } from 'react-router-dom'
import styles from './Button.module.css'

/**
 * 三種樣式，取自設計稿：
 *   primary  藍底白字實心鈕（首頁 hero 主要動作、header CTA）
 *   outline  白底藍框藍字（首頁 hero 次要動作）
 *   onDark       透明底白框白字 —— 深底上的次要動作
 *   onDarkSolid  白底深藍字 —— 深底上的主要動作
 *
 * 深底上不沿用設計稿的實心藍鈕：primary 疊在 hero 遮罩底色 #476a92 上
 * 邊界只有 2.03:1，不符 WCAG 1.4.11 對 UI 元件的 3:1 要求。
 * 反轉成白底後是 5.60:1。設計稿的 hero 是淺底，才用得起藍鈕。
 *
 * 圓角用 --radius-sm（2px）。設計稿實測按鈕幾乎是方角，
 * 不是 CLAUDE.md 佔位值的 8px。
 */
type Variant = 'primary' | 'outline' | 'onDark' | 'onDarkSolid'
type Size = 'md' | 'sm'

type Props = {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
} & (
  | { to: string; href?: never; onClick?: never }
  | { href: string; to?: never; onClick?: never }
  | { onClick: () => void; to?: never; href?: never }
)

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...rest
}: Props) {
  const cls = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  if ('to' in rest && rest.to) {
    return (
      <Link to={rest.to} className={cls}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && rest.href) {
    /* 外部連結。新分頁開啟時 rel 一定要帶 noreferrer，否則新頁能透過
       window.opener 操作原頁。 */
    return (
      <a href={rest.href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cls} onClick={rest.onClick}>
      {children}
    </button>
  )
}
