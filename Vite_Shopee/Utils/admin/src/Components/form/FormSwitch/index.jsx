/* eslint-disable react/prop-types */
import React from 'react'
import { Form, Switch } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

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
  .ant-switch-checked {
    background: #5d4eb3;
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormSwitch = ({ label, name, rules, defaultValue = '', wrapperProps, ...rest }) => {
  const { control } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={(error) ? 'error' : ''}
      help={error?.message}
    >
      <Switch
        onChange={onChange}
        checked={value}
        {...rest}
      />
    </WrapperFormItem>
  )
}

export default FormSwitch
