/* eslint-disable react/prop-types */
import React from 'react'
import { Form, Input } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Dropdown } from '../..'

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 50%;
  margin-bottom: 10px;

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
  }

  .ant-form-item-label {
    font-size: 14px;
    overflow: unset;
    white-space: unset;
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const InputSmall = ({ label, name, type, placeholder, defaultDropdown, options, isMulti }) => {
  const { control, errors, touchedFields } = useFormContext()
  const renderBaseOnType = (field) => {
    switch (type) {
      case 'select':
        return <Dropdown options={options} defaultValue={defaultDropdown} onChange={field.onChange} isMulti={isMulti} />
      default:
        return <Input {...field} placeholder={placeholder} />
    }
  }
  return (
    <WrapperFormItem
      colon={false}
      labelCol={{ span: 9 }}
      wrapperCol={{ span: 15 }}
      label={<WrapperLabel>{label}</WrapperLabel>}
      hasFeedback
      help={!!errors && errors?.[name] && errors?.[name]?.message}
      validateStatus={errors?.[name]?.message ? 'error' : touchedFields?.[name] ? 'success' : ''}
    >
      <Controller control={control} name={name} render={({ field }) => renderBaseOnType(field)} />
    </WrapperFormItem>
  )
}

export default InputSmall
