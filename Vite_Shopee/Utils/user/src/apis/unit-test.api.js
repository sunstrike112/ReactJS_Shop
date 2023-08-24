import { LESSON_TYPE } from '../constants'
import { parseParamsToQueryString } from '../utils'
import AxiosClient from './api'
import END_POINT from './constants'

async function getUnitQuestions({ courseId, testId }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.UNIT_TEST.LIST_QUESTION({ courseId, testId })
  return axiosClient.get(uri).then((res) => res.data)
}

async function countTestUnit({ courseId, testId }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.UNIT_TEST.COUNT({ courseId, testId })
  return axiosClient.get(uri).then((res) => res.data)
}

async function getLessonById({ courseId, lessonId }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.UNIT_TEST.LESSON_DETAIL({ courseId, lessonId })
  return axiosClient.get(uri).then((res) => res.data)
}

async function saveLastViewedVideoAPI({ courseId, lessonId, data, queryParams = {} }) {
  const axiosClient = new AxiosClient()
  const q = parseParamsToQueryString(queryParams)
  const uri = `${END_POINT.UNIT_TEST.LAST_VIEWED_VIDEO({ courseId, lessonId })}?${q}`
  return axiosClient.put(uri, data).then((res) => res.data)
}

async function confirmRequestPasswordAPI({ courseId, lessonId, data }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.UNIT_TEST.CONFIRM_PASSWORD_VIDEO({ courseId, lessonId })
  return axiosClient.put(uri, data).then((res) => res.data)
}

async function submitLessonById({ courseId, lessonId, queryParams }) {
  const axiosClient = new AxiosClient()
  const q = parseParamsToQueryString(queryParams)
  const uri = `${END_POINT.UNIT_TEST.SUBMIT({ courseId, lessonId })}?${q}`
  return axiosClient.put(uri).then((res) => res.data)
}

async function submitAndViewLessonAtOnce({ courseId, lessonId }) {
  const axiosClient = new AxiosClient()
  const q = parseParamsToQueryString({ isVideo: true, isComplete: true })
  const uri = `${END_POINT.COUNT_VIEW_UNIT({ courseId, lessonId, typeUnit: LESSON_TYPE.LESSON })}?${q}`
  return axiosClient.post(uri).then((res) => res.data)
}

async function getTestResult({ courseId, testId, userId }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.UNIT_TEST.TEST_RESULT({ courseId, testId })
  return axiosClient.get(`${uri}?userId=${userId}`).then((res) => res.data)
}

async function submitTest({ courseId, testId, submitTestRequest, queryParams }) {
  const axiosClient = new AxiosClient()
  const q = parseParamsToQueryString(queryParams)
  const uri = `${END_POINT.UNIT_TEST.SUBMIT_TEST({ courseId, testId })}?${q}`
  return axiosClient.post(uri, submitTestRequest).then((res) => res.data)
}

export {
  getUnitQuestions,
  getLessonById,
  getTestResult,
  submitTest,
  submitLessonById,
  countTestUnit,
  submitAndViewLessonAtOnce,
  saveLastViewedVideoAPI,
  confirmRequestPasswordAPI
}
