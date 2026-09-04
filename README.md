# UDA BIOMED

企業形象網站。純前端靜態專案，React + Vite，建置後由 GitHub Actions 部署到 GitHub Pages。

工作規範見 [`CLAUDE.md`](./CLAUDE.md)，設計稿的色值萃取與量測依據見
[`docs/design-node.md`](./docs/design-node.md)。

---

## 開發

```bash
npm install
npm run dev      # 開發伺服器
npm run build    # tsc -b && vite build → dist/
npm run preview  # 預覽建置結果（會套用 base path）
npm run lint
```

> **部署前務必跑 `npm run preview`。**
> `npm run dev` 不會重現 base path 的問題，路徑設錯只會在 preview 和正式站上出現。

### Node 版本

本機開發用 Node 18.20.8 驗過，相依鎖在 Vite 6 與 react-router-dom 6（兩者都支援 Node 18）。
CI 用 Node 20。

Node 18 已經 EOL，建議升到 20 或 22（`nvm install 22`）。升上去之後可以：

- 改用 Vite 7
- 改用 react-router-dom 7.18+，該版本修掉了目前 `npm audit` 會報的兩則 advisory
  （見下方「已知的 audit 警告」）

---

## 部署

### base path —— 唯一切換點

部署路徑只在 **`vite.config.ts` 的 `BASE` 常數**設定一處。
router 的 `basename` 由 `src/config/site.ts` 從 `import.meta.env.BASE_URL` 推導，
不需要也不應該另外設定，所以兩者不可能對不上。

| 情況 | `BASE` |
| --- | --- |
| 一般 repo（如 `uda-biomed`） | `'/uda-biomed/'` ← 目前設定 |
| 自訂網域（如 `uda-biomed.com`） | `'/'` |
| `<帳號>.github.io` repo | `'/'` |

設錯的症狀是部署後畫面全白、CSS 與 JS 全部 404。

若改用自訂網域，還要把 `CNAME` 檔放進 `public/`，否則每次部署都會被清掉。

### SPA 路由

GitHub Pages 沒有 SPA fallback，直接開 `/about` 或重新整理會拿到 404。
**不使用 HashRouter**（形象網站的網址會出現在名片與搜尋結果上）。

兩層處理：

1. **每個路由產生實體 `index.html`**（`scripts/prerender-routes.mjs`，已掛在 `npm run build`）。
   只靠 404.html 的話畫面雖然正確，**狀態碼卻是 404**，搜尋引擎會把 `/about`
   這類網址當成不存在——那樣就失去不用 HashRouter 的意義了。
   產生 `dist/about/index.html` 之後 Pages 會以 200 回應。
   路由清單直接從 `src/config/site.ts` 取，不另記一份。
2. **`404.html`**（workflow 在 build 後複製），處理真正不存在的路徑。

### 額度

發布站台上限 1GB，每月頻寬軟上限 100GB。影片是最耗頻寬的資產，這是把它壓到
5MB 以下的主因。若之後流量變大，把 `public/media/` 的影片移到 Cloudflare R2 之類的外部空間。

---

## 首頁背景影片

原始檔在 `background_video/`，**不進版控也不修改**（見 `.gitignore`）。
`public/media/` 下的三個檔案是由它轉出來的產物。

原始檔規格：`1270×720`、8 秒、24fps、H.264 2.06 Mbps、含 AAC 音軌、2.15 MB。

**轉檔時裁掉底部 60px**（輸出 `1270×660`）：原始檔右下角有 Veo 生成浮水印，
全片掃描確認範圍是 `x 1200–1238, y 671–686`。裁切比用 CSS 放大好——
影片只有 720p，在 1440 寬的視窗上本來就在放大，再疊一層縮放只會更糊。

> `CLAUDE.md` 要求 1920×1080，但原始檔只有 720p，**無法無損放大**，故維持原解析度。
> 三個產物合計約 1.5 MB，遠低於 5 MB 上限。

**手機也播放影片**：`CLAUDE.md` 原本要求「768px 以下不載入影片」，依後續指示改為
所有寬度都播。代價是每個手機訪客多約 616KB（webm）流量。
要改回去，在 `src/hooks/useHeroVideoEnabled.ts` 的 `allowed()` 加回
`window.matchMedia('(min-width: 768px)').matches` 即可。

`prefers-reduced-motion: reduce` 時仍然不載入影片，只顯示 poster。

### 轉檔指令

```bash
SRC="background_video/809605740.118819.mp4"

# H.264 mp4 —— 主要來源
#   -an              去掉音軌（自動播放的影片不需要，也省頻寬）
#   -crf 26          品質／體積的平衡點，數字越大檔越小
#   -preset slow     多花編碼時間換較小的檔案
#   -pix_fmt yuv420p Safari 與舊裝置的相容性要求
#   -movflags +faststart  把 moov atom 移到檔頭，讓瀏覽器邊下載邊播
ffmpeg -y -i "$SRC" -vf "crop=1270:660:0:0" -an -c:v libx264 -profile:v high -crf 26 -preset slow \
  -pix_fmt yuv420p -movflags +faststart public/media/hero.mp4

# VP9 webm —— 支援的瀏覽器會優先取用，同畫質下比 mp4 小
#   -b:v 0           搭配 -crf 啟用 constant quality 模式，缺這個 crf 不會生效
#   -row-mt 1        開啟 row-based 多執行緒，加快編碼
ffmpeg -y -i "$SRC" -vf "crop=1270:660:0:0" -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 \
  -pix_fmt yuv420p public/media/hero.webm

# poster —— 取第 1 秒的畫格
#   影片載入前、載入失敗、以及 prefers-reduced-motion 時都靠它撐場
ffmpeg -y -ss 1 -i "$SRC" -vf "crop=1270:660:0:0" -frames:v 1 -q:v 4 public/media/hero-poster.jpg
```

產出：

| 檔案 | 大小 |
| --- | --- |
| `hero.mp4` | 689 KB |
| `hero.webm` | 616 KB |
| `hero-poster.jpg` | 57 KB |

驗證產物確實沒有音軌：

```bash
ffprobe -v error -show_entries stream=codec_type -of csv=p=0 public/media/hero.mp4
# 應該只印出一行 video
```

---

## 內頁與卡片照片

原始檔在 `web_img/`（內頁 hero）與 `index_img/`（研發重點三張卡）。
**兩個資料夾都不要動**，轉檔輸出到 `public/media/`。

研發重點卡片照片（`card1-1.jpg`～`card3-1.jpg` → `focus-1`～`focus-3`）：

```bash
# scale='min(1400,iw)':-2
#   min(1400,iw)  最寬 1400，比這窄的原圖不放大——放大只會變糊又變大
#   -2            高度依比例，並取偶數（部分編碼器要求偶數尺寸）
#   flags=lanczos 縮圖用的重取樣演算法，比預設的 bicubic 銳利
for n in 1 2 3; do
  ffmpeg -y -i "index_img/card$n-1.jpg" -vf "scale='min(1400,iw)':-2:flags=lanczos" \
    -q:v 4 "public/media/focus-$n.jpg"
  ffmpeg -y -i "index_img/card$n-1.jpg" -vf "scale='min(1400,iw)':-2:flags=lanczos" \
    -q:v 78 "public/media/focus-$n.webp"
done
```

產出：

| 檔案 | jpg | webp |
| --- | --- | --- |
| `focus-1` | 91 KB | 58 KB |
| `focus-2` | 98 KB | 61 KB |
| `focus-3` | 99 KB | 64 KB |

`<picture>` 先給 webp、再退回 jpg，兩份都要留——webp 的支援度雖然夠，
但 jpg 是那個「一定不會出事」的退路。

---

## 已知的 audit 警告

`npm audit` 會回報 react-router 的兩則 moderate advisory：

1. **SSR hydration 的 `deserializeErrors()` constructor injection** —— 本專案是純靜態 SPA，
   沒有 SSR，不適用。
2. **`<Link>` / `useNavigate` 的反斜線 open redirect** —— 本專案所有導覽目標都是
   `src/config/site.ts` 裡寫死的內部路徑，沒有任何使用者可控的導向，不適用。

修掉的版本是 react-router-dom 7.18+，但它要求 Node ≥ 20。v6 沒有修補版。
**不要跑 `npm audit fix --force`**，它會把你降到 react-router-dom 5，那是重大的 API 倒退。

要清掉這兩則警告，正解是升級 Node 到 20/22 後改用 react-router-dom 7。

---

## 專案結構

```
public/
  .nojekyll            避免 GitHub 用 Jekyll 處理產物
  favicon.svg
  media/               影片轉檔產物（進版控）
src/
  config/site.ts       站台常數、導覽項目、router basename 推導
  styles/
    tokens.css         設計 token，色值全部取樣自 web_img/
    global.css         reset、容器、focus 樣式、reduced-motion
  components/          共用元件
  pages/               六個頁面 + 404
docs/design-node.md    設計稿萃取紀錄與量測依據
web_img/               設計稿參考素材（不修改）
background_video/      影片原始檔（不進版控、不修改）
```
