import React from 'react'
import { Form, Input, Radio, DatePicker, Checkbox } from 'antd'
import styled from 'styled-components'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import Dropdown from '../../dropdown'
import EditorComponent from '../../editor'
import { SocialButton } from '../..'

const Label = styled.div``
const Optional = styled.div`
	background-color: ${({ required }) => (required ? '#f0ad4e' : '#777')};
	color: ${({ theme }) => theme.white};

	border-radius: 4px;
	padding: 2px 6px;
	font-size: 11px;
	font-weight: bold;
`
const WrapperLabel = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`

const WrapperFormItem = styled(Form.Item)`
	margin-bottom: 0;
	border: 0.5px solid ${({ theme }) => theme.text_secondary};

	&:not(:first-child) {
		border-top: none;
	}

	.ant-form-item-label-left {
		background-color: #ecf0f1;
		padding: 14px 0.25rem 0 0.5rem;
	}

	.ant-form-item-control {
		padding: 14px;
	}

	.ant-input {
		min-height: 38px;
		border-radius: 4px;
	}

	.ant-picker {
		width: 100%;
		min-height: 40px;
		border-radius: 4px;
	}

	.ant-checkbox-group {
		display: flex;
		.ant-checkbox-group-item {
			width: max-content;
		}
	}

	label {
		width: 100%;
		height: auto;
	}

	${Label} {
		color: ${({ theme, validateStatus }) => theme[validateStatus]};
	}
`

export default function FormInput({
  name = '',
  label = '',
  placeholder = '',
  required,
  type,
  defaultDropdown,
  options,
  UploadForm,
  radioOptions,
  checkboxOptions,
  onClick
}) {
  const { control, errors, touchedFields } = useFormContext()

  const renderBaseOnType = (field) => {
    switch (type) {
      case 'select':
        return (
          <Dropdown
            options={options}
            defaultValue={defaultDropdown}
            onChange={field.onChange}
          />
        )
      case 'upload':
        return UploadForm
      case 'radio':
        return (
          <Radio.Group {...field}>
            {radioOptions.map((radioOption) => (
              <Radio value={radioOption.value}>{radioOption.name}</Radio>
            ))}
          </Radio.Group>
        )
      case 'editor':
        return <EditorComponent onChange={field.onChange} />
      case 'date':
        return <DatePicker onChange={field.onChange} format="YYYY/MM/DD" />
      case 'checkbox':
        return (
          <Checkbox.Group options={checkboxOptions} onChange={field.onChange} />
        )
      case 'button':
        return (
          <SocialButton
            title={label}
            background="blueHight"
            onClick={onClick}
          />
        )
      default:
        return <Input {...field} placeholder={placeholder} />
    }
  }

  return (
    <WrapperFormItem
      colon={false}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      labelAlign="left"
      label={(
        <WrapperLabel>
          <Label>{label}</Label>
          <Optional required={required}>
            {required ? 'Required' : 'Optional'}
          </Optional>
        </WrapperLabel>
		)}
      hasFeedback
      help={!!errors && errors?.[name] && errors?.[name]?.message}
      validateStatus={
			errors?.[name]?.message ? 'error' : touchedFields?.[name] ? 'success' : ''
		}
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => renderBaseOnType(field)}
      />
    </WrapperFormItem>
  )
}

FormInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  help: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  defaultDropdown: PropTypes.any,
  options: PropTypes.any,
  UploadForm: PropTypes.any,
  radioOptions: PropTypes.any,
  checkboxOptions: PropTypes.any,
  onClick: PropTypes.any
}
