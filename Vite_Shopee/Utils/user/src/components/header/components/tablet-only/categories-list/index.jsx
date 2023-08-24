/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { TextPrimary, Image } from '../../../../index'
import { NEXT_ICON, DOWN_ICON } from '../../../../../assets'

const CategoriesList = ({ list }) => {
  const [isToggle, setIsToggle] = useState(false)
  const renderIcon = (toggle) => {
    if (toggle) return <Image src={DOWN_ICON} />
    return <Image src={NEXT_ICON} />
  }
  return (
    <div>
      <div aria-hidden onClick={() => setIsToggle(!isToggle)} className="categories">
        <TextPrimary style={{ marginLeft: 10 }}>{list.courseCategoryName}</TextPrimary>
        {list?.childList?.length > 0 && renderIcon(isToggle)}
      </div>
      {
        isToggle && list?.childList?.map((item) => <TextPrimary color="grey" style={{ marginLeft: 20 }}>{item.courseCategoryName}</TextPrimary>)
      }
    </div>
  )
}
export default CategoriesList
