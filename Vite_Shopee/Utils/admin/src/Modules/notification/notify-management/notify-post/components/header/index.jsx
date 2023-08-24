import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormEditor, FormLabel, FormInput, FormDatePicker, FormRadio, Text, PopupButton } from 'Components'
import { POST_COURSE_OPTION_TEXT, PUSH_OPTION, OPTION } from 'Constants/notifi'
import { useCreateNotify } from 'Hooks/notification'
import { getText } from 'Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useValidateRangeDate } from 'Hooks/validate_rangedate'
import { FORMAT_TIME } from 'Constants/formatTime'
import { isEmpty } from 'lodash'
import { EditOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useHistories, useRoles } from 'Hooks'
import { Wrapper } from 'Themes/facit'
import ModalTypeUser from '../modalTypeUser'
import CreateCourseShema from './schema'

import { Right, Row, Divider, RightFormDate } from './styled'

const HeaderPost = ({ t }) => {
  const history = useHistories()
  const { isSuperAdmin } = useRoles()
  const [visible, setVisible] = useState(false)
  const form = useForm({
    resolver: yupResolver(CreateCourseShema(t)),
    defaultValues: {
      allUser: OPTION.YES,
      lstUser: [],
      sendNotification: OPTION.NO
    }
  })
  const { formState: { errors }, control, touchedFields, handleSubmit, watch, setValue, reset } = form

  const {
    allUser,
    publicationStart,
    publicationEnd,
    lstUser,
    sendNotification
  } = watch()
  const { isSubmitting, createNotifiAction, listDataUserAll } = useCreateNotify()
  const onSubmit = useCallback((formData) => {
    const { ...data } = formData
    data.text = getText(data.textHtml)
    if (!isEmpty(data.textHtml) && isEmpty(data.text)) {
      data.text = '1'
    }
    data.publicationStart = new Date(data.publicationStart).getTime() || 0
    data.publicationEnd = new Date(data.publicationEnd).getTime() || 0
    data.publicationNotificationEmail = '1'
    data.allUser = data.sendNotification === OPTION.YES ? OPTION.YES : data.allUser
    data.lstUser = (data.allUser === OPTION.YES || data.sendNotification === OPTION.YES)
      ? [] // Handle API 400 ERROR_NEWS_IS_INVALID
      : data.lstUser.map((user) => ({ userId: user.id, companyId: user.companyId }))
    createNotifiAction({ data, history })
  }, [])

  const { isShowError } = useValidateRangeDate(
    publicationStart?.valueOf(),
    publicationEnd?.valueOf(),
    false
  )

  const onCancel = () => {
    setVisible(false)
  }

  const openModal = () => {
    setVisible(true)
  }

  const getValueSelect = (value) => {
    setValue('lstUser', value.selectedRows)
    setVisible(false)
  }

  const handleCancel = useCallback(() => {
    reset({
      allUser: OPTION.YES,
      lstUser: [],
      title: '',
      textHtml: '',
      publicationStart: '',
      publicationEnd: '',
      sendNotification: OPTION.NO
    })
  }, [])

  return (
    <Wrapper>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider
            control={control}
            errors={errors}
            touchedFields={touchedFields}
          >
            <Row>
              <FormLabel title={t('post.create.title')} description="Required" />
              <Right>
                <FormInput name="title" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('post.create.text')} description="Required" />
              <Right>
                <FormEditor t={t} name="textHtml" total={8000} />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('post.create.startTime')} description="Required" />
              <RightFormDate>
                <FormDatePicker t={t} showTime name="publicationStart" format={FORMAT_TIME.DATE_HOUR_MINUTES_SECOND} useDate forceError={isShowError} />
              </RightFormDate>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('post.create.endTime')} description="Optional" />
              <RightFormDate>
                <FormDatePicker t={t} showTime name="publicationEnd" format={FORMAT_TIME.DATE_HOUR_MINUTES_SECOND} useDate forceError={isShowError} />
                {isShowError && (
                  <Text.primary color="error_ant" fontSize="size_14">
                    {t('validate.wrong_limitEndDate')}
                  </Text.primary>
                )}
              </RightFormDate>
            </Row>
            {(isSuperAdmin) && (
              <>
                <Divider />
                <Row>
                  <FormLabel title={t('post.create.push')} description="Required" />
                  <Right>
                    <FormRadio
                      t={t}
                      name="sendNotification"
                      options={PUSH_OPTION}
                    />
                  </Right>
                </Row>
              </>
            )}
            {sendNotification === OPTION.NO && (
              <>
                <Divider />
                <Row>
                  <FormLabel title={t('post.create.radio')} description="Required" />
                  <Right>
                    <FormRadio
                      t={t}
                      name="allUser"
                      options={POST_COURSE_OPTION_TEXT}
                    />
                  </Right>
                </Row>
              </>
            )}
            {(!allUser && !sendNotification) && (
              <>
                <Divider />
                <Row>
                  <FormLabel title={t('post.create.course_name')} description="Required" />
                  <Right>
                    {t('post.create.listUser', { amount: !lstUser[0] ? 0 : lstUser.length })}
                    {/* <ButtonModal onClick={openModal}>
                  {t('post.create.selectRecipients')}
                </ButtonModal> */}
                    <Button
                      size="large"
                      onClick={openModal}
                      style={{ width: 'max-content', marginTop: 10 }}
                    >
                      {t('post.create.selectRecipients')}
                    </Button>
                  </Right>
                </Row>
              </>
            )}
          </FormProvider>
          <div className="form-action-group">
            <Space>
              <Button htmlType="button" onClick={handleCancel}>{t('post.create.clear')}</Button>
              <PopupButton
                icon={EditOutlined}
                titlePopup={t('post.create.warning_submit_message')}
                textButton={t('post.create.publish')}
                onConfirm={handleSubmit(onSubmit)}
                okText="common:create_button"
                disabled={isShowError || !isEmpty(errors)}
                isLoading={isSubmitting}
              />
            </Space>
          </div>
        </form>
      </div>
      <ModalTypeUser
        t={t}
        visible={visible}
        onCancel={onCancel}
        getValueSelect={getValueSelect}
        listDataUserAll={listDataUserAll}
      />
    </Wrapper>
  )
}

export default HeaderPost
