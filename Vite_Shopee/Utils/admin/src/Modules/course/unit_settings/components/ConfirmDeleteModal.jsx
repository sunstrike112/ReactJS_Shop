/* eslint-disable react/prop-types */
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ModalComponent from 'Components/modal'

const ConfirmDeleteModal = ({
  isVisible,
  setIsVisble,
  onSubmit,
  numberOfSelectedRecord,
  disabledSubmit
}) => {
  const { t } = useTranslation(['unit_setting'])
  const { handleSubmit } = useForm()

  return (
    <ModalComponent
      visible={isVisible}
      onCancel={() => setIsVisble(false)}
      onSubmit={handleSubmit(onSubmit)}
      disabledSubmit={disabledSubmit}
      title={t('common:delete_all')}
      onCancelText={t('common:cancel')}
      onSubmitText={t('common:delete')}
      type="error"
    >
      <div style={{ fontWeight: 'bold' }}>
        {t('unit_setting:question_confirm_amount_start')}
        <span style={{ fontSize: 18, margin: '0px 4px' }}>
          {numberOfSelectedRecord}
        </span>
        {t('unit_setting:question_confirm_amount_end')}
      </div>
      <div>{t('unit_setting:question_confirm_warning')}</div>
      <div>{t('unit_setting:question_confirm_warning_first')}</div>
      <div>{t('unit_setting:question_confirm_warning_second')}</div>
    </ModalComponent>
  )
}

export default ConfirmDeleteModal
