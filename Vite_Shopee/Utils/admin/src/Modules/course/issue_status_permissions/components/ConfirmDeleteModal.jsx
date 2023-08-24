/* eslint-disable react/prop-types */
import React from 'react'
import { useForm } from 'react-hook-form'
import ModalComponent from 'Components/modal'
import { Typography } from 'antd'

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
      <strong>
        {t('management.delete_line_1_start')}
        <Typography.Text type="danger" level={3}> {numberOfSelectedRecord} </Typography.Text>
        {t('management.delete_line_1_end')}
        <br />
        {t('management.delete_line_2')}
      </strong>
      <br />
      {t('management.delete_line_3')}
      <br />
      {t('management.delete_line_4')}
      <br />
    </ModalComponent>
  )
}

export default ConfirmDeleteModal
