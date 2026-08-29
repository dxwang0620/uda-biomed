import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './ArrowLink.module.css'

/**
 * 區塊結尾的文字型 CTA，設計稿寫成 `EXPLORE OUR TECHNOLOGY →`。
 * 箭頭是裝飾，意義全在文字上，故 aria-hidden。
 */
export default function ArrowLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Link to={to} className={styles.link}>
      {children}
      <ArrowRight size={18} strokeWidth={2} aria-hidden="true" className={styles.arrow} />
    </Link>
  )
}
