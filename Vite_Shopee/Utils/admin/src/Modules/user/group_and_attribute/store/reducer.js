import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_GROUPS,
  LOAD_GROUP,
  CREATE_GROUP,
  UPDATE_GROUP,
  DELETE_GROUPS,
  LOAD_ATTRIBUTES,
  LOAD_ATTRIBUTE,
  CREATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
  DELETE_ATTRIBUTES,
  SAVE_FILTER
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  groups: [],
  groupsTree: [],
  group: {},
  attributes: [],
  attribute: {},
  pagination: {
    limit: 100,
    page: 1,
    total: 0
  },
  filter: {},
  isSubmitting: false
}

function loadGroups(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function groupsLoaded(state, { payload }) {
  const { groups, groupsTree, filter } = payload
  return updateObject(state, {
    isLoading: false,
    groups,
    groupsTree,
    filter
  })
}

function groupsLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadGroup(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function groupLoaded(state, { payload }) {
  const { group } = payload
  return updateObject(state, {
    isLoading: false,
    group
  })
}

function groupLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function createGroup(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function createGroupSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function createGroupError(state, { error }) {
  return updateObject(state, { error })
}

function editGroup(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function editGroupSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function editGroupError(state, { error }) {
  return updateObject(state, { error })
}

function deleteGroups(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function deleteGroupsSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function deleteGroupsError(state, { error }) {
  return updateObject(state, { error })
}

function loadAttributes(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function attributesLoaded(state, { payload }) {
  const { attributes, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    attributes,
    pagination,
    filter
  })
}

function attributesLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadAttribute(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function attributeLoaded(state, { payload }) {
  const { attribute } = payload
  return updateObject(state, {
    isLoading: false,
    attribute
  })
}

function attributeLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function createAttribute(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function createAttributeSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function createAttributeError(state, { error }) {
  return updateObject(state, { error })
}

function editAttribute(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function editAttributeSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function editAttributeError(state, { error }) {
  return updateObject(state, { error })
}

function deleteAttributes(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function deleteAttributesSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function deleteAttributesError(state, { error }) {
  return updateObject(state, { error })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

function saveFilter(state) {
  return updateObject(state, { })
}

function filterSaved(state, payload) {
  const { filter } = payload?.filter?.payload
  return updateObject(state, { filter })
}

function savedFilterError(state, { error }) {
  return updateObject(state, { error })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_GROUPS)]: loadGroups,
  [SUCCESS(LOAD_GROUPS)]: groupsLoaded,
  [FAILURE(LOAD_GROUPS)]: groupsLoadingError,

  [REQUEST(LOAD_GROUP)]: loadGroup,
  [SUCCESS(LOAD_GROUP)]: groupLoaded,
  [FAILURE(LOAD_GROUP)]: groupLoadingError,

  [REQUEST(CREATE_GROUP)]: createGroup,
  [SUCCESS(CREATE_GROUP)]: createGroupSuccess,
  [FAILURE(CREATE_GROUP)]: createGroupError,

  [REQUEST(UPDATE_GROUP)]: editGroup,
  [SUCCESS(UPDATE_GROUP)]: editGroupSuccess,
  [FAILURE(UPDATE_GROUP)]: editGroupError,

  [REQUEST(DELETE_GROUPS)]: deleteGroups,
  [SUCCESS(DELETE_GROUPS)]: deleteGroupsSuccess,
  [FAILURE(DELETE_GROUPS)]: deleteGroupsError,

  [REQUEST(LOAD_ATTRIBUTES)]: loadAttributes,
  [SUCCESS(LOAD_ATTRIBUTES)]: attributesLoaded,
  [FAILURE(LOAD_ATTRIBUTES)]: attributesLoadingError,

  [REQUEST(LOAD_ATTRIBUTE)]: loadAttribute,
  [SUCCESS(LOAD_ATTRIBUTE)]: attributeLoaded,
  [FAILURE(LOAD_ATTRIBUTE)]: attributeLoadingError,

  [REQUEST(CREATE_ATTRIBUTE)]: createAttribute,
  [SUCCESS(CREATE_ATTRIBUTE)]: createAttributeSuccess,
  [FAILURE(CREATE_ATTRIBUTE)]: createAttributeError,

  [REQUEST(UPDATE_ATTRIBUTE)]: editAttribute,
  [SUCCESS(UPDATE_ATTRIBUTE)]: editAttributeSuccess,
  [FAILURE(UPDATE_ATTRIBUTE)]: editAttributeError,

  [REQUEST(DELETE_ATTRIBUTES)]: deleteAttributes,
  [SUCCESS(DELETE_ATTRIBUTES)]: deleteAttributesSuccess,
  [FAILURE(DELETE_ATTRIBUTES)]: deleteAttributesError,

  [REQUEST(SAVE_FILTER)]: saveFilter,
  [SUCCESS(SAVE_FILTER)]: filterSaved,
  [FAILURE(SAVE_FILTER)]: savedFilterError,

  [LOCATION_CHANGE]: resetState
})
