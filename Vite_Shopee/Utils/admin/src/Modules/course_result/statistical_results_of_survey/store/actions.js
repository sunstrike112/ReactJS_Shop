import { REQUEST, SUCCESS } from 'Stores'
import {
  LOAD_STATISTIC_RESULTS_OF_SURVEY, LOAD_SURVEY_QUESTIONS, RESET_SURVEY_QUESTIONS
} from './constants'

export function loadStatisticResultsOfSurvey(payload) {
  return {
    type: REQUEST(LOAD_STATISTIC_RESULTS_OF_SURVEY),
    payload
  }
}

export function loadStatisticResultsOfSurveySuccess(payload) {
  return {
    type: SUCCESS(LOAD_STATISTIC_RESULTS_OF_SURVEY),
    payload
  }
}

export function loadSurveyQuestions(payload) {
  return {
    type: REQUEST(LOAD_SURVEY_QUESTIONS),
    payload
  }
}

export function loadSurveyQuestionsSuccess(payload) {
  return {
    type: SUCCESS(LOAD_SURVEY_QUESTIONS),
    payload
  }
}

export function resetSurveyQuestion() {
  return {
    type: REQUEST(RESET_SURVEY_QUESTIONS)
  }
}
