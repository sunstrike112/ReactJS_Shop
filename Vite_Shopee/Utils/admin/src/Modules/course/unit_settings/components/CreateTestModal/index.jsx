/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup'
import { FormInput, FormLabel, Modal } from 'Components'
import { useHistories } from 'Hooks'
import { useRegisterUnitTest } from 'Hooks/unit_settings'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getLocalStorage, STORAGE } from 'Utils'
import CreateTestShema from './schema'
import { Right, Row } from './styled'

const CreateTestModal = ({ onClose, visible, courseId }) => {
  const history = useHistories()
  const { t } = useTranslation(['unit_setting'])
  const form = useForm({
    resolver: yupResolver(CreateTestShema(t)),
    defaultValues: {
      testName: ''
    }
  })
  const { handleSubmit, clearErrors, reset } = form
  const { registerTestAction, deleteErrorRegisterAction, createTest } = useRegisterUnitTest()
  const { isLoading } = createTest

  const onSubmit = useCallback((dataForm) => {
    const data = {
      testName: dataForm.testName
    }
    registerTestAction({ data, courseId, history, langCode: getLocalStorage(STORAGE.LANGUAGE) })
  }, [courseId])

  const handleCancel = () => {
    onClose(false)
    deleteErrorRegisterAction()
    reset()
    clearErrors()
  }

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onCancel={() => handleCancel()}
        onSubmit={handleSubmit(onSubmit)}
        title={t('register_test')}
        cancel={false}
        onSubmitText={t('common:register')}
        onCancelText={t('common:cancel')}
        isLoadingSubmit={isLoading}
        enterToSubmit
      >
        <Row>
          <FormLabel title={t('unit')} description="Required" />
          <Right>
            <FormInput name="testName" />
          </Right>
        </Row>
      </Modal>
    </FormProvider>
  )
}

export default CreateTestModal
