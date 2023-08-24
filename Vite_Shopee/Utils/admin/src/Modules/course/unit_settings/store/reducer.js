import { LOCATION_CHANGE } from 'connected-react-router'
import { RoutesName } from 'Modules/course/routes'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  GET_DETAIL_TEST,
  REGISTER_TEST,
  LOAD_LIST_ORDER_UNIT_LESSON,
  DELETE_LIST_UNIT_LESSON,
  LOAD_LIST_UNIT_LESSON,
  UPDATE_ORDER_UNIT_LESSON,
  SELECT_COURSE_ID,
  DELETE_ERROR_REGISTER,
  BASIC_INFO_SETTING,
  OPTION_SETTING,
  CREATE_UNIT_LESSON,
  EDIT_UNIT_LESSON,
  GET_DETAIL_LESSON,
  UPDATE_PASS_SCORE,
  GET_QUESTIONS_CATEGORY,
  GET_QUESTION_LIST,
  DELETE_QUESTION,
  LOAD_ORDER_QUESTION,
  UPDATE_SORT_QUESTION,
  REGISTER_REPORT,
  LOAD_REPORT_DETAIL,
  GET_UNIT_SURVEY_QUESTION,
  UPDATE_UNIT_SURVEY_QUESTION,
  CREATE_UNIT_SURVEY_QUESTION,
  DELETE_LIST_UNIT_SURVEY_QUESTION,
  LOAD_LIST_UNIT_SURVEY_QUESTION,
  UPDATE_UNIT_SURVEY,
  CREATE_UNIT_SURVEY,
  GET_UNIT_SURVEY,
  LOAD_QUESTION_REPORT,
  UPDATE_BASIC_SETTING_REPORT,
  CREATE_QUESTION,
  SETTING_QUESTION_REPORT,
  MODIFY_LIST_UNIT_SURVEY_QUESTION,
  EDIT_QUESTION,
  GET_DETAIL_QUESTION,
  DELETE_QUESTION_REPORT,
  UPDATE_ORDER_UNIT_SURVEY_QUESTION,
  CREATE_QUESTION_REPORT,
  LOAD_DETAIL_QUESTION_REPORT,
  EDIT_QUESTION_REPORT,
  SORT_QUESTION_REPORT,
  REMOVE_SELECT_COURSE_ID,
  CREATE_UNIT_LESSON_IMAGE,
  GET_DETAIL_LESSON_IMAGE
} from './constants'

const createTest = {
  isLoading: false,
  isCreating: false,
  data: null,
  error: null
}

const detailTest = {
  isLoading: false,
  data: null,
  error: null
}

const detailLessonInitial = {
  isLoading: false,
  data: null,
  error: null
}

const createLessonInitial = {
  isLoading: false,
  isSuccess: false,
  data: null,
  error: null
}

const createLessonImageInitial = {
  isLoading: false,
  isSuccess: false,
  data: null,
  error: null
}

const createQuestionInitial = {
  isLoading: false,
  isSuccess: false,
  data: null,
  error: null
}

const infoBasicSetting = {
  isLoading: false,
  isUpdating: false,
  data: null,
  error: null
}

const optionSetting = {
  isLoading: false,
  isSetting: false,
  data: null,
  error: null
}

const questionSetting = {
  isLoading: false,
  isLoadingUpdatePassScore: false,
  isUpdatePassScore: false,
  isDeleting: false,
  isSorting: false,
  questions: [],
  orderQuestions: [],
  pagination: {},
  filter: {},
  error: null
}

const createReport = {
  isLoading: false,
  isRegistering: false,
  data: null,
  error: null
}

const detailReport = {
  isLoading: false,
  data: [],
  error: null
}

const detailLessonImage = {
  isLoading: false,
  data: [],
  error: null
}

export const initialState = {
  isLoading: false,
  isLoadingOrder: false,
  createTest: { ...createTest },
  detailTest: { ...detailTest },
  createLesson: { ...createLessonInitial },
  createLessonImage: { ...createLessonImageInitial },
  editLesson: { ...createLessonInitial },
  detailLesson: { ...detailLessonInitial },
  infoBasicSetting: { ...infoBasicSetting },
  optionSetting: { ...optionSetting },
  questionSetting: { ...questionSetting },
  createReport: { ...createReport },
  detailReport: { ...detailReport },
  reportQuestions: [],
  createQuestion: { ...createQuestionInitial },
  editQuestion: { ...createQuestionInitial },
  detailQuestion: { ...createQuestionInitial },
  detailQuestionReport: {},
  detailLessonImage: { ...detailLessonImage },
  survey: {},
  surveyQuestions: [],
  surveyQuestion: {},
  error: null,
  courses: [],
  unitLessons: [],
  course: {},
  pagination: {},
  filter: {},
  order: [],
  isSubmitting: false,
  isSubmittingSurveyQuestion: false,
  isLoadingUpdateBasicReport: false,
  isLoadingSettingQuestionReport: false,
  isDeleteQuestionReport: false,
  isCreateQuestionReport: false,
  isEditQuestionReport: false,
  isSortQuestionReport: false,
  selectedCourse: {
    data: {},
    companyId: {
      label: 'ジョブナレ',
      value: 1
    },
    title: '',
    value: '',
    label: {}
  },
  unitId: 0
}

function registerTest(state) {
  return updateObject(state, {
    createTest: {
      ...state.createTest,
      isLoading: true
    }
  })
}

function registerTestSuccess(state, { data }) {
  return updateObject(state, {
    createTest: {
      ...state.createTest,
      isLoading: false,
      isCreating: true,
      data
    }
  })
}

function registerTestFailure(state, { error }) {
  return updateObject(state, {
    createTest: {
      ...state.createTest,
      isLoading: false,
      error
    }
  })
}

function deleteErrorRegister(state) {
  return updateObject(state, {
    createTest: {
      ...state.createTest,
      isLoading: false
    }
  })
}

function deleteErrorRegisterSuccess(state) {
  return updateObject(state, {
    createTest: {
      ...state.createTest,
      isLoading: false,
      error: null
    }
  })
}

function getDetailTest(state) {
  return updateObject(state, {
    detailTest: {
      ...state.detailTest,
      isLoading: true
    }
  })
}

function getDetailTestSuccess(state, { data }) {
  return updateObject(state, {
    detailTest: {
      ...state.detailTest,
      isLoading: false,
      data
    }
  })
}

function getDetailTestFailure(state, { error }) {
  return updateObject(state, {
    detailTest: {
      ...state.detailTest,
      isLoading: false,
      error
    }
  })
}

function loadListOrderUnitLesson(state) {
  return updateObject(state, {
    isLoadingOrder: true
  })
}

function loadListOrderUnitLessonSuccess(state, { payload }) {
  const { order } = payload
  return updateObject(state, {
    order,
    isLoadingOrder: false
  })
}

function loadListOrderUnitLessonError(state, { error }) {
  return updateObject(state, {
    error,
    isLoadingOrder: false,
    order: []
  })
}

function editOrderUnitLesson(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function editOrderUnitLessonSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function editOrderUnitLessonError(state, { error }) {
  return updateObject(state, { error })
}

function deleteListUnitLesson(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function deleteListUnitLessonSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function deleteListUnitLessonError(state, { error }) {
  return updateObject(state, { error })
}

function loadListUnitLesson(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadListUnitLessonSuccess(state, { payload }) {
  const { unitLessons, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    unitLessons,
    pagination,
    filter
  })
}

function loadListUnitLessonError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function selectCourseId(state, { payload }) {
  const { selectedCourse } = payload
  return updateObject(state, {
    selectedCourse
  })
}

function removeSelectCourseId(state) {
  return updateObject(state, {
    selectedCourse: initialState.selectedCourse
  })
}

function basicInfoSetting(state) {
  return updateObject(state, {
    infoBasicSetting: {
      ...state.infoBasicSetting,
      isLoading: true
    }
  })
}

function basicInfoSettingSuccess(state, { data }) {
  return updateObject(state, {
    infoBasicSetting: {
      ...state.infoBasicSetting,
      isLoading: false,
      isUpdating: true,
      data
    }
  })
}

function basicInfoSettingFailure(state, { error }) {
  return updateObject(state, {
    infoBasicSetting: {
      ...state.infoBasicSetting,
      isLoading: false,
      error
    }
  })
}

function optionSettingTest(state) {
  return updateObject(state, {
    optionSetting: {
      ...state.optionSettingTest,
      isLoading: true
    }
  })
}

function optionSettingTestSuccess(state, { data }) {
  return updateObject(state, {
    optionSetting: {
      ...state.optionSetting,
      isLoading: false,
      isSetting: true,
      data
    }
  })
}

function optionSettingTestFailure(state, { error }) {
  return updateObject(state, {
    optionSetting: {
      ...state.optionSetting,
      isLoading: false,
      error
    }
  })
}

function createLesson(state) {
  return updateObject(state, {
    createLesson: {
      ...state.createLesson,
      isLoading: true
    }
  })
}

function createLessonSuccess(state, { data }) {
  return updateObject(state, {
    createLesson: {
      ...state.createLesson,
      isLoading: false,
      isSuccess: true
    },
    unitId: data
  })
}

function createLessonError(state, { error }) {
  return updateObject(state, {
    createLesson: {
      ...state.createLesson,
      isLoading: false,
      error
    }
  })
}

function createLessonImage(state) {
  return updateObject(state, {
    createLessonImage: {
      ...state.createLessonImage,
      isLoading: true
    }
  })
}

function createLessonImageSuccess(state, { data }) {
  return updateObject(state, {
    createLessonImage: {
      ...state.createLessonImage,
      isLoading: false,
      isSuccess: true
    },
    unitId: data
  })
}

function createLessonImageError(state, { error }) {
  return updateObject(state, {
    createLessonImage: {
      ...state.createLessonImage,
      isLoading: false,
      error
    }
  })
}

function createQuestion(state) {
  return updateObject(state, {
    createQuestion: {
      ...state.createQuestion,
      isLoading: true
    }
  })
}

function createQuestionSuccess(state, { data }) {
  return updateObject(state, {
    createQuestion: {
      ...state.createQuestion,
      isLoading: false,
      isSuccess: true,
      data
    }
  })
}

function createQuestionError(state, { error }) {
  return updateObject(state, {
    createQuestion: {
      ...state.createQuestion,
      isLoading: false,
      error
    }
  })
}

function getDetailQuestion(state) {
  return updateObject(state, {
    detailQuestion: {
      ...state.detailQuestion,
      isLoading: true
    }
  })
}

function getDetailQuestionSuccess(state, { data }) {
  return updateObject(state, {
    detailQuestion: {
      ...state.detailQuestion,
      isLoading: false,
      data
    }
  })
}

function getDetailQuestionFailure(state, { error }) {
  return updateObject(state, {
    detailQuestion: {
      ...state.detailQuestion,
      isLoading: false,
      error
    }
  })
}

function editQuestion(state) {
  return updateObject(state, {
    editQuestion: {
      ...state.editQuestion,
      isLoading: true
    }
  })
}

function editQuestionSuccess(state, { data }) {
  return updateObject(state, {
    editQuestion: {
      ...state.editQuestion,
      isLoading: false,
      isSuccess: true,
      data
    }
  })
}

function editQuestionError(state, { error }) {
  return updateObject(state, {
    editQuestion: {
      ...state.editQuestion,
      isLoading: false,
      error
    }
  })
}

function getDetailLesson(state) {
  return updateObject(state, {
    detailLesson: {
      ...state.detailLesson,
      isLoading: true
    }
  })
}

function getDetailLessonSuccess(state, { data }) {
  return updateObject(state, {
    detailLesson: {
      ...state.detailLesson,
      isLoading: false,
      data
    }
  })
}

function getDetailLessonFailure(state, { error }) {
  return updateObject(state, {
    detailLesson: {
      ...state.detailLesson,
      isLoading: false,
      error
    }
  })
}

function updatePassScore(state) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoadingUpdatePassScore: true
    }
  })
}

function updatePassScoreSuccess(state) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoadingUpdatePassScore: false,
      isUpdatePassScore: true
    }
  })
}

function updatePassScoreFailure(state, { error }) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoadingUpdatePassScore: false,
      error
    }
  })
}

function editLesson(state) {
  return updateObject(state, {
    editLesson: {
      ...state.editLesson,
      isLoading: true
    }
  })
}

function getQuestionCategory(state) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: true
    }
  })
}

function editLessonSuccess(state, { data }) {
  return updateObject(state, {
    editLesson: {
      ...state.editLesson,
      isLoading: false,
      isSuccess: true,
      data
    }
  })
}

function getQuestionCategorySuccess(state, { data }) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      questionCategory: data
    }
  })
}

function getQuestionCategoryFailure(state, { error }) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      error
    }
  })
}

function getQuestionList(state) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: true
    }
  })
}

function getQuestionListSuccess(state, { payload }) {
  const { questions, pagination, filter } = payload
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      questions,
      pagination,
      filter
    }
  })
}

function editLessonError(state, { error }) {
  return updateObject(state, {
    editLesson: {
      ...state.editLesson,
      isLoading: false,
      error
    }
  })
}

function getQuestionListFailure(state, { error }) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      error
    }
  })
}

function loadOrderQuestion(state) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: true
    }
  })
}

function loadOrderQuestionSuccess(state, { data }) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      orderQuestions: data
    }
  })
}

function loadOrderQuestionFailure(state, { error }) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      error
    }
  })
}

function deleteQuestion(state) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: true
    }
  })
}

function deleteQuestionSuccess(state) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      isDeleting: true
    }
  })
}

function deleteQuestionFailure(state, { error }) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      error
    }
  })
}

function updateSortQuestion(state) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: true
    }
  })
}

function updateSortQuestionSuccess(state) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      isSorting: true
    }
  })
}

function updateSortQuestionFailure(state, { error }) {
  return updateObject(state, {
    questionSetting: {
      ...state.questionSetting,
      isLoading: false,
      error
    }
  })
}

function registerReportRequest(state) {
  return updateObject(state, {
    createReport: {
      ...state.createReport,
      isLoading: true
    }
  })
}

function registerReportSuccess(state, { data }) {
  return updateObject(state, {
    createReport: {
      ...state.createReport,
      isLoading: false,
      isRegistering: true,
      data
    }
  })
}

function registerReportFailure(state, { error }) {
  return updateObject(state, {
    createReport: {
      ...state.createReport,
      isLoading: false,
      error
    }
  })
}

function loadReportDetail(state) {
  return updateObject(state, {
    detailReport: {
      ...state.detailReport,
      isLoading: true
    }
  })
}

function loadReportDetailSuccess(state, { data }) {
  return updateObject(state, {
    detailReport: {
      ...state.detailReport,
      isLoading: false,
      data
    }
  })
}

function loadReportDetailFailure(state, { error }) {
  return updateObject(state, {
    detailReport: {
      ...state.detailReport,
      isLoading: false,
      error
    }
  })
}

function createUnitSurvey(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function createUnitSurveySuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: false
  })
}

function createUnitSurveyFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function getUnitSurvey(state) {
  return updateObject(state, {
    ...state,
    isLoading: true
  })
}

function getUnitSurveySuccess(state, { survey }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    survey
  })
}

function getUnitSurveyFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}

function updateUnitSurvey(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function updateUnitSurveySuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: false
  })
}

function updateUnitSurveyFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function getUnitSurveyQuestions(state) {
  return updateObject(state, {
    ...state,
    isLoading: true
  })
}

function getUnitSurveyQuestionsSuccess(state, { surveyQuestions }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    surveyQuestions
  })
}

function getUnitSurveyQuestionsFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}

function deleteUnitSurveyQuestions(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function deleteUnitSurveyQuestionsSuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: false
  })
}

function deleteUnitSurveyQuestionsFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function createUnitSurveyQuestion(state) {
  return updateObject(state, {
    ...state,
    isSubmittingSurveyQuestion: true
  })
}

function createUnitSurveyQuestionSuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmittingSurveyQuestion: false
  })
}

function createUnitSurveyQuestionFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmittingSurveyQuestion: false,
    error
  })
}

function getUnitSurveyQuestion(state) {
  return updateObject(state, {
    ...state,
    isLoading: true
  })
}

function getUnitSurveyQuestionSuccess(state, { surveyQuestion }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    surveyQuestion
  })
}

function getUnitSurveyQuestionFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}

function updateUnitSurveyQuestion(state) {
  return updateObject(state, {
    ...state,
    isSubmittingSurveyQuestion: true
  })
}

function updateUnitSurveyQuestionSuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmittingSurveyQuestion: false
  })
}

function updateUnitSurveyQuestionFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmittingSurveyQuestion: false,
    error
  })
}

function updateOrderUnitSurveyQuestion(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function updateOrderUnitSurveyQuestionSuccess(state, { surveyQuestions }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    surveyQuestions: [...surveyQuestions]
  })
}

function updateOrderUnitSurveyQuestionFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function modifyUnitSurveyQuestionsSuccess(state, { surveyQuestion }) {
  return updateObject(state, {
    ...state,
    surveyQuestions: state.surveyQuestions.concat(surveyQuestion)
  })
}

function loadReportQuestion(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadReportQuestionSuccess(state, { reportQuestions }) {
  return updateObject(state, {
    isLoading: false,
    reportQuestions
  })
}

function loadReportQuestionFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function updateBasicReport(state) {
  return updateObject(state, {
    isLoadingUpdateBasicReport: true
  })
}

function updateBasicReportSuccess(state) {
  return updateObject(state, {
    isLoadingUpdateBasicReport: false
  })
}

function updateBasicReportFailure(state, { error }) {
  return updateObject(state, {
    isLoadingUpdateBasicReport: false,
    error
  })
}

function settingQuestionReport(state) {
  return updateObject(state, {
    isLoadingSettingQuestionReport: true
  })
}

function settingQuestionReportSuccess(state) {
  return updateObject(state, {
    isLoadingSettingQuestionReport: false
  })
}

function settingQuestionReportFailure(state, { error }) {
  return updateObject(state, {
    isLoadingSettingQuestionReport: false,
    error
  })
}

function deleteQuestionReport(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function deleteQuestionReportSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isDeleteQuestionReport: true
  })
}

function deleteQuestionReportFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function createQuestionReport(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function createQuestionReportSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isCreateQuestionReport: true
  })
}

function createQuestionReportFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function sortQuestionReport(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function sortQuestionReportSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isSortQuestionReport: true
  })
}

function sortQuestionReportFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function editQuestionReport(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function editQuestionReportSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isEditQuestionReport: true
  })
}

function editQuestionReportFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadDetailQuestionReport(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadDetailQuestionReportSuccess(state, { data }) {
  return updateObject(state, {
    isLoading: false,
    detailQuestionReport: data
  })
}

function loadDetailQuestionReportFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadLessonImageDetail(state) {
  return updateObject(state, {
    detailLessonImage: {
      ...state.detailLessonImage,
      isLoading: true
    }
  })
}

function loadLessonImageDetailSuccess(state, { data }) {
  return updateObject(state, {
    detailLessonImage: {
      ...state.detailLessonImage,
      isLoading: false,
      data
    }
  })
}

function loadLessonImageDetailFailure(state, { error }) {
  return updateObject(state, {
    detailLessonImage: {
      ...state.detailLessonImage,
      isLoading: false,
      error
    }
  })
}

// createLessonInitial
function resetState(state, { payload }) {
  return updateObject(state, {
    createTest: {
      ...state.createTest,
      isCreating: false,
      error: false
    },
    infoBasicSetting: {
      ...state.infoBasicSetting,
      isUpdating: false,
      error: null
    },
    optionSetting: {
      ...state.optionSetting,
      isSetting: false
    },
    questionSetting: {
      ...state.questionSetting,
      isDeleting: false,
      filter: {},
      isSorting: false
    },
    createLesson: {
      ...createLessonInitial
    },
    editLesson: {
      ...createLessonInitial
    },
    detailLesson: {
      ...createLessonInitial
    },
    createQuestion: {
      ...createQuestionInitial
    },
    editQuestion: {
      ...createQuestionInitial
    },
    detailQuestion: {
      ...createQuestionInitial
    },
    createReport: {
      ...state.createReport,
      isRegistering: false
    },
    selectedCourse: payload.location.pathname.includes(RoutesName.UNIT_SETTINGS) ? state.selectedCourse : '',
    unitLessons: payload.location.pathname.includes(RoutesName.UNIT_SETTINGS) ? state.unitLessons : [],
    isUpdateBasicReport: false,
    unitId: state?.unitId
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(REGISTER_TEST)]: registerTest,
  [SUCCESS(REGISTER_TEST)]: registerTestSuccess,
  [FAILURE(REGISTER_TEST)]: registerTestFailure,

  [REQUEST(DELETE_ERROR_REGISTER)]: deleteErrorRegister,
  [SUCCESS(DELETE_ERROR_REGISTER)]: deleteErrorRegisterSuccess,

  [REQUEST(GET_DETAIL_TEST)]: getDetailTest,
  [SUCCESS(GET_DETAIL_TEST)]: getDetailTestSuccess,
  [FAILURE(GET_DETAIL_TEST)]: getDetailTestFailure,

  [REQUEST(DELETE_LIST_UNIT_LESSON)]: deleteListUnitLesson,
  [SUCCESS(DELETE_LIST_UNIT_LESSON)]: deleteListUnitLessonSuccess,
  [FAILURE(DELETE_LIST_UNIT_LESSON)]: deleteListUnitLessonError,

  [REQUEST(LOAD_LIST_UNIT_LESSON)]: loadListUnitLesson,
  [SUCCESS(LOAD_LIST_UNIT_LESSON)]: loadListUnitLessonSuccess,
  [FAILURE(LOAD_LIST_UNIT_LESSON)]: loadListUnitLessonError,

  [REQUEST(LOAD_LIST_ORDER_UNIT_LESSON)]: loadListOrderUnitLesson,
  [SUCCESS(LOAD_LIST_ORDER_UNIT_LESSON)]: loadListOrderUnitLessonSuccess,
  [FAILURE(LOAD_LIST_ORDER_UNIT_LESSON)]: loadListOrderUnitLessonError,

  [REQUEST(UPDATE_ORDER_UNIT_LESSON)]: editOrderUnitLesson,
  [SUCCESS(UPDATE_ORDER_UNIT_LESSON)]: editOrderUnitLessonSuccess,
  [FAILURE(UPDATE_ORDER_UNIT_LESSON)]: editOrderUnitLessonError,

  [REQUEST(CREATE_UNIT_LESSON)]: createLesson,
  [SUCCESS(CREATE_UNIT_LESSON)]: createLessonSuccess,
  [FAILURE(CREATE_UNIT_LESSON)]: createLessonError,

  [REQUEST(CREATE_UNIT_LESSON_IMAGE)]: createLessonImage,
  [SUCCESS(CREATE_UNIT_LESSON_IMAGE)]: createLessonImageSuccess,
  [FAILURE(CREATE_UNIT_LESSON_IMAGE)]: createLessonImageError,

  [REQUEST(CREATE_QUESTION)]: createQuestion,
  [SUCCESS(CREATE_QUESTION)]: createQuestionSuccess,
  [FAILURE(CREATE_QUESTION)]: createQuestionError,

  [REQUEST(GET_DETAIL_QUESTION)]: getDetailQuestion,
  [SUCCESS(GET_DETAIL_QUESTION)]: getDetailQuestionSuccess,
  [FAILURE(GET_DETAIL_QUESTION)]: getDetailQuestionFailure,

  [REQUEST(EDIT_QUESTION)]: editQuestion,
  [SUCCESS(EDIT_QUESTION)]: editQuestionSuccess,
  [FAILURE(EDIT_QUESTION)]: editQuestionError,

  [REQUEST(GET_DETAIL_LESSON)]: getDetailLesson,
  [SUCCESS(GET_DETAIL_LESSON)]: getDetailLessonSuccess,
  [FAILURE(GET_DETAIL_LESSON)]: getDetailLessonFailure,

  [REQUEST(EDIT_UNIT_LESSON)]: editLesson,
  [SUCCESS(EDIT_UNIT_LESSON)]: editLessonSuccess,
  [FAILURE(EDIT_UNIT_LESSON)]: editLessonError,

  [REQUEST(SELECT_COURSE_ID)]: selectCourseId,
  [REQUEST(REMOVE_SELECT_COURSE_ID)]: removeSelectCourseId,

  [REQUEST(BASIC_INFO_SETTING)]: basicInfoSetting,
  [SUCCESS(BASIC_INFO_SETTING)]: basicInfoSettingSuccess,
  [FAILURE(BASIC_INFO_SETTING)]: basicInfoSettingFailure,

  [REQUEST(OPTION_SETTING)]: optionSettingTest,
  [SUCCESS(OPTION_SETTING)]: optionSettingTestSuccess,
  [FAILURE(OPTION_SETTING)]: optionSettingTestFailure,

  [REQUEST(UPDATE_PASS_SCORE)]: updatePassScore,
  [SUCCESS(UPDATE_PASS_SCORE)]: updatePassScoreSuccess,
  [FAILURE(UPDATE_PASS_SCORE)]: updatePassScoreFailure,

  [REQUEST(GET_QUESTIONS_CATEGORY)]: getQuestionCategory,
  [SUCCESS(GET_QUESTIONS_CATEGORY)]: getQuestionCategorySuccess,
  [FAILURE(GET_QUESTIONS_CATEGORY)]: getQuestionCategoryFailure,

  [REQUEST(GET_QUESTION_LIST)]: getQuestionList,
  [SUCCESS(GET_QUESTION_LIST)]: getQuestionListSuccess,
  [FAILURE(GET_QUESTION_LIST)]: getQuestionListFailure,

  [REQUEST(LOAD_ORDER_QUESTION)]: loadOrderQuestion,
  [SUCCESS(LOAD_ORDER_QUESTION)]: loadOrderQuestionSuccess,
  [FAILURE(LOAD_ORDER_QUESTION)]: loadOrderQuestionFailure,

  [REQUEST(DELETE_QUESTION)]: deleteQuestion,
  [SUCCESS(DELETE_QUESTION)]: deleteQuestionSuccess,
  [FAILURE(DELETE_QUESTION)]: deleteQuestionFailure,

  [REQUEST(UPDATE_SORT_QUESTION)]: updateSortQuestion,
  [SUCCESS(UPDATE_SORT_QUESTION)]: updateSortQuestionSuccess,
  [FAILURE(UPDATE_SORT_QUESTION)]: updateSortQuestionFailure,

  [REQUEST(REGISTER_REPORT)]: registerReportRequest,
  [SUCCESS(REGISTER_REPORT)]: registerReportSuccess,
  [FAILURE(REGISTER_REPORT)]: registerReportFailure,

  [REQUEST(LOAD_REPORT_DETAIL)]: loadReportDetail,
  [SUCCESS(LOAD_REPORT_DETAIL)]: loadReportDetailSuccess,
  [FAILURE(LOAD_REPORT_DETAIL)]: loadReportDetailFailure,
  [REQUEST(CREATE_UNIT_SURVEY)]: createUnitSurvey,
  [SUCCESS(CREATE_UNIT_SURVEY)]: createUnitSurveySuccess,
  [FAILURE(CREATE_UNIT_SURVEY)]: createUnitSurveyFailure,

  [REQUEST(GET_UNIT_SURVEY)]: getUnitSurvey,
  [SUCCESS(GET_UNIT_SURVEY)]: getUnitSurveySuccess,
  [FAILURE(GET_UNIT_SURVEY)]: getUnitSurveyFailure,

  [REQUEST(UPDATE_UNIT_SURVEY)]: updateUnitSurvey,
  [SUCCESS(UPDATE_UNIT_SURVEY)]: updateUnitSurveySuccess,
  [FAILURE(UPDATE_UNIT_SURVEY)]: updateUnitSurveyFailure,

  [REQUEST(LOAD_LIST_UNIT_SURVEY_QUESTION)]: getUnitSurveyQuestions,
  [SUCCESS(LOAD_LIST_UNIT_SURVEY_QUESTION)]: getUnitSurveyQuestionsSuccess,
  [FAILURE(LOAD_LIST_UNIT_SURVEY_QUESTION)]: getUnitSurveyQuestionsFailure,

  [REQUEST(DELETE_LIST_UNIT_SURVEY_QUESTION)]: deleteUnitSurveyQuestions,
  [SUCCESS(DELETE_LIST_UNIT_SURVEY_QUESTION)]: deleteUnitSurveyQuestionsSuccess,
  [FAILURE(DELETE_LIST_UNIT_SURVEY_QUESTION)]: deleteUnitSurveyQuestionsFailure,

  [REQUEST(CREATE_UNIT_SURVEY_QUESTION)]: createUnitSurveyQuestion,
  [SUCCESS(CREATE_UNIT_SURVEY_QUESTION)]: createUnitSurveyQuestionSuccess,
  [FAILURE(CREATE_UNIT_SURVEY_QUESTION)]: createUnitSurveyQuestionFailure,

  [REQUEST(GET_UNIT_SURVEY_QUESTION)]: getUnitSurveyQuestion,
  [SUCCESS(GET_UNIT_SURVEY_QUESTION)]: getUnitSurveyQuestionSuccess,
  [FAILURE(GET_UNIT_SURVEY_QUESTION)]: getUnitSurveyQuestionFailure,

  [REQUEST(UPDATE_UNIT_SURVEY_QUESTION)]: updateUnitSurveyQuestion,
  [SUCCESS(UPDATE_UNIT_SURVEY_QUESTION)]: updateUnitSurveyQuestionSuccess,
  [FAILURE(UPDATE_UNIT_SURVEY_QUESTION)]: updateUnitSurveyQuestionFailure,

  [REQUEST(UPDATE_ORDER_UNIT_SURVEY_QUESTION)]: updateOrderUnitSurveyQuestion,
  [SUCCESS(UPDATE_ORDER_UNIT_SURVEY_QUESTION)]: updateOrderUnitSurveyQuestionSuccess,
  [FAILURE(UPDATE_ORDER_UNIT_SURVEY_QUESTION)]: updateOrderUnitSurveyQuestionFailure,

  [SUCCESS(MODIFY_LIST_UNIT_SURVEY_QUESTION)]: modifyUnitSurveyQuestionsSuccess,

  [REQUEST(LOAD_QUESTION_REPORT)]: loadReportQuestion,
  [SUCCESS(LOAD_QUESTION_REPORT)]: loadReportQuestionSuccess,
  [FAILURE(LOAD_QUESTION_REPORT)]: loadReportQuestionFailure,

  [REQUEST(UPDATE_BASIC_SETTING_REPORT)]: updateBasicReport,
  [SUCCESS(UPDATE_BASIC_SETTING_REPORT)]: updateBasicReportSuccess,
  [FAILURE(UPDATE_BASIC_SETTING_REPORT)]: updateBasicReportFailure,

  [REQUEST(SETTING_QUESTION_REPORT)]: settingQuestionReport,
  [SUCCESS(SETTING_QUESTION_REPORT)]: settingQuestionReportSuccess,
  [FAILURE(SETTING_QUESTION_REPORT)]: settingQuestionReportFailure,

  [REQUEST(DELETE_QUESTION_REPORT)]: deleteQuestionReport,
  [SUCCESS(DELETE_QUESTION_REPORT)]: deleteQuestionReportSuccess,
  [FAILURE(DELETE_QUESTION_REPORT)]: deleteQuestionReportFailure,

  [REQUEST(CREATE_QUESTION_REPORT)]: createQuestionReport,
  [SUCCESS(CREATE_QUESTION_REPORT)]: createQuestionReportSuccess,
  [FAILURE(CREATE_QUESTION_REPORT)]: createQuestionReportFailure,

  [REQUEST(LOAD_DETAIL_QUESTION_REPORT)]: loadDetailQuestionReport,
  [SUCCESS(LOAD_DETAIL_QUESTION_REPORT)]: loadDetailQuestionReportSuccess,
  [FAILURE(LOAD_DETAIL_QUESTION_REPORT)]: loadDetailQuestionReportFailure,

  [REQUEST(EDIT_QUESTION_REPORT)]: editQuestionReport,
  [SUCCESS(EDIT_QUESTION_REPORT)]: editQuestionReportSuccess,
  [FAILURE(EDIT_QUESTION_REPORT)]: editQuestionReportFailure,

  [REQUEST(SORT_QUESTION_REPORT)]: sortQuestionReport,
  [SUCCESS(SORT_QUESTION_REPORT)]: sortQuestionReportSuccess,
  [FAILURE(SORT_QUESTION_REPORT)]: sortQuestionReportFailure,

  [REQUEST(GET_DETAIL_LESSON_IMAGE)]: loadLessonImageDetail,
  [SUCCESS(GET_DETAIL_LESSON_IMAGE)]: loadLessonImageDetailSuccess,
  [FAILURE(GET_DETAIL_LESSON_IMAGE)]: loadLessonImageDetailFailure,

  [LOCATION_CHANGE]: resetState
})
