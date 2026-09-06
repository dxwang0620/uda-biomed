import styles from './Placeholder.module.css'

/**
 * 尚未有真實資料的區塊。
 *
 * CLAUDE.md 工作方式第 3 條：缺文案時用明確的 placeholder，
 * 絕對不要編造研究成果、臨床試驗階段、論文、專利、合作夥伴或任何數據。
 *
 * 刻意做得顯眼，讓它不可能被誤認成正式內容，也方便上線前用
 * `grep -r Placeholder src/` 一次找齊。
 */
export default function Placeholder({
  title,
  image,
  children,
}: {
  title: string
  /** 配圖。純裝飾，`public/media/` 下的檔名（不含副檔名） */
  image?: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.placeholder}>
      {/* 配圖與內容沒有對應關係，這一格本身就是待補的佔位，
          所以當裝飾處理、alt="" */}
      {image ? (
        <picture className={styles.media}>
          <source
            srcSet={`${import.meta.env.BASE_URL}media/${image}.webp`}
            type="image/webp"
          />
          <img
            src={`${import.meta.env.BASE_URL}media/${image}.jpg`}
            alt=""
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
          />
        </picture>
      ) : null}

      <p className={styles.tag}>To add</p>
      <p className={styles.title}>{title}</p>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
