import { ArrowRight, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel.tsx'
import StatCounters from '../components/StatCounters.tsx'
import HeroVideo from '../components/HeroVideo.tsx'
import Button from '../components/ui/Button.tsx'
import Section from '../components/ui/Section.tsx'
import styles from './Home.module.css'

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
const SNAPSHOT = [
  {
    n: '01',
    title: 'Research organization',
    body: 'Research is organized around cancer detection, with molecular recognition, material interfaces and signal analysis run as parallel workstreams rather than a single linear pipeline.',
    file: 'resp-1',
  },
  {
    n: '02',
    title: 'Technical planning',
    body: 'Each workstream is planned in stages, from question definition through reproducibility and interference assessment, so that a method advances only when the previous stage holds.',
    file: 'resp-2',
  },
  {
    n: '03',
    title: 'Collaboration structure',
    body: 'Discussions with clinical, academic and industry groups are held at defined maturity points, keeping intellectual property and co-development terms aligned with what has been validated.',
    file: 'resp-3',
  },
]

const NEWS_THUMBS = [
  { file: 'news-1', alt: 'UDA BIOMED 辦公室入口通道，左側為會客區，前方指標牌標示各部門方向。' },
  { file: 'news-2', alt: 'UDA BIOMED 走廊，指標牌標示研發部、品質部與實驗區，右側為會議室。' },
  { file: 'news-3', alt: 'UDA BIOMED 主管樓層走廊，指標牌標示總經理室、副總室與辦公室主任。' },
  { file: 'news-4', alt: 'UDA BIOMED 研發部入口，牆面標示醫材開發、藥物研發、軟體開發與生技產品。' },
  { file: 'news-5', alt: 'UDA BIOMED 接待櫃檯與品牌牆，後方為玻璃隔間的會議室。' },
]

/* 最新消息三則。**全是草稿**，依指示先擬（「幫我加三則最新消息」）。
   刻意不含任何成果、數據、臨床階段、論文、專利或合作對象——
   那些是 CLAUDE.md 明訂不能編的。日期同樣是排版用的假值。
   上線前需要真實內容替換。 */
const LATEST = [
  {
    category: 'Research',
    date: '02 Sep 2026',
    title: 'Notes on how a detection question becomes a method',
    excerpt: 'The steps between framing a question and having something that can be run twice.',
  },
  {
    category: 'Technology',
    date: '19 Aug 2026',
    title: 'What reproducibility means for a recognition interface',
    excerpt: 'Why the same conditions have to hold before a measurement is worth comparing.',
  },
  {
    category: 'Collaboration',
    date: '05 Aug 2026',
    title: 'How we prepare for a first technical discussion',
    excerpt: 'What is useful to bring, and what we can and cannot share at that stage.',
  },
]

const NEWS = [
  {
    category: 'Research',
    date: '21 Aug 2026',
    title: 'Research direction update for cancer-detection technology',
    excerpt: 'How UDA frames the questions it is currently pursuing, and what it is deliberately leaving open.',
  },
  {
    category: 'Technology',
    date: '04 Aug 2026',
    title: 'UDA Biochip platform development progress',
    excerpt: 'Where the platform stands across recognition, sensing and data analysis.',
  },
  {
    category: 'Collaboration',
    date: '17 Jul 2026',
    title: 'Academic and industry collaboration announcement',
    excerpt: 'The kinds of partners we are looking for, and what a first conversation usually covers.',
  },
  {
    category: 'Framework',
    date: '29 Jun 2026',
    title: 'Proto-Structural Biology research framework update',
    excerpt: 'Reading change from atomic and molecular structure through to cellular state.',
  },
  {
    category: 'Intellectual Property',
    date: '12 Jun 2026',
    title: 'Intellectual property and translational development notice',
    excerpt: 'What gets disclosed at each stage of R&D maturity, and why the rest waits.',
  },
  {
    category: 'Responsibility',
    date: '26 May 2026',
    title: 'Corporate responsibility and data governance statement',
    excerpt: 'Scientific integrity, privacy governance and respect for life as working constraints.',
  },
]





const POSITIONING_TAGS = [
  'Cancer Detection Technology',
  'Cancer Research',
  'Proto-Structural Biology',
  'Cross-Disciplinary R&D',
  'Intellectual Property',
  'Industry Collaboration',
]

type NewsItem = {
  category: string
  date: string
  title: string
  excerpt: string
}

/* 一則消息。兩個主題共用同一個列樣式，所以抽出來。

   右下的按鈕依指示接到 RESEARCH——單則消息沒有自己的頁面（這是純前端的
   靜態站，也還沒有內容來源），所以全部指向同一頁，而不是編造一個不存在的網址。 */
function NewsRow({ item, thumbIndex }: { item: NewsItem; thumbIndex: number }) {
  const thumb = NEWS_THUMBS[thumbIndex % NEWS_THUMBS.length]

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
          <Link to="/research" className={styles.newsArrow}>
            <span className="visually-hidden">Read more: {item.title}</span>
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </li>
  )
}

export default function Home() {
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
        <p className={styles.lede}>
          UDA BIOMED is a biomedical technology company centered on
          innovation-driven R&amp;D. Its current public focus is cancer research and
          detection technology, supported by UDA Biochip Technology as a key
          platform; Proto-Structural Biology serves as one of UDA&rsquo;s original
          frameworks for integrating structural biology, molecular biophysics,
          biochemistry, materials science and life-signal research. UDA emphasizes
          validation, intellectual property and translational development so that
          technology can progress from concepts and data toward co-development and
          licensing partnerships.
        </p>
        </div>
        <ul role="list" className={styles.tagRow}>
          {POSITIONING_TAGS.map((tag) => (
            <li key={tag} className={styles.tagLarge}>
              {tag}
            </li>
          ))}
        </ul>

        {/* 與 hero 主要 CTA 同一個變體（橘底、hover 轉深藍），指定要一致。 */}
        <p className={styles.moreRow}>
          <Button to="/research" variant="accent">
            Learn more
          </Button>
        </p>

        {/* 數字統計。刻意不放標題與出處說明（指定），所以沒有可指向的標題，
            改用 aria-label 說明它是什麼。
            ⚠️ 後兩個數字是佔位值，見 StatCounters 內的說明。

            依指示排在核心定位底下。放在同一個 Section 裡而不是自成一段，
            是為了不讓兩段的 Section 內距相加、中間空出兩倍的距離。 */}
        <div className={styles.statsBlock}>
          <StatCounters />
        </div>
      </Section>
      <Section tone="translucent" labelledBy="responsibility-heading">
        <div className={styles.intro}>
          <p className={styles.eyebrow}>CORPORATE RESPONSIBILITY</p>
          <h2 id="responsibility-heading" className={styles.sectionTitle}>
            Protecting every life through responsibility
          </h2>
          <p className={styles.lede}>
            UDA builds long-term trust through scientific integrity, privacy
            governance and respect for life, advancing R&amp;D value alongside
            social responsibility.
          </p>
        </div>

        <div className={styles.snapshot}>
          <p className={styles.eyebrow}>R&amp;D PORTFOLIO SNAPSHOT</p>

          <ul role="list" className={styles.snapCards}>
            {SNAPSHOT.map(({ n, title, body, file }) => (
              <li key={title} className={styles.snapCard}>
                {/* 配圖是辦公環境照，與這一格的內容沒有對應關係，alt="" 當裝飾 */}
                <picture className={styles.snapMedia}>
                  <source
                    srcSet={`${import.meta.env.BASE_URL}media/${file}.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`${import.meta.env.BASE_URL}media/${file}.jpg`}
                    alt=""
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <p className={styles.snapTag}>{n}</p>
                <h3 className={styles.snapTitle}>{title}</h3>
                <p className={styles.snapBody}>{body}</p>
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
          <div className={`${styles.newsBlock} ${styles.reveal}`}>
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

              <ol className={styles.newsList}>
                {NEWS.map((item, i) => (
                  <NewsRow key={item.title} item={item} thumbIndex={i} />
                ))}
              </ol>

              {/* 第二個主題。⚠️ 三則都是草稿，見 LATEST 的說明。 */}
              <h2 className={`${styles.blockTitle} ${styles.topicNext}`}>
                Latest News
              </h2>

              <ol className={styles.newsList}>
                {LATEST.map((item, i) => (
                  <NewsRow key={item.title} item={item} thumbIndex={i + 3} />
                ))}
              </ol>
            </div>
          </div>

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
            <p className={styles.lede}>
              UDA Biochip Technology integrates molecular recognition, material
              interfaces, biosensing, microscale engineering, signal transduction
              and data analysis as a key platform for life-signal research and
              cancer-detection technology. Our focus is not only on acquiring
              signals, but also on whether they can be recognized, compared,
              validated and progressively translated into results with application
              potential. Core designs, material structures, recognition mechanisms
              and final product form are disclosed progressively in line with
              R&amp;D and intellectual-property strategy.
            </p>

            {/* 與核心定位那顆同一個變體（橘底、hover 轉深藍）。
                指向 TECHNOLOGY——這一段講的就是技術平台。 */}
            <p className={styles.moreRow}>
              <Button to="/technology" variant="accent">
                Global Disease Market Scenario Platform
              </Button>
            </p>
          </div>
        </div>
      </Section>

    </>
  )
}
