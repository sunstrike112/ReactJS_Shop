import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course_result/test_results/store/saga'
import reducer from 'Modules/course_result/test_results/store/reducer'
import { makeSelectTestResult } from 'Modules/course_result/test_results/store/selectors'
import {
  loadTestResult,
  loadAttributeList,
  loadGroupList,
  loadCourseList,
  loadUnitListLesson,
  loadUnitListTest,
  loadUnitListSurvey,
  loadUnitListReport,
  loadUnitListAll,
  saveFilter,
  resetTestResult
} from 'Modules/course_result/test_results/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'

export const useTestResult = () => {
  useInjectSaga({ key: 'testResult', saga })
  useInjectReducer({ key: 'testResult', reducer })

  const {
    testResult,
    pagination,
    filter,
    isLoading,
    error,
    listCourse: listCourseSate,
    listAttribute,
    listGroup,
    listUnitAll,
    listUnitLesson,
    listUnitTest,
    listUnitReport,
    listUnitSurvey
  } = useSelector(makeSelectTestResult())
  const { isLoading: isLoadingCourseList, data: listCourse, error: errorCourseList } = listCourseSate

  const dispatch = useDispatch()
  const loadTestResultAction = (payload) => dispatch(loadTestResult(payload))
  const loadCourseListAction = (payload) => dispatch(loadCourseList(payload))
  const loadAttributeListAction = () => dispatch(loadAttributeList())
  const loadUnitListLessonAction = () => dispatch(loadUnitListLesson())
  const loadUnitListTestAction = () => dispatch(loadUnitListTest())
  const loadUnitListSurveyAction = () => dispatch(loadUnitListSurvey())
  const loadUnitListReportAction = () => dispatch(loadUnitListReport())
  const loadUnitListAllAction = (payload) => dispatch(loadUnitListAll(payload))
  const loadGroupListAction = () => dispatch(loadGroupList())
  const loadSaveFilterAction = (payload) => dispatch(saveFilter(payload))
  const resetTestResultAction = () => dispatch(resetTestResult())

  return {
    testResult,
    pagination,
    filter,
    isLoading,
    error,
    listCourse,
    listAttribute,
    listGroup,
    listUnitAll,
    isLoadingCourseList,
    errorCourseList,
    listUnitLesson,
    listUnitTest,
    listUnitReport,
    listUnitSurvey,
    loadTestResultAction,
    loadCourseListAction,
    loadAttributeListAction,
    loadGroupListAction,
    loadUnitListLessonAction,
    loadUnitListTestAction,
    loadUnitListSurveyAction,
    loadUnitListReportAction,
    loadUnitListAllAction,
    loadSaveFilterAction,
    resetTestResultAction
  }
}
