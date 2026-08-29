import { NavLink } from 'react-router-dom'
import { CTA, NAV_ITEMS, SITE } from '../config/site.ts'

/**
 * 臨時導覽 —— Step 2 會被真正的 <Header> 整個取代。
 *
 * 這裡刻意不套設計稿樣式，只求能點得動、看得出當前頁，
 * 讓路由、basename 與 404 fallback 在 Step 1 就能驗證。
 */
export default function ScaffoldNav() {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-2)',
      }}
    >
      <nav
        aria-label="Main"
        style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}
      >
        <NavLink to="/" aria-label={`${SITE.name} home`}>
          {SITE.name}
        </NavLink>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              fontWeight: isActive ? 700 : 400,
            })}
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink to={CTA.to}>[{CTA.label}]</NavLink>
      </nav>
    </header>
  )
}
