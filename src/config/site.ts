/**
 * 站台層級的常數。
 *
 * 注意：部署路徑不在這裡設定。base 的唯一來源是 vite.config.ts 的 BASE，
 * 這裡只從 Vite 注入的 import.meta.env.BASE_URL 推導 router 需要的 basename，
 * 所以兩者不可能對不上。
 */

/** BASE_URL 結尾一定有斜線，router 的 basename 不要有。'/' 會推導成 '/'。 */
export const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export const SITE = {
  name: 'UDA BIOMED',
  /** 設計稿 hero 上的主句 */
  tagline: 'Advancing Cancer Detection Research',
  description:
    'UDA BIOMED advances cancer detection research by connecting molecular investigation, analytical technology and clinical collaboration.',
} as const

/** 導覽項目。CTA（PARTNER WITH US）不在此列，它不是導覽項目。 */
export const NAV_ITEMS = [
  { label: 'ABOUT', to: '/about' },
  { label: 'RESEARCH', to: '/research' },
  { label: 'TECHNOLOGY', to: '/technology' },
  { label: 'PARTNERSHIPS', to: '/partnerships' },
  { label: 'CONTACT', to: '/contact' },
] as const

/** PARTNER WITH US 的去向。已確認 CONTACT 頁不做表單，故直接指向 /contact。 */
export const CTA = { label: 'PARTNER WITH US', to: '/contact' } as const
