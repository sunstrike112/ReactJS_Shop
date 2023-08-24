/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/tag_management/store/saga'
import reducer from 'Modules/tag_management/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  makeGetListTag
  // makeCreateTag,
  // makeUpdateTag,
  // deleteTag
} from 'Modules/tag_management/store/selectors'
import {
  getListTagAction,
  createTagAction,
  updateTagAction,
  deleteTagAction,
  resetState
} from 'Modules/tag_management/store/actions'

export function useTagManagement() {
  useInjectSaga({ key: 'tagManagement', saga })
  useInjectReducer({ key: 'tagManagement', reducer })

  const {
    listTag,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    error
  } = useSelector(makeGetListTag())

  const dispatch = useDispatch()
  const getListTagApi = (payload) => dispatch(getListTagAction(payload))
  const createTagApi = (payload) => dispatch(createTagAction(payload))
  const updateTagApi = (payload) => dispatch(updateTagAction(payload))
  const deleteTagApi = (payload) => dispatch(deleteTagAction(payload))
  const resetStateAction = () => dispatch(resetState())

  return {
    getListTagApi,
    createTagApi,
    updateTagApi,
    deleteTagApi,

    listTag,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    error,
    resetStateAction
  }
}
