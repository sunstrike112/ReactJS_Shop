import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/workspace/store/saga'
import reducer from 'Modules/workspace/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { makeAdminsNissoken, makeCreateWorkspace, makeWorkspaceAll, makeEditWorkspace, makeWorkspaceDetail, makeWorkspace } from 'Modules/workspace/store/selectors'
import {
  createWorkSpace,
  editWorkSpace,
  getWorkspaceAll, getAdminsNissoken, getWorkspaceDetail, deleteWorkSpace, addUserWorkSpace, deleteUserWorkSpace, resetWorkspaces } from 'Modules/workspace/store/actions'

export const useCreateWorkSpace = () => {
  useInjectSaga({ key: 'workspace', saga })
  useInjectReducer({ key: 'workspace', reducer })

  const dispatch = useDispatch()

  const { isCreating, error } = useSelector(makeCreateWorkspace())

  const createWorkspaceAction = (payload) => dispatch(createWorkSpace(payload))

  return {
    isCreating,
    error,
    createWorkspaceAction
  }
}

export const useEditWorkSpace = () => {
  useInjectSaga({ key: 'workspace', saga })
  useInjectReducer({ key: 'workspace', reducer })

  const dispatch = useDispatch()

  const { isEditing, error } = useSelector(makeEditWorkspace())

  const editWorkspaceAction = (payload) => dispatch(editWorkSpace(payload))

  return {
    isEditing,
    error,
    editWorkspaceAction
  }
}

export const useAdminsNissoken = () => {
  useInjectSaga({ key: 'workspace', saga })
  useInjectReducer({ key: 'workspace', reducer })

  const dispatch = useDispatch()

  const { data, isLoading, error, pagination, filter } = useSelector(makeAdminsNissoken())

  const getAdminsNissokenAction = (payload) => dispatch(getAdminsNissoken(payload))

  return {
    data,
    isLoading,
    error,
    pagination,
    filter,
    getAdminsNissokenAction
  }
}

export const useGetWorkSpaceAll = () => {
  useInjectSaga({ key: 'workspace', saga })
  useInjectReducer({ key: 'workspace', reducer })

  const { data, error, pagination, filter, isLoading, isDeleting } = useSelector(makeWorkspaceAll())

  const dispatch = useDispatch()

  const getWorkspaceAllAction = (payload) => dispatch(getWorkspaceAll(payload))
  const deleteWorkSpaceAction = (payload) => dispatch(deleteWorkSpace(payload))
  const deleteUserWorkSpaceAction = (payload) => dispatch(deleteUserWorkSpace(payload))
  const resetWorkspacesAction = (payload) => dispatch(resetWorkspaces(payload))

  return {
    isLoading,
    isDeleting,
    data,
    error,
    pagination,
    filter,
    getWorkspaceAllAction,
    deleteWorkSpaceAction,
    deleteUserWorkSpaceAction,
    resetWorkspacesAction
  }
}

export const useWorkspaceDetail = () => {
  useInjectSaga({ key: 'workspace', saga })
  useInjectReducer({ key: 'workspace', reducer })

  const dispatch = useDispatch()

  const { data, isLoading, error } = useSelector(makeWorkspaceDetail())

  const getWorkspaceDetailAction = (payload) => dispatch(getWorkspaceDetail(payload))

  return {
    data,
    isLoading,
    error,
    getWorkspaceDetailAction
  }
}

export const useAddUserWorkSpace = () => {
  useInjectSaga({ key: 'workspace', saga })
  useInjectReducer({ key: 'workspace', reducer })

  const dispatch = useDispatch()

  const { data, isLoading, error } = useSelector(makeWorkspaceAll())
  const { isSubmitting } = useSelector(makeWorkspace())

  const addUserWorkSpaceAction = (payload) => dispatch(addUserWorkSpace(payload))

  return {
    data,
    isLoading,
    isSubmitting,
    error,
    addUserWorkSpaceAction
  }
}
