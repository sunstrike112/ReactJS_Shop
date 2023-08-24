/* eslint-disable react/prop-types */
import { Form } from 'antd'
import { debounce } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import AsyncCreatableSelect from 'react-select/async-creatable'
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
  .autocomplete__value-container {
    div:last-child {
      width: 100% !important;
      .autocomplete__input{
        width: 100% !important;
        input {
          width: 100% !important;
        }
      }
    }
  }

  .autocomplete__indicator {
    color: hsl(0, 0%, 60%);
  }
  
  .autocomplete__menu-list {
    overflow-x: hidden;
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const AutoComplete = ({
  lable,
  classNamePrefix = 'autocomplete',
  customWrapperClass,
  customInputClass,
  customLabelClass,
  handleSuggestion,
  handleSelect,
  handleBlur,
  setValue,
  t,
  touched,
  error,
  isInvalid,
  value,
  disabled,
  placeholder = 'common:placeholder_autocomplete',
  creatable = false,
  ...rest
}) => {
  // const [hasValue, setHasValue] = useState(false)
  const handleSelectItem = useCallback((selectedValue) => {
    if (selectedValue) {
      // setHasValue(true)
      if (handleSelect) handleSelect(selectedValue)
      setValue(selectedValue)
    } else {
      // setHasValue(false)
      if (handleSelect) handleSelect(null)
      setValue(null)
    }
  }, [])

  const handleLoadOptions = useCallback(
    debounce((inputValue, callback) => {
      handleSuggestion(inputValue.trim())
        .then((options) => {
          callback(options)
        })
        .catch(() => callback([]))
    }, 500),
    []
  )

  useEffect(() => {
    if (value) {
      // setHasValue(true)
    }
  }, [value])

  const AsyncSuggestion = useMemo(() => (creatable ? AsyncCreatableSelect : AsyncSelect), [creatable])

  return (
    <div className={`form-floating ${customWrapperClass || ''}`}>
      <AsyncSuggestion
        className={`${customInputClass || 'form-control-autocomplete'} ${isInvalid ? 'input-error' : ''}`}
        classNamePrefix={classNamePrefix}
        onBlur={handleBlur}
        onChange={handleSelectItem}
        // onInputChange={(text) => setHasValue(!!value || !!text)}
        cacheOptions
        defaultOptions
        loadOptions={handleLoadOptions}
        isClearable
        value={value}
        noOptionsMessage={() => t('common:no_result_found')}
        formatCreateLabel={(input) => t('common:createOption', { input })}
        isDisabled={disabled}
        placeholder={t(placeholder)}
        components={{
          LoadingIndicator: null
        }}
        {...rest}
      />
      {/* <label
        className={`${hasValue ? 'placeholder-floating' : ''} ${
          customLabelClass || ''
        }`}
      >
        {lable}
      </label> */}
      {/* <FormError touched={touched} error={error} /> */}
    </div>
  )
}

const MemorizeAutoComplete = memo(AutoComplete)

const FormAutoComplete = (props) => {
  const { control } = useFormContext()
  const { label, name, rules, defaultValue, wrapperProps, handleSelect, handleSuggestion } = props

  const {
    field: { onBlur, value, onChange: setValue },
    fieldState: { error, isTouched: touched }
  } = useController({ name, control, rules, defaultValue })

  const handleBlur = useCallback(onBlur, [onBlur])
  const isInvalid = useMemo(() => touched && error, [touched, error])

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      help={error?.message}
    >
      <MemorizeAutoComplete
        {...props}
        {...{
          handleSelect,
          handleBlur,
          setValue,
          handleSuggestion,
          value,
          touched,
          error,
          isInvalid
        }}
      />
    </WrapperFormItem>
  )
}

export default memo(FormAutoComplete)
