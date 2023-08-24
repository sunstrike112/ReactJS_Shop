import React, { useEffect } from 'react'
import {
  InputNumber,
} from 'antd'
import { OGPostCodeInput } from '@ss-fe-fw/shared/ui'

/* eslint-disable-next-line */
export interface OGPostCodeFilterProps {
  value: {
    input?: any,
    form?: any;
  };
  onChange?: any;
}

export function OGPostCodeFilter(props: OGPostCodeFilterProps) {

  const onChange = (val) => {
    props.value.input = val
  }

  return (
    <OGPostCodeInput
      input={props?.value?.input}
      form={props?.value?.form}
      onChange={onChange}
    />
  )
}

export default OGPostCodeFilter
