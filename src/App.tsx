import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.tsx'
import {
  HeroElementContext,
  HeroRegistryContext,
} from './context/heroRegistry.ts'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Research from './pages/Research.tsx'
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
            <Route path="/technology" element={<Technology />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* TODO Step 7：Footer */}
      </HeroElementContext.Provider>
    </HeroRegistryContext.Provider>
  )
}
