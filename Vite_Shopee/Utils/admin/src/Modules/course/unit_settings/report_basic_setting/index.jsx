/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Space, Button } from 'antd'
import { useGetQuery, useHistories, useLoadReportDetail, useRoles, useUpdateBasicReport } from 'Hooks'
import { useValidateRangeDate } from 'Hooks/validate_rangedate'
import { FORMAT_TIME } from 'Constants/formatTime'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { QUERY } from 'Constants'
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
import { PUBLISH_TYPE } from 'Constants/course'
import { EditOutlined } from '@ant-design/icons'
import { RoutesName } from 'Modules/course/routes'
import { Wrapper, Divider, Right } from 'Themes/facit'
import {
  Row,
  RadioGroup,
  Radio,
  FormDatePicker,
  FormTimePicker,
  DatePickerGroup
} from './styled'
import Schema from './schema'

const ReportBasicSettingScreen = () => {
  const { t } = useTranslation(['unit_setting'])
  const history = useHistories()
  const { courseId, reportId } = useParams()
  const { createBy } = useRoles()
  const { queryWorkspaceID } = useGetQuery()

  const language = getLocalStorage(STORAGE.LANGUAGE)

  const { detailReport, loadReportDetailAction } = useLoadReportDetail()
  const { updateBasicReportAction, isLoadingUpdateBasicReport } = useUpdateBasicReport()
  const { data } = detailReport

  const form = useForm({
    defaultValues: {
      isLimitStartTrue: 0,
      isLimitEndTrue: 0,
      isLimitDeadlineTrue: 0
    },
    resolver: yupResolver(Schema(t))
  })

  const { handleSubmit, watch, setValue, clearErrors, formState: { errors } } = form

  const optionTimes = [...Array(240)].map((item, index) => ({
    label: t('minutes', { number: index + 1 }),
    value: index + 1
  }))
  optionTimes.unshift({ label: t('common:none'), value: null })

  useEffect(() => {
    loadReportDetailAction({ reportId })
  }, [reportId])

  const handleSetData = () => {
    clearErrors()
    setValue('reportName', data.reportName)
    setValue('detail', data.detail || '')
    if (data.startTime) {
      setValue('isLimitStartTrue', 1)
      setValue('startDate', moment(data.startTime).format(FORMAT_TIME.YEAR_MONTH_DATE))
      setValue('startTime', moment(data.startTime).format(FORMAT_TIME.HOUR_MINUTES))
    } else {
      setValue('isLimitStartTrue', 0)
      setValue('startDate', '')
      setValue('startTime', '')
      clearErrors(['startDate'])
    }
    if (data.endTime) {
      setValue('isLimitEndTrue', 1)
      setValue('endDate', moment(data.endTime).format(FORMAT_TIME.YEAR_MONTH_DATE))
      setValue('endTime', moment(data.endTime).format(FORMAT_TIME.HOUR_MINUTES))
    } else {
      setValue('isLimitEndTrue', 0)
      setValue('endDate', '')
      setValue('endTime', '')
      clearErrors(['endDate', 'endTime'])
    }
    if (data.submissionDeadline) {
      setValue('isLimitDeadlineTrue', 1)
      setValue('deadlineDate', moment(data.submissionDeadline).format(FORMAT_TIME.YEAR_MONTH_DATE))
      setValue('deadlineTime', moment(data.submissionDeadline).format(FORMAT_TIME.HOUR_MINUTES))
    } else {
      setValue('isLimitDeadlineTrue', 0)
      setValue('deadlineDate', '')
      setValue('deadlineTime', '')
      clearErrors(['deadlineDate'])
    }

    setValue('completeMessage', data.completeMessage || '')
    setValue(
      'estimatedStudyTime', data.estimatedStudyTime
        ? {
          value: data.estimatedStudyTime,
          label: t('minutes', { number: data.estimatedStudyTime })
        }
        : { label: t('common:none'), value: null }
    )
  }

  useEffect(() => {
    if (detailReport) {
      handleSetData()
    }
  }, [detailReport])

  useEffect(() => {
    clearErrors()
  }, [t])

  const [
    isLimitStartTrue,
    startDateWatch,
    startTimeWatch,
    isLimitEndTrue,
    endDateWatch,
    endTimeWatch,
    isLimitDeadlineTrue,
    deadlineDateWatch,
    deadlineTimeWatch,
    estimatedStudyTimeWatch
  ] = watch([
    'isLimitStartTrue',
    'startDate',
    'startTime',
    'isLimitEndTrue',
    'endDate',
    'endTime',
    'isLimitDeadlineTrue',
    'deadlineDate',
    'deadlineTime',
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

  const onSubmit = useCallback(
    (formData) => {
      const {
        startTime,
        startDate,
        endTime,
        endDate,
        deadlineDate,
        deadlineTime,
        completeMessage,
        estimatedStudyTime,
        detail,
        reportName
      } = formData
      const dataPayload = {
        courseId,
        reportId,
        history,
        createBy,
        data: {
          endTime: isLimitEndTrue ? new Date(`${endDate} ${endTime}`).getTime() : null,
          startTime: isLimitStartTrue ? new Date(`${startDate} ${startTime}`).getTime() : null,
          submissionDeadline: isLimitDeadlineTrue
            ? new Date(`${deadlineDate} ${deadlineTime}`).getTime() : null,
          completeMessage,
          estimatedStudyTime: estimatedStudyTime.value,
          detail,
          publishOtherStudent: PUBLISH_TYPE.PRIVATE,
          reportName
        }
      }
      updateBasicReportAction(dataPayload)
    },
    [isLimitStartTrue, isLimitEndTrue, isLimitDeadlineTrue]
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
    if (field === 'isLimitDeadlineTrue') {
      setValue('isLimitDeadlineTrue', e.target.value ? 1 : 0)
      if (!e.target.value) {
        setValue('deadlineDate', '')
        setValue('deadlineTime', '')
        clearErrors(['deadlineDate', 'deadlineTime'])
      }
    }
  }

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('unit_setting:basic_info_setting.title')}
        backRoute={`${RoutesName.REPORT_DETAIL}/${reportId}?${QUERY.CREATE_BY}=${createBy}${queryWorkspaceID.CONNECT}`}
        backRouteText="report_setting:back_report_details"
      />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Row>
              <FormLabel title={t('course')} />
              <Right noInput>
                <span>{data?.courseName}</span>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('unit')} description="Required" />
              <Right>
                <FormInput name="reportName" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('unit_detail')} description="Optional" />
              <Right>
                <FormTextArea
                  name="detail"
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
              <FormLabel title={t('detail.submit_deadline')} description="Required" />
              <Right>
                <RadioGroup
                  onChange={(e) => handleOnChangeSelectDateTime(e, 'isLimitDeadlineTrue')}
                  value={isLimitDeadlineTrue}
                >
                  <Space direction="vertical">
                    <Radio value={0}>
                      <span>{t('detail.do_not_set_deadline')}</span>
                    </Radio>
                    <Radio value={1} language={language}>
                      <div>
                        <DatePickerGroup>
                          <span>{t('detail.date')}:</span>
                          <FormDatePicker
                            name="deadlineDate"
                            wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                            disabled={!isLimitDeadlineTrue}
                            value={deadlineDateWatch ? moment(deadlineDateWatch) : null}
                            format={FORMAT_TIME.YEAR_MONTH_DATE}
                            placeholder={FORMAT_TIME.YEAR_MONTH_DATE}
                          />
                          <span>{t('detail.time')}:</span>
                          <FormTimePicker
                            name="deadlineTime"
                            wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                            disabled={!isLimitDeadlineTrue}
                            value={deadlineTimeWatch ? moment(deadlineTimeWatch, FORMAT_TIME.HOUR_MINUTES) : null}
                            format={FORMAT_TIME.HOUR_MINUTES}
                            placeholder={FORMAT_TIME.HOUR_MINUTES}
                          />
                        </DatePickerGroup>
                      </div>
                      <span className="public">{t('detail.submitted_until')}</span>
                    </Radio>
                    {
                    errors?.deadlineDate && (
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
                  name="completeMessage"
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
                  titlePopup={t('report_setting:edit.confirm')}
                  textButton={t('common:button_setup')}
                  okText="common:button_setup"
                  disabled={isShowError || !isEmpty(errors) || isLoadingUpdateBasicReport}
                  onConfirm={handleSubmit(onSubmit)}
                  isLoading={isLoadingUpdateBasicReport}
                />
              </Space>
            </div>
          </FormProvider>
        </form>
      </div>
    </Wrapper>
  )
}

export default ReportBasicSettingScreen
