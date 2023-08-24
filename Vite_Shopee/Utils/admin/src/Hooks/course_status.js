import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course_result/status_learn_course/store/saga'
import reducer from 'Modules/course_result/status_learn_course/store/reducer'
import { makeSelectStatusCourse } from 'Modules/course_result/status_learn_course/store/selectors'
import {
  loadCourseStatus,
  loadAttributeList,
  loadUnitList,
  loadGroupList,
  loadCourseList,
  saveFilter,
  resetCourses
} from 'Modules/course_result/status_learn_course/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'

export const useCourseStatus = () => {
  useInjectSaga({ key: 'statusCourse', saga })
  useInjectReducer({ key: 'statusCourse', reducer })

  const { courses, pagination, filter, isLoading, error, listCourse: listCourseSate, listAttribute, listGroup, listUnit } = useSelector(makeSelectStatusCourse())
  const { isLoading: isLoadingCourseList, data: listCourse, error: errorCourseList } = listCourseSate

  const dispatch = useDispatch()
  const loadCourseStatusAction = (payload) => dispatch(loadCourseStatus(payload))
  const loadCourseListAction = (payload) => dispatch(loadCourseList(payload))
  const loadAttributeListAction = () => dispatch(loadAttributeList())
  const loadUnitListAction = () => dispatch(loadUnitList())
  const loadGroupListAction = () => dispatch(loadGroupList())
  const loadSaveFilterAction = (payload) => dispatch(saveFilter(payload))
  const resetCoursesAction = () => dispatch(resetCourses())

  return {
    courses,
    pagination,
    filter,
    isLoading,
    isLoadingCourseList,
    error,
    errorCourseList,
    listCourse,
    listAttribute,
    listGroup,
    listUnit,
    loadCourseStatusAction,
    loadCourseListAction,
    loadAttributeListAction,
    loadUnitListAction,
    loadGroupListAction,
    loadSaveFilterAction,
    resetCoursesAction
  }
}
