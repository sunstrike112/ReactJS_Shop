import AxiosClient from './api'
import END_POINT from './constants'

function getFolderTreeAPI({ folderId }) {
  return AxiosClient.get(END_POINT.UPLOAD_FILE.GET_FOLDER_TREE, '', { params: { folderId } })
    .then((res) => res.data).catch((err) => err)
}

function getFolderFilesAPI({ folderId }) {
  return AxiosClient.get(END_POINT.UPLOAD_FILE.GET_FILES, '', { params: { folderId } })
    .then((res) => res.data).catch((err) => err)
}

function getFolderFileAPI({ id }) {
  return AxiosClient.get(END_POINT.UPLOAD_FILE.DETAIL_FILE, id)
    .then((res) => res.data).catch((err) => err)
}

function deleteFolderFilesAPI({ data }) {
  return AxiosClient.delete(END_POINT.UPLOAD_FILE.DELETE_FILES, data)
    .then((res) => res.data).catch((err) => err)
}

function addNewFolderAPI({ folderId = 0, params }) {
  return AxiosClient.post(`${END_POINT.UPLOAD_FILE.REGISTER_FOLDER}/${folderId}`, null, { params })
    .then((res) => res.data).catch((err) => err)
}

function updateFolderFileAPI({ folderId = 0, params }) {
  return AxiosClient.put(`${END_POINT.UPLOAD_FILE.UPDATE_FILE}/${folderId}`, null, { params })
    .then((res) => res.data).catch((err) => err)
}

function searchFileAPI({ params }) {
  return AxiosClient.get(END_POINT.UPLOAD_FILE.SEARCH_FILE, '', { params })
    .then((res) => res.data).catch((err) => err)
}

function uploadFileAPI({ folderId = 0, params }) {
  return AxiosClient.post(`${END_POINT.UPLOAD_FILE.UPLOAD_FILE}/${folderId}`, null, { params })
    .then((res) => res.data).catch((err) => err)
}

function uploadSubtitle(data) {
  return AxiosClient.post(`${END_POINT.UPLOAD_FILE.SUBTITLE_VIDEO}`, data)
    .then((res) => res.data).catch((err) => err)
}

function getVideoDetail(id) {
  return AxiosClient.get(`${END_POINT.UPLOAD_FILE.VIDEO_DETAIL}/${id}`)
    .then((res) => res.data).catch((err) => err)
}

function checkLinkProject(id) {
  return AxiosClient.get(`${END_POINT.UPLOAD_FILE.CHECK_LINK_PROJECT}?fileId=${id}`)
    .then((res) => res.data).catch((err) => err)
}

function checkUploadFileStatusAPI(id) {
  return AxiosClient.get(END_POINT.UPLOAD_FILE.CHECK_UPLOAD_FILE_STATUS(id)).then((res) => res.data)
}

function getFolderIdAPI() {
  return AxiosClient.get(END_POINT.UPLOAD_FILE.GET_FOLDER_ID).then((res) => res.data)
}

export {
  getFolderTreeAPI,
  getFolderFilesAPI,
  getFolderFileAPI,
  deleteFolderFilesAPI,
  updateFolderFileAPI,
  uploadFileAPI,
  addNewFolderAPI,
  searchFileAPI,
  uploadSubtitle,
  checkLinkProject,
  getVideoDetail,
  checkUploadFileStatusAPI,
  getFolderIdAPI
}
