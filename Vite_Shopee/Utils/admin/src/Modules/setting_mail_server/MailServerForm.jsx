/* eslint-disable react/prop-types */
import { EditOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Space } from 'antd'
import { FormInput, FormInputNumber, FormLabel, PopupButton } from 'Components'
import React, { memo, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Divider, Right, Row } from 'Themes/facit'
import Schema from './schema'

const MailServerForm = ({
  t,
  setIsEdit,
  emailServer,
  updateEmailServerAction,
  isUpdating,
  profile
}) => {
  const form = useForm({
    resolver: yupResolver(Schema(t))
  })

  const { handleSubmit, clearErrors, setValue } = form

  const handleHideEdit = () => {
    setIsEdit(false)
  }

  const onSubmit = (formData) => {
    updateEmailServerAction({
      data: { ...formData, port: formData.port.toString() },
      userId: profile.userId,
      companyId: profile.companyId,
      handleHideEdit
    })
  }

  const setInitData = () => {
    setValue('host', emailServer.host)
    setValue('senderName', emailServer.senderName)
    setValue('userName', emailServer.userName)
    setValue('password', emailServer.password)
    setValue('port', emailServer.port)
    setValue('protocol', emailServer.protocol)
  }

  useEffect(() => {
    if (emailServer) {
      setInitData()
    }
  }, [emailServer])

  useEffect(() => {
    clearErrors()
  }, [t])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormLabel
            title={t('host')}
            description="Required"
          />
          <Right>
            <FormInput
              name="host"
              maxLength={50}
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('fromName')}
            description="Required"
          />
          <Right>
            <FormInput
              name="senderName"
              maxLength={255}
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('email')}
            description="Required"
          />
          <Right>
            <FormInput name="userName" maxLength={60} />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('password')}
            description="Required"
          />
          <Right>
            <FormInput name="password" maxLength={60} type="password" />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('port')}
            description="Required"
          />
          <Right>
            <FormInputNumber
              name="port"
              min={0}
              style={{ width: '100%' }}
              prefix={false}
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('protocol')}
            description="Required"
          />
          <Right>
            <FormInput name="protocol" maxLength={60} />
          </Right>
        </Row>
        <div className="form-action-group">
          <Space>
            <Button onClick={handleHideEdit}>{t('common:cancel')}</Button>
            <PopupButton
              icon={EditOutlined}
              titlePopup={t('course:registration_course.edit.warning_submit_message')}
              textButton={t('common:change')}
              onConfirm={handleSubmit(onSubmit)}
              isLoading={isUpdating}
            />
          </Space>
        </div>
      </form>
    </FormProvider>
  )
}

export default memo(MailServerForm)
