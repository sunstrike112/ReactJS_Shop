import { getLocalStorage, STORAGE } from './storage'

export const locationLogin = () => {
  const themeLocal = JSON.parse(getLocalStorage(STORAGE.THEME))
  return {
    pathname: '/auth/login',
    search: themeLocal ? `?${themeLocal}` : ''
  }
}
