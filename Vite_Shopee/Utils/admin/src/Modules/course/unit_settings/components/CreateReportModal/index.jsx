/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup'
import { Row } from 'antd'
import { FormInput, FormLabel, Modal } from 'Components'
import { useHistories, useRegisterReport } from 'Hooks'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getLocalStorage, STORAGE } from 'Utils'
import CreateReportSchema from './schema'
import { Right } from './styled'

const CreateReportModal = ({ onClose, visible, courseId }) => {
  const history = useHistories()
  const { t } = useTranslation(['report_setting'])
  const { registerReportAction, createReport } = useRegisterReport()
  const { isLoading } = createReport

  const form = useForm({
    resolver: yupResolver(CreateReportSchema(t)),
    defaultValues: {
      testName: ''
    }
  })
  const { handleSubmit, clearErrors, reset } = form

  const onSubmit = useCallback((dataForm) => {
    const data = {
      testName: dataForm.testName
    }
    registerReportAction({ courseId, data, history, langCode: getLocalStorage(STORAGE.LANGUAGE) })
  }, [courseId])

  const handleCancel = () => {
    onClose(false)
    reset()
    clearErrors()
  }

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onCancel={() => handleCancel()}
        onSubmit={handleSubmit(onSubmit)}
        title={t('create_report.title')}
        cancel={false}
        onSubmitText={t('common:register')}
        loadingSubmit
        isLoadingSubmit={isLoading}
        enterToSubmit
      >
        <Row>
          <FormLabel title={t('common:unit')} description="Required" />
          <Right>
            <FormInput name="testName" />
          </Right>
        </Row>
      </Modal>
    </FormProvider>
  )
}

export default CreateReportModal
