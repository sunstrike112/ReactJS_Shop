/* eslint-disable react/prop-types */
import { ClearOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, notification, Space } from 'antd'
import {
  FormDatePicker, FormInput, FormLabel,
  FormRadio, FormTimePicker,
  FormTreeSelect,
  Text, Title
} from 'Components'
import { USER_ROLE } from 'Constants/auth'
import {
  OPTIONAL_OR_REQUIRED_COURSE,
  STATUS,
  TARGET_RANGE
} from 'Constants/course'
import { FORMAT_TIME } from 'Constants/formatTime'
import {
  useAuth, useCreateAssignment, useHistories, useLoadCourseAssignment,
  useLoadTargetAutoAssignment
} from 'Hooks'
import { useValidateRangeDate } from 'Hooks/validate_rangedate'
import { isEmpty } from 'lodash'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Divider, Right, Wrapper } from 'Themes/facit'
import { getLocalStorage, STORAGE } from 'Utils'
import { combineDateAndTimeV2 } from 'Utils/time'
import { SelectCourse } from '../components'
import Schema from './schema'
import { CourseItem, DatePickerGroup, Row } from './styled'

const DEFAULT_VALUE = {
  assignName: '',
  isEffective: true,
  isAll: TARGET_RANGE[0].value,
  isRequired: false,
  targetGroups: [],
  targetAttributes: [],
  courseSelect: []
}

const CreateAutomatic = () => {
  const { t } = useTranslation(['auto_assignment_course'])
  const history = useHistories()

  const form = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(Schema(t))
  })

  const {
    handleSubmit,
    clearErrors,
    formState: { errors },
    watch,
    setValue,
    reset
  } = form

  const { loadCourseAssignmentAction } = useLoadCourseAssignment()
  const { createAssignmentAction, isLoadingCreate } = useCreateAssignment()
  const {
    loadTargetGroupAction,
    loadTargetAttributeAction,
    targetGroup,
    targetAttribute
  } = useLoadTargetAutoAssignment()
  const { metaData } = useAuth()
  const { roles } = metaData

  const [course, setCourse] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleSelectCourse, setVisibleSelectCourse] = useState(false)

  const [
    courseStartDate,
    courseStartTime,
    courseEndDate,
    courseEndTime,
    isAll,
    courseSelect,
    targetGroups,
    targetAttributes
  ] = watch([
    'courseStartDate',
    'courseStartTime',
    'courseEndDate',
    'courseEndTime',
    'isAll',
    'courseSelect',
    'targetGroups',
    'targetAttributes'
  ])

  const { isShowError } = useValidateRangeDate(
    combineDateAndTimeV2(courseStartDate, courseStartTime)?.valueOf(),
    combineDateAndTimeV2(courseEndDate, courseEndTime)?.valueOf(),
    false
  )

  useEffect(() => {
    setValue('startTime', combineDateAndTimeV2(courseStartDate, courseStartTime)?.valueOf())
  }, [courseStartDate, courseStartTime])

  useEffect(() => {
    setValue('endTime', combineDateAndTimeV2(courseEndDate, courseEndTime)?.valueOf())
  }, [courseEndDate, courseEndTime])

  useEffect(() => {
    loadCourseAssignmentAction({ params: { limit: 100, filter: { courseType: 'COMPANY' } } })
    loadTargetGroupAction()
    loadTargetAttributeAction({ params: {} })
  }, [])

  useEffect(() => {
    if ((targetGroups && targetGroups.length > 0) || (targetAttributes && targetAttributes.length > 0)) {
      clearErrors(['targetAttributes', 'targetGroups'])
      setValue('clearValidateTarget', true)
    } else {
      setValue('clearValidateTarget', false)
    }
  }, [targetGroups, targetAttributes])

  useEffect(() => {
    if (isAll) {
      clearErrors(['targetAttributes', 'targetGroups'])
    }
  }, [isAll])

  useEffect(() => {
    if (courseSelect?.length) {
      clearErrors('courseSelect')
    }
  }, [courseSelect])

  useEffect(() => {
    if (course && course.selectedRows) {
      setValue('courseSelect', course.selectedRows)
    }
  }, [course])

  useEffect(() => {
    clearErrors()
  }, [t])

  const onSubmit = (formData) => {
    delete formData.courseStartDate
    delete formData.courseStartTime
    delete formData.courseEndDate
    delete formData.courseEndTime
    const data = {
      assignName: formData.assignName,
      endTime: formData.endTime || 0,
      startTime: formData.startTime,
      isAll: formData.isAll,
      isEffective: formData.isEffective,
      isRequired: formData.isRequired,
      listAttributes: formData.targetAttributes.map((item) => item.value),
      listDepartments: formData.targetGroups.map((item) => item.value),
      listCourses: course.selectedRows.map((item) => item.courseId)
    }
    createAssignmentAction({ data, history, langCode: getLocalStorage(STORAGE.LANGUAGE) })
  }

  const handleDeleteCourse = useCallback((courseId) => {
    if (course.selectedRows.length > 1) {
      const selectedRows = [...course.selectedRows].filter((item) => item.courseId !== courseId)
      const selectedRowKeys = [...course.selectedRowKeys].filter((item) => item !== courseId)
      setCourse({ selectedRowKeys, selectedRows })
    } else {
      notification.error({
        message: t('common:error'),
        description: t('create_automatic.reject_delete_course'),
        duration: 2
      })
    }
  }, [course])

  const handleResetData = () => {
    reset()
    setCourse({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  return (
    <Wrapper>
      <Title icon={EditOutlined} title={t('create_automatic.title')} />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Row>
              <FormLabel
                title={t('auto_assignment_settings')}
                description="Required"
              />
              <Right>
                <FormInput name="assignName" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('status')} description="Required" />
              <Right>
                <FormRadio t={t} name="isEffective" options={STATUS} />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('target_range')}
                description="Required"
              />
              <Right>
                <FormRadio t={t} name="isAll" options={TARGET_RANGE} />
              </Right>
            </Row>
            <Divider />
            {([USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(roles[0])) && !isAll
              ? (
                <>
                  <Row>
                    <FormLabel
                      title={t('target_group')}
                      description={
                        targetAttributes?.length && !targetGroups?.length
                          ? 'Optional' : 'Required'
                      }
                    />
                    <Right>
                      <FormTreeSelect
                        t={t}
                        name="targetGroups"
                        valueKey="departmentId"
                        labelKey="name"
                        options={targetGroup}
                        multiple
                        placeholder=""
                      />
                    </Right>
                  </Row>
                  <Divider />
                  <Row>
                    <FormLabel
                      title={t('target_attribute')}
                      description={
                        targetGroups?.length && !targetAttributes?.length
                          ? 'Optional' : 'Required'
                      }
                    />
                    <Right>
                      <FormTreeSelect
                        t={t}
                        name="targetAttributes"
                        valueKey="attributeId"
                        labelKey="attributeName"
                        options={targetAttribute}
                        multiple
                        placeholder=""
                      />
                    </Right>
                  </Row>
                  <Divider />
                </>
              )
              : ''}
            <Row>
              <FormLabel
                title={t('course_start_time')}
                description="Required"
              />
              <Right className="form__date">
                <DatePickerGroup>
                  <FormDatePicker
                    name="courseStartDate"
                    label={t('common:date')}
                    wrapperProps={{
                      labelCol: { span: 6 },
                      labelAlign: 'right'
                    }}
                    format={FORMAT_TIME.YEAR_MONTH_DATE}
                    useDate
                    placeholder={null}
                  />
                  <FormTimePicker
                    name="courseStartTime"
                    label={t('common:time')}
                    inputwidth={50}
                    wrapperProps={{
                      labelCol: { span: 6 },
                      labelAlign: 'right'
                    }}
                    format={FORMAT_TIME.HOUR_MINUTES}
                    useDate
                    placeholder={null}
                  />
                </DatePickerGroup>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('course_end_time')}
                description="Optional"
              />
              <Right className="form__date">
                <DatePickerGroup>
                  <FormDatePicker
                    name="courseEndDate"
                    label={t('common:date')}
                    wrapperProps={{
                      labelCol: { span: 6 },
                      labelAlign: 'right'
                    }}
                    format={FORMAT_TIME.YEAR_MONTH_DATE}
                    useDate
                    forceError={isShowError}
                    placeholder={null}
                  />
                  <FormTimePicker
                    name="courseEndTime"
                    label={t('common:time')}
                    inputwidth={50}
                    wrapperProps={{
                      labelCol: { span: 6 },
                      labelAlign: 'right'
                    }}
                    format={FORMAT_TIME.HOUR_MINUTES}
                    useDate
                    forceError={isShowError}
                    placeholder={null}
                  />
                </DatePickerGroup>
                {isShowError && (
                  <Text.primary color="error_ant" fontSize="size_14">
                    {t('unit_setting:validate.wrong_limitEndDate')}
                  </Text.primary>
                )}
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('required_course')}
                description="Required"
              />
              <Right>
                <FormRadio
                  t={t}
                  name="isRequired"
                  options={OPTIONAL_OR_REQUIRED_COURSE}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('common:course')}
                description="Required"
              />
              <Right>
                {errors?.courseSelect && (
                  <Text.primary color="error_ant" fontSize="size_14">
                    {errors.courseSelect.message}
                  </Text.primary>
                )}
                {course.selectedRows?.map(({ courseId, courseName }, index) => (
                  <Fragment key={index}>
                    <CourseItem>
                      {courseName}
                      <Button
                        icon={<ClearOutlined />}
                        size="large"
                        danger
                        onClick={() => handleDeleteCourse(courseId)}
                      >
                        <span>{t('common:delete')}</span>
                      </Button>
                    </CourseItem>
                    <Divider style={{ marginBottom: index === course.selectedRows.length - 1 && '10px' }} />
                  </Fragment>
                ))}
                <Space style={{ justifyContent: 'flex-end' }}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => setVisibleSelectCourse(true)}
                  >
                    <span>{t('common:add')}</span>
                  </Button>
                </Space>
              </Right>
            </Row>
            <Divider />
            <div className="form-action-group">
              <Space>
                <Button htmlType="button" onClick={handleResetData}>{t('common:clear')}</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit(onSubmit)}
                  size="large"
                  disabled={isShowError || !isEmpty(errors)}
                  icon={<EditOutlined />}
                  loading={isLoadingCreate}
                >
                  {t('common:button_setup')}
                </Button>
              </Space>
            </div>
            {visibleSelectCourse && (
              <SelectCourse
                t={t}
                visible={visibleSelectCourse}
                setVisible={setVisibleSelectCourse}
                setCourse={setCourse}
                course={course}
              />
            )}
          </FormProvider>
        </form>
      </div>
    </Wrapper>
  )
}

export default CreateAutomatic
