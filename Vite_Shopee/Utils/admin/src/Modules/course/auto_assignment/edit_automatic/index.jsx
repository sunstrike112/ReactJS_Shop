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
  useAuth,
  useEditAssignment, useHistories, useLoadCourseAssignment,
  useLoadTargetAutoAssignment, useQuery, useRoles
} from 'Hooks'
import { useValidateRangeDate } from 'Hooks/validate_rangedate'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Divider, Right, Wrapper } from 'Themes/facit'
import { getLocalStorage, STORAGE } from 'Utils'
import { combineDateAndTimeV2 } from 'Utils/time'
import { SelectCourse } from '../components'
import Schema from './schema'
import { CourseItem, DatePickerGroup, Row } from './styled'

const EditAutomatic = () => {
  const { t } = useTranslation(['auto_assignment_course'])
  const history = useHistories()
  const { assignId } = useParams()
  const { isSuperAdmin } = useRoles()
  const query = useQuery()

  const form = useForm({
    resolver: yupResolver(Schema(t))
  })

  const {
    handleSubmit,
    clearErrors,
    formState: { errors },
    watch,
    setValue
  } = form

  const { loadCourseAssignmentAction } = useLoadCourseAssignment()
  const {
    loadTargetGroupAction,
    loadTargetAttributeAction,
    targetGroup,
    targetAttribute
  } = useLoadTargetAutoAssignment()
  const { loadDetailAssignmentAction, detailAssignment, updateAssignmentAction, isLoadingUpdate } = useEditAssignment()
  const { metaData } = useAuth()
  const { roles } = metaData

  const [course, setCourse] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleSelectCourse, setVisibleSelectCourse] = useState(false)
  const companyId = query.get('companyId')
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
    loadCourseAssignmentAction({ params: { limit: 100, filter: { courseType: 'COMPANY' } } })
    loadTargetGroupAction()
    loadTargetAttributeAction({ params: {} })
    if (isSuperAdmin) {
      loadDetailAssignmentAction({ assignId, companyId })
    } else {
      loadDetailAssignmentAction({ assignId })
    }
  }, [isSuperAdmin])

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

  const handleSetData = () => {
    setValue('assignName', detailAssignment.assignName)
    setValue('isEffective', detailAssignment.isEffective)
    setValue('isAll', detailAssignment.isAll || false)
    setValue('isRequired', detailAssignment.isRequired)
    if (detailAssignment.listDepartments?.length) {
      setValue('targetGroups', detailAssignment.listDepartments.map((item) => (
        { value: item.id, label: item.name }
      )))
    } else {
      setValue('targetGroups', [])
    }
    if (detailAssignment.listAttributes?.length) {
      setValue('targetAttributes', detailAssignment.listAttributes.map((item) => (
        { value: item.id, label: item.name }
      )))
    } else {
      setValue('targetAttributes', [])
    }
    if (detailAssignment.listCourses?.length) {
      setCourse({
        selectedRowKeys: detailAssignment.listCourses.map(({ id }) => id),
        selectedRows: detailAssignment.listCourses.map(({ id, name }) => ({ courseId: id, courseName: name }))
      })
    }
    if (detailAssignment.startTime) {
      setValue('courseStartDate', moment(detailAssignment.startTime))
      setValue('courseStartTime', moment(detailAssignment.startTime))
    } else {
      setValue('courseStartDate', null)
      setValue('courseStartTime', null)
    }
    if (detailAssignment.endTime) {
      setValue('courseEndDate', moment(detailAssignment.endTime))
      setValue('courseEndTime', moment(detailAssignment.endTime))
    } else {
      setValue('courseEndDate', null)
      setValue('courseEndTime', null)
    }
    clearErrors()
  }

  useEffect(() => {
    if (detailAssignment) {
      handleSetData()
    }
  }, [detailAssignment])

  useEffect(() => {
    setValue('startTime', combineDateAndTimeV2(courseStartDate, courseStartTime)?.valueOf())
  }, [courseStartDate, courseStartTime])

  useEffect(() => {
    setValue('endTime', combineDateAndTimeV2(courseEndDate, courseEndTime)?.valueOf())
  }, [courseEndDate, courseEndTime])

  const onSubmit = useCallback((formData) => {
    delete formData.courseStartDate
    delete formData.courseStartTime
    delete formData.courseEndDate
    delete formData.courseEndTime
    const data = {
      assignId,
      assignName: formData.assignName,
      endTime: formData.endTime || 0,
      startTime: formData.startTime,
      isAll: formData.isAll,
      isEffective: formData.isEffective,
      isRequired: formData.isRequired,
      listDepartments: formData.isAll ? [] : formData.targetGroups.map((item) => item.value),
      listAttributes: formData.isAll ? [] : formData.targetAttributes.map((item) => item.value),
      listCourses: course.selectedRows.map((item) => item.courseId)
    }
    updateAssignmentAction({ data, history, langCode: getLocalStorage(STORAGE.LANGUAGE) })
  }, [course])

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

  return (
    <Wrapper>
      <Title icon={EditOutlined} title={t('update_automatic.title')} />
      <div className="form-wrapper">
        <FormProvider {...form}>
          <form>

            <Row>
              <FormLabel
                title={t('auto_assignment_settings')}
                description="Required"
              />
              <Right>
                <FormInput name="assignName" readOnly={isSuperAdmin} />
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
                    forceError={isShowError}
                    format={FORMAT_TIME.YEAR_MONTH_DATE}
                    useDate
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
                {course.selectedRows?.map((item, index) => (
                  <Fragment key={index}>
                    <CourseItem>
                      {item.courseName}
                      <Button
                        icon={<ClearOutlined />}
                        size="large"
                        danger
                        onClick={() => handleDeleteCourse(item.courseId)}
                        disabled={isSuperAdmin}
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
                    disabled={isSuperAdmin}
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
                <Button
                  htmlType="button"
                  onClick={() => handleSetData()}
                >
                  {t('common:reset')}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit(onSubmit)}
                  size="large"
                  disabled={isShowError || !isEmpty(errors) || isSuperAdmin}
                  loading={isLoadingUpdate}
                  icon={<EditOutlined />}
                >
                  {t('common:ok')}
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
          </form>
        </FormProvider>
      </div>
    </Wrapper>
  )
}

export default EditAutomatic
