/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { EditOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Radio, Skeleton, Space } from 'antd'
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
import { QUERY } from 'Constants'
import { OPTIONS_PATH_LESSON, OPTIONS_PATH_LESSON_IMAGE, OPTIONS_TYPE_LESSON } from 'Constants/course'
import { FORMAT_TIME } from 'Constants/formatTime'
import { TYPE_FILE, getFileType } from 'Constants/upload_file'
import { useGetQuery, useHistories, useLoadCourse, useUploadFileImage, useWebview } from 'Hooks'
import { useCreateUnitLesson } from 'Hooks/unit_settings'
import { useValidateRangeDate } from 'Hooks/validate_rangedate'
import { RoutesName } from 'Modules/course/routes'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { Divider, Right, Row, Wrapper } from 'Themes/facit'
import { checkUploadFileStatusForWebview, getLocalStorage, STORAGE } from 'Utils'
import { uploadFilesAPI } from 'APIs'
import CreateLectureShcema from './schema'
import { FormWrapper, SpaceWrapper } from './styled'
import WebviewForm from './WebviewForm'
import FormUploadDD from '../components/FormUploadImage'

export const defaultValues = {
  type: 'PDF',
  displayType: 1,
  isLimitStartTrue: 0,
  isLimitEndTrue: 0,
  messageCompleted: '',
  unitDetails: '',
  estimatedStudyTime: '',
  typePath: OPTIONS_PATH_LESSON[0].value,
  typeFile: OPTIONS_TYPE_LESSON[1].value,
  typePathImage: OPTIONS_PATH_LESSON_IMAGE[0].value,
  imagePath: ''
}

const combineDateAndTime = (date, time) => {
  if (!date) return ''
  if (time) return new Date(`${date}T${time}`)
  return new Date(date)
}

const CreateCourseScreen = () => {
  const [isShowLeave, setIsLeave] = useState(false)

  const history = useHistories()
  const { workspaceid } = useGetQuery()
  const { t, i18n: { language } } = useTranslation(['create_lecture'])
  const { courseId } = useParams()
  const { isWebviewMode, webviewFileId } = useWebview()
  const form = useForm({
    resolver: yupResolver(CreateLectureShcema(t)),
    defaultValues,
    mode: 'onChange'
  })

  const { handleSubmit, setValue, watch, clearErrors, reset, formState: { errors } } = form

  const [
    isLimitStartTrue,
    limitStartDateWatch,
    limitStartTimeWatch,
    isLimitEndTrue,
    limitEndDateWatch,
    limitEndTimeWatch,
    estimatedStudyTimeWatch,
    typePathWatch,
    typeFileWatch,
    typePathImageWatch
  ] = watch(
    [
      'isLimitStartTrue',
      'limitStartDate',
      'limitStartTime',
      'isLimitEndTrue',
      'limitEndDate',
      'limitEndTime',
      'estimatedStudyTime',
      'typePath',
      'typeFile',
      'typePathImage'
    ]
  )

  const [isCheckingUploadFileStatusForWebview, setIsCheckingUploadFileStatusForWebview] = useState(false)

  const isDisablePathUploadFile = useMemo(() => !(typePathWatch === OPTIONS_PATH_LESSON[0].value), [typePathWatch])
  const isDisablePathUploadFileImage = useMemo(() => !(typePathImageWatch === OPTIONS_PATH_LESSON_IMAGE[0].value), [typePathImageWatch])
  const { course, loadCourseAction } = useLoadCourse()
  const { isSuccess, createUnitLessonAction, createUnitLessonImageAction, isLoading } = useCreateUnitLesson()
  const { isShowError } = useValidateRangeDate(
    combineDateAndTime(limitStartDateWatch, limitStartTimeWatch),
    combineDateAndTime(limitEndDateWatch, limitEndTimeWatch),
    !isLimitEndTrue || !isLimitStartTrue
  )

  const onSubmit = async (formData) => {
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
    payload.estimatedStudyTime = estimatedStudyTime.value

    if (typeFileWatch !== OPTIONS_TYPE_LESSON[1].value) {
      const extension = payload.path.substring(payload.path.lastIndexOf('.') + 1, payload.path.length) || payload.path
      payload.type = getFileType(extension)
    }

    if (isWebviewMode) {
      setIsCheckingUploadFileStatusForWebview(true)
      checkUploadFileStatusForWebview({
        t,
        webviewFileId,
        onSuccess: () => {
          createUnitLessonAction({ courseId, payload, t, langCode: getLocalStorage(STORAGE.LANGUAGE), isWebviewMode, history })
          setIsCheckingUploadFileStatusForWebview(false)
        },
        onFailure: () => {
          setIsCheckingUploadFileStatusForWebview(false)
        }
      })
    }
    if (typeFileWatch === OPTIONS_TYPE_LESSON[1].value) {
      if (typePathImageWatch === OPTIONS_PATH_LESSON_IMAGE[1].value) {
        const { code, data } = await uploadFilesAPI({ data: { uploadFilesRequests: payload.path } })
        const ids = data.map((item) => item.id)
        const payloadImageExternal = { ...payload, fileIds: ids, path: 'image', file: '', type: TYPE_FILE.IMAGE }
        if (code === 200) {
          createUnitLessonImageAction({ courseId, data: payloadImageExternal, t, langCode: getLocalStorage(STORAGE.LANGUAGE), isWebviewMode, history })
        }
      }
      if (typeFileWatch === OPTIONS_TYPE_LESSON[1].value && typePathImageWatch === OPTIONS_PATH_LESSON_IMAGE[0].value) {
        const { folderId, fileIds } = JSON.parse(getLocalStorage(STORAGE.UPLOAD_FILE_IMAGE))
        const payloadImageInternal = { ...payload, folderId, path: payload.path, fileIds, type: TYPE_FILE.IMAGE }
        createUnitLessonImageAction({ courseId, data: payloadImageInternal, t, langCode: getLocalStorage(STORAGE.LANGUAGE), isWebviewMode, history })
      }
    }
    if (typeFileWatch === OPTIONS_TYPE_LESSON[0].value) {
      createUnitLessonAction({ courseId, payload, t, langCode: getLocalStorage(STORAGE.LANGUAGE), isWebviewMode, history })
    }
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

  useEffect(() => {
    loadCourseAction({ courseId })
  }, [])

  useEffect(() => {
    if (estimatedStudyTimeWatch.value === 0) {
      setValue('estimatedStudyTime', estimateTimeOption[0])
    }
  }, [t])

  useEffect(() => {
    if (isSuccess) {
      history.push(RoutesName.UNIT_SETTINGS)
    }
  }, [isSuccess])

  useEffect(() => {
    clearErrors()
  }, [language])

  const handleTypePath = useCallback((e) => {
    const { value } = e.target
    setValue('typePath', value)
    setValue('path', '')
    clearErrors('path')
  }, [])

  const handleTypeFile = useCallback((e) => {
    const { value } = e.target
    setValue('typeFile', value)
    setValue('path', '')
    clearErrors('path')
  }, [])

  const handleTypePathImage = useCallback((e) => {
    const { value } = e.target
    setValue('typePathImage', value)
    setValue('path', '')
    clearErrors('path')
  }, [])

  const renderSelectType = () => (
    <Row>
      <FormLabel title={t('create_lecture:type_title')} description="Required" />
      <Right>
        <FormRadio t={t} name="typeFile" options={OPTIONS_TYPE_LESSON} onChange={handleTypeFile} />
      </Right>
    </Row>
  )

  const renderPathDefault = () => (
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
  )

  const renderPathImage = (type) => (
    <Row>
      <FormLabel title={t('create_lecture:path')} description="Required" />
      <Right>
        <FormRadio t={t} name="typePathImage" options={OPTIONS_PATH_LESSON_IMAGE} onChange={handleTypePathImage} />
        {type === OPTIONS_PATH_LESSON_IMAGE[0].value ? (
          <>
            <Link
              to={workspaceid ? `${RoutesName.UPLOAD_FILE_IMAGES}?${QUERY.WORKSPACE_ID}=${workspaceid}` : RoutesName.UPLOAD_FILE_IMAGES}
              className="link_path_s3"
              target="_blank"
              rel="noopener noreferrer"
              disabled={isDisablePathUploadFileImage}
            >
              <FolderOpenOutlined style={{ marginRight: 4 }} />
              {t('create_lecture:upload_or_refer_a_file')}
            </Link>
            <FormInput
              name="path"
              placeholder={t('create_lecture:path_of_page')}
            />
          </>
        ) : (
          <>
            <p>
              {t('common:upload_file_note')}
              <br />
              <Text.primary fontWeight="fw_400" color="red">
                {t('common:upload_file_warn')}
              </Text.primary>
            </p>
            <FormUploadDD
              name="path"
              setIsLeave={setIsLeave}
              isImage
            />
          </>
        ) }

      </Right>
    </Row>
  )

  const renderPath = useCallback(() => {
    if (typeFileWatch === TYPE_FILE.IMAGE) {
      return renderPathImage(typePathImageWatch)
    }
    if (typeFileWatch === TYPE_FILE.DEFAULT) {
      return renderPathDefault()
    }
    return renderPathDefault()
  }, [typeFileWatch, typePathImageWatch, typePathWatch])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('create_lecture:title')}
        backRoute={isWebviewMode ? '/' : workspaceid ? `${RoutesName.UNIT_SETTINGS}?${QUERY.WORKSPACE_ID}=${workspaceid}` : RoutesName.UNIT_SETTINGS}
        backRouteText={isWebviewMode ? '' : t('back_to_unit_setting')}
        active={isWebviewMode}
      />
      <FormWrapper isDisablePathUploadFile={isDisablePathUploadFile}>
        {isWebviewMode
          ? (
            <WebviewForm
              isShowError={isShowError}
              isLoading={isLoading}
              isCheckingUploadFileStatusForWebview={isCheckingUploadFileStatusForWebview}
              form={form}
              course={course}
              onSubmit={handleSubmit(onSubmit)}
              estimatedStudyTimeWatch={estimatedStudyTimeWatch}
              estimateTimeOption={estimateTimeOption}
              isLimitEndTrue={isLimitEndTrue}
              isLimitStartTrue={isLimitStartTrue}
              limitStartDateWatch={limitStartDateWatch}
              limitEndDateWatch={limitEndDateWatch}
              limitStartTimeWatch={limitStartTimeWatch}
              limitEndTimeWatch={limitEndTimeWatch}
              handleOnChangeSelectDateTime={handleOnChangeSelectDateTime}
            />
          )
          : (
            <div className="form-wrapper">
              <FormProvider {...form}>
                <form>
                  <Row>
                    <FormLabel title={t('create_lecture:course_name')} />
                    <Right>
                      <span>{course.courseName ?? <Skeleton.Input active style={{ width: 200 }} />}</span>
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
                  {renderSelectType()}
                  {renderPath()}
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
                      <Button htmlType="button" onClick={() => reset(defaultValues)}>{t('common:clear')}</Button>
                      <PopupButton
                        icon={EditOutlined}
                        titlePopup={t('create_lecture:message.confirm_create')}
                        textButton={t('common:register')}
                        disabled={isLoading || isShowError}
                        onConfirm={handleSubmit(onSubmit)}
                        okText={t('common:register')}
                        cancelText={t('common:cancel')}
                        isLoading={isLoading}
                      />
                    </Space>
                  </div>
                </form>
              </FormProvider>
            </div>
          )}
      </FormWrapper>
    </Wrapper>
  )
}

export default CreateCourseScreen
