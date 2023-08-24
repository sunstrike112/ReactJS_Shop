/* eslint-disable no-restricted-globals */
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useInjectSaga, useInjectReducer } from '../store'
import saga from '../modules/survey/store/saga'
import reducer from '../modules/survey/store/reducer'
import {
  makeSelectSurveyAnswer,
  makeSelectSurvey,
  makeSelectSurveyResult,
  makeSelectSubmitSurveySuccess,
  makeSelectError,
  makeSelectIsLoadingBothTestAndResult
} from '../modules/survey/store/selectors'
import {
  loadSurverResult,
  loadSurvey,
  updateAnswerSurvey,
  submitSurvey
} from '../modules/survey/store/actions'
import { QUESTION_TYPE } from '../constants'
import { usePageNotFound } from '.'
import { useHistories } from './useHistories'
import { makeSelectLessonDetail } from '../modules/course/store/selectors'

export const useSurvey = ({ id, courseId, surveyId }) => {
  useInjectSaga({ key: 'surveyStore', saga })
  useInjectReducer({ key: 'surveyStore', reducer })
  const [isSurveyDone, setIsSurveyDone] = useState(false)
  const [isReSubmit, setIsReSubmit] = useState(false)

  const [dataQuestion, setQuestions] = useState([])
  const history = useHistories()

  const { data: survey, isLoadSurveyDone } = useSelector(makeSelectSurvey())
  const { data: surveyResult } = useSelector(makeSelectSurveyResult())
  const surveyAnswer = useSelector(makeSelectSurveyAnswer())
  const isSubmitSuccess = useSelector(makeSelectSubmitSurveySuccess())
  const errorSurvey = useSelector(makeSelectError())
  const isLoadingBothTestAndResult = useSelector(makeSelectIsLoadingBothTestAndResult())

  const { historyId } = useSelector(makeSelectLessonDetail())

  const dispatch = useDispatch()

  usePageNotFound({ error: errorSurvey })

  useEffect(() => {
    if (isNaN(courseId) || isNaN(surveyId)) {
      history.push('/page-not-found')
    } else {
      dispatch(loadSurvey({
        userId: id,
        courseId,
        surveyId
      }))
    }
  }, [courseId, surveyId])

  useEffect(() => {
    if (isLoadSurveyDone) {
      dispatch(loadSurverResult({
        userId: id,
        courseId,
        surveyId
      }))
    }
  }, [isLoadSurveyDone, courseId, surveyId])

  const onUpdateSurveyAnswer = (questionType, value, questionId) => {
    if (questionType === QUESTION_TYPE.SELECT_ONE) {
      const surveyAnswerUpdate = surveyAnswer.map((item) => (item.questionId === questionId ? {
        ...item,
        answerId: [value]
      } : item))
      dispatch(updateAnswerSurvey(surveyAnswerUpdate))
    }

    if (questionType === QUESTION_TYPE.CHOOSE_MANY) {
      const filter = value.filter((item) => item.checked).map((item) => item.answerId)
      const surveyAnswerUpdate = surveyAnswer.map((item) => (item.questionId === questionId ? {
        ...item,
        answerId: filter
      } : item))

      dispatch(updateAnswerSurvey(surveyAnswerUpdate))
    }

    if (questionType === QUESTION_TYPE.DESCRIPTION) {
      const surveyAnswerUpdate = surveyAnswer.map((item) => (item.questionId === questionId ? {
        ...item,
        answerId: [],
        selectedAnswer: value
      } : item))
      dispatch(updateAnswerSurvey(surveyAnswerUpdate))
    }
  }

  const answerNumber = useMemo(() => {
    if (isSurveyDone) {
      return surveyResult?.numberOfResponses || 0
    }
    if (!isSurveyDone && surveyAnswer && surveyAnswer.length > 0) {
      const foundAnswer = surveyAnswer.map((item) => item?.answerId.length > 0 || item?.selectedAnswer)
        .filter((item) => item)
      return foundAnswer.length || 0
    }
    return 0
  }, [isSurveyDone, surveyResult, surveyAnswer])

  useEffect(() => {
    setIsSurveyDone(!!surveyResult)
  }, [surveyResult])

  const onSubmitSurvey = () => {
    const lstQuestion = surveyAnswer.map((item) => ({
      answerId: item.answerId,
      questionId: item.questionId,
      selectedAnswer: item.selectedAnswer,
      version: item.version
    }))
    dispatch(submitSurvey({
      userId: id,
      courseId,
      surveyId,
      lstQuestion,
      queryParams: { historyId }
    }))
  }

  useEffect(() => {
    if (isSurveyDone || isReSubmit) {
      const transformData = (surveyResult?.listQuestions || []).map((item, index) => ({
        ...item,
        listAnswer: (item.listAnswer || []).map((answer) => ({
          ...answer,
          selectedAnswer: item.questionType === QUESTION_TYPE.DESCRIPTION ? item.answerText : answer.selectedAnswer,
          checked: surveyAnswer[index]?.answerId.includes(answer.answerId)
        }))
      }))
      setQuestions(transformData)
    } else if (survey.listQuestions?.length && !surveyResult?.listQuestions?.length) {
      const transformData = survey.listQuestions.map((item, index) => ({
        ...item,
        listAnswer: (item.listAnswer || []).map((answer) => ({
          ...answer,
          checked: surveyAnswer[index]?.answerId.includes(answer.answerId)
        }))
      }))
      setQuestions(transformData)
    }
  }, [surveyAnswer, isSurveyDone, isReSubmit])

  const isInValid = useMemo(() => {
    const dataInvalid = surveyAnswer.map((item) => !item.isRequired || item.answerId.length > 0 || item.selectedAnswer)
      .filter((item) => !item)
    return dataInvalid.length > 0
  }, [surveyAnswer])

  return {
    survey,
    surveyResult,
    surveyAnswer,
    isSubmitSuccess,
    isSurveyDone,
    onUpdateSurveyAnswer,
    onSubmitSurvey,
    answerNumber,
    isInValid,
    dataQuestion,
    isLoadSurveyDone,
    setIsSurveyDone,
    setIsReSubmit,
    isLoadingBothTestAndResult
  }
}
