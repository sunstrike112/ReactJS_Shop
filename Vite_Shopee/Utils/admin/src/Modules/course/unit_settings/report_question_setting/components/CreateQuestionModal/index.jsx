/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty } from 'lodash'
import { useSettingQuestionReport } from 'Hooks'
import { useParams } from 'react-router-dom'

import { Row } from 'antd'
import { FormUploadImage, FormEditor, FormLabel, Modal } from 'Components'
import { Wrapper, Divider, Right } from 'Themes/facit'
import CreateQuestionModalSchema from './schema'

const DEFAULT_VALUES = {
  contentQuestion: ''
}

const CreateQuestionModal = ({ setVisible, visible }) => {
  const { t } = useTranslation(['test_question'])
  const { reportId } = useParams()
  const { createQuestionReportAction } = useSettingQuestionReport()

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(CreateQuestionModalSchema(t))
  })
  const { handleSubmit, reset, formState: { errors } } = form

  const onSubmit = useCallback((formData) => {
    const data = { ...formData }
    createQuestionReportAction({ reportId, data, setVisible })
  }, [reportId])

  const handleCancel = () => {
    setVisible(false)
    reset()
  }

  return (
    <Wrapper>
      <FormProvider {...form}>
        <Modal
          visible={visible}
          onClose={handleCancel}
          onSubmit={handleSubmit(onSubmit)}
          onSubmitText={t('common:register')}
          title={t('report_setting:register.title')}
          disabledSubmit={!isEmpty(errors)}
          cancel={false}
          confirm
          confirmTitle={t('report_setting:register.confirm')}
        >
          <Row>
            <FormLabel title={t('create.question_text')} description="Required" />
            <Right>
              <FormEditor t={t} name="contentQuestion" total={4000} />
              <FormUploadImage t={t} name="imagePath" size={8} sizeRequired="8MB" />
              <p>
                {t('common:require_image_size_and_type', {
                  imgSize: '8MB',
                  imgType: '(jpg, gif, png)'
                })}
              </p>
            </Right>
          </Row>
          <Divider />
        </Modal>
      </FormProvider>
    </Wrapper>

  )
}

export default CreateQuestionModal
