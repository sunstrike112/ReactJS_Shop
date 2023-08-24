/* eslint-disable react/prop-types */
import { EditOutlined } from '@ant-design/icons'
import { FormCheckbox, FormInput, FormLabel, Title } from 'Components'
import { useAdminProfile } from 'Hooks'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Spin } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { Divider, Right, Row, Wrapper } from 'Themes/facit'
import { LABEL_TYPES, NOT_AVAILABLE } from 'Constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { isNotEmptyObject } from 'Utils'
import Schema from './schema'

const DEFAULT_VALUE = {
  newPassword: '',
  confirmPassword: '',
  isSetPassword: false
}

const EditLoginInfo = () => {
  const { t, i18n } = useTranslation(['user'])
  const { isLoading, data, isUpdating, updateAdminProfileAction } = useAdminProfile()
  const formMethods = useForm({
    resolver: yupResolver(Schema(t)),
    defaultValues: DEFAULT_VALUE
  })

  const { handleSubmit, watch, setValue, reset, clearErrors } = formMethods
  const [newPasswordWatch, isSetPasswordWatch] = watch(['newPassword', 'isSetPassword'])
  useEffect(() => {
    clearErrors()
  }, [i18n.language])
  const onSubmit = (formData) => {
    const { isSetPassword, ...rest } = formData
    updateAdminProfileAction({
      params: { isSetPassword },
      data: rest
    })
  }

  const onCheckShowPassword = (event) => {
    const { checked } = event.target
    setValue('isSetPassword', checked)
    if (!checked && newPasswordWatch) {
      setValue('newPassword', '')
    }
  }

  useEffect(() => {
    const setInitData = () => {
      const { companyCode, ...restData } = data
      reset({ ...DEFAULT_VALUE, ...restData })
    }

    if (isNotEmptyObject(data)) {
      setInitData()
    }
  }, [data])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('common:editLoginInfo')}
      />
      <div className="form-wrapper">
        <FormProvider {...formMethods}>
          <form onSubmit={onSubmit}>
            <Spin spinning={isLoading}>
              <Row>
                <FormLabel
                  title={t('register_user.email')}
                  description={LABEL_TYPES.OPTIONAL}
                />
                <Right>
                  <FormInput
                    name="email"
                    maxLength={50}
                  />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel
                  title={t('common:loginId')}
                  description={LABEL_TYPES.REQUIRED}
                  subtitle={t('register_user.guide_loginId')}
                />
                <Right>
                  <FormInput name="signinId" prefix={`${data.companyCode || NOT_AVAILABLE}-`} />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel title={t('common:settingPassword')} />
                <Right>
                  <FormCheckbox
                    t={t}
                    name="isSetPassword"
                    onChange={onCheckShowPassword}
                  />
                </Right>
              </Row>
              {isSetPasswordWatch && (
              <>
                <Divider />
                <Row>
                  <FormLabel
                    title={t('common:new_password')}
                    description={LABEL_TYPES.REQUIRED}
                    subtitle={t('register_user.guide_password')}
                  />
                  <Right>
                    <FormInput
                      name="newPassword"
                      maxLength={30}
                    />
                  </Right>
                </Row>
                <Divider />
                <Row>
                  <FormLabel
                    title={t('common:confirmPassword')}
                    description={LABEL_TYPES.REQUIRED}
                    subtitle={t('register_user.guide_password')}
                  />
                  <Right>
                    <FormInput
                      name="confirmPassword"
                      maxLength={30}
                    />
                  </Right>
                </Row>
              </>
              )}
            </Spin>
            <div className="form-action-group">
              <Button
                type="primary"
                htmlType="submit"
                disabled={isUpdating}
                loading={isUpdating}
                onClick={handleSubmit(onSubmit)}
              >
                {t('common:change')}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Wrapper>
  )
}

export default EditLoginInfo
