import { parseFilter } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getPasswordsAPI({ params }) {
  params = parseFilter(params)
  return AxiosClient.get(END_POINT.SETTING_PASSWORD_PLAN.GET_PASSWORDS, '', { params })
    .then(({ data }) => data)
}

function addPasswordAPI({ data }) {
  return AxiosClient.post(END_POINT.SETTING_PASSWORD_PLAN.ADD_PASSWORD, data)
    .then((result) => result.data)
}

function deletePasswordAPI({ data }) {
  return AxiosClient.put(END_POINT.SETTING_PASSWORD_PLAN.DELETE_PASSWORD, data)
    .then((result) => result.data)
}

function changeStatusPlanZzAPI({ companyId }) {
  return AxiosClient.post(END_POINT.SETTING_PASSWORD_PLAN.CHANGE_STATUS(companyId))
    .then(({ data }) => data)
}

function applyPlanZzAPI({ companyId, data }) {
  return AxiosClient.post(END_POINT.SETTING_PASSWORD_PLAN.APPLY_PLAN_ZZ(companyId), data)
    .then((result) => result.data)
}

export {
  getPasswordsAPI,
  addPasswordAPI,
  deletePasswordAPI,
  changeStatusPlanZzAPI,
  applyPlanZzAPI
}
