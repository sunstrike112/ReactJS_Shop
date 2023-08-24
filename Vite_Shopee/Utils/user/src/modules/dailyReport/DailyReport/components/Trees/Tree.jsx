/* eslint-disable react/prop-types */
import React, { memo } from 'react'
import { Tree as TreeAnt } from 'antd'
import { SearchWrapper } from './styled'
import { ICON_ARROW_DOWN } from '../../../../../assets'
import { TextNormal } from '../../../../../components'

const Tree = ({ t, data, checkedKeys }) => (
  <SearchWrapper>
    {data.length
      ? (
        <TreeAnt
          checkStrictly
          checkable
          selectable={false}
          style={{ fontSize: 12 }}
          treeData={data}
          switcherIcon={() => <span><ICON_ARROW_DOWN /></span>}
          checkedKeys={checkedKeys}
        />
      ) : <TextNormal className="no-data" color="success">{t('common.no_data')}</TextNormal>}

  </SearchWrapper>
)

export default memo(Tree)
