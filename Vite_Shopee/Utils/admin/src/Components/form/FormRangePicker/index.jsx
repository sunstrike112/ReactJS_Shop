/* eslint-disable react/prop-types */
import React from 'react'
import { Form, DatePicker } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

  .ant-picker {
    min-height: 38px;
    color: ${({ theme }) => theme.text_primary};
    font-size: .8rem;
    font-weight: 600;
    border: 1px solid #f8f9fa;
    background-color: #f8f9fa;
    border-radius: 1rem !important;
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    &:focus, &:hover {
      color: #323232;
      background-color: #f8f9fa;
      border-color: #b6aee9;
      outline: 0;
      box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%), 0 0 0 0.25rem rgb(108 93 211 / 25%);
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

  // wrap button outside to fix auto close calendar when click outside input
  button {
	  border: none;
	  padding: 0;
	  background-color: transparent;
    width: 100%;
    .ant-picker {
      width: 100%;
    }
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormRangePicker = ({
  label,
  name,
  rules,
  defaultValue = '',
  wrapperProps,
  wrapperStyles,
  forceError,
  hideError,
  useDate,
  ...rest
}) => {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control, rules, defaultValue })

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={!hideError && error?.message}
      validateStatus={error || forceError ? 'error' : ''}
      style={wrapperStyles}
    >
      <DatePicker.RangePicker
        onChange={onChange}
        value={value}
        allowClear
        inputReadOnly
        style={{ width: '100%' }}
        {...rest}
      />
    </WrapperFormItem>
  )
}

export default FormRangePicker
