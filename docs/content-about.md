# ABOUT — 文案

> 標記：`[稿]` 取自 web_img 設計稿，可直接用 ·
> `[草稿]` Claude 寫的暫用文字，需你潤稿 ·
> `[待補]` 涉及可查證的事實，不編造，等你提供

---

## Hero

- **Eyebrow** `[稿]`
  WHO WE ARE

- **H1** `[稿]`
  About UDA BIOMED

- **Subhead** `[稿]`
  We investigate disease through the molecular foundations of life.

---

## Our Purpose `[稿]`

UDA BIOMED advances cancer detection research by connecting molecular
investigation, analytical technology and clinical collaboration.

### 延伸段落 `[草稿]`

Cancer rarely announces itself. By the time it becomes visible to conventional
methods, the biology that produced it has already been in motion for a long
time. Our work begins earlier than that — at the level where those changes
first take shape.

---

## Our Perspective `[稿]`

Life is built from atoms. Understanding change at its foundations may reveal
new paths for detecting disease.

- **Signature line** `[稿]`
  Unveiling Dynamic Atoms

### 延伸段落 `[草稿]`

We treat detection as a question of resolution. The earlier a molecular change
can be observed and interpreted with confidence, the more room there is for
research — and eventually for clinical decisions — to respond to it.

---

## Our Approach `[草稿]`

Three commitments shape how we work.

- **Start at the molecular level**
  We look at the changes that precede visible disease, rather than the
  signatures it leaves behind once established.

- **Build methods that hold up**
  A finding is only useful if it can be reproduced. Standardised handling and
  traceable analysis are part of the research, not overhead attached to it.

- **Work with clinicians, not adjacent to them**
  Research questions worth pursuing come from clinical practice. We develop
  ours in conversation with the people who see the problem first-hand.

---

## Our Story `[待補]`

需要你提供：公司成立年份、地點、成立緣由。
這些是可查證的事實，我不編。

---

## Team `[待補]`

需要你提供：姓名、職稱、經歷、照片。
**在你給名單之前，這一區塊不會出現任何人名。**

若暫時不想公開個別成員，也可以整段拿掉，改放一段團隊組成的概述——
那段我可以寫，但需要你告訴我團隊的實際組成方向。

---

## 這一頁不會出現的內容

以下若要放，必須由你提供原始資料：
發表清單、專利、獲獎、資金與募資狀況、員工人數、任何數字。

## 創辦人理念 `[提供]`

文案**逐字取自 `docs/founder_philosophy.txt` 的英文版**，一字未改也未增補。
原檔同時附有中文版，站上目前是全英文所以用英文；之後要做雙語再接中文段落。

原檔夾雜零寬空格（U+200B），已在擷取時清除。

十四段的用法：

| 原檔段 | 用途 |
| ------ | ---- |
| 1 | 引言（`.lede`） |
| 2–11 | 內文，桌機分兩欄 |
| 12 | 抽出為深底大字引言 |
| 13 | 收尾段 |
| 14 | 署名 |

署名照原檔就是「Founder of UDA BIOMED」，**沒有人名，所以不放 placeholder**
——這不是缺漏，是原文本來的寫法。

### 行長

全站最長的閱讀型文字（約 500 字）。單欄不設限的話 768 寬會拉到 73ch，
讀起來是一整面牆，所以單欄時 `max-width: 62ch`，1024 以上改兩欄。

| 寬度 | 版面 | 行長 | 區塊高 |
| ---- | ---- | ---- | ------ |
| 375 | 單欄 | 34ch | 2953px |
| 768 | 單欄 | 62ch | 1939px |
| 1440 | 兩欄 | 54ch | 1553px |

段落加 `break-inside: avoid`，才不會被切成跨欄的兩半。

引言區塊用實心 `--color-primary` 配白字（12.21:1），與董事長談話的
深色區塊同一套語彙。

## 組織架構圖 `[提供＋翻譯]`

結構與名稱取自 `web_img/about/UDA_BIOMED_組織架構.pdf` **第 1 頁**。
PDF 共 3 頁，第 2–3 頁是各部執掌說明（每個轄下單位一句職掌），
目前**沒有**放進網站，之後要做部門詳情可以接。

元件在 `src/components/OrgChart.tsx`，資料與版面分離——之後改組織只動
檔案上方那三份常數。

### 節點的職掌 hover 說明

滑到（或聚焦到）架構圖上任何一個節點，就浮出它的職掌說明；點一下會釘住。
**46 個節點**全部接上，包含治理主軸、三個委員會、五室、七個部與 25 個轄下單位。

職掌資料在 `src/data/duties.ts`，與頁面下方的收合清單**共用同一份**，
改職掌只要動那裡，兩處會一起更新。查詢邏輯 `dutiesFor(zh)`：
先查單一條目（董事會、醫材開發、秘書室…），查不到再當成整個分組
（創辦人、董事長、副總經理、各部…）回傳全部條目。
「董事會」刻意由前者命中——旁邊三個委員會在圖上是獨立節點，
不該全塞進董事會的說明裡。

實作要點：

- 節點是 `<button>` 不是 `div`。沒有 hover 的裝置只剩點擊這條路，
  鍵盤也要能 Tab 到。手機實測點擊可開、浮層自動縮到 311px。
- **hover 時要抬高節點自己的 `z-index`**，否則節點文字會被浮層的陰影壓暗。
- 浮層預設向右展開，靠近容器右緣時**翻向左邊**。這個判斷要量測後才知道，
  純 CSS 做不到，所以放在 state 裡（`--pop-w` 與程式裡的 `POP` 常數同值，
  目前 440px，改一邊要改兩邊）。
- **`.hasDuty` 不能寫 `color: inherit`。** 它排在 `.node` / `.asideItem`
  之後，會蓋掉各節點自己的文字色——深藍節點上的白字會變成深藍字。
  文字色一律交給各節點的 class；`.officeItem` 與 `.unit` 從 `li` 改成
  `button` 後不再繼承，要明寫 `color`。
- 限高 18rem 並自己捲，避開 `Section` 的 `overflow-x: clip` 連帶
  把另一軸也裁掉的問題。

### 語言：英文為主、中文為小字副標

架構圖全是專有名詞。保留原文，我的翻譯就不會變成唯一依據。

**官方英文**（來自你們自己的環境照片招牌，不是我翻的）：

| 中文 | 英文 | 來源 |
| ---- | ---- | ---- |
| 研發部 | R&D Department | `web_img/research` 照片 |
| 醫材開發 | Medical Device Development | 同上 |
| 藥物研發 | Drug Discovery | 同上 |
| 軟體開發 | Software Development | 同上 |
| 生技產品 | Biotech Products | 同上 |
| 品質部 | Quality Assurance | `web_img/technology` 照片 |
| 商務發展 | Business Development | `web_img/partnership` 照片 |
| 行政部 | Administration | 同上 |
| 財務部 | Finance | 同上 |

**其餘為我翻譯**，需要你校對，特別是這幾個有多種慣用譯法的：

- 總經理 → President（也可能是 General Manager，看你們慣用哪個）
- 副總經理 → Vice President
- 薪資報酬委員會 → Compensation Committee（上市櫃有時用 Remuneration）
- 內部稽核處 → Internal Audit Office
- 總務部 → General Affairs
- 環安衛 → Environment, Health & Safety
- 炊事 → Catering

### 色彩：只做識別，不承載文字

七個部的色值自 PDF 實際取樣：

| 部門 | 色值 | 白字對比 |
| ---- | ---- | -------- |
| 研發部 | `#d71920` | 5.19:1 |
| 品管部 | `#e87722` | **2.96:1** |
| 商務部 | `#d6a000` | **2.36:1** |
| 公關部 | `#176b2c` | 6.61:1 |
| 行政部 | `#147db3` | 4.55:1 |
| 總務部 | `#2f3b8f` | 9.80:1 |
| 財務部 | `#5a278a` | 10.04:1 |

原件是白字壓在色塊上，但橘與金**撐不住白字**（門檻 4.5:1），照搬會有兩個部
讀不到。所以顏色改成卡片上緣的色條與轄下單位的左側色條，部門名稱一律深色。
顏色與文字資訊重複，屬裝飾性，不受 1.4.11 約束。

### 版面

七個部：375 一欄、640 兩欄、1024 四欄、1440 起七欄一列（與原件相同）。
治理層用巢狀 `ul`／`li` 表達層級——這是階層在語意上的正確寫法，
讀屏會直接報出層數與項目數。連接線一律用 border／pseudo-element，不用 SVG：
這張圖從 375 到 1920 都要重排，SVG 座標得跟著算，CSS 的線會自己跟著版面走。

財務部在原圖是從總經理直接拉線，其餘六部歸副總經理，卡片上有標示。

> 實作時踩到的坑：`.office` 這個類名同時給了側邊幕僚室的 `<ul>` 和
> 五室的 `<li>`，撞名讓 `<ul>` 吃到本來要給 `<li>` 的外框，變成一個
> 橫跨整列的白框。後者已改名 `.officeItem`。

## 職掌說明

原本頁面下方有一份 14 組的收合清單，**已移除**——組織架構圖的節點 hover
已經涵蓋同樣的內容，兩者並存等於同一份資料講兩次。
`Responsibilities.tsx` 與其樣式檔一併刪除。

資料本身保留在 `src/data/duties.ts`，由架構圖使用，之後要再做別的呈現
方式不用重新轉錄。內容來源與待校對事項見上一節。
