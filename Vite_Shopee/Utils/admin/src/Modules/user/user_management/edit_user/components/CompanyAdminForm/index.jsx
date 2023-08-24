/* eslint-disable react/prop-types */
import React, { memo, useEffect } from 'react'

import {
  FormInput,
  FormRadio,
  FormLabel,
  FormSelect,
  FormCheckbox,
  PopupButton
} from 'Components'
import { FormProvider, useForm } from 'react-hook-form'
import { LABEL_TYPES, NOT_AVAILABLE } from 'Constants'
import { MEMBER_TYPES, MEMBER_TYPE_CONSTANT } from 'Utils'
import { useAuth, useHistories, useRoles, useUserManagement } from 'Hooks'
import { Space } from 'antd'
import { userClassificationOptions } from 'Modules/user/constant'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import GroupsAttributes from 'Modules/user/user_management/register_user/components/GroupsAttributes'
import { parseInt } from 'lodash'
import { EditOutlined } from '@ant-design/icons'
import { Divider, Right, Row } from '../../styled'
import { companyAdminSchema } from '../../schema'

const CompanyAdminForm = ({ userId }) => {
  // Use hooks
  const { t, i18n: { language } } = useTranslation(['user'])
  const { profile } = useAuth()
  const history = useHistories()
  const { user, updateUserAction, isSubmitting } = useUserManagement()
  const { isCompany, isWorkspaceVirtual } = useRoles()
  const form = useForm({
    resolver: yupResolver(companyAdminSchema(t)),
    defaultValues: {
      attributeIdList: [],
      departmentIdList: [],
      isShowPassword: false,
      employeeNumber: ''
    }
  })
  // End use hooks

  const { handleSubmit, clearErrors, watch, setValue, formState: { isSubmitted }, trigger } = form
  const [passwordWatch, memberType, isShowPasswordWatch] = watch(['password', 'memberType', 'isShowPassword'])

  const emailLabelType = memberType === MEMBER_TYPE_CONSTANT.COMPANY_ADMIN ? LABEL_TYPES.REQUIRED : LABEL_TYPES.OPTIONAL

  const onCheckShowPassword = (event) => {
    const { checked } = event.target
    setValue('isShowPassword', checked)
    if (!checked && passwordWatch) {
      setValue('password', '')
    }
  }

  const onSubmit = (formData) => {
    const { attributeIdList, departmentIdList, classification, newPassword, confirmPassword, isShowPassword, employeeNumber, ...rest } = formData
    const data = {
      ...rest,
      password: newPassword || '',
      loginId: parseInt(userId),
      attributeIdList: attributeIdList.map((item) => item.value) || [],
      departmentIdList: departmentIdList.map((item) => item.value) || [],
      classification: classification?.value,
      employeeNumber: employeeNumber?.trim() || ''
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
      setValue('employeeNumber', user.employeeNumber || '')
      if (user.listAttributes?.length) {
        setValue('attributeIdList', user.listAttributes.map((item) => ({
          label: item.attributeName,
          value: item.attributeId
        })))
      }
      if (user.listDepartment?.length) {
        setValue('departmentIdList', user.listDepartment.map((item) => ({
          label: item.departmentName,
          value: item.departmentId
        })))
      }
      if (user.listRoles) {
        setValue('memberType', MEMBER_TYPE_CONSTANT[user.listRoles[0]])
      }
    }
  }, [user])

  useEffect(() => {
    clearErrors()
  }, [language])

  useEffect(() => {
    if (isSubmitted) {
      trigger('email')
      trigger('password')
    }
  }, [isShowPasswordWatch, memberType, isSubmitted])

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <FormLabel
              title={t('register_user.email')}
              description={emailLabelType}
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
            <FormLabel title={t('common:settingPassword')} />
            <Right>
              <FormCheckbox
                t={t}
                name="isShowPassword"
                onChange={onCheckShowPassword}
                checked={isShowPasswordWatch}
              />
            </Right>
          </Row>
          <Divider />
          {isShowPasswordWatch && (
          <>
            <Row>
              <FormLabel
                title={t('common:newPassword')}
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
            <Divider />
          </>
          )}
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
          <GroupsAttributes form={form} t={t} />
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
                  options={MEMBER_TYPES}
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

export default memo(CompanyAdminForm)
