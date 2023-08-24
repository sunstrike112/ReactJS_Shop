import { EditOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Space, Spin } from 'antd'
import { FormDatePicker, FormLabel, FormRadio, Title, Text, Table, FormTimePicker } from 'Components'
import { OPTIONAL_OR_REQUIRED_ANSWER_COURSE } from 'Constants/course'
import { FORMAT_TIME } from 'Constants/formatTime'
import { useAuth, useValidateRangeDate, useRegistrationCourses, useGetQuery, useHistories, useWebview } from 'Hooks'
import { useIssuePermission } from 'Hooks/issue_permission'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Divider, Right, Wrapper, Row, Block } from 'Themes/facit'
import { combineDateAndTime } from 'Utils'
import Schema from './schema'
import SelectUsers from './SelectUsers'
import tableColumns from './columnUsersSelected'
import { RoutesName as RoutesNameSideBar } from '../../../../../Components/sideBarWebview/constant'

const MobileMode = () => {
  // Variables
  // Use hooks
  const { t } = useTranslation(['issue_permission'])
  const { metaData } = useAuth()
  const { infoCourse, infoCourseToAssign, saveInfoCourseToAssignAction } = useRegistrationCourses()
  const { roles } = metaData
  const { isLoadingCreate, pagination, listUserSelected, isLoadingListUserSelected, loadListUserSelectedAction } = useIssuePermission()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { isWebviewMode, isPreviewingResultOfWebview } = useWebview()
  const { queryWorkspaceID } = useGetQuery()
  const history = useHistories()
  // End use hooks

  // Use states
  const [listUserIds, setListUserIds] = useState(infoCourseToAssign.usersSelected)
  const [isSelectRecipientOnMobile, setIsSelectRecipientOnMobile] = useState(false)
  // End use states

  const form = useForm({
    resolver: yupResolver(Schema(t))
  })
  const { handleSubmit, watch, setValue, formState: { errors } } = form

  const [
    courseStartDateWatch,
    courseStartTimeWatch,
    courseEndDateWatch,
    courseEndTimeWatch] = watch([
    'course_start_date',
    'course_start_time',
    'course_end_date',
    'course_end_time'])

  const { isShowError } = useValidateRangeDate(
    combineDateAndTime(courseStartDateWatch, courseStartTimeWatch),
    combineDateAndTime(courseEndDateWatch, courseEndTimeWatch)
  )

  // Column table
  const columns = useMemo(
    () => tableColumns({ t }).filter((col) => col.rules.includes(roles?.[0])),
    [t, roles]
  )

  const handleSelectRecipient = useCallback((selected) => {
    setListUserIds((prevListUserIds) => {
      selected.selectedRows.forEach((userSelected, index, self) => {
        prevListUserIds.selectedRows.forEach((userPrev, indexPrev, selfPrev) => {
          if (userSelected.userId === userPrev.userId) {
            self[index] = selfPrev[indexPrev]
          }
        })
      })
      return selected
    })
  }, [])

  const onSubmit = (formData) => {
    const data = {
      required: formData.optional_required,
      listCourseIds: [infoCourse.courseId],
      listUserIds: listUserIds.selectedRows.map((user) => ({ userId: user.userId, isCheckPassword: Boolean(user.isCheckPassword) })),
      usersSelected: listUserIds,
      startTime: combineDateAndTime(formData.course_start_date, formData.course_start_time || '00:00').valueOf(),
      isEnoughData: true
    }
    if (formData.course_end_date) {
      data.endTime = combineDateAndTime(formData.course_end_date, formData.course_end_time || '00:00').valueOf()
    }
    saveInfoCourseToAssignAction(data)
    history.push(RoutesNameSideBar.HOME)
  }

  const setDataInit = useCallback(() => {
    setValue('listCourseIds', infoCourse.courseId && [infoCourse.courseId])
    if (infoCourseToAssign.startTime) {
      setValue('course_start_date', moment(infoCourseToAssign.startTime).format(FORMAT_TIME.YEAR_MONTH_DATE_LOWER))
      setValue('course_start_time', moment(infoCourseToAssign.startTime).format(FORMAT_TIME.HOUR_MINUTES))
    }
    if (infoCourseToAssign.endTime) {
      setValue('course_end_date', moment(infoCourseToAssign.endTime).format(FORMAT_TIME.YEAR_MONTH_DATE_LOWER))
      setValue('course_end_time', moment(infoCourseToAssign.endTime).format(FORMAT_TIME.HOUR_MINUTES))
    }
    setValue('optional_required', infoCourseToAssign.required)
  }, [])

  const handleClearData = useCallback(() => {
    setDataInit()
    setListUserIds(infoCourseToAssign.usersSelected)
  }, [infoCourseToAssign])

  const handleTableChange = (tablePaging) => {
    loadListUserSelectedAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize
      },
      data: listUserIds.selectedRows.map(({ userId, companyId }) => ({ userId, companyId }))
    })
  }

  useEffect(() => {
    setDataInit()
  }, [])

  useEffect(() => {
    loadListUserSelectedAction({
      params: {
        page: 1,
        limit: 10
      },
      data: listUserIds.selectedRows.map(({ userId, companyId }) => ({ userId, companyId }))
    })
  }, [listUserIds.selectedRows])

  if (isSelectRecipientOnMobile) {
    return (
      <SelectUsers
        t={t}
        setIsSelectRecipientOnMobile={setIsSelectRecipientOnMobile}
        handleSelectRecipient={handleSelectRecipient}
        listUserIds={listUserIds}
        roles={roles}
      />
    )
  }

  return (
    <Spin
      spinning={isLoadingCreate}
      size="large"
      wrapperClassName="form-wrapper"
      style={{ width: '100%', height: '100%', marginTop: '25%', display: 'flex' }}
    >
      <Wrapper>
        <Title
          icon={EditOutlined}
          title={t('create.title')}
          backRoute={isWebviewMode && `${RoutesNameSideBar.HOME}${queryWorkspaceID.ONLY}`}
          backRouteText=""
          active={isWebviewMode}
        />
        <div className="form-wrapper">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <FormLabel title={t('common.course_start_date')} description="Required" />
                <Right gap="10px">
                  <FormDatePicker
                    name="course_start_date"
                    format={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                    value={(courseStartDateWatch ? moment(courseStartDateWatch) : null)}
                    hideError
                    placeholder={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                    disabled={isPreviewingResultOfWebview}
                  />
                  <FormTimePicker
                    name="course_start_time"
                    showTime
                    format={FORMAT_TIME.HOUR_MINUTES}
                    value={(courseStartTimeWatch ? moment(courseStartTimeWatch, FORMAT_TIME.HOUR_MINUTES) : null)}
                    placeholder={FORMAT_TIME.HOUR_MINUTES}
                    disabled={isPreviewingResultOfWebview}
                  />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel title={t('common.course_end_date')} description="Optional" />
                <Right gap="10px">
                  <FormDatePicker
                    name="course_end_date"
                    format={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                    placeholder={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                    value={(courseEndDateWatch ? moment(courseEndDateWatch) : null)}
                    forceError={isShowError}
                    hideError
                    disabled={isPreviewingResultOfWebview}
                  />
                  <FormTimePicker
                    name="course_end_time"
                    showTime
                    format={FORMAT_TIME.HOUR_MINUTES}
                    value={(courseEndTimeWatch ? moment(courseEndTimeWatch, FORMAT_TIME.HOUR_MINUTES) : null)}
                    placeholder={FORMAT_TIME.HOUR_MINUTES}
                    forceError={isShowError}
                    hideError
                    disabled={isPreviewingResultOfWebview || !courseEndDateWatch}
                  />
                  {isShowError && (
                  <Text.primary color="error_ant" fontSize="size_14">
                    {t('validation.range_date')}
                  </Text.primary>
                  )}
                </Right>
              </Row>
              <Divider />

              <Row>
                <FormLabel title={t('common.optional_required')} description="Required" />
                <Right>
                  <FormRadio
                    t={t}
                    name="optional_required"
                    options={OPTIONAL_OR_REQUIRED_ANSWER_COURSE}
                    disabled={isPreviewingResultOfWebview}
                  />
                </Right>
              </Row>
              <Divider />

              <Row>
                <FormLabel title={t('common.course')} description="Required" />
                <Right>
                  <Text.primary>{infoCourse.courseName}</Text.primary>
                  {(errors?.listCourseIds?.message)
                  && (
                    <Text.primary color="error_ant" fontSize="size_14">
                        {errors?.listCourseIds?.message}
                    </Text.primary>
                  )}
                </Right>
              </Row>
              <Divider />
              {!isPreviewingResultOfWebview && (
              <div className="form-action-group">
                <Space>
                  <Button htmlType="button" onClick={handleClearData}>{t('common:restore')}</Button>
                  <Button
                    icon={<EditOutlined />}
                    disabled={isLoadingCreate || listUserSelected.length === 0 || isShowError}
                    size="large"
                    onClick={handleSubmit(onSubmit)}
                    type="primary"
                  >
                    {t('common:save')}
                  </Button>
                </Space>
              </div>
              )}

            </form>
          </FormProvider>
        </div>

        <Block>
          <div className="block-head">
            <div className="left">
              <h2>{t('common.recipient_list')}</h2>
            </div>
            <div className="right">
              {!isPreviewingResultOfWebview && (
              <Button
                type="primary"
                size="large"
                onClick={() => setIsSelectRecipientOnMobile(true)}
              >
                {isEmpty(listUserIds.selectedRowKeys) ? t('common.select_recipients') : t('common.reselect_recipients')}
              </Button>
              )}
            </div>
          </div>
          <Table
            locale={{ emptyText: t('common:empty_data') }}
            rowKey={(record) => record.userId}
            dataSource={listUserSelected}
            columns={columns}
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onChange={handleTableChange}
            loading={isLoadingListUserSelected}
            pagination={Boolean(listUserIds.selectedRows.length)}
            isHideDelete
            showButtonCreate={false}
          />
        </Block>
      </Wrapper>
    </Spin>

  )
}

export default MobileMode
