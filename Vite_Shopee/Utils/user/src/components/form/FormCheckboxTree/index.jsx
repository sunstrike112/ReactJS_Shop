/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Form, Input, Tree, Checkbox } from 'antd'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
    border-color: ${({ theme }) => theme.grey_blur};
    &:focus {
      box-shadow: none;
      border-color: ${({ theme }) => theme.success};
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
`

const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

const FormCheckboxTree = ({
  label,
  name,
  rules,
  defaultValue = '',
  wrapperProps,
  isRequired = false,
  isHiddenSelectAll = false,
  t,
  onChangeTree,
  listOption,
  listId,
  allKeysGroup,
  ...rest
}) => {
  const { control } = useFormContext()
  const { field: { onChange, value }, fieldState: { error } } = useController({ name, control, rules, defaultValue })
  const [isCheckAll, setIsCheckAll] = useState(false)

  const onCheckAll = () => {
    onChangeTree()
    if (listOption.length === 0) { setIsCheckAll(!isCheckAll) }
  }

  return (
    <WrapperFormItem
      {...wrapperProps}
      label={label
        && (
        <WrapperLabel>
          {label}&nbsp;{isRequired && <span style={{ color: 'red' }}>*</span>}
        </WrapperLabel>
        )}
      validateStatus={(error) ? 'error' : ''}
      help={t(error?.message)}
    >
      {isHiddenSelectAll
      && (
      <Checkbox
        className="checkall-attribute"
        onChange={onCheckAll}
        checked={listOption.length !== 0 ? listId.length === allKeysGroup.length : isCheckAll}
      >
        {t('talk_board.select_all')}
      </Checkbox>
      )}
      <Tree
        checkable
        selectable={false}
        treeData={listOption}
        onCheck={onChange}
        checkedKeys={listId}
        {...rest}
      />
    </WrapperFormItem>
  )
}

export default FormCheckboxTree
