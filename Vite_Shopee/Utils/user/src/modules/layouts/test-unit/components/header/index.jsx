/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Progress } from 'antd'
import { TextPrimary, WarningButton } from '../../../../../components'

const Wrapper = styled.div`
  .examination-header {
    width: 100%;
    position: fixed;
    right: 0;
    height: max-content;
    display: flex;
    background: #fbfbfb;
    border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    padding: 16px 20px;
    &__left {
      flex: 1;
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
        min-width: 100px;
        max-width: 150px;
        margin: 0px 25px 0px 16px;
      }
    }
  }
`
const TestResultHeader = ({ questionsNumber, testName, answerNumber, onClickEnd, redirectFrom }) => {
  const { t } = useTranslation()
  const getProgress = () => Math.floor((answerNumber / questionsNumber) * 100)
  const questionKey = questionsNumber > 1 ? 'examination.questions' : 'examination.question'
  return (
    <Wrapper>
      <div className="examination-header">
        <div title={testName} className="examination-header__left">
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
          { redirectFrom !== 'admin' && <WarningButton title={t('examination.back')} onClick={onClickEnd} />}
        </div>
      </div>
    </Wrapper>
  )
}
export default TestResultHeader
