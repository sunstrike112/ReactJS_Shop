/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ReactHtmlParser from 'react-html-parser'

import { QUESTION_TYPE } from '../../constants'
import { CheckboxAnswer, InputAnswer, SelectOneAnswer } from '../answerItem'
import { TextNormal } from '../text'
import Image from '../image'
import { LIGHT } from '../../assets'
import {
  AnswerWrapper,
  AnswersDescription,
  AnswersChecked,
  AnswersCheckedItem,
  Circle,
  Description
} from './styled'
import { getFileFromS3 } from '../../utils'

const Answer = ({
  questionType,
  listAnswer = [],
  unitAnswer = [],
  onChange,
  currentNumber,
  readOnly,
  questionId,
  testResult,
  isUnitType = false,
  isDraft = false,
  resultQuestion,
  isSurveyDone = false,
  description,
  className,
  showAnswer = true,
  ...rest
}) => {
  const valueSelectOne = useMemo(() => (listAnswer || []).find((item) => item.checked), [listAnswer])
  const { t } = useTranslation()
  const valueInput = useMemo(() => {
    if (!testResult && !isUnitType) {
      return unitAnswer[currentNumber]?.selectedAnswer
    }

    if (testResult && !isUnitType) {
      return listAnswer[0]?.answerTextDescription
    }
    if (isDraft) {
      return unitAnswer[currentNumber]?.textDraft
    }

    if (isUnitType) {
      return unitAnswer[currentNumber]?.selectedAnswer
    }

    return ''
  }, [unitAnswer, currentNumber, testResult, isUnitType, isDraft])

  const answer = useMemo(() => {
    if (testResult && showAnswer) {
      const find = listAnswer.filter((item) => item.correctAnswer)
      return find
    }
    return null
  }, [listAnswer, testResult])
  const renderAnswer = (isDescriptionType = false) => (
    <>
      {showAnswer
      && (
      <>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 32 }}>
          <Image
            src={LIGHT}
            style={{ marginRight: 4 }}
          />
          <TextNormal fontSize="size_18" fontWeight="fw_600">
            {t('examination.test_result.answer')}
          </TextNormal>
        </div>
        <AnswerWrapper>
          {isDescriptionType && listAnswer && listAnswer.length > 0 && listAnswer.map((item, index) => (
            <AnswersDescription key={index}>
              {answer.length > 0 && (
              <TextNormal fontSize="size_16" fontWeight="fw_600">
                {t('examination.test_result.answer')} {index + 1}
              </TextNormal>
              )}
              <TextNormal fontSize="size_16">
                {item?.answerText}
              </TextNormal>
              {item.imagePath && <Image style={{ width: 120 }} src={getFileFromS3(item.imagePath) || ''} />}
            </AnswersDescription>
          ))}
          {!isDescriptionType && answer && answer.length > 0 && (
          <AnswersChecked>
            {answer.map((item, index) => (
              <AnswersCheckedItem key={index}>
                <Circle />
                <div style={{ display: 'flex', flex: 1 }}>
                  <TextNormal fontSize="size_16">
                    {item?.answerText}
                  </TextNormal>
                </div>
              </AnswersCheckedItem>
            ))}
          </AnswersChecked>
          )}
        </AnswerWrapper>
      </>
      )}
      {!!description && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 32 }}>
            <Image
              src={LIGHT}
              style={{ marginRight: 4 }}
            />
            <TextNormal fontSize="size_18" fontWeight="fw_600">
              {t('examination.test_result.description')}
            </TextNormal>
          </div>
          <Description>
            {ReactHtmlParser(description, {
              decodeEntities: true
            })}
          </Description>
        </>
      )}
    </>
  )
  if (questionType === QUESTION_TYPE.CHOOSE_MANY) {
    return (
      <>
        <CheckboxAnswer
          listAnswer={listAnswer}
          onChange={onChange}
          readOnly={readOnly}
          questionId={questionId}
          testResult={testResult && showAnswer}
          isUnitType={isUnitType}
          isSurveyDone={isSurveyDone}
          {...rest}
        />
        {testResult && renderAnswer()}
      </>
    )
  }

  if (questionType === QUESTION_TYPE.DESCRIPTION) {
    return (
      <>
        <InputAnswer
          className={className}
          value={valueInput}
          onChange={onChange}
          readOnly={readOnly}
          questionId={questionId}
          testResult={testResult && showAnswer}
          isUnitType={isUnitType}
          isError={testResult && !resultQuestion}
          isSurveyDone={isSurveyDone}
          isDraft={isDraft}
          {...rest}
        />
        {testResult && renderAnswer(true)}
      </>
    )
  }

  return (
    <>
      <SelectOneAnswer
        onChange={onChange}
        listAnswer={listAnswer || []}
        readOnly={readOnly}
        questionId={questionId}
        testResult={testResult && showAnswer}
        isUnitType={isUnitType}
        isSurveyDone={isSurveyDone}
        value={unitAnswer[currentNumber]?.answerId[0] || valueSelectOne?.answerId || null}
        {...rest}
      />
      {testResult && renderAnswer()}
    </>
  )
}

export default Answer
