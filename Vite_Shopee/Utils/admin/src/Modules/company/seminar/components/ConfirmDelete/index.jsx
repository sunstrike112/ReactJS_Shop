/* eslint-disable react/prop-types */
import React from 'react'
import { useForm } from 'react-hook-form'
import ModalComponent from 'Components/modal'

const ConfirmDeleteModal = ({ t, isVisible, setIsVisble, onSubmit, numberOfSelectedRecord, disabledSubmit }) => {
  const { handleSubmit } = useForm()

  return (
    <ModalComponent
      visible={isVisible}
      onCancel={() => setIsVisble(false)}
      onSubmit={handleSubmit(onSubmit)}
      disabledSubmit={disabledSubmit}
      title={t('common:delete_all')}
      cancel={false}
      onSubmitText={t('common:delete')}
      type="error"
    >
      {t('management.delete_line_1', { number: numberOfSelectedRecord })}
    </ModalComponent>
  )
}

export default ConfirmDeleteModal
