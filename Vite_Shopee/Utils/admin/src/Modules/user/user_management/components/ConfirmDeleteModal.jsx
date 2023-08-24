/* eslint-disable react/prop-types */
import React from 'react'
import { useForm } from 'react-hook-form'
import { Modal } from 'Components'
import { ClearOutlined } from '@ant-design/icons'

const ConfirmDeleteModal = ({
  t,
  isVisible,
  setIsVisble,
  onSubmit,
  numberOfSelectedRecord,
  disabledSubmit,
  isSubmitting
}) => {
  const { handleSubmit } = useForm()

  return (
    <Modal
      visible={isVisible}
      onCancel={() => setIsVisble(false)}
      onSubmit={handleSubmit(onSubmit)}
      disabledSubmit={disabledSubmit}
      title={t('management.delete_dialog_title')}
      onCancelText={t('common:cancel')}
      onSubmitText={t('common:delete')}
      titleIcon={<ClearOutlined />}
      type="error"
      loadingSubmit
      isLoadingSubmit={isSubmitting}
    >
      <b>
        {t('management.message_confirm_delete_1', {
          amount: numberOfSelectedRecord
        })}
      </b>
      <br />
      <b>{t('management.message_confirm_delete_2')}</b>
      <small>{t('management.message_confirm_delete_3')}</small>
    </Modal>
  )
}

export default ConfirmDeleteModal
