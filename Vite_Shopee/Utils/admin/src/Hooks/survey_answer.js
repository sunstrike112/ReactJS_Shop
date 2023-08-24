import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course_result/survey_answer/store/saga'
import reducer from 'Modules/course_result/survey_answer/store/reducer'
import { makeSelectSurveyAnswer } from 'Modules/course_result/survey_answer/store/selectors'
import {
  loadSurveyAnswer,
  loadAttributeList,
  loadGroupList,
  loadCourseList,
  loadUnitListLesson,
  loadUnitListTest,
  loadUnitListSurvey,
  loadUnitListReport,
  loadUnitListAll,
  loadSurveyAnswerDetail,
  resetSurveyAnswerDetail,
  saveFilter,
  resetState
} from 'Modules/course_result/survey_answer/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'

export const useSurveyAnswer = () => {
  useInjectSaga({ key: 'surveyAnswer', saga })
  useInjectReducer({ key: 'surveyAnswer', reducer })

  const {
    surveyAnswer,
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
    surveyDetail
  } = useSelector(makeSelectSurveyAnswer())

  const { isLoading: isLoadingCourseList, data: listCourse, error: errorCourseList } = listCourseSate

  const dispatch = useDispatch()
  const loadSurveyAnswerAction = (payload) => dispatch(loadSurveyAnswer(payload))
  const loadCourseListAction = (payload) => dispatch(loadCourseList(payload))
  const loadAttributeListAction = () => dispatch(loadAttributeList())
  const loadGroupListAction = () => dispatch(loadGroupList())
  const loadUnitListLessonAction = () => dispatch(loadUnitListLesson())
  const loadUnitListTestAction = () => dispatch(loadUnitListTest())
  const loadUnitListSurveyAction = () => dispatch(loadUnitListSurvey())
  const loadUnitListReportAction = () => dispatch(loadUnitListReport())
  const loadUnitListAllAction = (payload) => dispatch(loadUnitListAll(payload))
  const loadSurveyAnswerDetailAction = (payload) => dispatch(loadSurveyAnswerDetail(payload))
  const resetSurveyAnswerDetailAction = () => dispatch(resetSurveyAnswerDetail())
  const loadSaveFilterAction = (payload) => dispatch(saveFilter(payload))
  const resetStateAction = () => dispatch(resetState())
  return {
    surveyAnswer,
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
    surveyDetail,
    isLoadingCourseList,
    errorCourseList,
    loadSurveyAnswerAction,
    loadCourseListAction,
    loadAttributeListAction,
    loadGroupListAction,
    loadUnitListLessonAction,
    loadUnitListTestAction,
    loadUnitListSurveyAction,
    loadUnitListReportAction,
    loadUnitListAllAction,
    loadSurveyAnswerDetailAction,
    resetSurveyAnswerDetailAction,
    loadSaveFilterAction,
    resetStateAction
  }
}
