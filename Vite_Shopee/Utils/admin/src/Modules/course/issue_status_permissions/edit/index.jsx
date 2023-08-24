/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { EditOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Radio, Row, Space } from 'antd'
import {
  FormCheckbox,
  FormDatePicker, FormLabel, FormRadio, PopupButton, Table, Text, Title
} from 'Components'
import { ANTD_ORDER_TO_API_FIELD } from 'Constants'
import { OPTIONAL_OR_REQUIRED_ANSWER_COURSE, REQUEST_PASSWORD_OPTIONS } from 'Constants/course'
import { FORMAT_TIME } from 'Constants/formatTime'
import { useAuth, useHistories, useUpdateIssuePermission, useValidateRangeDate } from 'Hooks'
import { useQuery } from 'Hooks/useQuery'
import { snakeCase } from 'lodash'
import { RoutesName } from 'Modules/course/routes'
import moment from 'moment'
import React, { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Divider, Right, Wrapper, Block } from 'Themes/facit'
import { SORT_BY_FIELD, SORT_BY_TYPE } from './constants'
import tableColumns from './column'
import EditSchema from './schema'

const IssuePermissionScreen = () => {
  const { t } = useTranslation(['issue_permission'])
  const history = useHistories()

  const query = useQuery()
  const listIdsEnrollment = query.get('listIdsEnrollment')

  const {
    updateIssuerPermissionAction,
    loadListUpdateIssuePermissionAction,
    listUpdate,
    pagination,
    filter,
    isLoadingEdit,
    isLoadingListUpdate
  } = useUpdateIssuePermission()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { sortField, sortType } = filter

  const { metaData } = useAuth()
  const { roles } = metaData

  const form = useForm({
    resolver: yupResolver(EditSchema(t)),
    defaultValues: {
      isLimitStartTrue: 0,
      isLimitEndTrue: 0
    }
  })
  const { handleSubmit, watch, setValue, clearErrors, reset } = form

  const [
    isLimitStartTrue,
    isLimitEndTrue,
    courseStartDateWatch,
    courseEndDateWatch
  ] = watch(
    [
      'isLimitStartTrue',
      'isLimitEndTrue',
      'course_start_date',
      'course_end_date'
    ]
  )
  const { isShowError } = useValidateRangeDate(
    courseStartDateWatch ? new Date(courseStartDateWatch).valueOf() : '',
    courseEndDateWatch ? new Date(courseEndDateWatch).valueOf() : '',
    !isLimitEndTrue || !isLimitStartTrue
  )

  const columns = useMemo(
    () => tableColumns({ t, history, pagination }).filter((col) => col.rules.includes(roles?.[0])),
    [t, history, pagination, roles]
  )

  const handleTableChange = (tablePaging, _, tableSorter) => {
    loadListUpdateIssuePermissionAction({
      params: {
        ...filter,
        page: tablePaging.current || currentPage,
        limit: tablePaging.pageSize || pageSize,
        sortField: !Object.keys(tablePaging).length
          ? SORT_BY_FIELD[tableSorter.column?.key] : sortField,
        sortType: !Object.keys(tablePaging).length
          ? SORT_BY_TYPE[tableSorter?.order] : sortType
      }
    })
  }

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

  const onSubmit = (formData) => {
    const data = {
      listUserCourseId: JSON.parse(listIdsEnrollment)
    }
    data.isCheckPassword = formData.isCheckPassword
    if (formData.isLimitStartTrue) {
      data.startTime = moment(formData.course_start_date, FORMAT_TIME.DATE_HOUR_MINUTES).valueOf()
      data.isChangeStartTime = true
    } else {
      data.isChangeStartTime = false
    }
    if (formData.isLimitEndTrue) {
      if (formData.course_end_date) {
        data.endTime = moment(formData.course_end_date, FORMAT_TIME.DATE_HOUR_MINUTES).valueOf()
      } else {
        data.endTime = null
      }
      data.isChangeEndTime = true
    } else {
      data.isChangeEndTime = false
    }
    if (typeof formData.optional_required === 'boolean') {
      data.required = formData.optional_required
    } else {
      data.required = null
    }

    updateIssuerPermissionAction({ data, history })
  }

  useEffect(() => {
    if (listIdsEnrollment) {
      loadListUpdateIssuePermissionAction({
        params: {
          page: 1,
          limit: 100,
          ids: JSON.parse(listIdsEnrollment)
        }
      })
    } else {
      history.push(RoutesName.ISSUE_STATUS_PERMISSION)
    }
  }, [listIdsEnrollment])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('edit.title')}
      />
      <div className="form-wrapper">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormLabel title={t('common.change_opening_datetime')} description="Required" />
              <Right>
                <Radio.Group
                  onChange={(e) => handleOnChangeSelectDateTime(e, 'isLimitStartTrue')}
                  value={isLimitStartTrue}
                >
                  <Radio value={1}>
                    <span>{t('common.change')}</span>
                  </Radio>
                  <Radio value={0}>
                    <span>{t('common.not_change')}</span>
                  </Radio>
                </Radio.Group>
              </Right>
            </Row>

            {!!isLimitStartTrue && (
              <>
                <Divider />

                <Row>
                  <FormLabel title={t('common.course_start_date')} description="Required" />
                  <Right>
                    <FormDatePicker
                      name="course_start_date"
                      showTime={{ format: FORMAT_TIME.HOUR_MINUTES_LOWER }}
                      format={FORMAT_TIME.FULL_DATE}
                      placeholder={FORMAT_TIME.FULL_DATE}
                      value={(courseStartDateWatch ? moment(courseStartDateWatch, FORMAT_TIME.FULL_DATE) : null)}
                    />
                  </Right>
                </Row>
              </>
            )}

            <Divider />

            <Row>
              <FormLabel title={t('common.change_closing_datetime')} description="Required" />
              <Right>
                <Radio.Group
                  onChange={(e) => handleOnChangeSelectDateTime(e, 'isLimitEndTrue')}
                  value={isLimitEndTrue}
                >
                  <Radio value={1}>
                    <span>{t('common.change')}</span>
                  </Radio>
                  <Radio value={0}>
                    <span>{t('common.not_change')}</span>
                  </Radio>
                </Radio.Group>
              </Right>
            </Row>

            {!!isLimitEndTrue && (
              <>
                <Divider />

                <Row>
                  <FormLabel title={t('common.course_end_date')} description="Optional" />
                  <Right>
                    <FormDatePicker
                      name="course_end_date"
                      showTime={{ format: FORMAT_TIME.HOUR_MINUTES_LOWER }}
                      format={FORMAT_TIME.FULL_DATE}
                      placeholder={FORMAT_TIME.FULL_DATE}
                      forceError={isShowError}
                      value={(courseEndDateWatch ? moment(courseEndDateWatch, FORMAT_TIME.FULL_DATE) : null)}
                    />
                    {
                      isShowError && (
                        <Text.primary color="error_ant" fontSize="size_14">
                          {t('validation.range_date')}
                        </Text.primary>
                      )
                    }
                  </Right>
                </Row>
              </>
            )}
            <Divider />

            <Row>
              <FormLabel title={t('common.optional_required')} description="Optional" />
              <Right>
                <FormRadio
                  t={t}
                  name="optional_required"
                  options={OPTIONAL_OR_REQUIRED_ANSWER_COURSE}
                  defaultValue={null}
                />
              </Right>
            </Row>

            <Divider />

            <Row>
              <FormLabel title={t('common.request_password')} description="Optional" />
              <Right>
                <FormRadio
                  t={t}
                  name="isCheckPassword"
                  options={REQUEST_PASSWORD_OPTIONS}
                  defaultValue={null}
                />
              </Right>
            </Row>

            <div className="form-action-group">
              <Space>
                <Button htmlType="button" onClick={() => reset()}>{t('common:clear')}</Button>
                <PopupButton
                  icon={EditOutlined}
                  titlePopup={t('edit.confirm')}
                  textButton={t('common:change')}
                  disabled={isLoadingEdit || isShowError}
                  okText={t('common.change')}
                  cancelText={t('common:cancel')}
                  onConfirm={handleSubmit(onSubmit)}
                />
              </Space>
            </div>
          </form>
        </FormProvider>
      </div>
      <Block>
        <Table
          locale={{
            emptyText: t('common:empty_data'),
            triggerDesc: t('common:sort_desc'),
            triggerAsc: t('common:sort_asc'),
            cancelSort: t('common:sort_cancel')
          }}
          rowKey={(record) => record.id}
          dataSource={listUpdate}
          columns={columns}
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onChange={handleTableChange}
          loading={isLoadingListUpdate}
          isHideDelete
        />
      </Block>
    </Wrapper>
  )
}

export default IssuePermissionScreen
