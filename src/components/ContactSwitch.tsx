import { useState } from 'react'
import { Building2, UserRound } from 'lucide-react'
import styles from './ContactSwitch.module.css'

/**
 * 兩個並排的聯絡區塊，點一邊就滑過去蓋住另一邊。
 * 一般訪客走藍色、KYC 走橘色，收合時只留一條可點的直式標籤。
 *
 * ⚠️ 送出目的地尚未接。GitHub Pages 沒有後端，表單要嘛走 mailto:、
 * 要嘛送到 Formspree 這類第三方服務，CLAUDE.md 要求實作前先確認。
 * 在確定之前 handleSubmit 只擋下事件、不送任何資料出去——
 * 尤其 KYC 收的是統編與個人聯絡方式，不能先隨便找個地方丟。
 */

type Field = {
  name: string
  /** 表單欄位標籤。英文為主、中文為輔，與全站一致。 */
  en: string
  zh: string
  type: 'text' | 'email' | 'tel'
  required?: boolean
  autoComplete?: string
  /** 額外說明，例如格式 */
  hint?: string
}

const VISITOR_FIELDS: Field[] = [
  { name: 'name', en: 'Name', zh: '姓名', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', en: 'Email', zh: '信箱', type: 'email', required: true, autoComplete: 'email' },
]

const KYC_FIELDS: Field[] = [
  {
    name: 'company',
    en: 'Company',
    zh: '公司行號',
    type: 'text',
    required: true,
    autoComplete: 'organization',
  },
  {
    name: 'taxId',
    en: 'Business number',
    zh: '統一編號',
    type: 'text',
    required: true,
    hint: '8 digits',
  },
  { name: 'name', en: 'Name', zh: '姓名', type: 'text', required: true, autoComplete: 'name' },
  {
    name: 'title',
    en: 'Job title',
    zh: '職稱',
    type: 'text',
    required: true,
    autoComplete: 'organization-title',
  },
  { name: 'email', en: 'Email', zh: '信箱', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', en: 'Phone', zh: '電話', type: 'tel', required: true, autoComplete: 'tel' },
  {
    name: 'companyPhone',
    en: 'Company phone',
    zh: '公司電話',
    type: 'tel',
    required: false,
    autoComplete: 'tel',
  },
]

/**
 * 台灣統一編號的檢查碼。
 *
 * 逐位乘上權重，把每個乘積的十位與個位相加，總和能被 5 整除即為有效；
 * 第 7 位是 7 時另有一種合法情況（該位的乘積可算 0 或 1）。
 *
 * 做這個驗證不是為了嚴謹好看——統編打錯一碼，表單照樣送得出去，
 * 但收到的資料是廢的，而且沒有後端可以事後補救。
 */
const TAX_ID_WEIGHTS = [1, 2, 1, 2, 1, 2, 4, 1]

function isValidTaxId(value: string): boolean {
  if (!/^\d{8}$/.test(value)) return false
  const digits = [...value].map(Number)
  const sum = digits.reduce((acc, d, i) => {
    const product = d * TAX_ID_WEIGHTS[i]
    return acc + Math.floor(product / 10) + (product % 10)
  }, 0)
  if (sum % 5 === 0) return true
  // 第 7 位為 7 時，該位乘積可視為進位前後兩種，故 +1 也算通過
  return digits[6] === 7 && (sum + 1) % 5 === 0
}

type PanelId = 'visitor' | 'kyc'

export default function ContactSwitch() {
  /** null＝兩邊各半，尚未選擇 */
  const [active, setActive] = useState<PanelId | null>(null)
  const [taxIdError, setTaxIdError] = useState<string | null>(null)

  /* 收合側不可 Tab 進去，交給 CSS 的 visibility: hidden ——
     隱藏的元素本來就不可聚焦，比用 JS 逐一改 tabindex 可靠，
     也不必為了視窗寬度在 JS 裡再判斷一次斷點。 */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 送出目的地未定，見檔案開頭的說明。
  }

  const panelClass = (id: PanelId) =>
    [
      styles.panel,
      styles[id],
      active === id ? styles.open : '',
      active && active !== id ? styles.shut : '',
    ]
      .filter(Boolean)
      .join(' ')

  return (
    <div className={styles.wrap}>
      <div className={styles.panels}>
        {/* ---- 一般訪客 ---- */}
        <section className={panelClass('visitor')} aria-labelledby="visitor-heading">
          <button
            type="button"
            className={styles.tab}
            aria-expanded={active === 'visitor'}
            onClick={() => setActive(active === 'visitor' ? null : 'visitor')}
          >
            <UserRound size={22} strokeWidth={2} aria-hidden="true" />
            <span className={styles.tabText}>
              <span id="visitor-heading" className={styles.tabEn}>
                General enquiry
              </span>
              <span className={styles.tabZh} lang="zh-Hant">
                一般訪客
              </span>
            </span>
          </button>

          <div className={styles.body}>
            <div className={styles.bodyInner}>
            <p className={styles.blurb}>
              For research groups, clinical partners and anyone with a question
              about our work.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              {VISITOR_FIELDS.map((f) => (
                <FieldRow key={f.name} field={f} />
              ))}

              <div className={styles.row}>
                <label className={styles.label} htmlFor="visitor-message">
                  <span className={styles.labelEn}>Message</span>
                  <span className={styles.labelZh} lang="zh-Hant">
                    訊息
                  </span>
                </label>
                <textarea
                  id="visitor-message"
                  name="message"
                  rows={4}
                  required
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.submit}>
                Send enquiry
              </button>
            </form>
            </div>
          </div>
        </section>

        {/* ---- KYC ---- */}
        <section className={panelClass('kyc')} aria-labelledby="kyc-heading">
          <button
            type="button"
            className={styles.tab}
            aria-expanded={active === 'kyc'}
            onClick={() => setActive(active === 'kyc' ? null : 'kyc')}
          >
            <Building2 size={22} strokeWidth={2} aria-hidden="true" />
            <span className={styles.tabText}>
              <span id="kyc-heading" className={styles.tabEn}>
                KYC registration
              </span>
              <span className={styles.tabZh} lang="zh-Hant">
                KYC 系統
              </span>
            </span>
          </button>

          <div className={styles.body}>
            <div className={styles.bodyInner}>
            <p className={styles.blurb}>
              For organisations entering a formal working relationship. These
              details identify the company and the person we deal with.
            </p>

            <form
              className={`${styles.form} ${styles.formTwoCol}`}
              onSubmit={(e) => {
                const value =
                  (e.currentTarget.elements.namedItem('taxId') as HTMLInputElement)
                    ?.value ?? ''
                if (!isValidTaxId(value)) {
                  e.preventDefault()
                  setTaxIdError('That business number does not check out.')
                  return
                }
                setTaxIdError(null)
                handleSubmit(e)
              }}
            >
              {KYC_FIELDS.map((f) => (
                <FieldRow
                  key={f.name}
                  field={f}
                  error={f.name === 'taxId' ? taxIdError : null}
                  onInput={f.name === 'taxId' ? () => setTaxIdError(null) : undefined}
                />
              ))}

              <button type="submit" className={`${styles.submit} ${styles.submitKyc}`}>
                Submit registration
              </button>
            </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function FieldRow({
  field,
  error,
  onInput,
}: {
  field: Field
  error?: string | null
  onInput?: () => void
}) {
  const id = `f-${field.name}`
  const hintId = field.hint ? `${id}-hint` : undefined
  const errId = error ? `${id}-err` : undefined

  return (
    <div className={styles.row}>
      <label className={styles.label} htmlFor={id}>
        <span className={styles.labelEn}>
          {field.en}
          {!field.required && <span className={styles.optional}> (optional)</span>}
        </span>
        <span className={styles.labelZh} lang="zh-Hant">
          {field.zh}
        </span>
      </label>

      <input
        id={id}
        name={field.name}
        type={field.type}
        required={field.required}
        autoComplete={field.autoComplete}
        onInput={onInput}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errId].filter(Boolean).join(' ') || undefined}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />

      {field.hint && !error && (
        <span id={hintId} className={styles.hint}>
          {field.hint}
        </span>
      )}
      {error && (
        <span id={errId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
