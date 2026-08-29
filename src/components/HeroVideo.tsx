import { useRegisterHero } from '../context/heroRegistry.ts'
import { useHeroVideoEnabled } from '../hooks/useHeroVideoEnabled.ts'
import HeroWave from './HeroWave.tsx'
import styles from './HeroVideo.module.css'

/**
 * 首頁 hero。四個圖層由下而上：
 *   1. poster 靜態圖   —— 永遠存在。影片載入前、載入失敗、768px 以下、
 *                          以及 reduced-motion 時都靠它撐場
 *   2. 影片             —— 只在 >=768px 且未要求減少動態時才掛上 DOM
 *   3. navy 遮罩        —— 72%，實測值，見 tokens.css 的說明
 *   4. 內容             —— 標題與 CTA，z-index 高於前三層
 * 波浪色帶疊在最上層的底部，蓋住影片下緣。
 *
 * 影片為純裝飾：aria-hidden，不承載任何靠它才能理解的資訊。
 */
export default function HeroVideo({ children }: { children: React.ReactNode }) {
  const registerHero = useRegisterHero()
  const showVideo = useHeroVideoEnabled()

  return (
    <section ref={registerHero} className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.media}>
        <div
          className={styles.poster}
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}media/hero-poster.jpg)`,
          }}
        />

        {showVideo && (
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`${import.meta.env.BASE_URL}media/hero-poster.jpg`}
            aria-hidden="true"
            tabIndex={-1}
          >
            {/* webm 在支援的瀏覽器較小，排在前面優先取用 */}
            <source src={`${import.meta.env.BASE_URL}media/hero.webm`} type="video/webm" />
            <source src={`${import.meta.env.BASE_URL}media/hero.mp4`} type="video/mp4" />
          </video>
        )}

        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>{children}</div>

      <HeroWave className={styles.wave} />
    </section>
  )
}
