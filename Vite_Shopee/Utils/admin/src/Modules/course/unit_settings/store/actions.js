import { REQUEST } from 'Stores'
import {
  LOAD_LIST_UNIT_LESSON,
  DELETE_LIST_UNIT_LESSON,
  LOAD_LIST_ORDER_UNIT_LESSON,
  UPDATE_ORDER_UNIT_LESSON,
  SELECT_COURSE_ID,
  GET_DETAIL_TEST,
  REGISTER_TEST,
  BASIC_INFO_SETTING,
  OPTION_SETTING,
  CREATE_UNIT_LESSON,
  GET_DETAIL_LESSON,
  EDIT_UNIT_LESSON,
  UPDATE_PASS_SCORE,
  GET_QUESTIONS_CATEGORY,
  GET_QUESTION_LIST,
  DELETE_QUESTION,
  LOAD_ORDER_QUESTION,
  UPDATE_SORT_QUESTION,
  REGISTER_REPORT,
  LOAD_REPORT_DETAIL,
  CREATE_UNIT_SURVEY,
  UPDATE_UNIT_SURVEY,
  LOAD_LIST_UNIT_SURVEY_QUESTION,
  DELETE_LIST_UNIT_SURVEY_QUESTION,
  CREATE_UNIT_SURVEY_QUESTION,
  GET_UNIT_SURVEY_QUESTION,
  UPDATE_UNIT_SURVEY_QUESTION,
  GET_UNIT_SURVEY,
  LOAD_QUESTION_REPORT,
  UPDATE_BASIC_SETTING_REPORT,
  CREATE_QUESTION,
  EDIT_QUESTION,
  SETTING_QUESTION_REPORT,
  GET_DETAIL_QUESTION,
  DELETE_QUESTION_REPORT,
  UPDATE_ORDER_UNIT_SURVEY_QUESTION,
  CREATE_QUESTION_REPORT,
  LOAD_DETAIL_QUESTION_REPORT,
  EDIT_QUESTION_REPORT,
  SORT_QUESTION_REPORT,
  REMOVE_SELECT_COURSE_ID,
  SAVE_UNIT_ID,
  CREATE_UNIT_LESSON_IMAGE,
  GET_DETAIL_LESSON_IMAGE
} from './constants'

export function registerTest(payload) {
  return {
    type: REQUEST(REGISTER_TEST),
    payload
  }
}

export function deleteErrorRegister() {
  return {
    type: REQUEST(REGISTER_TEST)
  }
}

export function basicInfoSetting(payload) {
  return {
    type: REQUEST(BASIC_INFO_SETTING),
    payload
  }
}

export function getDetailTest(payload) {
  return {
    type: REQUEST(GET_DETAIL_TEST),
    payload
  }
}

export function loadListUnitLesson(payload) {
  return {
    type: REQUEST(LOAD_LIST_UNIT_LESSON),
    payload
  }
}

export function deleteListUnitLesson(payload) {
  return {
    type: REQUEST(DELETE_LIST_UNIT_LESSON),
    payload
  }
}

export function loadListOrderUnitLesson(payload) {
  return {
    type: REQUEST(LOAD_LIST_ORDER_UNIT_LESSON),
    payload
  }
}

export function updateOrderUnitLesson(payload) {
  return {
    type: REQUEST(UPDATE_ORDER_UNIT_LESSON),
    payload
  }
}

export function selectCourseId(payload) {
  return {
    type: REQUEST(SELECT_COURSE_ID),
    payload
  }
}

export function removeSelectCourseId() {
  return {
    type: REQUEST(REMOVE_SELECT_COURSE_ID)
  }
}

export function optionSettingTest(payload) {
  return {
    type: REQUEST(OPTION_SETTING),
    payload
  }
}

export function createUnitLesson(payload) {
  return {
    type: REQUEST(CREATE_UNIT_LESSON),
    payload
  }
}

export function createUnitLessonImage(payload) {
  return {
    type: REQUEST(CREATE_UNIT_LESSON_IMAGE),
    payload
  }
}

export function getDetailLesson(payload) {
  return {
    type: REQUEST(GET_DETAIL_LESSON),
    payload
  }
}

export function getDetailQuestion(payload) {
  return {
    type: REQUEST(GET_DETAIL_QUESTION),
    payload
  }
}

export function updatePassScore(payload) {
  return {
    type: REQUEST(UPDATE_PASS_SCORE),
    payload
  }
}

export function editUnitLesson(payload) {
  return {
    type: REQUEST(EDIT_UNIT_LESSON),
    payload
  }
}

export function editQuestion(payload) {
  return {
    type: REQUEST(EDIT_QUESTION),
    payload
  }
}

export function getQuestionsCategory() {
  return {
    type: REQUEST(GET_QUESTIONS_CATEGORY)
  }
}

export function getQuestionList(payload) {
  return {
    type: REQUEST(GET_QUESTION_LIST),
    payload
  }
}

export function loadOrderQuestion(payload) {
  return {
    type: REQUEST(LOAD_ORDER_QUESTION),
    payload
  }
}

export function updateSortQuestion(payload) {
  return {
    type: REQUEST(UPDATE_SORT_QUESTION),
    payload
  }
}

export function deleteQuestion(payload) {
  return {
    type: REQUEST(DELETE_QUESTION),
    payload
  }
}

export function registerReport(payload) {
  return {
    type: REQUEST(REGISTER_REPORT),
    payload
  }
}

export function createUnitSurvey(payload) {
  return {
    type: REQUEST(CREATE_UNIT_SURVEY),
    payload
  }
}

export function loadReportDetail(payload) {
  return {
    type: REQUEST(LOAD_REPORT_DETAIL),
    payload
  }
}

export function getUnitSurvey(payload) {
  return {
    type: REQUEST(GET_UNIT_SURVEY),
    payload
  }
}

export function updateUnitSurvey(payload) {
  return {
    type: REQUEST(UPDATE_UNIT_SURVEY),
    payload
  }
}

export function getUnitSurveyQuestionList(payload) {
  return {
    type: REQUEST(LOAD_LIST_UNIT_SURVEY_QUESTION),
    payload
  }
}

export function deleteUnitSurveyQuestions(payload) {
  return {
    type: REQUEST(DELETE_LIST_UNIT_SURVEY_QUESTION),
    payload
  }
}

export function createUnitSurveyQuestion(payload) {
  return {
    type: REQUEST(CREATE_UNIT_SURVEY_QUESTION),
    payload
  }
}

export function getUnitSurveyQuestion(payload) {
  return {
    type: REQUEST(GET_UNIT_SURVEY_QUESTION),
    payload
  }
}

export function updateUnitSurveyQuestion(payload) {
  return {
    type: REQUEST(UPDATE_UNIT_SURVEY_QUESTION),
    payload
  }
}

export function updateOrderUnitSurveyQuestion(payload) {
  return {
    type: REQUEST(UPDATE_ORDER_UNIT_SURVEY_QUESTION),
    payload
  }
}

export function loadQuestionReport(payload) {
  return {
    type: REQUEST(LOAD_QUESTION_REPORT),
    payload
  }
}

export function updateBasicReport(payload) {
  return {
    type: REQUEST(UPDATE_BASIC_SETTING_REPORT),
    payload
  }
}

export function createQuestion(payload) {
  return {
    type: REQUEST(CREATE_QUESTION),
    payload
  }
}

export function settingQuestionReport(payload) {
  return {
    type: REQUEST(SETTING_QUESTION_REPORT),
    payload
  }
}

export function deleteQuestionReport(payload) {
  return {
    type: REQUEST(DELETE_QUESTION_REPORT),
    payload
  }
}

export function createQuestionReport(payload) {
  return {
    type: REQUEST(CREATE_QUESTION_REPORT),
    payload
  }
}

export function editQuestionReport(payload) {
  return {
    type: REQUEST(EDIT_QUESTION_REPORT),
    payload
  }
}

export function loadDetailQuestionReport(payload) {
  return {
    type: REQUEST(LOAD_DETAIL_QUESTION_REPORT),
    payload
  }
}

export function sortQuestionReport(payload) {
  return {
    type: REQUEST(SORT_QUESTION_REPORT),
    payload
  }
}

export function saveUnitId(payload) {
  return {
    type: REQUEST(SAVE_UNIT_ID),
    payload
  }
}

export function loadDetailLessonImage(payload) {
  return {
    type: REQUEST(GET_DETAIL_LESSON_IMAGE),
    payload
  }
}
