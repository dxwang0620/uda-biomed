# 數位醫療研發部 `/research/digital-health`

版型參考 `https://www.exo-one.com/article.php?lang=tw&tb=2`（指定）：
**側邊章節錨點 ＋ 一路往下的圖文說明**，不是輪播式的行銷頁。
另外加上參考頁沒有的兩樣：hero 的動態背景與可播放的影片區塊。

## 區塊

| # | id | 標題 | 狀態 |
| - | -- | --- | --- |
| — | — | Hero（滿版圖 ＋ 標題） | 圖到位，**動態背景待補** |
| 1 | `what` | 什麼是液態晶片 | **文案待補** |
| 2 | `how` | 運作流程（四步） | 步驟名有依據，說明待補 |
| 3 | `applications` | 應用場景（九格） | 圖到位，**九段說明待補** |
| 4 | `video` | 影片介紹 | **影片來源待補** |
| 5 | `gallery` | 圖庫 | 等後續圖片 |

## 圖片

來源 `about_img/digital_healthcare/`，轉成 `public/media/dh-*`
（main 1600px、場景 1100px，jpg＋webp，全部合計 2.7MB）。

| 檔案 | 來源 | 場景 |
| --- | --- | --- |
| `dh-main` | `main.jpg` | 晶片本體與分層結構（hero ／ 圖文並排 ／ 影片封面） |
| `dh-1` | `S__216956953_0` | 居家健康檢測・呼氣 |
| `dh-2` | `S__216956954_0` | 食品新鮮度・智慧冰箱 |
| `dh-3` | `S__216956955_0` | 隨身安全配戴 |
| `dh-4` | `S__216956956_0` | 住宅安全・瓦斯與電線 |
| `dh-5` | `S__216956957_0` | 消防救援・VOC/CO/H2S |
| `dh-6` | `S__216956958_0` | 太空艙環境 |
| `dh-7` | `S__216956959_0` | 零售場域 |
| `dh-8` | `S__216956960_0` | 居家陪伴照護 |
| `dh-9` | `S__216956961_0` | 安檢與海關 |

`main.jpg` 依指示一定要用，所以它同時擔任 hero 背景、晶片結構圖與影片封面。

## 文案狀態 `[草稿]`

依指示**用英文直接補上、不要太長**（2026-09-11）。頁面走英文，
中文以副標形式保留——這是站上既有的作法（聯絡表單、組織圖、四格數字
都是英文主標＋中文副標）。

> ⚠️ **全頁文案是我擬的草稿，需要研發部逐句校對。**

撰寫時守的界線：**只描述圖面上看得到的情境與流程**，不寫任何規格、
偵測極限、準確率、材料、開發階段、臨床用途或合作對象。

即使如此，下面這幾句仍然是**推論**，是校對時要優先確認的：

| 位置 | 我寫的 | 要確認什麼 |
| --- | --- | --- |
| The liquid chip | 「a small sensing element that a sample passes over」 | 樣本是流過、吸附、還是其他方式 |
| Built as a stack | 「sensing layer / path that carries it / contacts」 | 分層的名稱與功能是否正確 |
| How it works | 「compared against known patterns rather than read as a single value」 | 是否為圖樣比對 |
| Home safety | 「can cut power or close a gas valve on their own」 | 是否真的自動執行，或只是通報 |
| Companion care | 「connect them to a clinician」 | 是否有此功能 |
| Applications 導言 | 「the ones we are currently exploring」 | 這九個是否都在進行中 |

**有依據、不需要改寫的部分**（直接取自圖面上既有的中文標籤）：

- 流程四步：**氣味偵測 → AI 分析 → 即時警示 → 自動應變**
  （`S__216956956`／`959` 的底排；`957` 的版本是
  「嗅覺感測器 → 液態晶片分析 → 立即預警並自動通報」）
- 九個場景的名稱依圖面內容命名

### 仍然待補

1. 影片來源
2. hero 的動態背景（影片／動圖）
3. 圖庫的其餘圖片

## 技術決定

### 路由順序

`/research/digital-health` 必須排在 `/research/:slug` **之前**——
react-router 取第一個相符的路由，`:slug` 會先吃掉它。
另外兩個子頁仍走共用的 `ResearchTopic`。

### 章節錨點（`SectionNav`）

- 當前章節用 `IntersectionObserver` 判定，不用 scroll 監聽
- `rootMargin` 的上緣扣掉 header 高度：判定基準要是「露在 header 底下的那一段」，
  不然標題還被 header 蓋住時就已經被算成當前章節
- 同時有多段在畫面內時取**最靠上**的那一段，不是最後回報的那一個，
  否則快速捲動時標示會亂跳
- 桌機側欄、1024 以下收成頂部可橫向捲動的一列——六個中文章節名疊成直列
  會比它要標示的內容還高
- 區塊帶 `scroll-margin-top`，跳轉時標題會停在 header 底下而不是被蓋住

### 影片區塊（`VideoBlock`）

**預設只顯示封面圖，點了才把播放器插進 DOM。** 兩個理由：

1. 嵌入第三方播放器光是載入就會寫 cookie 並送出請求，使用者還沒表示要看
2. 自架影片一支動輒數 MB，而 GitHub Pages 每月頻寬有 100GB 軟上限

沒有來源時不放一顆按了沒反應的播放鈕，改顯示待補字樣。

### Hero

背景目前是 `dh-main` 的靜態圖。**動態背景到位後**，在 `.heroMedia` 加一支與首頁
hero 同規格的 `<video muted loop playsInline poster>`，poster 沿用現在這張，
換過去不會有中間的空白狀態。

> ⚠️ **標題的顏色必須明寫。** `global.css` 給所有 `h1`～`h4` 上了 `--color-navy`，
> 從 `.heroText` 繼承下來的白色打不過它——實測標題在淺色的晶片照片上是深藍的，
> 幾乎看不見。
