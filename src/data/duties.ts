/**
 * 職掌說明資料。取自 web_img/about/UDA_BIOMED_組織架構.pdf 第 2、3 頁。
 *
 * 目前只由組織架構圖 <OrgChart> 使用——節點 hover 時浮出的說明。
 * 原本頁面下方還有一份收合清單，因為與 hover 重複已移除。
 * 資料留在獨立檔案，之後要再做別的呈現方式不用搬。
 *
 * PDF 的中文是向量外框而非文字（字型只有 Helvetica、無 ToUnicode），
 * 無法程式化抽取，是逐條讀圖轉錄的。中文一律保留在英文旁邊：
 * 這些是治理與職權的定義，翻錯會變成對外的錯誤陳述，留著原文才有依據。
 *
 * ⚠️ 英文全部由我翻譯，需要校對後才適合對外。唯一的例外是
 * 「General Manager」——那是 PDF 第 3 頁落款自己寫的。
 */

export type Entry = {
  term: { en: string; zh: string }
  detail: { en: string; zh: string }
}

export type Group = {
  id: string
  /** governance = PDF 第 3 頁；operations = 第 2 頁 */
  scope: 'governance' | 'operations'
  title: { en: string; zh: string }
  entries: Entry[]
}

export const GROUPS: Group[] = [
  {
    id: 'founder',
    scope: 'governance',
    title: { en: 'Founder', zh: '創辦人' },
    entries: [
      {
        term: { en: 'Core position', zh: '核心定位' },
        detail: {
          en: 'The origin of the company and its core values. Leads the founding philosophy, brand core, technology vision and long-term direction, keeping the company aligned with the purpose it was founded on.',
          zh: '公司創立與核心價值之源，主導創辦理念、品牌核心、技術願景及長期發展方向，確保公司發展符合創立宗旨。',
        },
      },
      {
        term: { en: 'Governance participation', zh: '治理參與權' },
        detail: {
          en: "The articles of incorporation and related agreements are to secure the founder's right to attend the shareholders' meeting and to sit on the board as a director, with full access to motions, meeting materials and minutes.",
          zh: '公司應以章程及相關契約確保創辦人有權參加股東會，並以董事身分出席董事會，取得完整議案、會議資料及會議紀錄。',
        },
      },
      {
        term: { en: 'Consent over reserved matters', zh: '保留事項同意權' },
        detail: {
          en: 'On matters touching the founding philosophy, core technology, intellectual property, brand rights, principal line of business, transfer of control, merger, division or dissolution, the founder holds a veto; none may be passed or carried out without the founder’s written consent.',
          zh: '涉及創辦理念、核心技術、智慧財產、品牌權利、主要營業方向、控制權移轉、合併、分割或解散等重大事項，創辦人保有一票否決權；非經創辦人書面同意，不得通過或執行。',
        },
      },
    ],
  },
  {
    id: 'shareholders',
    scope: 'governance',
    title: { en: "Shareholders' Meeting", zh: '股東會' },
    entries: [
      {
        term: { en: "Shareholders' Meeting", zh: '股東會' },
        detail: {
          en: 'Resolves on the articles of incorporation, capital, distribution of earnings, election of directors and other major matters reserved to shareholders by law. In exercising those powers it is to uphold the founding philosophy, core values and long-term vision, and not let short-term return on capital displace the company’s own purpose.',
          zh: '就章程、資本、盈餘分配、董事選任及依法應由股東決議之重大事項作成決議；行使職權時應維護創辦理念、核心價值與長期願景，不得僅以短期資本報酬取代公司獨立宗旨。',
        },
      },
    ],
  },
  {
    id: 'board',
    scope: 'governance',
    title: { en: 'Board of Directors and its units', zh: '董事會及轄下單位' },
    entries: [
      {
        term: { en: 'Board of Directors', zh: '董事會' },
        detail: {
          en: 'Acting on the authority delegated by the shareholders, sets major strategy, approves key policies and investments, and selects and oversees the chairman and management. It is to keep governance, technology and operating direction continuous with the founding philosophy, and carries final oversight responsibility for governance.',
          zh: '承接股東會授權，制定重大策略、核定重要制度及投資，遴選及監督董事長與經營階層；應確保公司治理、技術與營運方向延續創辦理念，並對公司治理負最終監督責任。',
        },
      },
      {
        term: { en: 'Compensation Committee', zh: '薪資報酬委員會' },
        detail: {
          en: 'Recommends to the board on compensation policy, executive remuneration, performance linkage and related arrangements.',
          zh: '向董事會提出薪酬政策、經理人報酬、績效連結及相關制度之審議建議。',
        },
      },
      {
        term: { en: 'Personnel Evaluation Committee', zh: '人事評鑑委員會' },
        detail: {
          en: 'Recommends to the board on senior appointments and removals, appraisal, rewards and discipline, personnel disputes and conflicts of interest.',
          zh: '向董事會提出重大任免、考核、獎懲、人事爭議與利益衝突件之評議建議。',
        },
      },
      {
        term: { en: 'Internal Audit Office', zh: '內部稽核處' },
        detail: {
          en: 'Reports directly to the board. Independently audits internal control, finance, operations and legal compliance, tracks remediation and reports straight to the board.',
          zh: '直屬董事會，獨立查核內控、財務、營運與法令遵循，追蹤缺失改善並直接向董事會呈報。',
        },
      },
    ],
  },
  {
    id: 'chairman',
    scope: 'governance',
    title: { en: 'Chairman', zh: '董事長' },
    entries: [
      {
        term: { en: 'Governance duties', zh: '治理職責' },
        detail: {
          en: 'Convenes and chairs the board and sets its agenda, keeping motions, resolutions and oversight mechanisms working effectively.',
          zh: '召集並主持董事會、規劃議程，確保議案、決議及監督機制有效運作。',
        },
      },
      {
        term: { en: 'Oversight responsibility', zh: '監督責任' },
        detail: {
          en: 'On behalf of the board, supervises the general manager and the execution of major resolutions, staying across operations, finance, risk and governance reporting.',
          zh: '代表董事會督導總經理及重大決議執行，掌握營運、財務、風險與治理報告。',
        },
      },
      {
        term: { en: 'Delegated authority', zh: '授限職責' },
        detail: {
          en: '[To confirm — this entry runs past the edge of the PDF page as rendered and was not transcribed rather than guessed at.]',
          zh: '依董事會決議、公司章程及授權行使職權，推動董事會決策並轉授權……〔後段未能完整讀取，待補〕',
        },
      },
    ],
  },
  {
    id: 'gm',
    scope: 'governance',
    title: { en: 'General Manager and direct units', zh: '總經理及轄下單位' },
    entries: [
      {
        term: { en: 'Operating position', zh: '營運定位' },
        detail: {
          en: "The company's most senior operating officer. Takes up board resolutions and the direction approved by the chairman, and is answerable for overall performance and execution.",
          zh: '公司最高營運主管，承接董事會決議及董事長核定方向，對公司整體經營成果及執行負責。',
        },
      },
      {
        term: { en: 'Line of command', zh: '指揮關係' },
        detail: {
          en: 'Directs the vice general manager, the Finance Department and the five offices; the vice general manager in turn coordinates R&D, Quality Assurance, Business, Public Relations, Administration and General Affairs.',
          zh: '直接指揮副總經理、財務部及轄下五室；由副總經理統籌研發、品管、商務、公關、行政及總務六部。',
        },
      },
      {
        term: { en: 'Decision authority', zh: '決策權責' },
        detail: {
          en: 'Approves the operating plan, budget, personnel, allocation of resources, cross-department coordination and major cases, and handles anything beyond the authority delegated to the vice general manager or to individual units.',
          zh: '核定營運計畫、預算、人事、資源配置、跨部協調及重大案件，並處理超越副總經理或各單位授權之事項。',
        },
      },
      {
        term: { en: 'Reporting duty', zh: '報告責任' },
        detail: {
          en: 'Reports operations, finance, risk and material exceptions to the chairman and the board, carries out board resolutions and accepts oversight.',
          zh: '向董事長及董事會報告營運、財務、風險與重大異常，落實董事會決議並接受監督。',
        },
      },
    ],
  },
  {
    id: 'vgm',
    scope: 'governance',
    title: { en: 'Vice General Manager', zh: '副總經理' },
    entries: [
      {
        term: { en: 'Reporting line', zh: '隸屬關係' },
        detail: {
          en: 'Reports directly to the general manager, taking up delegated and assigned work, and is answerable to the general manager for the results, progress, risk and staffing of the six departments held.',
          zh: '直屬總經理，承接總經理授權與交辦，須就所轄六部之營運成果、進度、風險及人員管理向總經理負責。',
        },
      },
      {
        term: { en: 'Scope of authority', zh: '管轄範圍' },
        detail: {
          en: 'Coordinates R&D, Quality Assurance, Business, Public Relations, Administration and General Affairs. The Finance Department, the five offices and the units under the board fall outside the normal line of command.',
          zh: '統籌研發部、品管部、商務部、公關部、行政部及總務部；財務部、五室與董事會轄下單位不在其常態指揮範圍。',
        },
      },
      {
        term: { en: 'Principal duties', zh: '主要職責' },
        detail: {
          en: 'Integrates resources across departments, reviews the six departments’ plans, budget needs and key results, tracks progress, resolves inter-department conflict, supervises managers and deputy managers and carries through the general manager’s decisions.',
          zh: '整合跨部資源，審查六部計畫、預算需求與重要成果，追蹤進度、處理部門衝突、督導經理與副理並落實總經理決策。',
        },
      },
      {
        term: { en: 'Reporting duty', zh: '報告責任' },
        detail: {
          en: 'Reports operations, risk, staffing and material exceptions to the general manager; anything beyond delegated authority or otherwise material goes up for decision immediately.',
          zh: '向總經理提出營運、風險、人力與重大異常報告；越權或重大事項應立即呈請裁決。',
        },
      },
    ],
  },

  /* ---- PDF 第 2 頁：各部及轄下單位執掌 ---- */

  {
    id: 'rd',
    scope: 'operations',
    title: { en: 'R&D Department', zh: '研發部' },
    entries: [
      {
        term: { en: 'Medical Device Development', zh: '醫材開發' },
        detail: {
          en: 'Device R&D, design verification and productisation.',
          zh: '醫材研發、設計驗證及產品化。',
        },
      },
      {
        term: { en: 'Drug Discovery', zh: '藥物研發' },
        detail: {
          en: 'Formulation, technical research and trial planning.',
          zh: '藥物配方、技術研究及試驗規劃。',
        },
      },
      {
        term: { en: 'Software Development', zh: '軟體開發' },
        detail: {
          en: 'Applications, algorithms, AI and systems integration.',
          zh: '應用程式、演算法、AI 及系統整合。',
        },
      },
      {
        term: { en: 'Biotech Products', zh: '生技產品' },
        detail: {
          en: 'Biotech product development, technology transfer and validation.',
          zh: '生技產品開發、技術導入及驗證。',
        },
      },
    ],
  },
  {
    id: 'qa',
    scope: 'operations',
    title: { en: 'Quality Assurance', zh: '品管部' },
    entries: [
      {
        term: { en: 'Quality Management', zh: '品質管理' },
        detail: {
          en: 'Quality system, document control, audit and continuous improvement.',
          zh: '品質系統、文件管制、稽核及持續改善。',
        },
      },
      {
        term: { en: 'Regulatory Affairs', zh: '法規管制' },
        detail: {
          en: 'Regulatory assessment, registration, licensing and compliance tracking.',
          zh: '法規評估、登記、許可及合規追蹤。',
        },
      },
    ],
  },
  {
    id: 'business',
    scope: 'operations',
    title: { en: 'Business Department', zh: '商務部' },
    entries: [
      {
        term: { en: 'International Affairs', zh: '國際事務' },
        detail: {
          en: 'Overseas markets, international collaboration and business exchange.',
          zh: '海外市場、國際合作及商務交流。',
        },
      },
      {
        term: { en: 'Business Development', zh: '商務發展' },
        detail: {
          en: 'Market development, partnership proposals and business models.',
          zh: '市場開拓、合作提案及商業模式。',
        },
      },
      {
        term: { en: 'Project Investment', zh: '專案投資' },
        detail: {
          en: 'Investor relations, terms negotiation and risk control.',
          zh: '投資人關係、條件談判及風險控管。',
        },
      },
      {
        term: { en: 'Customer Service', zh: '客戶服務' },
        detail: {
          en: 'Intake of requirements, consultation, planning and design, quotation and contracting, and project management.',
          zh: '需求受理、面談、規劃設計、報價簽約及專案管理。',
        },
      },
    ],
  },
  {
    id: 'pr',
    scope: 'operations',
    title: { en: 'Public Relations', zh: '公關部' },
    entries: [
      {
        term: { en: 'Media Relations', zh: '媒體公關' },
        detail: {
          en: 'Brand, media, news and external content.',
          zh: '品牌、媒體、新聞及對外內容管理。',
        },
      },
      {
        term: { en: 'Reception', zh: '櫃台接待' },
        detail: {
          en: 'Reception, visitors, switchboard, post, documents, and receipt and signed acknowledgement of parcels.',
          zh: '接待、訪客、總機電話、郵件、文件及包裹收件與通知簽收。',
        },
      },
      {
        term: { en: 'Community Service', zh: '公益服務' },
        detail: {
          en: 'Community programmes, volunteering, support for people in need and help for stray animals.',
          zh: '公益活動、志工服務、弱勢關懷及流浪動物協助。',
        },
      },
    ],
  },
  {
    id: 'admin',
    scope: 'operations',
    title: { en: 'Administration', zh: '行政部' },
    entries: [
      {
        term: { en: 'Corporate Governance', zh: '公司治理' },
        detail: {
          en: 'Articles of incorporation, shareholders’ meeting, board, formal documents and governance administration.',
          zh: '章程、股東會、董事會、正式文件及治理行政。',
        },
      },
      {
        term: { en: 'Administrative Affairs', zh: '行政事務' },
        detail: {
          en: 'Internal administration, general-affairs coordination, document flow and follow-up.',
          zh: '內部行政、庶務協調、文件流程及事項追蹤。',
        },
      },
      {
        term: { en: 'Human Resources', zh: '人力資源' },
        detail: {
          en: 'Recruitment, pay, attendance, appraisal, benefits and credential checks.',
          zh: '招募、薪酬、出勤、考核、福利及資格查驗。',
        },
      },
      {
        term: { en: 'Environment, Health & Safety', zh: '環安衛' },
        detail: {
          en: 'Occupational safety, first aid, health and workplace risk.',
          zh: '職業安全、急救、健康及工作環境風險。',
        },
      },
    ],
  },
  {
    id: 'ga',
    scope: 'operations',
    title: { en: 'General Affairs', zh: '總務部' },
    entries: [
      {
        term: { en: 'Security', zh: '保全' },
        detail: {
          en: 'Access control, patrol, theft prevention and emergency response.',
          zh: '門禁、巡邏、防盜及緊急事件應對。',
        },
      },
      {
        term: { en: 'Cleaning', zh: '清潔' },
        detail: {
          en: 'Cleaning, upkeep of the environment and supplies.',
          zh: '環境清潔、美化及用品管理。',
        },
      },
      {
        term: { en: 'Catering', zh: '炊事' },
        detail: {
          en: 'Staff meals, kitchen and food hygiene.',
          zh: '員工膳食、廚房及食品衛生。',
        },
      },
      {
        term: { en: 'Transportation', zh: '運輸' },
        detail: {
          en: 'Company vehicles, freight, delivery and fleet scheduling.',
          zh: '公務車、貨運、配送及車務調度。',
        },
      },
      {
        term: { en: 'Facility Management', zh: '設施管理' },
        detail: {
          en: 'Buildings, mechanical and electrical systems, fire safety, equipment and maintenance.',
          zh: '建物、機電、消防、設備及維護管理。',
        },
      },
    ],
  },
  {
    id: 'finance',
    scope: 'operations',
    title: { en: 'Finance Department', zh: '財務部' },
    entries: [
      {
        term: { en: 'Accounting', zh: '會計管理' },
        detail: {
          en: 'Bookkeeping, tax, budget, costing and financial statements.',
          zh: '帳務、稅務、預算、成本及財務報表。',
        },
      },
      {
        term: { en: 'Treasury', zh: '資金出納' },
        detail: {
          en: 'Funds, receipts and payments, banking relationships and cashiering.',
          zh: '資金、收付款、銀行往來及出納管理。',
        },
      },
      {
        term: { en: 'Procurement', zh: '採購管理' },
        detail: {
          en: 'Quotation comparison and negotiation, suppliers and procurement procedure.',
          zh: '詢比議價、供應商及採購程序管理。',
        },
      },
    ],
  },
  {
    id: 'offices',
    scope: 'operations',
    title: { en: 'The five offices under the General Manager', zh: '總經理轄下五室' },
    entries: [
      {
        term: { en: 'Secretariat', zh: '秘書室' },
        detail: {
          en: 'Senior scheduling, meeting arrangements, confidential administration, follow-up on assignments, and collation of material for decisions. Answers directly to the general manager.',
          zh: '辦理高階行程、會議安排、機密行政、交辦追蹤、資料彙整與決策支援；直接向總經理負責。',
        },
      },
      {
        term: { en: 'Legal Affairs Office', zh: '法務室' },
        detail: {
          en: 'Contract review, legal opinions, dispute handling, intellectual-property legal work and notice of regulatory risk. Significant cases go to the general manager for approval.',
          zh: '辦理契約審查、法律意見、爭議處理、智慧財產法務及法令風險提示；重大案件呈總經理核定。',
        },
      },
      {
        term: { en: 'Information Technology Office', zh: '資訊室' },
        detail: {
          en: 'Information systems, network, account permissions, information security, equipment and monitoring systems. Technical maintenance rights do not amount to a right to read business data.',
          zh: '管理資訊系統、網路、帳號權限、資安、設備及監控系統；技術維運權限不等於業務資料閱覽權。',
        },
      },
      {
        term: { en: 'Records Office', zh: '檔案室' },
        detail: {
          en: 'Receipt of originals, classification, filing, retention, retrieval, controlled copying and destruction, keeping documents traceable and confidential material secure.',
          zh: '管理正本點收、分類、歸檔、保存、調閱、受控複印及銷毀程序，確保文件可追溯與機密安全。',
        },
      },
      {
        term: { en: 'Advisory Office', zh: '顧問室' },
        detail: {
          en: 'Professional advice, risk assessment and decision consultation, submitted to the general manager for reference. Holds no administrative command, personnel or approval authority.',
          zh: '提供專業建議、風險研判及決策諮詢，意見提交總經理參考；不具行政指揮、人事或核准權。',
        },
      },
    ],
  },
]

/* ---- 給組織架構圖查詢用 ---- */

/** 以「條目的中文名」建索引，例如「董事會」「醫材開發」「秘書室」。 */
const BY_TERM = new Map<string, Entry>()
for (const g of GROUPS) {
  for (const e of g.entries) BY_TERM.set(e.term.zh, e)
}

/** 架構圖的節點名與職掌分組名對不上的少數幾個。 */
const GROUP_ALIAS: Record<string, string> = {
  總經理: '總經理及轄下單位',
}

/**
 * 查一個架構圖節點對應的職掌條目。
 *
 * 先查單一條目（董事會、醫材開發、秘書室…），查不到再當成整個分組
 * （創辦人、董事長、副總經理、各部…）回傳全部條目。
 * 「董事會」刻意由前者命中——它旁邊的三個委員會在圖上是獨立節點，
 * 不該全塞進董事會的說明裡。
 */
export function dutiesFor(zh: string): Entry[] {
  const single = BY_TERM.get(zh)
  if (single) return [single]
  const title = GROUP_ALIAS[zh] ?? zh
  return GROUPS.find((g) => g.title.zh === title)?.entries ?? []
}
