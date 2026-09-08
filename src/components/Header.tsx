import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { CTA, NAV_ITEMS, SITE } from '../config/site.ts'
import Button from './ui/Button.tsx'
import { useHeroElement } from '../context/heroRegistry.ts'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.ts'
import { useFocusTrap } from '../hooks/useFocusTrap.ts'
import styles from './Header.module.css'

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const heroEl = useHeroElement()

  /* 初始值直接用 isHome，而不是 false。否則首頁載入時 header 會先閃一下
     白底，等 observer 首次回報後才轉透明。 */
  const [overHero, setOverHero] = useState(isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  /** 桌機展開中的下拉選單，值是該項目的 to；null＝都收起來 */
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  const headerRef = useRef<HTMLElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)

  /* header 高度會隨中斷點變（64 / 80），rootMargin 得跟著變，
     所以量出來而不是寫死。ResizeObserver 只在中斷點跨越時觸發。 */
  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return

    /* 用 border-box 高度：header 視覺上就是佔這麼多，rootMargin 要對齊它。 */
    const measure = () => setHeaderHeight(el.getBoundingClientRect().height)

    /* 先同步量一次，不要只靠 ResizeObserver。
       RO 的通知是在「更新繪製」階段送出的，而背景分頁不執行該階段——
       在背景分頁開啟連結時，第一次通知會延到分頁被切到前景才送達。
       在那之前 headerHeight 是 0，底下的 IntersectionObserver 不會建立，
       首頁 header 就會卡在透明狀態，捲過 hero 也不變白底。 */
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* hero 是否仍擋在 header 底下。
     rootMargin 把觀察區的頂端往下推一個 header 高度，於是「相交」
     恰好等於「hero 的下緣還在 header 下緣之下」。 */
  useEffect(() => {
    if (!isHome) {
      setOverHero(false)
      return
    }
    if (!heroEl || headerHeight === 0) {
      setOverHero(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 },
    )
    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [isHome, heroEl, headerHeight])

  /* 換頁時關掉選單，否則點了項目之後選單會留在畫面上蓋住新頁 */
  useEffect(() => {
    setMenuOpen(false)
    setOpenMenu(null)
  }, [pathname])

  /* 點到下拉選單以外的地方就收起來。用 pointerdown 而不是 click：
     click 要等按鍵放開，中間若有捲動會顯得慢半拍。 */
  useEffect(() => {
    if (!openMenu) return
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest('[data-nav-dropdown]')) setOpenMenu(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  /* Esc 關閉 */
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  /* 關閉後把焦點交還給漢堡按鈕。用 wasOpen 擋掉首次掛載，
     否則一進站焦點就會被搶到漢堡按鈕上。 */
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true
    } else if (wasOpen.current) {
      wasOpen.current = false
      hamburgerRef.current?.focus()
    }
  }, [menuOpen])

  useBodyScrollLock(menuOpen)
  useFocusTrap(panelRef, menuOpen)

  const appearance = overHero && !menuOpen ? styles.overHero : styles.solid

  return (
    <>
      <header ref={headerRef} className={`${styles.header} ${appearance}`}>
        <div className={styles.inner}>
          {/* 用含標語的完整鎖定圖，不裁掉右側的 Unveiling Dynamic Atoms。
              兩個色版同時在 DOM 裡、用 CSS 切換：改用 src 切換的話，
              第一次捲過 hero 會臨時抓圖而閃一下。
              連結本身有 aria-label，所以兩張圖都 alt=""，避免重複朗讀。

              兩張圖是從 logo_img/logo2th/ 的 JPG 去背產生的（指定），
              尺寸 711×231。width／height 要跟著實際檔案走，
              寫錯的話瀏覽器保留的版位比例不對，載入時整條 header 會跳一下。 */}
          <Link to="/" className={styles.wordmark} aria-label={`${SITE.name} home`}>
            <img
              className={`${styles.logo} ${styles.logoNavy}`}
              src={`${import.meta.env.BASE_URL}brand/logo-full-blue.png`}
              alt=""
              width={711}
              height={231}
            />
            <img
              className={`${styles.logo} ${styles.logoWhite}`}
              src={`${import.meta.env.BASE_URL}brand/logo-full-white.png`}
              alt=""
              width={711}
              height={231}
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Main">
            {NAV_ITEMS.map((item) =>
              'children' in item && item.children ? (
                <NavDropdown
                  key={item.to}
                  item={item}
                  open={openMenu === item.to}
                  onToggle={() =>
                    setOpenMenu((cur) => (cur === item.to ? null : item.to))
                  }
                  onClose={() => setOpenMenu(null)}
                />
              ) : (
                <NavLink key={item.to} to={item.to} className={styles.navLink}>
                  {item.label}
                </NavLink>
              ),
            )}
            <Button
              to={CTA.to}
              size="sm"
              variant={overHero ? 'onDark' : 'primary'}
              className={styles.ctaGap}
            >
              {CTA.label}
            </Button>
          </nav>

          <button
            ref={hamburgerRef}
            type="button"
            className={styles.hamburger}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav className={styles.panelNav} aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <div key={item.to} className={styles.panelGroup}>
                <NavLink to={item.to} className={styles.panelLink}>
                  {item.label}
                </NavLink>
                {/* 子項目只有三個，直接列出來——再加一層展開收合，
                    在只有三行的清單上是多按一次的成本，沒有收益。 */}
                {'children' in item && item.children
                  ? item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={styles.panelSubLink}
                        lang="zh-Hant"
                      >
                        {child.label}
                      </NavLink>
                    ))
                  : null}
              </div>
            ))}
          </nav>
          {/* 選單永遠是白底，所以固定用 primary，不隨 overHero 變 */}
          <Button to={CTA.to} variant="primary" fullWidth className={styles.panelCta}>
            {CTA.label}
          </Button>
        </div>
      )}
    </>
  )
}

/**
 * 帶下拉選單的導覽項目（目前只有 RESEARCH）。
 *
 * 父項目維持連結：RESEARCH 本身是一個有內容的頁面，把它換成純按鈕會讓
 * 那一頁在導覽上消失。展開改用旁邊那顆箭頭鈕，它有自己的 aria-expanded／
 * aria-controls，滑鼠移入整塊時也會展開。
 *
 * 選單本身用 role="menu" 之類的 ARIA 是常見的誤用——那組角色是給
 * 應用程式選單（會執行動作）用的，這裡是一組連結，用一般的 <ul>／<a>
 * 讀屏才會唸成「連結，共 3 個」。
 */
function NavDropdown({
  item,
  open,
  onToggle,
  onClose,
}: {
  item: { label: string; to: string; children: readonly { label: string; to: string }[] }
  open: boolean
  onToggle: () => void
  onClose: () => void
}) {
  const menuId = `nav-sub-${item.to.replace(/\W/g, '')}`

  return (
    <div
      className={styles.navGroup}
      data-nav-dropdown=""
      /* 滑鼠移入即展開；移出整塊才收。焦點離開整塊也收，
         這樣用鍵盤 Tab 出去時選單不會留著。 */
      onPointerEnter={onToggle === undefined ? undefined : () => !open && onToggle()}
      onPointerLeave={onClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose()
      }}
    >
      <NavLink to={item.to} className={styles.navLink}>
        {item.label}
      </NavLink>

      <button
        type="button"
        className={styles.navToggle}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${item.label} submenu`}
        onClick={onToggle}
      >
        <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
      </button>

      <ul id={menuId} className={styles.subMenu} hidden={!open}>
        {item.children.map((child) => (
          <li key={child.to}>
            <NavLink to={child.to} className={styles.subLink} lang="zh-Hant">
              {child.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
