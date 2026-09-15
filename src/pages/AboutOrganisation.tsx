import OrgChart from "../components/OrgChart.tsx";
import PageHero from "../components/PageHero.tsx";
import Section from "../components/ui/Section.tsx";

/**
 * 「宇達組織架構」`/about/organisation`。
 *
 * 內容整段從原本的 ABOUT 索引頁搬過來。組織資料在 OrgChart 元件裡，
 * 之後改組織只動那一份常數。
 *
 * 原本那一段有自己的 eyebrow ＋ h2 ＋ 一句話；獨立成頁之後那組改由 hero 承擔，
 * 區塊裡只剩圖本身，不然會有兩個層級相同的標題。
 */

export default function AboutOrganisation() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="Organisational Structure"
        titleId="about-org-heading"
        lede="How responsibility is divided across governance, oversight and the operating departments."
      />

      <Section tone="tint">
        <OrgChart />
      </Section>
    </>
  );
}
