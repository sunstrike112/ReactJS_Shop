/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { deleteByCsv, resetCsv } from 'Modules/user/user_management/batch_delete_user/store/actions'
import { makeSelectuserDeleteByCsv } from 'Modules/user/user_management/batch_delete_user/store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectSaga, useInjectReducer } from 'Stores'
import saga from 'Modules/user/user_management/batch_delete_user/store/saga'
import reducer from 'Modules/user/user_management/batch_delete_user/store/reducer'

export const useDeleteByCsv = () => {
  useInjectSaga({ key: 'userDeleteByCsv', saga })
  useInjectReducer({ key: 'userDeleteByCsv', reducer })
  const dispatch = useDispatch()
  const deleteByCsvAction = (payload) => dispatch(deleteByCsv(payload))
  const resetDataCsv = () => dispatch(resetCsv())

  const deletedUsers = useSelector(makeSelectuserDeleteByCsv())

  return {
    deletedUsers,
    deleteByCsvAction,
    resetDataCsv
  }
}
