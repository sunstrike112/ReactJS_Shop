/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { Form, Input } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { isNaN } from 'lodash'

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
  }

  .ant-form-item-label {
    font-size: 14px;
    overflow: unset;
    white-space: unset;
    .ant-form-item-no-colon {
      height: 100%;
    }
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormNumber = ({ label, name, rules, defaultValue = '', wrapperProps, ...rest }) => {
  const { control } = useFormContext()
  const { field: { onChange, onBlur, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })

  const handleChange = useCallback((e) => {
    const { value: val } = e.target
    const reg = /^-?(\d)*(\.\d*)?$/
    if ((!isNaN(val) && reg.test(val)) || val === '' || val === '-') {
      onChange(val)
    }
  }, [onChange])

  const handleBlur = useCallback(() => {
    if (value) {
      let valueTemp = value
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1)
      }
      onChange(valueTemp.replace(/0*(\d+)/, '$1'))
      if (onBlur) {
        onBlur()
      }
    }
  }, [value, onChange, onBlur])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={error?.message}
      validateStatus={error ? 'error' : ''}
    >
      <Input
        {...rest}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </WrapperFormItem>
  )
}

export default FormNumber
