import { useState } from 'react'
import { Calendar, ChevronDown, ImageIcon, User } from 'lucide-react'
import ContactSwitch from '../components/ContactSwitch.tsx'
import FocusStack from '../components/FocusStack.tsx'
import HeroCarousel from '../components/HeroCarousel.tsx'
import StatCounters from '../components/StatCounters.tsx'
import HeroVideo from '../components/HeroVideo.tsx'
import Card from '../components/ui/Card.tsx'
import Placeholder from '../components/ui/Placeholder.tsx'
import Section from '../components/ui/Section.tsx'
import styles from './Home.module.css'

/* 版面與文案依 index_video 參考影片重建，逐字內容見 docs/content-home.md。
   標 [抄錄] 的是從錄影讀出、待你校對；日期與數字一律不抄，走 <Placeholder>。 */

/* 最新消息。版面依 index_img/part1.jpeg：縮圖 +（分類・日期）+ 標題 + 兩行摘要。

   分類、標題、摘要、**日期**全部是佔位用的假資料，你指定要填的。
   上線前務必整批換掉——這一區已經沒有任何畫面上的草稿標記了，
   看起來就跟正式內容一樣。哪些欄位是假的記錄在 docs/content-home.md。

   縮圖沒有素材，走佔位框。你給圖之後把 .newsThumb 換成 <img> 即可。 */
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

/* 董事長談話草稿。版型參考 index_img/chairman_message_page_mockup_classic.html：
   眉標 → 大字引言 + 短橫線 → 內文 + 直式肖像欄 → 簽名區。
   示意檔是整頁版型，麵包屑、中/EN 切換、底部連結列不適用（那些頁面不存在）。

   示意檔裡的營收、成長率、毛利率、員工數、人名都是通用模板的填充值，
   一個都沒有沿用——那些正是 CLAUDE.md 禁止編造的東西。

   這一段是理念陳述而非事實主張，所以可以擬，但刻意不含任何成果、數據、
   時程、獎項或合作對象。署名待你提供，不自行填人名。 */
const CHAIRMAN_QUOTE = 'Patience is not the opposite of urgency.'

const CHAIRMAN_MESSAGE = [
  'Our work begins with a simple conviction: that the earliest changes of disease are written in the molecules of the body, long before anything becomes visible. Reading them is difficult, and we do not pretend otherwise.',
  'What we can commit to is discipline. Every question we pursue has to be answerable. Every method we build has to be reproducible by someone other than ourselves. Every result we report has to survive the scrutiny of clinicians who see patients rather than data.',
  'Detection research rewards those willing to build carefully and verify repeatedly — and that is the company we intend to be, for our team and for anyone who shares the goal.',
]


const PLATFORM = [
  {
    title: 'Scientific Foundation',
    body: 'Builds testable research questions from established cancer biology and detection science.',
  },
  {
    title: 'Validated',
    body: 'Accumulates evidence through reproducibility, stability, interference assessment and analytical performance.',
  },
  {
    title: 'Translatable',
    body: 'Connects IP, co-development and industry collaboration according to R&D maturity.',
  },
]

const PLATFORM_PILLS = [
  {
    title: 'Interference Control',
    body: 'Assessing background variation and potential interference',
  },
  {
    title: 'Recognition Interface',
    body: 'Building measurable and comparable recognition conditions',
  },
  {
    title: 'Translation & IP',
    body: 'Connecting IP, co-development and industry collaboration',
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

export default function Home() {
  /* 董事長談話預設收合，點藍色區塊下緣的箭頭展開。 */
  const [messageOpen, setMessageOpen] = useState(false)

  return (
    <>
      <HeroVideo>
        <HeroCarousel />
      </HeroVideo>

      {/* 數字統計。刻意不放標題與出處說明（指定），所以區塊沒有可用的
          標題可指向，改用 aria-label 說明它是什麼。
          ⚠️ 後兩個數字是佔位值，見 StatCounters 內的說明。 */}
      <Section tone="translucent">
        <StatCounters />
      </Section>

      {/* 消息、研發重點卡片、董事長談話三塊。
          多個對等的 h2，用其中之一當 section 名稱會誤導，故不設 labelledBy。

          DOM 順序＝窄螢幕的視覺順序：消息 → 卡片 → 董事長談話。
          1024 以上才用 grid 把董事長談話拉回第一列右欄。 */}
      <Section tone="translucent">
        <div className={styles.newsFocus}>
          <div className={`${styles.newsBlock} ${styles.reveal}`}>
            <h2 id="news-heading" className={styles.blockTitle}>
              Latest News
            </h2>

            {/* 捲動區必須自己能拿到焦點，否則只用鍵盤的人捲不動它——
                Firefox 會自動給焦點，Chrome 不會，所以明寫 tabIndex。 */}
            <div
              className={styles.newsScroll}
              tabIndex={0}
              role="group"
              aria-labelledby="news-heading"
            >
              <ol className={styles.newsList}>
                {NEWS.map(({ category, date, title, excerpt }) => (
                  <li key={title} className={styles.newsItem}>
                    {/* 縮圖佔位。純裝飾，圖進來之後換成 <img>，版面不動。 */}
                    <div className={styles.newsThumb} aria-hidden="true">
                      <ImageIcon size={20} strokeWidth={1.5} />
                    </div>

                    <div className={styles.newsBody}>
                      <p className={styles.newsMeta}>
                        <span className={styles.newsCategory}>{category}</span>
                        <span className={styles.newsDate}>
                          <Calendar size={13} strokeWidth={2} aria-hidden="true" />
                          {date}
                        </span>
                      </p>
                      <h3 className={styles.newsTitle}>{title}</h3>
                      <p className={styles.newsExcerpt}>{excerpt}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* 原本自成一個 Section，眉標／標題／導言已依指示刪除。
              併進這一塊是為了讓董事長談話在窄螢幕能排到卡片下面——
              兩個 Section 之間沒辦法互換順序。 */}
          <div className={styles.focusGroup}>
            <FocusStack />

            <p className={`${styles.note} ${styles.intro}`}>
              R&amp;D can be broad, while market strategy must remain focused. UDA
              currently starts with cancer detection; animal oncology, advanced
              molecules, signal analysis, animal health and other cross-disciplinary
              topics remain in R&amp;D. Focus does not mean expanding every market
              direction at once; today we concentrate resources on cancer-detection
              technology while converting broader research into technical reserves
              and future innovation capacity.
            </p>
          </div>

          <blockquote className={`${styles.card} ${styles.chairman} ${styles.reveal}`}>
            {/* 示意檔把標題當成小眉標，大字引言才是視覺主體。
                但語意上這仍是本區塊的標題，所以維持 h2，只是樣式收小。

                眉標與引言整組放進深色區塊，是為了讓引言能用白字：
                卡片是 25% 白疊在影片上，影片亮的時候會合成成純白，
                白字直接消失（1.00:1）。深色底不透明才撐得住。 */}
            <div className={styles.chairmanHead}>
              <h2 id="chairman-heading" className={styles.chairmanEyebrow}>
                Message from the Chairman
              </h2>
              <p className={styles.pullQuote}>{CHAIRMAN_QUOTE}</p>
              <span className={styles.quoteRule} aria-hidden="true" />

              {/* 展開鈕跨在藍色區塊的下緣上。這是 disclosure 模式：
                  aria-expanded 說明狀態、aria-controls 指向被控制的區塊，
                  只有箭頭沒有文字，所以另外給一個唯讀的名稱。 */}
              <button
                type="button"
                className={styles.toggle}
                aria-expanded={messageOpen}
                aria-controls="chairman-message"
                onClick={() => setMessageOpen((v) => !v)}
              >
                <span className="visually-hidden">
                  {messageOpen ? 'Hide the full message' : 'Read the full message'}
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className={styles.chevron}
                />
              </button>
            </div>

            {/* grid-template-rows 由 0fr 轉 1fr，是能對「高度 auto」做轉場的
                做法；用 max-height 猜一個值會在內容長度改變時卡頓或截斷。
                內層必須 overflow:hidden 且 min-height:0，格線列才收得起來。 */}
            <div
              id="chairman-message"
              className={`${styles.collapse} ${messageOpen ? styles.collapseOpen : ''}`}
            >
              <div className={styles.collapseInner}>

            <div className={styles.chairmanBody}>
              <div className={styles.chairmanText}>
                {CHAIRMAN_MESSAGE.map((para) => (
                  <p key={para.slice(0, 24)} className={styles.quote}>
                    {para}
                  </p>
                ))}
              </div>

              {/* 肖像欄。3:4 直式，同示意檔。沒有照片，走佔位框。 */}
              <div className={styles.portrait}>
                <div className={styles.portraitFrame} aria-hidden="true">
                  <User size={26} strokeWidth={1.5} />
                </div>
                <p className={styles.portraitRole}>Chairman</p>
                <p className={styles.portraitOrg}>UDA BIOMED</p>
              </div>
            </div>

            <footer className={styles.signature}>
              <span className={styles.signatureLabel}>Signed</span>
              <span className={styles.pendingInline}>To add: name</span>
            </footer>
              </div>
            </div>
          </blockquote>
        </div>
      </Section>

      <Section tone="translucent" labelledBy="platform-heading">
        <div className={styles.intro}>
        {/* 參考影片只拍到「… verifiable technology platform」，
            前半段是依上下文擬的草稿，見 docs/content-home.md */}
        <h2 id="platform-heading" className={styles.sectionTitle}>
          Building a verifiable technology platform
        </h2>
        <p className={styles.lede}>
          UDA Biochip Technology integrates molecular recognition, material
          interfaces, biosensing, microscale engineering, signal transduction and
          data analysis as a key platform for life-signal research and
          cancer-detection technology. Our focus is not only on acquiring signals,
          but also on whether they can be recognized, compared, validated and
          progressively translated into results with application potential. Core
          designs, material structures, recognition mechanisms and final product
          form are disclosed progressively in line with R&amp;D and
          intellectual-property strategy.
        </p>
        </div>

        <ul role="list" className={styles.pills}>
          {PLATFORM_PILLS.map(({ title, body }) => (
            <li key={title} className={styles.pill}>
              <strong className={styles.pillTitle}>{title}</strong>
              <span className={styles.pillBody}>{body}</span>
            </li>
          ))}
        </ul>

        <ul role="list" className={styles.cards}>
          {PLATFORM.map(({ title, body }) => (
            <li key={title}>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardBody}>{body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

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

        <div className={styles.todos}>
          <Placeholder title="R&D Portfolio Snapshot">
            Three headline figures with a disclaimer. The figures were not read
            off a handheld recording; supply them, or drop this block.
          </Placeholder>
          <Placeholder title="Corporate Responsibility — sub-items">
            Sub-headings such as Science, Data &amp; Life sit under this section
            in the reference but could not be read in full.
          </Placeholder>
        </div>
      </Section>

      {/* 首頁結尾的聯絡入口，與 /contact 共用同一個元件。
          兩個對等的 h2（一般訪客／KYC）在元件內部，用其中之一當
          section 名稱會誤導，所以這裡自己給一個標題。 */}
      <Section tone="translucent" labelledBy="home-contact-heading">
        <div className={styles.intro}>
          <p className={styles.eyebrow}>GET IN TOUCH</p>
          <h2 id="home-contact-heading" className={styles.sectionTitle}>
            Two ways to reach us
          </h2>
          <p className={styles.lede}>
            A general enquiry, or a formal KYC registration if your
            organisation is entering a working relationship with us.
          </p>
        </div>

        <ContactSwitch />
      </Section>
    </>
  )
}
