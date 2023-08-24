/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { TextPrimary } from '../../index'
import { MEDIA_WIDTHS } from '../../../themes'
import { WarningButton } from '../../button'

const Wrapper = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  display: flex;
  background: #fbfbfb;
  border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  width: 100%;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 16px;
  }
  .left {
    flex: 1;
    display: -webkit-box;
    overflow: hidden;
    margin-right: 50px;
    text-overflow: ellipsis;
    height: 1.5em;
    line-height: 1.5em;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    pointer-events: auto;
  }
  .right {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &__answer {
      display: flex;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      margin-top: 10px;
    }
  }

  .mr-4 {
    margin-left: 4px;
    margin-right: 16px;
  }
`
const UnitTypeHeader = ({
  unitName = '',
  numberQuestions,
  answerNumber = 0,
  onClickEnd,
  setHeightHeader,
  showAnswer
}) => {
  const { t } = useTranslation()
  const questionKey = numberQuestions > 1 ? 'examination.questions' : 'examination.question'
  const headerRef = useRef()
  const handleResize = () => {
    setHeightHeader(headerRef.current.clientHeight)
  }
  useEffect(() => {
    setHeightHeader(headerRef.current.clientHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [headerRef])

  return (
    <Wrapper ref={headerRef} showAnswer={showAnswer}>
      <div title={unitName}>
        <TextPrimary className="left" color="black" fontSize="size_18">
          {unitName}
        </TextPrimary>
      </div>
      <div className="right">
        {showAnswer && (
          <div className="right__answer">
            <TextPrimary color="black" fontSize="size_14">
              {t('examination.num_answer')}
            </TextPrimary>
            <TextPrimary fontWeight="fw_600" color="black" fontSize="size_14" className="mr-4">
              {t(questionKey, { answer: `${answerNumber}/${numberQuestions}` })}
            </TextPrimary>
          </div>
        )}
        <WarningButton title={t('common.back_btn')} onClick={onClickEnd} />
      </div>
    </Wrapper>
  )
}
export default UnitTypeHeader
