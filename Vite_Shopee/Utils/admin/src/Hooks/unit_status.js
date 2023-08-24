import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course_result/completion_status_by_user/store/saga'
import reducer from 'Modules/course_result/completion_status_by_user/store/reducer'
import { makeSelectStatusUnit } from 'Modules/course_result/completion_status_by_user/store/selectors'
import {
  loadUnitStatus,
  loadAttributeList,
  loadGroupList,
  loadCourseList,
  loadUnitListLesson,
  loadUnitListTest,
  loadUnitListSurvey,
  loadUnitListReport,
  loadUnitListAll,
  saveFilter,
  loadUnitDetail,
  loadUnitDetailById,
  loadDateTimeVariable,
  resetUnitsLearnCourse
} from 'Modules/course_result/completion_status_by_user/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'

export const useUnitStatus = () => {
  useInjectSaga({ key: 'statusUnit', saga })
  useInjectReducer({ key: 'statusUnit', reducer })

  const {
    unit,
    pagination,
    filter,
    isLoading,
    error,
    listCourse: listCourseSate,
    listAttribute,
    listGroup,
    listUnitLesson,
    listUnitTest,
    listUnitSurvey,
    listUnitReport,
    listUnitAll,
    unitDetail,
    unitDetailById,
    paginationDetail
  } = useSelector(makeSelectStatusUnit())

  const { isLoading: isLoadingCourseList, data: listCourse, error: errorCourseList } = listCourseSate

  const dispatch = useDispatch()
  const loadUnitStatusAction = (payload) => dispatch(loadUnitStatus(payload))
  const loadCourseListAction = (payload) => dispatch(loadCourseList(payload))
  const loadAttributeListAction = () => dispatch(loadAttributeList())
  const loadUnitListLessonAction = () => dispatch(loadUnitListLesson())
  const loadUnitListTestAction = () => dispatch(loadUnitListTest())
  const loadUnitListSurveyAction = () => dispatch(loadUnitListSurvey())
  const loadUnitListReportAction = () => dispatch(loadUnitListReport())
  const loadUnitListAllAction = (payload) => dispatch(loadUnitListAll(payload))
  const loadGroupListAction = () => dispatch(loadGroupList())
  const loadSaveFilterAction = (payload) => dispatch(saveFilter(payload))
  const loadUnitDetailAction = (payload) => dispatch(loadUnitDetail(payload))
  const loadUnitDetailByIdAction = (payload) => dispatch(loadUnitDetailById(payload))
  const loadDateTimeVariableAction = (payload) => dispatch(loadDateTimeVariable(payload))
  const resetUnitsLearnCourseAction = () => dispatch(resetUnitsLearnCourse())

  return {
    unit,
    pagination,
    filter,
    isLoading,
    error,
    listCourse,
    listAttribute,
    listGroup,
    listUnitLesson,
    listUnitTest,
    listUnitSurvey,
    listUnitReport,
    listUnitAll,
    isLoadingCourseList,
    errorCourseList,
    unitDetail,
    unitDetailById,
    paginationDetail,
    loadUnitStatusAction,
    loadCourseListAction,
    loadAttributeListAction,
    loadUnitListLessonAction,
    loadUnitListTestAction,
    loadUnitListSurveyAction,
    loadUnitListReportAction,
    loadUnitListAllAction,
    loadGroupListAction,
    loadSaveFilterAction,
    loadUnitDetailAction,
    loadUnitDetailByIdAction,
    loadDateTimeVariableAction,
    resetUnitsLearnCourseAction
  }
}
