/* eslint-disable react/prop-types */
import { Modal } from 'Components'
import React from 'react'
import { useForm } from 'react-hook-form'

const ConfirmDeleteModal = ({ t, isVisible, isLoadingSubmit, setIsVisible, onSubmit, numberOfSelectedRecord, disabledSubmit }) => {
  const { handleSubmit } = useForm()

  return (
    <Modal
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      onSubmit={handleSubmit(onSubmit)}
      disabledSubmit={disabledSubmit}
      title={t('management.delete_dialog_title')}
      onCancelText={t('common:cancel')}
      onSubmitText={t('common:delete')}
      type="error"
      isLoadingSubmit={isLoadingSubmit}
    >
      {t('management.message_confirm_delete_email', { amount: numberOfSelectedRecord })}
    </Modal>
  )
}

export default ConfirmDeleteModal
