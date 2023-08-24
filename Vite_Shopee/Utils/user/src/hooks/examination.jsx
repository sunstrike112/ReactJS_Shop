/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useInjectSaga, useInjectReducer } from '../store'
import saga from '../modules/examination/store/saga'
import reducer from '../modules/examination/store/reducer'
import {
  makeSelectUnitQuestions,
  makeSelectTestResult,
  makeSelectUnitAnswer,
  makeSelectSubmitTestSuccess,
  makeSelectError
} from '../modules/examination/store/selectors'
import {
  loadUnitQuestions,
  loadTestResult,
  submitTest,
  updateAnswerTesting
} from '../modules/examination/store/actions'
import { QUESTION_TYPE } from '../constants'
import { usePageNotFound } from '.'
import { useHistories } from './useHistories'
import { makeSelectLessonDetail } from '../modules/course/store/selectors'

export const useExamination = ({ userId, courseId, testId }) => {
  useInjectSaga({ key: 'examinationStore', saga })
  useInjectReducer({ key: 'examinationStore', reducer })
  const dispatch = useDispatch()
  const history = useHistories()
  const { data: testIntro, loadingSucess } = useSelector(makeSelectUnitQuestions())
  const { data: testResult } = useSelector(makeSelectTestResult())
  const unitAnswer = useSelector(makeSelectUnitAnswer())
  const isSubmitSuccess = useSelector(makeSelectSubmitTestSuccess())
  const answerNumber = useMemo(() => unitAnswer.map((item) => item.answerId.length > 0 || item.selectedAnswer.length > 0), [unitAnswer]).filter((item) => item === true)
  const errorExamination = useSelector(makeSelectError())
  const { historyId } = useSelector(makeSelectLessonDetail())

  usePageNotFound({ error: errorExamination })

  const getDoingTest = () => {
    dispatch(loadUnitQuestions({
      userId,
      courseId: Number.parseInt(courseId),
      testId: Number.parseInt(testId)
    }))
  }

  const updateAnswer = (answers) => {
    dispatch(updateAnswerTesting(answers))
  }

  const getTestResult = () => {
    dispatch(loadTestResult({
      userId,
      courseId: Number.parseInt(courseId),
      testId: Number.parseInt(testId)
    }))
  }

  const onAnswer = ({
    questionType,
    value,
    currentNumber,
    setListAnswer
  }) => {
    if (questionType === QUESTION_TYPE.SELECT_ONE) {
      const unitAnswerUpdate = unitAnswer.map((item, index) => (currentNumber === index ? {
        ...item,
        answerId: [value]
      } : item))
      updateAnswer(unitAnswerUpdate)
    }

    if (questionType === QUESTION_TYPE.CHOOSE_MANY) {
      if (setListAnswer) {
        setListAnswer(value)
      }

      const filter = value.filter((item) => item.checked).map((item) => item.answerId)
      const unitAnswerUpdate = unitAnswer.map((item, index) => (currentNumber === index ? {
        ...item,
        answerId: filter
      } : item))
      updateAnswer(unitAnswerUpdate)
    }

    if (questionType === QUESTION_TYPE.DESCRIPTION) {
      const unitAnswerUpdate = unitAnswer.map((item, index) => (currentNumber === index ? {
        ...item,
        answerId: [],
        selectedAnswer: value
      } : item))
      updateAnswer(unitAnswerUpdate)
    }
  }

  const submitDoingTest = ({ id, course, TestingId, submitTestRequest }) => {
    dispatch(submitTest({
      userId: id,
      courseId: course,
      testId: TestingId,
      submitTestRequest,
      queryParams: { historyId }
    }))
  }

  useEffect(() => {
    if (isNaN(courseId) || isNaN(testId)) {
      history.push('/examination/page-not-found')
    }
    // else {
    //   dispatch(loadUnitQuestions({
    //     userId,
    //     courseId: Number.parseInt(courseId),
    //     testId: Number.parseInt(testId)
    //   }))
    //   dispatch(loadTestResult({
    //     userId,
    //     courseId: Number.parseInt(courseId),
    //     testId: Number.parseInt(testId)
    //   }))
    // }
  }, [userId, courseId, testId])

  const answers = useMemo(() => {
    if (testResult) {
      const transformData = testResult.listQuestion.map((item) => ({
        ...item,
        listAnswer: (item.listAnswer || []).map((answer) => ({
          ...answer,
          checked: answer.selectedAnswer
        }))
      }))
      return transformData
    }
    return []
  }, [testResult])

  const correctAnswer = useMemo(() => {
    if (answers) {
      return answers.filter((item) => item?.resultQuestion)
    }
    return []
  }, [answers])

  const inCorrectAnswer = useMemo(() => {
    if (answers) {
      const incorrect = answers.filter((item) => {
        if (item?.questionType === 'DESCRIPTION') {
          return item?.listAnswer[0].answerTextDescription && !item?.resultQuestion
        }
        const listAnswer = (item.listAnswer || []).filter((answer) => answer?.selectedAnswer)
        return listAnswer.length > 0 && !item?.resultQuestion
      })
      return incorrect
    }
    return []
  }, [answers])

  const unAnswers = useMemo(() => {
    if (answers) {
      return answers.filter((item) => {
        if (item?.questionType === 'DESCRIPTION') {
          return !item?.listAnswer[0].answerTextDescription
        }
        const listAnswer = (item.listAnswer || []).filter((answer) => answer?.selectedAnswer)
        return listAnswer.length === 0
      })
    }
    return []
  }, [answers])

  return {
    testIntro,
    testResult,
    getDoingTest,
    getTestResult,
    submitTest: submitDoingTest,
    unitAnswer,
    isSubmitSuccess,
    answerNumber,
    updateAnswer,
    onAnswer,
    answers,
    correctAnswer,
    inCorrectAnswer,
    unAnswers,
    loadingSucess,
    errorExamination
  }
}
