import { Link, NavLink } from 'react-router-dom'
import { NAV_ITEMS, SITE } from '../config/site.ts'
import styles from './Footer.module.css'

/**
 * 設計稿沒有畫頁尾，四張稿都在折線下方就截止了。
 * 這裡刻意做得克制：wordmark、導覽、版權，不自行加上稿中沒有的元素
 * （社群圖示、電子報訂閱、聯絡資訊）——那些都需要你先提供真實內容。
 *
 * 深藍底延續 CTA 帶的收尾。兩者相鄰時靠一條淡白線分界。
 */
export default function Footer() {
  return (
    <footer className={`${styles.footer} on-navy`}>
      <div className={`container ${styles.inner}`}>
        {/* 頁尾空間較大，用含標語的完整鎖定圖；header 因為只有 80px 高，
            那三行標語會小到看不清，所以只放字標。 */}
        <Link to="/" className={styles.wordmark} aria-label={`${SITE.name} home`}>
          <img
            className={styles.logo}
            src={`${import.meta.env.BASE_URL}brand/logo-full-white.png`}
            alt=""
            width={878}
            height={269}
          />
        </Link>

        <nav className={styles.nav} aria-label="Footer">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={styles.link}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.legal}`}>
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  )
}
