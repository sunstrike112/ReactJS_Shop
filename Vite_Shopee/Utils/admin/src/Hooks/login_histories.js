/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/user/login_history/store/saga'
import reducer from 'Modules/user/login_history/store/reducer'

import { useInjectSaga, useInjectReducer } from 'Stores'
import { makeSelectLoginHistory } from 'Modules/user/login_history/store/selectors'
import { loadLoginHistories, resetLoginHistories } from 'Modules/user/login_history/store/actions'

export const useLoginHistory = () => {
  useInjectSaga({
    key: 'loginHistories',
    saga
  })
  useInjectReducer({
    key: 'loginHistories',
    reducer
  })

  const { histories, pagination, filter, isLoading, error } = useSelector(
    makeSelectLoginHistory()
  )

  const dispatch = useDispatch()

  const loadLoginHistoriesAction = (payload) => {
    dispatch(loadLoginHistories(payload))
  }
  const resetLoginHistoriesAction = () => {
    dispatch(resetLoginHistories())
  }

  return {
    histories,
    pagination,
    filter,
    isLoading,
    error,
    loadLoginHistoriesAction,
    resetLoginHistoriesAction
  }
}
