# CLAUDE.md

這份文件是本專案的工作規範。每次 session 開始時請先讀完，開發過程中依此執行。

---

## 專案概述

**UDA BIOMED** 企業形象網站。純前端靜態專案，以 React 開發，建置後部署到 GitHub Pages。

- **性質**：形象展示為主，無後端、無會員、無資料庫
- **產業**：生醫（biomedical）
- **視覺主軸**：藍白配色，實際色值取自 `web_img/`
- **必須支援**：RWD（手機、平板、桌機）
- **首頁**：全幅背景影片
- **部署**：GitHub Pages + GitHub Actions

---

## 待確認事項

以下若未提供，請先問我，不要自行假設：

- [ ] Logo 檔案（有無向量圖？或 wordmark 直接用字體排？）
- [ ] GitHub repo 名稱與是否使用自訂網域（影響 Vite base path，見「部署」）
- [ ] 是否需要中英雙語
- [ ] 各頁實際文案與圖片

---

## 參考素材

### `web_img/`

參考網頁設計稿與素材。**動手寫任何 code 之前，先讀完這個資料夾**，並輸出一份萃取結果給我確認：

- **色票**：從圖中實際取樣 hex 值，列出主藍、深藍、輔助藍、背景灰白、文字色。不要憑「藍白」兩個字自行發揮
- 版面結構（幾欄、留白比例、區塊順序）
- 字級層級與字重
- 圓角、陰影、邊框等細節慣例
- 元件樣式（按鈕、卡片、導覽列、表單）

下方「設計 Token」中的色值是**佔位用的暫定值**，必須以 `web_img/` 萃取結果覆蓋後才開始寫元件。

### `background_video/`

首頁 hero 區的背景影片原始檔。

- **不要修改或刪除這個資料夾內的原始檔**
- 壓縮或轉檔的輸出放到 `public/media/`，原始檔不動

---

## 技術選型

| 項目     | 選擇                            | 說明                                 |
| -------- | ------------------------------- | ------------------------------------ |
| 建置工具 | Vite                            | 靜態輸出                             |
| 框架     | React 19 + TypeScript           |                                      |
| 路由     | react-router                    | 見「部署」的 GitHub Pages 注意事項   |
| 樣式     | CSS Modules + CSS 變數          | Token 集中在 `src/styles/tokens.css` |
| 圖示     | lucide-react                    |                                      |
| 動畫     | CSS transition / animation 為主 | 要引入函式庫先問過我                 |

不要在未討論的情況下加入額外相依套件。每新增一個 dependency，說明為什麼標準做法不夠用。

---

## 頁面結構

```
/               首頁 — hero 背景影片 + 核心訊息 + 各區塊摘要 + CTA
/about          ABOUT — 公司簡介、理念、團隊
/research       RESEARCH — 研究方向、發表、臨床進展
/technology     TECHNOLOGY — 核心技術與平台
/partnerships   PARTNERSHIPS — 合作模式、既有夥伴
/contact        CONTACT — 聯絡資訊 + 表單
```

`PARTNER WITH US` 是行動呼籲（CTA），不是獨立頁面，指向 `/contact`（或 `/partnerships` 底部的表單錨點，實作前確認）。

聯絡表單無後端。GitHub Pages 不能跑伺服器端程式，所以走 Formspree 這類第三方服務或純 `mailto:`，實作前確認要哪一種。

---

## Header 規格

固定於頁面頂端（sticky）。

### 左側 — Wordmark

```
UDA
UDA BIOMED
```

- 上排 `UDA` 為主標，字重 700–800，字級約 `1.5rem`（桌機）
- 下排 `UDA BIOMED` 為小標，字級約 `0.6875rem`，字重 500，**字距放寬至 `0.18em`**，顏色降一階（主色的 70% 或 `--color-text-muted`）
- 兩行左對齊，整體行高收緊（`line-height: 1.1`），視覺上是一個單位
- 整塊是連往 `/` 的連結，`aria-label="UDA BIOMED 首頁"`

### 右側 — 導覽

```
ABOUT   RESEARCH   TECHNOLOGY   PARTNERSHIPS   CONTACT   [ PARTNER WITH US ]
```

- 連結全大寫，字級 `0.8125rem`，字重 500，字距 `0.08em`
- `PARTNER WITH US` 是**實心按鈕**，不是文字連結：藍底白字、圓角 `--radius`，與前面的連結之間留 `--space-3` 以上的間距，讓它在視覺上脫離導覽列表
- 目前所在頁面加狀態標記（底部 2px 線或色彩加深），並設 `aria-current="page"`

### 行為

- 在首頁 hero 影片範圍內：header 背景透明、文字白色、CTA 按鈕改為白色外框透明底
- 捲動超過 hero 後：轉為白底、底部 1px `--color-border`、文字轉深藍。用 IntersectionObserver 觀察 hero 元素，不要用未節流的 scroll 監聽
- 其他頁面一律白底樣式
- 狀態切換加 `transition`，並在 `prefers-reduced-motion: reduce` 時移除

### RWD

- **1024px 以下收成漢堡選單**（6 個項目在平板寬度排不開，不要硬擠）
- 選單開啟時鎖住 body 捲動、Esc 可關閉、焦點鎖在選單內、關閉後焦點回到漢堡按鈕
- 展開的選單中，`PARTNER WITH US` 放在最下方，維持按鈕樣式並拉滿寬度
- header 高度：桌機 80px、手機 64px

---

## 設計 Token

**以下色值為佔位，請用 `web_img/` 萃取出的實際色值取代後再開始寫元件。**

```css
:root {
  /* 藍 — 主色階（暫定，待取樣覆蓋） */
  --color-navy: #0a2540;
  --color-primary: #1b4f9c;
  --color-primary-600: #16407f;
  --color-accent: #3b82c4;
  --color-tint: #eef4fb;

  /* 白與灰 */
  --color-white: #ffffff;
  --color-surface: #f7f9fc;
  --color-border: #dde5ef;
  --color-text: #16202e;
  --color-text-muted: #5a6b80;

  /* 字體 */
  --font-display: "Noto Sans TC", system-ui, sans-serif;
  --font-body: "Noto Sans TC", system-ui, sans-serif;
  --font-latin: "Inter", sans-serif; /* 導覽列、wordmark、數字 */

  /* 字級 */
  --text-hero: clamp(2rem, 5vw, 3.75rem);
  --text-h1: clamp(1.75rem, 3.5vw, 2.75rem);
  --text-h2: clamp(1.375rem, 2.5vw, 1.875rem);
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-nav: 0.8125rem;

  /* 間距 8px 基準 */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-6: 3rem;
  --space-8: 4rem;
  --space-12: 6rem;

  --radius: 8px;
  --radius-lg: 16px;
  --container: 1200px;
  --header-h: 80px;
  --shadow-card: 0 2px 12px rgba(10, 37, 64, 0.08);
}
```

規則：

- **所有顏色一律走 CSS 變數**，元件內不寫死 hex
- 導覽列與 wordmark 為全英文，用 `--font-latin`；中文內容用 `--font-body`
- 中文標題加 `letter-spacing: 0.02em`，內文行高 `1.75`
- 藍白配色容易顯得單薄，靠**留白節奏與區塊底色交錯**（白 / `--color-tint` / `--color-navy`）建立層次，不要靠加陰影或漸層補救

---

## RWD 規範

Mobile-first，先寫手機樣式，再用 `min-width` 往上加。

```css
/* 手機 base（無 media query） */
@media (min-width: 768px) {
  /* 平板 */
}
@media (min-width: 1024px) {
  /* 導覽列展開為完整橫列 */
}
@media (min-width: 1440px) {
  /* 大桌機 */
}
```

- 內容容器 `max-width: var(--container)`，左右 padding 手機 `--space-2`、桌機 `--space-4`
- 圖片一律 `max-width: 100%`，並標上 `width` / `height` 屬性避免 CLS
- 觸控目標最小 44×44px
- 每完成一個區塊，用 375 / 768 / 1440 三個寬度檢查一次

---

## 首頁背景影片

```jsx
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/media/hero-poster.jpg"
  aria-hidden="true"
/>
```

- `muted` 與 `playsInline` 缺一不可，否則 iOS Safari 不會自動播放
- **必備 poster 圖**：影片載入前、載入失敗、行動裝置皆靠它撐場
- **所有寬度都載入影片**，手機也播（原本訂為 768px 以下只顯示 poster，後來改掉）
  - 代價是每個手機訪客多約 616KB。要改回去，在 `src/hooks/useHeroVideoEnabled.ts`
    的 `allowed()` 加回 `window.matchMedia('(min-width: 768px)').matches`
- **`prefers-reduced-motion: reduce` 時不播放**，顯示 poster 靜態圖
- 影片上覆蓋遮罩，確保白色文字與透明 header 的導覽文字對比度達 WCAG AA 4.5:1。做完實測，不要目測
  - 原訂 `--color-navy` 55%–65%，但實測不合格：影片文字區存在純白畫面（相對亮度 1.000），
    55% 只有 3.42:1、65% 也才 4.54:1，達 AA 的臨界值是 64.7%
  - 現況：hero 標題用局部橢圓漸層（`0.72/0.56`），header 用由左至右的漸層（`0.95/0.82/0.60`）
  - 量測方法與各處數值見 `docs/design-node.md`
- 影片為純裝飾，`aria-hidden="true"`，不放任何靠影片才能理解的資訊
- 文字與 CTA 放獨立圖層，`z-index` 高於影片與遮罩

編碼規格：

- 輸出 `.mp4`（H.264）與 `.webm`（VP9），用 `<source>` 依序提供
- 1920×1080，去掉音軌
- **目標檔案 5MB 以下**。這對 GitHub Pages 特別重要，見下方頻寬說明
- ffmpeg 指令與參數寫進 `README.md`

---

## 部署（GitHub Pages）

### Base path

這是 Vite + GitHub Pages 最常出錯的地方，設定前先確認 repo 形態：

| 情況                            | `vite.config.ts` 的 `base` | router `basename` |
| ------------------------------- | -------------------------- | ----------------- |
| 自訂網域（如 `uda-biomed.com`） | `'/'`                      | 不需要            |
| `<帳號>.github.io` repo         | `'/'`                      | 不需要            |
| 一般 repo（如 `uda-website`）   | `'/uda-website/'`          | `'/uda-website'`  |

設錯的症狀是部署後畫面全白、CSS 與 JS 都 404。

### SPA 路由

GitHub Pages 沒有 SPA fallback，直接開 `/about` 或重新整理會拿到 404。

- **採用 `404.html` 方案**：build 後把 `dist/index.html` 複製一份為 `dist/404.html`，寫進 GitHub Actions workflow
- 不要改用 HashRouter。形象網站的網址會出現在名片、簡報和搜尋結果上，`/#/about` 這種形式不適合，SEO 也較差

### 其他必要設定

- 產出目錄放 `.nojekyll` 空檔，否則 GitHub 會忽略 `_` 開頭的檔案（Vite 有時會產生）
- 用 GitHub Actions workflow 建置並部署（`actions/deploy-pages`），不要用 `gh-pages` 分支手動推
- 使用自訂 Actions workflow 時，不受每小時 10 次建置的限制
- 若設定自訂網域，`CNAME` 檔要放進 build 產物，否則每次部署都會被清掉

### 額度與政策

- 發布的站台**上限 1GB**，來源 repo 建議也在 1GB 以內
- **每月頻寬軟上限 100GB**。影片是最耗頻寬的資產，這是把它壓到 5MB 以下的主因；若之後流量變大，把影片移到 Cloudflare R2 之類的外部空間
- 部署超過 10 分鐘會逾時
- GitHub 的使用政策**不允許**把 Pages 當成經營線上業務、電商或 SaaS 的免費主機。純資訊展示的形象網站不在此列，但如果之後要加購物車、金流或線上預約，就得換到 Cloudflare Pages 或 Netlify

---

## Git

### `.gitignore`

```
node_modules/
dist/
.DS_Store
*.local
.env
.env.*
!.env.example
.vscode/*
!.vscode/extensions.json

# 影片原始檔不進版控，只收壓縮後的 public/media/
background_video/
```

### 檔案大小

- GitHub 單一檔案上限 100MB，超過 50MB 會出現警告
- 影片壓到 5MB 以下就直接進 repo，不需要 Git LFS
- 若有超過 50MB 的檔案非進版控不可，先跟我討論

### Commit

採 Conventional Commits，訊息用英文：

```
feat: add sticky header with transparent hero state
fix: correct vite base path for github pages
chore: compress hero video to 4.2MB
```

- **每完成一個可獨立驗證的區塊就 commit 一次**，不要累積一大包
- 每次 commit 前跑 `npm run build` 確認建置沒壞
- 不要用 `git add .`，逐一確認要進版控的檔案
- 未經我同意不要 `git push --force`、不要改寫已推送的歷史

### 分支

`main` 保持可部署狀態（推上去就會觸發部署），新功能開 `feat/xxx` 分支。

---

## 開發指令

```bash
npm run dev      # 開發伺服器
npm run build    # 建置到 dist/
npm run preview  # 預覽建置結果（會用到 base path，部署前務必跑過）
npm run lint
```

---

## 品質底線

每個區塊完成時自我檢查：

- [ ] 鍵盤可完整操作，focus 樣式清晰可見（不要 `outline: none` 了事）
- [ ] 所有圖片有 `alt`，裝飾性圖片 `alt=""`
- [ ] 文字對比度達 WCAG AA，特別是疊在影片上的 header
- [ ] `prefers-reduced-motion` 有處理
- [ ] 375px 寬度下不出現橫向捲軸
- [ ] 語意化標籤：`<header>` `<nav>` `<main>` `<section>` `<footer>`，`<h1>` 每頁只有一個
- [ ] 有 title、description、og:image 等基本 meta
- [ ] `npm run preview` 下路徑正常，不只有 `npm run dev` 能跑

---

## 工作方式

1. **動手前先給規劃**。要新增或大幅修改檔案時，先列出檔案清單與做法，我確認後再寫。
2. **不確定就問**，不要自行決定視覺方向或補上我沒說過的內容。
3. **不要放假資料當真內容**。這是生醫公司網站，缺文案時用明確的 placeholder（如 `[待補：研究方向說明 200 字]`），**絕對不要編造研究成果、臨床試驗階段、論文、專利、合作夥伴或任何數據**。這類內容寫錯的後果比版面難看嚴重得多。
4. **一次做一件事**，做完讓我看得到結果再往下。
5. 不要動 `web_img/` 與 `background_video/` 內的檔案。
