/* eslint-disable react/prop-types */
import React from 'react'
import { Form, TreeSelect, ConfigProvider } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { SmileOutlined } from '@ant-design/icons'

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

  .ant-select-selection-overflow-item {
    align-self: flex-start;
  }

  .ant-select-selection-overflow {
    position: relative;
    display: flex;
    flex: auto;
    flex-wrap: wrap;
    max-width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}

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

  .ant-form-item-children-icon {
    display: none;
  }

  .ant-select-selector {
    min-height: 38px;
  }

  .ant-select-empty {
    color: ${({ theme }) => theme.black}
  }

  .ant-select-tree-title {
    white-space: break-spaces;
  }
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormTreeSelect = ({ t, label, name, groupName, rules, defaultValue = '', valueKey, labelKey, parentKey, wrapperProps, options = [], dropdownClassName, ...rest }) => {
  const { control } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })
  const [trans] = useTranslation(['common'])

  const renderTreeOptions = (opts) => opts?.map((item) => (
    item.childList
      ? (
        <TreeSelect.TreeNode
          key={item[valueKey]}
          value={item[valueKey]}
          title={item[labelKey]}
          disabled={(parentKey && item[parentKey]) || groupName === item[labelKey]}
        >
          {renderTreeOptions(item.childList)}
        </TreeSelect.TreeNode>
      )
      : (
        <TreeSelect.TreeNode
          key={item[valueKey]}
          value={item[valueKey]}
          title={item[labelKey]}
          disabled={(parentKey && item[parentKey])}
        />
      )))

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <SmileOutlined style={{ fontSize: 20 }} />
      <p style={{ textAlign: 'center', width: '100%' }}>{trans('empty_data')}</p>
    </div>
  )

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label && <WrapperLabel>{label}</WrapperLabel>}
      validateStatus={(error) ? 'error' : ''}
      help={error?.message}
    >
      <div
        id={`popup-container-${name}`}
      >
        <ConfigProvider renderEmpty={customizeRenderEmpty} getPopupContainer={() => document.getElementById(`popup-container-${name}`)}>
          <TreeSelect
            showSearch
            treeNodeFilterProp="title"
            style={{ width: '100%' }}
            value={value || null}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder={trans('select')}
            labelInValue
            allowClear
            treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            onChange={onChange}
            dropdownClassName
            // open
            {...rest}
          >
            {renderTreeOptions(options)}
          </TreeSelect>
        </ConfigProvider>
      </div>
    </WrapperFormItem>
  )
}

export default FormTreeSelect
