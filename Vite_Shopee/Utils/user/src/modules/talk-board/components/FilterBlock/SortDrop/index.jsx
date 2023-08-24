/* eslint-disable no-unused-vars */
import { Select } from 'antd'
import React, { useState } from 'react'
import { SORTS_ORDER } from '../../../../../constants'
import { SHOW_MORE_ICON_V2, SHOW_LESS_ICON_V2 } from '../../../../../assets'
import { Image } from '../../../../../components'
import { useTalkBoard } from '../../../../../hooks'

const { Option } = Select

const SortDrop = ({ t }) => {
  const {
    listTalkBoard,
    loadTalkBoardAction,
    filter
  } = useTalkBoard()
  const { page, limit } = listTalkBoard
  const { sortType } = filter

  const [isFocus, setIsFocus] = useState(false)
  const handleSelectSortTalkBoard = (sortValue) => {
    loadTalkBoardAction({ params: {
      page,
      limit,
      filter: {
        ...filter,
        sortType: sortValue
      }
    } })
  }

  return (
    <Select
      suffixIcon={<Image src={isFocus ? SHOW_LESS_ICON_V2 : SHOW_MORE_ICON_V2} />}
      onClick={() => setIsFocus(!isFocus)}
      onBlur={() => setIsFocus(false)}
      value={sortType}
      onChange={handleSelectSortTalkBoard}
      getPopupContainer={() => document.getElementById('list-talk-board')}
    >
      {SORTS_ORDER.map((option) => (
        <Option
          key={option.key}
          value={option.value}
        >
          {t(`talk_board.${option.label}`)}
        </Option>
      ))}
    </Select>
  )
}

export default SortDrop
