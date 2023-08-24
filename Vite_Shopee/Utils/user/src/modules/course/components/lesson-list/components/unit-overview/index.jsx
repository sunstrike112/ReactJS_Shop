/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { TextPrimary, Image, ClickAble } from '../../../../../../components'
import { SHOWMORE_ICON, SHOWLESS_ICON } from '../../../../../../assets'
// import { MEDIA_WIDTHS } from '../../../../../../themes'

const Wrapper = styled.div`
  .overview {
    margin-top: 12px;
    display: -webkit-box;
    -webkit-line-clamp: ${({ isReadMore }) => (isReadMore ? '' : 3)};
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .showmore {
    cursor: pointer;
    text-decoration: none;
    display: flex;
  }
`
const UnitOverview = ({ overview }) => {
  const overviewRef = useRef(null)
  const [isReadMore, setIsReadMore] = useState(false)
  const [isShowMore, setIsShowMore] = useState(false)
  const { t } = useTranslation()
  const onClick = (e) => {
    e.stopPropagation()
    setIsReadMore(!isReadMore)
  }

  useEffect(() => {
    if (overviewRef.current) {
      setTimeout(() => {
        let { clientHeight, scrollHeight } = overviewRef.current
        setIsShowMore(scrollHeight > clientHeight)
      }, 0)
    }
  }, [])
  return (
    <Wrapper isReadMore={isReadMore}>
      {overview && (
        <TextPrimary className="overview" fontSize="size_16" color="grey" ref={overviewRef}>
          {overview.split('\n').map((str) => <p>{str}</p>)}
        </TextPrimary>
      )}
      {isShowMore && (
      <div className="showmore">
        {isReadMore ? (
          <ClickAble onClick={onClick}>
            <TextPrimary fontSize="size_14" color="green">
              {t('course_detail.show_less')}
              <Image src={SHOWLESS_ICON} />
            </TextPrimary>
          </ClickAble>
        ) : (
          <ClickAble onClick={onClick}>
            <TextPrimary fontSize="size_14" color="green">
              {t('course_detail.show_more')}
              <Image src={SHOWMORE_ICON} />
            </TextPrimary>
          </ClickAble>
        )}
      </div>
      )}
    </Wrapper>
  )
}
export default UnitOverview
