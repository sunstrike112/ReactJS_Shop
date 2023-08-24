/* eslint-disable react/prop-types */
import { EditOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Radio, Skeleton, Space, Form, Col } from 'antd'
import {
  FormDatePicker,
  FormInput,
  FormLabel,
  FormRadio,
  FormSelect,
  FormTextArea,
  FormTimePicker,
  PopupButton,
  Text,
  Title
} from 'Components'
import { LESSON_PATH_TYPES, OPTIONS_PATH_LESSON, QUERY } from 'Constants'
import { FORMAT_TIME } from 'Constants/formatTime'
import { getFileType } from 'Constants/upload_file'
import { useHistories, useLoadCourse, useRoles, useGetQuery, useWebview } from 'Hooks'
import { useEditUnitLesson } from 'Hooks/unit_settings'
import { useValidateRangeDate } from 'Hooks/validate_rangedate'
import { RoutesName } from 'Modules/course/routes'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { Divider, Right, Wrapper, Row } from 'Themes/facit'
import { getFileFromS3 } from 'Utils'
import CreateLectureShcema from './schema'
import { FormWrapper, SpaceWrapper } from './styled'

const defaultValues = {
  type: 'PDF',
  displayType: 1,
  isLimitStartTrue: 0,
  isLimitEndTrue: 0,
  messageCompleted: '',
  unitDetails: '',
  estimatedStudyTime: ''
}

const combineDateAndTime = (date, time) => {
  if (!date) return ''
  if (time) return new Date(`${date}T${time}`)
  return new Date(date)
}

const EditLectureScreen = () => {
  const history = useHistories()
  const { workspaceid } = useGetQuery()
  const { t, i18n: { language } } = useTranslation(['create_lecture'])
  const { isWebviewMode, isPreviewingResultOfWebview } = useWebview()
  const { courseId, unitId } = useParams()
  const { isViewing } = useRoles()

  const form = useForm({
    resolver: yupResolver(CreateLectureShcema(t)),
    defaultValues,
    mode: 'onChange'
  })

  const { handleSubmit, setValue, watch, clearErrors, formState: { errors }, setError } = form

  const [
    isLimitStartTrue,
    limitStartDateWatch,
    limitStartTimeWatch,
    isLimitEndTrue,
    limitEndDateWatch,
    limitEndTimeWatch,
    estimatedStudyTimeWatch,
    typePathWatch
  ] = watch(
    [
      'isLimitStartTrue',
      'limitStartDate',
      'limitStartTime',
      'isLimitEndTrue',
      'limitEndDate',
      'limitEndTime',
      'estimatedStudyTime',
      'typePath'
    ]
  )

  const isDisablePathUploadFile = useMemo(() => !(typePathWatch === OPTIONS_PATH_LESSON[0].value), [typePathWatch])

  const { course, loadCourseAction } = useLoadCourse()
  const { isSuccess, editUnitLessonAction, isLoading, error, getDetailLessonAction, detailLesson } = useEditUnitLesson()
  const { isShowError } = useValidateRangeDate(
    combineDateAndTime(limitStartDateWatch, limitStartTimeWatch),
    combineDateAndTime(limitEndDateWatch, limitEndTimeWatch),
    !isLimitEndTrue || !isLimitStartTrue
  )

  const onSubmit = (formData) => {
    const {
      displayType,
      limitEndDate,
      limitEndTime,
      limitStartDate,
      limitStartTime,
      estimatedStudyTime,
      ...payload
    } = formData
    payload.limitStart = isLimitStartTrue ? combineDateAndTime(limitStartDate, limitStartTime || '00:00').valueOf() : ''
    payload.limitEnd = isLimitEndTrue ? combineDateAndTime(limitEndDate, limitEndTime || '00:00').valueOf() : ''
    payload.estimatedStudyTime = estimatedStudyTime?.value || null
    payload.id = detailLesson.unitLessonRequest.id

    const extension = payload.path.substring(payload.path.lastIndexOf('.') + 1, payload.path.length) || payload.path
    payload.type = getFileType(extension)
    editUnitLessonAction({ courseId, unitId: detailLesson.unitLessonRequest.id, payload })
  }

  const estimateTimeOption = useMemo(
    () => new Array(241).fill(0).map((_, i) => ({
      label: i ? t('common:minute_s', { time: i }) : t('common:none'),
      value: i
    })),
    [t]
  )

  const handleOnChangeSelectDateTime = (e, field) => {
    if (field === 'isLimitStartTrue') {
      setValue('isLimitStartTrue', e.target.value ? 1 : 0)
      if (!e.target.value) {
        clearErrors(['limitStartDate', 'limitStartTime'])
      }
    }
    if (field === 'isLimitEndTrue') {
      setValue('isLimitEndTrue', e.target.value ? 1 : 0)
      if (!e.target.value) {
        clearErrors(['limitEndDate', 'limitEndTime'])
      }
    }
  }

  const handleSetDetail = () => {
    const { unitLessonRequest } = detailLesson

    setValue('estimatedStudyTime', {
      label: unitLessonRequest.estimatedStudyTime ? t('common:minute_s', { time: unitLessonRequest.estimatedStudyTime }) : t('common:none'),
      value: unitLessonRequest.estimatedStudyTime
    })
    if (unitLessonRequest.limitEnd) {
      setValue('isLimitEndTrue', 1)
      setValue('limitEndDate', moment(unitLessonRequest.limitEnd).format('YYYY-MM-DD'))
      setValue('limitEndTime', moment(unitLessonRequest.limitEnd).format('HH:mm'))
    } else {
      setValue('isLimitEndTrue', 0)
      setValue('limitEndDate', '')
      setValue('limitEndTime', '')
    }
    if (unitLessonRequest.limitStart) {
      setValue('isLimitStartTrue', 1)
      setValue('limitStartDate', moment(unitLessonRequest.limitStart).format('YYYY-MM-DD'))
      setValue('limitStartTime', moment(unitLessonRequest.limitStart).format('HH:mm'))
    } else {
      setValue('isLimitStartTrue', 0)
      setValue('limitStartDate', '')
      setValue('limitStartTime', '')
    }
    setValue('messageCompleted', unitLessonRequest.messageCompleted || '')

    if (unitLessonRequest.typePath === LESSON_PATH_TYPES.DEFAULT) {
      setValue('path', getFileFromS3(unitLessonRequest.path) || '')
    } else {
      setValue('path', unitLessonRequest.path || '')
    }

    setValue('type', unitLessonRequest.type || 'PDF')
    setValue('unitDetails', unitLessonRequest.unitDetails || '')
    setValue('unitName', unitLessonRequest.unitName || '')
    setValue('typePath', unitLessonRequest.typePath || '')
  }

  useEffect(() => {
    loadCourseAction({ courseId })
  }, [])

  useEffect(() => {
    if (error?.data?.error === 'ERROR_REGISTER_UNIT_ALREADY_EXIST') {
      setError('unitName', {
        type: 'manual',
        message: t('validation.name_already_exists')
      })
    }
  }, [error])

  useEffect(() => {
    if (estimatedStudyTimeWatch?.value === 0) {
      setValue('estimatedStudyTime', estimateTimeOption[0])
    }
  }, [t])

  useEffect(() => {
    if (isSuccess) {
      if (isWebviewMode) {
        history.push('/')
      } else {
        history.push(RoutesName.UNIT_SETTINGS)
      }
    }
  }, [isSuccess])

  useEffect(() => {
    getDetailLessonAction({ unitId })
  }, [])

  useEffect(() => {
    if (detailLesson) {
      handleSetDetail()
    }
  }, [detailLesson])

  useEffect(() => {
    clearErrors()
  }, [language])

  const handleTypePath = useCallback((e) => {
    const { unitLessonRequest } = detailLesson
    const { value } = e.target
    setValue('typePath', value)
    setValue('path', value === unitLessonRequest.typePath ? getFileFromS3(unitLessonRequest.path) : '')
    clearErrors('path')
  }, [detailLesson])

  const renderFormMobile = () => (
    <FormProvider {...form} onSubmit={handleSubmit(onSubmit)}>
      <Form
        name="wrap"
        labelCol={{
          flex: '110px'
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1
        }}
        style={{ backgroundColor: 'white', marginTop: '1rem', marginBottom: '1rem', padding: '1rem', borderRadius: '1rem' }}
      >
        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('create_lecture:unit')} description="Required" width={50} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px', marginBottom: '16px' }}>
            <FormInput name="unitName" disabled={isPreviewingResultOfWebview} />
          </Right>
        </Col>
        <Divider />

        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('create_lecture:unit_details')} description="Optional" width={50} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px', marginBottom: '16px' }}>
            <FormTextArea
              name="unitDetails"
              rows={5}
              wrapperProps={{
                style: {
                  marginBottom: 0
                }
              }}
              total={4000}
              disabled={isPreviewingResultOfWebview}
            />
          </Right>
        </Col>
        <Divider />

        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('create_lecture:limit_on_attendance_start')} description="Optional" width={100} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px', marginBottom: '16px' }}>
            <Radio.Group
              onChange={(e) => handleOnChangeSelectDateTime(e, 'isLimitStartTrue')}
              value={isLimitStartTrue}
              disabled={isPreviewingResultOfWebview}
            >
              <Space direction="vertical">
                <Radio value={0}>
                  <span>{t('create_lecture:do_not_set_start')}</span>
                </Radio>
                <SpaceWrapper align="baseline">
                  <Radio value={1} id="limitstartDateRadio" />
                  <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
                    <label width={50} htmlFor="limitstartDateRadio">{t('create_lecture:release_since_start')} {t('common:label_date')}:</label>
                    <Row>
                      <FormDatePicker
                        name="limitStartDate"
                        disabled={isPreviewingResultOfWebview && (!isLimitStartTrue || isWebviewMode)}
                        wrapperStyles={{ marginBottom: 0 }}
                        value={limitStartDateWatch ? moment(limitStartDateWatch) : null}
                        placeholder={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                        getPopupContainer={(trigger) => trigger?.parentElement}
                        hideError
                      />
                    </Row>
                    <label htmlFor="limitstartDateRadio">{t('common:label_time')}:</label>
                    <Row style={{ width: '100%' }}>
                      <FormTimePicker
                        name="limitStartTime"
                        disabled={isPreviewingResultOfWebview && (!isLimitStartTrue || isWebviewMode)}
                        wrapperStyles={{ marginBottom: 0 }}
                        value={limitStartTimeWatch ? moment(limitStartTimeWatch, FORMAT_TIME.HOUR_MINUTES) : null}
                        format={FORMAT_TIME.HOUR_MINUTES}
                        placeholder={FORMAT_TIME.HOUR_MINUTES_LOWER}
                        getPopupContainer={(trigger) => trigger?.parentElement}
                        allowClear
                        hideError
                      />
                    </Row>
                    <label htmlFor="limitstartDateRadio">{t('create_lecture:release_since_end')}</label>
                  </Col>
                </SpaceWrapper>
              </Space>
              {errors?.limitStartDate && (
              <Text.primary color="error_ant" fontSize="size_14">
                {errors.limitStartDate.message}
              </Text.primary>
              )}
            </Radio.Group>
          </Right>
        </Col>
        <Divider />

        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('create_lecture:limit_on_attendance_end')} description="Optional" width={100} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px', marginBottom: '16px' }}>
            <Radio.Group
              onChange={(e) => handleOnChangeSelectDateTime(e, 'isLimitEndTrue')}
              value={isLimitEndTrue}
              disabled={isPreviewingResultOfWebview}
            >
              <Space direction="vertical">
                <Radio value={0}>
                  <span>
                    <span>{t('create_lecture:do_not_set_end')}</span>
                  </span>
                </Radio>
                <SpaceWrapper align="baseline">
                  <Radio value={1} id="limitendDateRadio" />
                  <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
                    <label htmlFor="limitendDateRadio">{t('create_lecture:release_until_start')} {t('common:label_date')}:</label>
                    <Row>
                      <FormDatePicker
                        name="limitEndDate"
                        disabled={isPreviewingResultOfWebview && (!isLimitEndTrue || isWebviewMode)}
                        wrapperStyles={{ marginBottom: 0 }}
                        value={limitEndDateWatch ? moment(limitEndDateWatch) : null}
                        forceError={isShowError}
                        placeholder={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                        getPopupContainer={(trigger) => trigger?.parentElement}
                        hideError
                      />
                    </Row>
                    <label htmlFor="limitendDateRadio">{t('common:label_time')}:</label>
                    <FormTimePicker
                      name="limitEndTime"
                      disabled={isPreviewingResultOfWebview && (!isLimitEndTrue || isWebviewMode)}
                      wrapperStyles={{ marginBottom: 0 }}
                      value={limitEndTimeWatch ? moment(limitEndTimeWatch, 'HH:mm') : null}
                      format="HH:mm"
                      forceError={isShowError}
                      placeholder={FORMAT_TIME.HOUR_MINUTES_LOWER}
                      getPopupContainer={(trigger) => trigger?.parentElement}
                      allowClear
                      hideError
                    />
                    <label htmlFor="limitendDateRadio">{t('create_lecture:release_until_end')}</label>
                  </Col>
                </SpaceWrapper>
              </Space>
              {errors?.limitEndDate && (
              <Text.primary color="error_ant" fontSize="size_14">
                {errors.limitEndDate.message}
              </Text.primary>
              )}
            </Radio.Group>
            {isShowError && (
            <Text.primary color="error_ant" fontSize="size_14">
              {t('create_lecture:validation.invalid_range_date')}
            </Text.primary>
            )}
          </Right>
        </Col>
        <Divider />

        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('create_lecture:messageCompleted')} description="Optional" width={60} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px', marginBottom: '16px' }}>
            <FormTextArea
              name="messageCompleted"
              rows={3}
              wrapperProps={{
                style: {
                  marginBottom: 0
                }
              }}
              total={100}
              disabled={isPreviewingResultOfWebview}
            />
          </Right>
        </Col>
        <Divider />

        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('create_lecture:estimatedStudyTime')} description="Optional" width={60} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px', marginBottom: '16px' }}>
            <FormSelect
              t={t}
              value={estimatedStudyTimeWatch}
              name="estimatedStudyTime"
              options={estimateTimeOption}
              menuPlacement="top"
              disabled={isPreviewingResultOfWebview}
              isSearchable={false}
            />
          </Right>
        </Col>
        <Divider />
        { !isPreviewingResultOfWebview && (
        <div className="form-action-group" style={{ marginTop: '1rem' }}>
          <Space>
            <Button
              htmlType="button"
              onClick={() => {
                handleSetDetail()
                clearErrors()
              }}
            >
              {t('common:edit_options.restore')}
            </Button>
            <PopupButton
              icon={EditOutlined}
              titlePopup={t('create_lecture:message.confirm_edit')}
              textButton={t('common:edit_options.change')}
              disabled={isLoading || isShowError || isViewing}
              onConfirm={handleSubmit(onSubmit)}
              okText={t('common:change')}
              cancelText={t('common:cancel')}
              isLoading={isLoading}
            />
          </Space>
        </div>
        )}

      </Form>
    </FormProvider>
  )

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('create_lecture:edit_title')}
        backRoute={isWebviewMode ? '/' : workspaceid ? `${RoutesName.UNIT_SETTINGS}?${QUERY.WORKSPACE_ID}=${workspaceid}` : RoutesName.UNIT_SETTINGS}
        backRouteText={isWebviewMode ? '' : t('back_to_unit_setting')}
        active={isWebviewMode}
      />
      {!isWebviewMode ? (
        <FormWrapper isDisablePathUploadFile={isDisablePathUploadFile}>
          <div className="form-wrapper">
            <FormProvider {...form}>
              <form>
                <Row>
                  <FormLabel title={t('create_lecture:course_name')} />
                  <Right>
                    <span>{course.courseName || <Skeleton.Input active style={{ width: 200 }} />}</span>
                  </Right>
                </Row>

                <Divider />

                <Row>
                  <FormLabel title={t('create_lecture:unit')} description="Required" />
                  <Right>
                    <FormInput name="unitName" />
                  </Right>
                </Row>

                <Divider />

                <Row>
                  <FormLabel title={t('create_lecture:unit_details')} description="Optional" />
                  <Right>
                    <FormTextArea
                      name="unitDetails"
                      rows={5}
                      wrapperProps={{
                        style: {
                          marginBottom: 0
                        }
                      }}
                      total={4000}
                    />
                  </Right>
                </Row>

                <Divider />

                <Row>
                  <FormLabel title={t('create_lecture:path')} description="Required" />
                  <Right>
                    <FormRadio t={t} name="typePath" options={OPTIONS_PATH_LESSON} onChange={handleTypePath} />
                    <Link
                      to={workspaceid ? `${RoutesName.UPLOAD_FILE}?${QUERY.WORKSPACE_ID}=${workspaceid}` : RoutesName.UPLOAD_FILE}
                      className="link_path_s3"
                      target="_blank"
                      rel="noopener noreferrer"
                      disabled={isDisablePathUploadFile}
                    >
                      <FolderOpenOutlined style={{ marginRight: 4 }} />
                      {t('create_lecture:upload_or_refer_a_file')}
                    </Link>
                    <FormInput
                      name="path"
                      placeholder={t('create_lecture:path_of_page')}
                    />
                  </Right>
                </Row>

                <Divider />

                <Row>
                  <FormLabel title={t('create_lecture:limit_on_attendance_start')} description="Optional" />
                  <Right>
                    <Radio.Group
                      onChange={(e) => handleOnChangeSelectDateTime(e, 'isLimitStartTrue')}
                      value={isLimitStartTrue}
                    >
                      <Space direction="vertical">
                        <Radio value={0}>
                          <span>{t('create_lecture:do_not_set_start')}</span>
                        </Radio>
                        <SpaceWrapper align="baseline">
                          <Radio value={1} id="limitstartDateRadio" />
                          <label htmlFor="limitstartDateRadio">{t('create_lecture:release_since_start')} {t('common:label_date')}:</label>
                          <FormDatePicker
                            name="limitStartDate"
                            disabled={!isLimitStartTrue}
                            wrapperStyles={{ marginBottom: 0 }}
                            value={limitStartDateWatch ? moment(limitStartDateWatch) : null}
                            placeholder={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                            getPopupContainer={(trigger) => trigger?.parentElement}
                            hideError
                          />
                          <label htmlFor="limitstartDateRadio">{t('common:label_time')}:</label>
                          <FormTimePicker
                            name="limitStartTime"
                            disabled={!isLimitStartTrue}
                            wrapperStyles={{ marginBottom: 0 }}
                            value={limitStartTimeWatch ? moment(limitStartTimeWatch, FORMAT_TIME.HOUR_MINUTES) : null}
                            format={FORMAT_TIME.HOUR_MINUTES}
                            placeholder={FORMAT_TIME.HOUR_MINUTES_LOWER}
                            getPopupContainer={(trigger) => trigger?.parentElement}
                            allowClear
                            hideError
                          />
                          <label htmlFor="limitstartDateRadio">{t('create_lecture:release_since_end')}</label>
                        </SpaceWrapper>
                      </Space>
                      {errors?.limitStartDate && (
                      <Text.primary color="error_ant" fontSize="size_14">
                        {errors.limitStartDate.message}
                      </Text.primary>
                      )}
                    </Radio.Group>
                  </Right>
                </Row>

                <Divider />

                <Row>
                  <FormLabel title={t('create_lecture:limit_on_attendance_end')} description="Optional" />
                  <Right>
                    <Radio.Group
                      onChange={(e) => handleOnChangeSelectDateTime(e, 'isLimitEndTrue')}
                      value={isLimitEndTrue}
                    >
                      <Space direction="vertical">
                        <Radio value={0}>
                          <span>
                            <span>{t('create_lecture:do_not_set_end')}</span>
                          </span>
                        </Radio>
                        <SpaceWrapper align="baseline">
                          <Radio value={1} id="limitendDateRadio" />
                          <label htmlFor="limitendDateRadio">{t('create_lecture:release_until_start')} {t('common:label_date')}:</label>
                          <FormDatePicker
                            name="limitEndDate"
                            disabled={!isLimitEndTrue}
                            wrapperStyles={{ marginBottom: 0 }}
                            value={limitEndDateWatch ? moment(limitEndDateWatch) : null}
                            forceError={isShowError}
                            placeholder={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                            getPopupContainer={(trigger) => trigger?.parentElement}
                            hideError
                          />
                          <label htmlFor="limitendDateRadio">{t('common:label_time')}:</label>
                          <FormTimePicker
                            name="limitEndTime"
                            disabled={!isLimitEndTrue}
                            wrapperStyles={{ marginBottom: 0 }}
                            value={limitEndTimeWatch ? moment(limitEndTimeWatch, 'HH:mm') : null}
                            format="HH:mm"
                            forceError={isShowError}
                            placeholder={FORMAT_TIME.HOUR_MINUTES_LOWER}
                            getPopupContainer={(trigger) => trigger?.parentElement}
                            allowClear
                            hideError
                          />
                          <label htmlFor="limitendDateRadio">{t('create_lecture:release_until_end')}</label>
                        </SpaceWrapper>
                      </Space>
                      {errors?.limitEndDate && (
                      <Text.primary color="error_ant" fontSize="size_14">
                        {errors.limitEndDate.message}
                      </Text.primary>
                      )}
                    </Radio.Group>
                    {isShowError && (
                    <Text.primary color="error_ant" fontSize="size_14">
                      {t('create_lecture:validation.invalid_range_date')}
                    </Text.primary>
                    )}
                  </Right>
                </Row>

                <Divider />

                <Row>
                  <FormLabel title={t('create_lecture:messageCompleted')} description="Optional" />
                  <Right>
                    <FormTextArea
                      name="messageCompleted"
                      rows={3}
                      wrapperProps={{
                        style: {
                          marginBottom: 0
                        }
                      }}
                      total={100}
                    />
                  </Right>
                </Row>

                <Divider />

                <Row>
                  <FormLabel title={t('create_lecture:estimatedStudyTime')} description="Optional" />
                  <Right>
                    <FormSelect
                      t={t}
                      value={estimatedStudyTimeWatch}
                      name="estimatedStudyTime"
                      options={estimateTimeOption}
                      menuPlacement="top"
                    />
                  </Right>
                </Row>

                <Divider />

                <div className="form-action-group">
                  <Space>
                    <Button
                      htmlType="button"
                      onClick={() => {
                        handleSetDetail()
                        clearErrors()
                      }}
                    >
                      {t('common:edit_options.restore')}
                    </Button>
                    <PopupButton
                      icon={EditOutlined}
                      titlePopup={t('create_lecture:message.confirm_edit')}
                      textButton={t('common:edit_options.change')}
                      disabled={isLoading || isShowError || isViewing}
                      onConfirm={handleSubmit(onSubmit)}
                      okText={t('common:change')}
                      cancelText={t('common:cancel')}
                      isLoading={isLoading}
                    />
                  </Space>
                </div>
              </form>
            </FormProvider>
          </div>
        </FormWrapper>
      ) : renderFormMobile()}

    </Wrapper>
  )
}

export default EditLectureScreen
