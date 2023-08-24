/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import { Tree } from 'antd'
import { SearchWrapper } from '../styled'
import { ICON_ARROW_DOWN } from '../../../../../assets'
import { TextNormal } from '../../../../../components'

const SearchTree = ({ t, data, checkedKeys, setCheckedKeys }) => {
  const onCheck = (keys) => {
    setCheckedKeys(keys)
  }

  return (
    <SearchWrapper>
      {data.length
        ? (
          <Tree
            checkable
            selectable={false}
            style={{ fontSize: 12 }}
            treeData={data}
            onCheck={onCheck}
            switcherIcon={() => <span><ICON_ARROW_DOWN /></span>}
            checkedKeys={checkedKeys}
          />
        ) : <TextNormal className="no-data" color="success">{t('common.no_data')}</TextNormal>}

    </SearchWrapper>
  )
}

export default memo(SearchTree)
