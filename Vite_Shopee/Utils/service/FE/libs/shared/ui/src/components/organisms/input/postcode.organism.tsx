import React, { useState, useEffect } from 'react'
import {
  Input,
} from 'antd'

/* eslint-disable-next-line */
export interface OGPostCodeInputProps {
  input?: any;
  style?: any;
  form?: any;
  onChange?: any;
}

export function OGPostCodeInput(props: OGPostCodeInputProps) {
  const [input, setInput] = useState(props?.input)
  const reg = /^\d{4}?$/ // /^[0-9]{4}$/

  const onChange = (e: any) => {
    const value = e?.target?.value ?? e;
    setInput(value)
    props?.form.resetFields(['suburb'])

    if (reg.test(value)) {
      props?.form.setFieldsValue({ suburb: { input: null, postCode: value } })
    } else {
      props?.form.setFieldsValue({ suburb: { input: null, postCode: null } })
    }
    props?.onChange(value)
  }

  const onBlur = (e: any) => {
    const regBlur = /^\d+?$/
    const value = e?.target?.value;
    if (!regBlur.test(value)) {
      props?.form.resetFields(['postCode'])
      setInput(null)
      props?.onChange(null)
    }
  }

  useEffect(() => {
    if (props?.input) {
      // onChange(props?.input)
      if (props?.form.getFieldValue('suburb')) {
        const value = { suburb: { input: props?.form.getFieldValue('suburb').input, postCode: props?.input } }
        props?.form.setFieldsValue(value)
      }
    }
  });

  return (
    <Input
      style={props?.style}
      defaultValue={input}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={4}
      min={0}
    />
  )
}

export default OGPostCodeInput
