/* eslint-disable react/prop-types */
import React from 'react'
import { Checkbox, Form, Input, Spin } from 'antd'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../themes'
import { SubmitButton } from '..'

const FormItemWrapper = styled(Form.Item)`
  .ant-form-item-label {
    padding: 0;
    label {
      font-size: 14px;
      font-weight: 600;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
        font-size: 13px;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
        font-size: 12px;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
        font-size: 11px;
      }
    }
  }
  .ant-input {
    border-radius: 4px;
    padding: 10px 8px;
    box-shadow: none;
    &:focus {
      border-color: ${({ theme }) => theme.green};
    }
    &:hover {
      border-color: ${({ theme }) => theme.green};
    }
  }
  .ant-input-password {
    padding: 10px 8px;
    border-radius: 4px;
    box-shadow: none;
    &:focus {
      border-color: ${({ theme }) => theme.green};
    }
    &:hover {
      border-color: ${({ theme }) => theme.green};
    }
  }
  .ant-input-affix-wrapper-focused {
    border-color: ${({ theme }) => theme.green};
  }
  .ant-checkbox-wrapper {
    font-size: 14px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      font-size: 13px;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      font-size: 12px;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      font-size: 11px;
    }
  }
  button {
    border-radius: 6px;
    padding: 15px 60px;
    left: 50%;
    transform: translateX(-50%);
  }
  .ant-btn[disabled] {
    background: ${({ theme }) => theme.grey_disable};
  }
  .input__disabled {
    pointer-events: none;
  }
`
const renderContent = (type, labelCheckbox, nameButton, form, validatesSubmit, isLoading) => {
  switch (type) {
    case 'password':
      return <Input.Password />
    case 'checkbox':
      return <Checkbox>{labelCheckbox}</Checkbox>
    case 'disable':
      return <Input disabled className="input__disabled" />
    case 'submit':
      return <SubmitButton title={nameButton} />
    case 'submitValidate':
      return () => (
        <Spin spinning={isLoading}>
          <SubmitButton
            title={nameButton}
            disabled={
              !form.isFieldsTouched(validatesSubmit)
              || form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          />
        </Spin>
      )
    default:
      return <Input />
  }
}

const InputAnt = ({
  name,
  nameButton,
  label,
  labelCheckbox,
  required = false,
  rules,
  type,
  shouldUpdate,
  form,
  validatesSubmit,
  isLoading = false,
  ...rest
}) => (
  <FormItemWrapper
    name={name}
    label={label}
    required={required}
    rules={rules}
    shouldUpdate={shouldUpdate}
    {...rest}
  >
    {renderContent(type, labelCheckbox, nameButton, form, validatesSubmit, isLoading)}
  </FormItemWrapper>
)

export default InputAnt
