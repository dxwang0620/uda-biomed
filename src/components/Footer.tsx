import { ArrowRight } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_ITEMS, SITE } from '../config/site.ts'
import styles from './Footer.module.css'

/**
 * 設計稿沒有畫頁尾，四張稿都在折線下方就截止了。
 * 這裡刻意做得克制：標語、導覽、聯絡入口、版權，不自行加上稿中沒有的元素
 * （社群圖示、電子報訂閱、地址電話）——那些都需要你先提供真實內容。
 *
 * 深藍底延續 CTA 帶的收尾。兩者相鄰時靠一條淡白線分界。
 */
export default function Footer() {
  return (
    <footer className={`${styles.footer} on-navy`}>
      <div className={styles.inner}>
        {/* 依指示拿掉鎖定圖，左邊換成一句共創的標語。

            ⚠️ 這句是我擬的草稿。它是態度陳述、不含任何成果或數據，
            但畢竟是掛在頁尾的品牌文案，上線前請你確認或改寫。 */}
        <p className={styles.slogan}>Progress in detection is built together.</p>

        <nav className={styles.nav} aria-label="Footer">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={styles.link}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 最右邊的聯絡入口（指定）。 */}
        <Link to="/contact" className={styles.contact}>
          Contact us
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.legal}>
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  )
}
