import { STORAGE, getLocalStorage } from 'Utils'
import { useMemo } from 'react'

export const useWebview = () => {
  const isWebviewMode = getLocalStorage(STORAGE.WEBVIEW_MODE)
  const isPreviewingResultOfWebview = Boolean(JSON.parse(getLocalStorage(STORAGE.WEBVIEW_PREVIEW)))
  const isUploadExceedPackageInWebview = getLocalStorage(STORAGE.WEBVIEW_UPLOAD_EXCEED_PACKAGE)
  const webviewFileId = getLocalStorage(STORAGE.WEBVIEW_FILE_ID)
  const webviewVideo = useMemo(() => JSON.parse(getLocalStorage(STORAGE.WEBVIEW_VIDEO)), [])

  return {
    isWebviewMode,
    isPreviewingResultOfWebview,
    isUploadExceedPackageInWebview,
    webviewFileId,
    webviewVideo
  }
}
