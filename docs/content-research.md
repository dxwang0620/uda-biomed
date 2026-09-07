# RESEARCH — 文案

> 標記：`[稿]` 取自 web_img 設計稿，可直接用 ·
> `[草稿]` Claude 寫的暫用文字，需你潤稿 ·
> `[待補]` 涉及可查證的事實，不編造，等你提供

---

## Hero

- **Eyebrow** `[稿]`
  OUR RESEARCH

- **H1** `[稿]`
  Researching Disease at Its Foundations

- **Subhead** `[稿]`
  Connecting molecular investigation, analytical methods and collaborative
  research.

---

## Research Focus `[稿]`

三張卡片，圖示依序為 DNA 螺旋、放大鏡分子、人物群組。

### 1. Molecular Insights

- **卡片內文** `[稿]`
  Investigating molecular changes that may contribute to disease.

- **延伸段落** `[草稿]`
  Disease begins as a change in molecular behaviour long before it becomes
  measurable by conventional means. We study how those changes arise, how they
  propagate, and which of them carry enough signal to be worth detecting.

### 2. Cancer Detection Research

- **卡片內文** `[稿]`
  Exploring analytical approaches for earlier and more precise detection.

- **延伸段落** `[草稿]`
  Earlier detection is not only a matter of looking sooner — it is a matter of
  distinguishing a real signal from ordinary biological variation. Our research
  examines analytical approaches that aim to make that distinction more
  reliable.

### 3. Clinical Collaboration

- **卡片內文** `[稿]`
  Working with research and clinical partners to translate scientific
  questions.

- **延伸段落** `[草稿]`
  A laboratory result becomes meaningful when it answers a question someone
  actually has. We shape our research alongside clinical and academic partners
  so that what we investigate stays connected to what is needed.

---

## Section CTA `[稿]`

EXPLORE OUR TECHNOLOGY → （指向 /technology）

---

## How We Work `[草稿]`

選用區塊。若嫌頁面太短可以加，內容不涉及任何事實宣稱。

Our research is iterative rather than linear. A question from a clinical
partner shapes a molecular investigation; the analytical constraints of that
investigation shape what can be asked next. We document each step so that a
result can be traced back to the conditions that produced it.

---

## Publications `[待補]`

**不編造。** 需要你提供真實清單，每筆包含：
作者、標題、期刊／會議、年份、DOI 或連結。

沒有發表也完全沒關係——這一區塊直接不做，比放假的好。

---

## Clinical Progress `[待補]`

**不編造，這一區塊風險最高。**

需要你確認可公開到什麼程度。特別注意：

- 試驗期別（Phase I / II / III）**絕對不能推測或近似**
- 「臨床驗證中」「已進入試驗」這類措辭都有法規意涵，需你確認
- 若目前僅為研究階段、尚未進入任何臨床試驗，直接這樣寫最安全

在你給明確說法之前，這一區塊我不會產出任何文字。

---

## 這一頁不會出現的內容

準確率、敏感度、特異度、樣本數、任何百分比或效能數字。
這類數字寫錯的後果遠比版面難看嚴重。

## 現階段研發焦點（橫向卡）`[草稿]`

依指示從首頁搬到這裡，排在 Research Focus 的三張卡下方、`Explore our technology`
之上。元件是 `FocusStack`，內容不變（癌症研究與檢測技術／UDA 生物晶片技術／
原構生物學，文案抄自 `index_img/card1–3.jpg`）。

**這是全站唯一的中文區塊**，其餘頁面都是英文。搬到 RESEARCH 之後仍然如此，
要統一語言的話這一塊要一起處理。

### 配色要覆寫

元件預設是給首頁用的——整塊疊在背景影片上，所以軌道、圓點、圖例全是透明白。
這一頁的 Section 是 `tone="tint"`（實測底色 `#fbfbfc`），白色等於看不見（1.06:1）。

`FocusStack` 的進度軌因此改成走 `--rail-*` 變數，**預設值一律寫在 `var()` 的
第二引數**，不在元件內自己宣告一次——在元素上宣告會遮蔽從祖先繼承下來的值，
使用端的覆寫就永遠不會生效（`Placeholder` 那邊踩過同一個坑）。

`src/pages/Research.module.css` 的 `.focusRail` 覆寫成淺底用的一套：

| 變數 | 首頁（預設） | RESEARCH | 實測 |
| --- | --- | --- | --- |
| `--rail-label` | `--color-on-video-muted` | `--color-text-muted` | 對 `#fbfbfc` **5.83:1** |
| `--rail-dot-ring` | 白 0.7 | `--color-text-muted` | 同上 |
| `--rail-line` | 白 0.45 | `--color-border` | 1.46:1，純背景線 |
| `--rail-label-shadow` | 深藍描邊 | `none` | 底色固定，不需要靠描邊救對比 |

圓點的環比軌道深一階，是照深底那邊的關係換算的（環白 0.7、軌道白 0.45）：
環要看得出三個位置在哪，軌道只是背景。

### 電腦版照片：框要跟著卡片走

搬過來之後照片在電腦版整個壞掉（回報「三格電腦版照片修一修」）。原因是尺寸假設變了：

| | 卡片 | 照片框（`aspect-ratio: 1/1`，貼齊卡片下緣） | 結果 |
| - | - | - | - |
| 首頁（右欄約 860px） | 860×704 | 860×860 | 上緣裁掉 156px，可接受 |
| RESEARCH（滿版） | 1440×704 | **1440×1440** | **上緣裁掉 638px**，只看得到照片底部一小條 |

更糟的是遮罩漸層畫在照片框上：框比卡片高一倍時，有 44% 的漸層落在卡片外，
卡片上半因此是半透明色壓在放大兩倍的照片上。

改成 `inset: 0`——照片框直接鋪滿卡片，框與漸層都跟著卡片走，不再受寬度影響。
代價是 2.05 的框配 1.25 的原圖，`cover` 會上下對裁約 39%；三張的主體都在
畫面中段，裁得掉。

色標同時要重算：舊的一組（0.96 @45%、0.9 @66%、0.5 @82%、0.14 @100%）是配
「只看得到下半段」定的，攤平到整張卡片之後 0～45% 都還在 0.96 以上，
卡片會變成一片實色。現在是 0.95 @30%、0.82 @48%、0.4 @72%、0.08 @100%。

文字最低的那一列（標籤）落在卡片 28.4% 處，該處濃度 0.953；即使照片在那裡是
純白（最差情況），白字仍有 **7.94:1**。
