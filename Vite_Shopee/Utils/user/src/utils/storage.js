export const STORAGE = {
  LANGUAGE: 'LANGUAGE',
  USER_TOKEN: 'USER_TOKEN',
  META_DATA: 'META_DATA',
  SOURCE_PATH: 'SOURCE_PATH',
  THEME: 'THEME',
  LOGIN_ACCOUNT_TYPE: 'LOGIN_ACCOUNT_TYPE',
  COURSES_BOOKMARK_DISPLAY: 'COURSES_BOOKMARK_DISPLAY',
  LESSONS_VIEWED_WITHOUT_COMPLETED: 'LESSONS_VIEWED_WITHOUT_COMPLETED'
}

export function getLocalStorage(key) {
  return localStorage.getItem(key)
}

export function setLocalStorage(key, value) {
  return localStorage.setItem(key, value)
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(key)
}

export function getLocalLanguage() {
  const localLanguage = getLocalStorage(STORAGE.LANGUAGE) || 'jp'
  return localLanguage
}
