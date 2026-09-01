/**
 * hero 底部的波浪色帶 —— 全站簽名元素，四張設計稿都有。
 *
 * 素材是 common_img/removebackground*.png（已去背版）。
 * 仍需裁切與修邊，處理方式與量測見 docs/design-node.md。
 *
 * 原本是手繪的 SVG 路徑（座標取自 ABOUT 設計稿的 16 個取樣點），
 * 但那個版本沒有素材本身的分子與實驗器材紋理。
 *
 * 圖片是純裝飾，aria-hidden。拉伸行為（object-fit: fill）等同原先
 * SVG 的 preserveAspectRatio="none"。
 */
export default function HeroWave({ className }: { className?: string }) {
  return (
    <picture className={className} aria-hidden="true">
      <source
        srcSet={`${import.meta.env.BASE_URL}media/wave.webp`}
        type="image/webp"
      />
      <img
        src={`${import.meta.env.BASE_URL}media/wave.png`}
        alt=""
        width={959}
        height={205}
      />
    </picture>
  )
}
