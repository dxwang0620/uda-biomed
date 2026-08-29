import { useCallback, useEffect, useRef, useState } from 'react'
import Button from './ui/Button.tsx'
import styles from './HeroCarousel.module.css'

/**
 * 首頁 hero 輪播，依 index_video 參考影片重建。
 *
 * 文案來源 docs/content-home.md。標 [抄錄] 的是從錄影逐字讀出、待校對；
 * 讀不出來的用 slide.pending 標記，畫面上會顯示為待補。
 *
 * 無障礙處理：
 *   - 自動輪播在 hover / 焦點進入時暫停，prefers-reduced-motion 時完全不啟動
 *   - 圓點是真正的 <button>，可鍵盤操作，並以 aria-current 標示目前這張
 *   - 非當前的投影片 inert，避免鍵盤 tab 進看不見的內容
 *   - 只有當前投影片的標題是 h1，維持每頁單一 h1
 *   - 切換時用 aria-live 告知，但只在使用者手動切換時（自動輪播不打擾）
 */

const AUTOPLAY_MS = 7000

type Slide = {
  eyebrow: string
  title: string
  body: string
  pending?: boolean
}

const SLIDES: Slide[] = [
  {
    eyebrow: 'TECHNOLOGY & APPLICATIONS',
    title: 'Animal Oncology & Health Research',
    body: 'Extends knowledge accumulated through human cancer research toward animal health, so scientific progress can also serve lives that cannot speak for themselves.',
  },
  {
    eyebrow: 'TECHNOLOGY & APPLICATIONS',
    title: 'Technology Licensing & Strategic Collaboration',
    body: 'From research exchange and proof of concept to co-development, UDA works with industry partners to advance biomedical innovation.',
  },
  {
    eyebrow: '[待補：eyebrow]',
    title: '[待補：第 3 張標題]',
    body: '參考影片捲動太快沒拍到這一張，需要你提供標題與內文。',
    pending: true,
  },
  {
    eyebrow: '[待補：eyebrow]',
    title: '[待補：第 4 張標題]',
    body: '參考影片捲動太快沒拍到這一張，需要你提供標題與內文。',
    pending: true,
  },
  {
    eyebrow: '[待補：eyebrow]',
    title: '[待補：第 5 張標題]',
    body: '參考影片捲動太快沒拍到這一張，需要你提供標題與內文。',
    pending: true,
  },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [manual, setManual] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length)
  }, [])

  /* 自動輪播。reduced-motion 時整個不啟動——自動變動的內容對前庭敏感的
     使用者是實質困擾，不是裝飾。 */
  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused])

  /* 左右方向鍵切換，焦點在輪播內時才生效 */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setManual(true)
      go(index - 1)
    } else if (e.key === 'ArrowRight') {
      setManual(true)
      go(index + 1)
    }
  }

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      role="group"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setPaused(false)
      }}
      onKeyDown={onKeyDown}
    >
      <div className={styles.viewport}>
        {SLIDES.map((slide, i) => {
          const active = i === index
          return (
            <div
              key={slide.title}
              className={`${styles.slide} ${active ? styles.slideActive : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              aria-hidden={!active}
              /* 非當前投影片不可聚焦，否則 tab 會跑進看不見的內容 */
              inert={!active}
            >
              <p className={styles.eyebrow}>{slide.eyebrow}</p>
              {/* 只有當前這張是 h1。五張都寫成 h1 的話，原始碼裡就有五個
                  h1——非當前的雖然 inert + aria-hidden 不會被朗讀，
                  但「每頁一個 h1」這條還是破了。 */}
              {active ? (
                <h1 className={styles.title} id="hero-heading">
                  {slide.title}
                </h1>
              ) : (
                <div className={styles.title} aria-hidden="true">
                  {slide.title}
                </div>
              )}
              <p className={slide.pending ? styles.bodyPending : styles.body}>
                {slide.body}
              </p>
            </div>
          )
        })}
      </div>

      <div className={styles.actions}>
        <Button to="/technology" variant="onDarkSolid">
          Explore cancer detection technology
        </Button>
        <Button to="/partnerships" variant="onDark">
          Business collaboration
        </Button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Choose slide">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            role="tab"
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}: ${slide.title}`}
            onClick={() => {
              setManual(true)
              go(i)
            }}
          />
        ))}
      </div>

      {/* 手動切換時才朗讀，自動輪播不打擾螢幕閱讀器 */}
      <p className="visually-hidden" aria-live="polite">
        {manual ? `Slide ${index + 1} of ${SLIDES.length}: ${SLIDES[index].title}` : ''}
      </p>
    </div>
  )
}
