import React, { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { parse } from 'qs'
import { useAuth, useWebview } from 'Hooks'
import { Loading } from 'Components'
import { ERROR_MESSAGE, removeLocalStorage, setLocalStorage, STORAGE } from 'Utils'
import { QUERY } from 'Constants'
import { getFolderIdAPI, uploadFileAPI } from 'APIs'
import { QUERY_PARAMS } from 'Components/sideBarWebview/constant'
import { redirectToApp } from 'Components/sideBarWebview'
import RoutesName from 'Routes/constant'

const VerifyScreen = () => {
  const { isLoading } = useAuth()
  const { search } = useLocation()
  const metaData = parse(search, { ignoreQueryPrefix: true })
  const { isPreviewingResultOfWebview } = useWebview()

  const handleUploadFail = useCallback(() => {
    redirectToApp(QUERY_PARAMS.FILE_ALREADY_EXIST)
  }, [])

  const syncDataFromUserPage = async () => {
    const { accessToken, theme, language, videoWebView, redirectTo, workspaceid } = metaData
    setLocalStorage(STORAGE.USER_TOKEN, accessToken)
    setLocalStorage(STORAGE.META_DATA, JSON.stringify(metaData))
    if (language) {
      setLocalStorage(STORAGE.LANGUAGE, language)
    }
    if (theme) {
      setLocalStorage(STORAGE.THEME, theme)
    }
    if (isPreviewingResultOfWebview) {
      // remove if value exist (include true or false with type string)
      removeLocalStorage(STORAGE.WEBVIEW_PREVIEW)
    }
    if (videoWebView) {
      setLocalStorage(STORAGE.WEBVIEW_VIDEO, JSON.stringify(videoWebView))
      setLocalStorage(STORAGE.WEBVIEW_MODE, true)
      const folderIdRes = await getFolderIdAPI()
      if (folderIdRes.data) {
        const { url, fileName, size, fileType } = videoWebView
        const params = { url, filename: fileName, size: Number(size), fileType, folderParent: 'スマホ用ファイル' }
        const fileIdRes = await uploadFileAPI({ folderId: folderIdRes.data, params })
        if (fileIdRes.code === 200) {
          setLocalStorage(STORAGE.WEBVIEW_FILE_ID, fileIdRes.data.id)
        } else if (fileIdRes.error === ERROR_MESSAGE.ERROR_NUMBER_DATA_OVER_PLAN_PACKAGE) {
          setLocalStorage(STORAGE.WEBVIEW_UPLOAD_EXCEED_PACKAGE, true)
        } else {
          setTimeout(handleUploadFail, 2000)
          return
        }
      }
    }
    switch (true) {
      case Boolean(redirectTo):
        window.location.replace(redirectTo)
        break
      case Boolean(workspaceid):
        window.location.replace(`${RoutesName.HOME}?${QUERY.WORKSPACE_ID}=${workspaceid}`)
        break
      case Boolean(redirectTo) && Boolean(workspaceid):
        window.location.replace(`${redirectTo}&${QUERY.WORKSPACE_ID}=${workspaceid}`)
        break
      default: window.location.replace(RoutesName.HOME)
    }
  }

  useEffect(() => {
    if (metaData) {
      syncDataFromUserPage()
    }
  }, [])

  return isLoading && <Loading />
}

export default VerifyScreen
