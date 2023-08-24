/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/course/report_publishing/store/saga'
import reducer from 'Modules/course/report_publishing/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { loadDetailPubLishReports, loadReports, updateDetailPubLishReports } from 'Modules/course/report_publishing/store/actions'
import {
  makeSelectReportSetting
} from 'Modules/course/report_publishing/store/selectors'

export const useLoadReports = () => {
  useInjectSaga({ key: 'reportPublishSetting', saga })
  useInjectReducer({ key: 'reportPublishSetting', reducer })

  const dispatch = useDispatch()

  const { reports, pagination, filter } = useSelector(makeSelectReportSetting())

  const loadReportsAction = (payload) => dispatch(loadReports(payload))

  return {
    reports,
    pagination,
    filter,
    loadReportsAction
  }
}

export const useDetailPublishReports = () => {
  useInjectSaga({ key: 'reportPublishSetting', saga })
  useInjectReducer({ key: 'reportPublishSetting', reducer })

  const dispatch = useDispatch()

  const { detailPublishReport } = useSelector(makeSelectReportSetting())

  const loadDetailPublishReportAction = (payload) => dispatch(loadDetailPubLishReports(payload))
  const updateDetailPublishReportAction = (payload) => dispatch(updateDetailPubLishReports(payload))

  return {
    detailPublishReport,
    loadDetailPublishReportAction,
    updateDetailPublishReportAction
  }
}
