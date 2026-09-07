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

**漸層掛在照片那一層，而且第一個色標是完全不透明的色票。**

照片上緣是「卡片實色」與「照片」的交界。漸層在那裡若是 0.95，交界兩側就差 5%，
會顯出一條線。從 `rgb(var(--tone))`（完全不透明）起頭時，交界兩側是同一個顏色，
**結構上就沒有邊**——不是靠調參數把它藏起來。

**色標分兩組。** 色標是相對「照片框」算的，而照片框在卡片裡的佔比兩個斷點差很多
（窄螢幕上緣 48%、桌機 6%），同一組色標之下明顯化開的位置會差很遠：

| | 色標 | 開始化開的位置（相對卡片） |
| - | ---- | ---- |
| < 1024 | `1.0 → 0.82(8%) → 0.45(30%) → 0.18(60%) → 0.06` | **52%** |
| ≥ 1024 | `1.0 → 0.96(30%) → 0.9(44%) → 0.52(68%) → 0.14` | 47% |

窄螢幕可以一路提前，是因為文字整段都在照片之上（文字止於 43%、照片起於 48%），
不必為文字留高濃度區。桌機不行——照片幾乎鋪滿整張卡，文字底端落在照片框的 41%，
那裡不能低於 0.9，否則白字掉到 AA 以下。

（共用一組色標時窄螢幕的 0.9 落在卡片 71%，回報「漸層可以再往上移」就是這個。）

漸層的起點就是照片上緣，所以**照片的比例決定漸層從卡片的多高開始**。
5:4 時照片上緣落在手機卡片的 58%，而文字 43% 就結束，中間夾一段平色，
化開實際上要到 64% 才開始（回報「漸層拉太下面」）。改成 1:1 之後上緣提到 48%，
緊接在文字下方；桌機是 6%。

代價是橫向裁切變多：

| 照片框比例 | 手機上緣位置 | 用到原圖（01 / 02 / 03） |
| -------- | -------- | -------------------- |
| 5:4 | 58% | 100 / 83 / 100% |
| **1:1（目前）** | **48%** | 80 / 67 / 80% |

文字底在桌機落在照片框的 41%，該處濃度約 0.915，白字最差是眉標 5.1:1；
手機的文字整段都在照片之上，落在實色區。

這裡改了五次才對，記一下每一版錯在哪：

| 版本 | 問題 |
| ---- | ---- |
| 遮罩用卡片百分比、文字另一層 | 卡片高度一變，文字底部就落在已經淡掉的區段（0.82 → 0.53） |
| 拆成「文字一層 ＋ 照片一層」 | 對比度好算，但兩層色標對不起來，看起來是兩塊拼接 |
| 色票 → navy 雙色漸層 | 對比度更好，但不是要的效果 |
| 一條跨滿整張卡、0.96 起頭 | 卡片上半部是實色、照片上緣仍差 4%，線還在 |
| 拿掉卡片底色 | 整張卡變透明、背景影片透出來，**線依然在**——那條線來自「兩種底」，不是來自底色 |
| **掛在照片層、1.0 起頭**（現在） | 交界同色，無縫 |

文字落在卡片 43～50%，該處濃度 0.9 以上，白字最差是眉標 5.69:1。

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

整張卡那層 0.22 的淡色調已經移除（改由照片自己帶漸層），
所以文字底下只剩 `.text` 自己那層 0.9。疊在「0.9 遮罩 ＋ 純白照片」上的實測：

| | 01 `#1b42a3` | 02 `#313b87` | 03 `#0c132f` |
| ---- | ---- | ---- | ---- |
| 標題 白 100% | 6.94 | 7.54 | 14.01 |
| 內文 白 90% | 5.97 | 6.48 | 11.63 |
| 眉標 白 80% | 5.10 | 5.52 | 9.51 |

中文那三行原本設 0.86 / 0.76 / 0.62，實測是 4.65 / **4.02** / **3.23**——
後兩者不合格，調到 0.90 / 0.84 / 0.80 才過。

卡片高度是照片能不能被看到的關鍵，而且每次加文案都要重算。三個版本：

| | 卡高（窄／寬） | 照片露出 |
| - | ---- | ---- |
| 只有英文、第一版 | 384 | **0～38px（等於沒有）** |
| 只有英文、加高後 | 530 / 484 | 101～185px |
| 加中文之後 | 624 / 544 | 121～172px |
| 卡片加寬、手機改矮之後 | 496 / 544 | 227 / 299px |

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

線段左右各內縮 4.5px（半顆圓點）。第一顆靠左、最後一顆靠右對齊，中心因此落在
`4.5px` 與 `寬度 − 4.5px`；線段若從 0 拉到 100%，兩端會各多出半顆，看起來就是
沒對準（實測線段 0→358、圓點中心 5 與 354）。藍線可跑的距離也要跟著扣掉 9px。

每顆圓點底下掛該張卡的中文標題（指定）。三項分別靠左、置中、靠右，
不然頭尾兩個標題會超出軌道兩端。標籤疊在背景影片上，跟本區塊其餘反白文字
一樣用 `--color-on-video-muted`，另加一層暗色 text-shadow——**陰影不是無障礙的
解法**，影片最亮的畫面白字仍然會弱，但它能明顯改善且不影響深色畫面。
這一段沿用本區塊既有的白字疊影片限制，不是這次新引入的。

進度線**不做 transition**。進度本來就是每幀由 rAF 更新、已經連續，
再補 0.12s 的補間只會讓線拖在手指後面。

圓點**預設是白的，藍線走到才變主色**（指定），走過的留住主色，
**底下的標籤也跟著變主色**（指定）。

**圓點在「藍線走到它」的那一刻才亮**，跟線用同一個依據
（`p >= 該顆的位置`，也就是 0 / 0.5 / 1）。

這裡換過兩次做法，值得記住為什麼：

| 版本 | 適用前提 | 問題 |
| ---- | ---- | ---- |
| 用捲動比例 `p` | — | 有露邊時第三張卡佔滿畫面，比例才七、八成，圓點太晚亮 |
| 用「哪張卡佔畫面最多」 | 有露邊的版型 | 改成一次一張之後，換卡是在兩張的中點，**圓點比線先亮** |
| **回到 `p` 的門檻**（現在） | 一次一張 | 卡片剛好落在 0 / 50% / 100%，線與圓點同時到 |

也就是說「佔畫面最多」是為了補償露邊而存在的，露邊拿掉之後它就成了新的偏差來源。

實測（1920 寬、可捲 1765）：

| `--p` | 線末端 x | 第二顆圓點（x=433） |
| ---- | ---- | ---- |
| 0.283 | 247 | 白 |
| 0.510 | 442 | **亮** |

> 曾經踩過的坑（已不再用，但值得記）：`offsetLeft` 是相對於**定位祖先**
> （這裡一路到 `body`），不是相對於捲動容器。三張卡實測是 814 / 1438 / 2062，
> 而 `scrollLeft` 從 0 起算——不扣掉卡片列自己的偏移，永遠算成第一張。

藍線另外處理：`scrollLeft >= max - 1` 時直接視為 1。`scrollLeft` 幾乎不會剛好
等於 `max`（裝置像素比與慣性收尾都會差零點幾 px），不夾住的話藍線永遠停在 99.x%。

> ⚠️ 標籤變成主色之後有個實質問題：這一條疊在背景影片上，而主色是深藍。
> 影片畫面亮時讀得很清楚（對白 11.29:1），暗時會糊進背景（對黑 1.83:1）；
> 白字剛好相反。不可控的影片上兩種都沒辦法保證合格，這是指定的選擇，
> 陰影從深色改成淺色描邊以減緩。若之後要真的解決，得給標籤一層底。
元件寫入的是
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
2. **不做 rAF 節流，直接在 scroll 事件裡更新。**

> ⚠️ **rAF 節流曾經造成進度條完全不動。** 原本的寫法是「先設一個 frame 旗標、
> 等 rAF 回呼再清掉」：
>
> ```js
> if (frame.current !== undefined) return
> frame.current = requestAnimationFrame(() => { frame.current = undefined; sync() })
> ```
>
> 這是個**閂鎖**——只要那一幀沒跑到，旗標就永遠留著，之後所有 scroll 事件都被
> 忽略，`--p` 卡在 0。回報的「手機滑到第三張了，底下還沒走到第二顆圓點」就是
> 這個樣子；在背景分頁裡可以直接重現（`scrollLeft` 已到底而 `--p` 仍是 0）。
> 行動瀏覽器在慣性捲動、分頁不在前景、或合成緊繃時都可能延後或吃掉那一幀。
>
> 不節流的代價很小：只寫一個節點的兩個屬性，而瀏覽器本來就把 scroll 事件
> 併到每一幀派發。

實測（真實滑鼠捲動）：`scrollLeft 600/990 → --p 0.606`、`reached 2`；
滑到底 `990/990 → --p 0.999`、`reached 3`、藍線 857/857。

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

### 一次只顯示一張

依指示改成一張卡佔滿可視區，不再露下一張的邊角。

`.rail` 的寬度必須是 `100%`（＝可視區寬），卡片的 `flex: 0 0 100%` 才有東西可以
對齊；原本是 `width: max-content`，那樣百分比會對著「三張卡的總寬」解析，
等於自己算自己。現在卡片各佔 100% 並溢出這一層，捲動由 `.viewport` 負責。

**副作用是好的**：每張卡的捲動位置剛好落在可捲距離的 0 / 50% / 100%
（實測 390：卡片起點 0/374/748、可捲 748；1512：0/868/1736、可捲 1735），
所以藍線會精準停在圓點上——先前「卡片到了、軌道還沒到」的落差在結構上消失了。

> **每次改卡片尺寸都要重量兩組漸層。** 色標是相對「照片框」的百分比，
> 而文字在照片框裡的位置會隨卡片寬高變。這次卡片變寬之後，文字底端從
> 桌機 52% 移到 62%、手機 7% 移到 15%，舊色標在那裡只剩 0.74 / 0.815，
> 眉標（白 80%）掉到約 4.0 與 4.3，都低於 AA。調整後是 0.911 / 0.945，
> 最差 5.23:1。

### 不用 scroll-snap（三個症狀同一個成因）

原本是 `scroll-snap-type: x mandatory` ＋ 卡片 `scroll-snap-align: start`。
回報三件事，其實是同一件：

| 症狀 | 原因 |
| ---- | ---- |
| 手機「滑不動」 | 小幅度滑動沒過門檻，會被彈回原位，看起來像沒反應 |
| 「右滑一下第二張就貼到最左」 | 過了門檻就整張跳到底，中間沒有停留 |
| 進度軌「只有三種軌跡」 | 停下來的位置永遠只有 0 / 0.5 / 1 三個 |

拿掉 snap 之後停在哪就是哪，進度軌也跟著連續（實測捲到 37% 不會被彈回）。

`overflow-y` 也明寫 `hidden`：只設 `overflow-x: auto` 時另一軸會**計算成 auto**，
這一層就成了雙軸捲動容器；內容只要比它高一點點，垂直滑動就會被它吃掉、整頁不動。
目前垂直溢出是 0，但那是算出來剛好，字體或行高一變就會踩到。

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

- **按鈕** `[待確認連結]`：Global Disease Market Scenario Platform → `/technology`
  > 原話寫成 “Screnario”，判定為 Scenario 的筆誤，已用正確拼法。
  > 連結目標沒有指定，先接 TECHNOLOGY（這一段講的就是技術平台），要改再說。

> **版面**：這一段不再自成一個 Section。依指示搬到四格數字上方，
> 與最新消息／三張研發卡同一個容器內，桌機橫跨兩欄。
>
> **已刪除**（依指示整組移除，抄錄留存於此，之後要復原可直接取用）：
>
> 三張卡：
>
> | 卡片 | 內文 |
> | --- | --- |
> | Scientific Foundation | Builds testable research questions from established cancer biology and detection science. |
> | Validated | Accumulates evidence through reproducibility, stability, interference assessment and analytical performance. |
> | Translatable | Connects IP, co-development and industry collaboration according to R&D maturity. |
>
> 浮動標籤（參考網站疊在插圖上）：
>
> - Interference Control — Assessing background variation and potential interference
> - Recognition Interface — Building measurable and comparable recognition conditions
> - Translation & IP — Connecting IP, co-development and industry collaboration

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

### R&D Portfolio Snapshot 三格 `[草稿]`

依指示把原本的 To add 方塊改成正式內容。**外觀維持原樣**——虛線框、圓角、小標籤、
配圖位置都沒變，只是標籤從 `To add` 換成編號 `01／02／03`，內容換成文案。

| 格 | 標題 | 配圖 | 來源 |
| --- | --- | --- | --- |
| 01 | Research organization | `resp-1` | `web_img/research/S__213983245.jpg`（研發部入口） |
| 02 | Technical planning | `resp-2` | `web_img/technology/pic.jpg`（品質部／實驗區走廊） |
| 03 | Collaboration structure | `resp-3` | `web_img/about/pic.jpg`（廠區外觀） |

> ⚠️ **三段內文都是草稿，依指示先擬（「第三格直接先幫我掰」）。**
>
> 三個項目名稱有依據：參考網站這一段的免責聲明原句寫明那些數字是用來說明
> 「research organization、technical planning、collaboration-discussion structure」，
> 項目就照這三個切分。**但底下的敘述是我寫的。**
>
> 內文刻意不含任何成果、數據、時程、臨床階段、論文、專利或合作對象——
> 那些是 CLAUDE.md 明訂不能編的。參考網站的三個數字（影片中看似 18／27／43）
> 一樣沒有採用。**上線前需要你或客戶改寫確認。**
>
> ⚠️ 配圖與各格內容沒有對應關係（`alt=""` 當裝飾）；resp-1／resp-2 的場景與
> 上方最新消息的縮圖重複，現有素材只有六個辦公環境場景，避不開。

其餘子項（Scientific & Data Integrity 等）影片中讀不完整，仍為 `[待補]`。

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

目前的首頁區塊順序（2026-09-07 起）：

| | 順序 |
| - | ---- |
| 所有寬度 | hero → **核心定位 ＋ 四格數字** → 消息區塊 → **技術平台** → 企業責任 → 聯絡我們 |

研發焦點的三張橫向卡依指示搬到 RESEARCH 的 Research Focus 底下（2026-09-07），
右欄沒有東西了，`.newsFocus` 的兩欄格線一併拆掉，回到單純的直向堆疊，
桌機與手機的順序因此相同。

調整過程：

- 四格數字原本在消息之前，移到消息／卡片那一列的正下方（2026-09-05）
- 「核心定位」與「技術平台」對調，核心定位在前（2026-09-06）
- 技術平台的標題與導言搬到四格數字上方，底下的三張卡與三格特性刪除（2026-09-06）
- **核心定位整段搬到最新消息之前**，成為 hero 之後的第一個內容區塊（2026-09-07）
- **研發焦點三張卡搬到 RESEARCH**，首頁的兩欄格線拆除（2026-09-07）
- **消息區塊改成兩個主題**：解決方案分析 ＋ 最新消息（2026-09-07）
- **四格數字搬到核心定位底下**，與它同屬一個 Section（2026-09-07）。放同一個
  Section 而不是自成一段，是為了不讓兩段的 Section 內距相加、中間空出兩倍距離。
  上緣間距依指示維持搬動前的 `calc(var(--space-6) * 2)`（96px）——
  一度改成一份 48px，但視覺上要的是原本那個距離

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

### 消息區塊：兩個主題

依指示改成一個 block 內兩個主題，上為 **解決方案分析**、下為 **最新消息**。

- 兩個標題都放進捲動區裡，才不會一個固定、一個跟著捲；捲動區因此有兩個
  對等的 h2，用其中之一當名稱會誤導，改用 `aria-label`
- 現有六則草稿留在「解決方案分析」底下（依指示，原本的標題就是被改名的那一個）
- 「最新消息」底下三則（`LATEST`），依指示新增

> ⚠️ **兩組共九則全是草稿**，日期也是排版用的假值。內文刻意不含成果、數據、
> 臨床階段、論文、專利或合作對象。上線前需要真實內容替換。
>
> ⚠️ 現有那六則的形態是消息（有分類與日期），掛在「解決方案分析」底下並不自然。
> 若要把它們移到「最新消息」、另外補解決方案分析的內容，改 `NEWS` 的位置即可。

### 版面

兩個標題用英文（**Solution Analysis** / **Latest News**），與全站一致。

| 項目 | 做法 |
| --- | --- |
| 區塊寬度 | 維持滿版。一度限寬到 64rem 解「行寬太長」，但那讓整塊擠在左邊、右側空一大片（回報「整塊只在左邊」） |
| 清單 | ≥1024 兩欄（`column-gap: var(--space-6)`），行寬問題交給欄寬解決，右邊那片空白也用掉了 |
| 標題間距 | `.blockTitle` 的 `margin-bottom` 24→32px；第二個主題 `.topicNext` 上緣 32→48px、分隔線下方 24→32px |
| 列內距 | `padding-block` 16→24px、`padding-inline` 8→16px |
| 每則右下 | 只有箭頭的圓鈕（44×44）。原本是 `Read more` 方鈕，九顆並排太搶戲（回報「太醜」） |
| 箭頭配色 | 依指示一開始就是**藍底白箭頭**，hover 轉橘（`--color-orange`） |
| 手機縮圖 | **改成鋪滿整列的模糊背景**（見下） |

箭頭全部指向 `/research`：單則消息沒有自己的頁面（純前端靜態站，也還沒有內容
來源），所以指向同一頁，而不是編造一個不存在的網址。**圖示本身沒有可讀的名稱**，
連結的名稱完全靠 `visually-hidden` 的那段文字，各自帶自己的標題。

桌機列樣式：

- `align-items: stretch` ＋ 縮圖 `height: 100%`——縮圖跟著整列拉高，
  右下的箭頭因此對得齊（格線列高由同一列最高的那則決定）
- 縮圖欄 6.5rem → **10rem**。拉滿列高之後 6.5rem 配 158px 高＝比例 0.66，
  而原圖是 16:9，`cover` 會裁成一條窄長的直片；10rem 之下框接近 1:1（實測 160×174）
手機（基準規則）改成另一種版型：**照片鋪滿整列當模糊背景**。

窄螢幕放不下並排的縮圖欄，縮到 5.5～7rem 之後照片小到看不出是什麼，
比例也一直喬不好（4:3 從 16:9 的原圖裁掉左右各 25%，看起來像被放大過）。
鋪滿之後不論原圖比例都不會出現怪框，每一則也有了自己的視覺。

- `.newsThumb`：`position: absolute; inset: 0; z-index: -1`
- `img`：`filter: blur(2px)` ＋ `transform: scale(1.05)`。10px → 5px → 2px，
  兩次回報都嫌太糊。文字的可讀性靠白幕，不靠模糊，所以模糊可以壓很低。
  放大是為了蓋掉模糊在邊緣造成的透明羽化——羽化寬度約等於模糊半徑，
  2px 只需要 `scale(1.02)`，1.05 留了餘裕
- `::after` 白幕 `rgba(255,255,255,0.55)`。文字是深色 `#05101f`，
  **白幕疊在純黑照片上（最差情況）合成後亮度 0.2633，對比 5.69:1**；
  照片是白的那一端是 18.5:1。0.68 也試過，但辦公環境照本身就亮，
  白幕再厚就整片糊掉。**0.5 以下會掉到 4.5:1 以下，不要再往下調**
- 列與列之間改用 `margin-top`，不再用分隔線——每一則已經有自己的底

> ⚠️ 桌機那段 `@media (min-width: 1024px)` **必須排在所有 news 基準規則之後**。
> 一開始它排在 `.newsThumb` 前面，同權重下輸給後面的基準規則，
> 桌機也吃到了模糊背景（實測 1920px 下 `position: absolute`、`blur(10px)`）。
> 該段同時要把 `z-index` 收回 `auto`：縮圖在桌機是格線項目，`-1` 一樣生效，
> 會被 `.newsItem:hover` 的底色蓋住。

箭頭鈕的對比：靜止是白箭頭疊在 `--color-primary`，**12.21:1**，合格。
⚠️ hover 轉橘之後白箭頭只有 **2.60:1**，低於 WCAG 1.4.11 對圖形物件的 3:1——
這是全站橘色既有的取捨，見 `docs/design-node.md`；要合格的話 hover 的箭頭
改成 `--color-primary-600`（5.70:1）。

> ⚠️ 這一段的 `.newsItem` 規則必須留在檔案最後。前面（`.newsList` 兩欄那段）也有
> 同權重的 `.newsItem`，CSS Modules 依原始順序輸出，同權重下後面的贏——
> 先寫在前面時 `grid-template-columns` 被後面那條 6.5rem 蓋掉，實測欄寬還是 104px。

兩組共用 `NewsRow` 元件，列樣式只有一份。

`.newsScroll` 原本在 1024 以上有一組覆寫（`flex-basis: 0` ＋ `max-height: none`），
把高度交給右欄的卡片決定。卡片搬走後那組沒有意義，留著會讓高度塌到
`min-height` 的 18rem（實測 288px），已刪除；高度改由 `max-height: 28rem` 一路管到底。

### Latest News —— 版面依 `index_img/part1.jpeg`

#### 縮圖 `[配圖與內容無關]`

縮圖取自 `web_img` 根目錄的辦公環境照（`S__215490584`～`588`），
轉成 `public/media/news-1`～`news-5`（480px 寬，jpg 20～22K、webp 14～18K）。

> ⚠️ **配圖是隨機指定的，與該則消息的內容沒有關係。**
> 這幾則消息本身就是佔位草稿（日期、標題、摘要都是編的），照片只是辦公室環境照。
> 實際消息進來時，圖要跟著一起換。

六則消息、五張照片，第六則輪回第一張。`web_img` 裡另外兩張
（`S__215490582` / `583`）與研發重點卡片的照片是同一張——同一頁重複出現不好看，
所以沒有採用；驗證方式是比對 md5，不是看檔名。


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

### 已移出首頁

> 移除時**誤刪了另外兩塊的間距**：那條 margin 規則是
> `.focusGroup, .statsBlock, .newsFocus > .chairman` 共用的，
> 我用「選擇器最後一項是 chairman」去判斷要刪哪些區塊，整組就一起被刪了，
> 卡片與四格之間的留白因此消失（窄螢幕 96px、寬螢幕 192px）。已補回。
>
> 教訓：**刪選擇器時要看整組，不能只看最後一項。**


董事長談話**已依指示從首頁移除**（2026-09-06），改放在 ABOUT 頁最下層，
細節見 `docs/content-about.md`。這一節以下關於內容、肖像與署名的說明仍然適用，
只是實際出現的位置換了。

首頁 `.newsFocus` 因此剩三塊：消息、研發重點卡片、四格數字。

### 談話內容 —— 全文 `[草稿]`、署名與肖像 `[已提供]`

這一段是**理念陳述而非事實主張**，所以可以擬草稿。刻意不含任何
成果、數據、時程、獎項、專利或合作對象——這些依 CLAUDE.md 一律不編造。

**談話全文仍是我擬的草稿，需要本人或客戶確認後才算數。**

署名與肖像已由 `index_img/message/` 提供（2026-09-06）：

| 素材 | 來源 | 用法 |
| ---- | ---- | ---- |
| 肖像 | `S__215490576_0.jpg`（1370×1148） | 轉成 `public/media/chairman.{jpg,webp}`，900px 寬 |
| 姓名 | `S__215490575_0.jpg`（黎恭楷 / Kung-kai Lee） | **排成文字，不用圖** |

姓名那張只是排版好的字、沒有手寫筆跡，排成文字可縮放、可選取、讀屏讀得到，
不必多一個圖檔。原本的 `To add: name` 佔位已移除。

### 肖像的排法

指定「照片放右半、不要 Chairman / UDA BIOMED 那兩行字」。原本的直式肖像欄
（3:4、11rem 寬、底下兩行說明）整組移除。

**照片用 `mask-image` 淡出，不是疊一層漸層色。** 這張卡是半透明玻璃疊在背景影片上，
照片左邊那一片是「玻璃 ＋ 影片」；疊色票漸層永遠接不上那個底，交界會顯出來。
遮罩是讓照片自己淡到全透明，露出的就是旁邊同一片玻璃，結構上無縫。
（研發卡片是實色底，所以那邊用漸層色就夠——**兩種底、兩種做法**。）

| | 排法 | 遮罩 |
| - | ---- | ---- |
| < 1024 | 排在文字下方，4:3 | 由上往下，`transparent → #000 38%` |
| ≥ 1024 | 絕對定位貼右半，寬 52%，**上緣從 6.5rem 起** | 由左往右，`transparent → #000 46%` |

寬螢幕的照片**不能從卡片頂端開始**。卡片頂端是那條深藍眉標帶（實測 130px 高），
而人物的頭頂在照片的 57px 處——滿高時整顆頭都在帶子底下（回報「頭的部分被遮住」）。

上緣設 6.5rem（104px）比帶子矮一些是刻意的：讓帶子壓在照片上緣之上、蓋掉那條硬邊，
看到的只有帶子自己的下緣線。帶子只會比這個值更高（引言換行時會長高），不會更矮。

副作用是好的：照片框因此變成 590×495，比例 1.19，**與原圖的 1.19 完全相同——
一點都沒裁到**。

`object-position: 34% 22%`：原圖是橫幅、人物偏左，往左上取景才保得住人物與
桌上的「董事長 Chairman」名牌。

寬螢幕的文字欄限在 `max-width: 52%`，不壓到人物身上。照片是絕對定位圖層，
所以 `.chairman` 要 `position: relative; isolation: isolate`，眉標與內文各自
`z-index: 1`——否則絕對定位的圖層會蓋在靜態文字之上。

### 桌機底部那格空白（已修）

董事長談話的卡片在桌機被撐成 **731px，而內容只有 513px**——多出來的 218px 就是
卡片底部那格空白，而且卡片還**溢出 Section 底部 96px**，把它與下一段之間的間距
吃掉了。兩個現象同一個成因。

`.card` 有 `height: 100%`，那是給「同一列並排的兩張卡要等高」用的
（消息｜研發卡片）。董事長談話自己獨佔一列，沒有要跟誰對齊，而它又帶了
192px 的 `margin-top`：百分比高度對著 auto 的列解析、列高又包含那個 margin，
Chrome 算出來就是 731px。

修法是 `.newsFocus > .chairman { height: auto }`。修完卡片 539px、
底部只剩自己的 25px 內距，到下一段的間距回到 192px（Section 底 96 ＋ 下段頂 96）。

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
