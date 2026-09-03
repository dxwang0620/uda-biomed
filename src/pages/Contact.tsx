import ContactSwitch from "../components/ContactSwitch.tsx";
import PageHero from "../components/PageHero.tsx";
import Placeholder from "../components/ui/Placeholder.tsx";
import Section from "../components/ui/Section.tsx";
import styles from "./Contact.module.css";

/* 文案來源 docs/content-contact.md。
   聯絡方式仍全部 [待補] —— 一個寫錯的 email 比整頁空白還糟，絕不放假值。

   表單改為兩個並排區塊（一般訪客／KYC），元件在 ContactSwitch。
   ⚠️ 送出目的地尚未接，見該元件開頭的說明。 */

const ENQUIRIES = [
  {
    title: "Research collaboration",
    body: "Proposals for joint investigation, or questions about our research focus.",
  },
  {
    title: "Clinical partnership",
    body: "Enquiries from clinical groups and medical institutions.",
  },
  {
    title: "General enquiries",
    body: "Everything else.",
  },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Contact"
        titleId="contact-heading"
        lede="We welcome enquiries from research groups, clinical partners and organisations working on related questions."
      />

      <Section labelledBy="choose-heading">
        <h2 id="choose-heading">How would you like to reach us?</h2>
        <p className={styles.lede}>
          Two routes in. Pick the one that fits and the panel will open.
        </p>
        <ContactSwitch />
      </Section>

      <Section tone="tint" labelledBy="details-heading">
        <h2 id="details-heading">Contact Details</h2>
        <div className={styles.details}>
          <Placeholder title="Email、電話、地址">提供聯絡資訊。</Placeholder>
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
            若最後只公開一個信箱，上面這一整區可以拿掉。
          </Placeholder>
        </div>
      </Section>

      <Section>
        <div className={styles.todos}>
          <Placeholder title="Media Enquiries">
            獨立的媒體聯絡窗口，或併入一般聯絡。
          </Placeholder>
          <Placeholder title="社群連結">Facebook、LinkedIn、X 等。</Placeholder>
        </div>
      </Section>
    </>
  );
}
