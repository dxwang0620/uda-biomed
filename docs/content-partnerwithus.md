# PARTNER WITH US — CTA 文案

> **這不是一個頁面。**
>
> `CLAUDE.md` 明確定義 PARTNER WITH US 是行動呼籲（CTA），指向 `/contact`。
> 目前實作也是這樣：`src/config/site.ts` 的 `CTA` 常數。
>
> 這個檔案收的是這組 CTA 在各處出現時的文字。
>
> **若你其實想讓它變成獨立頁面，告訴我**——那會多一條路由 `/partner-with-us`，
> 並要決定它與 `/partnerships`、`/contact` 三者的分工，避免內容重複。

---

## Header 按鈕 `[稿]`

- **標籤**：PARTNER WITH US
- **去向**：`/contact`
- **樣式**：白底頁面為藍底白字實心鈕；首頁 hero 影片上為白色外框透明底
- **行動版**：漢堡選單展開後置於最下方，維持按鈕樣式並拉滿寬度

---

## 頁尾 CTA 區塊 `[草稿]`

各頁底部共用的深藍色區塊（`--color-navy` 底），與白／`--color-tint` 區塊交錯，
用來建立層次。

- **標題**
  Let's look at it together.

  備選：Start a conversation ／ Work with us ／ Bring us a question

- **內文**
  If you are working on a question about disease at the molecular level, we
  would like to hear about it.

- **按鈕**
  PARTNER WITH US → `/contact`

---

## 各頁專用的 CTA 變體 `[草稿]`

同一顆按鈕，但前面那句話依所在頁面調整，避免整站重複同一句。

| 頁面 | 引導句 | 按鈕 |
| --- | --- | --- |
| `/` 首頁 | 沿用設計稿的雙按鈕：OUR RESEARCH（實心）+ CONTACT US（外框） `[稿]` | — |
| `/about` | Our work depends on the questions other people bring us. | PARTNER WITH US |
| `/research` | 設計稿此處為 EXPLORE OUR TECHNOLOGY → `/technology` `[稿]` | — |
| `/technology` | 設計稿此處為 DISCUSS A RESEARCH COLLABORATION → `/contact` `[稿]` | — |
| `/partnerships` | Tell us what you are working on. | PARTNER WITH US |
| `/contact` | 不放，使用者已經在終點了 | — |

---

## 這組 CTA 不會出現的內容

「立即諮詢」「免費評估」「限時」這類推銷語氣。
生醫形象網站的可信度來自克制，不是來自轉換率話術。
