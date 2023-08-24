// import { parseFilterArrayToStringV2, parseParamsToQueryString, parseFilter } from 'Utils'

import AxiosClient from './api'
import END_POINT from './constants'

function loadSettingMaintenanceStatus() {
  return AxiosClient.get(END_POINT.SETTING_MAINTENANCE.GET_SETTTING_MAINTENANCE_STATUS)
    .then((res) => res.data)
}

function updateSettingMaintenanceStatus(data) {
  return AxiosClient.put(`${END_POINT.SETTING_MAINTENANCE.UPDATE_SETTING_MAINTENANCE_STATUS}`, data)
    .then((res) => res.data)
}

export {
  loadSettingMaintenanceStatus,
  updateSettingMaintenanceStatus
}
