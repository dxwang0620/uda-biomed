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
