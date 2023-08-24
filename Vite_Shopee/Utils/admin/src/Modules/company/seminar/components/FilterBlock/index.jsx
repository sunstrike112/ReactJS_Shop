/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import { FormInput, FormSelect, HeaderSearch } from 'Components'
import { useCompanySeminar, useLoadCompanyAll, useRoles } from 'Hooks'
import React, { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { STORAGE, getLocalStorage } from 'Utils'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  section > form {
    width: ${({ isSuperAdmin }) => (isSuperAdmin ? '100%' : '95%')};
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`

const FilterBlock = ({
  t,
  setRowSelected
}) => {
  const {
    pagination,
    loadListSeminarAction,
    companies,
    loadCompaniesAction
  } = useCompanySeminar()
  const { companyAll } = useLoadCompanyAll()
  const { valueOfNissokenCompany, companyOptions } = companyAll
  const { isSuperAdmin, isAdmin } = useRoles()

  const { limit: pageSize } = pagination

  const publicStatusOpts = [
    { value: 'ALL', label: t('common.all') },
    { value: 'PUBLIC', label: t('common.public') },
    { value: 'PRIVATE', label: t('common.private') }
  ]

  const defaultValues = {
    seminarTitle: '',
    publicSetting: publicStatusOpts[0],
    companyId: valueOfNissokenCompany
  }

  const form = useForm({ defaultValues })
  const { handleSubmit, reset, setValue, watch } = form

  const publicStatusWatch = watch('publicSetting')
  const LANGUAGE = getLocalStorage(STORAGE.LANGUAGE)
  useEffect(() => {
    // change value dropdown public status follow by language
    const indexQuestionType = publicStatusOpts.findIndex((item) => item.value === publicStatusWatch.value)
    setValue('publicSetting', publicStatusOpts[indexQuestionType])
  }, [LANGUAGE])

  const handleSetDefaultValue = () => {
    setValue('companyId', valueOfNissokenCompany)
  }

  useEffect(() => {
    if (isSuperAdmin || isAdmin) {
      handleSetDefaultValue()
    }
  }, [companyAll, isSuperAdmin, isAdmin])

  const onSubmit = (data) => {
    const filterData = {
      ...data,
      seminarTitle: data.seminarTitle.trim(),
      publicSetting: data.publicSetting.value,
      companyId: (isSuperAdmin || isAdmin) && data.companyId.value
    }
    if (filterData.publicSetting === 'ALL') delete filterData.publicSetting
    loadListSeminarAction({
      params: {
        ...filterData,
        page: 1,
        limit: pageSize
      }
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  const handleResetData = () => {
    reset(defaultValues)
    const filterData = {
      ...defaultValues,
      publicSetting: defaultValues.publicSetting.value,
      companyId: defaultValues?.companyId?.value
    }
    if (filterData.publicSetting === 'ALL') delete filterData.publicSetting
    loadListSeminarAction({
      params: {
        ...filterData,
        page: 1,
        limit: pageSize
      }
    })
  }

  return (
    <Wrapper isSuperAdmin={isSuperAdmin || isAdmin}>
      <FormProvider {...form}>
        <HeaderSearch
          onCancel={() => handleResetData()}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row gutter={24} style={{ minWidth: 900 }}>
            {(isSuperAdmin || isAdmin) ? (
              <>
                <Col span={12}>
                  <FormSelect
                    t={t}
                    name="companyId"
                    label={t('user:management.company_name')}
                    placeholder={null}
                    wrapperProps={{
                      colon: false,
                      labelAlign: 'right',
                      labelCol: { span: 8 },
                      wrapperCol: { span: 14 }
                    }}
                    options={companyOptions}
                    isClearable={false}
                  />
                </Col>
                <Col span={12}>
                  <FormSelect
                    t={t}
                    name="publicSetting"
                    isSearchable={false}
                    label={t('management.public_status')}
                    placeholder={null}
                    wrapperProps={{
                      colon: false,
                      labelAlign: 'right',
                      labelCol: { span: 8 },
                      wrapperCol: { span: 14 }
                    }}
                    options={publicStatusOpts}
                    isClearable={false}
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="seminarTitle"
                    label={t('common.seminar_title')}
                    wrapperProps={{
                      colon: false,
                      labelAlign: 'right',
                      labelCol: { span: 8 },
                      wrapperCol: { span: 14 }
                    }}
                  />
                </Col>
              </>
            )
              : (
                <>
                  <Col span={12}>
                    <FormInput
                      name="seminarTitle"
                      label={t('common.seminar_title')}
                      wrapperProps={{
                        colon: false,
                        labelAlign: 'right',
                        labelCol: { span: 8 },
                        wrapperCol: { span: 14 }
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <FormSelect
                      t={t}
                      name="publicSetting"
                      isSearchable={false}
                      label={t('management.public_status')}
                      placeholder={null}
                      wrapperProps={{
                        colon: false,
                        labelAlign: 'right',
                        labelCol: { span: 8 },
                        wrapperCol: { span: 14 }
                      }}
                      options={publicStatusOpts}
                      isClearable={false}
                    />
                  </Col>
                </>
              )}
          </Row>
        </HeaderSearch>
      </FormProvider>
    </Wrapper>
  )
}

export default FilterBlock
