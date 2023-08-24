import { parseFilter, parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function loadTestUnitsAPI({ params }) {
  params = parseFilter(params)
  return AxiosClient.get(END_POINT.TEST_QUESTION_MANAGEMENT.LOAD_TEST_UNITS, '', { params })
    .then((res) => res.data)
}

function loadTestQuestionsAPI({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.TEST_QUESTION_MANAGEMENT.LOAD_TEST_QUESTIONS}?${q}`)
    .then((res) => res.data)
}

function loadTestQuestionDetailAPI({ questionId }) {
  return AxiosClient.get(`${END_POINT.TEST_QUESTION_MANAGEMENT.LOAD_TEST_QUESTION_DETAIL({ questionId })}`)
    .then((res) => res.data)
}

function deleteTestQuestionsAPI({ data }) {
  return AxiosClient.delete(END_POINT.TEST_QUESTION_MANAGEMENT.DELETE_TEST_QUESTIONS, data)
    .then((res) => res.data)
}

export {
  loadTestUnitsAPI,
  loadTestQuestionsAPI,
  deleteTestQuestionsAPI,
  loadTestQuestionDetailAPI
}
