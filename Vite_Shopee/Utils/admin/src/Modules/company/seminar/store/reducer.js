import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, FAILURE, REQUEST, SUCCESS, updateObject } from 'Stores'
import {
  CREATE_SEMINAR,
  DELETE_SEMINAR,
  EDIT_SEMINAR,
  LOAD_DETAIL_SEMINAR,
  LOAD_LIST_SEMINAR,
  LOAD_ALL_COMPANY
} from './constants'

export const initialState = {
  companies: [],
  list: {
    data: [],
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 100
    },
    filter: {
      affiliation: 'ALL',
      companyId: ''
    }
  },
  create: {
    isLoading: false,
    isSuccess: false,
    error: null
  },
  delete: {
    isLoading: false,
    isSuccess: false,
    error: null
  },
  detail: {
    data: null,
    isLoading: false,
    isSuccess: false,
    error: null
  },
  edit: {
    isLoading: false,
    isSuccess: false,
    error: null
  }
}

/**
 * DETAIl
 */

function loadDetailSeminar(state) {
  return updateObject(state, {
    detail: updateObject(state.detail, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function loadDetailSeminarSuccess(state, { payload }) {
  const { data } = payload
  return updateObject(state, {
    detail: updateObject(state.detail, {
      data,
      isLoading: false,
      isSuccess: true
    })
  })
}

function loadDetailSeminarError(state, { error }) {
  return updateObject(state, {
    detail: updateObject(state.detail, {
      isLoading: false,
      error
    })
  })
}

/**
 * LIST SEMINAR
 */

function loadListSeminar(state) {
  return updateObject(state, {
    list: updateObject(state.list, {
      error: null,
      isLoading: true
    })
  })
}

function loadListSeminarSuccess(state, { payload }) {
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

function loadListSeminarError(state, { error }) {
  return updateObject(state, {
    list: updateObject(state.list, {
      isLoading: false,
      error
    })
  })
}

/**
 * CREATE
 */

function createSeminar(state) {
  return updateObject(state, {
    create: updateObject(state.create, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function createSeminarSuccess(state) {
  return updateObject(state, {
    create: updateObject(state.create, {
      isLoading: false,
      isSuccess: true
    })
  })
}

function createSeminarError(state, { error }) {
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

function deleteSeminar(state) {
  return updateObject(state, {
    delete: updateObject(state.delete, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function deleteSeminarSuccess(state) {
  return updateObject(state, {
    delete: updateObject(state.delete, {
      isLoading: false,
      isSuccess: true
    })
  })
}

function deleteSeminarError(state, { error }) {
  return updateObject(state, {
    delete: updateObject(state.delete, {
      isLoading: false,
      error
    })
  })
}

/**
 * EDIT
 */

function editSeminar(state) {
  return updateObject(state, {
    edit: updateObject(state.edit, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function editSeminarSuccess(state) {
  return updateObject(state, {
    edit: updateObject(state.edit, {
      isLoading: false,
      isSuccess: true
    })
  })
}

function editSeminarError(state, { error }) {
  return updateObject(state, {
    edit: updateObject(state.edit, {
      isLoading: false,
      error
    })
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState,
    list: {
      ...initialState.list,
      pagination: state.list.pagination
    }
  })
}

function loadCompanies(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function companiesLoaded(state, { companies }) {
  return updateObject(state, {
    isLoading: false,
    companies
  })
}

function companiesLoadingError(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_DETAIL_SEMINAR)]: loadDetailSeminar,
  [SUCCESS(LOAD_DETAIL_SEMINAR)]: loadDetailSeminarSuccess,
  [FAILURE(LOAD_DETAIL_SEMINAR)]: loadDetailSeminarError,

  [REQUEST(LOAD_LIST_SEMINAR)]: loadListSeminar,
  [SUCCESS(LOAD_LIST_SEMINAR)]: loadListSeminarSuccess,
  [FAILURE(LOAD_LIST_SEMINAR)]: loadListSeminarError,

  [REQUEST(CREATE_SEMINAR)]: createSeminar,
  [SUCCESS(CREATE_SEMINAR)]: createSeminarSuccess,
  [FAILURE(CREATE_SEMINAR)]: createSeminarError,

  [REQUEST(DELETE_SEMINAR)]: deleteSeminar,
  [SUCCESS(DELETE_SEMINAR)]: deleteSeminarSuccess,
  [FAILURE(DELETE_SEMINAR)]: deleteSeminarError,

  [REQUEST(EDIT_SEMINAR)]: editSeminar,
  [SUCCESS(EDIT_SEMINAR)]: editSeminarSuccess,
  [FAILURE(EDIT_SEMINAR)]: editSeminarError,

  [REQUEST(LOAD_ALL_COMPANY)]: loadCompanies,
  [SUCCESS(LOAD_ALL_COMPANY)]: companiesLoaded,
  [FAILURE(LOAD_ALL_COMPANY)]: companiesLoadingError,

  [LOCATION_CHANGE]: resetState
})
