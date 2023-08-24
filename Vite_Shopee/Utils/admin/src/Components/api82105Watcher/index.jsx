import { Text } from 'Components'
import Modal from 'Components/modal'
import { useAuth, useRoot } from 'Hooks'
import { signOut } from 'Utils'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Api82105Watcher = () => {
  const [t] = useTranslation('common')
  const { profile: { userId } } = useAuth()
  const { api82105: { isError, isRequiredLogout }, updateApi82105Action } = useRoot()

  const onSubmit = () => {
    if (isRequiredLogout) {
      const isMaintainNoticeAdmin = false
      signOut(isMaintainNoticeAdmin, userId)
      return
    }
    updateApi82105Action({ isError: false })
  }

  return (
    <Modal
      visible={isError}
      onSubmitText={t('common:yes')}
      onSubmit={onSubmit}
      onClose={onSubmit}
      type="error"
      cancel={false}
    >
      <Text.primary
        fontWeight="fw_600"
        style={{ color: 'red', textAlign: 'center' }}
        fontSize="size_16"
      >
        {t('error82105')}
      </Text.primary>
    </Modal>
  )
}

export default Api82105Watcher
