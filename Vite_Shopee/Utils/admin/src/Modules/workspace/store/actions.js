import { REQUEST } from 'Stores'
import {
  ADD_USER_WORKSPACE,
  DELETE_USER_WORKSPACE,
  CREATE_WORKSPACE,
  DELETE_WORKSPACE,
  EDIT_WORKSPACE,
  GET_ADMINS_NISSOKEN,
  GET_WORKSPACE_ALL,
  GET_WORKSPACE_DETAIL,
  RESET_WORKSPACES
} from './constants'

export const createWorkSpace = (payload) => ({
  type: REQUEST(CREATE_WORKSPACE),
  payload
})

export const editWorkSpace = (payload) => ({
  type: REQUEST(EDIT_WORKSPACE),
  payload
})

export const getAdminsNissoken = (payload) => ({
  type: REQUEST(GET_ADMINS_NISSOKEN),
  payload
})

export const getWorkspaceAll = (payload) => ({
  type: REQUEST(GET_WORKSPACE_ALL),
  payload
})

export const getWorkspaceDetail = (payload) => ({
  type: REQUEST(GET_WORKSPACE_DETAIL),
  payload
})

export const deleteWorkSpace = (payload) => ({
  type: REQUEST(DELETE_WORKSPACE),
  payload
})

export const deleteUserWorkSpace = (payload) => ({
  type: REQUEST(DELETE_USER_WORKSPACE),
  payload
})

export const addUserWorkSpace = (payload) => ({
  type: REQUEST(ADD_USER_WORKSPACE),
  payload
})

export const resetWorkspaces = () => ({
  type: REQUEST(RESET_WORKSPACES)
})
