/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/setting_maintain/store/saga'
import reducer from 'Modules/setting_maintain/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  loadSettingMaintenanceStatus,
  updateSettingMaintenanceStatus
} from 'Modules/setting_maintain/store/actions'
import {
  makeSettingMaintenanceStatus
} from 'Modules/setting_maintain/store/selectors'

export const useSettingMaintenanceStatus = () => {
  useInjectSaga({ key: 'settingMaintenanceStatus', saga })
  useInjectReducer({ key: 'settingMaintenanceStatus', reducer })

  const dispatch = useDispatch()

  const { settingMaintenanceStatus, isLoading, isLoadingUpdate } = useSelector(makeSettingMaintenanceStatus())

  const loadSettingMaintenanceStatusAction = () => dispatch(loadSettingMaintenanceStatus())
  const updateSettingMaintenanceStatusAction = (payload) => dispatch(updateSettingMaintenanceStatus(payload))

  return {
    loadSettingMaintenanceStatusAction,
    updateSettingMaintenanceStatusAction,
    settingMaintenanceStatus,
    isLoading,
    isLoadingUpdate
  }
}
