/* eslint-disable react/prop-types */
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ModalComponent from 'Components/modal'

const ConfirmDeleteQuestionModal = ({
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
        {t('unit_survey_question.management.confirm_delete', { number: numberOfSelectedRecord })}
      </div>
    </ModalComponent>
  )
}

export default ConfirmDeleteQuestionModal
