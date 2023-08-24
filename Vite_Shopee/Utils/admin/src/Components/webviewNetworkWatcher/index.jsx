import { Text } from 'Components'
import Modal from 'Components/modal'
import { useWebview } from 'Hooks'
import { useNetworkState } from 'Hooks/network'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledText = styled(Text.primary)`
		text-align: center;
`

const WebviewNetworkWatcher = () => {
  const [t] = useTranslation('common')
  const { isWebviewMode } = useWebview()
  const [isOnline] = useNetworkState()

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOnline !== null && isWebviewMode) {
      if (isOnline) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }
  }, [isWebviewMode, isOnline])

  return (
    <Modal
      visible={visible}
      ok={false}
      onCancelText={t('create.close')}
      onCancel={() => setVisible(false)}
    >
      <StyledText>{t('webview_notice_network')}</StyledText>
    </Modal>
  )
}

export default WebviewNetworkWatcher
