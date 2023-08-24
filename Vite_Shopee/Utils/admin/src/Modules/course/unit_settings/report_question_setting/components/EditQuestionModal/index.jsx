/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useSettingQuestionReport } from 'Hooks'

import { FormUploadImage, FormEditor, FormLabel, Modal } from 'Components'
import { Row } from 'antd'
import { Wrapper, Divider, Right } from 'Themes/facit'
import { getFileFromS3 } from 'Utils'
import EditQuestionModalSchema from './schema'

const EditQuestionModal = ({ setVisible, visible, isViewing }) => {
  const { t } = useTranslation(['test_question'])
  const { reportId } = useParams()
  const { detailQuestionReport, editQuestionReportAction } = useSettingQuestionReport()
  const { questionId, contentQuestion, imagePath } = detailQuestionReport

  const form = useForm({
    resolver: yupResolver(EditQuestionModalSchema(t))
  })
  const { handleSubmit, setValue, reset } = form

  const onSubmit = useCallback((formData) => {
    const data = { ...formData }
    editQuestionReportAction({ reportId, questionId, data, setVisible })
  }, [reportId, questionId])

  const handleCancel = () => {
    setVisible(false)
    reset()
  }
  const handleSetData = () => {
    setValue('contentQuestion', contentQuestion)
    setValue('imagePath', getFileFromS3(imagePath))
  }

  useEffect(() => {
    if (detailQuestionReport) {
      handleSetData()
    }
  }, [detailQuestionReport])
  return (
    <Wrapper>
      <FormProvider {...form}>
        <Modal
          visible={visible}
          onSubmitText={t('common:ok')}
          onCancel={handleCancel}
          onSubmit={handleSubmit(onSubmit)}
          disabledSubmit={isViewing}
          title={t('report_setting:edit.title')}
          cancel={false}
          confirm
          confirmTitle={t('report_setting:edit.confirm')}
        >
          <Divider />
          <Row>
            <FormLabel title={t('create.question_text')} description="Required" />
            <Right>
              <FormEditor t={t} name="contentQuestion" total={4000} />
              <FormUploadImage t={t} name="imagePath" size={8} />
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

export default EditQuestionModal
