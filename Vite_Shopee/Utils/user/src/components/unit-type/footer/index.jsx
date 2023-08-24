/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { PrimaryButton, OutlineButton } from '../../index'
import { MEDIA_WIDTHS } from '../../../themes'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: 72px;
  display: flex;
  width: 100%;
  background: #fbfbfb;
  border-top: 1px solid ${({ theme }) => theme.grey_blur};
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 0 20px;
  }
`
const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin-right: 10px;
  }
  .btn-submit.ant-btn[disabled] {
    background-color: ${({ theme }) => theme.grey_disable};
  }
`

const UnitTypeFooter = ({
  onNext,
  onPrevious,
  onSubmit,
  onSaveDraft,
  isShowSubmit = true,
  isDisabledNext,
  isDisabledPrev,
  title,
  setHeightFooter,
  isDisableSubmit = false,
  isDraft = false
}) => {
  const { t } = useTranslation()
  const footerRef = useRef()
  useEffect(() => {
    if (footerRef) {
      setHeightFooter(footerRef.current.clientHeight)
    }
  }, [footerRef])
  return (
    <Wrapper ref={footerRef}>
      <OutlineButton
        onClick={onPrevious}
        title={t('common.prev')}
        disabled={isDisabledPrev}
      />
      <WrapperButton>
        {isShowSubmit
          && (
          <>
            <PrimaryButton
              className="btn-submit"
              disabled={isDisableSubmit}
              onClick={onSubmit}
              title={title || t('common.submit')}
            />
            {isDraft
            && (
            <OutlineButton
              disabled={isDisableSubmit}
              onClick={onSaveDraft}
              title={t('common.draft')}
            />
            )}
          </>
          )}
      </WrapperButton>
      <OutlineButton
        onClick={onNext}
        title={t('common.next')}
        disabled={isDisabledNext}
      />
    </Wrapper>
  )
}
export default UnitTypeFooter
