import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import lodash from 'lodash'
import { Select as AntdSelect } from 'antd'

const StyledSelect = styled(AntdSelect)`
  width: 100%;
  &.ant-select-single, &.ant-select-multiple {
    .ant-select-selector {
      font-size: 16px;
      height: 48px;
      border: none;
      // border-radius: 6px;
      outline: none;
      // box-shadow: 0 2px 4px 0 rgba(142, 142, 142, 0.2)!important;
      transition: border-color 0.2s;
      // border: solid 1px ${({ theme }) => theme.text_primary};
      color: ${({ theme }) => theme.text_primary};
      
      .ant-select-selection-placeholder, .ant-select-selection-item {
        line-height: 48px;
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
        }
      }
      
      .ant-select-selection-placeholder {
        border: solid 1px ${({ theme }) => theme.text_primary};
        color: ${({ theme }) => theme.text_primary};
      }
    }
    
    .ant-select-arrow {
      .anticon-caret-down {
        pointer-events: none;
      }
    }
  }
  
  &.error {
    &.ant-select-single {
      .ant-select-selector {
        border: solid 1px red;
      }
    }
  }
  
  &.ant-select-size-small {
    &.ant-select-single {
      .ant-select-selector {
        height: 40px;
        box-shadow: none!important;
        padding: 0 10px;
        
        .ant-select-selection-search {
          input {
            height: 40px;
          }
        }
        
        .ant-select-selection-placeholder, .ant-select-selection-item {
          line-height: 40px;
          font-size: 14px;
        }
      }
    }
  }
  
  &.ant-select-size-tiny {
    &.ant-select-single {
      .ant-select-selector {
        height: 33px;
        border-radius: 4px;
        box-shadow: none!important;
        padding: 0 10px;
        
        .ant-select-selection-search {
          input {
            height: 33px;
          }
        }
        
        .ant-select-selection-placeholder, .ant-select-selection-item {
          line-height: 33px;
          font-size: 14px;
        }
      }
    }
  }
`

const { Option } = AntdSelect

class Select extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    options: PropTypes.array,
    optionBinding: PropTypes.object,
    value: PropTypes.any,
    size: PropTypes.oneOf(['tiny', 'small', 'middle']),
    onChange: PropTypes.func,
    renderOption: PropTypes.func,
    error: PropTypes.bool,
    src: PropTypes.any
  }

  static defaultProps = {
    options: []
  }

  _onChange = (value) => {
    const { onChange } = this.props
    if (onChange) onChange(value || null)
  }

  _renderOption = (option) => {
    if (lodash.isString(option) || lodash.isNumber(option)) {
      return <Option key={option} value={option}>{option}</Option>
    }

    const { optionBinding, renderOption } = this.props
    let value
    let name
    let src
    if (lodash.isEmpty(optionBinding)) {
      value = option.value
      name = option.name
      src = option.src
    } else {
      value = option[optionBinding.value]
      name = option[optionBinding.name]
      src = option[optionBinding.src]
    }
    return (
      <Option key={value} value={value}>
        {renderOption ? renderOption(option) : <img src={src} alt="" />}
        {renderOption ? renderOption(option) : name}
      </Option>
    )
  }

  render() {
    const {
      field,
      form,
      value,
      error,
      className,
      options,
      onChange,
      optionBinding,
      renderOption,
      size,
      ...props
    } = this.props

    return (
      <StyledSelect
        {...props}
        value={options.length === 0 ? undefined : (field?.value || value)}
        onChange={this._onChange}
        className={classnames({
          error: lodash.get(form, `errors.${field?.name}`) || error
        }, `ant-select-size-${size}`, 'select', className)}
      >
        {options.map(this._renderOption)}
      </StyledSelect>
    )
  }
}

export default Select
