/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { PrimaryButton, OutlineButton } from '../../../../../components'
import { STATUS } from '../../../../examination/constants'
import { MEDIA_WIDTHS } from '../../../../../themes'

const Wrapper = styled.div`
  .mr-4 {
    margin-right: 4px;
  }
`

const Footer = styled.div`
  height: 72px;
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  right: 0;
  width: ${({ isOpen }) => `calc(100% - ${isOpen ? '268px' : '64px'})`};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    width: ${({ isOpen }) => `calc(100% - ${isOpen ? '150px' : '64px'})`};
  }
  background: #fbfbfb;
  border-top: 1px solid ${({ theme }) => theme.grey_blur};
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  .status {
    display: flex;
    align-items: center;
  }
  .progress {
    width: 154px;
    margin: 0px 25px 0px 16px;
  }
`
const ExaminationFooter = ({
  handleNextButton,
  isOpen,
  setCurrentNumber,
  currentNumber,
  // isSidebar,
  status,
  isSubmit = false
}) => {
  const { t } = useTranslation()
  const nextButton = isSubmit ? t('common.submit') : t('examination.next')
  return (
    <Wrapper>
      <Footer
        isOpen={isOpen}
        // style={{ width: `calc(100% - ${!isSidebar ? '0px' : isOpen ? '268px' : '64px'})` }}
        // className="examination-footer"
      >
        {currentNumber > 0 ? (
          <OutlineButton
            onClick={() => {
              if (status === STATUS.TESTING) setCurrentNumber(currentNumber - 1)
            }}
            title={t('examination.previous')}
          />
        ) : (
          <div />
        )}
        <PrimaryButton onClick={handleNextButton} title={nextButton} />
      </Footer>
    </Wrapper>
  )
}
export default ExaminationFooter
