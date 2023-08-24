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
      title={t('registration_course.management.delete_dialog_title')}
      onCancelText={t('common:cancel')}
      onSubmitText={t('common:delete')}
      type="error"
    >
      {t('registration_course.management.message_confirm_delete', { amount: numberOfSelectedRecord })}
    </ModalComponent>
  )
}

export default ConfirmDeleteModal
