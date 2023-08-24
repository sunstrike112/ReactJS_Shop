/* eslint-disable react/prop-types */
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TextNormal } from '../../../../../components'
import Tree from './Tree'
import { Box, Wrapper } from './styled'
import { flatKeys } from '../../../../../utils'

const Trees = ({ attributes, departments }) => {
  // Use hooks
  const { t } = useTranslation()
  // End use hooks

  const isSharingAll = useMemo(() => !attributes.length && !departments.length, [attributes, departments])

  return (
    <Wrapper>
      {isSharingAll && (
      <TextNormal fontSize="size_16" color="success" fontWeight="fw_700">
        {t('talk_board.everyone')}
      </TextNormal>
      )}
      {departments.length > 0 && (
      <>
        <TextNormal fontSize="size_16" color="success" fontWeight="fw_700">
          {t('talk_board.group')}
        </TextNormal>
        <Box>
          <Tree
            t={t}
            data={departments}
            checkedKeys={flatKeys(departments, 'key')}
          />
        </Box>
      </>
      )}
      {attributes.length > 0 && (
      <>
        <TextNormal fontSize="size_16" color="success" fontWeight="fw_700">
          {t('talk_board.attribute')}
        </TextNormal>
        <Box>
          <Tree
            t={t}
            data={attributes}
            checkedKeys={flatKeys(attributes, 'key')}
          />
        </Box>
      </>
      )}
    </Wrapper>
  )
}

export default memo(Trees)
