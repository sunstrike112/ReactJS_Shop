/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import reportHistoriesSaga from 'Modules/course_result/report_histories/store/saga'
import reportHistoriesReducer from 'Modules/course_result/report_histories/store/reducers'
import reportDetailSaga from 'Modules/course_result/evaluate_report/store/saga'
import reportDetailReducer from 'Modules/course_result/evaluate_report/store/reducers'
import {
  makeSelectReportResult
} from 'Modules/course_result/report_histories/store/selectors'
import {
  loadReportResult,
  resetState
} from 'Modules/course_result/report_histories/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { makeSelectReportDetail } from 'Modules/course_result/evaluate_report/store/selectors'
import { loadReportDetail, loadReportQuestions } from 'Modules/course_result/evaluate_report/store/actions'

export const useReportResult = () => {
  useInjectSaga({ key: 'reportResults', saga: reportHistoriesSaga })
  useInjectReducer({ key: 'reportResults', reducer: reportHistoriesReducer })
  useInjectSaga({ key: 'reportDetail', saga: reportDetailSaga })
  useInjectReducer({ key: 'reportDetail', reducer: reportDetailReducer })

  const { results, pagination, isLoading, error, filter } = useSelector(makeSelectReportResult())
  const { report, isLoading: reportDetailIsLoading, questions } = useSelector(makeSelectReportDetail())

  const dispatch = useDispatch()
  const loadReportResultAction = (payload) => dispatch(loadReportResult(payload))
  const loadReportDetailAction = (payload) => dispatch(loadReportDetail(payload))
  const loadReportQuestionsAction = (payload) => dispatch(loadReportQuestions(payload))
  const resetStateAction = () => dispatch(resetState())
  return {
    results,
    pagination,
    isLoading,
    error,
    filter,
    report,
    reportDetailIsLoading,
    questions,
    loadReportResultAction,
    loadReportDetailAction,
    loadReportQuestionsAction,
    resetStateAction
  }
}
