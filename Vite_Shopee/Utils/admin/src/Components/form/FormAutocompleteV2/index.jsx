/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { Form, AutoComplete, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useController, useFormContext } from 'react-hook-form'

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
  
  .ant-select-auto-complete {
    min-height: 38px;
    input {
      min-height: 38px;
    }
    .ant-select-selection-placeholder {
      line-height: 38px;
    }
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormAutoCompleteV2 = ({ label, name, rules, defaultValue = '', loading = false, wrapperProps, options = [], dropdownClassName, ...rest }) => {
  const { control } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })
  const [trans] = useTranslation('common')

  // E-7488: check condition to show scroll down with items > 5
  const dropdownClass = useMemo(() => {
    let sum = 0
    for (let i = 0; i < options.length; i += 1) {
      if (sum > 5) return sum
      sum += options[i].options.length
    }
    if (sum === 0) return ''
    if (sum > 5) {
      return 'has-scroll'
    }
    return 'no-scroll'
  },
  [options])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={(error) ? 'error' : ''}
      help={error?.message}
    >
      <AutoComplete
        placeholder={trans('select')}
        notFoundContent={loading
          ? <div style={{ display: 'flex', justifyContent: 'center' }}><Spin /></div>
          : trans('noOption')}
        options={options}
        value={value}
        loading={loading}
        onChange={onChange}
        dropdownClassName={dropdownClass}
        {...rest}
        listHeight={200}
      />
    </WrapperFormItem>
  )
}

export default FormAutoCompleteV2
