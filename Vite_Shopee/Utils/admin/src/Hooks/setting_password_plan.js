import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/setting_password_plan/store/saga'
import reducer from 'Modules/setting_password_plan/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  addPassword,
  applyPlanZZ,
  changeStatusPlanZZ,
  deletePassword,
  getPasswords,
  resetState
} from 'Modules/setting_password_plan/store/actions'
import { makeSettingPasswordPlan } from 'Modules/setting_password_plan/store/selectors'

export const useSettingPasswordPlan = () => {
  useInjectSaga({ key: 'settingPasswordPlan', saga })
  useInjectReducer({ key: 'settingPasswordPlan', reducer })

  const dispatch = useDispatch()

  const { isLoading, isAdding, isChangingStatus, isApplying, isDeleting, passwordsPlan, pagination, filter } = useSelector(makeSettingPasswordPlan())

  const getPasswordsAction = (payload) => dispatch(getPasswords(payload))
  const addPasswordAction = (payload) => dispatch(addPassword(payload))
  const deletePasswordAction = (payload) => dispatch(deletePassword(payload))
  const changeStatusPlanZZAction = (payload) => dispatch(changeStatusPlanZZ(payload))
  const applyPlanZZAction = (payload) => dispatch(applyPlanZZ(payload))
  const resetStateAction = () => dispatch(resetState())
  return {
    getPasswordsAction,
    addPasswordAction,
    deletePasswordAction,
    changeStatusPlanZZAction,
    applyPlanZZAction,
    isLoading,
    isAdding,
    isApplying,
    isChangingStatus,
    isDeleting,
    passwordsPlan,
    pagination,
    filter,
    resetStateAction
  }
}
