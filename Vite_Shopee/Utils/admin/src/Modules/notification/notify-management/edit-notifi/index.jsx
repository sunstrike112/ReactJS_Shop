import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormEditor, FormLabel, FormInput, FormDatePicker, FormRadio, Title, Text, PopupButton } from 'Components'
import { POST_COURSE_OPTION_TEXT, PUSH_OPTION, OPTION } from 'Constants/notifi'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { FORMAT_TIME } from 'Constants/formatTime'
import { getText } from 'Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useValidateRangeDate } from 'Hooks/validate_rangedate'
import { useCreateNotify } from 'Hooks/notification'
import { EditOutlined, NotificationOutlined } from '@ant-design/icons'
import { useHistories, useRoles } from 'Hooks'
import { Wrapper } from 'Themes/facit'
import { Button } from 'antd'
import ModalTypeUser from '../notify-post/components/modalTypeUser/index'
import CreateCourseShema from './schema'
import { ListButton, Right, Row, Divider, RightFormDate } from './styled'

const EditNotifi = () => {
  const { id: newId } = useParams()
  const { isSuperAdmin } = useRoles()
  const history = useHistories()
  const { t, i18n: { language } } = useTranslation(['notification'])
  const { isSubmitting, notifi, getNotifiAction, editNotifiAction, listDataUserAll } = useCreateNotify()
  const [visible, setVisible] = useState(false)
  const form = useForm({
    resolver: yupResolver(CreateCourseShema(t)),
    defaultValues: {
      allUser: OPTION.YES,
      userList: [],
      modifiedUserId: OPTION.NO
    }
  })

  const { formState: { errors }, control, touchedFields, handleSubmit, watch, clearErrors, setValue } = form
  const {
    allUser,
    userList,
    publicationStart,
    publicationEnd,
    sendNotification
  } = watch()

  const onSubmit = useCallback((formData) => {
    const { ...data } = formData
    data.newsText = getText(data.newsTextHtml)
    data.publicationStart = new Date(data.publicationStart).getTime() || ''
    data.publicationEnd = new Date(data.publicationEnd).getTime() || ''
    data.newsId = newId
    data.allUser = data.sendNotification === OPTION.YES ? OPTION.YES : data.allUser
    data.userList = (data.allUser === OPTION.YES || data.sendNotification === OPTION.YES)
      ? [] // Handle API 400 ERROR_NEWS_IS_INVALID
      : data.userList.map((ele) => ({ userId: ele.id, companyId: ele.companyId }))
    editNotifiAction({ data, history })
  }, [])

  const onCancel = () => {
    setVisible(false)
  }

  const { isShowError } = useValidateRangeDate(
    publicationStart?.valueOf(),
    publicationEnd?.valueOf(),
    false
  )

  const openModal = () => {
    setVisible(true)
  }

  const getValueSelect = (value) => {
    setValue('userList', value.selectedRows)
    setVisible(false)
  }
  useEffect(() => {
    getNotifiAction({ newId })
  }, [])

  useEffect(() => {
    clearErrors()
  }, [language])

  useEffect(() => {
    if (notifi) {
      setValue('newsTitle', notifi.newsTitle || '')
      setValue('newsTextHtml', notifi.newsTextHtml || '')
      setValue('publicationStart', moment(notifi.publicationStart))
      setValue('publicationEnd', notifi.publicationEnd === 0 ? '' : moment(notifi.publicationEnd))
      setValue('allUser', notifi.forAllUser)
      setValue('sendNotification', notifi.sendNotification)
      if (notifi.userList) {
        setValue('userList', notifi.userList.result)
      }
    }
  }, [notifi])

  return (
    <Wrapper>
      <Title icon={NotificationOutlined} title={t('post.edit_the_new')} />
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
                <FormInput name="newsTitle" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('post.create.text')} description="Required" />
              <Right>
                <FormEditor t={t} name="newsTextHtml" total={8000} />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('post.create.startTime')} description="Required" />
              <RightFormDate>
                <FormDatePicker t={t} showTime useDate name="publicationStart" format={FORMAT_TIME.DATE_HOUR_MINUTES_SECOND} />
              </RightFormDate>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('post.create.endTime')} description="Optional" />
              <RightFormDate>
                <FormDatePicker t={t} showTime useDate name="publicationEnd" format={FORMAT_TIME.DATE_HOUR_MINUTES_SECOND} />
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
                  {t('post.create.listUser', { amount: (userList && userList.length) || 0 })}
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
          <ListButton>
            <PopupButton
              icon={EditOutlined}
              titlePopup={t('post.create.warning_edit_message')}
              textButton={t('post.create.change')}
              onConfirm={handleSubmit(onSubmit)}
              okText={t('common:change')}
              cancelText={t('common:cancel')}
              disabled={isShowError || !isEmpty(errors)}
              isLoading={isSubmitting}
            />
          </ListButton>
        </form>
        <ModalTypeUser
          t={t}
          visible={visible}
          onCancel={onCancel}
          getValueSelect={getValueSelect}
          lstUser={userList}
          listDataUserAll={listDataUserAll}
        />
      </div>
    </Wrapper>
  )
}

export default EditNotifi
