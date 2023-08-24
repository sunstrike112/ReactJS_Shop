import { parseFilter, parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getWorkSpaceDetailAPI({ workspaceId }) {
  return AxiosClient.get(END_POINT.WORK_SPACE.GET_DETAIL(workspaceId))
    .then((res) => res.data)
}

function getAdminsNissokenAPI({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.WORK_SPACE.GET_ADMINS_NISSOKEN}?${q}`)
    .then((res) => res.data)
}

function createWorkSpaceAPI({ data }) {
  return AxiosClient.post(END_POINT.WORK_SPACE.CREATE, data)
    .then((res) => res.data)
}

function editWorkSpaceAPI({ workspaceId, data }) {
  return AxiosClient.put(END_POINT.WORK_SPACE.EDIT(workspaceId), data)
    .then((res) => res.data)
}

function getWorkSpaceAllAPI({ params }) {
  return AxiosClient.get(END_POINT.WORK_SPACE.GET_ALL_WORKSPACE, '', { params })
    .then((res) => res.data)
}

function deleteWorkSpaceAPI({ data }) {
  return AxiosClient.delete(END_POINT.WORK_SPACE.DELETE_WORKSPACE, data)
    .then((res) => res.data)
}

function deleteUserWorkSpaceAPI({ workspaceId, data }) {
  return AxiosClient.delete(END_POINT.WORK_SPACE.DELETE_USER_WORKSPACE(workspaceId), data)
    .then((res) => res.data)
}

function addUserWorkSpaceAPI({ data }) {
  return AxiosClient.post(END_POINT.WORK_SPACE.ADD_USER_WORKSPACE, data)
    .then((res) => res.data)
}

export {
  createWorkSpaceAPI,
  getWorkSpaceDetailAPI,
  getAdminsNissokenAPI,
  editWorkSpaceAPI,
  getWorkSpaceAllAPI,
  deleteWorkSpaceAPI,
  deleteUserWorkSpaceAPI,
  addUserWorkSpaceAPI
}
