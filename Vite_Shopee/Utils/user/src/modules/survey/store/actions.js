import {
  LOAD_SURVEY,
  LOAD_SURVEY_SUCCESS,
  LOAD_REPOS_ERROR,

  LOAD_SURVEY_RESULT,
  LOAD_SURVEY_RESULT_SUCCESS,

  UPDATE_ANSWER_SURVEY,

  SUBMIT_SURVEY,
  SUBMIT_SURVEY_SUCCESS
} from './constants'

export function loadSurvey(payload) {
  return {
    type: LOAD_SURVEY,
    payload
  }
}

export function loadSurveySuccess(data, surveyAnswers) {
  return {
    type: LOAD_SURVEY_SUCCESS,
    data,
    surveyAnswers
  }
}

export function loadSurverResult(payload) {
  return {
    type: LOAD_SURVEY_RESULT,
    payload
  }
}

export function loadSurverResultSuccess(data) {
  return {
    type: LOAD_SURVEY_RESULT_SUCCESS,
    data
  }
}

export function submitSurvey(payload) {
  return {
    type: SUBMIT_SURVEY,
    payload
  }
}

export function submitSurveySuccess(isSuccess) {
  return {
    type: SUBMIT_SURVEY_SUCCESS,
    isSuccess
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}

export function updateAnswerSurvey(surveyAnswers) {
  return {
    type: UPDATE_ANSWER_SURVEY,
    surveyAnswers
  }
}
