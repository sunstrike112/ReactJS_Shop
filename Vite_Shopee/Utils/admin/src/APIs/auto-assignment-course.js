import { parseFilter, parseFilterArrayToStringV2, parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function loadAutomaticAssignmentAPI({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.AUTO_ASSIGNMENT_COURSE.LOAD_AUTOMATIC_ASSIGNMENT}?${q}`)
    .then((res) => res.data)
}

function deleteCourseAssignmentAPI({ data }) {
  return AxiosClient.put(
    END_POINT.AUTO_ASSIGNMENT_COURSE.DELETE_COURSE_ASSIGNMENT,
    data
  ).then((res) => res.data)
}

function loadCourseCategoryAPI({ params }) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.AUTO_ASSIGNMENT_COURSE.LOAD_COURSE_CATEGORY}?${q}`)
    .then((res) => res.data)
}

function loadCourseAssignmentAPI({ params }) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.AUTO_ASSIGNMENT_COURSE.LOAD_COURSE_ASSIGNMENT}?${q}`)
    .then((res) => res.data)
}

function loadTargetGroupAPI() {
  return AxiosClient.get(END_POINT.AUTO_ASSIGNMENT_COURSE.LOAD_TARGET_GROUP)
    .then((res) => res.data)
}

function loadTargetAttributeAPI({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.AUTO_ASSIGNMENT_COURSE.LOAD_TARGET_ATTRIBUTE}?${q}`).then((res) => res.data)
}

function createAssignmentAPI({ data, langCode }) {
  const q = parseParamsToQueryString({ langCode })
  return AxiosClient.post(`${END_POINT.AUTO_ASSIGNMENT_COURSE.CREATE_ASSIGNMENT}?${q}`, data)
    .then((res) => res.data)
}

function updateAssignmentAPI({ data, langCode }) {
  const q = parseParamsToQueryString({ langCode })
  return AxiosClient.put(`${END_POINT.AUTO_ASSIGNMENT_COURSE.UPDATE_ASSIGNMENT}?${q}`, data)
    .then((res) => res.data)
}

function loadDetailAssignmentAPI({ assignId, companyId }) {
  const uri = companyId ? `${END_POINT.AUTO_ASSIGNMENT_COURSE.LOAD_DETAIL_ASSIGNMENT({ assignId })}?companyId=${companyId}` : END_POINT.AUTO_ASSIGNMENT_COURSE.LOAD_DETAIL_ASSIGNMENT({ assignId })
  return AxiosClient.get(uri)
    .then((res) => res.data)
}

export {
  loadAutomaticAssignmentAPI,
  deleteCourseAssignmentAPI,
  loadCourseCategoryAPI,
  loadCourseAssignmentAPI,
  loadTargetGroupAPI,
  loadTargetAttributeAPI,
  createAssignmentAPI,
  updateAssignmentAPI,
  loadDetailAssignmentAPI
}
