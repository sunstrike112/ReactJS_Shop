/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/setting_mail_server/store/saga'
import reducer from 'Modules/setting_mail_server/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  getEmailServer,
  updateEmailServer
} from 'Modules/setting_mail_server/store/actions'
import { makeSelectSettingEmailServer } from 'Modules/setting_mail_server/store/selectors'

export const useSettingEmailServer = () => {
  useInjectSaga({ key: 'settingEmailServer', saga })
  useInjectReducer({ key: 'settingEmailServer', reducer })

  const dispatch = useDispatch()

  const { isLoading, isUpdating, emailServer, error } = useSelector(makeSelectSettingEmailServer())

  const getEmailServerAction = (payload) => dispatch(getEmailServer(payload))
  const updateEmailServerAction = (payload) => dispatch(updateEmailServer(payload))

  return {
    isLoading,
    isUpdating,
    emailServer,
    error,
    getEmailServerAction,
    updateEmailServerAction
  }
}
