import ChairmanMessage from "../components/ChairmanMessage.tsx";
import PageHero from "../components/PageHero.tsx";
import Section from "../components/ui/Section.tsx";

/**
 * 「我們有話要說」`/about/message`。
 *
 * 內容整段從原本的 ABOUT 索引頁搬過來，一字未改。
 * ⚠️ 談話全文仍是草稿，見 ChairmanMessage 元件裡的說明。
 *
 * 這一頁不設 hero 照片：PageHero 的 media 是選填，沒有合適的照片就不硬塞。
 * 談話本身自帶 h2，所以 Section 不再另外給標題，避免與 h1 重覆。
 */

export default function AboutMessage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="We Have Something to Say"
        titleId="about-message-heading"
        lede="A message from the chairman on how UDA approaches its work."
      />

      <Section tone="tint">
        <ChairmanMessage headingId="about-chairman-heading" />
      </Section>
    </>
  );
}
