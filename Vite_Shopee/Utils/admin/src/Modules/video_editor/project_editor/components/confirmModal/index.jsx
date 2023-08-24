/* eslint-disable react/prop-types */
import React from 'react'
import ModalComponent from 'Components/modal'
import { useTranslation } from 'react-i18next'

const ConfirmUpdateModal = ({ isVisible, setIsVisble, onSubmit, title }) => {
  const { t } = useTranslation(['unit_setting'])
  return (
    <ModalComponent
      visible={isVisible}
      onCancel={() => setIsVisble(false)}
      onSubmit={onSubmit}
      onCancelText={t('common:cancel')}
      onSubmitText={t('common:ok')}
      title={title}
    >
      <p>Lectures files &gt; Video recording &gt; Martin Garrix....mp4</p>
    </ModalComponent>
  )
}
export default ConfirmUpdateModal
