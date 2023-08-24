/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { makeSelectIsOnline } from '../../routes/store/selectors'
import { UnitTypeHeader, UnitTypeFooter, TextNormal } from '../../components'
import { MEDIA_WIDTHS } from '../../themes'

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  background: ${({ theme }) => theme.white};
  justify-content: space-between;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* flex: 1; */
  padding: ${({ heightHeader, heightFooter }) => `${heightHeader || 0}px 40px ${heightFooter || 0}px 40px`};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: ${({ heightHeader, heightFooter }) => `${heightHeader || 0}px 32px ${heightFooter || 0}px 32px`};
  }
`
const Network = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.error};
  padding: 4px;
`

const UnitTypeLayout = ({
  children,
  onNext,
  onPrevious,
  unitName = '',
  numberQuestions = 0,
  onSubmit,
  onSaveDraft,
  isShowSubmit,
  answerNumber,
  onClickEnd,
  isDisabledNext,
  isDisabledPrev,
  title,
  isDraft,
  footer = true,
  showAnswer = true,
  isDisableSubmit = false
}) => {
  const isOnline = useSelector(makeSelectIsOnline())
  const { t } = useTranslation()
  const [heightHeader, setHeightHeader] = useState(null)
  const [heightFooter, setHeightFooter] = useState(null)
  return (
    <Wrapper>
      <UnitTypeHeader
        unitName={unitName}
        numberQuestions={numberQuestions}
        answerNumber={answerNumber}
        onClickEnd={onClickEnd}
        setHeightHeader={setHeightHeader}
        showAnswer={showAnswer}
      />
      {!isOnline && (
        <Network>
          <TextNormal color="white">{t('common.network_error')}</TextNormal>
        </Network>
      )}
      <Body heightHeader={heightHeader} heightFooter={heightFooter}>
        {children}
      </Body>
      {footer && (
        <UnitTypeFooter
          onPrevious={onPrevious}
          onNext={onNext}
          onSubmit={onSubmit}
          onSaveDraft={onSaveDraft}
          isShowSubmit={isShowSubmit}
          isDisabledNext={isDisabledNext}
          isDisabledPrev={isDisabledPrev}
          title={title || t('survey.submit')}
          isDisableSubmit={isDisableSubmit}
          setHeightFooter={setHeightFooter}
          isDraft={isDraft}
        />
      )}
    </Wrapper>
  )
}

export default UnitTypeLayout
