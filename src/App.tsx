import { Route, Routes } from 'react-router-dom'
import ScaffoldNav from './components/ScaffoldNav.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Research from './pages/Research.tsx'
import Technology from './pages/Technology.tsx'
import Partnerships from './pages/Partnerships.tsx'
import Contact from './pages/Contact.tsx'
import NotFound from './pages/NotFound.tsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* TODO Step 2：由真正的 <Header> 取代。
          目前這個只是為了驗證路由與 base path 的臨時骨架。 */}
      <ScaffoldNav />

      <main id="main">
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
    </>
  )
}
