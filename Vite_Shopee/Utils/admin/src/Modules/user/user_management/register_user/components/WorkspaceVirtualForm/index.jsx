/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from 'react'

import {
  FormInput,
  FormRadio,
  FormLabel,
  FormSelect
} from 'Components'
import { FormProvider, useForm } from 'react-hook-form'
import { LABEL_TYPES, NOT_AVAILABLE, REGEX } from 'Constants'
import { MEMBER_TYPES_VIRTUAL_COMPANY } from 'Utils'
import { useAuth, useHistories, useMyCompany, useRoles, useUserManagement } from 'Hooks'
import { Button, Popconfirm, Spin } from 'antd'
import { userClassificationOptions } from 'Modules/user/constant'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import ChangePlanModal from 'Components/ChangePlanModal'
import { Divider, Right, Row } from '../../styled'
import { workspaceVirtualSchema } from '../../schema'

const validateEmail = (email) => REGEX.EMAIL.test(email)

const WorkspaceVirtualForm = () => {
  // Use hooks
  const { t, i18n: { language } } = useTranslation(['user'])
  const { profile } = useAuth()
  const history = useHistories()
  const {
    userExist,
    checkExistEmailAction,
    isSubmitting,
    createUserAction,
    error,
    pagination: { total }
  } = useUserManagement()
  const { isCompany } = useRoles()
  const { companyInfo } = useMyCompany()
  const form = useForm({
    resolver: yupResolver(workspaceVirtualSchema(t)),
    defaultValues: {
      memberType: MEMBER_TYPES_VIRTUAL_COMPANY[0].value,
      password: '',
      email: '',
      employeeNumber: ''
    }
  })
  // End use hooks

  // Use states
  const [isShowModal, setIsShowModal] = useState(false)
  // End use states

  const { handleSubmit, clearErrors, watch, setValue } = form
  const [email] = watch(['email'])

  const onBlurEmail = () => {
    if (validateEmail(email?.trim())) {
      checkExistEmailAction({
        email: email?.trim()?.toLowerCase()
      })
    }
  }

  const onSubmit = (formData) => {
    if ((companyInfo?.numberOfUserJoined >= companyInfo?.userUse && total >= companyInfo?.userUse)
      || error?.error === 'ERROR_NUMBER_USER_OVER_PLAN_PACKAGE') {
      return setIsShowModal(true)
    }
    const { classification, employeeNumber, ...rest } = formData
    const data = [{
      ...rest,
      employeeNumber: employeeNumber?.trim() || '',
      classification: classification?.value || ''
    }]
    const params = { langCode: language }
    return createUserAction({ data, params, setIsShowModal, history })
  }

  const handleClose = () => {
    setIsShowModal(false)
  }

  useEffect(() => {
    setValue('fullName', userExist.name)
    setValue('fullNameKatakana', userExist.kana)
    setValue('employeeNumber', userExist.employeeNumber)
  }, [userExist])

  useEffect(() => {
    clearErrors()
  }, [language])

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <Row>
            <FormLabel
              title={t('register_user.email')}
              description={LABEL_TYPES.OPTIONAL}
            />
            <Right>
              <FormInput
                name="email"
                onBlur={onBlurEmail}
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
              <FormInput name="signinId" prefix={`${profile.companyCode || NOT_AVAILABLE}-`} />
            </Right>
          </Row>
          <Divider />

          <Spin spinning={userExist.isLoading} size="small">
            <Row>
              <FormLabel
                title={t('register_user.full_name')}
                description={LABEL_TYPES.REQUIRED}
                subtitle={t('register_user.guide_fullName')}
              />
              <Right>
                <FormInput
                  name="fullName"
                  maxLength={60}
                  disabled={userExist.isLoading}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('register_user.full_name_furi')}
                description={LABEL_TYPES.REQUIRED}
                subtitle={t('register_user.guide_fullName_furi')}
              />
              <Right>
                <FormInput
                  name="fullNameKatakana"
                  maxLength={60}
                  disabled={userExist.isLoading}
                />
              </Right>
            </Row>
          </Spin>
          <Divider />
          <Row>
            <FormLabel
              title={t('register_user.user_classification')}
              description={LABEL_TYPES.REQUIRED}
            />
            <Right>
              <FormSelect
                name="classification"
                options={userClassificationOptions}
              />
            </Right>
          </Row>
          <Divider />
          <Row>
            <FormLabel
              title={t('common:employee_number')}
              description={LABEL_TYPES.OPTIONAL}
            />
            <Right>
              <FormInput
                name="employeeNumber"
                maxLength={50}
              />
            </Right>
          </Row>
          {isCompany && (
          <>
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
                  options={MEMBER_TYPES_VIRTUAL_COMPANY}
                />
              </Right>
            </Row>
          </>
          )}
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
      {isShowModal && (
      <ChangePlanModal
        visible={isShowModal}
        company={companyInfo}
        plan={companyInfo?.planPackageDto}
        onClose={handleClose}
      />
      )}
    </>
  )
}

export default memo(WorkspaceVirtualForm)
