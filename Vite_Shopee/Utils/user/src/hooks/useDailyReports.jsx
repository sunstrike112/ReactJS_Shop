import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  createDailyReport,
  createTemplate,
  deleteDailyReport,
  deleteTemplate,
  editDailyReport,
  editTemplate,
  loadDailyReport,
  loadDailyReports,
  loadTemplateDetail,
  loadTemplates,
  dislikeDailyReport,
  likeDailyReport,
  markReadDailyReport,
  loadUsersInteractedDailyReport,
  createDailyReportComment,
  loadCommentsDailyReport,
  setCommentForEdit,
  editDailyReportComment,
  deleteDailyReportComment,
  likeDailyReportComment,
  dislikeDailyReportComment,
  loadUsersInteractedDailyReportComment,
  setCompleteDailyReport,
  getUnreadDailyReportRequest,
  getPrevNextDailyReportRequest
} from '../modules/dailyReport/store/actions'
import reducer from '../modules/dailyReport/store/reducer'
import saga from '../modules/dailyReport/store/saga'
import { makeSelectDailyReports } from '../modules/dailyReport/store/selectors'
import { useInjectReducer, useInjectSaga } from '../store'

export const useDailyReports = () => {
  useInjectSaga({ key: 'dailyReportsStore', saga })
  useInjectReducer({ key: 'dailyReportsStore', reducer })

  const dispatch = useDispatch()

  const { dailyReports, dailyReport, templates, templateDetail, usersInteracted, comments } = useSelector(makeSelectDailyReports())
  const loadDailyReportsAction = useCallback((payload) => dispatch(loadDailyReports(payload)), [])
  const loadDailyReportAction = useCallback((payload) => dispatch(loadDailyReport(payload)), [])
  const createDailyReportAction = useCallback((payload) => dispatch(createDailyReport(payload)), [])
  const editDailyReportAction = useCallback((payload) => dispatch(editDailyReport(payload)), [])
  const deleteDailyReportAction = useCallback((payload) => dispatch(deleteDailyReport(payload)), [])
  const loadUsersInteractedDailyReportAction = useCallback((payload) => dispatch(loadUsersInteractedDailyReport(payload)), [])
  const likeDailyReportAction = useCallback((payload) => dispatch(likeDailyReport(payload)), [])
  const dislikeDailyReportAction = useCallback((payload) => dispatch(dislikeDailyReport(payload)), [])
  const markReadDailyReportAction = useCallback((payload) => dispatch(markReadDailyReport(payload)), [])
  const createDailyReportCommentAction = useCallback((payload) => dispatch(createDailyReportComment(payload)), [])
  const editDailyReportCommentAction = useCallback((payload) => dispatch(editDailyReportComment(payload)), [])
  const loadCommentsDailyReportAction = useCallback((payload) => dispatch(loadCommentsDailyReport(payload)), [])
  const setCommentForEditAction = useCallback((payload) => dispatch(setCommentForEdit(payload)), [])
  const deleteDailyReportCommentAction = useCallback((payload) => dispatch(deleteDailyReportComment(payload)), [])
  const likeDailyReportCommentAction = useCallback((payload) => dispatch(likeDailyReportComment(payload)), [])
  const dislikeDailyReportCommentAction = useCallback((payload) => dispatch(dislikeDailyReportComment(payload)), [])
  const loadUsersInteractedDailyReportCommentAction = useCallback((payload) => dispatch(loadUsersInteractedDailyReportComment(payload)), [])
  const setCompleteDailyReportAction = useCallback((payload) => dispatch(setCompleteDailyReport(payload)), [])
  const getUnreadDailyReportAction = useCallback(() => dispatch(getUnreadDailyReportRequest()), [])
  const getPrevNextDailyReportAction = useCallback((payload) => dispatch(getPrevNextDailyReportRequest(payload)), [])

  const loadTemplatesAction = useCallback((payload) => dispatch(loadTemplates(payload)), [])
  const loadTemplateDetailAction = useCallback((payload) => dispatch(loadTemplateDetail(payload)), [])
  const deleteTemplateAction = useCallback((payload) => dispatch(deleteTemplate(payload)), [])
  const createTemplateAction = useCallback((payload) => dispatch(createTemplate(payload)), [])
  const editTemplateAction = useCallback((payload) => dispatch(editTemplate(payload)), [])

  return {
    // Values
    dailyReports,
    dailyReport,
    usersInteracted,
    templates,
    templateDetail,
    comments,
    // Actions
    loadDailyReportsAction,
    loadDailyReportAction,
    createDailyReportAction,
    editDailyReportAction,
    deleteDailyReportAction,
    loadUsersInteractedDailyReportAction,
    likeDailyReportAction,
    dislikeDailyReportAction,
    markReadDailyReportAction,
    createDailyReportCommentAction,
    editDailyReportCommentAction,
    setCommentForEditAction,
    deleteDailyReportCommentAction,
    loadCommentsDailyReportAction,
    likeDailyReportCommentAction,
    dislikeDailyReportCommentAction,
    loadUsersInteractedDailyReportCommentAction,
    setCompleteDailyReportAction,
    getUnreadDailyReportAction,
    getPrevNextDailyReportAction,

    loadTemplatesAction,
    loadTemplateDetailAction,
    deleteTemplateAction,
    createTemplateAction,
    editTemplateAction
  }
}
