import { useState } from 'react'
import { Play } from 'lucide-react'
import styles from './VideoBlock.module.css'

/**
 * 影片區塊。預設只顯示封面圖與播放鈕，**按下去才把播放器插進 DOM**。
 *
 * 這樣做有兩個理由，都不是效能潔癖：
 *   1. 嵌入第三方播放器（YouTube / Vimeo）光是載入就會寫 cookie 並送出
 *      一次請求，使用者根本還沒表示要看。延後到點擊之後才載入，
 *      「同意了才追蹤」這件事才成立。
 *   2. 自架影片時，一支 mp4 動輒數 MB，而這個站部署在 GitHub Pages，
 *      每月頻寬有 100GB 的軟上限。沒人點就不該下載。
 *
 * ⚠️ 目前沒有影片來源，所以 src 是 undefined，元件顯示的是待補狀態。
 * 來源確定後（檔案或 YouTube 連結）只要把 src 傳進來即可，見
 * docs/content-digital-health.md。
 */

export default function VideoBlock({
  /** YouTube/Vimeo 的 embed 網址，或站內 mp4 的路徑。未提供時顯示待補狀態。 */
  src,
  /** 封面圖檔名（public/media 下，不含副檔名） */
  poster,
  title,
}: {
  src?: string
  poster: string
  title: string
}) {
  const [playing, setPlaying] = useState(false)
  const isEmbed = src?.startsWith('http')

  return (
    <div className={styles.frame}>
      {playing && src ? (
        isEmbed ? (
          <iframe
            className={styles.player}
            src={`${src}${src.includes('?') ? '&' : '?'}autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          /* 自架影片。字幕軌要等實際影片到位才知道有沒有，
             有的話在這裡加 <track kind="captions">。 */
          <video className={styles.player} src={src} controls autoPlay playsInline />
        )
      ) : (
        <>
          <picture className={styles.poster}>
            <source
              srcSet={`${import.meta.env.BASE_URL}media/${poster}.webp`}
              type="image/webp"
            />
            <img
              src={`${import.meta.env.BASE_URL}media/${poster}.jpg`}
              alt=""
              width={1600}
              height={1600}
              loading="lazy"
              decoding="async"
            />
          </picture>

          {src ? (
            <button
              type="button"
              className={styles.play}
              onClick={() => setPlaying(true)}
            >
              <Play size={28} strokeWidth={2} aria-hidden="true" />
              <span className="visually-hidden">{`Play: ${title}`}</span>
            </button>
          ) : (
            /* 沒有來源時不放一顆按了沒反應的播放鈕 */
            <p className={styles.todo} lang="zh-Hant">
              [待補：影片來源]
            </p>
          )}
        </>
      )}
    </div>
  )
}
