import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel.tsx";
import LatestRail from "../components/LatestRail.tsx";
import { useHeroVideoEnabled } from "../hooks/useHeroVideoEnabled.ts";
import HeroVideo from "../components/HeroVideo.tsx";
import Button from "../components/ui/Button.tsx";
import Section from "../components/ui/Section.tsx";
import { usePress } from "../hooks/usePress.ts";
import styles from "./Home.module.css";

/* 版面與文案依 index_video 參考影片重建，逐字內容見 docs/content-home.md。
   標 [抄錄] 的是從錄影讀出、待你校對；日期與數字一律不抄，走 <Placeholder>。 */

/* 最新消息。版面依 index_img/part1.jpeg：縮圖 +（分類・日期）+ 標題 + 兩行摘要。

   分類、標題、摘要、**日期**全部是佔位用的假資料，你指定要填的。
   上線前務必整批換掉——這一區已經沒有任何畫面上的草稿標記了，
   看起來就跟正式內容一樣。哪些欄位是假的記錄在 docs/content-home.md。

   縮圖沒有素材，走佔位框。你給圖之後把 .newsThumb 換成 <img> 即可。 */
/* 縮圖取自 web_img 根目錄的辦公環境照（S__215490584～588）。

   ⚠️ **配圖與新聞內容無關。** 這幾則消息本身是佔位草稿（日期、標題、摘要都是編的，
   見下方 NEWS 的說明），照片只是辦公室環境照，指定「隨機加上去」。
   實際消息進來時，圖也要一起換成該則消息的圖。

   五張輪流用在六則消息上——`web_img` 裡另外兩張（S__215490582／583）
   與研發重點卡片的照片是同一張，同一頁重複出現不好看，所以沒有採用。 */
/* R&D Portfolio Snapshot 的三格。
 *
 * ⚠️ **三段內文都是草稿，依指示先擬。** 三個項目名稱取自參考網站這一段的
 * 免責聲明原句——它寫明那些數字是用來說明「research organization、technical
 * planning、collaboration-discussion structure」——所以項目本身有依據，
 * 但底下的敘述是我擬的。
 *
 * 刻意不含任何成果、數據、時程、臨床階段、論文、專利或合作對象：
 * 那些是 CLAUDE.md 明訂不能編的。參考網站的三個數字（影片中看似 18／27／43）
 * 一樣沒有採用。上線前需要你或客戶改寫確認。 */
/* 研發快照。依指示由三格改成兩格，文案是你提供的原話，一字未改
   （分類／標題／英文標語／中文標語）。配圖原本是辦公環境照（snap-1～3），
   現在三格共用一支晶片影片，檔名寫在下方的 JSX 裡，所以這裡不帶 file。 */
const SNAPSHOT = [
  {
    n: "01",
    category: "數位醫療研發",
    title: "嗅覺語言系統",
    tagline: "THE FUTURE IS NOT JUST SEEN. IT IS SENSED.",
    taglineZh: "未來，不只是被看見，更是被感知。",
  },
  {
    n: "02",
    category: "一般數位醫療",
    title: "癌症檢測專案",
    tagline: "SENSING BEYOND HUMAN PERCEPTION.",
    taglineZh: "突破人類認知的界線。",
  },
];

const NEWS_THUMBS = [
  {
    file: "news-1",
    alt: "UDA BIOMED 辦公室入口通道，左側為會客區，前方指標牌標示各部門方向。",
  },
  {
    file: "news-2",
    alt: "UDA BIOMED 走廊，指標牌標示研發部、品質部與實驗區，右側為會議室。",
  },
  {
    file: "news-3",
    alt: "UDA BIOMED 主管樓層走廊，指標牌標示總經理室、副總室與辦公室主任。",
  },
  {
    file: "news-4",
    alt: "UDA BIOMED 研發部入口，牆面標示醫材開發、藥物研發、軟體開發與生技產品。",
  },
  {
    file: "news-5",
    alt: "UDA BIOMED 接待櫃檯與品牌牆，後方為玻璃隔間的會議室。",
  },
];

/* 原本這裡還有一份 LATEST（最新消息兩則）。依指示搬到核心定位底下的
   細線列表，資料改放在 src/components/LatestRail.tsx 裡，這裡不再保留一份——
   兩邊各記一份文案遲早會走鐘。 */

const NEWS: NewsItem[] = [
  {
    category: "Research",
    date: "21 Aug 2026",
    title: "Research direction update for cancer-detection technology",
    excerpt:
      "How UDA frames the questions it is currently pursuing, and what it is deliberately leaving open.",
    /* 指定用這張。與其餘幾則輪用的辦公環境照不同，這張有品牌牆與展示中的晶片。 */
    thumb: "news-lobby",
    thumbAlt: "",
  },
  {
    category: "Technology",
    date: "04 Aug 2026",
    title: "UDA Biochip platform development progress",
    excerpt:
      "Where the platform stands across recognition, sensing and data analysis.",
  },
  {
    category: "Collaboration",
    date: "17 Jul 2026",
    title: "Academic and industry collaboration announcement",
    excerpt:
      "The kinds of partners we are looking for, and what a first conversation usually covers.",
  },
  {
    category: "Framework",
    date: "29 Jun 2026",
    title: "Proto-Structural Biology research framework update",
    excerpt:
      "Reading change from atomic and molecular structure through to cellular state.",
  },
  {
    category: "Intellectual Property",
    date: "12 Jun 2026",
    title: "Intellectual property and translational development notice",
    excerpt:
      "What gets disclosed at each stage of R&D maturity, and why the rest waits.",
  },
  {
    category: "Responsibility",
    date: "26 May 2026",
    title: "Corporate responsibility and data governance statement",
    excerpt:
      "Scientific integrity, privacy governance and respect for life as working constraints.",
  },
];

const POSITIONING_TAGS = [
  "Cancer Detection Technology",
  "Cancer Research",
  "Proto-Structural Biology",
  "Cross-Disciplinary R&D",
  "Intellectual Property",
  "Industry Collaboration",
];

type NewsItem = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  /** 覆寫去向。沒給的話指向 /research——多數消息還沒有自己的頁面。 */
  to?: string;
  /** 覆寫縮圖（public/media 下的檔名）。沒給的話輪用 NEWS_THUMBS 的辦公環境照。 */
  thumb?: string;
  /** 覆寫縮圖的替代文字 */
  thumbAlt?: string;
};

/* 一則消息。兩個主題共用同一個列樣式，所以抽出來。

   右下的按鈕依指示接到 RESEARCH——單則消息沒有自己的頁面（這是純前端的
   靜態站，也還沒有內容來源），所以全部指向同一頁，而不是編造一個不存在的網址。 */
function NewsRow({ item, thumbIndex }: { item: NewsItem; thumbIndex: number }) {
  const fallback = NEWS_THUMBS[thumbIndex % NEWS_THUMBS.length];
  const thumb = item.thumb
    ? { file: item.thumb, alt: item.thumbAlt ?? "" }
    : fallback;
  const to = item.to ?? "/research";

  return (
    <li className={styles.newsItem}>
      {/* 縮圖。圖與這則消息的內容無關，見 NEWS_THUMBS 的說明。 */}
      <picture className={styles.newsThumb}>
        <source
          srcSet={`${import.meta.env.BASE_URL}media/${thumb.file}.webp`}
          type="image/webp"
        />
        <img
          src={`${import.meta.env.BASE_URL}media/${thumb.file}.jpg`}
          alt={thumb.alt}
          width={480}
          height={270}
          loading="lazy"
          decoding="async"
        />
      </picture>

      <div className={styles.newsBody}>
        <p className={styles.newsMeta}>
          <span className={styles.newsCategory}>{item.category}</span>
          <span className={styles.newsDate}>
            <Calendar size={13} strokeWidth={2} aria-hidden="true" />
            {item.date}
          </span>
        </p>
        <h3 className={styles.newsTitle}>{item.title}</h3>
        <p className={styles.newsExcerpt}>{item.excerpt}</p>

        <p className={styles.newsCta}>
          {/* 只有箭頭（指定）。圖示本身沒有可讀的名稱，所以連結的名稱
              完全靠這段隱藏文字——九個連結的目的地相同，唸出標題才分得出
              是哪一則。 */}
          <Link to={to} className={styles.newsArrow}>
            <span className="visually-hidden">Read more: {item.title}</span>
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </li>
  );
}

export default function Home() {
  /* 觸控裝置沒有 hover，整組效果關在 @media (hover: hover) 裡，
     手機上點消息區塊完全沒反應。這裡補一個按壓狀態，與四格數字同一個 hook。 */
  const news = usePress();

  /* 研發快照三格共用的那支影片要不要掛上 DOM。
     與首頁 hero 同一個 hook：prefers-reduced-motion 時只留 poster。 */
  const snapVideo = useHeroVideoEnabled();

  /* 董事長談話預設收合，點藍色區塊下緣的箭頭展開。 */

  return (
    <>
      <HeroVideo>
        <HeroCarousel />
      </HeroVideo>

      {/* 核心定位。依指示排在最新消息之前——hero 之後的第一個內容區塊。 */}
      <Section tone="translucent" labelledBy="positioning-heading">
        <div className={styles.intro}>
          <h2 id="positioning-heading" className={styles.sectionTitle}>
            UDA BIOMED core positioning
          </h2>
          {/* 依指示縮短。原文（抄錄自參考影片）共 76 字，三個長句；
            這一版 40 字，保留三件事：公司定位、目前的公開重點、
            驗證與 IP 的立場。被拿掉的是 Proto-Structural Biology 那一串
            學科列舉——底下的標籤列已經列出同樣的詞。
            全文留在 docs/content-home.md。 */}
          <p className={styles.lede}>
            UDA BIOMED is a biomedical technology company centered on
            innovation-driven R&amp;D, with its current public focus on cancer
            research and detection technology. UDA emphasizes validation,
            intellectual property and translational development, so that
            technology can progress from data toward co-development and
            licensing.
          </p>
        </div>
        <ul role="list" className={styles.tagRow}>
          {POSITIONING_TAGS.map((tag) => (
            <li key={tag} className={styles.tagLarge}>
              {tag}
            </li>
          ))}
        </ul>

        {/* 依指示改成藍鈕。hero 那顆維持橘色，只有頁面中段這兩顆換色。
            順帶把文字對比從 2.60:1（白字疊橘，不合格）拉到 12.21:1。 */}
        <p className={styles.moreRow}>
          <Button to="/research" variant="primary">
            Learn more
          </Button>
        </p>

        {/* 最新消息，細線列表。依指示取代原本那三格數字（全球人口／新增癌症
            病例／研發中項目數），文案是原本排在底下 Latest News 的那兩則，
            那一塊同時移除。刻意不放標題（沿用三格數字的作法），
            元件內用 aria-label 說明它是什麼。

            位置維持在核心定位底下、同一個 Section 裡，
            這樣兩段的 Section 內距才不會相加、中間空出兩倍的距離。 */}
        <div className={styles.statsBlock}>
          <LatestRail />
        </div>
      </Section>
      {/* 企業責任那段（CORPORATE RESPONSIBILITY ＋ Protecting every life…）
          依指示搬到 /about/company，排在 Our Approach 與創辦人理念之間。
          這一塊因此只剩研發快照，眉標升格為區塊自己的 h2——
          每個 Section 都要有自己的標題，原本那個 h2 已經跟著搬走了。 */}
      <Section tone="translucent" labelledBy="snapshot-heading">
        <div className={styles.snapshot}>
          <h2 id="snapshot-heading" className={styles.eyebrow}>
            R&amp;D PORTFOLIO SNAPSHOT
          </h2>

          <ul role="list" className={styles.snapCards}>
            {SNAPSHOT.map(({ n, category, title, tagline, taglineZh }) => (
              <li key={title} className={styles.snapCard}>
                {/* 三格共用同一支影片（指定）：background_video/chip.mp4 降速
                    一倍之後的版本。三個 <video> 指向同一個檔，瀏覽器只會抓一次。

                    純裝飾，aria-hidden；內容全在底下的文字上。
                    prefers-reduced-motion 時整個 <video> 不掛上 DOM，
                    只留 poster——擋顯示擋不住下載，所以要在 JS 這一層判斷。 */}
                <div className={styles.snapMedia}>
                  {snapVideo ? (
                    <video
                      className={styles.snapVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={`${import.meta.env.BASE_URL}media/snap-chip.jpg`}
                      aria-hidden="true"
                    >
                      {/* mp4 排在前面：這支片 VP9 壓完比 H.264 大，
                          瀏覽器取第一個支援的來源，順序反了就會抓到大的那個。
                          實測 mp4 458KB、webm 349KB——webm 重壓到 crf 48 之後
                          才比較小，所以這裡仍是 webm 優先。 */}
                      <source
                        src={`${import.meta.env.BASE_URL}media/snap-chip.webm`}
                        type="video/webm"
                      />
                      <source
                        src={`${import.meta.env.BASE_URL}media/snap-chip.mp4`}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <img
                      className={styles.snapVideo}
                      src={`${import.meta.env.BASE_URL}media/snap-chip.jpg`}
                      alt=""
                      width={960}
                      height={450}
                      loading="lazy"
                      decoding="async"
                    />
                  )}

                  {/* 文字內嵌在影片上（指定）。影片是淺底的工程圖，
                      白字直接疊上去會消失，所以壓一層由下而上的深藍漸層。 */}
                  <div className={styles.snapText} lang="zh-Hant">
                    <p className={styles.snapTag}>{n}</p>
                    <p className={styles.snapCategory}>{category}</p>
                    <h3 className={styles.snapTitle}>{title}</h3>
                    <p className={styles.snapTagline} lang="en">
                      {tagline}
                    </p>
                    <p className={styles.snapBody}>{taglineZh}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 消息與技術平台導言兩塊。
          多個對等的 h2，用其中之一當 section 名稱會誤導，故不設 labelledBy。

          原本右欄是研發重點的三張橫向卡，依指示搬到 RESEARCH 的 Research Focus
          底下；董事長談話更早之前搬到 ABOUT。兩者都走了，這裡不再需要兩欄格線，
          回到單純的直向堆疊。 */}
      <Section tone="translucent">
        <div className={styles.newsFocus}>
          {/* 技術平台的標題與導言。依指示搬到四格數字上面；
              原本那一段底下的三張卡（Scientific Foundation / Validated /
              Translatable）與三格特性（Interference Control / Recognition
              Interface / Translation & IP）依指示整組刪除。 */}
          <div className={styles.platformIntro}>
            {/* 參考影片只拍到「… verifiable technology platform」，
                前半段是依上下文擬的草稿，見 docs/content-home.md */}
            <h2 id="platform-heading" className={styles.sectionTitle}>
              Building a verifiable technology platform
            </h2>
            {/* 依指示縮短。原文 73 字；這一版 41 字，保留平台整合了什麼、
                以及「訊號要能比對與驗證」這個重點。被拿掉的是逐項列舉
                （microscale engineering、signal transduction）與揭露策略那一句。
                全文留在 docs/content-home.md。 */}
            <p className={styles.lede}>
              UDA Biochip Technology brings molecular recognition, material
              interfaces, biosensing and data analysis together as a key
              platform for life-signal research. The focus is not only on
              acquiring signals, but on whether they can be compared, validated
              and translated into results with application potential.
            </p>

            {/* 與核心定位那顆同一個變體（依指示改成藍鈕）。
                指向 TECHNOLOGY——這一段講的就是技術平台。 */}
            <p className={styles.moreRow}>
              <Button to="/technology" variant="primary">
                Global Disease Market Scenario Platform
              </Button>
            </p>
          </div>
          <div
            className={`${styles.newsBlock} ${styles.reveal} ${
              news.pressed ? styles.pressed : ""
            }`}
            {...news.handlers}
          >
            {/* 同一個 block 內兩個主題（指定）：解決方案分析 在上、最新消息 在下。
                兩個標題都放進捲動區裡，才不會一個固定、一個跟著捲。

                捲動區必須自己能拿到焦點，否則只用鍵盤的人捲不動它——
                Firefox 會自動給焦點，Chrome 不會，所以明寫 tabIndex。
                裡面有兩個對等的 h2，用其中之一當名稱會誤導，改用 aria-label。 */}
            <div
              className={styles.newsScroll}
              tabIndex={0}
              role="group"
              aria-label="Solution analysis and latest news"
            >
              <h2 className={styles.blockTitle}>Solution Analysis</h2>

              {/* 窄螢幕只列前三則（指定）。用 CSS 的 nth-child 收掉後面三則，
                  不在這裡依視窗寬度切資料——那要多一個 matchMedia 的狀態，
                  而且伺服器端預抓的 HTML 沒有視窗寬度，會先畫六則再閃成三則。 */}
              <ol className={`${styles.newsList} ${styles.newsListTrim}`}>
                {NEWS.map((item, i) => (
                  <NewsRow key={item.title} item={item} thumbIndex={i} />
                ))}
              </ol>

              {/* 原本這裡還有第二個主題 Latest News。依指示移除——
                  那兩則的文案搬到上面核心定位底下的細線列表（LatestRail）。 */}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
