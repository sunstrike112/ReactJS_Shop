import { REQUEST } from 'Stores'
import {
  LOAD_SETTING_MAINTENANCE_STATUS,
  UPDATE_SETTING_MAINTENANCE_STATUS
} from './constants'

export function loadSettingMaintenanceStatus() {
  return {
    type: REQUEST(LOAD_SETTING_MAINTENANCE_STATUS)
  }
}

export function updateSettingMaintenanceStatus(payload) {
  return {
    type: REQUEST(UPDATE_SETTING_MAINTENANCE_STATUS),
    payload
  }
}
