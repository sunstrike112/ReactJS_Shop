/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { EditOutlined } from '@ant-design/icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitButton, TextNormal } from '../../../../components'
import { useHistories } from '../../../../hooks'
import SortDrop from './SortDrop'
import { FilterWrapper } from './styled'

const FilterBlock = ({ listTalkBoardTotal }) => {
  const history = useHistories()
  const { t } = useTranslation()

  const handleCreateTalkBoard = () => {
    history.push('/create-talk-board')
  }
  return (
    <FilterWrapper id="list-talk-board">
      <div className="title">
        <TextNormal
          fontSize="size_24"
          fontWeight="fw_600"
        >
          {t('talk_board.list_talk_board')}
        </TextNormal>
        <div className="title__number">{listTalkBoardTotal}</div>
      </div>
      <div className="btn__group">
        <SortDrop
          t={t}
        />
        <SubmitButton
          className="btn__create"
          title={t('talk_board.create_talk_board')}
          icon={<EditOutlined />}
          fontWeight="fw_500"
          fontSize="size_14"
          onClick={handleCreateTalkBoard}
        />
      </div>
    </FilterWrapper>
  )
}

export default FilterBlock
