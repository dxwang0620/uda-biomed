import { useRegisterHero } from '../context/heroRegistry.ts'
import { useHeroVideoEnabled } from '../hooks/useHeroVideoEnabled.ts'
import styles from './HeroVideo.module.css'

/**
 * 首頁 hero。
 *
 * 影片與 poster 是**固定在視窗上的**（position: fixed），捲動時不會跟著走，
 * 內容區塊從它上面滑過去。折線以下的區塊有自己的不透明底色，會蓋住影片。
 *
 * 文字遮罩刻意「不」放進固定層，而是留在 hero 裡跟著文字一起捲動——
 * 否則文字往上捲、遮罩留在原地，兩者錯開後對比就不成立了。
 *
 * 影片為純裝飾：aria-hidden，不承載任何靠它才能理解的資訊。
 */
export default function HeroVideo({ children }: { children: React.ReactNode }) {
  const registerHero = useRegisterHero()
  const showVideo = useHeroVideoEnabled()

  return (
    <>
      {/* 固定背景層。z-index 為負，因此落在所有一般內容之下；
          body 的底色是畫布背景，會在更下面，不會蓋掉它。 */}
      <div className={styles.backdrop} aria-hidden="true">
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

        {/* 左藍右透明的色調，貫穿整個頁面。見 module.css 的說明。 */}
        <div className={styles.tint} />
      </div>

      <section ref={registerHero} className={styles.hero} aria-labelledby="hero-heading">
        {/* 文字遮罩：跟著 hero 捲動，與文字保持相對位置不變 */}
        <div className={styles.overlay} aria-hidden="true" />
        <div className={`container ${styles.content}`}>{children}</div>
      </section>
    </>
  )
}
