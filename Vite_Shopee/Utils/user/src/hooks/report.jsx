/* eslint-disable no-restricted-globals */
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useInjectSaga, useInjectReducer } from '../store'
import saga from '../modules/report/store/saga'
import reducer from '../modules/report/store/reducer'
import {
  makeSelectError,
  makeSelectReport,
  makeSelectReportAnswer,
  makeSelectSubmitReportSuccess,
  makeSelectSaveDraftReportSuccess
} from '../modules/report/store/selectors'
import {
  loadReport,
  updateAnswerReport,
  submitReport
} from '../modules/report/store/actions'
import { REPORT_STATUS, QUESTION_TYPE } from '../constants'
import { usePageNotFound } from '.'
import { useHistories } from './useHistories'
import { makeSelectLessonDetail } from '../modules/course/store/selectors'

export const useReport = ({ id, courseId, reportId }) => {
  useInjectSaga({ key: 'reportStore', saga })
  useInjectReducer({ key: 'reportStore', reducer })
  const dispatch = useDispatch()
  const history = useHistories()

  const { data: report, isLoadReportSuccess, isLoading } = useSelector(makeSelectReport())
  const reportAnswer = useSelector(makeSelectReportAnswer())
  const isSubmitSuccess = useSelector(makeSelectSubmitReportSuccess())
  const isSaveDraftSuccess = useSelector(makeSelectSaveDraftReportSuccess())
  const errorReport = useSelector(makeSelectError())
  const { historyId } = useSelector(makeSelectLessonDetail())

  const [dataQuestion, setQuestions] = useState([])

  usePageNotFound({ error: errorReport })

  useEffect(() => {
    if (isNaN(courseId) || isNaN(reportId)) {
      history.push('/report/page-not-found')
    } else {
      dispatch(loadReport({
        userId: id,
        courseId,
        reportId
      }))
    }
  }, [id, courseId, reportId, history.location.pathname])

  useEffect(() => {
    if (report?.status === REPORT_STATUS.NEW || report?.status === REPORT_STATUS.RESUBMITTED) {
      const transformData = report.listQuestion.map((item, index) => ({
        ...item,
        listAnswer: (item.listAnswer || []).map((answer) => ({
          ...answer,
          checked: reportAnswer[index]?.answerId.includes(answer.answerId)
        }))
      }))
      setQuestions(transformData)
    } else {
      const transformData = report.listQuestion.map((item) => ({
        ...item,
        listAnswer: (item.listAnswer || []).map((answer) => ({
          ...answer,
          checked: answer.selectedAnswer
        }))
      }))
      setQuestions(transformData)
    }
  }, [reportAnswer])

  const onUpdateReportAnswer = async (questionType, value, questionId) => {
    if (questionType === QUESTION_TYPE.SELECT_ONE) {
      const reportAnswerUpdate = reportAnswer.map((item) => (item.questionId === questionId ? {
        ...item,
        answerId: [value]
      } : item))
      dispatch(updateAnswerReport(reportAnswerUpdate))
    }

    if (questionType === QUESTION_TYPE.CHOOSE_MANY) {
      const filter = value.filter((item) => item.checked).map((item) => item.answerId)
      const reportAnswerUpdate = reportAnswer.map((item) => (item.questionId === questionId ? {
        ...item,
        answerId: filter
      } : item))
      dispatch(updateAnswerReport(reportAnswerUpdate))
    }
    if (questionType === QUESTION_TYPE.DESCRIPTION) {
      const reportAnswerUpdate = reportAnswer.map((item) => (item.questionId === questionId ? {
        ...item,
        answerId: [],
        selectedAnswer: value,
        textDraft: value
      } : item))
      dispatch(updateAnswerReport(reportAnswerUpdate))
    }
  }

  const isInValid = useMemo(() => {
    const dataInvalid = reportAnswer.map((item) => !item.isRequired || item.answerId.length > 0 || item.selectedAnswer.length > 0)
      .filter((item) => !item)
    return dataInvalid.length > 0
  }, [reportAnswer])
  const onSubmitReport = () => {
    const submitTestRequest = reportAnswer.map((item) => ({
      answerId: item.answerId,
      questionId: item.questionId,
      answerTextDescription: item.selectedAnswer || item.textDraft,
      version: item.version,
      isDraft: false
    }))
    dispatch(submitReport({
      userId: id,
      courseId,
      reportId,
      submitTestRequest,
      queryParams: { historyId }
    }))
  }
  const onSaveDraftReport = () => {
    const submitTestRequest = reportAnswer.map((item) => ({
      answerId: item.answerId,
      questionId: item.questionId,
      answerTextDescription: item.textDraft,
      version: item.version,
      isDraft: true
    }))
    dispatch(submitReport({
      userId: id,
      courseId,
      reportId,
      isDraft: true,
      submitTestRequest,
      queryParams: { historyId }
    }))
  }

  const answerNumber = useMemo(() => {
    const countAnswer = reportAnswer.map((item) => item.answerId.length > 0 || item.selectedAnswer.length > 0)
      .filter((item) => item === true)
    return countAnswer.length || 0
  }, [reportAnswer])

  return {
    report,
    reportAnswer,
    isSubmitSuccess,
    dataQuestion,
    onUpdateReportAnswer,
    isInValid,
    onSubmitReport,
    onSaveDraftReport,
    answerNumber,
    isLoadReportSuccess,
    isLoading,
    isSaveDraftSuccess
  }
}
