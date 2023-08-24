/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Row, Col } from 'antd'

import { FormTreeSelect, FormInput, HeaderSearch, FormSelect } from 'Components'
import { COMPANY_NAME } from 'Constants/course'
import { USER_CLASSIFICATIONS } from 'Constants/user'

const NISSOKEN_ID = 1

const FilterBlock = ({
  t,
  loadUsersAction,
  loadGroupsAction,
  loadAttributesAction,
  groupsOption,
  attributesOption,
  setRowSelected,
  pageSize,
  companyAll,
  isSuperAdmin,
  setIsChooseNissoken,
  isWorkspaceAdmin,
  resetUsersAction
}) => {
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll
  const form = useForm({
    defaultValues: {
      group: [],
      attribute: [],
      companyId: {
        label: COMPANY_NAME.NISSOKEN,
        value: 1
      },
      signinId: '',
      companyCode: ''
    }
  })
  const { handleSubmit, reset, watch, setValue } = form
  const [companyId] = watch(['companyId'])

  const onSubmit = (formData) => {
    const { group, attribute, fullname, email, classification, signinId, companyCode } = formData
    const filter = {
      departmentIdList: group.map((item) => item.value),
      attributeIdList: attribute.map((item) => item.value),
      fullname,
      email,
      classification: classification.value,
      signinId: signinId.trim(),
      companyCode: isWorkspaceAdmin ? companyCode.trim() : ''
    }
    loadUsersAction({
      params: {
        filter: isSuperAdmin ? { ...filter, companyId: formData.companyId.value } : filter,
        page: 1,
        limit: pageSize
      }
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  const handleCancel = useCallback(() => {
    reset({
      fullname: '',
      email: '',
      group: [],
      attribute: [],
      companyId: {
        label: COMPANY_NAME.NISSOKEN,
        value: 1
      },
      classification: '',
      signinId: '',
      companyCode: ''
    })
    resetUsersAction()
  }, [])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
    setValue('group', [])
    setValue('attribute', [])
    setValue('signinId', '')
    loadGroupsAction({ params: { companyId: company.value } })
    loadAttributesAction({ params: { companyId: company.value } })
  }

  useEffect(() => {
    if (isSuperAdmin) {
      loadGroupsAction({ params: { companyId: idOfNissokenCompany } })
      loadAttributesAction({ params: { companyId: idOfNissokenCompany } })
    }
  }, [isSuperAdmin])

  useEffect(() => {
    if (companyId.value === NISSOKEN_ID) { setIsChooseNissoken(true) } else setIsChooseNissoken(false)
  }, [companyId])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row className="form-group" gutter={24}>
          {(isSuperAdmin) && (
            <Col span={12}>
              <FormSelect
                t={t}
                name="companyId"
                label={t('management.company_name')}
                placeholder={null}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 8 },
                  labelAlign: 'right',
                  wrapperCol: { span: 16 }
                }}
                defaultValue={valueOfNissokenCompany}
                options={companyOptions}
                isClearable={false}
                onChange={handleSelectCompany}
              />
            </Col>
          )}
          <Col span={12}>
            <FormInput
              name="fullname"
              label={t('management.name_filter')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="email"
              label={t('management.email_filter')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormTreeSelect
              t={t}
              name="group"
              valueKey="departmentId"
              labelKey="name"
              options={groupsOption}
              label={t('management.group')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right',
                wrapperCol: { span: 16 }
              }}
              multiple
            />
          </Col>
          <Col span={12}>
            <FormTreeSelect
              t={t}
              name="attribute"
              valueKey="attributeId"
              labelKey="attributeName"
              options={attributesOption}
              label={t('management.attribute')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right',
                wrapperCol: { span: 16 }
              }}
              multiple
            />
          </Col>
          <Col span={12}>
            <FormSelect
              t={t}
              name="classification"
              label={t('user_classification')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right',
                wrapperCol: { span: 16 }
              }}
              options={USER_CLASSIFICATIONS}
              isClearable={false}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="signinId"
              label={t('common:loginId')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
            />
          </Col>
          {isWorkspaceAdmin && (
          <Col span={12}>
            <FormInput
              name="companyCode"
              label={t('common:company_code')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
            />
          </Col>
          )}
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
