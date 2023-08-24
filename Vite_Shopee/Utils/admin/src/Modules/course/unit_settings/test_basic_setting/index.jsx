/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { RoutesName } from 'Modules/course/routes'

import { QUERY } from 'Constants'
import { Space, Button } from 'antd'
import { useTestDetail, useBasicInfoSetting } from 'Hooks/unit_settings'
import { useValidateRangeDate } from 'Hooks/validate_rangedate'
import { useHistories, useGetQuery, useRoles } from 'Hooks'
import { FORMAT_TIME } from 'Constants/formatTime'
import { EditOutlined } from '@ant-design/icons'
import moment from 'moment'
import { isEmpty } from 'lodash'
import {
  FormSelect,
  FormInput,
  FormTextArea,
  Text,
  Title,
  FormLabel,
  PopupButton
} from 'Components'
import { getLocalStorage, STORAGE } from 'Utils/storage'
import { Wrapper, Divider, Right } from 'Themes/facit'
import {
  Row,
  RadioGroup,
  Radio,
  FormDatePicker,
  FormTimePicker,
  DatePickerGroup
} from './styled'
import BasicInfoSettingSchema from './schema'

const TestBasicSettingScreen = () => {
  const { t } = useTranslation(['unit_setting'])
  const history = useHistories()
  const { courseId, unitId } = useParams()
  const language = getLocalStorage(STORAGE.LANGUAGE)

  const { createBy } = useRoles()
  const { queryWorkspaceID } = useGetQuery()
  const { detailTest, getDetailTestAction } = useTestDetail()
  const { basicInfoSettingAction, infoBasicSetting } = useBasicInfoSetting()
  const { isLoading } = infoBasicSetting

  const form = useForm({
    defaultValues: {
      isLimitStartTrue: 0,
      isLimitEndTrue: 0
    },
    resolver: yupResolver(BasicInfoSettingSchema(t))
  })

  const { handleSubmit, watch, setValue, clearErrors, formState: { errors } } = form

  const optionTimes = [...Array(240)].map((item, index) => ({
    label: t('minutes', { number: index + 1 }),
    value: index + 1
  }))
  optionTimes.unshift({ label: t('common:none'), value: null })

  useEffect(() => {
    getDetailTestAction({ courseId, unitId })
  }, [courseId, unitId])

  useEffect(() => {
    clearErrors()
  }, [t])

  const handleSetData = () => {
    clearErrors()
    if (detailTest.data) {
      const { basicInformationResponse } = detailTest.data
      setValue('unitName', basicInformationResponse.unitName)
      setValue('unitDetails', basicInformationResponse.unitDetails || '')
      setValue('completionMessage', basicInformationResponse.completionMessage || '')
      if (basicInformationResponse.limitOnAttendanceStart) {
        setValue('isLimitStartTrue', 1)
        setValue(
          'startDate',
          moment(basicInformationResponse.limitOnAttendanceStart).format(
            FORMAT_TIME.YEAR_MONTH_DATE
          )
        )
        setValue(
          'startTime',
          moment(basicInformationResponse.limitOnAttendanceStart).format(
            FORMAT_TIME.HOUR_MINUTES
          )
        )
      } else {
        setValue('isLimitStartTrue', 0)
        setValue('startDate', '')
        setValue('startTime', '')
        clearErrors(['startDate', 'startTime'])
      }
      if (basicInformationResponse.limitOnAttendanceEnd) {
        setValue('isLimitEndTrue', 1)
        setValue(
          'endDate',
          moment(basicInformationResponse.limitOnAttendanceEnd).format(
            FORMAT_TIME.YEAR_MONTH_DATE
          )
        )
        setValue(
          'endTime',
          moment(basicInformationResponse.limitOnAttendanceEnd).format(
            FORMAT_TIME.HOUR_MINUTES
          )
        )
      } else {
        setValue('isLimitEndTrue', 0)
        setValue('endDate', '')
        setValue('endTime', '')
        clearErrors(['endDate', 'endTime'])
      }
      setValue(
        'estimatedStudyTime',
        basicInformationResponse.estimatedStudyTime
          ? {
            value: basicInformationResponse.estimatedStudyTime,
            label: t('minutes', { number: basicInformationResponse.estimatedStudyTime })
          }
          : { label: t('common:none'), value: null }
      )
    }
  }

  const [
    isLimitStartTrue,
    startDateWatch,
    startTimeWatch,
    isLimitEndTrue,
    endDateWatch,
    endTimeWatch,
    estimatedStudyTimeWatch
  ] = watch([
    'isLimitStartTrue',
    'startDate',
    'startTime',
    'isLimitEndTrue',
    'endDate',
    'endTime',
    'estimatedStudyTime'
  ])

  useEffect(() => {
    // change value follow by language
    if (estimatedStudyTimeWatch) {
      const indexEstimatedStudyTime = optionTimes.findIndex((item) => item.value === estimatedStudyTimeWatch?.value)
      setValue('estimatedStudyTime', optionTimes[indexEstimatedStudyTime])
    }
  }, [t])

  const { isShowError } = useValidateRangeDate(
    new Date(`${startDateWatch} ${startTimeWatch}`),
    new Date(`${endDateWatch} ${endTimeWatch}`),
    !isLimitEndTrue || !isLimitStartTrue
  )

  useEffect(() => {
    if (detailTest) {
      handleSetData()
    }
  }, [detailTest])

  const onSubmit = useCallback(
    (formData) => {
      const {
        startTime,
        startDate,
        endTime,
        endDate,
        completionMessage,
        estimatedStudyTime,
        unitDetails,
        unitName
      } = formData
      const dataPayload = {
        courseId,
        testId: unitId,
        history,
        createBy,
        data: {
          courseId,
          unitId,
          completionMessage,
          courseName: detailTest.data?.basicInformationResponse.courseName,
          estimatedStudyTime: estimatedStudyTime.value,
          limitOnAttendanceEnd: isLimitEndTrue ? new Date(`${endDate} ${endTime}`).getTime() : null,
          limitOnAttendanceStart: isLimitStartTrue ? new Date(`${startDate} ${startTime}`).getTime() : null,
          unitDetails,
          unitName
        }
      }
      basicInfoSettingAction(dataPayload)
    },
    [isLimitStartTrue, isLimitEndTrue]
  )

  const handleOnChangeSelectDateTime = (e, field) => {
    if (field === 'isLimitStartTrue') {
      setValue('isLimitStartTrue', e.target.value ? 1 : 0)
      if (!e.target.value) {
        setValue('startDate', '')
        setValue('startTime', '')
        clearErrors(['startDate', 'startTime'])
      }
    }
    if (field === 'isLimitEndTrue') {
      setValue('isLimitEndTrue', e.target.value ? 1 : 0)
      if (!e.target.value) {
        setValue('endDate', '')
        setValue('endTime', '')
        clearErrors(['endDate', 'endTime'])
      }
    }
  }

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('basic_info_setting.title')}
        backRoute={`${RoutesName.TEST_DETAIL}/${courseId}/${unitId}?${QUERY.CREATE_BY}=${createBy}${queryWorkspaceID.CONNECT}`}
        backRouteText="unit_setting:back_test_details"
      />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Row>
              <FormLabel title={t('course')} />
              <Right noInput>
                <span>{detailTest.data?.basicInformationResponse.courseName}</span>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('unit')} description="Required" />
              <Right>
                <FormInput name="unitName" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('unit_detail')} description="Optional" />
              <Right>
                <FormTextArea
                  name="unitDetails"
                  rows={4}
                  total={4000}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('limit_start_date')} description="Optional" />
              <Right>
                <RadioGroup
                  onChange={(e) => handleOnChangeSelectDateTime(e, 'isLimitStartTrue')}
                  value={isLimitStartTrue}
                >
                  <Space direction="vertical">
                    <Radio value={0}>
                      <span>{t('detail.label_limit_start_date')}</span>
                    </Radio>
                    <Radio value={1} language={language}>
                      <DatePickerGroup>
                        <span>{t('detail.date')}:</span>
                        <FormDatePicker
                          name="startDate"
                          wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                          disabled={!isLimitStartTrue}
                          value={startDateWatch ? moment(startDateWatch) : null}
                          format={FORMAT_TIME.YEAR_MONTH_DATE}
                          placeholder={FORMAT_TIME.YEAR_MONTH_DATE}
                        />
                        <span>{t('detail.time')}:</span>
                        <FormTimePicker
                          name="startTime"
                          wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                          disabled={!isLimitStartTrue}
                          value={startTimeWatch ? moment(startTimeWatch, FORMAT_TIME.HOUR_MINUTES) : null}
                          format={FORMAT_TIME.HOUR_MINUTES}
                          placeholder={FORMAT_TIME.HOUR_MINUTES}
                        />
                      </DatePickerGroup>
                      <span className="public">{t('detail.release_since')}</span>
                    </Radio>
                    {errors?.startDate && (
                    <Text.primary color="error_ant" fontSize="size_14">
                      {t('error_message:validation.required_limit_date')}
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
                  onChange={(e) => handleOnChangeSelectDateTime(e, 'isLimitEndTrue')}
                  value={isLimitEndTrue}
                >
                  <Space direction="vertical">
                    <Radio value={0}>
                      <span>{t('detail.label_limit_end_date')}</span>
                    </Radio>
                    <Radio value={1} language={language}>
                      <div>
                        <DatePickerGroup>
                          <span>{t('detail.date')}:</span>
                          <FormDatePicker
                            name="endDate"
                            wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                            disabled={!isLimitEndTrue}
                            value={endDateWatch ? moment(endDateWatch) : null}
                            format={FORMAT_TIME.YEAR_MONTH_DATE}
                            forceError={isShowError}
                            placeholder={FORMAT_TIME.YEAR_MONTH_DATE}
                          />
                          <span>{t('detail.time')}:</span>
                          <FormTimePicker
                            name="endTime"
                            wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                            disabled={!isLimitEndTrue}
                            value={endTimeWatch ? moment(endTimeWatch, FORMAT_TIME.HOUR_MINUTES) : null}
                            format={FORMAT_TIME.HOUR_MINUTES}
                            forceError={isShowError}
                            placeholder={FORMAT_TIME.HOUR_MINUTES}
                          />
                        </DatePickerGroup>
                      </div>
                      <span className="public">{t('detail.release_until')}</span>
                    </Radio>
                    {
                    isShowError && (
                      <Text.primary color="error_ant" fontSize="size_14">
                        {t('error_message:validation.incorrect_end_time')}
                      </Text.primary>
                    )
                  }
                    {
                    errors?.endDate && (
                      <Text.primary color="error_ant" fontSize="size_14">
                        {t('error_message:validation.required_limit_date')}
                      </Text.primary>
                    )
                  }
                  </Space>
                </RadioGroup>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('message_complete')} description="Optional" />
              <Right>
                <FormTextArea
                  name="completionMessage"
                  total={100}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('estimate_study')} description="Optional" />
              <Right>
                <FormSelect
                  name="estimatedStudyTime"
                  isSearchable={false}
                  options={optionTimes}
                  defaultValue={optionTimes[0]}
                  t={t}
                  isClearable={false}
                  menuPlacement="top"
                />
              </Right>
            </Row>
            <Divider />
            <div className="form-action-group">
              <Space>
                <Button htmlType="button" onClick={handleSetData}>{t('common:restore')}</Button>
                <PopupButton
                  icon={EditOutlined}
                  titlePopup={t('basic_info_setting.confirm_change')}
                  textButton={t('common:button_setup')}
                  okText="common:button_setup"
                  disabled={isShowError || !isEmpty(errors) || isLoading}
                  onConfirm={handleSubmit(onSubmit)}
                  isLoading={isLoading}
                />
              </Space>
            </div>
          </FormProvider>
        </form>
      </div>
    </Wrapper>
  )
}

export default TestBasicSettingScreen
