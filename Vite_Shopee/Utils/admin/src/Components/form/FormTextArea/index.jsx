/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Text } from 'Components'
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

  p {
    margin-top: 5px;
  }

  .ant-form-item-children-icon {
	display: none;
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormTextArea = ({
  label,
  name,
  rules,
  defaultValue = '',
  wrapperProps,
  total,
  showTextCount = true,
  t,
  ...rest
}) => {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control, rules, defaultValue })
  const [trans] = useTranslation(['common'])

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (value) {
      setCount(value.length)
    } else {
      setCount(0)
    }
  }, [value])

  const handleChange = useCallback((e) => {
    const val = e.target.value
    onChange(val)
  }, [])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={t ? t(error?.message) : error?.message}
      validateStatus={error ? 'error' : ''}
    >
      <Input.TextArea onChange={handleChange} value={value} {...rest} />
      {showTextCount && (
        <Text.primary fontSize="size_12" color={count > total ? 'red' : null}>
          {trans('editor_count_message', { count, total })}
        </Text.primary>
      )}
    </WrapperFormItem>
  )
}

export default FormTextArea
