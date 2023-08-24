import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useExamination, useProfile } from '../../../hooks'
import ExaminationLayout from '../../layouts/examination'
import {
  DoingTest,
  ExaminationIntro
} from '../components'
import { STATUS } from '../constants'

const Examination = () => {
  const { courseId, testId } = useParams()
  const { profile } = useProfile()

  const {
    testIntro,
    testResult,
    submitTest,
    unitAnswer,
    isSubmitSuccess,
    answerNumber,
    onAnswer,
    loadingSucess,
    getDoingTest,
    getTestResult
  } = useExamination({ userId: profile.userId, courseId, testId })
  const [status, setStatus] = useState(STATUS.START)

  useEffect(() => {
    getDoingTest()
    getTestResult()
  }, [courseId, testId, profile.userId])

  const [currentNumber, setCurrentNumber] = useState(0)

  if (status === STATUS.TESTING) {
    return (
      <ExaminationLayout
        userId={profile.userId}
        status={status}
        setStatus={setStatus}
        currentNumber={currentNumber}
        setCurrentNumber={setCurrentNumber}
        testIntro={testIntro}
        submitTest={submitTest}
        unitAnswer={unitAnswer}
        isSubmitSuccess={isSubmitSuccess}
        answerNumber={answerNumber}
      >
        <DoingTest
          currentNumber={currentNumber}
          questions={testIntro.listQuestion[currentNumber]}
          unitAnswer={unitAnswer}
          onAnswer={onAnswer}
        />
      </ExaminationLayout>
    )
  }
  return (
    <ExaminationIntro
      setStatus={setStatus}
      testResult={testResult}
      testIntro={testIntro}
      loadingSucess={loadingSucess}
    />
  )
}
export default Examination
