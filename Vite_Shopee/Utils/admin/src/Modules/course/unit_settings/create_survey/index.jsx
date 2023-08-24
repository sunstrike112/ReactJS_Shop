/* eslint-disable react/prop-types */
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Space } from 'antd'
import {
  FormInput, FormLabel, FormSelect, FormTextArea, PopupButton, Text,
  Title
} from 'Components'
import { QUERY } from 'Constants'
import { FORMAT_TIME } from 'Constants/formatTime'
import { LIMIT_TIME_TYPE } from 'Constants/survey'
import { useGetQuery, useHistories } from 'Hooks'
import { useCreateUnitSurvey } from 'Hooks/unit_settings'
import { isNil } from 'lodash'
import { RoutesName } from 'Modules/course/routes'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Divider, Right, Wrapper } from 'Themes/facit'
import { getLocalStorage, STORAGE } from 'Utils'
import { combineDateAndTimeV2 } from 'Utils/time'
import CreateUnitSurveyQuestion from '../components/CreateUnitSurveyQuestion'
import EditUnitSurveyQuestion from '../components/EditUnitSurveyQuestion'
import UnitSurveyQuestions from '../components/UnitSurveyQuestions'
import CreateUnitSurveySchema from './schema'
import {
  DatePickerGroup, FormDatePicker,
  FormTimePicker, Radio, RadioGroup, Row
} from './styled'

const CreateUnitSurveyScreen = () => {
  const history = useHistories()
  const { workspaceid } = useGetQuery()
  const { t, i18n: { language } } = useTranslation(['unit_setting'])
  const { courseId } = useParams()
  const {
    course,
    surveyQuestion,
    surveyQuestions,
    isSubmitting,
    createUnitSurveyAction,
    getUnitSurveyQuestionsAction,
    createUnitSurveyQuestionAction,
    getUnitSurveyQuestionAction,
    updateUnitSurveyQuestionAction,
    updateOrderUnitSurveyQuestionAction,
    deleteUnitSurveyQuestionsAction,
    loadCourseAction
  } = useCreateUnitSurvey()
  const form = useForm({
    defaultValues: {
      estimateTime: { label: t('common:none'), value: 0 },
      unitSurrveyStartType: LIMIT_TIME_TYPE.NOT_SET,
      unitSurrveyEndType: LIMIT_TIME_TYPE.NOT_SET
    },
    resolver: yupResolver(CreateUnitSurveySchema(t))
  })

  const { handleSubmit, watch, reset, setValue, clearErrors, formState: { errors } } = form

  const [visibleSelectQuestionsModal, setVisibleSelectQuestionsModal] = useState(false)
  const [visibleCreateUnitSurveyQuestionsModal, setVisibleCreateUnitSurveyQuestionsModal] = useState(false)
  const [unitQuestionId, setUnitQuestionId] = useState(null)

  const optionTimes = useMemo(() => {
    const opts = [...Array(240)].map((item, index) => ({
      label: t('minutes', { number: index + 1 }),
      value: index + 1
    }))
    opts.unshift({ label: t('common:none'), value: 0 })
    return opts
  }, [t])

  const onSubmit = useCallback(
    (formData) => {
      delete formData.startDate
      delete formData.startTime
      delete formData.endDate
      delete formData.endTime
      const data = {
        estimatedStudyTime: formData.estimateTime?.value,
        limitPeriodEnd: formData.unitSurrveyEndTime,
        limitPeriodStart: formData.unitSurrveyStartTime,
        listQuestionId: formData.listQuestionId,
        messageCompleted: formData.messageCompleted,
        unitDetails: formData.unitSurveyDetail,
        unitName: formData.unitSurveyName
      }
      createUnitSurveyAction({ courseId, data, history, langCode: getLocalStorage(STORAGE.LANGUAGE) })
    },
    []
  )

  const {
    startDate, startTime,
    endDate, endTime,
    unitSurrveyStartType,
    unitSurrveyEndType,
    estimateTime
  } = watch()

  useEffect(() => {
    setValue('unitSurrveyStartTime', combineDateAndTimeV2(startDate, startTime)?.valueOf())
  }, [startDate, startTime])

  useEffect(() => {
    setValue('unitSurrveyEndTime', combineDateAndTimeV2(endDate, endTime)?.valueOf())
  }, [endDate, endTime])

  useEffect(() => {
    clearErrors('startDate')
    setValue('startDate', '')
    setValue('startTime', '')
  }, [unitSurrveyStartType])

  useEffect(() => {
    clearErrors(['endDate', 'unitSurrveyEndTime'])
    setValue('endDate', '')
    setValue('endTime', '')
  }, [unitSurrveyEndType])

  useEffect(() => {
    setValue('estimateTime', optionTimes.find((o) => o.value === estimateTime?.value))
  }, [optionTimes])

  useEffect(() => {
    clearErrors()
  }, [language])

  useEffect(() => {
    setValue('listQuestionId', surveyQuestions.map((s) => s.questionId))
    if (surveyQuestions?.length > 0) {
      clearErrors('listQuestionId')
    }
  }, [surveyQuestions])

  useEffect(() => {
    loadCourseAction({ courseId })
    getUnitSurveyQuestionsAction({ type: 'create', data: { ids: [0] } })
  }, [])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('create_survey.title')}
        backRoute={workspaceid ? `${RoutesName.UNIT_SETTINGS}?${QUERY.WORKSPACE_ID}=${workspaceid}` : RoutesName.UNIT_SETTINGS}
        backRouteText={t('back_to_unit_setting')}
      />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Divider />
            <Row>
              <FormLabel title={t('course')} />
              <Right noInput>
                <span>{course?.courseName}</span>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('create_survey.unit_survey_name')} description="Required" />
              <Right>
                <FormInput name="unitSurveyName" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('create_survey.unit_survey_detail')} description="Optional" />
              <Right>
                <FormTextArea
                  name="unitSurveyDetail"
                  rows={4}
                  total={4000}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('create_survey.question_setting')} description="Required" />
              <Right>
                {surveyQuestions.length > 0
                  ? <Button size="large" icon={<EditOutlined />} onClick={() => setVisibleSelectQuestionsModal(true)}>{t('create_survey.select_question')}</Button>
                  : <Button size="large" type="primary" icon={<PlusOutlined />} onClick={() => setVisibleCreateUnitSurveyQuestionsModal(true)}>{t('create_survey.create_question')}</Button>}
                {errors?.listQuestionId && (
                <Text.primary color="error_ant" fontSize="size_14">
                  {errors.listQuestionId.message}
                </Text.primary>
                )}
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('limit_start_date')} description="Optional" />
              <Right>
                <RadioGroup
                  name="unitSurrveyStartType"
                >
                  <Space direction="vertical">
                    <Radio value={LIMIT_TIME_TYPE.NOT_SET}>
                      <span>{t('detail.label_limit_start_date')}</span>
                    </Radio>
                    <Radio value={LIMIT_TIME_TYPE.SET}>
                      <DatePickerGroup>
                        <span>{t('detail.date')}</span>
                        <FormDatePicker
                          name="startDate"
                          wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                          disabled={!unitSurrveyStartType}
                          useDate
                          placeholder={null}
                        />
                        <span>{t('detail.time')}</span>
                        <FormTimePicker
                          name="startTime"
                          wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                          disabled={!unitSurrveyStartType}
                          format={FORMAT_TIME.HOUR_MINUTES}
                          useDate
                          placeholder={null}
                        />
                      </DatePickerGroup>
                      <span className="public">{t('detail.release_since')}</span>
                    </Radio>
                    {errors?.startDate && (
                      <Text.primary color="error_ant" fontSize="size_14">
                        {errors.startDate.message}
                      </Text.primary>
                    )}
                  </Space>
                </RadioGroup>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('limit_end_date')} description="Optional" />
              <Right>
                <RadioGroup
                  name="unitSurrveyEndType"
                >
                  <Space direction="vertical">
                    <Radio value={LIMIT_TIME_TYPE.NOT_SET}>
                      <span>{t('detail.label_limit_end_date')}</span>
                    </Radio>
                    <Radio value={LIMIT_TIME_TYPE.SET}>
                      <div>
                        <DatePickerGroup>
                          <span>{t('detail.date')}</span>
                          <FormDatePicker
                            name="endDate"
                            wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                            disabled={!unitSurrveyEndType}
                            useDate
                            placeholder={null}
                          />
                          <span>{t('detail.time')}</span>
                          <FormTimePicker
                            name="endTime"
                            wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                            disabled={!unitSurrveyEndType}
                            format={FORMAT_TIME.HOUR_MINUTES}
                            useDate
                            placeholder={null}
                          />
                        </DatePickerGroup>
                      </div>
                      <span className="public">{t('detail.release_until')}</span>
                    </Radio>
                    {errors?.endDate && (
                      <Text.primary color="error_ant" fontSize="size_14">
                        {errors.endDate.message}
                      </Text.primary>
                    )}
                    {errors?.unitSurrveyEndTime && (
                    <Text.primary color="error_ant" fontSize="size_14">
                      {errors.unitSurrveyEndTime.message}
                    </Text.primary>
                    )}
                  </Space>
                </RadioGroup>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('message_complete')} description="Optional" />
              <Right>
                <FormTextArea
                  name="messageCompleted"
                  total={100}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('estimate_study')} description="Optional" />
              <Right>
                <FormSelect
                  name="estimateTime"
                  isSearchable={false}
                  isClearable={false}
                  options={optionTimes}
                  menuPlacement="auto"
                />
              </Right>
            </Row>
            <Divider />
            <div className="form-action-group">
              <Space>
                <Button htmlType="button" onClick={() => reset()}>{t('common:clear')}</Button>
                <PopupButton
                  icon={EditOutlined}
                  titlePopup={t('create_survey.confirm_register')}
                  textButton={t('common:register')}
                  onConfirm={handleSubmit(onSubmit)}
                  okText="common:register"
                  isLoading={isSubmitting}
                />
              </Space>
            </div>
          </FormProvider>
        </form>
      </div>

      {visibleSelectQuestionsModal && (
        <UnitSurveyQuestions
          dataSource={surveyQuestions}
          visible={visibleSelectQuestionsModal}
          onClose={setVisibleSelectQuestionsModal}
          onCreateQuestion={(visible) => {
            setVisibleCreateUnitSurveyQuestionsModal(visible)
            setVisibleSelectQuestionsModal(!visible)
          }}
          onEditQuestion={(id) => {
            setUnitQuestionId(id)
            setVisibleSelectQuestionsModal(false)
          }}
          deleteUnitSurveyQuestions={deleteUnitSurveyQuestionsAction}
          updateOrderUnitSurveyQuestion={updateOrderUnitSurveyQuestionAction}
        />
      )}

      {visibleCreateUnitSurveyQuestionsModal && (
        <CreateUnitSurveyQuestion
          visible={visibleCreateUnitSurveyQuestionsModal}
          onClose={setVisibleCreateUnitSurveyQuestionsModal}
          onBackToQuestionList={(visible) => {
            setVisibleCreateUnitSurveyQuestionsModal(visible)
            setVisibleSelectQuestionsModal(!visible)
          }}
          createUnitSurveyQuestion={createUnitSurveyQuestionAction}
        />
      )}

      {!isNil(unitQuestionId) && (
        <EditUnitSurveyQuestion
          visible={!isNil(unitQuestionId)}
          onClose={() => setUnitQuestionId(null)}
          onBackToQuestionList={(visible) => {
            setUnitQuestionId(null)
            setVisibleSelectQuestionsModal(!visible)
          }}
          unitQuestionId={unitQuestionId}
          getUnitSurveyQuestion={getUnitSurveyQuestionAction}
          updateUnitSurveyQuestion={updateUnitSurveyQuestionAction}
          source={surveyQuestion}
          surveyQuestions={surveyQuestions}
        />
      )}
    </Wrapper>
  )
}

export default CreateUnitSurveyScreen
