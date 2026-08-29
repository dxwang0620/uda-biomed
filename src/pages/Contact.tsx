import PageHero from '../components/PageHero.tsx'
import Placeholder from '../components/ui/Placeholder.tsx'
import Section from '../components/ui/Section.tsx'
import styles from './Contact.module.css'

/* 文案來源 docs/content-contact.md。
   已確認：這一版不做表單，只放聯絡資訊。
   聯絡方式全部 [待補] —— 一個寫錯的 email 比整頁空白還糟，絕不放假值。 */

const ENQUIRIES = [
  {
    title: 'Research collaboration',
    body: 'Proposals for joint investigation, or questions about our research focus.',
  },
  {
    title: 'Clinical partnership',
    body: 'Enquiries from clinical groups and medical institutions.',
  },
  {
    title: 'General enquiries',
    body: 'Everything else.',
  },
]

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Contact"
        titleId="contact-heading"
        lede="We welcome enquiries from research groups, clinical partners and organisations working on related questions."
      />

      <Section labelledBy="details-heading">
        <h2 id="details-heading">Contact Details</h2>
        <div className={styles.details}>
          <Placeholder title="Email、電話、地址">
            全部需要你提供，一項都不編。沒有的欄位直接刪掉，
            不要放 info@example.com 這類佔位值上線。
            營業時間若不想公開也可以整列拿掉。
          </Placeholder>
        </div>
      </Section>

      <Section tone="tint" labelledBy="enquiries-heading">
        <h2 id="enquiries-heading">Enquiry Types</h2>
        <p className={styles.lede}>
          Tell us which of these fits best — it helps your message reach the
          right person.
        </p>
        <dl className={styles.enquiries}>
          {ENQUIRIES.map(({ title, body }) => (
            <div key={title} className={styles.enquiry}>
              <dt className={styles.enquiryTitle}>{title}</dt>
              <dd className={styles.enquiryBody}>{body}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.note}>
          <Placeholder title="各類別的收件信箱">
            若不同洽詢類別要用不同 email，請告訴我。
            若最後只公開一個信箱，上面這一整區可以拿掉。
          </Placeholder>
        </div>
      </Section>

      <Section>
        <div className={styles.todos}>
          <Placeholder title="Media Enquiries">
            需要你決定是否設獨立的媒體聯絡窗口，或併入一般聯絡。
          </Placeholder>
          <Placeholder title="社群連結">
            LinkedIn、X 等。只放實際存在且由你們經營的帳號，
            沒有就不放，不要留空連結或指向首頁的假連結。
          </Placeholder>
        </div>
      </Section>
    </>
  )
}
