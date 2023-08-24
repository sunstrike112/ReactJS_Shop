/* eslint-disable react/prop-types */
import { Modal } from 'Components'
import React from 'react'
import { useForm } from 'react-hook-form'

const ConfirmDeleteModal = ({ t, onClose, onSubmit, numberOfSelectedRecord, isDeleting }) => {
  const { handleSubmit } = useForm()
  return (
    <Modal
      visible
      onCancel={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={t('common:delete_all')}
      onCancelText={t('common:cancel')}
      onSubmitText={t('common:delete')}
      type="error"
      isLoadingSubmit={isDeleting}
    >
      {t('common:confirm_delete', { amount: numberOfSelectedRecord, key: t('common:password') })}
    </Modal>
  )
}

export default ConfirmDeleteModal
