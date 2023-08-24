import AxiosClient from './api'
import END_POINT from './constants'

async function getListCategoryByUser() {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.USER_CATEGORY}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getCourseCategoryByUser() {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.COURSE_CATEGORY}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

export {
  getListCategoryByUser,
  getCourseCategoryByUser
}
