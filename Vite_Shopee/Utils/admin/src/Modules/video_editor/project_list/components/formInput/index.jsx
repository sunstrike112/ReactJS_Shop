/* eslint-disable react/prop-types */
import React from 'react'
import { Form, Input } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  /* width: 100%; */
  /* margin-bottom: 10px; */
  margin: 0;
  width: ${({ width }) => `${width}px`};

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormInput = ({ label, width = 300, name, rules, defaultValue = '', wrapperProps, ...rest }) => {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control, rules: { required: true }, defaultValue })

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={(error) ? 'error' : ''}
      help={error?.message}
      width={width}
    >
      <Input
        onChange={onChange}
        value={value}
        {...rest}
      />
    </WrapperFormItem>
  )
}

export default FormInput
