/* eslint-disable react/prop-types */
import React from 'react'
import { Radio } from 'antd'
import { useTranslation } from 'react-i18next'

import Checkbox from '../checkbox'
import RadioButton from '../radio'
import { TextNormal } from '../text'
import Image from '../image'
import { Wrapper, QuestionWrapper } from './styled'
import { getFileFromS3 } from '../../utils'

const maxLength = 10000

const getBackground = (checked, isCorrect, testResult, isSurveyDone) => {
  if (!testResult && checked) {
    return 'primary_light'
  }
  if (testResult && isCorrect && checked) {
    return 'green_light'
  }

  if (testResult && !checked && isCorrect) {
    return 'yellow_blur'
  }

  if (testResult && !checked && !isCorrect) {
    return 'grey_blur'
  }

  if (testResult && checked && !isCorrect) {
    return 'error_light'
  }

  if (isSurveyDone) {
    return 'grey_blur'
  }
  return 'white'
}

const getBorder = (checked, isCorrect, testResult) => {
  if (!testResult && checked) {
    return 'primary'
  }

  if (testResult && checked && isCorrect) {
    return 'green'
  }

  if (testResult && !checked && isCorrect) {
    return 'pending_color'
  }

  if (testResult && checked && !isCorrect) {
    return 'error'
  }

  return 'grey_blur'
}

const getInputBackground = (value, isCorrect, testResult, isSurveyDone) => {
  if (isSurveyDone) {
    return 'grey_blur'
  }
  if (testResult && isCorrect && value) {
    return 'green_light'
  }

  if (testResult && !value) {
    return 'grey_blur'
  }

  if (testResult && value && !isCorrect) {
    return 'error_light'
  }

  return 'white'
}

const getInputBorder = (value, isCorrect, testResult, isSurveyDone) => {
  if (isSurveyDone) {
    return 'primary'
  }

  if (testResult && isCorrect && value) {
    return 'green'
  }

  if (testResult && !value && !isCorrect) {
    return 'grey_blur'
  }

  if (testResult && value && !isCorrect) {
    return 'error'
  }

  return 'grey_blur'
}

export const InputAnswer = ({
  onChange,
  value,
  readOnly = false,
  questionId,
  testResult = false,
  isError = false,
  isSurveyDone = false,
  className
}) => {
  const { t } = useTranslation()
  const onChangeText = (e) => {
    if (onChange) {
      onChange('DESCRIPTION', e.target.value, questionId)
    }
  }
  return (
    <Wrapper
      className={className}
      readOnly={readOnly}
      isError={isError}
      isSurveyDone={isSurveyDone}
      border={getInputBorder(value, !isError, testResult, isSurveyDone)}
      background={getInputBackground(value, !isError, testResult, isSurveyDone)}
    >
      <textarea
        onChange={onChangeText}
        readOnly={readOnly}
        maxLength={maxLength}
        className="input-question"
        value={value || ''}
      />
      <TextNormal color="text_secondary">{value?.length || 0}/{maxLength} {t('report.character')}</TextNormal>
    </Wrapper>
  )
}

export const SelectOneAnswer = ({
  listAnswer = [],
  onChange,
  value,
  readOnly = false,
  questionId,
  testResult = false,
  isSurveyDone = false
}) => {
  const onChecked = (answer) => {
    if (onChange) {
      onChange('SELECT_ONE', answer.answerId, questionId)
    }
  }
  return (
    <Radio.Group value={value} style={{ width: '100%' }}>
      {listAnswer && listAnswer.length > 0 && listAnswer.map((answer) => (
        <QuestionWrapper
          readOnly={readOnly}
          background={getBackground(value === answer?.answerId, answer.correctAnswer, testResult, isSurveyDone)}
          key={answer.answerId}
          border={getBorder(value === answer?.answerId, answer.correctAnswer, testResult)}
          onClick={() => (readOnly ? null : onChecked(answer))}
        >
          <RadioButton value={answer.answerId} title={answer?.answerText} />
          {answer.imagePath && <Image src={getFileFromS3(answer.imagePath) || ''} />}
        </QuestionWrapper>
      ))}
    </Radio.Group>
  )
}

export const CheckboxAnswer = ({
  listAnswer = [],
  onChange,
  readOnly = false,
  questionId,
  testResult,
  isSurveyDone = false
}) => {
  const onSlected = (answer) => {
    const unitAnswerUpdate = listAnswer.map((item) => ({
      ...item,
      checked: item.answerId === answer.answerId ? !answer.checked : item.checked
    }))

    if (onChange) {
      onChange('CHOOSE_MANY', unitAnswerUpdate, questionId)
    }
  }

  return listAnswer.map((answer) => (
    <QuestionWrapper
      key={answer.answerId}
      onClick={() => (readOnly ? null : onSlected(answer))}
      readOnly={readOnly}
      border={getBorder(answer.checked, answer.correctAnswer, testResult)}
      background={getBackground(answer.checked, answer.correctAnswer, testResult, isSurveyDone)}

    >
      <div className="question">
        <Checkbox checked={answer.checked} />
        <TextNormal className="question__title" fontWeight="fw_600">{answer.answerText}</TextNormal>
      </div>
      {answer.imagePath && <Image src={getFileFromS3(answer.imagePath) || ''} />}
    </QuestionWrapper>
  ))
}
