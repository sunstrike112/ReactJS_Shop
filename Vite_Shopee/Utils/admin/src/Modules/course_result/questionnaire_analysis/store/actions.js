import { REQUEST } from 'Stores'
import {
  LOAD_ANALYSIS_TEST_RESULT,
  LOAD_ANALYSIS_TEST_CHART_ANSWER,
  LOAD_ANALYSIS_TEST_CHART_POINT,
  LOAD_ANALYSIS_TEST_DESCRIPTION,
  LOAD_VERSION_TEST_LIST,
  LOAD_ANALYSIS_TEST_VERSION,
  LOAD_ANALYSIS_SURVEY_RESULT,
  LOAD_ANALYSIS_SURVEY_CHART_ANSWER,
  LOAD_ANALYSIS_SURVEY_DESCRIPTION,
  LOAD_VERSION_SURVEY_LIST,
  LOAD_ANALYSIS_SURVEY_VERSION,
  LOAD_COURSE_LIST,
  LOAD_UNIT_LIST_ALL,
  SAVE_FILTER,
  RESET_DATA_TABLE,
  RESET_ALL
} from './constants'

export function loadAnalysisTestResult(payload) {
  return {
    type: REQUEST(LOAD_ANALYSIS_TEST_RESULT),
    payload
  }
}

// TEST
export function loadAnalysisTestChartAnswer(payload) {
  return {
    type: REQUEST(LOAD_ANALYSIS_TEST_CHART_ANSWER),
    payload
  }
}

export function loadAnalysisTestChartPoint(payload) {
  return {
    type: REQUEST(LOAD_ANALYSIS_TEST_CHART_POINT),
    payload
  }
}

export function loadAnalysisTestDescription(payload) {
  return {
    type: REQUEST(LOAD_ANALYSIS_TEST_DESCRIPTION),
    payload
  }
}

export function loadAnalysisVersionTest(payload) {
  return {
    type: REQUEST(LOAD_ANALYSIS_TEST_VERSION),
    payload
  }
}

export function loadVersionListTest(payload) {
  return {
    type: REQUEST(LOAD_VERSION_TEST_LIST),
    payload
  }
}

// SURVEY
export function loadAnalysisSurveyResult(payload) {
  return {
    type: REQUEST(LOAD_ANALYSIS_SURVEY_RESULT),
    payload
  }
}

export function loadAnalysisSurveyChartAnswer(payload) {
  return {
    type: REQUEST(LOAD_ANALYSIS_SURVEY_CHART_ANSWER),
    payload
  }
}

export function loadAnalysisSurveyDescription(payload) {
  return {
    type: REQUEST(LOAD_ANALYSIS_SURVEY_DESCRIPTION),
    payload
  }
}

export function loadAnalysisVersionSurvey(payload) {
  return {
    type: REQUEST(LOAD_ANALYSIS_SURVEY_VERSION),
    payload
  }
}

export function loadVersionListSurvey(payload) {
  return {
    type: REQUEST(LOAD_VERSION_SURVEY_LIST),
    payload
  }
}

// COMMON
export function loadCourseList(payload) {
  return {
    type: REQUEST(LOAD_COURSE_LIST),
    payload
  }
}

export function loadUnitListAll(payload) {
  return {
    type: REQUEST(LOAD_UNIT_LIST_ALL),
    payload
  }
}

export function saveFilter(payload) {
  return {
    type: REQUEST(SAVE_FILTER),
    payload
  }
}

export function resetAll(payload) {
  return {
    type: REQUEST(RESET_ALL),
    payload
  }
}

export function resetDataTable(payload) {
  return {
    type: REQUEST(RESET_DATA_TABLE),
    payload
  }
}
