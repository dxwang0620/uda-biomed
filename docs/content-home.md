# 首頁文案（依 index_video 參考影片重建）

> **來源**：`index_video/809571081.174303.mp4`，手機拍螢幕的錄影。
> 以下標 `[抄錄]` 的文字是我從影片最清晰的畫格逐字讀出來的，**需要你校對**——
> 錄影有摩爾紋與反光，個別字母可能誤判。
> 標 `[待補]` 的是我讀不出來、或屬於不能猜的資料（日期、數字）。

---

## Hero 輪播

共 5 張（影片裡有 5 個圓點）。錄影只拍到前兩張。

- **Eyebrow（兩張都相同）** `[抄錄]`：TECHNOLOGY & APPLICATIONS

### 第 1 張 `[抄錄]`
- **標題**：Animal Oncology & Health Research
- **內文**：Extends knowledge accumulated through human cancer research toward animal
  health, so scientific progress can also serve lives that cannot speak for themselves.

### 第 2 張 `[抄錄]`
- **標題**：Technology Licensing & Strategic Collaboration
- **內文**：From research exchange and proof of concept to co-development,
  UDA works with industry partners to advance biomedical innovation.
  > 這一段錄影較模糊，請特別校對。

### 第 3–5 張 `[草稿]`
影片捲動太快沒拍到，以下依 UDA 自述的三個公開重點（見下方核心定位）撰寫。
純描述，不含任何成果、數據、試驗期別或夥伴名稱。**待你潤稿。**

| # | Eyebrow | 標題 | 內文 |
| --- | --- | --- | --- |
| 3 | CURRENT PUBLIC FOCUS | Cancer Detection Technology | Bringing molecular recognition and analytical validation together, so that early biological signals can be observed, compared and interpreted with confidence. |
| 4 | KEY PLATFORM | UDA Biochip Technology | A miniaturized platform integrating molecular recognition, material interfaces, biosensing and data analysis for life-signal research. |
| 5 | RESEARCH FRAMEWORK | Proto-Structural Biology | UDA's original framework for reading life from atomic and molecular structure through to cellular state. |

### 按鈕（兩張共用）`[抄錄]`
- 主要：Explore Cancer Detection Technology
- 次要：Business Collaboration

> 參考網站的主要按鈕是**橘色**。你說其他都不動，所以我沿用本站既有的樣式。
> 要改橘色的話跟我說。
> 參考網站有 `Business Collaboration` 這一頁，本站沒有，我先指向 `/partnerships`。

---

## 區塊一：研發重點三張卡 `[抄錄]`

版型改為**橫向推進的三張卡** `FocusStack`，取代原本的三欄圖示卡。
版型與底色依 `index_img/card1.jpg`～`card3.jpg`，照片是 `card1-1`～`card3-1`。

### 底色（取樣自設計稿，非自行配色）

| 卡 | 底色 | 對應 |
| - | ---- | ---- |
| 01 | `#1b42a3` | Cancer Research & Detection Technology |
| 02 | `#313b87` | UDA Biochip Technology |
| 03 | `#0c132f` | Proto-Structural Biology |

02 的 `#313b87` 偏靛紫，嚴格說在專案的藍白色系之外，但稿上就是這個值，照抄。

白字疊在三張底色上的對比度（最差的是 01）：

| 元素 | 01 `#1b42a3` | 02 `#313b87` | 03 `#0c132f` |
| ---- | ----------- | ----------- | ----------- |
| 標題 白 100% | 8.92 | 9.97 | 18.26 |
| 內文 白 82% | 6.56 | 7.31 | 12.44 |
| 眉標 白 72% | 5.43 | 6.02 | 9.74 |

全部通過 AA。

### 卡片高度與照片佔比

卡片高 `clamp(32rem, 88svh, 46rem)`。上限受釘住時的可視區
（`100svh - header`，再扣掉 `.viewport` 的 `padding-block`）限制，
88svh 在各種視窗高度都塞得下，760 高的視窗實測卡 669、可視區內容 684，沒有被裁。

第一版卡片只有 74svh，照片被擠成一條：390 寬時文字塊 442px、照片只有 187px（29%）。
卡片窄、同樣的文案換行多一倍是主因。除了拉高卡片，另外在 **767 以下**把內距、
字級與各段間距整組收緊（內文 15px/1.7 → 14px/1.6、標籤縮一號、間距降一階）。

實測結果：

| 寬度 | 卡高 | 文字 | 照片 |
| --- | --- | --- | --- |
| 390 | 669 | 306–311 | 342–347（51–52%） |
| 1200 | 669 | 299–335 | 317–353（47–53%） |

三張卡都沒有內容溢出。

### 文案改成中文

依指示整組換成中文，逐字抄自 `index_img/card1.jpg`～`card3.jpg`，不是翻譯。
眉標、標題、內文、膠囊標籤全部換掉，英文不再並列。

**全站其餘部分目前是英文為主，這一區塊是例外。** 之後做雙語時要一併處理。

換成中文之後文字大幅變短（英中並列時佔卡片 73%，只剩中文之後約 45%），
照片露出從 121～172px 變成 299～355px。

### 卡片改成照片打底、文字壓在上面

指定改成「整張圖漸層、字壓在上面」，與內頁 hero 同一套語彙。
照片絕對定位鋪滿整張卡（z-index 0），`::after` 是色票漸層遮罩（z-index 1），
文字在最上層（z-index 2）。

照片**不是鋪滿整張卡**，而是貼齊下緣、用 `aspect-ratio: 5 / 4` 固定比例。

原本是 `inset: 0` 鋪滿。問題是卡片很直（手機 328×624，比例 0.52）而照片是橫的
（1102×884，比例 1.25），`object-fit: cover` 會把兩側各切掉一大塊：

| | 圖框比例 | 用到原圖 |
| - | ---- | ---- |
| 鋪滿整張卡（手機） | 0.52 | **42%** |
| 鋪滿整張卡（桌機） | 0.94 | 75% |
| 固定 5:4（兩個斷點都是） | 1.25 | **100% / 83% / 100%** |

83% 那張是 `card2-1`，原圖比例 1.50 比另外兩張寬。

**不要加 `max-height` 去夾這個比例。** `aspect-ratio` 的高度被夾住時寬度會跟著縮，
這個坑 PageHero 已經踩過一次（見該檔註解）。高度若超過卡片，讓卡片的
`overflow: hidden` 切掉上緣就好，寬度不受影響。

**遮罩跟著文字塊走，不是整張卡的百分比漸層。** 第一版用卡片百分比定色標
（`0.96 → 0.93 → 0.82 → 0.45 → 0.12`），問題是卡片高度會隨斷點與文案長度變：
加中文之前文字佔卡片 63%、加了之後佔 73%，同一組色標之下，底下那幾行的實際遮罩
從 0.82 掉到 **0.53**——我原本用 0.82 算的對比度是錯的。

現在分成兩層：整張卡一層 `rgba(色票, 0.22)` 的淡色調（讓照片統一在色系裡但不擋住），
文字自己一層 `0.95 → 0.9` 的漸層、下緣 12% 淡出接到照片。這樣不管卡片多高，
文字底下永遠是 0.9。

疊在「文字遮罩 0.9 ＋ 卡片色調 0.22 ＋ 純白照片」上的實測（最不利）：

| | 01 `#1b42a3` | 02 `#313b87` | 03 `#0c132f` |
| ---- | ---- | ---- | ---- |
| 英文標題 白 100% | 7.34 | 8.02 | 15.00 |
| 英文內文 白 88% | 6.10 | 6.65 | 11.90 |
| 中文標題 白 90% | 6.30 | 6.87 | 12.39 |
| 中文內文 白 84% | 5.72 | 6.23 | 10.97 |
| 中文眉標 白 80% | 5.35 | 5.82 | 10.08 |

中文那三行原本設 0.86 / 0.76 / 0.62，實測是 4.65 / **4.02** / **3.23**——
後兩者不合格，調到 0.90 / 0.84 / 0.80 才過。

卡片高度是照片能不能被看到的關鍵，而且每次加文案都要重算。三個版本：

| | 卡高（窄／寬） | 照片露出 |
| - | ---- | ---- |
| 只有英文、第一版 | 384 | **0～38px（等於沒有）** |
| 只有英文、加高後 | 530 / 484 | 101～185px |
| 加中文之後 | 624 / 544 | 121～172px |

加中文讓文字長高約 150px，所以卡高再往上調一階：
窄螢幕 `clamp(34rem, 78vh, 42rem)`、寬螢幕 `clamp(34rem, 68vh, 44rem)`。

中文眉標必須自己佔一行（`flex-basis: 100%`）。接在英文後面的話，窄卡片上會擠成
「CURRENT R&D / FOCUS　現階段研 / 發焦點」這種兩段各自斷行的樣子，
寬卡片上則會被卡片右緣裁掉。

### 進度軌（圓點連線）

版型參考 UDA 現有站 `founder-message` 頁的 `.uda-letter-rail`。那邊是**直的**：
sticky 側欄、2px 灰線（`#e4e7ec`）＋ 藍色進度條（`#0443a9`）＋ 五個章節項目，
每項一個 8px 圓點，目前章節加 `is-active`。

這裡轉成**水平**、對應橫向捲動的位置：灰線串起三顆圓點，往右滑時藍色由左往右
延伸，滑到哪一張哪一顆圓點亮起。

實作：捲動時把進度寫成 CSS 變數 `--p`（0～1），藍線寬度是 `calc(var(--p) * 100%)`，
圓點靠 `data-active` 加 `:nth-child`。

每顆圓點底下掛該張卡的中文標題（指定）。三項分別靠左、置中、靠右，
不然頭尾兩個標題會超出軌道兩端。標籤疊在背景影片上，跟本區塊其餘反白文字
一樣用 `--color-on-video-muted`，另加一層暗色 text-shadow——**陰影不是無障礙的
解法**，影片最亮的畫面白字仍然會弱，但它能明顯改善且不影響深色畫面。
這一段沿用本區塊既有的白字疊影片限制，不是這次新引入的。

圓點**預設是白的，藍線走到才變主色**（指定），走過的留住主色。元件寫入的是
`data-reached`＝「藍線已經走過幾顆」：還沒開始滑（`--p` 為 0）時是 0 顆，三顆全白；
一開始滑就吃到第一顆，滑到底三顆全亮。最新走到的那顆再放大 1.3 倍。

配色（指定）：軌道是**透明白** `rgba(255,255,255,.45)`——這一塊疊在背景影片上，
白色不論影片深淺都看得見，深色系的軌道在暗畫面會整條消失。進度線與圓點用
**主色** `--color-primary`，不是 accent。**走過的圓點留住主色**，不是只有目前那一顆
（`:nth-child(-n + N)`），目前那一顆再放大 1.3 倍區分。

原生橫向捲軸已隱藏（`scrollbar-width: none` ＋ `::-webkit-scrollbar { display: none }`）——
底下的進度軌已經在講同一件事，兩條並排只是重複。捲動本身不受影響，實測捲軸佔位 0px。

兩個刻意的選擇：

1. **不走 React state。** 捲動時每幀 `setState` 會讓整個元件重繪，三張卡連照片
   一起重算，行動裝置上會頓。直接寫 DOM 的 `style` 與 `dataset`，只動那一個節點。
2. **scroll 事件用 rAF 節流。** 原生 scroll 一秒可以派發上百次，一幀畫一次就夠。

整條 `aria-hidden`：它是「現在滑到哪」的視覺提示，捲動位置在捲動容器上已經有了，
再做成一組可聚焦的控制項只會多出三個 tab 停留點。

實測（1920 寬）：`scrollLeft 336 / 398` → `--p = 0.844`，藍線 502 / 594，
`data-active = 2`，第三顆圓點亮起。

> 測試上的坑：**背景分頁不會派發 rAF**，而元件的節流正是用 rAF。
> 用 `dispatchEvent(new Event('scroll'))` 加 `await requestAnimationFrame` 去驗證
> 會直接掛住（我第一次就把分頁測到逾時）。要用真實的捲動事件。

### 橫向移動怎麼做的

參考 UDA 現有站的 `.uda-scroll-stack`。那一段實測是 **JS 依捲動進度寫 inline
transform** 的垂直疊牌：捲到定位時三張卡分別是 `scale(0.9) translateY(1606px)`、
`scale(0.95) translateY(803px)`、`scale(1) translateY(0)`，z-index 1/2/3。

這裡改成橫向，而且**不用 JS**——用 CSS 捲動時間軸：

```
.stack   高度 = 100svh + travel，宣告 view-timeline: --focusStack
.viewport  position: sticky，釘在 header 底下，overflow: hidden
.rail    animation-timeline: --focusStack，range 為 contain 0% ～ contain 100%
```

`contain 0% ～ contain 100%` 是「這個元素完整蓋住可視區」的那一段，長度剛好等於
stack 高度減一個可視區高度。把 stack 高度設成 `100svh + travel`，捲 1px 卡片就
移動 1px，沒有加速感。

終點位移 `translateX(calc(var(--view-w) - 100%))`：`100%` 是 rail 自己的寬度，
相減之後最後一張卡的右緣剛好貼齊可視區右緣。1200 寬實測 vpW=1136、railW=1968、
終點 -832，與計算一致。

**釘住捲動已經拿掉了。** 三張卡搬到消息右邊之後那個做法不能用——釘住會把整個
區塊固定在畫面上，左邊的消息也會跟著卡住不動。現在是使用者自己滑的橫向卡片列
（`overflow-x: auto` ＋ scroll-snap），也就是原本那個退路。上面關於捲動時間軸的
說明保留下來，是因為那兩個坑（scroll-snap 讓分頁卡死、`animation` 簡寫把 duration
設成 0s）之後若要再做捲動驅動的效果還會遇到。

### 兩個踩到的坑

**一、scroll-snap 會讓整個分頁卡死。**
增強模式下 `.viewport` 是 `overflow: hidden` 的捲動容器，內容又被動畫持續位移。
基礎樣式的 `scroll-snap-type: x mandatory` 若留著，瀏覽器會為了對齊反覆修正捲動
位置，而位移來自動畫，兩者互相觸發，分頁直接沒有反應。增強模式必須
`scroll-snap-type: none`。

**二、`animation` 簡寫會把 duration 設成 0s。**
配上 `fill: both` 的結果是進度永遠是 1——卡片一開始就停在終點，完全不會動。
捲動時間軸要 `animation-duration: auto`，所以這裡用長寫法，不用簡寫。

（順帶一提，`container-type: inline-size` ＋ 在 keyframe 裡用 `100cqw` 也會讓
Chrome 卡死，已改用 `--view-w`。代價是 Windows 上寬度小於 1232px 時，
`100vw` 會把傳統捲軸算進去，終點會差十幾 px。）


> **眉標、標題、導言已依指示刪除**（2026-09-05）。刪掉的是：
> Eyebrow `CURRENT R&D FOCUS`、標題 `From cancer research to detection
> technology, building a continuously validated R&D pathway`、
> 以及開頭那段 `UDA maintains broad cross-disciplinary exploration…`。
> 三張卡與結尾那段 `R&D can be broad…` 保留。
>
> 連帶處理：卡片標題原本是 `h3`，掛在被刪掉的那個 `h2` 底下；`h2` 沒了會變成
> 從 `h1` 直接跳到 `h3`，所以卡片標題升為 `h2`。區塊的 `labelledBy` 也一併移除
> （已沒有標題可指向）。

現在只剩三張卡，每張有圖示、標題、內文與標籤：，每張有圖示、標題、內文與標籤：

| 卡片 | 內文 | 標籤 |
| --- | --- | --- |
| Cancer Research & Detection Technology | Studies cancer-related biological signals, background interference, recognition and detection applications in the context of cancer biology and disease heterogeneity. | Cancer Biology／Detection Research／Molecular Recognition |
| UDA Biochip Technology | Integrates molecular recognition, material interfaces, biosensing, microscale engineering and data analysis into a miniaturized platform for life-signal research and cancer-detection applications. | Molecular Recognition／Sensing Integration／Platform Translation |
| Proto-Structural Biology | UDA's original R&D framework for integrating structural biology, molecular biophysics and life-signal research from atomic and molecular structure to cellular state. | Structural Research／Molecular Dynamics／UDA R&D Framework |

- **卡片下方一句** `[抄錄，末段模糊]`：R&D can be broad, while market strategy must
  remain focused. UDA currently starts with cancer detection; animal oncology,
  advanced molecules, signal analysis, animal health and other cross-disciplinary
  topics remain in R&D. Focus does not mean expanding every market direction at once;
  today we concentrate resources on cancer-detection technology while converting
  broader research into technical reserves and future innovation capacity.

---

## 區塊二：技術平台 `[抄錄]`

- **標題** `[草稿]`：Building a verifiable technology platform
  > 參考影片只拍到「… verifiable technology platform」，前半段是依上下文擬的。
- **內文**：UDA Biochip Technology integrates molecular recognition, material
  interfaces, biosensing, microscale engineering, signal transduction and data
  analysis as a key platform for life-signal research and cancer-detection technology.
  Our focus is not only on acquiring signals, but also on whether they can be
  recognized, compared, validated and progressively translated into results with
  application potential. Core designs, material structures, recognition mechanisms
  and final product form are disclosed progressively in line with R&D and
  intellectual-property strategy.

三張卡：

| 卡片 | 內文 |
| --- | --- |
| Scientific Foundation | Builds testable research questions from established cancer biology and detection science. |
| Validated | Accumulates evidence through reproducibility, stability, interference assessment and analytical performance. |
| Translatable | Connects IP, co-development and industry collaboration according to R&D maturity. |

浮動標籤（參考網站疊在插圖上）：

- Interference Control — Assessing background variation and potential interference
- Recognition Interface — Building measurable and comparable recognition conditions
- Translation & IP — Connecting IP, co-development and industry collaboration

---

## 區塊三：UDA BIOMED CORE POSITIONING `[抄錄]`

- **內文**：UDA BIOMED is a biomedical technology company centered on
  innovation-driven R&D. Its current public focus is cancer research and detection
  technology, supported by UDA Biochip Technology as a key platform;
  Proto-Structural Biology serves as one of UDA's original frameworks for integrating
  structural biology, molecular biophysics, biochemistry, materials science and
  life-signal research. UDA emphasizes validation, intellectual property and
  translational development so that technology can progress from concepts and data
  toward co-development and licensing partnerships.

六個標籤：Cancer Detection Technology／Cancer Research／Proto-Structural Biology／
Cross-Disciplinary R&D／Intellectual Property／Industry Collaboration

---

## 區塊四：UDA Announcements ／ UDA Updates `[待補]`

參考網站有兩組列表，皆為「日期 + 標題」，並有 Previous／Next 分頁與「Item 1 / 4」。

**日期與標題我不抄。** 錄影中的日期全是 `2026-04-11`，字級小又有摩爾紋，
抄錯一個數字就是錯誤資訊。這一區塊需要你提供真實資料。

---

## 區塊五：Corporate Responsibility `[抄錄]`

- **Eyebrow**：CORPORATE RESPONSIBILITY
- **標題**：Protecting every life through responsibility
- **內文**：UDA builds long-term trust through scientific integrity, privacy
  governance and respect for life, advancing R&D value alongside social
  responsibility.

底下的子項（Science, Data & Life、Scientific & Data Integrity 等）影片中讀不完整，
仍為 `[待補]`。

> 頁面上的說明文字一律用英文——本站已確認只做英文，這些字會顯示給訪客看。

---

## 區塊六：R&D PORTFOLIO SNAPSHOT `[待補]`

參考網站有三個大數字（影片中看起來是 18／27／43）與說明：
「These figures are used to illustrate UDA's research organization, technical planning,
and collaboration-discussion structure. They are not a disclosure of operating,
investment, R&D, or licensing results.」

**數字我不抄。** 從晃動的錄影讀數字放到生醫公司官網上，是最不該做的事。
需要你提供，或直接不做這一區塊。

## 新區塊：Latest News ／ Message from the Chairman `[草稿]`

這兩塊不在 index_video 參考影片裡，是後來要求新增的。

目前的首頁區塊順序（2026-09-05 起）。四格數字統計原本在消息之前，
依指示移到消息／董事長那一列的正下方：

| | 順序 |
| - | ---- |
| 窄螢幕 | hero → 消息 → 研發卡片 → 四格數字 → 董事長談話 → 技術平台 → … |
| ≥1024 | hero → 第一列「消息｜研發卡片」→ 四格數字 → 董事長談話 → … |

> 原本卡片下方那段結語（`R&D can be broad, while market strategy…`）
> 已依指示整段刪除（2026-09-05）。

消息、研發卡片、結語、四格數字、董事長談話同屬一個 `.newsFocus` 容器。
**跨 Section 沒辦法互換順序、也沒辦法指定誰排在哪一列**，所以只要還會調順序，
它們就得待在同一個容器裡。

董事長談話原本與消息並排，依指示獨立出來移到四格下方；接著依指示把**研發重點
三張卡搬進消息右邊**，重新變回兩欄。結語段落沒有跟著進右欄——右欄只有 594px，
那段 76ch 的文字擠進去會變成細長一條，所以滿版排在卡片下方。

### 兩欄的高度是誰決定的

`grid-template-columns` 必須寫成 `minmax(0, 6fr) minmax(0, 7fr)`。`fr` 的最小值
預設是 `auto`（＝min-content），而右欄的卡片列是 `width: max-content`（三張卡約
1000px），會把右欄撐開、把左欄擠到只剩 208px。`.focusGroup` 也要 `min-width: 0`，
同樣的理由。

**列高由右欄的卡片決定，卡片高度必須是定值。** 左欄消息的捲動區是 `flex-basis: 0`，
當初設計成「跟旁邊那張卡等高」；如果卡片也用 `height: 100%` 把高度讓給列，
兩邊都不定高，整列就塌到各自的最小值——實測消息 654 → 399、照片只露 0～37px。
`align-items` 也不能用 `stretch`，那會直接把消息的捲動區壓成 0（同樣塌到 399）。

### 為什麼跟研發重點卡片同屬一個 Section

指定「窄螢幕時董事長談話要排到三張卡下面」。消息與董事長談話原本自成一個
Section、卡片在下一個 Section——**兩個 Section 之間沒有任何 CSS 手段可以互換
順序**（`order` 只在同一個 flex／grid 容器內有效，`display: contents` 也跨不過
Section 邊界）。所以把兩個 Section 併成一個 `.newsFocus`。

DOM 順序是**消息 → 三張卡 → 董事長談話**，也就是窄螢幕看到的順序，
讀屏與 Tab 的順序跟視覺一致。1024 以上才改用 grid 把董事長談話拉回第一列右欄：

| | DOM | 視覺 |
| - | --- | --- |
| < 1024 | 消息 → 卡片 → 董事長 | 相同 |
| ≥ 1024 | 消息 → 卡片 → 董事長 | 消息 ｜ 董事長（第一列）／ 卡片（第二列） |

寬螢幕下視覺順序與 DOM 順序不同（WCAG 1.3.2 的疑慮），這裡可以接受：
三塊各有自己的 `h2`、內容彼此獨立，先讀到哪一塊都不影響理解。
反過來讓窄螢幕錯位比較糟——手機是主要流量。

合併後少了一份 Section 內距，用 2 倍內距的 margin／`row-gap` 補回原本的間距。

### Latest News —— 版面依 `index_img/part1.jpeg`

一列的結構：**縮圖 ＋（分類・日期）＋ 標題 ＋ 兩行摘要**，項目間有分隔線。
分類靠左並帶一個小圓點，日期靠右並帶 `Calendar` 圖示（lucide，既有相依）。

| 欄位 | 狀態 | 說明 |
| ---- | ---- | ---- |
| 日期 | `DD MMM YYYY` 模板 | **不編造**。「某月某日發生某事」是事實主張，寫錯即為不實資訊。模板讓日期欄的版面完整成立，又不可能被誤認成真日期 |
| 分類 | `[草稿]` | 分類標籤本身不是事實主張，可以擬 |
| 標題 | `[草稿]` | 只用來撐版面，卡片標題旁有 `DRAFT` 虛線標記 |
| 摘要 | `[草稿]` | 兩行，描述性文字，不含任何成果或數據 |
| 縮圖 | 佔位框 | **沒有拿其他頁的照片充數**——真照片配上草稿標題只會讓假內容更像真的。虛線框加圖示，圖進來後換成 `<img>`，尺寸圓角不用動 |
| 連結 | 無 | 目前沒有 news 頁，不做連往不存在路由的連結 |

六則草稿標題（六則是為了讓清單超出高度、捲軸才有東西可捲）：

1. Research direction update for cancer-detection technology
2. UDA Biochip platform development progress
3. Academic and industry collaboration announcement
4. Proto-Structural Biology research framework update
5. Intellectual property and translational development notice
6. Corporate responsibility and data governance statement

拿到實際消息後：把 `NEWS` 每筆的 `year` / `day` 換掉、標題改寫，
再刪掉 `blockHead` 裡那個 `draftChip` 即可。

### 捲動清單與捲軸

清單 `overflow-y: auto`，高度分兩種情況：

- **手機（堆疊）**：`max-height: 25rem`。沒有「旁邊那張卡片」可以對齊，
  需要自己的上限。
- **桌機（並排）**：`flex: 1 1 0` + `max-height: none`，填滿卡片剩餘高度。

`.card` 有 `height: 100%`，在 grid 裡會被撐到跟旁邊那張等高。清單若在桌機
也用固定高度，多出來的部分就成為卡片底部的空白（實測 64px）。

**`flex-basis` 必須是 `0` 不能是 `auto`**：`auto` 會把清單的內容高度算進
卡片，而卡片是這一列最高的那個，於是 `max-height: none` 反而讓整列撐到
970px 且完全不再有捲軸。`basis: 0` 讓它只吃剩餘空間，高度改由旁邊那張決定。

### 捲軸只在 hover / focus 時出現

thumb 預設 `transparent`，`.newsBlock:hover` 或 `:focus-within` 時才變成
`--color-primary`（與日期色塊同色）。

兩個不能省的細節：

- **`::-webkit-scrollbar` 的 6px 寬度永遠保留**，只切換顏色。若改成 hover
  才給寬度，捲軸出現的瞬間可視寬度會少 6px，整列內容跟著位移。
  實測 hover 前後都是 6px。
- **`:focus-within` 必須一起寫**。用鍵盤 tab 進捲動區的人不會有 hover，
  沒有它就完全看不到捲軸在哪。

### 每一列的 hover

底色比卡片濃一階（`--glass + 0.14`，與 `.tag` 同一組級距）、標題加底線。
圓角底色蓋不住直線分隔線，所以 hover 時把 `border-bottom-color` 收成
transparent。`prefers-reduced-motion: reduce` 時移除 transition。

> 目前每一列不是連結（還沒有 news 頁），所以沒有給 `cursor: pointer`——
> 有 hover 卻點不動已經有點怪，再加上手型游標會更誤導。
> 之後包成 `<Link>` 時把游標一起補上。消息會一直累積，
讓它自己捲，區塊高度就不會跟著清單長。

兩個實作上的坑：

- **捲動區必須自己能拿到焦點**（`tabIndex={0}` + `role="group"` +
  `aria-labelledby`），否則只用鍵盤的人捲不動它。Firefox 會自動給焦點，
  Chrome 不會。既然可聚焦就必須有可見的焦點框。
- **macOS 預設是 overlay 捲軸**，靜止時完全看不到，使用者不會知道能捲。
  自訂 `::-webkit-scrollbar` 可讓 Chrome/Safari 改用常駐捲軸（實測佔 6px
  版面寬度）。但**不能同時寫標準的 `scrollbar-width`**——Chrome 只要看到
  它就會走標準路徑而整組忽略 `::-webkit-scrollbar`。所以標準屬性放進
  `@supports not selector(::-webkit-scrollbar)`，只給 Firefox。

### 捲動進場動畫

用原生 `animation-timeline: view()`，**沒有引入動畫函式庫**。
評估過 `motion`（framer-motion 後繼），但目前整包 gzip 只有 84 KB，
而 GitHub Pages 有每月 100 GB 頻寬軟上限、影片已經是大戶，
為兩個區塊的淡入付這個代價不划算。

不支援 `animation-timeline` 的瀏覽器整條 `@supports` 失效，元素直接是
最終狀態——不會出現「先隱藏、等 JS 才顯示」的空白閃動。
外層再包一層 `@media (prefers-reduced-motion: no-preference)`。

### Message from the Chairman —— 版型依 `index_img/chairman_message_page_mockup_classic.html`

取用的結構：**眉標 → 大字引言 ＋ 40×2 短橫線 → 內文 ＋ 直式肖像欄 → 簽名區**。

示意檔是**整頁**版型，以下三項不適用、沒有做：麵包屑（關於我們／董事長的話）、
中/EN 切換、底部的「經營團隊／公司沿革／年報下載」連結列——那三個頁面不存在。

尺寸壓縮：肖像從示意檔的 200px 收到 `8rem`。480px 以下肖像欄收到內文下方，
但必須限寬——不限的話 3:1 的欄寬乘上 3:4 比例會變成 293×391 的大方塊，
把卡片從 1120 撐到 1340px。

示意檔的標題是當成小眉標用、大字引言才是視覺主體。這裡照做，但語意上
它仍是本區塊的標題，所以維持 `<h2>`，只是樣式收小。

#### 引言為什麼連同眉標放進深色區塊

指定引言要用白字。但卡片是 25% 白疊在影片上，**影片亮的時候卡片本身就
合成成純白**，白字不是難讀而是完全消失：

| 卡片實際底色 | 白字 | 近黑字 |
| ------------ | ---- | ------ |
| 左·影片亮 `#93a5b8` | 2.54 | 7.53 |
| 左·影片暗 `#46586b` | 7.30 | 2.61 |
| 右·影片亮 `#ffffff` | **1.00** | 19.08 |
| 右·影片暗 `#404040` | 10.41 | 1.83 |

所以把眉標＋引言＋橫線整組放進 `--color-primary` 的實心區塊。底色不透明，
白字對比固定為 **12.21:1**，不再受影片明暗影響。橫線也跟著反白。

實作細節：負 margin 抵掉 `.card` 的 24px padding，但抵不掉 1px 邊框，
所以這一塊是貼齊**邊框內緣**（寬度比卡片少 2px，左緣偏移 1px，這是對的）。
內圓角要 15px 才能正確嵌在 16px 的外圓角裡。

> ⚠️ 示意檔內文裡的營收 286 億、成長 14.2%、毛利率 31.5%、三千兩百位同仁、
> 人名「陳裕昌」，都是通用模板的填充值，**一個都沒有沿用**。
> 那些正好是 CLAUDE.md 明令不得編造的類別。

### 展開／收合

**只有 1024 以下才收合。** 桌機兩欄並排時版面夠寬，藏起內容沒有意義，
收合反而會讓右欄空掉一大塊；所以 1024 以上一律展開，箭頭鈕 `display: none`。
1024 是 `.split` 換成兩欄的同一個斷點。

這個判斷用 CSS 而不是 JS：`matchMedia` 的 `change` 事件在背景分頁不會派發，
純 CSS 沒這個問題，也不必為了視窗寬度多一份 state。覆寫必須寫在
`.collapseOpen` **之後**——兩者特異性相同，靠順序決勝。

實測：1023 收合且箭頭顯示、1024 展開且箭頭隱藏。

手機（1024 以下）談話內容**預設收合**，藍色區塊右下角有一顆圓形箭頭鈕，
點擊展開。

- 這是 disclosure 模式：`<button>` 加 `aria-expanded` 與 `aria-controls`，
  原生 button 本來就吃 Enter／Space，不需要自己接鍵盤事件
- 只有箭頭沒有可見文字，所以另外放一段 `visually-hidden` 當名稱，
  並隨狀態在 Read／Hide the full message 之間切換
- 按鈕 **44×44**（CLAUDE.md 的觸控目標下限），`bottom: -22px`＝高度一半，
  圓心正好落在藍色區塊的下緣線上
- 白底深藍箭頭：這顆鈕一半在藍底、一半在玻璃卡片上，白色在兩種底上都清楚

動畫用 `grid-template-rows: 0fr → 1fr`。這是目前唯一能對「高度 auto」
做轉場的穩定做法——用 `max-height` 猜一個值，內容一長就會被截斷，
收合時也會有一段空等。內層必須同時有 `overflow: hidden` 與
`min-height: 0`，格線列才收得回 0。

實測展開曲線（1920 寬）：0ms 高 0 → 92ms 高 365 → 185ms 高 529 →
368ms 高 559 收斂；opacity 依設計延遲 120ms 才起跑（185ms 時 0.20、
321ms 時 0.95），收合時則先淡出，兩個方向的節奏才對稱。

箭頭展開時轉 180 度。`prefers-reduced-motion: reduce` 時三者的
transition 全部移除。

### 談話內容 —— 全文 `[草稿]`、署名 `[待補]`

這一段是**理念陳述而非事實主張**，所以可以擬草稿。刻意不含任何
成果、數據、時程、獎項、專利或合作對象——這些依 CLAUDE.md 一律不編造。

署名維持 `To add: name`，不自行填人名。職稱只寫 Chairman, UDA BIOMED。

### 已知的對比度問題

董事長談話是 17px／400 的長段落，屬一般字級，門檻 4.5:1。
在目前的 `--glass: 0.25` 下最壞情況只有 **1.83:1**：

| `--glass` | 左·影片亮 | 左·影片暗 | 右·影片亮 | 右·影片暗 | 最差 |
| --------- | --------- | --------- | --------- | --------- | ---- |
| 0.25（目前） | 7.53 | 2.61 | 19.08 | 1.83 | **1.83** |
| 0.40 | 9.30 | 4.31 | 19.08 | 3.32 | 3.32 |
| 0.50 | 10.63 | 5.85 | 19.08 | 4.80 | **4.80 通過** |

0.25 是刻意指定的視覺方向（見 `Home.module.css` 的 `.card`），這裡沿用，
沒有自行更動。若要讓這一段達 AA，在 `.chairman` 單獨覆寫 `--glass: 0.5`
即可，不影響其他卡片。

## 手機捲動效能：backdrop-filter 全部關掉

回報「手機版滑起來很卡」之後量到的：首頁上有 **9 個元素帶 `backdrop-filter`**
（4 個數字統計格 `blur(10px)`、4 個玻璃卡片與 1 個董事長談話 `blur(4px)`）。

背景影片是 `position: fixed` 而且一直在播。**每一個 `backdrop-filter` 元素都會讓
合成器在每一幀重新讀取背後的影片畫面、做一次模糊。** 9 個疊在一支播放中的影片上，
行動裝置的 GPU 撐不住，捲動就頓。這跟模糊半徑關係不大——貴的是每幀的讀取，
不是半徑，所以「把 blur 調小」沒有用。

處理方式：`@media (max-width: 1023px), (hover: none)` 之下整組關掉，
並把不透明度補上去。模糊拿掉之後影片會清晰透出，原本的白膜擋不住。

| | 桌機（不變） | 手機 |
| - | ---- | ---- |
| 玻璃卡片 `.card` | `--glass: 0.25` ＋ `blur(4px)` | `--glass: 0.55`，無模糊 |
| 數字統計格 | 78% 白 ＋ `blur(10px)` | 95% 白，無模糊 |

**對比度是往上走的**（文字疊在影片最暗的畫面）：

| | 桌機 | 手機 |
| - | ---- | ---- |
| 玻璃卡片文字 `#05101f` | 1.83:1 ✗ | **5.69:1 ✓ AA** |
| 統計格數字 | 5.97:1 | **8.62:1** |

玻璃卡片在桌機的 1.83:1 是當初指定的視覺方向（見下方玻璃卡片一節），
手機這一版順帶把它修到合格。**兩邊的通透感因此不一樣**，這是效能換來的。

實測：手機路徑帶 `backdrop-filter` 的元素從 9 個降到 **0**，桌機維持 9 個。

另外給 `FocusStack` 的 `.rail` 加了 `will-change: transform`——捲動驅動的
transform 本來就在合成器上跑，這個提示是保險。

## 四格數字統計 `StatCounters`

版型參考 `https://1239806.eu11.myftpupload.com/`（UDA 現有站）的計數方格：
白底圓角格、大字數字在上、小標在下，捲進畫面才開始跑數。

**所有寬度都橫排兩格**（指定）。最早是一路四格到底，375 寬時每格只有 81px、
數字被 `clamp` 壓到 22px；改兩格後 375 是 164×160、數字 36px，
1440 是 556×224、數字 60px。

桌機的 `min-height` 覆寫**必須排在 `.cell` 之後**。CSS Modules 依原始順序輸出，
同權重下後面的贏——寫在前面的 media query 會被 `.cell` 的 `min-height` 蓋掉，
這個坑第一次就踩了。

區塊沒有標題、也沒有出處那一行（指定移除），所以 `<ul>` 掛
`aria-label="Key figures"`，讀屏使用者才知道這一排是什麼。

### 數據來源

| # | 項目 | 值 | 來源 |
| - | ---- | -- | ---- |
| 1 | 全球人口 | 8.3B | UN World Population Prospects（2026-09 約 83.1 億） |
| 2 | 全球每年新增癌症病例 | 20M | WHO / IARC GLOBOCAN 2022（另有 970 萬死亡） |
| 3 | 研發中項目數 | 12 | ⚠️ **佔位值，無來源** |
| 4 | 專利申請 | 8 | ⚠️ **佔位值，無來源** |

> ⚠️ **上線前必須把第 3、4 項換成實際數字。**
>
> 那是 UDA 自己的研發與專利數據，我沒有來源。原本留空顯示破折號，
> 後來指定「後面兩個數據先幫我隨便加」，才填上 12 與 8。
> 同時指定移除了出處那一行，所以**畫面上四個數字看起來份量相同，
> 分不出哪兩個是編的**。
>
> 專利件數與研發項目數對外報錯是不實陳述，風險比版面問題高。
> 拿到實際數字後改 `STATS` 裡標了 `⚠️ 佔位值` 的兩筆即可。
> **這份文件是唯一的紀錄。**

### 靜止與 hover 樣式

原本四格是純白，指定「太平」後改成：

| | 靜止 | hover |
| - | ---- | ----- |
| 底色 | `--color-accent` 5% → 18% 疊在 78% 白上（影片會透出來），158° 斜向 | `--color-primary → --color-navy` 斜向漸層 |
| 外框 | `inset` 1px，accent 22% | 無（改由陰影界定邊緣） |
| 陰影 | `--shadow-card` | `0 18px 38px rgba(0,48,104,.28)` |
| 位置 | — | `translateY(-6px) scale(1.02)` |
| 數字 | primary | 白，並 `rotateX(-88deg) → 0` 翻轉進場 |
| 掃光 | — | 斜向白色亮帶掃過一次 |
| 其餘三格 | — | `scale(0.975)`，陰影收平 |

四個實作細節：

1. **蓋色用獨立的 `::before` 圖層，不是換 `background`。**
   兩個 `background` 之間沒辦法做 transition，漸層更不行；只有 `opacity` 能補間。
2. **外框用 `inset` box-shadow，不用 `border`。**
   絕對定位的 `::before`（`inset: 0`）只蓋到 padding box，border 那一圈蓋不到，
   hover 填深藍時會在外面露出一道白邊。inset 陰影畫在背景層，會被整片蓋掉。
3. **`perspective` 掛在 `.grid` 上，不是各別的格子。**
   掛在格子上的話每格各有自己的消失點，四格翻轉的角度會不一致。
4. **hover 效果包在 `@media (hover: hover) and (pointer: fine)` 裡。**
   觸控裝置上 `:hover` 點過就黏著不放，那一格會一直維持深藍。

### 觸控裝置的按壓效果

hover 那一整組包在 `@media (hover: hover) and (pointer: fine)` 裡（觸控上 `:hover`
點過會黏著不放），結果是**手機點下去完全沒有回饋**。補了一個 `.pressed`：

- 用 **pointer 事件**加 class，不用 `:active`。`:active` 在 iOS Safari 上對非互動
  元素不一定會觸發，除非頁面剛好有 touch 監聽器，不能依賴。
- 放開後**至少維持 260ms** 再收。手指點一下常常不到 100ms，不留最短顯示時間的話
  效果會一閃而過，等於沒有。
- `-webkit-tap-highlight-color: transparent`，否則 Android Chrome 的預設灰色閃光
  會蓋在自己的效果上。

`.pressed` 的樣式跟 hover 完全相同，但**不能合併成同一組選擇器**——hover 那組必須
留在 hover media query 裡，`.pressed` 要在所有裝置生效。所以是重複一份，
`prefers-reduced-motion` 的關閉規則也兩邊都列。

這四格不是互動元素（點了不會發生任何事），按壓效果純粹是回饋，
沒有加 `role`、也沒有加 `tabindex`，避免暗示它可以點開什麼。

### 其餘三格為什麼是縮小、不是降透明度

`.grid:has(.cell:hover) .cell:not(:hover)` 讓沒被滑到的三格退後一點。
直覺作法是降 `opacity`，但**這裡不能用**：卡片是不透明白底疊在首頁的背景影片上，
一降透明度影片就透出來，影片亮度不可控，文字對比度會掉到 AA 以下。
改用 `scale(0.975)` 加收平陰影，效果一樣是「退後」，但不動任何顏色。

`prefers-reduced-motion: reduce` 時位移、縮放、翻轉全部關掉，只留顏色變化。

### 半透明的上限，以及為什麼中文小標不能是灰的

指定卡片要半透明。這一排疊在首頁的背景影片上，影片亮度不可控，
所以要以**最不利的情況（純黑畫面）**估算。白底透明度 W 對文字對比度的影響：

| 白底 W | 數字 | 英文標 | 中文標 13px |
| ----- | ---- | ----- | ---------- |
| 1.00（不透明） | 9.52 | 9.75 | 4.68 |
| 0.95 | 8.62 | 8.82 | **4.24 ✗** |
| 0.90 | 7.78 | 7.96 | 3.82 ✗ |
| 0.78 | 6.10 | 6.25 | 3.00 ✗ |

**只要透 5%，中文小標就過不了 AA。** 卡住的一直是那個 13px 的灰字。

所以把 `.labelZh` 從 `--color-text-muted`（#5a6472）改成 `--color-text`（#2e3440），
層級差改由字級與字重維持（英文標 700、中文標 400）。換掉之後：

| 白底 W | 最差（此時是數字或英文標） |
| ----- | ------------------------ |
| 0.78（目前） | 6.10 |
| 0.70 | 4.93 |
| 0.65 | 4.34 ✗ |

取 0.78，離 4.5 還有餘裕。`backdrop-filter: blur(10px)` 純粹是質感——
**模糊不會改變背後的平均亮度，對比度不能靠它**。

### 靜止底色為什麼用 accent 調、上限為什麼是 18%

指定「一開始不要全白」。先用 `--color-primary`（#0f3661）調淡色，
但 primary 本身偏灰，疊出來看起來是灰的不是藍的；換成
`--color-accent`（#0072ea）才讀得出藍。為此在 `tokens.css` 補了
`--color-accent-rgb`。

深的那一端卡在 **18%**，是 13px 中文小標決定的：

| accent 透明度 | 合成底色 | 中文小標 13px |
| ------------ | ------- | ------------ |
| 0.14 | `#dbebfc` | 4.94:1 |
| **0.18（目前）** | `#d1e6fb` | **4.69:1** |
| 0.22 | `#c7e0fa` | 4.42:1 ✗ 低於 AA |

要再深就得同時把中文小標的顏色壓深，否則過不了 4.5:1。

### 對比度（hover 態）

白字疊在深藍漸層上，兩端都量過：

掃光是 `rgba(255,255,255,.16)` 的亮帶，最亮處把深藍底提亮不到一階，
白字在掃光經過時仍有 11:1 以上。

| 元素 | 靜止（最差在 tint 端） | hover（primary–navy） |
| ---- | -------------------- | -------------------- |
| 數字 | 11.29:1 | 12.21 – 12.94:1 |
| 英文標 | 11.55:1 | 12.21 – 12.94:1 |
| 中文小標 13px | 5.55:1 | 7.58 – 7.86:1（白 75%） |

全部通過 AA。最低是靜止時的中文小標 5.55:1。

### 動畫

**每次捲進畫面都從 0 重跑一次**（指定），不是只跑第一次。

`IntersectionObserver` 因此不 disconnect，改用一個「目前在不在畫面內」的旗標，
只在由外進內的那一刻觸發。**進場與離場用不同的門檻：40% 進、5% 出。**
同一個門檻的話，捲動停在邊界上輕微晃動就會反覆跨越，數字會一直重跑。

重播前先 `cancelAnimationFrame` 取消上一輪——不取消的話兩個 rAF 迴圈會同時寫
同一個數字，畫面會跳。四格各自獨立。

`prefers-reduced-motion: reduce` 時重播也不跑動畫，直接顯示終值。

實測（1920 寬，真實滑鼠捲動）：進場 `0.3B / 1M / 0 / 0` 開始跑 →
捲到研發卡片區 → 捲回來 `0.6B / 1M / 1 / 1`，確實從 0 重跑 → 跑完
`8.3B / 20M / 12 / 8`。

> 驗證上踩到兩個坑，之後要測動畫記得：
> 1. **背景分頁的 rAF 與 IntersectionObserver 都不會跑。** 用 `scrollTo()` 加
>    讀值完全量不到東西，四格永遠是 0。要用真實的捲動事件讓 renderer 保持活著。
> 2. React 的 `onPointerEnter` **不是**直接監聽 `pointerenter`，而是由 root 上的
>    `pointerover` / `pointerout` 合成的。派發 `pointerenter` 不會觸發任何東西。


`IntersectionObserver`（threshold 0.4）觸發，`requestAnimationFrame` 逐幀更新，
easeOutCubic，1.6 秒。用 rAF 而不是 `setInterval`：後者的間隔不保證，
掉幀時數字會跳動；以實際經過時間換算進度，掉幀只會少畫幾格。
`prefers-reduced-motion` 時直接顯示終值。

數字用 `font-variant-numeric: tabular-nums`，否則跑動時字寬變化會讓整格左右抖。

### 對比度

首頁背景是影片，亮度不可控，疊在影片上的文字沒有安全值可用。
四張卡片是不透明白底，字都落在白底上，不受影響。

原本區塊下方有一行出處說明，直接疊在影片上——實測深灰字最差 **1.46:1**、
白字在影片最亮時 **1.00:1**，兩種都不行，當時是給那一行自帶白底解決的
（深灰字在白底 5.46:1）。該行已依指示移除，這段留作紀錄：
**之後要在這個區塊加任何直接疊在影片上的文字，都會踩到同一個問題。**
