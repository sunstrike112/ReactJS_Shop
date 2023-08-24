/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { useTranslation } from 'react-i18next'

import _ from 'lodash'
import { Modal, Text } from 'Components'
import { Container, EditButton, Row } from './styled'

const ConfirmConbineVideo = ({
  visible,
  onClosePopup,
  onSubmit
}) => {
  const { t } = useTranslation('project')

  return (

    <Modal
      visible={visible}
      onSubmitText={t('common:yes')}
      onCancelText={t('common:cancel')}
      onClose={onClosePopup}
      onSubmit={onSubmit}
    >
      <Text.primary
        fontWeight="fw_600"
        style={{ color: 'red', textAlign: 'center' }}
        fontSize="size_16"
      >
        {t('confirm_combine')}
      </Text.primary>
    </Modal>

  )
}

export default ConfirmConbineVideo
