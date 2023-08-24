export const STORAGE = {
  LANGUAGE: 'LANGUAGE',
  USER_TOKEN: 'USER_TOKEN',
  META_DATA: 'META_DATA',
  WORKSPACE_ID: 'WORKSPACE_ID',
  THEME: 'THEME',
  WEBVIEW_PREVIEW: 'WEBVIEW_PREVIEW',
  WEBVIEW_MODE: 'WEBVIEW_MODE',
  WEBVIEW_FILE_ID: 'WEBVIEW_FILE_ID',
  WEBVIEW_VIDEO: 'WEBVIEW_VIDEO',
  WEBVIEW_UPLOAD_EXCEED_PACKAGE: 'WEBVIEW_UPLOAD_EXCEED_PACKAGE',
  UNIT_HISTORY: 'UNIT_HISTORY',
  UPLOAD_FILE_IMAGE: 'UPLOAD_FILE_IMAGE'
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
