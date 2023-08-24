/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Answer, Question } from '../../../../components'

const Wrapper = styled.div`
  .answer {
    margin-top: 32px;
  }
`
const DoingTest = ({
  currentNumber,
  questions,
  unitAnswer,
  onAnswer
}) => {
  const [answers, setListAnswer] = useState([])

  useEffect(() => {
    if (questions && questions.listAnswer && questions.listAnswer.length > 0) {
      setListAnswer(questions.listAnswer.map((item) => ({
        ...item,
        checked: unitAnswer[currentNumber].answerId.includes(item.answerId)
      })))
    }
  }, [questions, unitAnswer])

  const onChange = (questionType, value) => {
    if (onAnswer) {
      onAnswer({
        questionType,
        value,
        currentNumber,
        setListAnswer
      })
    }
  }

  return (
    <Wrapper>
      <Question
        currentNumber={currentNumber}
        questions={questions}
        isRequired={questions?.isRequired}
      />
      <div className="answer">
        <Answer
          questionType={questions?.questionType}
          listAnswer={answers}
          onChange={onChange}
          unitAnswer={unitAnswer}
          currentNumber={currentNumber}
        />
      </div>
    </Wrapper>
  )
}

export default DoingTest
