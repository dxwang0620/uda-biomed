import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* ══════════════════════════════════════════════════════════════
   部署形態的唯一切換點 —— 改這一行就好。

     一般 repo（如 github.com/<帳號>/uda-biomed）   '/uda-biomed/'
     自訂網域（如 uda-biomed.com）                  '/'
     <帳號>.github.io repo                          '/'

   router 的 basename 不需要另外設，src/config/site.ts 會從
   import.meta.env.BASE_URL 自動推導，所以這裡永遠是單一來源。

   設錯的症狀：部署後畫面全白、CSS 與 JS 全部 404。
   部署前務必跑 `npm run preview` 驗過，`npm run dev` 不會重現這個問題。

   **現況：已綁自訂網域 www.udabiomed.com，所以是 '/'。**
   代價是 dxwang0620.github.io/uda-biomed/ 那個舊網址會變成白畫面——
   一次 build 只能對應一個 base。GitHub 在自訂網域生效後會把 github.io
   的網址轉址到自訂網域，所以正常情況下不會有人踩到。
   ══════════════════════════════════════════════════════════════ */
const BASE = '/'

export default defineConfig({
  base: BASE,
  plugins: [react()],
})
