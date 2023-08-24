import React from 'react'
import {
  Input,
  Select,
} from 'antd'
import { stringOperatorFilter } from './operators-filter.organism'

/* eslint-disable-next-line */
export interface OGStringFilterProps {
  value: {
    input?: string,
    operator?: any
  };
  onChange?: any;
}

export function OGStringFilter(props: OGStringFilterProps) {

  const onChange = (e) => {
    props.value.input = e.target.value
  }

  const onOperatorChange = (operator) => {
    props.value.operator = operator
  }

  return (
    <Input
      defaultValue={props?.value?.input}
      addonBefore={stringOperatorFilter({ operator: props.value.operator, onChange: onOperatorChange })}
      onChange={onChange}
    />
  )
}

export default OGStringFilter
