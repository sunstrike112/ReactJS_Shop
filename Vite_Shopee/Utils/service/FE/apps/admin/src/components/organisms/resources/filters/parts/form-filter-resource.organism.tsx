import React, { Component, useState, useEffect } from 'react'
import {
  Form,
  Spin,
} from 'antd'
import FormBuilder from 'antd-form-builder'
import {
  OGNumberFilter,
  OGStringFilter,
  OGBooleanFilter,
  OGDateFilter,
  OGEnumFilter,
  OGRelationsFilter,
} from '../elements'
import { noCase } from "change-case"
import { titleCase } from "title-case"
import { useAbility } from '@casl/react'
import { AbilityContext } from '@ss-fe-fw/utils/can'

/* eslint-disable-next-line */
export interface OGFormFilterResourceProps {
  form?: any;
  fields: any;
  schema: any[];
  relations?: any[];
  isLoading?: boolean;
  isError?: boolean;
  handleFormFinish?: any;
  initValueTags?: any;
  isReset?: boolean;
}

export function OGFormFilterResource(props: OGFormFilterResourceProps) {
  const [schema, setSchema] = useState(props?.schema)
  const [isReset, setIsReset] = useState(false)
  const [metaForm, setMetaForm]  = useState(null)
  const ability = useAbility(AbilityContext);

  const handleFinish = React.useCallback(values => {
    props.handleFormFinish(values)
  }, [])

  const handleRenderFilterForm = () => {
    let formFields: any = []
    schema.forEach((schemaItem, index) => {
      // Custom filter field is array object, and list filter fields on schema API is string[]
      // So, we need to convert it to array object is standard
      schemaItem = schemaItem.hasOwnProperty('key') ? schemaItem : { key: schemaItem }

      const [initTag] = props.initValueTags.filter((tag) => tag.key === schemaItem.key)
      let fieldObj: any = {
        key: schemaItem.key,
        label: schemaItem?.label ?? titleCase(noCase(schemaItem.key)),
        widget: OGStringFilter,
        forwardRef: true,
        initialValue: { input: initTag ? initTag?.item.input : null, operator: initTag ? initTag?.item.operator : 'equals' }
      }
      // Case custom element filter
      if (schemaItem.component && schemaItem.component.element) {
        fieldObj.widget = schemaItem.component.element
        let componentValue = schemaItem?.component?.value
        const operator = schemaItem?.component?.value?.operator ?? 'equals'

        componentValue = {
          ...componentValue,
          ...{
            input: initTag?.item?.input ?? null,
            operator: initTag ? initTag?.item.operator : operator
          }
        }
        if (schemaItem.component.value.hasOwnProperty('defaultValue')) {
          componentValue = {...componentValue, ...{ defaultValue: initTag?.item?.input ?? [] }}
        }
        if (schemaItem.component.value.hasOwnProperty('form')) {
          componentValue = {...componentValue, ...{ form: props.form }}
        }
        if (schemaItem.component.hasOwnProperty('can') && !ability.can('read', schemaItem.component.can)) {
          fieldObj = null
        } else {
          schemaItem?.component?.value && (fieldObj.initialValue = componentValue)
        }
      } else {
        if (props.fields[schemaItem.key].type === 'Int' || props.fields[schemaItem.key].type === 'Float') {
          fieldObj.widget = OGNumberFilter
        }
        if (props.fields[schemaItem.key].type === 'Boolean') {
          fieldObj.widget = OGBooleanFilter
        }
        if (props.fields[schemaItem.key].type === 'DateTime') {
          fieldObj.widget = OGDateFilter
          fieldObj.initialValue = {
            input: initTag ? initTag?.item.input : { from: null, to: null },
            operator: initTag ? initTag?.item.operator : 'equals'
          }
        }
        if (props.fields[schemaItem.key].kind === 'enum') {
          fieldObj.widget = OGEnumFilter
          fieldObj.initialValue = {
            input: initTag ? initTag?.item.input : null,
            operator: initTag ? initTag?.item.operator : 'equals', type: props.fields[schemaItem.key].type
          }
        }
        // Handle Filter for relations
        if (props.fields[schemaItem.key].kind === 'object' && props.fields[schemaItem.key].relationName) {
          if (props.relations) {
            const relationItem = props.relations.filter((_item) => _item.name == props.fields[schemaItem.key].name)
            if (relationItem.length > 0 &&
              ability.can('read', props.fields[schemaItem.key].type)
            ) {
              fieldObj.widget = OGRelationsFilter
              fieldObj.initialValue = {
                input: initTag?.item?.input ?? null,
                operator: 'in',
                idKey: relationItem[0].idKey,
                fieldName: relationItem[0].field,
                relationName: relationItem[0].name,
                defaultValue: initTag?.item?.input ?? []
              }
            } else {
              fieldObj = null
            }
          } else {
            fieldObj = null
          }
        }
      }

      fieldObj && formFields.push(fieldObj)
    })

    let prepareForm = {
      columns: 1,
      formItemLayout: null,
      initialValues: {},
      fields: formFields
    };

    // console.log(moment().utcOffset())
    // console.log(moment().utcOffset(-420).toISOString())
    setMetaForm(prepareForm)
  }

  useEffect(() => {
    if (props.isReset) {
      setIsReset(props.isReset)
    }
  }, [props.isReset])

  useEffect(() => {
    schema && handleRenderFilterForm()
  }, [schema])

  useEffect(() => {
    if (props.isReset) {
      props.form.resetFields()
      handleRenderFilterForm()
      setIsReset(false)
    }
  }, [isReset])

  return (
    <>
      {props?.isLoading && <Spin />}
      {props?.isError && <h1>Error</h1>}
      {schema &&
        <Form
          onFinish={handleFinish}
          layout="vertical"
          form={props.form}
        >
          <FormBuilder meta={metaForm} form={props.form} />
        </Form>
      }
    </>
  )
}

export default OGFormFilterResource
