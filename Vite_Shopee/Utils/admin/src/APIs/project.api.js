import { parseFilter } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getListProject({ params }) {
  params = parseFilter(params)
  return AxiosClient.get(END_POINT.PROJECT_MANAGAMENT.GET_LIST_PROJECT, '', { params }).then((res) => res.data)
}

function checkExistProjectName(params) {
  return AxiosClient.get(END_POINT.PROJECT_MANAGAMENT.CHECK_EXIST_PROJECT_NAME, '', { params })
}

function deleteProject({ ids }) {
  return AxiosClient.delete(`${END_POINT.PROJECT_MANAGAMENT.DELETE_PROJECT}`, ids)
    .then((res) => res.data)
}

function createProject(projectInfo) {
  return AxiosClient.post(`${END_POINT.PROJECT_MANAGAMENT.CREATE_PROJECT}`, { ...projectInfo })
    .then((res) => res.data)
}

function createThumbnail(projectInfo) {
  return AxiosClient.post(`${END_POINT.PROJECT_MANAGAMENT.CREATE_THUMBNAIL}`, { ...projectInfo })
    .then((res) => res.data)
}

function publishProject({ fileId, isOverride }) {
  return AxiosClient.post(`${END_POINT.PROJECT_MANAGAMENT.PUBLISH_PROJECT}?fileId=${fileId}&isOverride=${isOverride}`)
    .then((res) => res.data)
}

function moveFile({ folderId, fileId, fileName, folderParent }) {
  return AxiosClient.post(`admin/course/course-file/move-file/${folderId}?fileId=${fileId}&fileName=${fileName}&folderParent=${folderParent}`)
    .then((res) => res.data)
}

export {
  getListProject,
  deleteProject,
  createProject,
  checkExistProjectName,
  createThumbnail,
  publishProject,
  moveFile
}
