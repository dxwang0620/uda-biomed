import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* ══════════════════════════════════════════════════════════════
   部署形態的唯一切換點 —— 改這一行就好。

     一般 repo（如 github.com/<帳號>/uda-website）  '/uda-website/'
     自訂網域（如 uda-biomed.com）                  '/'
     <帳號>.github.io repo                          '/'

   router 的 basename 不需要另外設，src/config/site.ts 會從
   import.meta.env.BASE_URL 自動推導，所以這裡永遠是單一來源。

   設錯的症狀：部署後畫面全白、CSS 與 JS 全部 404。
   部署前務必跑 `npm run preview` 驗過，`npm run dev` 不會重現這個問題。
   ══════════════════════════════════════════════════════════════ */
const BASE = '/uda-website/'

export default defineConfig({
  base: BASE,
  plugins: [react()],
})
