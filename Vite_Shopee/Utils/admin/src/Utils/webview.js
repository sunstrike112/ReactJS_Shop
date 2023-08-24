import { notification } from 'antd'
import { checkUploadFileStatusAPI } from 'APIs'
import { redirectToApp } from 'Components/sideBarWebview'
import { QUERY_PARAMS } from 'Components/sideBarWebview/constant'
import { STATUS_UPLOAD } from 'Constants'

export const checkUploadFileStatusForWebview = async ({ t, onSuccess, webviewFileId, onFailure }) => {
  const response = await checkUploadFileStatusAPI(webviewFileId)
  if (response.data === STATUS_UPLOAD.ACTIVE) {
    onSuccess()
  } else if (response.data === STATUS_UPLOAD.PROCESSING) {
    setTimeout(() => checkUploadFileStatusForWebview({ t, webviewFileId, onSuccess, onFailure }), 10000)
  } else if (response.data === STATUS_UPLOAD.FAIL || response.data === null) {
    notification.error({
      message: t('common:error'),
      description: t('issue_permission:error_message.upload_video_fail'),
      duration: 2
    })
    onFailure()
    redirectToApp(QUERY_PARAMS.UPLOAD_VIDEO_FAILURE)
  }
}
