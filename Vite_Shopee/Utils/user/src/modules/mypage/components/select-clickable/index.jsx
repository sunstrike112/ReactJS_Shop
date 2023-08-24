/* eslint-disable react/prop-types */
import React from 'react'
import { TreeSelect, Empty } from 'antd'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Image } from '../../../../components'
import { SELECT_CARET_DOWN } from '../../../../assets'

const { SHOW_PARENT } = TreeSelect
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 20px;
  .ant-tree-select {
    width: 100%;
    height: 100%;
    .ant-select-selector {
      height: 100%;
    }
  }
  max-width: 202px;
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: ${({ theme }) => theme.green};
  }
`
const SelectClickable = ({ treeData, onHandleChange, searchState, selectPlaceholder }) => {
  const { t } = useTranslation()
  const tProps = {
    treeData,
    value: searchState?.value,
    onChange: onHandleChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: selectPlaceholder,
    notFoundContent: (
      <Empty description={t('common.no_data')} imageStyle={{ display: 'none' }} style={{ padding: '20px' }} />
    ),
    showArrow: true,
    suffixIcon: <Image src={SELECT_CARET_DOWN} />,
    style: {
      width: '100%'
    },
    autofocus: true
  }
  return (
    <Wrapper>
      <TreeSelect {...tProps} dropdownStyle={{ visibility: 'visible' }} />
    </Wrapper>
  )
}
export default SelectClickable
