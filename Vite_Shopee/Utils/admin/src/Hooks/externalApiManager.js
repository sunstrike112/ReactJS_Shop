import saga from 'Modules/external/api_manager/store/saga'
import reducer from 'Modules/external/api_manager/store/reducer'
import { addExternalApiManager, deleteExternalApiManager, getExternalApis, getExternalApisManager } from 'Modules/external/api_manager/store/actions'
import { makeSelectExternalApiManager } from 'Modules/external/api_manager/store/selectors'
import { useInjectReducer, useInjectSaga } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useExternalApiManager = () => {
  useInjectSaga({ key: 'externalApiManager', saga })
  useInjectReducer({ key: 'externalApiManager', reducer })
  const dispatch = useDispatch()

  const { isLoading, apisManager, externalApi, pagination, error, isAdding, isDeleting } = useSelector(makeSelectExternalApiManager())

  const getExternalApisManagerAction = useCallback((payload) => dispatch(getExternalApisManager(payload)), [dispatch])
  const getExternalApisAction = useCallback((payload) => dispatch(getExternalApis(payload)), [dispatch])
  const addExternalApiManagerAction = useCallback((payload) => dispatch(addExternalApiManager(payload)), [dispatch])
  const deleteExternalApiManagerAction = useCallback((payload) => dispatch(deleteExternalApiManager(payload)), [dispatch])

  useEffect(() => {
    getExternalApisManagerAction({ params: DEFAULT_PAG })
    getExternalApisAction({ params: {} })
  }, [getExternalApisManagerAction, getExternalApisAction])

  return {
    isLoading,
    isAdding,
    isDeleting,
    apisManager,
    externalApi,
    pagination,
    error,
    getExternalApisManagerAction,
    addExternalApiManagerAction,
    deleteExternalApiManagerAction
  }
}
