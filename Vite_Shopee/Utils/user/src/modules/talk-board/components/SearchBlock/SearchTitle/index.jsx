/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { SearchWrapper } from '../styled'
import { useTalkBoard } from '../../../../../hooks'
import { TooltipCustom } from '../../../../../components'

const { CheckableTag } = Tag

const SearchTag = ({ isShowMore, selectedTags, setSelectedTags }) => {
  const {
    listTag,
    loadTagAction,
    filter
  } = useTalkBoard()

  useEffect(() => {
    loadTagAction({
      hasTalkBoard: true,
      lstTagId: filter.lstTagId,
      callback: (tagSelected) => setSelectedTags(tagSelected) })
  }, [])

  const [listTagData, setListTagData] = useState([])

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag)
    setSelectedTags(nextSelectedTags)
  }

  useEffect(() => {
    if (listTag.length < 10) { setListTagData(listTag) } else if (isShowMore) setListTagData(listTag.slice(0, 10))
    else setListTagData(listTag)
  }, [isShowMore, listTag])

  return (
    <SearchWrapper>
      {listTagData.map((tag) => (
        <CheckableTag
          key={tag.id}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={(checked) => handleChange(tag, checked)}
        >
          <TooltipCustom
            text={tag.name}
            title={tag.name}
          />
        </CheckableTag>
      ))}
    </SearchWrapper>
  )
}

export default SearchTag
