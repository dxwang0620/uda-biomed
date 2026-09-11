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
 * 來源可以是 YouTube/Vimeo 的 embed 網址，也可以是站內的檔名
 * （不含副檔名，會自動組出 webm + mp4 兩個 source）。
 * 兩者都沒給時顯示待補狀態，不放一顆按了沒反應的播放鈕。
 */

export default function VideoBlock({
  /** YouTube/Vimeo 的 embed 網址，或 public/media 下的檔名（不含副檔名）。 */
  src,
  /** 封面圖檔名（public/media 下，不含副檔名） */
  poster,
  title,
  /** 播放框的比例。預設 16/9；方形的素材傳 '1 / 1'。 */
  aspect = '16 / 9',
}: {
  src?: string
  poster: string
  title: string
  aspect?: string
}) {
  const [playing, setPlaying] = useState(false)
  const isEmbed = src?.startsWith('http')

  return (
    <div
      className={styles.frame}
      style={{ '--aspect': aspect } as React.CSSProperties}
    >
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
          /* 自架影片。webm 排前面、mp4 墊底，瀏覽器取第一個支援的。
             這支是純視覺的產品動畫、沒有語音，所以沒有字幕軌。 */
          <video className={styles.player} controls autoPlay playsInline>
            <source
              src={`${import.meta.env.BASE_URL}media/${src}.webm`}
              type="video/webm"
            />
            <source
              src={`${import.meta.env.BASE_URL}media/${src}.mp4`}
              type="video/mp4"
            />
          </video>
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
              width={720}
              height={720}
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
