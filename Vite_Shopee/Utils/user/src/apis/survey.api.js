import { parseParamsToQueryString } from '../utils'
import AxiosClient from './api'
import END_POINT from './constants'

async function getSurvey({ courseId, surveyId }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.SURVEY.LIST_QUESTION({ courseId, surveyId })
  return axiosClient.get(uri).then((res) => res.data)
}

async function getSurveyResult({ courseId, surveyId }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.SURVEY.RESULT({ courseId, surveyId })
  return axiosClient.get(uri).then((res) => res.data)
}

async function submitSurvey({ courseId, surveyId, lstQuestion, queryParams }) {
  const axiosClient = new AxiosClient()
  const q = parseParamsToQueryString(queryParams)
  const uri = `${END_POINT.SURVEY.SUBMIT({ courseId, surveyId })}?${q}`
  return axiosClient.post(uri, lstQuestion).then((res) => res.data)
}

async function countSurvey({ courseId, surveyId }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.SURVEY.COUNT({ courseId, surveyId })
  return axiosClient.get(uri).then((res) => res.data)
}

export { getSurvey, getSurveyResult, submitSurvey, countSurvey }
