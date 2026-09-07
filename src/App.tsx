import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import { usePageMeta } from './hooks/usePageMeta.ts'
import { useScrollToTop } from './hooks/useScrollToTop.ts'
import {
  HeroElementContext,
  HeroRegistryContext,
} from './context/heroRegistry.ts'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Research from './pages/Research.tsx'
import ResearchTopic from './pages/ResearchTopic.tsx'
import Technology from './pages/Technology.tsx'
import Partnerships from './pages/Partnerships.tsx'
import Contact from './pages/Contact.tsx'
import NotFound from './pages/NotFound.tsx'

export default function App() {
  /* Home 註冊它的 hero 元素，Header 觀察它來決定透明或白底。
     狀態放在共同的祖先，兩者才接得上。 */
  const [heroEl, setHeroEl] = useState<HTMLElement | null>(null)

  const { pathname } = useLocation()
  const isHome = pathname === '/'

  /* SPA 換頁不會重設捲動位置，從長頁底部點導覽會落在新頁的頁尾 */
  useScrollToTop()

  /* SPA 換頁不會重載 HTML，title 與 description 得自己換 */
  usePageMeta()

  return (
    <HeroRegistryContext.Provider value={setHeroEl}>
      <HeroElementContext.Provider value={heroEl}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <Header />

        {/* header 是 fixed，不佔版面高度。首頁要讓 hero 疊到 header 底下，
            其餘頁面得自己補回這段高度。 */}
        <main id="main" className={isHome ? undefined : 'mainOffset'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/research" element={<Research />} />
            {/* 三個子頁共用一個元件，靠 slug 分辨（指定 RESEARCH 要有分頁） */}
            <Route path="/research/:slug" element={<ResearchTopic />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </HeroElementContext.Provider>
    </HeroRegistryContext.Provider>
  )
}
