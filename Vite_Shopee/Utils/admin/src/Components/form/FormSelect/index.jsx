/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react'
import { Form } from 'antd'
import Select, { createFilter } from 'react-select'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { checkTypeOf } from 'Utils'

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

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
    color: ${({ theme }) => theme.text_primary};
    font-size: .8rem;
    font-weight: 600;
    border: 1px solid #f8f9fa;
    background-color: #f8f9fa;
    border-radius: 1rem !important;
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    .select__placeholder {
      color: ${({ theme }) => theme.text_placeholder};
    }

    &:focus, &:hover {
      color: #323232;
      background-color: #f8f9fa;
      border-color: #b6aee9;
      outline: 0;
      box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%), 0 0 0 0.25rem rgb(108 93 211 / 25%);
    }
  }

  .select__menu-list {
    max-height: ${({ heightdropdown }) => `${heightdropdown}px`};
    border-radius: 4px;
    overflow-x: hidden;
  }
  .ant-form-item-control-input {
    color: ${({ theme }) => theme.text_primary};
    font-size: .8rem;
    font-weight: 600;
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

const colourStyles = {
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? '#b6aee9' : '#ffffff',
    color: '#000000',
    ':active': {
      ...styles[':active'],
      backgroundColor: isFocused ? '#b6aee9' : '#ffffff'
    }
  })
}

const FormSelect = ({ t, label, name, rules, defaultValue = '', wrapperProps, isClearable = true,
  classname = 'select-container', classNamePrefix = 'select', options = [], optionNotTrans = [], heightdropdown = 300, disabled = false, isSearchable = true, ...rest }) => {
  const { control, setValue } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })

  const [trans] = useTranslation('common')

  const opts = useMemo(() => options.map((opt) => ({ ...opt, label: trans(opt.label) })), [options, trans])
  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    stringify: (option) => `${option.label}`
  }

  useEffect(() => {
    const typeOfValue = checkTypeOf(value)
    if (value && typeOfValue === 'Object') {
      const currentValue = options.find((opt) => value.value === opt.value)
      // Reset value for match lang when change lang
      if (currentValue && currentValue.label) {
        setValue(name, { ...currentValue, label: trans(currentValue.label) })
      }
    }
  }, [trans])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{trans(label)}</WrapperLabel>}
      validateStatus={(error) ? 'error' : ''}
      help={error?.message}
      heightdropdown={heightdropdown}
    >
      <Select
        className={classname}
        classNamePrefix={classNamePrefix}
        placeholder={trans('select')}
        noOptionsMessage={() => trans('noOption')}
        options={optionNotTrans.length > 0 ? optionNotTrans : opts}
        value={value}
        onChange={onChange}
        isClearable={isClearable}
        styles={colourStyles}
        filterOption={createFilter(filterConfig)}
        isDisabled={disabled}
        isSearchable={isSearchable}
        {...rest}
      />
    </WrapperFormItem>
  )
}

export default FormSelect
