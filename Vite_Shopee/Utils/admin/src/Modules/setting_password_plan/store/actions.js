import { REQUEST } from 'Stores'
import {
  ADD_PASSWORD,
  APPLY_PLAN_ZZ,
  CHANGE_STATUS_PLAN_ZZ,
  DELETE_PASSWORD,
  GET_PASSWORDS,
  RESET_STATE_PASSWORD
} from './constants'

export function getPasswords(payload) {
  return {
    type: REQUEST(GET_PASSWORDS),
    payload
  }
}

export function addPassword(payload) {
  return {
    type: REQUEST(ADD_PASSWORD),
    payload
  }
}

export function deletePassword(payload) {
  return {
    type: REQUEST(DELETE_PASSWORD),
    payload
  }
}

export const changeStatusPlanZZ = (payload) => ({
  type: REQUEST(CHANGE_STATUS_PLAN_ZZ),
  payload
})

export const applyPlanZZ = (payload) => ({
  type: REQUEST(APPLY_PLAN_ZZ),
  payload
})

export const resetState = () => ({
  type: REQUEST(RESET_STATE_PASSWORD)
})
