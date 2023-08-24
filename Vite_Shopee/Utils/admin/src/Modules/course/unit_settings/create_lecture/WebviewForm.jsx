/* eslint-disable react/prop-types */
import { EditOutlined } from '@ant-design/icons'
import { Button, Col, Form, Radio, Skeleton, Space } from 'antd'
import { FormDatePicker, FormInput, FormLabel, FormSelect, FormTextArea, FormTimePicker, PopupButton, Text } from 'Components'
import { FORMAT_TIME } from 'Constants/formatTime'
import { useWebview, useWindowDimensions } from 'Hooks'
import moment from 'moment'
import React, { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Divider, Right, Row } from 'Themes/facit'
import { defaultValues } from '.'
import { SpaceWrapper } from './styled'

const WebviewForm = ({
  isShowError,
  isLoading,
  isCheckingUploadFileStatusForWebview,
  form,
  course,
  onSubmit,
  estimatedStudyTimeWatch,
  estimateTimeOption,
  isLimitEndTrue,
  isLimitStartTrue,
  limitStartDateWatch,
  limitEndDateWatch,
  limitStartTimeWatch,
  limitEndTimeWatch,
  handleOnChangeSelectDateTime
}) => {
  const { reset, formState: { errors }, setValue } = form
  const { t } = useTranslation(['create_lecture'])
  const { windowDimensions } = useWindowDimensions()
  const { webviewVideo } = useWebview()

  useEffect(() => {
    if (webviewVideo) {
      setValue('path', webviewVideo.url)
    }
  }, [webviewVideo])

  return (
    <FormProvider {...form} onSubmit={onSubmit}>
      <Form
        name="wrap"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        style={{ backgroundColor: 'white', marginTop: '1rem', marginBottom: '1rem', padding: '1rem', borderRadius: '1rem' }}
      >
        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('create_lecture:course_name')} width={50} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px', marginBottom: '16px' }}>
            <span>{course.courseName ?? <Skeleton.Input active style={{ width: 200 }} />}</span>
          </Right>
        </Col>
        <Divider />

        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('create_lecture:unit')} description="Required" width={50} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px', marginBottom: '16px' }}>
            <FormInput name="unitName" />
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
            >
              <Space direction="vertical">
                <Radio value={0}>
                  <span>{t('create_lecture:do_not_set_start')}</span>
                </Radio>
                <SpaceWrapper align="baseline">
                  <Radio value={1} id="limitstartDateRadio" />
                </SpaceWrapper>
                <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
                  <label width={50} htmlFor="limitstartDateRadio">{t('create_lecture:release_since_start')} {t('common:label_date')}:</label>
                  <Row>
                    <FormDatePicker
                      name="limitStartDate"
                      disabled={!isLimitStartTrue}
                      wrapperStyles={{ marginBottom: 0 }}
                      value={limitStartDateWatch ? moment(limitStartDateWatch) : null}
                      placeholder={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                      getPopupContainer={(trigger) => trigger?.parentElement}
                      hideError
                      widthdatepicker={windowDimensions.width - 100}
                    />
                  </Row>
                  <label htmlFor="limitstartDateRadio">{t('common:label_time')}:</label>
                  <Row style={{ width: '100%' }}>
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
                      widthdatepicker={windowDimensions.width - 100}
                    />
                  </Row>
                  <label htmlFor="limitstartDateRadio">{t('create_lecture:release_since_end')}</label>
                </Col>
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
            >
              <Space direction="vertical">
                <Radio value={0}>
                  <span>
                    <span>{t('create_lecture:do_not_set_end')}</span>
                  </span>
                </Radio>
                <SpaceWrapper align="baseline">
                  <Radio value={1} id="limitendDateRadio" />
                </SpaceWrapper>
                <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
                  <label htmlFor="limitendDateRadio">{t('create_lecture:release_until_start')} {t('common:label_date')}:</label>
                  <Row>
                    <FormDatePicker
                      name="limitEndDate"
                      disabled={!isLimitEndTrue}
                      wrapperStyles={{ marginBottom: 0 }}
                      value={limitEndDateWatch ? moment(limitEndDateWatch) : null}
                      forceError={isShowError}
                      placeholder={FORMAT_TIME.YEAR_MONTH_DATE_LOWER}
                      getPopupContainer={(trigger) => trigger?.parentElement}
                      hideError
                      widthdatepicker={windowDimensions.width - 100}
                    />
                  </Row>
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
                    widthdatepicker={windowDimensions.width - 100}
                  />
                  <label htmlFor="limitendDateRadio">{t('create_lecture:release_until_end')}</label>
                </Col>
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
              isSearchable={false}
            />
          </Right>
        </Col>
        <Text.primary color="error">{t('explain_for_creating_on_webview_mode')}</Text.primary>
        <div className="form-action-group" style={{ paddingTop: '16px' }}>
          <Space>
            <Button htmlType="button" onClick={() => reset(defaultValues)}>{t('common:clear')}</Button>
            <PopupButton
              icon={EditOutlined}
              titlePopup={t('create_lecture:message.confirm_create')}
              textButton={t('common:register')}
              disabled={isLoading || isShowError}
              onConfirm={onSubmit}
              okText={t('common:register')}
              cancelText={t('common:cancel')}
              isLoading={isLoading || isCheckingUploadFileStatusForWebview}
            />
          </Space>
        </div>
      </Form>
    </FormProvider>
  )
}

export default WebviewForm
