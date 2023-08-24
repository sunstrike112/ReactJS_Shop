import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course/setting_course_jobnare/store/saga'
import reducer from 'Modules/course/setting_course_jobnare/store/reducer'
import { makeSettingCourseJobnare } from 'Modules/course/setting_course_jobnare/store/selectors'
import {
  updateAutoStatus,
  loadExceptCourse,
  loadExceptCourseAll,
  addExceptCourse,
  deleteExceptCourse
} from 'Modules/course/setting_course_jobnare/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'

export const useSettingCourseJobnare = () => {
  useInjectSaga({ key: 'settingCourseJobnare', saga })
  useInjectReducer({ key: 'settingCourseJobnare', reducer })

  const { coursesExcept, coursesExceptAll, assignAuto, pagination, isLoading, isAutoAssigning, isAdding, isDeleting, error } = useSelector(makeSettingCourseJobnare())

  const dispatch = useDispatch()
  const updateAutoStatusAction = (payload) => dispatch(updateAutoStatus(payload))
  const loadExceptCourseAction = (payload) => dispatch(loadExceptCourse(payload))
  const loadExceptAllCourseAction = (payload) => dispatch(loadExceptCourseAll(payload))
  const addExceptCourseAction = (payload) => dispatch(addExceptCourse(payload))
  const deleteExceptCourseAction = (payload) => dispatch(deleteExceptCourse(payload))

  return {
    coursesExcept,
    coursesExceptAll,
    assignAuto,
    pagination,
    isLoading,
    isAutoAssigning,
    isAdding,
    isDeleting,
    error,
    updateAutoStatusAction,
    loadExceptCourseAction,
    loadExceptAllCourseAction,
    addExceptCourseAction,
    deleteExceptCourseAction
  }
}
