import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/setting_mobile/store/saga'
import reducer from 'Modules/setting_mobile/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { makeSelectSettingMobile } from 'Modules/setting_mobile/store/selectors'
import { useCallback, useEffect } from 'react'
import { getSettingMobileDetailRequest, updateSettingMobileDetailRequest } from 'Modules/setting_mobile/store/actions'

export const useSettingMobile = () => {
  useInjectSaga({ key: 'settingMobile', saga })
  useInjectReducer({ key: 'settingMobile', reducer })

  const dispatch = useDispatch()

  const { isLoading, isSubmitting, data, error } = useSelector(makeSelectSettingMobile())

  const getSettingMobileDetailAction = useCallback(() => {
    dispatch(getSettingMobileDetailRequest())
  })

  const updateSettingMobileDetailAction = useCallback((payload) => {
    dispatch(updateSettingMobileDetailRequest(payload))
  }, [])

  useEffect(() => {
    getSettingMobileDetailAction()
  }, [])

  return {
    isLoading,
    isSubmitting,
    data,
    error,

    getSettingMobileDetailAction,
    updateSettingMobileDetailAction
  }
}
