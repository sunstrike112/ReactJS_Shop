/* eslint-disable react/prop-types */
import React, { memo, useEffect } from 'react'

import {
  FormInput,
  FormRadio,
  FormLabel,
  FormSelect,
  PopupButton
} from 'Components'
import { FormProvider, useForm } from 'react-hook-form'
import { LABEL_TYPES, NOT_AVAILABLE } from 'Constants'
import { MEMBER_TYPES_VIRTUAL_COMPANY, MEMBER_TYPE_CONSTANT } from 'Utils'
import { useAuth, useHistories, useRoles, useUserManagement } from 'Hooks'
import { Space } from 'antd'
import { userClassificationOptions } from 'Modules/user/constant'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { parseInt } from 'lodash'
import { EditOutlined } from '@ant-design/icons'
import { Divider, Right, Row } from '../../styled'
import { workspaceVirtualSchema } from '../../schema'

const WorkspaceVirtualForm = ({ userId }) => {
  // Use hooks
  const { t, i18n: { language } } = useTranslation(['user'])
  const { profile } = useAuth()
  const history = useHistories()
  const { user, updateUserAction, isSubmitting } = useUserManagement()
  const { isCompany, isWorkspaceVirtual } = useRoles()
  const form = useForm({
    resolver: yupResolver(workspaceVirtualSchema(t)),
    defaultValues: {
      password: ''
    }
  })
  // End use hooks

  const { handleSubmit, clearErrors, setValue } = form

  const onSubmit = (formData) => {
    const { classification, employeeNumber, ...rest } = formData
    const data = {
      ...rest,
      employeeNumber: employeeNumber?.trim() || '',
      loginId: parseInt(userId),
      classification: classification?.value
    }
    updateUserAction({ data, history })
  }

  useEffect(() => {
    if (user) {
      setValue('email', user.email || '')
      setValue('signinId', user.signinId)
      setValue('fullName', user.fullName)
      setValue('fullNameKatakana', user.fullNameKatakana)
      setValue('classification', (userClassificationOptions?.filter((option) => option?.value === user?.classification)[0] || null))
      setValue('employeeNumber', user.employeeNumber)
      if (user.listRoles) {
        setValue('memberType', MEMBER_TYPE_CONSTANT[user.listRoles[0]])
      }
    }
  }, [user])

  useEffect(() => {
    clearErrors()
  }, [language])

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <FormInput name="signinId" prefix={`${profile.companyCode || NOT_AVAILABLE}-`} />
            </Right>
          </Row>
          <Divider />

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
              />
            </Right>
          </Row>
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
            <Space>
              <PopupButton
                icon={EditOutlined}
                titlePopup={t('edit_user.warning_submit_message')}
                textButton={t('common:change')}
                onConfirm={handleSubmit(onSubmit)}
                disabled={!(isCompany || isWorkspaceVirtual)}
                isLoading={isSubmitting}
              />
            </Space>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default memo(WorkspaceVirtualForm)
