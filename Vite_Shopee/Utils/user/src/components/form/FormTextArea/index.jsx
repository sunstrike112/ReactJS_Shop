/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState, forwardRef } from 'react'
import { Form, Input } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { TextNormal } from '../../text'

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    &:focus {
      box-shadow: 0 0 0 1px ${({ theme }) => theme.success};
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

  p {
    margin-top: 5px;
    text-align: right;
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
  isRequired = false,
  limitText = 0,
  t,
  disabled = false,
  ...rest
}, ref) => {
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
    setCount(val.length)
  }, [])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label
        && (
        <WrapperLabel>
          {label}&nbsp;{isRequired && <span style={{ color: 'red' }}>*</span>}
        </WrapperLabel>
        )}
      help={t(error?.message)}
      validateStatus={error ? 'error' : ''}
    >
      <Input.TextArea ref={ref} onChange={handleChange} value={value} disabled={disabled} {...rest} />
      {total && (
      <TextNormal
        color={count > total ? 'text_error' : 'text_secondary'}
        fontSize="size_12"
        style={{ position: 'absolute', right: '0px' }}
      >
        {`${count}/${total}`}
      </TextNormal>
      )}

    </WrapperFormItem>
  )
}

export default forwardRef(FormTextArea)
