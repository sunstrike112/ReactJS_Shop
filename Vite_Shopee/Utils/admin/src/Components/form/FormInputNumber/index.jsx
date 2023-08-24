/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { Form, InputNumber } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
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

	.input-number {
		display: flex;
		border: 1px solid #d9d9d9;
		border-radius: 2px;

		.ant-input-number {
			border: none;
			border-radius: ${({ prefix }) => (prefix ? '0 1rem 1rem 0' : '1rem')};
			width: 100%;
			.ant-input-number-handler-wrap {
				display: ${({ isHideButtonHandle }) => isHideButtonHandle && 'none'};
				.ant-input-number-handler-up {
					border-top-right-radius: 1rem;
				}
				.ant-input-number-handler-down {
					border-bottom-right-radius: 1rem;
				}
			}
		}

		.prefix {
			display: flex;
			align-items: center;
			padding: 0 8px;
			background-color: #fafafa;
			border-right: 1px solid #d9d9d9;
		}
	}
`

const WrapperLabel = styled.div`
	width: 100%;
	font-size: 13px;
`

const FormInputNumber = ({
  label,
  name,
  rules,
  defaultValue = '',
  prefix = '￥',
  wrapperProps,
  maxLength = null,
  isHideButtonHandle = false,
  isTypingDot = true,
  ...rest
}) => {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control, rules, defaultValue })

  const handleKeyDown = useCallback(
    (e) => {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106)
					|| (e.keyCode > 47 && e.keyCode < 58)
					|| (e.keyCode === 190 && isTypingDot)
					|| e.keyCode === 8
        )
      ) {
        e.preventDefault()
      }
      if (maxLength) {
        if (e.target.value.length === maxLength && !(e.keyCode === 8)) {
          e.preventDefault()
        }
      }
    },
    [maxLength, isTypingDot]
  )

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={error ? 'error' : ''}
      help={error?.message}
      prefix={prefix}
      isHideButtonHandle={isHideButtonHandle}
    >
      <div className="input-number">
        {prefix && <div className="prefix">{prefix}</div>}
        <InputNumber
          type="number"
          onChange={onChange}
          onKeyDown={handleKeyDown}
          value={value}
          {...rest}
        />
      </div>
    </WrapperFormItem>
  )
}

export default FormInputNumber
