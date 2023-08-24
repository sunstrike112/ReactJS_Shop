import { parseFilter, parseParamsToQueryString, getLocalStorage, STORAGE } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getCourseCategories({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_CATEGORIES}?${q}`)
    .then((res) => res)
}

function createCourseCategories(body) {
  return AxiosClient.post(END_POINT.COURSE_CATEGORIES, body)
    .then((res) => res)
}

function getAllCourseCategories({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_CATEGORIES_COMPANY}?${q}`)
    .then((res) => res.data)
}

function getDetailCourseCategory(id) {
  return AxiosClient.get(`${END_POINT.COURSE_CATEGORY_DETAIL}/${id}`)
    .then((res) => res.data)
}

function editCourseCategories(body, id) {
  return AxiosClient.put(`${END_POINT.UPDATE_COURSE_CATEGORY}/${id}`, body)
    .then((res) => res)
}

function deleteCourseCategories(ids) {
  return AxiosClient.delete(`${END_POINT.DELETE_COURSE_CATEGORIES}`, { ids })
    .then((res) => res)
}

function getCourseCategoriesReorder() {
  return AxiosClient.get(END_POINT.GET_COURSE_CATEGORIES_REORDER)
    .then((res) => res.data)
}

function reOderCourseCategories() {
  return AxiosClient.get(END_POINT.GET_COURSE_CATEGORIES_REORDER)
    .then((res) => res.data)
}

function getCourses({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_LIST}?${q}`)
    .then((res) => res.data)
}

function getOrderCourse() {
  return AxiosClient.get(END_POINT.GET_ORDER_COURSE)
    .then((res) => res.data)
}

function updateOrderCourse({ data }) {
  return AxiosClient.put(END_POINT.ORDER_COURSE, data)
    .then((res) => res.data)
}

function getCourse({ courseId }) {
  return AxiosClient.get(`${END_POINT.COURSE}${courseId}`)
    .then((res) => res.data)
}

function createCourse({ data }) {
  const langCode = getLocalStorage(STORAGE.LANGUAGE)
  return AxiosClient.post(END_POINT.COURSE, { ...data, langCode })
    .then((res) => res.data)
}

function editCourse({ courseId, data }) {
  return AxiosClient.put(`${END_POINT.COURSE}${courseId}`, data)
    .then((res) => res.data)
}

function deleteCourse({ data }) {
  return AxiosClient.delete(END_POINT.DELETE_COURSES, data)
    .then((res) => res.data)
}

function updateStatusAuto() {
  return AxiosClient.post(END_POINT.SETTING_COURSE_JOBNARE.UPDATE_AUTO_STATUS, { langCode: getLocalStorage(STORAGE.LANGUAGE) })
    .then((res) => res)
}

function getExceptCourse({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.SETTING_COURSE_JOBNARE.GET_EXCEPT_COURSE}?${q}`)
    .then((res) => res.data)
}

function addExceptCourse(ids) {
  return AxiosClient.post(END_POINT.SETTING_COURSE_JOBNARE.ADD_EXCEPT_COURSE, { ids })
    .then((res) => res)
}

function deleteExceptCourse(ids) {
  return AxiosClient.delete(`${END_POINT.SETTING_COURSE_JOBNARE.DELETE_EXCEPT_COURSE}`, { ids })
    .then((res) => res)
}

export {
  getCourseCategories,
  getAllCourseCategories,
  createCourseCategories,
  getDetailCourseCategory,
  editCourseCategories,
  deleteCourseCategories,
  getCourseCategoriesReorder,
  reOderCourseCategories,
  getCourses,
  getOrderCourse,
  updateOrderCourse,
  getCourse,
  createCourse,
  editCourse,
  deleteCourse,
  updateStatusAuto,
  addExceptCourse,
  getExceptCourse,
  deleteExceptCourse
}
