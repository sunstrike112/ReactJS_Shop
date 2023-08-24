/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Space, Button } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { isNil, isEmpty } from 'lodash'
import { useRoles, useEditUnitSurvey, useHistories, useGetQuery } from 'Hooks'
import { FORMAT_TIME } from 'Constants/formatTime'
import { combineDateAndTimeV2 } from 'Utils/time'
import {
  FormSelect,
  FormInput,
  FormTextArea,
  Text,
  Title,
  FormLabel,
  PopupButton
} from 'Components'
import { LIMIT_TIME_TYPE } from 'Constants/survey'
import moment from 'moment'
import { Divider, Right, Wrapper } from 'Themes/facit'
import { RoutesName } from 'Modules/course/routes'
import {
  Row,
  RadioGroup,
  Radio,
  FormDatePicker,
  FormTimePicker,
  DatePickerGroup
} from './styled'
import EditUnitSurveySchema from './schema'
import UnitSurveyQuestions from '../components/UnitSurveyQuestions'
import CreateUnitSurveyQuestion from '../components/CreateUnitSurveyQuestion'
import EditUnitSurveyQuestion from '../components/EditUnitSurveyQuestion'

const EditUnitSurveyScreen = () => {
  const { t, i18n: { language } } = useTranslation(['unit_setting'])
  const history = useHistories()
  const { queryWorkspaceID } = useGetQuery()
  const { courseId, surveyId } = useParams()
  const { isViewing } = useRoles()
  const {
    survey,
    surveyQuestion,
    surveyQuestions,
    isSubmitting,
    updateUnitSurveyAction,
    getUnitSurveyAction,
    getUnitSurveyQuestionsAction,
    createUnitSurveyQuestionAction,
    getUnitSurveyQuestionAction,
    updateUnitSurveyQuestionAction,
    updateOrderUnitSurveyQuestionAction,
    deleteUnitSurveyQuestionsAction
  } = useEditUnitSurvey()
  const form = useForm({
    defaultValues: {
      estimateTime: { label: t('common:none'), value: 0 },
      unitSurrveyStartType: LIMIT_TIME_TYPE.NOT_SET,
      unitSurrveyEndType: LIMIT_TIME_TYPE.NOT_SET
    },
    resolver: yupResolver(EditUnitSurveySchema(t))
  })

  const { handleSubmit, watch, setValue, clearErrors, formState: { errors } } = form

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
      updateUnitSurveyAction({ courseId, surveyId, data, history })
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

  const initForm = useCallback(() => {
    setValue('unitSurveyName', survey.unitName)
    setValue('unitSurveyDetail', survey.unitDetails)
    setValue('listQuestionId', survey.listQuestionId)
    if (survey.limitPeriodStart) {
      setValue('unitSurrveyStartType', LIMIT_TIME_TYPE.SET)
      const date = moment(survey.limitPeriodStart)
      setValue('startDate', date)
      setValue('startTime', date)
    } else {
      setValue('unitSurrveyStartType', LIMIT_TIME_TYPE.NOT_SET)
    }
    if (survey.limitPeriodEnd) {
      setValue('unitSurrveyEndType', LIMIT_TIME_TYPE.SET)
      const date = moment(survey.limitPeriodEnd)
      setValue('endDate', date)
      setValue('endTime', date)
    } else {
      setValue('unitSurrveyEndType', LIMIT_TIME_TYPE.NOT_SET)
    }
    setValue('messageCompleted', survey.messageComplete)
    setValue('estimateTime', {
      label: survey.estimateStudyTime ? t('minutes', { number: survey.estimateStudyTime }) : t('common:none'),
      value: survey.estimateStudyTime
    } || null)

    clearErrors()
  }, [survey])

  useEffect(() => {
    setValue('unitSurrveyStartTime', combineDateAndTimeV2(startDate, startTime)?.valueOf())
  }, [startDate, startTime])

  useEffect(() => {
    setValue('unitSurrveyEndTime', combineDateAndTimeV2(endDate, endTime)?.valueOf())
  }, [endDate, endTime])

  useEffect(() => {
    if (unitSurrveyStartType === LIMIT_TIME_TYPE.NOT_SET) {
      clearErrors('startDate')
      setValue('startDate', '')
      setValue('startTime', '')
    }
  }, [unitSurrveyStartType])

  useEffect(() => {
    if (unitSurrveyEndType === LIMIT_TIME_TYPE.NOT_SET) {
      clearErrors(['endDate', 'unitSurrveyEndTime'])
      setValue('endDate', '')
      setValue('endTime', '')
    }
  }, [unitSurrveyEndType])

  useEffect(() => {
    setValue('estimateTime', optionTimes.find((o) => o.value === estimateTime?.value))
  }, [optionTimes])

  useEffect(() => {
    clearErrors()
  }, [language])

  useEffect(() => {
    if (!isEmpty(survey)) {
      initForm()
    }
  }, [survey])

  useEffect(() => {
    setValue('listQuestionId', surveyQuestions.map((s) => s.questionId))
    if (surveyQuestions?.length > 0) {
      clearErrors('listQuestionId')
    }
  }, [surveyQuestions])

  useEffect(() => {
    getUnitSurveyAction({ params: { surveyId } })
    getUnitSurveyQuestionsAction({ type: 'edit', params: { surveyId } })
  }, [])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('edit_survey.title')}
        backRoute={`${RoutesName.UNIT_SETTINGS}${queryWorkspaceID.ONLY}`}
        backRouteText={t('back_to_unit_setting')}
      />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Divider />
            <Row>
              <FormLabel title={t('course')} />
              <Right noInput>
                <span>{survey?.courseName}</span>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('edit_survey.unit_survey_name')} description="Required" />
              <Right>
                <FormInput name="unitSurveyName" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('edit_survey.unit_survey_detail')} description="Optional" />
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
              <FormLabel title={t('edit_survey.question_setting')} description="Required" />
              <Right>
                {surveyQuestions.length > 0
                  ? (
                    <Button
                      size="large"
                      icon={<EditOutlined />}
                      onClick={() => setVisibleSelectQuestionsModal(true)}
                    >
                      {t(isViewing ? 'common:view_question' : 'edit_survey.select_question')}
                    </Button>
                  )
                  : (
                    <Button
                      size="large"
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setVisibleCreateUnitSurveyQuestionsModal(true)}
                      disabled={isViewing}
                    >
                      {t('edit_survey.create_question')}
                    </Button>
                  )}
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
                <Button htmlType="button" onClick={initForm}>{t('common:restore')}</Button>
                <PopupButton
                  icon={EditOutlined}
                  titlePopup={t('edit_survey.confirm_change')}
                  textButton={t('common:change')}
                  onConfirm={handleSubmit(onSubmit)}
                  disabled={isViewing}
                  isLoading={isSubmitting}
                />
              </Space>
            </div>
          </FormProvider>
        </form>
      </div>

      {visibleSelectQuestionsModal && (
        <UnitSurveyQuestions
          surveyId={surveyId}
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
          isViewing={isViewing}
        />
      )}

      {visibleCreateUnitSurveyQuestionsModal && (
        <CreateUnitSurveyQuestion
          surveyId={surveyId}
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
          surveyId={surveyId}
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
          isViewing={isViewing}
          surveyQuestions={surveyQuestions}
        />
      )}
    </Wrapper>
  )
}

export default EditUnitSurveyScreen
