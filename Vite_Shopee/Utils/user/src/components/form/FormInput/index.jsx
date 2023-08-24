/* eslint-disable react/prop-types */
import React from 'react'
import { Form, Input } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 15px;

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
    border-color: ${({ theme }) => theme.grey_blur};
    &:focus {
      box-shadow: none;
      border-color: ${({ theme }) => theme.success};
    }
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

const FormInput = ({ label, name, rules, defaultValue = '', wrapperProps, isRequired = false, disabled = false, t, ...rest }) => {
  const { control } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label
        && (
        <WrapperLabel>
          {label}&nbsp;{isRequired && <span style={{ color: 'red' }}>*</span>}
        </WrapperLabel>
        )}
      validateStatus={(error) ? 'error' : ''}
      help={t(error?.message)}
    >
      <Input
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...rest}
      />
    </WrapperFormItem>
  )
}

export default FormInput
