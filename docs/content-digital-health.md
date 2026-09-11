# 數位醫療研發部 `/research/digital-health`

版型參考 `https://www.exo-one.com/article.php?lang=tw&tb=2`（指定）：
**側邊章節錨點 ＋ 一路往下的圖文說明**，不是輪播式的行銷頁。
另外加上參考頁沒有的兩樣：hero 的動態背景與可播放的影片區塊。

## 區塊

| # | id | 標題 | 狀態 |
| - | -- | --- | --- |
| — | — | Hero（動態背景 ＋ 標題） | 完成 |
| 1 | `what` | AFL System | **文案由你提供，已翻成英文** |
| 2 | `how` | 運作流程（四步） | 步驟名有依據，說明待補 |
| 3 | `applications` | 應用場景（九格） | 圖到位，**九段說明待補** |
| 4 | `video` | 影片介紹 | **影片來源待補** |

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

1. 影片區塊的影片來源

（圖庫區塊依指示刪除；hero 的動態背景已完成，2026-09-11。）

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

## 窄螢幕溢出：`.layout` 的格線欄要夾成 minmax(0, 1fr)

回報「小尺寸爆版」。**實測 375px 視窗下整個內容欄是 558px**，整片往右溢出。

原因是 `.layout` 只寫了 `display: grid` 沒寫 `grid-template-columns`——
格線欄預設是 `auto`，會被項目的 min-content 撐開。撐開它的是側邊目錄：
那一列在窄螢幕是橫向排列的五個連結，自然寬度約 558px。`.list` 雖然有
`overflow-x: auto`，但它是格線項目 `.nav` 的**子孫**，撐開欄位的是 `.nav`。

修法兩條一起：

```css
.layout {
  grid-template-columns: minmax(0, 1fr);  /* 欄寬由容器決定 */
}
.body,
.layout > nav {
  min-width: 0;                            /* 兩個項目都要能縮 */
}
```

修完實測：欄寬 339（= 371 視窗扣掉左右留白）、`.body` 339、頁面沒有橫向捲軸。
目錄那一列仍然可以橫向捲（clientWidth 339 / scrollWidth 558），那是刻意的。

> 這個坑在 `Home.module.css` 已經寫過一次（「minmax(0, …) 不能省」），
> 但那邊是兩欄、這邊是單欄，單欄時更容易以為不必指定 `grid-template-columns`。
> **寫 `display: grid` 就把 `grid-template-columns` 一起寫掉。**

### 怎麼驗的

這個環境的瀏覽器視窗調不動（`resize_window` 有回應但 `innerWidth` 不變），
所以改用**在頁面裡塞一個 375px 寬的 iframe 指向同一個路徑**——iframe 內的
media query 依 iframe 寬度判定，是真實的窄螢幕排版，不必動視窗。
之後要驗 RWD 都可以用這招。

## 應用場景圖在窄螢幕縮小

依指示縮小（2026-09-11）。一欄時圖原本吃滿 339px 寬、254 高，九張疊起來要捲很久。
`.sceneMedia` 在 640 以下加 `max-width: 15rem`（實測 **240×180**），
640 以上解除（兩欄以上時欄寬本來就不大）。

**用限寬而不是改成更扁的比例**：這幾張是多格拼貼的密集圖，改比例會把上下的
小圖裁掉；限寬則是整張等比縮小，畫面內容還看得出來。

縮小之後**置中**（`margin-inline: auto`，指定）——靠左會在右邊留一條空白，
看起來像沒排好。實測 375px 下左右各留 50px。

**文字也一起置中**（指定）：圖既然置中，標題與說明靠左會跟圖對不起來。
說明文字同時限寬到 `34ch`（實測 300px）並讓區塊本身置中——**置中的段落
一定要收窄行寬**，不然每一行的起點都不同，讀起來很吃力。

640 以上（兩欄／三欄）以上全部解除：圖吃滿欄寬，文字靠左才對得齊。

## Hero 的動態背景

來源 `about_img/digital_healthcare/810822800.495871.mp4`（960×720、12.6s、3.0MB、含音軌），
內容是人體透視動畫，由全身推近到心臟。

### 轉檔

```
CROP="crop=896:658:64:62"

# 去背景音、裁掉左上角浮水印、mp4（H.264）
ffmpeg -i <src> -an -vf "$CROP" -c:v libx264 -profile:v high -crf 26 \
  -preset slow -pix_fmt yuv420p -movflags +faststart public/media/dh-hero.mp4

# webm（VP9）
ffmpeg -i <src> -an -vf "$CROP" -c:v libvpx-vp9 -crf 44 -b:v 0 \
  -row-mt 1 -deadline good -cpu-used 1 public/media/dh-hero.webm

# 封面圖（第 6 秒）
ffmpeg -ss 6 -i <src> -vf "$CROP" -frames:v 1 -q:v 4 public/media/dh-hero-poster.jpg
```

| 檔案 | 大小 |
| --- | --- |
| `dh-hero.webm` | 1.04 MB |
| `dh-hero.mp4` | 1.67 MB |
| `dh-hero-poster.jpg` | 64 KB |

瀏覽器只會取其中一支（`<source>` 依序，Chrome／Firefox 取 webm、Safari 取 mp4）。

> **VP9 的 CRF 要調過。** 第一次用 crf 36 出來是 1.8MB，**比 mp4 還大**，
> 而 webm 排在前面、Chrome 會優先取它——等於讓多數訪客下載比較大的那一支。
> 改成 crf 44 之後是 1.04MB，抽格比對畫質沒有可見差異（心臟的血管細節仍清楚）。

### 裁切浮水印

原片左上角有一個浮水印，位置實測在 x 33～60、y 32～57。
`crop=896:658:64:62` 從 (64, 62) 起裁，完整切掉且留有餘裕。
主體置中，裁掉左上角不影響構圖——這支是滿版背景，本來就會被 `object-fit: cover` 再裁一次。

### 調淺

依指示調淺。原片很暗（深藍底），用 CSS filter 而不是在轉檔時燒進去，
之後要調不必重新轉檔：

```css
filter: brightness(1.45) saturate(0.95) contrast(1.05);
```

**亮度與對比要一起動**：只拉亮度會讓暗部整片浮灰，對比補回來才看得出人形的線條。

> ⚠️ **遮罩必須是獨立的一層（`.heroScrim`），不能用影片的 `::after`。**
> `filter` 會連同偽元素一起作用，把遮罩也調亮，等於自己抵銷掉。

文字對比：標題落在 hero 底部 29% 處，該處遮罩合成濃度 0.889。
即使影片在那裡是純白（調亮後的最差情況），白字仍有 **13.05:1**。

`prefers-reduced-motion: reduce` 時影片 `display: none`，改用 poster 當背景圖。

## AFL System 那一段：你提供的文案

2026-09-11 收到正式文案，取代我原先擬的「液態晶片」草稿。
`[抄錄＋翻譯]`——**英文是我翻的，需要校對**。

### 中文原文

> AFL SYSTEM「嗅覺語言感測晶片」
> AI Flair Language：AFL 系統
> 讓氣味，成為可被理解的數據。
>
> 人類無法看見氣味。
> 但許多物質在進入空氣後，都會留下獨特的揮發性化學訊號。
> AFL System 將「嗅覺」轉化為數據。
>
> 透過新型感測架構、訊號分析與人工智慧模型，AFL 嘗試建立一套能夠感知、
> 辨識與分析環境氣味特徵的智慧嗅覺系統。
>
> 感知看不見的變化，許多環境中的重要資訊，並不以影像或聲音存在。

### 英文對照（頁面上用的）

| 中文 | 英文 | 放在哪 |
| --- | --- | --- |
| 讓氣味，成為可被理解的數據。 | Turning scent into data that can be understood. | hero 的一句話 |
| AFL SYSTEM「嗅覺語言感測晶片」／ AI Flair Language | AFL System ／ AI Flair Language ／ 嗅覺語言感測晶片 | 區塊標題與副標 |
| 人類無法看見氣味。 | Humans cannot see scent. | 放大的引言 |
| 但許多物質…／AFL System 將「嗅覺」轉化為數據。 | But many substances, once they enter the air, leave behind a distinctive volatile chemical signal. AFL System turns the sense of smell into data. | 第一段 |
| 透過新型感測架構…智慧嗅覺系統。 | Through a new sensing architecture, signal analysis and artificial intelligence models, AFL sets out to build an intelligent olfactory system — one that can sense, identify and analyse the scent characteristics of an environment. | 第二段 |
| 感知看不見的變化／許多環境中的重要資訊，並不以影像或聲音存在。 | Sensing what cannot be seen ／ Much of the important information in an environment exists neither as an image nor as a sound. | 圖文並排的右欄 |

翻譯上的兩個選擇，請一併確認：

- **「嘗試建立」翻成 `sets out to build`**，不是 `attempts to`——後者在英文裡帶
  「試過但不一定成功」的味道。若原意就是要保留不確定性，改用 `is working toward`。
- **「智慧嗅覺系統」翻成 `intelligent olfactory system`**。`olfactory` 是醫學用詞，
  若對象偏一般大眾，`sense of smell` 會更好讀。

### 名稱的分歧

正式名稱是 **AFL System ／ 嗅覺語言感測晶片**，但圖面上（`S__216956957` 等）
寫的是「**液態晶片**分析」。頁面現在一律用 AFL System，圖面的字沒有改。
兩者若是同一個東西的不同說法，請確認對外要統一用哪一個。

### 仍是我擬的部分

`How it works` 的導言、四步的說明、`Applications` 的導言與九段場景說明
**仍然是我寫的草稿**，校對清單見上面的〈文案狀態〉。
