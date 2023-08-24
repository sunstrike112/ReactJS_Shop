/* eslint-disable react/prop-types */
import React from 'react'
import { useForm } from 'react-hook-form'
import ModalComponent from 'Components/modal'

const ConfirmDeleteModal = ({ t, isVisible, setVisible, onSubmit, numberOfSelectedRecord }) => {
  const { handleSubmit } = useForm()
  return (
    <ModalComponent
      visible={isVisible}
      onCancel={() => setVisible(false)}
      onSubmit={handleSubmit(onSubmit)}
      title={t('common:delete_all')}
      onCancelText={t('common:cancel')}
      onSubmitText={t('common:delete')}
      type="error"
    >
      {t('question_setting.confirm_delete', { number: numberOfSelectedRecord })}
    </ModalComponent>
  )
}

export default ConfirmDeleteModal
