/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { EditOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'antd'
import { range } from 'lodash'

import {
  FormDatePicker,
  FormEditor,
  FormInput,
  FormLabel,
  FormRadio,
  FormUploadImage,
  FormSelect,
  Text,
  Title
} from 'Components'
import { PUBLISH_COURSE_OPTION_SEMINAR } from 'Constants/course'
import { FORMAT_TIME } from 'Constants/formatTime'
import { USER_ROLE } from 'Constants/auth'
import {
  useEditCompanySeminar,
  useValidateRangeDate,
  useRoles,
  useLoadCompanyAll,
  useHistories
} from 'Hooks'
import moment from 'moment'
import React, { useEffect, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Divider, Right, Wrapper } from 'Themes/facit'
import { getFileFromS3 } from 'Utils'
import createSeminarSchemma from './schema'
import { Row } from './styled'

const SeminarCreateScreen = () => {
  const { t, i18n: { language } } = useTranslation(['company_seminar'])
  const { seminarId } = useParams()
  const history = useHistories()

  const { isUpdating, editSeminarAction, loadDetailSeminarAction, seminar } = useEditCompanySeminar()
  const { isSuperAdmin, isAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll({ params: { flagRegister: false } })
  const { idOfNissokenCompany, companyOptionsExceptSelectAll } = companyAll

  const form = useForm({
    resolver: yupResolver(createSeminarSchemma(t)),
    defaultValues: {
      title: '',
      description: '',
      link: '',
      password: '',
      startTime: '',
      endTime: '',
      imagePath: '',
      publicSetting: PUBLISH_COURSE_OPTION_SEMINAR[0].value
    },
    mode: 'onChange'
  })

  const { handleSubmit, clearErrors, watch, setValue } = form

  const [startTimeWatch, endTimeWatch] = watch(['startTime', 'endTime'])
  const { isShowError } = useValidateRangeDate(
    startTimeWatch ? new Date(startTimeWatch).valueOf() : '',
    endTimeWatch ? new Date(endTimeWatch).valueOf() : ''
  )

  const onSubmit = useCallback((formData) => {
    const data = {
      ...formData,
      seminarId,
      companyId: formData?.companyId?.value,
      idOfNissokenCompany,
      isAdmin,
      isSuperAdmin
    }

    if (data.file) delete data.file
    if (formData.startTime) {
      data.startTime = moment(formData.startTime, FORMAT_TIME.DATE_HOUR_MINUTES).valueOf()
    }
    if (formData.endTime) {
      data.endTime = moment(formData.endTime, FORMAT_TIME.DATE_HOUR_MINUTES).valueOf()
    }
    editSeminarAction({ data, history })
  }, [])

  const handleSetDefaultValue = () => {
    setValue('title', seminar?.seminarTitle || '')
    setValue('description', seminar?.description || '')
    setValue('link', seminar?.link || '')
    setValue('password', seminar?.password || '')
    setValue('companyId', { label: seminar?.companyName, value: seminar?.companyId } || {})
    if (seminar?.startTime) {
      setValue('startTime', moment(seminar.startTime).format(FORMAT_TIME.DATE_HOUR_MINUTES))
    }
    if (seminar?.endTime) {
      setValue('endTime', moment(seminar.endTime).format(FORMAT_TIME.DATE_HOUR_MINUTES))
    }
    if (seminar?.imagePath) {
      setValue('imagePath', getFileFromS3(seminar.imagePath))
    }
    if (seminar?.publicSetting) {
      setValue('publicSetting', seminar?.publicSetting)
    }
  }

  const disabledDate = (current) => current && current < moment().startOf('day')
  const disabledStartTime = (current) => {
    const now = moment()
    const h = now.hours()
    const m = now.minutes()
    if (current && current > moment().endOf('day')) {
      return {
        disabledHours: () => range(null),
        disabledMinutes: () => range(null)
      }
    }
    if (current && current > moment().endOf('hour')) {
      return {
        disabledHours: () => range(h),
        disabledMinutes: () => range(null)
      }
    }
    return {
      disabledHours: () => range(h),
      disabledMinutes: () => range(m + 1)
    }
  }

  const disabledEndTime = (current) => {
    const now = moment()
    const h = now.hours()
    const m = now.minutes()
    if (current && current > moment().endOf('day')) {
      return {
        disabledHours: () => range(null),
        disabledMinutes: () => range(null)
      }
    }
    return {
      disabledHours: () => range(h),
      disabledMinutes: () => range(null)
    }
  }

  useEffect(() => {
    clearErrors()
  }, [language])

  useEffect(() => {
    loadDetailSeminarAction({ seminarId })
  }, [seminarId])

  useEffect(() => {
    if (seminar) {
      handleSetDefaultValue()
    }
  }, [seminar])

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
              <FormLabel title={t('common.seminar_title_input')} description="Required" />
              <Right>
                <FormInput name="title" />
              </Right>
            </Row>

            <Divider />

            <Row>
              <FormLabel title={t('common.description')} description="Optional" />
              <Right>
                <FormEditor t={t} name="description" total={250} />
              </Right>
            </Row>

            <Divider />

            <Row>
              <FormLabel title={t('common.live_link')} description="Required" />
              <Right>
                <FormInput name="link" />
              </Right>
            </Row>

            <Divider />

            <Row>
              <FormLabel title={t('common.live_password')} description="Optional" />
              <Right>
                <FormInput name="password" type="password" maxLength={50} />
              </Right>
            </Row>

            {(isSuperAdmin || isAdmin) && (
              <>
                <Divider />
                <Row>
                  <FormLabel title={t('user:management.company_name')} description="Required" />
                  <Right>
                    <FormSelect
                      t={t}
                      name="companyId"
                      options={companyOptionsExceptSelectAll}
                      isClearable={false}
                    />
                  </Right>
                </Row>
              </>
            )}

            <Divider />

            <Row>
              <FormLabel title={t('common.start_date')} description="Required" />
              <Right>
                <FormDatePicker
                  name="startTime"
                  wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                  format={FORMAT_TIME.DATE_HOUR_MINUTES}
                  value={startTimeWatch ? moment(startTimeWatch, FORMAT_TIME.DATE_HOUR_MINUTES) : null}
                  placeholder={FORMAT_TIME.DATE_HOUR_MINUTES}
                  showTime
                  disabledDate={disabledDate}
                  disabledTime={disabledStartTime}
                />
              </Right>
            </Row>

            <Divider />

            <Row>
              <FormLabel title={t('common.end_date')} description="Required" />
              <Right>
                <FormDatePicker
                  name="endTime"
                  wrapperStyles={{ marginBottom: 0, marginLeft: 3 }}
                  format={FORMAT_TIME.DATE_HOUR_MINUTES}
                  value={endTimeWatch ? moment(endTimeWatch, FORMAT_TIME.DATE_HOUR_MINUTES) : null}
                  placeholder={FORMAT_TIME.DATE_HOUR_MINUTES}
                  showTime
                  disabledDate={disabledDate}
                  disabledTime={disabledEndTime}
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

            <Divider />

            <Row>
              <FormLabel title={t('common.photo_setting')} description="Optional" />
              <Right>
                <FormUploadImage t={t} name="imagePath" />
                <p>
                  {t('common:require_image_size_and_type', {
                    imgSize: '10MB',
                    imgType: '(jpg, gif, png)'
                  })}
                  <br />
                  {t('common:require_image_resolution', {
                    imgWidth: '300px',
                    imgHeight: '200px'
                  })}
                </p>
              </Right>
            </Row>

            <Divider />

            <Row>
              <FormLabel title={t('common.public_setting')} description="Required" />
              <Right>
                <FormRadio
                  t={t}
                  name="publicSetting"
                  options={PUBLISH_COURSE_OPTION_SEMINAR}
                />
              </Right>
            </Row>

            <Divider />

            <div className="form-action-group">
              <Button
                type="primary"
                htmlType="submit"
                disabled={isUpdating || isShowError || ((isSuperAdmin || isAdmin) && ([USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(seminar?.created)))}
                icon={<EditOutlined />}
                loading={isUpdating}
              >
                {t('common:edit_options.change')}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Wrapper>
  )
}

export default SeminarCreateScreen
