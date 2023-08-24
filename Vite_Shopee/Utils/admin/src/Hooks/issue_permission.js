import {
  loadListCategory,
  loadListGroup,
  loadListAttribute,
  loadListUser,
  createIssuePermission,
  loadListUserSelected,
  loadListCourse,
  loadListIssuePermission,
  deleteIssuePermission,
  editIssuePermission,
  loadListUpdateIssuePermission,
  clearListIssuePermission,
  clearListUserSelectedPermission,
  resetIssuesPermission
} from 'Modules/course/issue_status_permissions/store/actions'
import reducer from 'Modules/course/issue_status_permissions/store/reducer'
import saga from 'Modules/course/issue_status_permissions/store/saga'
import { makeListCategoryCompany, makeListCategoryNissoken, makeSelectIssuePermission } from 'Modules/course/issue_status_permissions/store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'Stores'

export const useGetSelect = () => {
  useInjectReducer({ key: 'issuePermission', reducer })
  useInjectSaga({ key: 'issuePermission', saga })

  const { listCategory: { isSuccess: isSuccessListCategory } } = useSelector(makeSelectIssuePermission())
  const listCategoryCompany = useSelector(makeListCategoryCompany())
  const listCategoryNissoken = useSelector(makeListCategoryNissoken())

  const dispatch = useDispatch()
  const loadListCategoryAction = (payload) => dispatch(loadListCategory(payload))

  return {
    isSuccessListCategory,
    listCategoryCompany,
    listCategoryNissoken,
    loadListCategoryAction
  }
}

export const useSelectRecipient = () => {
  useInjectReducer({ key: 'issuePermission', reducer })
  useInjectSaga({ key: 'issuePermission', saga })

  const dispatch = useDispatch()

  const {
    listGroup: { data: listGroup },
    listAttribute: { data: listAttribute },
    listCourse: { data: listCourse, isLoading: isLoadingCourse },
    listUser: { data: listUser, pagination: paginationListUser, filter: filterListUser, isLoading: isLoadingListUser },
    list: { data: list, pagination, filter, isLoading }
  } = useSelector(makeSelectIssuePermission())

  const loadListAttributeAction = (payload) => dispatch(loadListAttribute(payload))
  const loadListGroupAction = (payload) => dispatch(loadListGroup(payload))
  const loadListUserAction = (payload) => dispatch(loadListUser(payload))
  const loadListCourseAction = (payload) => dispatch(loadListCourse(payload))
  const loadListIssuePermissionAction = (payload) => dispatch(loadListIssuePermission(payload))
  const clearListIssuePermissionAction = (payload) => dispatch(clearListIssuePermission(payload))
  const resetIssuesPermissionAction = () => dispatch(resetIssuesPermission())

  return {
    loadListCourseAction,
    listCourse,
    listGroup,
    listAttribute,
    loadListAttributeAction,
    loadListGroupAction,
    loadListUserAction,
    listUser,
    paginationListUser,
    filterListUser,
    loadListIssuePermissionAction,
    list,
    pagination,
    filter,
    clearListIssuePermissionAction,
    isLoading,
    isLoadingListUser,
    isLoadingCourse,
    resetIssuesPermissionAction
  }
}

export const useIssuePermission = () => {
  useInjectReducer({ key: 'issuePermission', reducer })
  useInjectSaga({ key: 'issuePermission', saga })

  const dispatch = useDispatch()

  // Selector state
  const {
    listUserSelected:
    {
      data: listUserSelected,
      pagination,
      filter,
      isLoading: isLoadingListUserSelected
    },
    create: { isLoading: isLoadingCreate },
    listCategory: { isLoading: isLoadingCategory }
  } = useSelector(makeSelectIssuePermission())

  // Dispatch action
  const createIssuePermissionAction = (payload) => dispatch(createIssuePermission(payload))
  const loadListUserSelectedAction = (payload) => dispatch(loadListUserSelected(payload))
  const clearListUserSelectedAction = (payload) => dispatch(clearListUserSelectedPermission(payload))

  return {
    createIssuePermissionAction,
    loadListUserSelectedAction,
    listUserSelected,
    pagination,
    filter,
    isLoadingCreate,
    isLoadingListUserSelected,
    isLoadingCategory,
    clearListUserSelectedAction
  }
}

export const useDeleteIssuePermission = () => {
  useInjectReducer({ key: 'issuePermission', reducer })
  useInjectSaga({ key: 'issuePermission', saga })

  const dispatch = useDispatch()

  const deleteIssuePermissionAction = (payload) => dispatch(deleteIssuePermission(payload))

  return {
    deleteIssuePermissionAction
  }
}

export const useUpdateIssuePermission = () => {
  useInjectReducer({ key: 'issuePermission', reducer })
  useInjectSaga({ key: 'issuePermission', saga })

  const dispatch = useDispatch()

  const {
    listUpdate:
    {
      data: listUpdate,
      pagination,
      filter,
      isLoading: isLoadingListUpdate
    },
    edit: { isLoading: isLoadingEdit }
  } = useSelector(makeSelectIssuePermission())

  const loadListUpdateIssuePermissionAction = (payload) => dispatch(loadListUpdateIssuePermission(payload))
  const updateIssuerPermissionAction = (payload) => dispatch(editIssuePermission(payload))

  return {
    updateIssuerPermissionAction,
    loadListUpdateIssuePermissionAction,
    listUpdate,
    pagination,
    filter,
    isLoadingEdit,
    isLoadingListUpdate
  }
}
