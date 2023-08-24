import { Select } from 'antd'
import React, { useState, memo } from 'react'
import { SORTS_ORDER } from '../../../../constants'
import { SHOW_MORE_ICON_V2, SHOW_LESS_ICON_V2 } from '../../../../assets'
import { Image } from '../../../../components'
import { useDailyReports } from '../../../../hooks'

const { Option } = Select

const SortDrop = ({ t }) => {
  const { dailyReports, loadDailyReportsAction } = useDailyReports()
  const { filter } = dailyReports
  const { sortType } = filter

  const [isFocus, setIsFocus] = useState(false)
  const handleSelectSortTalkBoard = (sortValue) => {
    loadDailyReportsAction({
      data: {
        ...filter,
        sortType: sortValue
      }
    })
  }

  return (
    <Select
      suffixIcon={<Image src={isFocus ? SHOW_LESS_ICON_V2 : SHOW_MORE_ICON_V2} />}
      onClick={() => setIsFocus((prev) => !prev)}
      onBlur={() => setIsFocus(false)}
      value={sortType}
      onChange={handleSelectSortTalkBoard}
      getPopupContainer={() => document.getElementById('reports-header')}
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

export default memo(SortDrop)
