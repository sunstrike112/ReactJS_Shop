/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { DatePicker, ConfigProvider } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import { WrapperFormItem, WrapperLabel } from './styled'

const FormDatePicker = ({
  label,
  name,
  rules,
  defaultValue = '',
  wrapperProps,
  wrapperStyles,
  forceError,
  hideError,
  useDate,
  inputwidth = 100,
  widthdatepicker,
  ...rest
}) => {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control, rules, defaultValue })

  const valueProps = useMemo(() => (useDate ? { value } : {}), [value])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={hideError ? undefined : error?.message}
      validateStatus={error || forceError ? 'error' : ''}
      style={wrapperStyles}
      inputwidth={inputwidth}
      widthdatepicker={widthdatepicker}
    >
      <button id="popup-container" type="button" onMouseDown={(e) => e.preventDefault()}>
        <ConfigProvider getPopupContainer={() => document.getElementById('popup-container')}>
          <DatePicker
            onChange={(date, dateString) => (useDate ? onChange(date) : onChange(dateString))}
            allowClear
            inputReadOnly
            {...rest}
            {...valueProps}
          />
        </ConfigProvider>
      </button>
    </WrapperFormItem>
  )
}

export default FormDatePicker
