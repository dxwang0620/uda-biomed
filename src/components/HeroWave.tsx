/**
 * hero 底部的 navy 波浪色帶 —— 全站簽名元素，四張設計稿都有。
 *
 * 路徑不是手捏的：座標取自 ABOUT 頁設計稿實測的 16 個取樣點
 * （見 docs/design-node.md「波浪色帶」），再用 Catmull-Rom 轉 cubic bezier
 * 通過每一點。形狀為左薄右厚，右端急揚。
 *
 * preserveAspectRatio="none" 讓它隨容器寬度拉伸，維持「貼齊底部」的行為。
 */

const WAVE_PATH =
  'M 0,226 C 16,227.8 64,233.3 96,237 C 128,240.7 160,245.2 192,248 ' +
  'C 224,250.8 256,252.7 288,254 C 320,255.3 352,256 384,256 ' +
  'C 416,256 448,255 480,254 C 512,253 544,251.8 576,250 ' +
  'C 608,248.2 640,245.5 672,243 C 704,240.5 736,237.8 768,235 ' +
  'C 800,232.2 832,229.5 864,226 C 896,222.5 928,218.8 960,214 ' +
  'C 992,209.2 1024,202 1056,197 C 1088,192 1120,189.3 1152,184 ' +
  'C 1184,178.7 1200,187.3 1248,165 C 1296,142.7 1392,75.8 1440,50 ' +
  'C 1488,24.2 1520,16.7 1536,10 L 1536,293 L 0,293 Z'

export default function HeroWave({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1536 293"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={WAVE_PATH} fill="var(--color-navy)" />
    </svg>
  )
}
