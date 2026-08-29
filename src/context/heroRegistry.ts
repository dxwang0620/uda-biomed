import { createContext, useContext } from 'react'

/**
 * 首頁 hero 與 Header 之間的橋。
 *
 * Header 需要知道「hero 是否還擋在自己底下」才能決定要透明還是白底，
 * 但 hero 是 Home 頁的內容，兩者在元件樹上是兄弟而非父子。
 * 由 App 持有這個狀態，Home 註冊自己的 hero 元素，Header 讀它。
 *
 * 拆成兩個 context 是為了避免 heroEl 變動時把 Home 一起重繪。
 */

export type RegisterHero = (el: HTMLElement | null) => void

export const HeroRegistryContext = createContext<RegisterHero>(() => {})
export const HeroElementContext = createContext<HTMLElement | null>(null)

/** Home 用：把 hero 元素交給 Header 觀察。直接當 ref callback 用。 */
export const useRegisterHero = () => useContext(HeroRegistryContext)

/** Header 用：取得目前註冊的 hero 元素，沒有就是 null。 */
export const useHeroElement = () => useContext(HeroElementContext)
