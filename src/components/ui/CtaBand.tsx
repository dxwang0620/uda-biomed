import Button from './Button.tsx'
import { CTA } from '../../config/site.ts'
import styles from './CtaBand.module.css'

/**
 * 頁尾前的深藍 CTA 區塊。規格與各頁引導句見 docs/content-partnerwithus.md。
 *
 * 按鈕用 onDarkSolid（白底深藍字）。navy 底上白鈕面的邊界對比 12.94:1，
 * 實心藍鈕在這裡會幾乎融進背景。
 *
 * 引導句逐頁不同，避免整站重複同一句。
 */
export default function CtaBand({
  title,
  body,
  titleId,
}: {
  title: string
  body: string
  titleId: string
}) {
  return (
    <section className={`${styles.band} on-navy`} aria-labelledby={titleId}>
      <div className={`container ${styles.inner}`}>
        <div>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <p className={styles.body}>{body}</p>
        </div>
        <Button to={CTA.to} variant="onDarkSolid">
          {CTA.label}
        </Button>
      </div>
    </section>
  )
}
