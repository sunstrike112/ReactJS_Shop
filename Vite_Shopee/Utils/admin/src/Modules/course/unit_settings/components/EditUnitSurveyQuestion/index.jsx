/* eslint-disable react/prop-types */
import { ArrowLeftOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { isEmpty } from 'lodash'
import React, { Fragment, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Modal,
  FormLabel,
  FormRadio,
  FormTextArea,
  FormUploadImage
} from 'Components'
import { NECESSARY_LEVEL_OPTION, QUESTION_TYPE_OPTION } from 'Constants/survey'
import { Divider, Right } from 'Themes/facit'
import { Wrapper } from './styled'
import CreateUnitSurveyQuestionSchema from './schema'

const EditUnitSurveyQuestion = ({
  onClose,
  onBackToQuestionList,
  visible,
  unitQuestionId,
  source,
  getUnitSurveyQuestion,
  updateUnitSurveyQuestion,
  surveyId,
  isViewing,
  surveyQuestions
}) => {
  const { t } = useTranslation(['unit_setting', 'course'])

  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(CreateUnitSurveyQuestionSchema(t))
  })
  const { control, watch, handleSubmit, reset, clearErrors, formState: { errors } } = form
  const { questionType } = watch()
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'listAnswer' // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  })

  const onSubmit = useCallback((formData) => {
    if (questionType === 'DESCRIPTION') {
      delete formData.listAnswer
    }
    updateUnitSurveyQuestion({
      params: { questionId: unitQuestionId },
      data: { ...formData, surveyId },
      surveyQuestionsTemp: [...surveyQuestions]
    })
    onBackToQuestionList(false)
  }, [unitQuestionId, questionType])

  const handleAddOption = useCallback(() => {
    append({
      answersDescription: '',
      imagePath: null
    })
  }, [append])

  const handleRemoveOption = useCallback(() => {
    if (fields.length > 2) {
      remove(fields.length - 1)
    }
  }, [fields, remove])

  useEffect(() => {
    if (unitQuestionId) {
      getUnitSurveyQuestion({
        params: {
          questionId: unitQuestionId
        }
      })
    }
  }, [unitQuestionId])

  useEffect(() => {
    if (source) {
      if (source.listAnswer?.length === 0) {
        source.listAnswer = [{
          answerText: '',
          imagePath: null
        },
        {
          answerText: '',
          imagePath: null
        }]
      }
      reset(source)
    }
  }, [source])

  useEffect(() => {
    if (questionType === 'DESCRIPTION') {
      clearErrors('listAnswer')
    }
  }, [questionType])

  return (
    <FormProvider {...form}>
      <Modal
        visible={visible}
        onClose={() => onClose(false)}
        onCancel={() => reset(source)}
        onSubmit={handleSubmit(onSubmit)}
        onSubmitText={t('common:change')}
        onCancelText={t('common:restore')}
        title={t('unit_survey_question.edit.title')}
        disabledSubmit={!isEmpty(errors) || isViewing}
        confirm
        confirmTitle={t('unit_survey_question.edit.warning_submit_message')}
      >
        <Wrapper>
          <Row align="middle" className="back-button">
            <Col>
              <Button
                htmlType="button"
                icon={<ArrowLeftOutlined />}
                onClick={() => onBackToQuestionList(false)}
              >
                <span>{t('unit_survey_question.edit.back_to_list')}</span>
              </Button>
            </Col>
          </Row>

          <Row align="middle" gutter={[4, 4]}>
            <Col span={24}>
              <Row>
                <FormLabel title={t('unit_survey_question.edit.optional_or_required_answer')} description="Required" />
                <Right>
                  <FormRadio
                    t={t}
                    name="requiredAnswer"
                    options={NECESSARY_LEVEL_OPTION}
                  />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel title={t('unit_survey_question.edit.question_type')} description="Required" />
                <Right>
                  <FormRadio
                    t={t}
                    name="questionType"
                    options={QUESTION_TYPE_OPTION}
                  />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel title={t('unit_survey_question.edit.question_text')} description="Required" />
                <Right>
                  <FormTextArea name="questionText" total={4000} rows={6} />
                  <FormUploadImage name="imagePath" size={8} sizeRequired="8192 KB" />
                  <p>
                    {t('common:require_image_size_and_type', {
                      imgSize: '8MB',
                      imgType: '(jpg, gif, png)'
                    })}
                  </p>
                </Right>
              </Row>
              <Divider />
              <div className="dynamic-wrapper" style={{ display: questionType !== 'DESCRIPTION' ? 'block' : 'none' }}>
                {fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <Row>
                      <FormLabel title={t('unit_survey_question.edit.choice', { index: index + 1 })} description="Required" />
                      <Right>
                        <FormTextArea name={`listAnswer.${index}.answerText`} total={500} rows={4} />
                        <FormUploadImage name={`listAnswer.${index}.imagePath`} size={4} sizeRequired="4096 KB" />
                        <p>
                          {t('common:require_image_size_and_type', {
                            imgSize: '4MB',
                            imgType: '(jpg, gif, png)'
                          })}
                        </p>
                      </Right>
                    </Row>
                    <Divider />
                  </Fragment>
                ))}
                <div className="dynamic-button">
                  {fields.length < 20 && <Button icon={<PlusOutlined />} size="large" className="add" onClick={handleAddOption} />}
                  {fields.length > 2 && <Button icon={<MinusOutlined />} size="large" onClick={handleRemoveOption} />}
                </div>
              </div>
            </Col>
          </Row>
        </Wrapper>
      </Modal>
    </FormProvider>
  )
}

export default EditUnitSurveyQuestion
