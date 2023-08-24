import AxiosClient from './api'
import END_POINT from './constants'

function videoEditor(body) {
  return AxiosClient.post(`${END_POINT.VIDEO_EDITOR}`, { ...body })
    .then((res) => res.data)
}

function videoEditorSplitPause(body) {
  return AxiosClient.post(`${END_POINT.VIDEO_SPLIT_PAUSE}`, { ...body })
    .then((res) => res.data)
}

function getprojectDetail(projectId) {
  return AxiosClient.get(`${END_POINT.PROJECT_MANAGAMENT.PROJECT_DETAIL}/${projectId}`)
    .then((res) => res.data)
}

function updateProjectNameAPI({ projectId, projectName }) {
  return AxiosClient.put(`${END_POINT.PROJECT_MANAGAMENT.UPDATE_PROJECT_NAME(projectId)}`, { projectName }, { params: { projectName } })
    .then((res) => res.data)
}

export {
  videoEditor,
  videoEditorSplitPause,
  updateProjectNameAPI,
  getprojectDetail
}
