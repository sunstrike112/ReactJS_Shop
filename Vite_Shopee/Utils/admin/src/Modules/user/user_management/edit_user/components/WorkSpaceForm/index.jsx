/* eslint-disable react/prop-types */
import React, { memo, useEffect } from 'react'
import { useUserManagement } from 'Hooks/user'

import {
  FormTreeSelect,
  FormRadio,
  FormLabel,
  FormInput,
  PopupButton
} from 'Components'
import { useHistories, useQuery, useRoles } from 'Hooks'
import { MEMBER_TYPES, MEMBER_TYPES_WORKSPACE, MEMBER_TYPE_CONSTANT } from 'Utils'
import { NOT_AVAILABLE, USER_ROLE } from 'Constants'
import { FormProvider, useForm } from 'react-hook-form'
import { parseInt } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { userClassificationOptions } from 'Modules/user/constant'
import GroupsAttributes from 'Modules/user/user_management/register_user/components/GroupsAttributes'
import { Divider, Right, Row } from '../../styled'

const WorkSpaceForm = ({ userId }) => {
  const { t } = useTranslation(['user'])
  const history = useHistories()
  const { user, updateUserAction, isSubmitting } = useUserManagement()
  const { isCompany, isWorkspaceAdmin } = useRoles()

  const form = useForm({
    defaultValues: {
      attributeIdList: [],
      departmentIdList: [],
      password: ''
    }
  })
  const { handleSubmit, setValue } = form

  const query = useQuery()
  const isMainCompany = (query.get('isMainCompany') === 'true')
  const isMainWorkspace = user.listRoles?.[0] === USER_ROLE.COMPANY_ADMIN

  const onSubmit = (formData) => {
    const { attributeIdList, departmentIdList, classification, employeeNumber, ...rest } = formData
    const data = {
      ...rest,
      loginId: parseInt(userId),
      attributeIdList: attributeIdList.map((item) => item.value) || [],
      departmentIdList: departmentIdList.map((item) => item.value) || [],
      classification: classification?.value
    }
    updateUserAction({ data, history, isWorkspaceAdmin })
  }

  useEffect(() => {
    if (user) {
      setValue('email', user.email || '')
      setValue('signinId', user.signinId)
      setValue('fullName', user.fullName)
      setValue('fullNameKatakana', user.fullNameKatakana)
      setValue('classification', (userClassificationOptions.filter((option) => option.value === user?.classification)[0] || null))
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

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormLabel
            title={t('register_user.email')}
          />
          <Right>
            <FormInput
              name="email"
              maxLength={50}
              disabled
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('common:loginId')}
          />
          <Right>
            <FormInput
              className="loginIdWorkspace"
              name="signinId"
              prefix={`${user.companyCode || NOT_AVAILABLE}-`}
              disabled
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('register_user.full_name')}
          />
          <Right>
            <FormInput
              name="fullName"
              maxLength={30}
              disabled
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('register_user.full_name_furi')}
          />
          <Right>
            <FormInput
              name="fullNameKatakana"
              maxLength={60}
              disabled
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('register_user.user_classification')}
          />
          <Right>
            <FormTreeSelect
              name="classification"
              maxLength={60}
              disabled
            />
          </Right>
        </Row>
        <Divider />
        <Row>
          <FormLabel
            title={t('common:employee_number')}
          />
          <Right>
            <FormInput
              name="employeeNumber"
              disabled
              maxLength={50}
            />
          </Right>
        </Row>
        <GroupsAttributes form={form} t={t} />
        <Divider />
        <Row>
          <FormLabel
            title={t('member_type')}
            description="Required"
          />
          <Right>
            <FormRadio
              t={t}
              name="memberType"
              options={isMainWorkspace ? MEMBER_TYPES : MEMBER_TYPES_WORKSPACE}
              disabled={isMainCompany || isMainWorkspace}
            />
          </Right>
        </Row>
        <div className="form-action-group">
          <Space>
            <PopupButton
              icon={EditOutlined}
              titlePopup={t('edit_user.warning_submit_message')}
              textButton={t('common:change')}
              onConfirm={handleSubmit(onSubmit)}
              disabled={!isCompany}
              isLoading={isSubmitting}
            />
          </Space>
        </div>
      </form>
    </FormProvider>
  )
}

export default memo(WorkSpaceForm)
