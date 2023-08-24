/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, FormTextArea, FormTreeSelect, Text } from 'Components'
import { Row, Col, Button } from 'antd'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitButton, Wrapper } from './styled'
import Schema from './schema'

const DEFAULT_VALUE = {
  apiId: null,
  listIp: ''
}

const AddDomain = ({ t, language, isAdding, externalApi, apisManager, addExternalApiManagerAction }) => {
  const [isEdit, setIsEdit] = useState()

  const form = useForm({
    resolver: yupResolver(Schema(t)),
    defaultValues: DEFAULT_VALUE
  })
  const { handleSubmit, reset, setValue, watch, formState: { errors }, clearErrors } = form
  const [apiIdWatch, listIpWatch] = watch(['apiId', 'listIp'])

  const onSubmit = useCallback((data) => {
    addExternalApiManagerAction({
      data,
      isEdit,
      resolved: () => {
        reset(DEFAULT_VALUE)
        if (isEdit) {
          setIsEdit(false)
        }
      }
    })
  }, [isEdit])

  const onChangeApi = useCallback((api) => {
    setValue('apiId', api.value || DEFAULT_VALUE.api)
    if (errors.apiId) clearErrors('apiId')
    if (errors.listIp) clearErrors('listIp')
  }, [apisManager, listIpWatch, errors])

  const onKeyDownInIps = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }, [])

  const onChangeIps = useCallback((e) => {
    if (e.target.value.split('\n').length > 1) {
      const valueFormated = e.target.value
        .replace(',', '\n')
        .split('\n')
        .map((element) => element.replaceAll(',', ''))
        .filter((item) => item.length !== 0)
        .join(',')
      setValue('listIp', valueFormated, { shouldValidate: true })
    } else {
      setValue('listIp', e.target.value, { shouldValidate: true })
    }
  }, [])

  useEffect(() => {
    const apiSelected = apisManager.find((apiManager) => apiManager.externalApi.id === apiIdWatch)

    if (apiSelected) {
      setValue('listIp', apiSelected.listIp)
      setIsEdit(true)
    } else {
      if (isEdit) {
        setIsEdit(false)
      }
      setValue('listIp', '')
    }
  }, [apiIdWatch, apisManager, isEdit])

  useEffect(() => {
    clearErrors()
  }, [language])

  return (
    <FormProvider {...form}>
      <Wrapper>
        <Text.primary style={{ textAlign: 'center' }} fontSize="size_24" fontWeight="fw_500">{t('apiManager.explain.line1')}</Text.primary>
        <Text.primary style={{ textAlign: 'center', marginBottom: 10 }} fontSize="size_24" fontWeight="fw_500">{t('apiManager.explain.line2')}</Text.primary>
        <Row gutter={24} justify="center" align="middle">
          <Col span={8}>
            <FormTreeSelect
              t={t}
              loading={externalApi.isLoadingExternalApi}
              name="apiId"
              valueKey="key"
              labelKey="title"
              options={externalApi.apis.map((api) => ({ key: api.id, title: api.name }))}
              onChange={onChangeApi}
              label={t('externalApi.externalApi')}
              allowClear={false}
              wrapperProps={{
                colon: false,
                labelAlign: 'right',
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
              }}
            />
          </Col>
          <Col span={12}>
            <FormTextArea
              name="listIp"
              label={t('externalIp.ipAddress')}
              showTextCount={false}
              maxLength={4000}
              rows={1}
              onKeyPress={onKeyDownInIps}
              onChange={onChangeIps}
              wrapperProps={{
                colon: false,
                labelAlign: 'right',
                labelCol: { span: 6 },
                wrapperCol: { span: 18 }
              }}
            />
          </Col>
          <SubmitButton
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
            loading={isAdding}
          >
            {isEdit ? t('common:edit') : t('common:add')}
          </SubmitButton>
        </Row>
      </Wrapper>
    </FormProvider>
  )
}

AddDomain.propTypes = {
  t: PropTypes.any,
  language: PropTypes.string,
  isAdding: PropTypes.bool,
  apisManager: PropTypes.array,
  addExternalApiManagerAction: PropTypes.func,
  externalApi: PropTypes.object
}

export default AddDomain
