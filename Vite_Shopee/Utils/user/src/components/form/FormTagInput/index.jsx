/* eslint-disable react/prop-types */
import { Empty, Form, Select } from 'antd'
import React, { useEffect } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
  .ant-select-show-search.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    padding: 5px;
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormTagInput = ({ label, name, rules, defaultValue = '', wrapperProps, listOption, maxLength, t, ...rest }) => {
  const { control } = useFormContext()
  const [trans] = useTranslation()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })

  useEffect(() => {
    if (maxLength) document.querySelector('.ant-select-selection-search-input').setAttribute('maxlength', maxLength)
  }, [])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={(error) ? 'error' : ''}
      help={error?.message}
    >
      <Select
        style={{ width: '100%' }}
        options={listOption}
        mode="tags"
        allowClear
        notFoundContent={<Empty description={trans('common.no_option')} />}
        onChange={onChange}
        value={value}
        {...rest}
      />

    </WrapperFormItem>
  )
}

export default FormTagInput
