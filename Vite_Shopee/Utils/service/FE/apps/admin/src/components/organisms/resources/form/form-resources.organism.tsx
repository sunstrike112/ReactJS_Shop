import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import {
  Form,
  Button,
  Space,
  notification,
} from 'antd'
import { FormInstance } from 'antd/lib/form';
import FormBuilder from 'antd-form-builder'
import * as yup from 'yup';
import { ITEM_UPDATE_SUCCESSFULLY, validateMessages } from '@ss-fe-fw/constants';
import baseApi from '@ss-fe-fw/api/base-api';
import useSWR, { mutate } from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'
import {useMount} from 'react-use'
import { snakeCase } from "change-case"
import { fromString } from '@ss-fe-fw/utils/uuid'
import moment from 'moment-timezone';
import { convertUTCToLocalTimezone } from '@ss-fe-fw/shared/ui'
import {
  useRecoilValue,
} from 'recoil';
import { currentTimezoneState } from '@ss-fe-fw/stores';
import { useAbility } from '@casl/react'
import { AbilityContext } from '@ss-fe-fw/utils/can'
import PubSub from 'pubsub-js'
import useDetailResource from '@ss-fe-fw/hooks/use-detail-resource'

/* eslint-disable-next-line */
export interface OGFormResourcesProps {
  apiEndpoint: string;
  apiSchemaEndpoint?: string;
  formType: 'create' | 'update';
  formTitle?: string;
  form?: {
    meta?: any,
    columns?: number,
    layout?: 'horizontal' | 'inline' | 'vertical',
    initialValues?: any,
    style?: any,
    requireMark?: boolean,
    method?: 'POST' | 'GET',
    include?: any,
    hideButtonControl?: boolean
    handleFinish?: any;
  };
  setForm?: any;
  redirectAfterComplete?: string;
  idData?: any;
  setmetadata?: any;
  metadata?: any;
  children?: any;
}

export function OGFormResources(props: OGFormResourcesProps) {
  const [form] = Form.useForm()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [toggleCallAPI, setToggleCallAPI] = useState(true)
  const [formMeta, setFormMeta] = useState({
    columns: props?.form?.columns ?? 1,
    formItemLayout: null,
    layout: props?.form?.layout ?? "vertical",
    fields: []
  })
  const [idData, setIdData] = useState(null)
  const [detailUrl, setDetailUrl] = useState(null)
  const [query, setQuery] = useState(null)
  const [cacheKey, setCacheKey] = useState(null)
  const timezone = useRecoilValue(currentTimezoneState);
  const ability = useAbility(AbilityContext)

  // const { data, error } = useSWR(
  //   (mounted && detailUrl) ? [detailUrl, 'POST', query] : null,
  //   (url, method, body) => fetcher(url, method, body)
  // )

  const {data, error} = useDetailResource({mounted, detailUrl, query})

  /**
   * TODO: Will handle get from schema later
   */
  // const schemaData = useSWR(mounted && props?.apiSchemaEndpoint ? props.apiSchemaEndpoint : null, fetcher)

  const handleFinish = React.useCallback(async values => {
    // Transform data
    let transformedFormData = {}
    Object.entries(values).forEach(([key, item]: any) => {
      if (item?.hasOwnProperty('input')) {
        const itemSchema = props?.form?.meta.items.filter((_item) => _item.key == key)
        if (Array.isArray(item.input)) {
          if (itemSchema && itemSchema[0]?.initialValue?.fieldName) {
            const values = item?.input.map((value) => {
              if (!(value.hasOwnProperty('key') && value.hasOwnProperty('value'))) {
                return { [item.idKey]: value[itemSchema[0]?.initialValue.idKey] }
              } else {
                return { [item.idKey]: value.value }
              }
            })
            if (props.formType === 'create') {
              transformedFormData[key] = {
                connect: values
              }
            } else {
              transformedFormData[key] = {
                set: [],
                connect: values
              }
            }
          } else {
            transformedFormData[key] = item.input
          }
        } else if (!Array.isArray(item?.input) &&
          (item?.input?.hasOwnProperty('value') || item.hasOwnProperty('fieldName'))
        ) {
          if (itemSchema && itemSchema[0]?.initialValue?.fieldName) {
            let values = null
            if (!(item.input.hasOwnProperty('key') && item.input.hasOwnProperty('value'))) {
              values = { [item.idKey]: item.input[itemSchema[0]?.initialValue.idKey] }
            } else {
              values = { [item.idKey]: item.input.value }
            }
            transformedFormData[key] = { connect: values }
          } else {
            transformedFormData[key] = item.input.value
          }
        } else {
          transformedFormData[key] = item.input
        }
      } else {
        transformedFormData[key] = item
      }
    })

    let postApiEndpoint = props.apiEndpoint;
    if (props.formType === 'update' && props.idData) {
      postApiEndpoint += `/${props.idData}`;
    }

    const method = props.formType === 'create' ? 'POST' : 'PATCH'
    const result = await baseApi(postApiEndpoint, method, transformedFormData)
    if (result.status) {
      if (Array.isArray(result.message)) {
        let errorFields = []
        result.message.map((error) => {
          errorFields.push({name: error.target, errors: [error.message]})
        })
        errorFields.length > 0 && form.setFields(errorFields)
      }
      props?.form?.handleFinish && props?.form?.handleFinish(false)
      props.formType === 'update' && PubSub.publish('updated_resource_form', false)
    } else {
      if (props.redirectAfterComplete) {
        router.push(props.redirectAfterComplete)
      } else {
        if (props.formType === 'update') {
          mutate(cacheKey)
          props.formType === 'update' && PubSub.publish('updated_resource_form', true)
          notification.success({
            message: ITEM_UPDATE_SUCCESSFULLY
          })
          const newData = {...data, ...result}
          PubSub.publish('loaded_resource_form', newData)
          props?.setmetadata && props?.setmetadata((oldMetaData) => ({ ...oldMetaData, formData: newData }))
        }
      }
      props?.form?.handleFinish && props?.form?.handleFinish(true, {...result})
    }
  }, [])

  const onReset = () => {
    form.resetFields()
    if (props.formType === 'update') {
      handleLoadData()
    }
  };

  const handleSetFormMeta = () => {
    let prepareForm = []
    if (props?.form?.meta && props?.form?.meta.items.length > 0) {
      prepareForm = []
      props?.form?.meta.items.map((field) => {
        if (field?.widget) {
          field.widgetProps = {...field.widgetProps, form: form}
        }
        if (field?.can === undefined || (field?.can && ability.can('read', field?.can))) {
          prepareForm.push(field)
        }
      })
    }

    return prepareForm
  }

  useMount(() => setMounted(true))

  useEffect(() => {
    props.setForm && props.setForm(form)
    if (props?.idData && props.formType === 'update') {
      const url = `${props.apiEndpoint}/${props?.idData}`
      const combinedQuery = props?.form?.include ? {include: props?.form?.include} : {}
      setIdData(props.idData)
      setQuery(combinedQuery)
      // setCacheKey(`${fromString(url)}-${snakeCase(fromString(JSON.stringify(combinedQuery)))}`)
      setCacheKey(url)
      setDetailUrl(url)
    }
    const prepareForm = handleSetFormMeta()
    if (prepareForm.length > 0) {
      setFormMeta((oldForm) => ({...oldForm, fields: prepareForm}))
    }
  }, [])

  const handleLoadData = () => {
    if (data && formMeta) {
      PubSub.publish('loaded_resource_form', data)
      props?.setmetadata && props?.setmetadata((oldMetaData) => ({ ...oldMetaData, formData: data }))
      const prepareFormWithData = formMeta.fields.map((field) => {
        form.resetFields([field.key])
        if (field?.initialValue &&
          (
            field?.initialValue.hasOwnProperty('input') ||
            field?.initialValue.hasOwnProperty('type')
          )
        ) {
          if (field?.dependField) {
            form.setFieldsValue({
              [field.key]: {
                // [field.dependField]: data[field.dependField],
                input: data[field.key]
              },
            })
            field.initialValue = { input: data[field.key], [field.dependField]: data[field.dependField] }
            // field.initialValue = { defaultValue: data[field.key] }
          } else {
            if (field?.initialValue.fieldName) {
              if (Array.isArray(data[field.key])) {
                const defaultValues = data[field.key].map((item) => {
                  return {
                    value: item[field?.initialValue.idKey],
                    key: item[field?.initialValue.idKey],
                    label: item[field?.initialValue.fieldName]
                  }
                })
                field.initialValue.defaultValue = defaultValues
                field.initialValue.input = defaultValues
              } else {
                const defaultValue = {
                  value: data[field.key][field?.initialValue.idKey],
                  key: data[field.key][field?.initialValue.idKey],
                  label: data[field.key][field?.initialValue.fieldName]
                }
                field.initialValue.defaultValue = defaultValue
                field.initialValue.input = defaultValue
              }
            } else if (field?.initialValue.type) {
              form.setFieldsValue({ [field.key]: { input: data[field.key], type: field?.initialValue.type }})
            } else {
              form.setFieldsValue({ [field.key]: { input: data[field.key] }})
            }
          }
        } else {
          if (field.widget === 'date-picker') {
            form.setFieldsValue({ [field.key]: convertUTCToLocalTimezone(data[field.key], timezone) })
          } else {
            form.setFieldsValue({ [field.key]: data[field.key] })
          }
        }
        return field
      })
      setFormMeta((oldForm) => ({...oldForm, fields: prepareFormWithData}))
    }
  }

  useEffect(() => {
    handleLoadData()
  }, [data])

  /**
   * TODO: Will handle get from schema later
   */
  // useEffect(() => {
  //   let prepareForm = []
  //   if (schemaData?.data?.items?.fields) {
  //     Object.entries(schemaData?.data?.items?.fields).forEach(([key, field]: any) => {
  //       if (!['createdAt', 'deletedAt', 'updatedAt', 'id'].includes(key)) {
  //         let itemField = {
  //           key: key,
  //           label: titleCase(noCase(field.name)),
  //         }
  //         if (field.isRequired) itemField['required'] = true
  //         if (field.type == 'Int') itemField['widget'] = 'number'
  //         if (field.type == 'Boolean') itemField['widget'] = 'switch'
  //         if (field.kind === 'enum') {
  //           itemField['forwardRef'] = true
  //           itemField['widget'] = OGEnumInput
  //           itemField['initialValue'] = {
  //             type: field.type
  //           }
  //         }
  //         if (field.kind && field.relationName) itemField = null
  //         if (itemField) prepareForm.push(itemField)
  //       }
  //     })
  //   }
  //   const prepareFormMeta = handleSetFormMeta()
  //   if (prepareFormMeta.length > 0) prepareForm = prepareFormMeta
  //   if (prepareForm.length > 0) {
  //     setFormMeta((oldForm) => ({...oldForm, fields: prepareForm}))
  //   }
  // }, [schemaData])

  return (
    <>
      { props.formTitle &&
        <h1>{props?.formTitle}</h1>
      }
      <Form
        validateMessages={validateMessages}
        onFinish={handleFinish}
        style={props?.form?.style}
        form={form}
        layout={formMeta?.layout}
        initialValues={props?.form?.initialValues}
        requiredMark={props?.form?.requireMark}
      >
        <FormBuilder meta={formMeta} form={form} />
        {!props.form.hideButtonControl && <Form.Item style={{ textAlign: 'right' }}>
          <Space align="end">
            <Button htmlType="button" onClick={onReset}>Cancel</Button>
            <Button type="primary" htmlType="submit">{props.formType === "create" ? "Add" : "Save"}</Button>
          </Space>
        </Form.Item>}
        {/* {props?.children} */}
        
      </Form>
      
      <style jsx>{`
        h1 {
          font-size: 20px;
          margin-bottom: 16px;
        }
      `}</style>
    </>
  )
}

export default OGFormResources
