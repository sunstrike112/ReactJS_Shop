/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Popconfirm } from 'antd'

import {
  FormInput,
  FormLabel,
  FormRadio
} from 'Components'
import { useAuth, useHistories } from 'Hooks'
import { LABEL_TYPES, NOT_AVAILABLE } from 'Constants'
import { MEMBER_TYPES_SUPER_ADMIN } from 'Utils'
import { Divider, Right, Row } from '../../styled'
import { superAdminUser } from '../../schema'

const SuperAdminForm = ({ createNissokenUserAction, isSubmitting }) => {
  const { t, i18n: { language } } = useTranslation(['user'])
  const { profile } = useAuth()
  const history = useHistories()
  const form = useForm({
    resolver: yupResolver(superAdminUser(t)),
    defaultValues: {
      email: '',
      password: '',
      memberType: MEMBER_TYPES_SUPER_ADMIN[0].value
    }
  })
  const { handleSubmit, clearErrors, watch, formState: { errors } } = form

  const [email, passwordWatch] = watch(['email', 'password'])

  const onSubmit = (data) => {
    createNissokenUserAction({ data, history })
  }

  useEffect(() => {
    clearErrors()
  }, [language])

  useEffect(() => {
    if (errors.email?.type === 'required') {
      if (passwordWatch) {
        clearErrors('email')
      }
    }

    if (errors.password) {
      if (email) {
        clearErrors('password')
      }
    }
  }, [passwordWatch, email, errors.email])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormLabel
            title={t('register_user.email')}
            description={LABEL_TYPES.OPTIONAL}
          />
          <Right>
            <FormInput name="email" />
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
            <FormInput name="signinId" prefix={`${profile.companyCode || NOT_AVAILABLE}-`} />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('common:password')}
            description={LABEL_TYPES.REQUIRED}
            subtitle={t('register_user.guide_password')}
          />
          <Right>
            <FormInput
              name="password"
              maxLength={60}
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('member_type')}
            description={LABEL_TYPES.REQUIRED}
          />
          <Right>
            <FormRadio
              t={t}
              name="memberType"
              options={MEMBER_TYPES_SUPER_ADMIN}
            />
          </Right>
        </Row>
        <div className="form-action-group">
          <Popconfirm
            title={t('register_user.warning_submit_message')}
            onConfirm={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Button type="primary" htmlType="submit" disabled={isSubmitting} loading={isSubmitting}>
              {t('common:register')}
            </Button>
          </Popconfirm>
        </div>
      </form>
    </FormProvider>
  )
}

export default SuperAdminForm
