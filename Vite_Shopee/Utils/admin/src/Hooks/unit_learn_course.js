import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course_result/unit_learn_course/store/saga'
import reducer from 'Modules/course_result/unit_learn_course/store/reducer'
import { makeSelectStatusUnit } from 'Modules/course_result/unit_learn_course/store/selectors'
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
  loadUnitDetailById
} from 'Modules/course_result/unit_learn_course/store/action'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { resetUnitsLearnCourse } from 'Modules/course_result/completion_status_by_user/store/actions'

export const useUnitLearnCourseStatus = () => {
  useInjectSaga({ key: 'unitLearnCourseStatus', saga })
  useInjectReducer({ key: 'unitLearnCourseStatus', reducer })

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
  const loadUnitStatusAction = (payload) => {
    dispatch(loadUnitStatus(payload))
  }
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
    resetUnitsLearnCourseAction
  }
}
