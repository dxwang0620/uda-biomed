/**
 * 站台層級的常數。
 *
 * 注意：部署路徑不在這裡設定。base 的唯一來源是 vite.config.ts 的 BASE，
 * 這裡只從 Vite 注入的 import.meta.env.BASE_URL 推導 router 需要的 basename，
 * 所以兩者不可能對不上。
 */

/** BASE_URL 結尾一定有斜線，router 的 basename 不要有。'/' 會推導成 '/'。 */
export const ROUTER_BASENAME =
  import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export const SITE = {
  name: "UDA BIOMED",
  /** 設計稿 hero 上的主句 */
  tagline: "Advancing Cancer Detection Research",
  description:
    "UDA BIOMED advances cancer detection research by connecting molecular investigation, analytical technology and clinical collaboration.",
} as const;

/** RESEARCH 底下的三個子頁（指定）。標題是原話，沒有改寫也沒有自行翻譯。

    網址用英文 slug：網址會出現在名片、簡報與搜尋結果上，
    中文路徑會被百分比編碼成一長串亂碼。 */
export const RESEARCH_TOPICS = [
  {
    slug: "disease-basis",
    to: "/research/disease-basis",
    zh: "研究疾病的基礎",
  },
  {
    slug: "cancer-prevention",
    to: "/research/cancer-prevention",
    zh: "研究如何預防癌症",
  },
  {
    slug: "digital-health",
    to: "/research/digital-health",
    zh: "研究數位醫療",
  },
] as const;

/** 導覽項目。CTA（PARTNER WITH US）不在此列，它不是導覽項目。 */
export const NAV_ITEMS = [
  { label: "ABOUT", to: "/about" },
  {
    label: "RESEARCH",
    to: "/research",
    /* to 寫成字面值而不是用 slug 組出來：scripts/prerender-routes.mjs 會用
       正規式從這個檔案抓路徑，樣板字串抓不到，三個子頁就不會被預渲染。
       （這段註解本身也不能寫出那個樣式，否則會被抓成一條假路由。） */
    children: RESEARCH_TOPICS.map((t) => ({ label: t.zh, to: t.to })),
  },
  { label: "TECHNOLOGY", to: "/technology" },
  { label: "PARTNERSHIPS", to: "/partnerships" },
  { label: "CONTACT", to: "/contact" },
] as const;

/** PARTNER WITH US 的去向。已確認 CONTACT 頁不做表單，故直接指向 /contact。 */
export const CTA = { label: "PARTNER WITH US", to: "/contact" } as const;

/**
 * 每一頁的 title 與 description。
 *
 * 集中在這裡而不是散在各頁元件，之後要調 SEO 文案只要看一個檔案。
 * title 一律以「— UDA BIOMED」收尾，首頁例外（品牌名放前面）。
 */
export const PAGE_META: Record<string, { title: string; description: string }> =
  {
    "/": {
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
    },
    "/about": {
      title: `About — ${SITE.name}`,
      description:
        "We investigate disease through the molecular foundations of life.",
    },
    "/research": {
      title: `Research — ${SITE.name}`,
      description:
        "Connecting molecular investigation, analytical methods and collaborative research.",
    },
    "/research/disease-basis": {
      title: `研究疾病的基礎 — ${SITE.name}`,
      description: "[待補：研究疾病的基礎]",
    },
    "/research/cancer-prevention": {
      title: `研究如何預防癌症 — ${SITE.name}`,
      description: "[待補：研究如何預防癌症]",
    },
    "/research/digital-health": {
      title: `研究數位醫療 — ${SITE.name}`,
      description: "[待補：研究數位醫療]",
    },
    "/technology": {
      title: `Technology — ${SITE.name}`,
      description:
        "An integrated research workflow connecting laboratory processes, analytical systems and data interpretation.",
    },
    "/partnerships": {
      title: `Partnerships — ${SITE.name}`,
      description:
        "Research questions worth answering rarely belong to one group alone.",
    },
    "/contact": {
      title: `Contact — ${SITE.name}`,
      description:
        "Enquiries from research groups, clinical partners and organisations working on related questions.",
    },
  };

export const NOT_FOUND_META = {
  title: `Page not found — ${SITE.name}`,
  description: "The page you are looking for does not exist.",
};
