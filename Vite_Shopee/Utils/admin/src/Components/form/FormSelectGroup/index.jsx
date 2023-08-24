/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useMemo, memo } from 'react'
import { Form, Select } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

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

  .select__menu {
	  z-index: 10;
  }

  .select__control {
    border: ${({ validateStatus, theme }) => (validateStatus === 'error' ? `1px solid ${theme.error_ant} !important` : '')};
    box-shadow: ${({ validateStatus }) => (validateStatus === 'error' ? 'none' : '')};
  }

  .ant-form-item-children-icon {
    display: none;
  }

  .select__dropdown-indicator {
    color: hsl(0, 0%, 60%);
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const { Option, OptGroup } = Select

const FormSelectGroup = ({ label, name, rules, defaultValue = '', wrapperProps, options = [], ...rest }) => {
  // options type: [{ label: 'Parent', children: [{ value: value, label: 'label' }] }]
  const { control } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })
  const [trans] = useTranslation('common')

  const opts = useMemo(() => options.map((opt) => {
    const { labelGroup, ...propsGroup } = opt
    return (
      <OptGroup key={labelGroup} label={trans(labelGroup)} {...propsGroup}>
        {opt.children.map((optChild) => {
          const { value: valueChild, label: labelChild, ...propsChild } = optChild
          return <Option key={valueChild} value={valueChild} {...propsChild}>{trans(labelChild)}</Option>
        })}
      </OptGroup>
    )
  }), [options, trans])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={(error) ? 'error' : ''}
      help={error?.message}
    >
      <Select
        placeholder={trans('select')}
        notFoundContent={() => trans('noOption')}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {opts}
      </Select>
    </WrapperFormItem>
  )
}

export default memo(FormSelectGroup)
