import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, FAILURE, REQUEST, SUCCESS, updateObject } from 'Stores'
import {
  CLEAR_LIST_ISSUE_PERMISSION,
  CLEAR_LIST_USER_SELECTED,
  CREATE_ISSUE_PERMISSION,
  DELETE_ISSUE_PERMISSION,
  EDIT_ISSUE_PERMISSION,
  LOAD_ISSUE_PERMISSION,
  LOAD_LIST_ATTRIBUTE,
  LOAD_LIST_CATEGORY,
  LOAD_LIST_COURSE,
  LOAD_LIST_GROUP,
  LOAD_LIST_ISSUE_PERMISSION,
  LOAD_LIST_UPDATE_ISSUE_PERMISSION,
  LOAD_LIST_USER,
  LOAD_LIST_USER_SELECTED,
  RESET_ISSUES_PERMISSION
} from '../constants'
import {
  loadListAttribute,
  loadListAttributeSuccess,
  loadListCategory,
  loadListCategorySuccess,
  loadListCourse,
  loadListCourseSuccess,
  loadListGroup,
  loadListGroupSuccess,
  loadListUser,
  loadListUserSelected,
  loadListUserSelectedSuccess,
  loadListUserSuccess
} from './select'

import { RoutesName } from '../../../routes'

export const initialState = {
  list: {
    data: [],
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 100
    },
    filter: {
      possibleCourse: 'ALL'
    }
  },
  create: {
    isLoading: false,
    isSuccess: false,
    error: null
  },
  edit: {
    isLoading: false,
    isSuccess: false,
    error: null
  },
  detail: {
    data: {},
    isLoading: false,
    isSuccess: false,
    error: null
  },
  listCategory: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: null
  },
  listAttribute: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: null
  },
  listGroup: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: null
  },
  listUser: {
    data: [],
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 100
    },
    filter: {}
  },
  listUserSelected: {
    data: [],
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 100
    },
    filter: {}
  },
  listCourse: {
    data: [],
    isLoading: false,
    error: null
  },
  listUpdate: {
    data: [],
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 100
    },
    filter: {}
  }
}

function clearListUserSelectedPermission(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    listUserSelected: updateObject(state.listUserSelected, {
      data,
      pagination,
      filter
    })
  })
}

function clearListIssuePermission(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    list: updateObject(state.list, {
      data,
      pagination,
      filter
    })
  })
}

function loadListIssuePermission(state) {
  return updateObject(state, {
    list: updateObject(state.list, {
      error: null,
      isLoading: true
    })
  })
}

function loadListIssuePermissionSuccess(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    list: updateObject(state.list, {
      isLoading: false,
      data,
      pagination,
      filter
    })
  })
}

function loadListIssuePermissionError(state, { error }) {
  return updateObject(state, {
    list: updateObject(state.list, {
      isLoading: false,
      error
    })
  })
}

/**
 * DETAIl
 */

function loadIssuePermission(state) {
  return updateObject(state, {
    detail: updateObject(state.detail, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function loadIssuePermissionSuccess(state, { payload }) {
  const { data } = payload
  return updateObject(state, {
    detail: updateObject(state.detail, {
      data,
      isLoading: false,
      isSuccess: true
    })
  })
}

function loadIssuePermissionError(state, { error }) {
  return updateObject(state, {
    detail: updateObject(state.detail, {
      isLoading: false,
      error
    })
  })
}

/**
 * EDIT
 */

function editIssuePermission(state) {
  return updateObject(state, {
    edit: updateObject(state.edit, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function editIssuePermissionSuccess(state) {
  return updateObject(state, {
    edit: updateObject(state.edit, {
      isLoading: false,
      isSuccess: true
    })
  })
}

function editIssuePermissionError(state, { error }) {
  return updateObject(state, {
    edit: updateObject(state.edit, {
      isLoading: false,
      error
    })
  })
}

/**
 * CREATE
 */

function createIssuePermission(state) {
  return updateObject(state, {
    create: updateObject(state.create, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function createIssuePermissionSuccess(state) {
  return updateObject(state, {
    create: updateObject(state.create, {
      isLoading: false,
      isSuccess: true
    })
  })
}

function createIssuePermissionError(state, { error }) {
  return updateObject(state, {
    create: updateObject(state.create, {
      isLoading: false,
      error
    })
  })
}

/**
 * DELETE
 */

function deleteIssuePermission(state) {
  return updateObject(state, {
    delete: updateObject(state.delete, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function deleteIssuePermissionSuccess(state) {
  return updateObject(state, {
    delete: updateObject(state.delete, {
      isLoading: false,
      isSuccess: true
    })
  })
}

function deleteIssuePermissionError(state, { error }) {
  return updateObject(state, {
    delete: updateObject(state.delete, {
      isLoading: false,
      error
    })
  })
}

/**
 * LOAD LIST UPDATE
 */

function loadListUpdateIssuePermission(state) {
  return updateObject(state, {
    listUpdate: updateObject(state.listUpdate, {
      error: null,
      isLoading: true
    })
  })
}

function loadListUpdateIssuePermissionSuccess(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    listUpdate: updateObject(state.listUpdate, {
      isLoading: false,
      data,
      pagination,
      filter
    })
  })
}

function loadListUpdateIssuePermissionError(state, { error }) {
  return updateObject(state, {
    listUpdate: updateObject(state.listUpdate, {
      isLoading: false,
      error
    })
  })
}

function resetIssuesPermission(state) {
  return updateObject(state, {
    list: updateObject(state.list, {
      data: [...initialState.list.data],
      pagination: { ...initialState.list.pagination },
      filter: { ...initialState.list.filter }
    })
  })
}

/**
 * RESET STATE
 */

function resetState(state, { payload }) {
  return updateObject(state, {
    ...initialState,
    list: updateObject(state.list,
      payload.location.pathname.includes(RoutesName.ISSUE_STATUS_PERMISSION)
        ? state.list
        : {
          data: [],
          isLoading: false,
          error: null,
          pagination: {
            page: 1,
            limit: 100
          },
          filter: {
            possibleCourse: 'ALL'
          }
        })
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_LIST_UPDATE_ISSUE_PERMISSION)]: loadListUpdateIssuePermission,
  [SUCCESS(LOAD_LIST_UPDATE_ISSUE_PERMISSION)]: loadListUpdateIssuePermissionSuccess,
  [FAILURE(LOAD_LIST_UPDATE_ISSUE_PERMISSION)]: loadListUpdateIssuePermissionError,

  [REQUEST(LOAD_LIST_ISSUE_PERMISSION)]: loadListIssuePermission,
  [SUCCESS(LOAD_LIST_ISSUE_PERMISSION)]: loadListIssuePermissionSuccess,
  [FAILURE(LOAD_LIST_ISSUE_PERMISSION)]: loadListIssuePermissionError,

  [REQUEST(CLEAR_LIST_ISSUE_PERMISSION)]: clearListIssuePermission,
  [REQUEST(CLEAR_LIST_USER_SELECTED)]: clearListUserSelectedPermission,

  [REQUEST(LOAD_ISSUE_PERMISSION)]: loadIssuePermission,
  [SUCCESS(LOAD_ISSUE_PERMISSION)]: loadIssuePermissionSuccess,
  [FAILURE(LOAD_ISSUE_PERMISSION)]: loadIssuePermissionError,

  [REQUEST(EDIT_ISSUE_PERMISSION)]: editIssuePermission,
  [SUCCESS(EDIT_ISSUE_PERMISSION)]: editIssuePermissionSuccess,
  [FAILURE(EDIT_ISSUE_PERMISSION)]: editIssuePermissionError,

  [REQUEST(CREATE_ISSUE_PERMISSION)]: createIssuePermission,
  [SUCCESS(CREATE_ISSUE_PERMISSION)]: createIssuePermissionSuccess,
  [FAILURE(CREATE_ISSUE_PERMISSION)]: createIssuePermissionError,

  [REQUEST(DELETE_ISSUE_PERMISSION)]: deleteIssuePermission,
  [SUCCESS(DELETE_ISSUE_PERMISSION)]: deleteIssuePermissionSuccess,
  [FAILURE(DELETE_ISSUE_PERMISSION)]: deleteIssuePermissionError,

  [REQUEST(LOAD_LIST_ATTRIBUTE)]: loadListAttribute,
  [SUCCESS(LOAD_LIST_ATTRIBUTE)]: loadListAttributeSuccess,

  [REQUEST(LOAD_LIST_GROUP)]: loadListGroup,
  [SUCCESS(LOAD_LIST_GROUP)]: loadListGroupSuccess,

  [REQUEST(LOAD_LIST_CATEGORY)]: loadListCategory,
  [SUCCESS(LOAD_LIST_CATEGORY)]: loadListCategorySuccess,

  [REQUEST(LOAD_LIST_USER)]: loadListUser,
  [SUCCESS(LOAD_LIST_USER)]: loadListUserSuccess,

  [REQUEST(LOAD_LIST_USER_SELECTED)]: loadListUserSelected,
  [SUCCESS(LOAD_LIST_USER_SELECTED)]: loadListUserSelectedSuccess,

  [REQUEST(LOAD_LIST_COURSE)]: loadListCourse,
  [SUCCESS(LOAD_LIST_COURSE)]: loadListCourseSuccess,

  [REQUEST(RESET_ISSUES_PERMISSION)]: resetIssuesPermission,

  [LOCATION_CHANGE]: resetState
})
