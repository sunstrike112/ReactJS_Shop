import QueryString from 'qs'
import { DEFAULT_LIMIT_COURSE_LIST, DEFAULT_PAG } from '../constants'
import AxiosClient from './api'
import END_POINT from './constants'

const generateUri = ({
  uri,
  categories = [],
  courseSearch = '',
  isRequired = null,
  page = 1,
  limit = 12
}) => {
  uri += `?courseSearch=${courseSearch.trim()}&page=${page}&limit=${limit}`
  if (categories.length) {
    categories.forEach((category) => {
      uri += `&lstCategoryIds=${category}`
    })
  }

  if (isRequired !== null) {
    uri += `&isRequired=${isRequired}`
  }
  return uri
}

async function getListCourseByUser(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.COURSE}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseDetail(params) {
  const { courseId, flagCount, userId } = params
  const axiosClient = new AxiosClient()
  const q = QueryString.stringify({ courseId, flagCount, userId })
  const uri = `${END_POINT.COURSE_DETAIL}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function voteLikeUnit(courseId, courseUnitId, typeUnit) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.VOTE_LIKE_UNIT({ courseId, courseUnitId, typeUnit })}`
  return axiosClient.post(uri, { courseId, courseUnitId, typeUnit }).then((res) => res.data)
}

async function countViewUnit(courseId, lessonId, typeUnit, isVideo = false) {
  const axiosClient = new AxiosClient()
  const uri = isVideo
    ? `${END_POINT.COUNT_VIEW_UNIT({ courseId, lessonId, typeUnit })}?isVideo=${isVideo}`
    : `${END_POINT.COUNT_VIEW_UNIT({ courseId, lessonId, typeUnit })}`
  return axiosClient.post(uri, { courseId, lessonId, typeUnit }).then((res) => res.data)
}

async function getCourseDetailUnregistered(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.COURSE_DETAIL_UNREGISTERED}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseCompany({
  categories = [],
  courseSearch = '',
  isRequired = null,
  page = 1,
  limit = 12
}) {
  const axiosClient = new AxiosClient()
  const uri = generateUri({
    uri: END_POINT.COURSE_LIST.COMPANY,
    categories,
    courseSearch,
    isRequired,
    page,
    limit
  })
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseNissoken({
  categories = [],
  courseSearch = '',
  isRequired = null,
  page = 1,
  limit = 12
}) {
  const axiosClient = new AxiosClient()
  const uri = generateUri({
    uri: END_POINT.COURSE_LIST.NISSOKEN,
    categories,
    courseSearch,
    isRequired,
    page,
    limit
  })
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseCost(categories, courseSearch) {
  const axiosClient = new AxiosClient()
  const uri = generateUri({
    uri: END_POINT.COURSE_LIST.COST,
    categories,
    courseSearch
  })

  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseFree(categories, courseSearch) {
  const axiosClient = new AxiosClient()
  const uri = generateUri({
    uri: END_POINT.COURSE_LIST.FREE,
    categories,
    courseSearch
  })
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseType() {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.COURSE_LIST.TYPE}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}
async function addToCart(courseId) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.CART}/add-cart`
  return axiosClient.post(uri, {
    courseId
  }).then((res) => res.data)
}

async function getCourseInCart() {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.CART}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function removeFromCart(courseId) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.CART}/delete/${courseId}`
  return axiosClient.delete(uri).then((res) => res.data)
}

async function getNewCourse({
  categories = [],
  courseSearch = '',
  isRequired = null,
  page = DEFAULT_PAG.page,
  limit = DEFAULT_LIMIT_COURSE_LIST.limit
}) {
  const axiosClient = new AxiosClient()
  const uri = generateUri({
    uri: END_POINT.COURSE_LIST.NEW_COURSE,
    categories,
    courseSearch,
    isRequired,
    page,
    limit
  })
  return axiosClient.get(uri)
    .then((res) => res.data)
}

function updateBookmarkApi(queryParam) {
  const axiosClient = new AxiosClient()
  const q = QueryString.stringify(queryParam)
  const uri = `${END_POINT.COURSE_LIST.UPDATE_BOOKMARK}?${q}`
  return axiosClient.put(uri).then((res) => res.data)
}

export {
  getListCourseByUser,
  getCourseDetail,
  getCourseCompany,
  getCourseCost,
  getCourseFree,
  getCourseNissoken,
  getCourseType,
  getCourseDetailUnregistered,
  addToCart,
  getCourseInCart,
  removeFromCart,
  voteLikeUnit,
  countViewUnit,
  getNewCourse,
  updateBookmarkApi
}
