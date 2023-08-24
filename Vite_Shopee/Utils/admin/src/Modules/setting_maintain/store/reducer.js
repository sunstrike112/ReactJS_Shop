/* eslint-disable no-unused-vars */
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_SETTING_MAINTENANCE_STATUS,
  UPDATE_SETTING_MAINTENANCE_STATUS
} from './constants'

export const initialState = {
  isLoading: false,
  isSubmitting: false,
  isLoadingUpdate: false,
  settingMaintenanceStatus: { }
}

function loadSettingMaintenanceStatus(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadSettingMaintenanceStatusSuccess(state, { payload }) {
  return updateObject(state, {
    isLoading: false,
    settingMaintenanceStatus: payload
  })
}

function loadSettingMaintenanceStatusFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function updateSettingMaintenanceStatus(state) {
  return updateObject(state, {
    isLoadingUpdate: true
  })
}

function updateSettingMaintenanceStatusSuccess(state) {
  return updateObject(state, {
    isLoadingUpdate: false,
    isSubmitting: true
  })
}

function updateSettingMaintenanceStatusFailure(state, { error }) {
  return updateObject(state, {
    isLoadingUpdate: false,
    error
  })
}

// Slice reducer
export default createReducer(initialState, {

  [REQUEST(LOAD_SETTING_MAINTENANCE_STATUS)]: loadSettingMaintenanceStatus,
  [SUCCESS(LOAD_SETTING_MAINTENANCE_STATUS)]: loadSettingMaintenanceStatusSuccess,
  [FAILURE(LOAD_SETTING_MAINTENANCE_STATUS)]: loadSettingMaintenanceStatusFailure,

  [REQUEST(UPDATE_SETTING_MAINTENANCE_STATUS)]: updateSettingMaintenanceStatus,
  [SUCCESS(UPDATE_SETTING_MAINTENANCE_STATUS)]: updateSettingMaintenanceStatusSuccess,
  [FAILURE(UPDATE_SETTING_MAINTENANCE_STATUS)]: updateSettingMaintenanceStatusFailure

})
