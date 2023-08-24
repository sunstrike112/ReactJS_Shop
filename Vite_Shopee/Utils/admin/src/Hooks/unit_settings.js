/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import courseSaga from 'Modules/course/registration_course/store/saga'
import courseReducer from 'Modules/course/registration_course/store/reducer'

import saga from 'Modules/course/unit_settings/store/saga'
import reducer from 'Modules/course/unit_settings/store/reducer'

import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  registerTest,
  deleteErrorRegister,
  getDetailTest,
  deleteListUnitLesson,
  loadListUnitLesson,
  loadListOrderUnitLesson,
  updateOrderUnitLesson,
  selectCourseId,
  basicInfoSetting,
  optionSettingTest,
  createUnitLesson,
  getDetailLesson,
  editUnitLesson,
  updatePassScore,
  getQuestionsCategory,
  getQuestionList,
  loadOrderQuestion,
  deleteQuestion,
  updateSortQuestion,
  registerReport,
  loadReportDetail,
  createUnitSurvey,
  getUnitSurvey,
  updateUnitSurvey,
  getUnitSurveyQuestionList,
  createUnitSurveyQuestion,
  getUnitSurveyQuestion,
  updateUnitSurveyQuestion,
  updateOrderUnitSurveyQuestion,
  deleteUnitSurveyQuestions,
  updateBasicReport,
  createQuestion,
  getDetailQuestion,
  editQuestion,
  settingQuestionReport,
  loadQuestionReport,
  deleteQuestionReport,
  createQuestionReport,
  loadDetailQuestionReport,
  editQuestionReport,
  sortQuestionReport,
  removeSelectCourseId,
  createUnitLessonImage
} from 'Modules/course/unit_settings/store/actions'

import {
  makeSelectOrderUnitSetting,
  makeSelectUnitSetting,
  makeSelectCourseId
} from 'Modules/course/unit_settings/store/selectors'
import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'
import { loadCourse } from 'Modules/course/registration_course/store/actions'
import { makeSelectRegistrationCourses } from 'Modules/course/registration_course/store/selectors'
import { stripHTML } from 'Utils/string'

export const useRegisterUnitTest = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { createTest, detailTest, infoBasicSetting, optionSetting, questionSetting } = useSelector(makeSelectUnitSetting())

  const registerTestAction = (payload) => dispatch(registerTest(payload))
  const getDetailTestAction = (payload) => dispatch(getDetailTest(payload))
  const deleteErrorRegisterAction = () => dispatch(deleteErrorRegister())
  const basicInfoSettingAction = (payload) => dispatch(basicInfoSetting(payload))
  const optionSettingTestAction = (payload) => dispatch(optionSettingTest(payload))
  const updatePassScoreAction = (payload) => dispatch(updatePassScore(payload))
  const getQuestionCategoryAction = () => dispatch(getQuestionsCategory())
  const getQuestionListAction = (payload) => dispatch(getQuestionList(payload))

  return {
    registerTestAction,
    deleteErrorRegisterAction,
    getDetailTestAction,
    basicInfoSettingAction,
    optionSettingTestAction,
    updatePassScoreAction,
    getQuestionCategoryAction,
    getQuestionListAction,
    createTest,
    detailTest,
    infoBasicSetting,
    optionSetting,
    questionSetting
  }
}

export const useTestDetail = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { detailTest } = useSelector(makeSelectUnitSetting())

  const getDetailTestAction = (payload) => dispatch(getDetailTest(payload))

  return {
    getDetailTestAction,
    detailTest
  }
}

export const useBasicInfoSetting = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { infoBasicSetting } = useSelector(makeSelectUnitSetting())

  const basicInfoSettingAction = (payload) => dispatch(basicInfoSetting(payload))

  return {
    basicInfoSettingAction,
    infoBasicSetting
  }
}

export const useOptionSetting = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { optionSetting } = useSelector(makeSelectUnitSetting())

  const optionSettingTestAction = (payload) => dispatch(optionSettingTest(payload))

  return {
    optionSettingTestAction,
    optionSetting
  }
}

export const useQuestionSetting = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const { t } = useTranslation(['unit_setting'])

  const dispatch = useDispatch()

  const { questionSetting } = useSelector(makeSelectUnitSetting())

  const renderQuestionType = useCallback((type) => {
    switch (type) {
      case 'CHOOSE_MANY': return t('question_setting.multiple_choice')
      case 'DESCRIPTION': return t('question_setting.description_choice')
      default:
        return t('question_setting.single_choice')
    }
  }, [questionSetting])

  const orderQuestions = useMemo(
    () => questionSetting.orderQuestions.map((item, index) => ({
      ...item,
      index,
      pointAllocation: t('common:points', { point: item.pointAllocation }),
      questionType: renderQuestionType(item.questionType),
      questionText: stripHTML(item.questionText)
    })),
    [t, questionSetting]
  )

  const updatePassScoreAction = (payload) => dispatch(updatePassScore(payload))
  const getQuestionCategoryAction = () => dispatch(getQuestionsCategory())
  const getQuestionListAction = (payload) => dispatch(getQuestionList(payload))
  const loadOrderQuestionAction = (payload) => dispatch(loadOrderQuestion(payload))
  const deleteQuestionAction = (payload) => dispatch(deleteQuestion(payload))
  const updateSortQuestionAction = (payload) => dispatch(updateSortQuestion(payload))

  return {
    updatePassScoreAction,
    getQuestionCategoryAction,
    getQuestionListAction,
    deleteQuestionAction,
    loadOrderQuestionAction,
    updateSortQuestionAction,
    questionSetting,
    orderQuestions
  }
}

export const useLoadUnitSetting = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const { unitLessons, pagination, filter, isLoading, error, selectedCourse, unitId } =	useSelector(makeSelectUnitSetting())
  const courseId = useSelector(makeSelectCourseId())
  const dispatch = useDispatch()

  const loadListUnitLessonAction = (payload) => dispatch(loadListUnitLesson(payload))
  const deleteListUnitLessonAction = (payload) => dispatch(deleteListUnitLesson(payload))
  const loadListOrderUnitLessonAction = (payload) => dispatch(loadListOrderUnitLesson(payload))
  const selectCourseIdAction = (selected) => dispatch(selectCourseId({ selectedCourse: selected }))
  const removeSelectCourseIdAction = () => dispatch(removeSelectCourseId())

  return {
    unitLessons,
    pagination,
    filter,
    isLoading,
    error,
    selectedCourse,
    courseId,
    unitId,
    loadListUnitLessonAction,
    deleteListUnitLessonAction,
    selectCourseIdAction,
    loadListOrderUnitLessonAction,
    removeSelectCourseIdAction
  }
}

export const useSortUnitLesson = () => {
  const { isLoading, isLoadingOrder, error } = useSelector(makeSelectUnitSetting())
  const order = useSelector(makeSelectOrderUnitSetting())

  const dispatch = useDispatch()
  const updateOrderUnitLessonAction = (payload) => dispatch(updateOrderUnitLesson(payload))

  return {
    order,
    isLoading,
    isLoadingOrder,
    error,
    updateOrderUnitLessonAction
  }
}

export const useCreateUnitLesson = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { createLesson: { isSuccess, error, isLoading } } = useSelector(makeSelectUnitSetting())

  const createUnitLessonAction = (payload) => dispatch(createUnitLesson(payload))
  const createUnitLessonImageAction = (payload) => dispatch(createUnitLessonImage(payload))

  return {
    createUnitLessonAction,
    createUnitLessonImageAction,
    isSuccess,
    isLoading,
    error
  }
}

export const useEditUnitLesson = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { editLesson: { isSuccess, error, isLoading }, detailLesson: { data: detailLesson, isLoading: isLoadingDetail, error: errorDetail } } = useSelector(makeSelectUnitSetting())

  const editUnitLessonAction = (payload) => dispatch(editUnitLesson(payload))
  const getDetailLessonAction = (payload) => dispatch(getDetailLesson(payload))

  return {
    editUnitLessonAction,
    getDetailLessonAction,
    isSuccess,
    isLoading,
    error,
    detailLesson,
    isLoadingDetail,
    errorDetail
  }
}

export const useRegisterReport = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const { createReport } = useSelector(makeSelectUnitSetting())

  const dispatch = useDispatch()

  const registerReportAction = (payload) => dispatch(registerReport(payload))

  return {
    registerReportAction,
    createReport
  }
}

export const useLoadReportDetail = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const { detailReport } = useSelector(makeSelectUnitSetting())

  const dispatch = useDispatch()

  const loadReportDetailAction = (payload) => dispatch(loadReportDetail(payload))

  return {
    loadReportDetailAction,
    detailReport
  }
}

export const useCreateUnitSurvey = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  useInjectSaga({ key: 'registrationCourses', saga: courseSaga })
  useInjectReducer({ key: 'registrationCourses', reducer: courseReducer })

  const dispatch = useDispatch()

  const { surveyQuestion, surveyQuestions, isLoading, isSubmitting, isSubmittingSurveyQuestion, error } = useSelector(makeSelectUnitSetting())
  const { course } = useSelector(makeSelectRegistrationCourses())

  const createUnitSurveyAction = (payload) => dispatch(createUnitSurvey(payload))
  const getUnitSurveyQuestionsAction = (payload) => dispatch(getUnitSurveyQuestionList(payload))
  const createUnitSurveyQuestionAction = (payload) => dispatch(createUnitSurveyQuestion(payload))
  const getUnitSurveyQuestionAction = (payload) => dispatch(getUnitSurveyQuestion(payload))
  const updateUnitSurveyQuestionAction = (payload) => dispatch(updateUnitSurveyQuestion(payload))
  const updateOrderUnitSurveyQuestionAction = (payload) => dispatch(updateOrderUnitSurveyQuestion(payload))
  const deleteUnitSurveyQuestionsAction = (payload) => dispatch(deleteUnitSurveyQuestions(payload))
  const loadCourseAction = (payload) => dispatch(loadCourse(payload))

  return {
    course,
    surveyQuestion,
    surveyQuestions,
    isLoading,
    isSubmitting,
    isSubmittingSurveyQuestion,
    error,
    createUnitSurveyAction,
    getUnitSurveyQuestionsAction,
    createUnitSurveyQuestionAction,
    getUnitSurveyQuestionAction,
    updateUnitSurveyQuestionAction,
    updateOrderUnitSurveyQuestionAction,
    deleteUnitSurveyQuestionsAction,
    loadCourseAction
  }
}

export const useEditUnitSurvey = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { survey, surveyQuestion, surveyQuestions, isLoading, isSubmitting, error } = useSelector(makeSelectUnitSetting())

  const getUnitSurveyAction = (payload) => dispatch(getUnitSurvey(payload))
  const updateUnitSurveyAction = (payload) => dispatch(updateUnitSurvey(payload))
  const getUnitSurveyQuestionsAction = (payload) => dispatch(getUnitSurveyQuestionList(payload))
  const createUnitSurveyQuestionAction = (payload) => dispatch(createUnitSurveyQuestion(payload))
  const getUnitSurveyQuestionAction = (payload) => dispatch(getUnitSurveyQuestion(payload))
  const updateUnitSurveyQuestionAction = (payload) => dispatch(updateUnitSurveyQuestion(payload))
  const updateOrderUnitSurveyQuestionAction = (payload) => dispatch(updateOrderUnitSurveyQuestion(payload))
  const deleteUnitSurveyQuestionsAction = (payload) => dispatch(deleteUnitSurveyQuestions(payload))

  return {
    survey,
    surveyQuestion,
    surveyQuestions,
    isLoading,
    isSubmitting,
    error,
    getUnitSurveyAction,
    updateUnitSurveyAction,
    getUnitSurveyQuestionsAction,
    createUnitSurveyQuestionAction,
    getUnitSurveyQuestionAction,
    updateUnitSurveyQuestionAction,
    updateOrderUnitSurveyQuestionAction,
    deleteUnitSurveyQuestionsAction
  }
}

export const useCreateQuestion = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { createQuestion: { isSuccess, error, isLoading } } = useSelector(makeSelectUnitSetting())

  const createQuestionAction = (payload) => dispatch(createQuestion(payload))

  return {
    createQuestionAction,
    isSuccess,
    isLoading,
    error
  }
}

export const useEditQuestion = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { editQuestion: { isSuccess, error, isLoading }, detailQuestion: { data: detailQuestion, isLoading: isLoadingDetail, error: errorDetail } } = useSelector(makeSelectUnitSetting())

  const editQuestionAction = (payload) => dispatch(editQuestion(payload))
  const getDetailQuestionAction = (payload) => dispatch(getDetailQuestion(payload))

  return {
    editQuestionAction,
    getDetailQuestionAction,
    isSuccess,
    isLoading,
    error,
    detailQuestion,
    isLoadingDetail,
    errorDetail
  }
}

export const useUpdateBasicReport = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const { isLoadingUpdateBasicReport } = useSelector(makeSelectUnitSetting())

  const updateBasicReportAction = (payload) => dispatch(updateBasicReport(payload))

  return {
    updateBasicReportAction,
    isLoadingUpdateBasicReport
  }
}

export const useSettingQuestionReport = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const dispatch = useDispatch()

  const {
    isDeleteQuestionReport,
    detailQuestionReport,
    isLoadingSettingQuestionReport
  } = useSelector(makeSelectUnitSetting())

  const settingQuestionReportAction = (payload) => dispatch(settingQuestionReport(payload))
  const deleteQuestionReportAction = (payload) => dispatch(deleteQuestionReport(payload))
  const createQuestionReportAction = (payload) => dispatch(createQuestionReport(payload))
  const editQuestionReportAction = (payload) => dispatch(editQuestionReport(payload))
  const loadDetailQuestionReportAction = (payload) => dispatch(loadDetailQuestionReport(payload))
  const sortQuestionReportAction = (payload) => dispatch(sortQuestionReport(payload))

  return {
    settingQuestionReportAction,
    deleteQuestionReportAction,
    createQuestionReportAction,
    loadDetailQuestionReportAction,
    editQuestionReportAction,
    sortQuestionReportAction,
    isDeleteQuestionReport,
    detailQuestionReport,
    isLoadingSettingQuestionReport
  }
}

export const useLoadQuestionReport = () => {
  useInjectSaga({ key: 'unitSetting', saga })
  useInjectReducer({ key: 'unitSetting', reducer })

  const { reportQuestions } = useSelector(makeSelectUnitSetting())

  const dispatch = useDispatch()

  const loadQuestionReportAction = (payload) => dispatch(loadQuestionReport(payload))

  const { t } = useTranslation(['unit_setting'])

  const renderQuestionType = useCallback((type) => {
    switch (type) {
      case 'CHOOSE_MANY': return t('question_setting.multiple_choice')
      case 'DESCRIPTION': return t('question_setting.description_choice')
      default:
        return t('question_setting.single_choice')
    }
  }, [reportQuestions])

  const orderQuestionsReport = useMemo(
    () => reportQuestions.map((item, index) => ({
      ...item,
      index: index + 1,
      contentQuestion: stripHTML(item.contentQuestion),
      questionType: renderQuestionType(item.questionType)
    })),
    [t, reportQuestions]
  )

  return {
    loadQuestionReportAction,
    orderQuestionsReport,
    reportQuestions
  }
}
