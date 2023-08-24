/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Progress } from 'antd'
import { TextPrimary, WarningButton } from '../../../../../components'
import { MEDIA_WIDTHS } from '../../../../../themes'

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  width: ${({ isOpen }) => `calc(100% - ${isOpen ? '268px' : '64px'})`};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    width: ${({ isOpen }) => `calc(100% - ${isOpen ? '150px' : '64px'})`};
  }
  height: max-content;
  display: flex;
  background: #fbfbfb;
  border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  padding: 16px 20px;
  .left {
    flex: 1;
    width: 30%;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 1.5em;
    line-height: 1.5em;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    pointer-events: auto;
    margin-right: 50px;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &__progress {
      min-width: 100px;
      max-width: 150px;
    }
    &__answer {
      display: flex;
      p {
        &:first-child {
          margin-right: 10px;
        }
      }
    }
    &__progress {
      width: 154px;
      margin: 0px 25px 0px 16px;
    }
  }
`

const ExaminationHeader = ({ isOpen, isSidebar, questionsNumber, testName, answerNumber, onClickEnd }) => {
  const { t } = useTranslation()
  const getProgress = () => Math.floor((answerNumber / questionsNumber) * 100)
  const questionKey = questionsNumber > 1 ? 'examination.questions' : 'examination.question'
  return (
    <Wrapper isOpen={isOpen}>
      <div title={testName} className="left">
        <TextPrimary color="black" fontSize="size_18">
          {testName}
        </TextPrimary>
      </div>
      <div className="status">
        <div className="status__answer">
          <TextPrimary color="black" fontSize="size_14">
            {t('examination.num_answer')}
          </TextPrimary>
          <TextPrimary fontWeight="fw_600" color="black" fontSize="size_14">
            {t(questionKey, { answer: `${answerNumber}/${questionsNumber}` })}
          </TextPrimary>
        </div>
        <div className="status__progress">
          <Progress strokeColor="#07CF84" percent={getProgress()} size="small" />
        </div>
        <WarningButton fontSize="size_12" title={t('examination.end')} onClick={onClickEnd} />
      </div>
    </Wrapper>
  )
}
export default ExaminationHeader
