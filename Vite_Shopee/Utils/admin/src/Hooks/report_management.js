/* eslint-disable no-restricted-globals */
import { getListReport, getReportDetail, loadCommentsDailyReport, resetState } from 'Modules/report_management/store/actions'
import reducer from 'Modules/report_management/store/reducer'
import saga from 'Modules/report_management/store/saga'
import { makeGetListReport, makeGetReportDetail } from 'Modules/report_management/store/selectors'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'Stores'

export function useReportManagement() {
  useInjectSaga({ key: 'reportManagement', saga })
  useInjectReducer({ key: 'reportManagement', reducer })

  const {
    listReport,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    error,
    comments
  } = useSelector(makeGetListReport())

  const {
    reportDetail
  } = useSelector(makeGetReportDetail())

  const dispatch = useDispatch()
  const getListReportAction = (payload) => dispatch(getListReport(payload))
  const getReportDetailAction = (payload) => dispatch(getReportDetail(payload))
  const loadCommentsDailyReportAction = useCallback((payload) => dispatch(loadCommentsDailyReport(payload)), [])
  const resetStateAction = () => dispatch(resetState())
  return {
    getListReportAction,
    getReportDetailAction,
    reportDetail,
    listReport,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    error,
    loadCommentsDailyReportAction,
    comments,
    resetStateAction
  }
}
