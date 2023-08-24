/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/user/user_management/store/saga'
import reducer from 'Modules/user/user_management/store/reducer'
import groupAttributeSaga from 'Modules/user/group_and_attribute/store/saga'
import groupAttributeReducer from 'Modules/user/group_and_attribute/store/reducer'
import {
  loadUsers,
  updateUser,
  loadUser,
  createUser,
  deleteUsers,
  assignRemoveGroup,
  assignRemoveAttribute,
  updateLoginStatus,
  loadUserLearnStatus,
  loadUserTestResult,
  loadUserLearnHistory,
  batchRegisterUser,
  downloadCSVTemplate,
  loadImportUserResult,
  loadCompanies,
  createNissokenUser,
  checkExistEmail,
  resetUsers
} from 'Modules/user/user_management/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { makeSelectUserManagement } from 'Modules/user/user_management/store/selectors'
import { makeSelectGroupAttribute } from 'Modules/user/group_and_attribute/store/selectors'
import {
  loadGroups,
  loadGroup,
  createGroup,
  updateGroup,
  deleteGroups,
  loadAttributes,
  loadAttribute,
  createAttribute,
  updateAttribute,
  deleteAttributes,
  saveFilter
} from 'Modules/user/group_and_attribute/store/actions'

export const useUserManagement = () => {
  useInjectSaga({ key: 'userManagement', saga })
  useInjectReducer({ key: 'userManagement', reducer })

  const {
    users,
    user,
    userLearnStatus,
    userTestResult,
    userLearnHistory,
    importUserResult,
    pagination,
    sort,
    filter,
    isLoading,
    isSubmitting,
    error,
    companies,
    userExist
  } = useSelector(
    makeSelectUserManagement()
  )

  const dispatch = useDispatch()
  const loadUsersAction = (payload) => dispatch(loadUsers(payload))
  const loadUserAction = (payload) => dispatch(loadUser(payload))
  const createUserAction = (payload) => dispatch(createUser(payload))
  const updateUserAction = (payload) => dispatch(updateUser(payload))
  const deleteUsersAction = (payload) => dispatch(deleteUsers(payload))
  const assignRemoveGroupAction = (payload) => dispatch(assignRemoveGroup(payload))
  const assignRemoveAttributeAction = (payload) => dispatch(assignRemoveAttribute(payload))
  const updateLoginStatusAction = (payload) => dispatch(updateLoginStatus(payload))
  const loadUserLearnStatusAction = (payload) => dispatch(loadUserLearnStatus(payload))
  const loadUserTestResultAction = (payload) => dispatch(loadUserTestResult(payload))
  const loadUserLearnHistoryAction = (payload) => dispatch(loadUserLearnHistory(payload))
  const batchRegisterUserAction = (payload) => dispatch(batchRegisterUser(payload))
  const downloadCSVTemplateAction = (payload) => dispatch(downloadCSVTemplate(payload))
  const loadImportUserResultAction = (payload) => dispatch(loadImportUserResult(payload))
  const loadCompaniesAction = (payload) => dispatch(loadCompanies(payload))
  const createNissokenUserAction = (payload) => dispatch(createNissokenUser(payload))
  const checkExistEmailAction = (payload) => dispatch(checkExistEmail(payload))
  const resetUsersAction = () => dispatch(resetUsers())

  return {
    users,
    user,
    userLearnStatus,
    userTestResult,
    userLearnHistory,
    importUserResult,
    isLoading,
    isSubmitting,
    error,
    pagination,
    sort,
    filter,
    companies,
    userExist,
    loadUsersAction,
    loadUserAction,
    createUserAction,
    deleteUsersAction,
    assignRemoveGroupAction,
    assignRemoveAttributeAction,
    updateLoginStatusAction,
    loadUserLearnStatusAction,
    loadUserTestResultAction,
    loadUserLearnHistoryAction,
    batchRegisterUserAction,
    downloadCSVTemplateAction,
    loadImportUserResultAction,
    updateUserAction,
    loadCompaniesAction,
    createNissokenUserAction,
    checkExistEmailAction,
    resetUsersAction
  }
}

export const useGroupAttribute = () => {
  useInjectSaga({ key: 'groupAttribute', saga: groupAttributeSaga })
  useInjectReducer({ key: 'groupAttribute', reducer: groupAttributeReducer })

  const { groups, groupsTree, group, attributes, attribute, pagination, filter, isLoading, isSubmitting, error } = useSelector(
    makeSelectGroupAttribute()
  )

  const dispatch = useDispatch()
  const loadGroupsAction = (payload) => dispatch(loadGroups(payload))
  const loadGroupAction = (payload) => dispatch(loadGroup(payload))
  const createGroupAction = (payload) => dispatch(createGroup(payload))
  const updateGroupAction = (payload) => dispatch(updateGroup(payload))
  const deleteGroupsAction = (payload) => dispatch(deleteGroups(payload))
  const loadAttributesAction = (payload) => dispatch(loadAttributes(payload))
  const loadAttributeAction = (payload) => dispatch(loadAttribute(payload))
  const createAttributeAction = (payload) => dispatch(createAttribute(payload))
  const updateAttributeAction = (payload) => dispatch(updateAttribute(payload))
  const deleteAttributesAction = (payload) => dispatch(deleteAttributes(payload))
  const loadSaveFilterAction = (payload) => dispatch(saveFilter(payload))

  return {
    groups,
    groupsTree,
    group,
    attributes,
    attribute,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    error,
    loadGroupsAction,
    loadGroupAction,
    createGroupAction,
    updateGroupAction,
    deleteGroupsAction,
    loadAttributesAction,
    loadAttributeAction,
    createAttributeAction,
    updateAttributeAction,
    deleteAttributesAction,
    loadSaveFilterAction
  }
}
