import AxiosClient from './api'
import END_POINT from './constants'

function getFolderTreeImageApi({ folderId }) {
  return AxiosClient.get(END_POINT.UPLOAD_FILE_IMAGE.GET_FOLDER_TREE, '', { params: { folderId } })
    .then((res) => res.data)
    .catch((err) => err)
}

function getFolderFilesImageAPI({ folderId }) {
  return AxiosClient.get(END_POINT.UPLOAD_FILE_IMAGE.GET_FILES, '', { params: { folderId } })
    .then((res) => res.data).catch((err) => err)
}

function addNewFolderImageAPI({ folderId = 0, params }) {
  return AxiosClient.post(`${END_POINT.UPLOAD_FILE_IMAGE.REGISTER_FOLDER_IMAGE}/${folderId}`, null, { params })
    .then((res) => res.data).catch((err) => err)
}

function deleteFolderFilesImageAPI({ data }) {
  return AxiosClient.delete(`${END_POINT.UPLOAD_FILE.DELETE_FILES}?typeFile=IMAGE`, data)
    .then((res) => res.data).catch((err) => err)
}

function uploadFilesAPI({ folderId = 0, data }) {
  return AxiosClient.post(`${END_POINT.UPLOAD_FILE_IMAGE.UPLOAD_FILE}/${folderId}?typeFile=IMAGE`, Object.values(data)[0])
    .then((res) => res.data).catch((err) => err)
}

export {
  getFolderTreeImageApi,
  getFolderFilesImageAPI,
  addNewFolderImageAPI,
  deleteFolderFilesImageAPI,
  uploadFilesAPI
}
