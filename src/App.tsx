import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import NextTopic from "./components/NextTopic.tsx";
import { usePageMeta } from "./hooks/usePageMeta.ts";
import { useScrollToTop } from "./hooks/useScrollToTop.ts";
import {
  HeroElementContext,
  HeroRegistryContext,
} from "./context/heroRegistry.ts";
import Home from "./pages/Home.tsx";
import AboutCompany from "./pages/AboutCompany.tsx";
import AboutMessage from "./pages/AboutMessage.tsx";
import AboutOrganisation from "./pages/AboutOrganisation.tsx";
import DiseaseBasis from "./pages/DiseaseBasis.tsx";
import DigitalHealth from "./pages/DigitalHealth.tsx";
import ResearchTopic from "./pages/ResearchTopic.tsx";
import GeneralTechnology from "./pages/GeneralTechnology.tsx";
import TechnologyTopic from "./pages/TechnologyTopic.tsx";
import Partnerships from "./pages/Partnerships.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  /* Home 註冊它的 hero 元素，Header 觀察它來決定透明或白底。
     狀態放在共同的祖先，兩者才接得上。 */
  const [heroEl, setHeroEl] = useState<HTMLElement | null>(null);

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  /* SPA 換頁不會重設捲動位置，從長頁底部點導覽會落在新頁的頁尾 */
  useScrollToTop();

  /* SPA 換頁不會重載 HTML，title 與 description 得自己換 */
  usePageMeta();

  return (
    <HeroRegistryContext.Provider value={setHeroEl}>
      <HeroElementContext.Provider value={heroEl}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <Header />

        {/* header 是 fixed，不佔版面高度。首頁要讓 hero 疊到 header 底下，
            其餘頁面得自己補回這段高度。 */}
        <main id="main" className={isHome ? undefined : "mainOffset"}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* ABOUT 同樣不再有索引頁：三段內容各自獨立成頁（指定）。
                轉址保留的理由與 RESEARCH／TECHNOLOGY 相同。 */}
            <Route
              path="/about"
              element={<Navigate to="/about/company" replace />}
            />
            <Route path="/about/company" element={<AboutCompany />} />
            <Route path="/about/message" element={<AboutMessage />} />
            <Route path="/about/organisation" element={<AboutOrganisation />} />
            {/* RESEARCH 不再有索引頁：內容已搬到第一個子項目（指定）。
                保留這條轉址而不是整條刪掉——這個網址已經預渲染過，
                首頁的消息也指向它，刪掉會變成 404。 */}
            <Route
              path="/research"
              element={<Navigate to="/research/disease-basis" replace />}
            />
            <Route path="/research/disease-basis" element={<DiseaseBasis />} />
            {/* 數位醫療有自己的版面，必須排在 :slug 之前——
                react-router 取第一個相符的路由，:slug 會先吃掉它。 */}
            <Route
              path="/research/digital-health"
              element={<DigitalHealth />}
            />
            {/* 其餘子頁共用一個元件，靠 slug 分辨（指定 RESEARCH 要有分頁） */}
            <Route path="/research/:slug" element={<ResearchTopic />} />
            {/* TECHNOLOGY 同樣不再有索引頁：內容已搬到第一個子項目（指定）。
                保留轉址的理由與 RESEARCH 相同——網址已預渲染過，刪掉會 404。 */}
            <Route
              path="/technology"
              element={<Navigate to="/technology/general" replace />}
            />
            <Route path="/technology/general" element={<GeneralTechnology />} />
            <Route path="/technology/:slug" element={<TechnologyTopic />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* 子頁底部的「下一個細項」。放在這裡而不是逐頁貼一次，
              不在清單裡的路徑它自己回傳 null。 */}
          <NextTopic />
        </main>

        <Footer />
      </HeroElementContext.Provider>
    </HeroRegistryContext.Provider>
  );
}
