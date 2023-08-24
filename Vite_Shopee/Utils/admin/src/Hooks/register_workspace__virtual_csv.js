/* eslint-disable no-undef */
/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux'
import { useInjectSaga, useInjectReducer } from 'Stores'
import saga from 'Modules/user/user_management/batch_register_workspace_virtual/store/saga'
import reducer from 'Modules/user/user_management/batch_register_workspace_virtual/store/reducer'
import {
  registerWorkspaceByCsv,
  resetCsv
} from 'Modules/user/user_management/batch_register_workspace_virtual/store/actions'
import {
  makeSelectWorkspaceRegisterByCsv
} from 'Modules/user/user_management/batch_register_workspace_virtual/store/selectors'

export const useRegisterWorkspaceVirtualByCsv = () => {
  useInjectSaga({ key: 'workspaceRegisterByCsv', saga })
  useInjectReducer({ key: 'workspaceRegisterByCsv', reducer })
  const dispatch = useDispatch()
  const registerByCsvWorkspaceAction = (payload) => dispatch(registerWorkspaceByCsv(payload))
  const resetDataCsv = () => dispatch(resetCsv())

  const registeredUsers = useSelector(makeSelectWorkspaceRegisterByCsv())

  return {
    registeredUsers,
    registerByCsvWorkspaceAction,
    resetDataCsv
  }
}
