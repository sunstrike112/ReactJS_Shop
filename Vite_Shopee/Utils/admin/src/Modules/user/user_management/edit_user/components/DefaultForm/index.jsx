/* eslint-disable react/prop-types */
import React, { memo, useEffect } from 'react'

import {
  FormInput,
  FormLabel,
  PopupButton
} from 'Components'
import { FormProvider, useForm } from 'react-hook-form'
import { LABEL_TYPES } from 'Constants'
import { useHistories, useRoles, useUserManagement } from 'Hooks'
import { Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { parseInt } from 'lodash'
import { EditOutlined } from '@ant-design/icons'
import { userClassificationOptions } from 'Modules/user/constant'
import { MEMBER_TYPE_CONSTANT } from 'Utils'
import { Right, Row } from '../../styled'
import { defaultSchema } from '../../schema'

const DefaultForm = ({ userId }) => {
  // Use hooks
  const { t, i18n: { language } } = useTranslation(['user'])
  const history = useHistories()
  const { user, updateUserAction, isSubmitting } = useUserManagement()
  const { isCompany, isWorkspaceVirtual } = useRoles()
  const form = useForm({
    resolver: yupResolver(defaultSchema(t)),
    defaultValues: {
      attributeIdList: [],
      departmentIdList: [],
      password: ''
    }
  })
  // End use hooks

  const { handleSubmit, clearErrors, setValue } = form

  const onSubmit = (formData) => {
    const { attributeIdList, departmentIdList, classification, ...rest } = formData
    const data = {
      ...rest,
      loginId: parseInt(userId),
      attributeIdList: attributeIdList.map((item) => item.value) || [],
      departmentIdList: departmentIdList.map((item) => item.value) || [],
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
      setValue('classification', (userClassificationOptions.filter((option) => option.value === user?.classification)[0] || null))
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

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <FormLabel
              title={t('register_user.email')}
              description={LABEL_TYPES.REQUIRED}
            />
            <Right>
              <FormInput
                name="email"
                maxLength={50}
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

export default memo(DefaultForm)
