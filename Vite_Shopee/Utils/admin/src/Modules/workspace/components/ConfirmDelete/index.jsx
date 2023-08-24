/* eslint-disable react/prop-types */
import React from 'react'
import { useForm } from 'react-hook-form'
import ModalComponent from 'Components/modal'

const ConfirmDeleteModal = ({ t, isVisible, isDeleting, setVisible, onSubmit, numberOfSelectedRecord }) => {
  const { handleSubmit } = useForm()
  return (
    <ModalComponent
      visible={isVisible}
      onCancel={() => setVisible(false)}
      onSubmit={handleSubmit(onSubmit)}
      isLoadingSubmit={isDeleting}
      title={t('common:delete_all')}
      onCancelText={t('common:cancel')}
      onSubmitText={t('common:delete')}
      type="error"
    >
      {t('common:confirm_delete', { amount: numberOfSelectedRecord, key: t('workspace:workspace') })}
    </ModalComponent>
  )
}

export default ConfirmDeleteModal
