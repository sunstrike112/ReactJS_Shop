/* eslint-disable react/prop-types */
import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalMobile } from 'Themes/facit'
import { removeLocalStorage, STORAGE } from 'Utils'
import { redirectToApp } from './index'
import { QUERY_PARAMS } from './constant'

const ExceedPackageModal = (props) => {
  const { visible } = props
  const { t } = useTranslation('upload_file')

  const backToApp = useCallback(() => {
    removeLocalStorage(STORAGE.WEBVIEW_UPLOAD_EXCEED_PACKAGE)
    redirectToApp(QUERY_PARAMS.FILE_ALREADY_EXIST)
  }, [])

  return (
    <ModalMobile
      visible={visible}
      onCancel={backToApp}
      onSubmit={backToApp}
      title={t('error_message:validation.tile_upgrade')}
      onSubmitText={t('common:offModal')}
      type="error"
      cancel={false}
    >
      <b>{t('error_message:validation.max_file_upload_line1')}</b>
      <br />
      <b>{t('error_message:validation.max_file_upload_line2')}</b>
    </ModalMobile>
  )
}

export default memo(ExceedPackageModal)
