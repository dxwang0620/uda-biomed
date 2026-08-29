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
`.github/workflows/deploy.yml` 在 build 後把 `dist/index.html` 複製成 `dist/404.html`
來解決，並產生 `.nojekyll`。**不使用 HashRouter**（形象網站的網址會出現在名片與搜尋結果上）。

### 額度

發布站台上限 1GB，每月頻寬軟上限 100GB。影片是最耗頻寬的資產，這是把它壓到
5MB 以下的主因。若之後流量變大，把 `public/media/` 的影片移到 Cloudflare R2 之類的外部空間。

---

## 首頁背景影片

原始檔在 `background_video/`，**不進版控也不修改**（見 `.gitignore`）。
`public/media/` 下的三個檔案是由它轉出來的產物。

原始檔規格：`1270×720`、8 秒、24fps、H.264 2.06 Mbps、含 AAC 音軌、2.15 MB。

> `CLAUDE.md` 要求 1920×1080，但原始檔只有 720p，**無法無損放大**，故維持原解析度。
> 三個產物合計約 1.5 MB，遠低於 5 MB 上限。

### 轉檔指令

```bash
SRC="background_video/809605740.118819.mp4"

# H.264 mp4 —— 主要來源
#   -an              去掉音軌（自動播放的影片不需要，也省頻寬）
#   -crf 26          品質／體積的平衡點，數字越大檔越小
#   -preset slow     多花編碼時間換較小的檔案
#   -pix_fmt yuv420p Safari 與舊裝置的相容性要求
#   -movflags +faststart  把 moov atom 移到檔頭，讓瀏覽器邊下載邊播
ffmpeg -y -i "$SRC" -an -c:v libx264 -profile:v high -crf 26 -preset slow \
  -pix_fmt yuv420p -movflags +faststart public/media/hero.mp4

# VP9 webm —— 支援的瀏覽器會優先取用，同畫質下比 mp4 小
#   -b:v 0           搭配 -crf 啟用 constant quality 模式，缺這個 crf 不會生效
#   -row-mt 1        開啟 row-based 多執行緒，加快編碼
ffmpeg -y -i "$SRC" -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 \
  -pix_fmt yuv420p public/media/hero.webm

# poster —— 取第 1 秒的畫格
#   影片載入前、載入失敗、768px 以下、以及 prefers-reduced-motion 時都靠它撐場
ffmpeg -y -ss 1 -i "$SRC" -frames:v 1 -q:v 4 public/media/hero-poster.jpg
```

產出：

| 檔案 | 大小 |
| --- | --- |
| `hero.mp4` | 761 KB |
| `hero.webm` | 687 KB |
| `hero-poster.jpg` | 63 KB |

驗證產物確實沒有音軌：

```bash
ffprobe -v error -show_entries stream=codec_type -of csv=p=0 public/media/hero.mp4
# 應該只印出一行 video
```

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
