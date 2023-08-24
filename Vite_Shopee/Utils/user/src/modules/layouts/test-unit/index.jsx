/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Header, Footer } from './components'
import { Body, Wrapper, Network } from './styled'
import { TextNormal } from '../../../components'
import { makeSelectIsOnline } from '../../../routes/store/selectors'

const TestUnitLayout = ({
  children,
  testName,
  answerNumber,
  isSubmit,
  questionsNumber,
  onClickEnd,
  redirectFrom = ''
}) => {
  const { t } = useTranslation()

  const isOnline = useSelector(makeSelectIsOnline())

  return (
    <Wrapper>
      <Body>
        <Header
          answerNumber={answerNumber}
          questionsNumber={questionsNumber}
          testName={testName}
          onClickEnd={onClickEnd}
          redirectFrom={redirectFrom}
        />
        <Footer
          isSubmit={isSubmit}
          redirectFrom={redirectFrom}
        />
        <div className="content">
          {!isOnline && (
            <Network>
              <TextNormal color="white">
                {t('common.network_error')}
              </TextNormal>
            </Network>
          )}
          <div
            style={{ width: '100%' }}
            className="content-child"
          >
            {children}
          </div>
        </div>
      </Body>
    </Wrapper>
  )
}

export default TestUnitLayout
