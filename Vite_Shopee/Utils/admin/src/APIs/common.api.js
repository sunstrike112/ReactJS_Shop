import { BASE_API_URL } from 'Constants'
import { parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'

import END_POINT from './constants'

function checkExistFile({ folderId = 0, params }) {
  return AxiosClient.get(END_POINT.UPLOAD_FILE.CHECK_EXIST_FILE, folderId, { params })
    .then(({ data }) => data)
}

function getS3PresinedUrl({ fileList }) {
  return AxiosClient.post(`${BASE_API_URL}${END_POINT.PRESIGNED}`, fileList)
    .then(({ data }) => data)
}

function getThemeAPI({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${BASE_API_URL}${END_POINT.GET_THEME}?${q}`)
    .then(({ data }) => data)
}

function getUploadIdFromS3Api({ bucketName, keyName, parts }) {
  const q = parseParamsToQueryString({ bucketName, keyName, parts })
  return AxiosClient.post(`${BASE_API_URL}${END_POINT.GET_UPLOAD_ID_FROM_S3}?${q}`)
    .then(({ data }) => data)
}

function completeUpLoadFileApi({ data }) {
  return AxiosClient.post(`${BASE_API_URL}${END_POINT.COMPLETE_UPLOAD_FILE}`, data)
    .then((res) => res.data)
}

export {
  checkExistFile,
  getS3PresinedUrl,
  getThemeAPI,
  getUploadIdFromS3Api,
  completeUpLoadFileApi
}
