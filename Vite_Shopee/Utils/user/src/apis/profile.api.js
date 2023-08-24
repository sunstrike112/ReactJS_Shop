import axios from 'axios'
import { getLocalStorage, STORAGE } from '../utils'
import AxiosClient from './api'

import END_POINT from './constants'

const getHeaderLanguage = () => {
  const localLanguage = getLocalStorage(STORAGE.LANGUAGE) || 'jp'
  return { 'Accept-Language': localLanguage }
}

async function getUserProfile({ userId }) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.USER_PROFILE}?userId=${userId}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getUserProfileWorkspaceAPI({ userId, workspaceid }) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.USER_PROFILE}?userId=${userId}`
  return axiosClient.get(uri, '',
    { headers:
    {
      ...axiosClient.axiosClient.defaults.headers,
      workspaceid
    } })
    .then((res) => res.data)
}

async function uploadFile({
  fileName,
  fileType,
  file,
  type
}) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.PRE_SIGN}`
  const { data } = await axiosClient.post(uri, [
    {
      fileName,
      fileType
    }
  ])
  const config = {
    method: 'PUT',
    url: data.data[0].preSignedURL,
    headers: { 'Content-Type': type },
    data: file
  }

  return axios(config).then((res) => ({
    data: res.data,
    urlImage: data.data[0].url
  }))
}

async function uploadAvatar(body) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.UPLOAD_AVATAR}`
  return axiosClient.post(uri, body)
}

async function changePassword({ changePasswordUserDto }) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.CHANGE_PASSWORD}`
  return axiosClient.put(uri, changePasswordUserDto, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function updateProfile(userProfileRequest) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.UPDATE_PROFILE}`
  return axiosClient.put(uri, userProfileRequest, {
    headers: { ...getHeaderLanguage() }
  }).then((res) => res.data)
}

async function verifyCode(body) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.VERIFY_CODE}`
  return axiosClient.post(uri, body, {
    headers: { ...getHeaderLanguage() }
  })
}

async function updateEmail(body) {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.UPDATE_EMAIL}`
  return axiosClient.post(uri, body, {
    headers: { ...getHeaderLanguage() }
  })
}

async function getPlan(planType = 'PLAN_USER') {
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.GET_PLAN}?type=${planType}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function generateToken(planId = 0, dataId = 0) {
  const axiosClient = new AxiosClient()
  let uri = `${END_POINT.GENERATE_PAYMENT_TOKEN}`

  if (planId) {
    uri += `?planId=${planId}`
  }

  if (!planId && dataId) {
    uri += `?planId=${dataId}`
  }

  if (planId && dataId) {
    uri += `&planId=${dataId}`
  }
  return axiosClient.post(uri)
    .then((res) => res.data)
}

async function changePlan(planIds) {
  const axiosClient = new AxiosClient()
  let query = ''
  planIds.forEach((id) => {
    if (!query) {
      query += `?planId=${id}`
    } else {
      query += `&planId=${id}`
    }
  })
  const uri = `${END_POINT.CHANGE_PLAN}${query}`
  return axiosClient.put(uri)
    .then((res) => res.data)
}

export {
  getUserProfile,
  getUserProfileWorkspaceAPI,
  uploadFile,
  changePassword,
  updateProfile,
  uploadAvatar,
  verifyCode,
  updateEmail,
  getPlan,
  generateToken,
  changePlan
}
