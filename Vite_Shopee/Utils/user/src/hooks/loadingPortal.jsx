/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import { useInjectReducer, useInjectSaga } from '../store'
import saga from '../routes/store/saga'
import reducer from '../routes/store/reducer'
import { makeSelectLoadingPortal } from '../routes/store/selectors'
import { } from '../modules/course/store/actions'
import { loadingPortalRequest, loadingPortalStop } from '../routes/store/actions'

export const useLoadingPortal = () => {
  useInjectSaga({ key: 'globalStore', saga })
  useInjectReducer({ key: 'globalStore', reducer })

  const dispatch = useDispatch()

  const isLoadingPortal = useSelector(makeSelectLoadingPortal())

  const loadingPortalRequestAction = () => dispatch(loadingPortalRequest())
  const loadingPortalStopAction = () => dispatch(loadingPortalStop())

  return {
    isLoadingPortal,
    loadingPortalRequestAction,
    loadingPortalStopAction
  }
}
