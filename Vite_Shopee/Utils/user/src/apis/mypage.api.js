import AxiosClient from './api'
import END_POINT from './constants'

async function getCourseStudyingIndividual(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params })
  const uri = `${END_POINT.MY_PAGE.STUDYING_INDIVIDUAL}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseStudyingCompany(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params })
  const uri = `${END_POINT.MY_PAGE.STUDYING_COMPANY}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseBookMarkedApi(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params })
  const uri = `${END_POINT.MY_PAGE.BOOK_MARKED}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseCostIndividual(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params })
  const uri = `${END_POINT.MY_PAGE.COSTS_INDIVIDUAL}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseRequiredCompany(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params })
  const uri = `${END_POINT.MY_PAGE.REQUIRED_COMPANY}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function hiddenCourseAPI(courseId) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.MY_PAGE.HIDE_COURSES({ courseId })}`
  return axiosClient.put(uri, courseId).then((res) => res.data)
}

async function voteLikeCourse(courseId) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.MY_PAGE.VOTE_LIKE_COURSE({ courseId })}`
  return axiosClient.post(uri, courseId).then((res) => res.data)
}

function changeOrderCourseApi({ courseId, params }) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params })
  const uri = `${END_POINT.MY_PAGE.CHANGE_ORDER(courseId)}?${q}`
  return axiosClient.put(uri).then((res) => res.data)
}

export {
  getCourseStudyingIndividual,
  getCourseStudyingCompany,
  getCourseBookMarkedApi,
  getCourseCostIndividual,
  getCourseRequiredCompany,
  hiddenCourseAPI,
  voteLikeCourse,
  changeOrderCourseApi
}
