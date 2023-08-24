/* eslint-disable react/prop-types */
import { Modal } from 'Components'
import React from 'react'
import { useForm } from 'react-hook-form'

const ConfirmDeleteModal = ({ t, isVisible, setIsVisible, onSubmit, numberOfSelectedRecord, disabledSubmit, isDeleting }) => {
  const { handleSubmit } = useForm()

  return (
    <Modal
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      onSubmit={handleSubmit(onSubmit)}
      disabledSubmit={disabledSubmit}
      title={t('notification:management.delete_dialog_title')}
      onCancelText={t('common:cancel')}
      onSubmitText={t('common:delete')}
      type="error"
      isLoadingSubmit={isDeleting}
    >
      {t('message_confirm_delete', { amount: numberOfSelectedRecord })}
    </Modal>
  )
}

export default ConfirmDeleteModal
