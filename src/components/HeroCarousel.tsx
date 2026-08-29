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
 *   - 使用者一旦自己選過投影片就永久停止自動輪播，不會把他選的那張換掉
 *   - 圓點是真正的 <button>，可鍵盤操作，並以 aria-current 標示目前這張
 *   - 非當前的投影片 inert，避免鍵盤 tab 進看不見的內容
 *   - 標題不隨切換更換元素型別，避免字型閃動；語意由單一的
 *     visually-hidden h1 承載，維持每頁一個 h1
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
  /* 前兩張 [抄錄] 自參考影片，後三張 [草稿]：
     依 UDA 自述的三個公開重點（見 docs/content-home.md 的核心定位）撰寫，
     只做描述、不含任何成果、數據、期別或夥伴名稱。待你潤稿。 */
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
    eyebrow: 'CURRENT PUBLIC FOCUS',
    title: 'Cancer Detection Technology',
    body: 'Bringing molecular recognition and analytical validation together, so that early biological signals can be observed, compared and interpreted with confidence.',
  },
  {
    eyebrow: 'KEY PLATFORM',
    title: 'UDA Biochip Technology',
    body: 'A miniaturized platform integrating molecular recognition, material interfaces, biosensing and data analysis for life-signal research.',
  },
  {
    eyebrow: 'RESEARCH FRAMEWORK',
    title: 'Proto-Structural Biology',
    body: "UDA's original framework for reading life from atomic and molecular structure through to cellular state.",
  },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [manual, setManual] = useState(false)
  /* 使用者一旦自己選過投影片，就不再自動輪播——否則他挑的那張會被
     自動換掉，這正是「點了卻跳走」的來源。 */
  const [stopped, setStopped] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length)
  }, [])

  /* 自動輪播。reduced-motion 時整個不啟動——自動變動的內容對前庭敏感的
     使用者是實質困擾，不是裝飾。 */
  useEffect(() => {
    if (stopped || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, stopped])

  /* 左右方向鍵切換，焦點在輪播內時才生效 */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setManual(true)
      setStopped(true)
      go(index - 1)
    } else if (e.key === 'ArrowRight') {
      setManual(true)
      setStopped(true)
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
      onBlur={() => {
        /* 不看 e.relatedTarget：程式化移動焦點（以及部分瀏覽器的
           Tab 行為）它會是 null，會被誤判成焦點離開了輪播，
           自動輪播就在使用者還在操作圓點時又跑起來。
           等焦點落定後直接看 activeElement 才可靠。 */
        window.setTimeout(() => {
          if (!rootRef.current?.contains(document.activeElement)) setPaused(false)
        }, 0)
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
              {/* 一律用 div，不隨 active 在 h1／div 之間切換。
                  切換元素型別會讓 React 替換 DOM 節點，而 div 拿不到
                  global.css 給 h1 的字重與行高，切換瞬間字會閃一下變形。
                  語意由下方那個 visually-hidden 的 h1 承載。 */}
              <div className={styles.title} aria-hidden="true">
                {slide.title}
              </div>
              <p className={slide.pending ? styles.bodyPending : styles.body}>
                {slide.body}
              </p>
            </div>
          )
        })}
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
              setStopped(true)
              go(i)
            }}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <Button to="/technology" variant="onDarkSolid">
          Explore cancer detection technology
        </Button>
        <Button to="/partnerships" variant="onDark">
          Business collaboration
        </Button>
      </div>


      {/* 頁面唯一的 h1，內容跟著當前投影片走。視覺上的大標由上方的 div
          呈現（已 aria-hidden），兩者不會重複朗讀。 */}
      <h1 className="visually-hidden" id="hero-heading">
        {SLIDES[index].title}
      </h1>

      {/* 手動切換時才朗讀，自動輪播不打擾螢幕閱讀器 */}
      <p className="visually-hidden" aria-live="polite">
        {manual ? `Slide ${index + 1} of ${SLIDES.length}: ${SLIDES[index].title}` : ''}
      </p>
    </div>
  )
}
