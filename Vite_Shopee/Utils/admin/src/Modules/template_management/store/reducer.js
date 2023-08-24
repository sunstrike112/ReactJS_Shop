/* eslint-disable no-unused-vars */
import { createReducer, FAILURE, REQUEST, SUCCESS, updateObject } from 'Stores'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  GET_LIST_TEMPLATE,
  GET_TEMPLATE_DETAIL,
  RESET_LIST_TEMPLATE
} from './constants'

const listTemplate = {
  isLoading: false,
  result: [],
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 100
  },
  filter: {},
  error: null
}

const templateDetail = {
  dataTemplate: {
    title: '',
    email: '',
    departmentIdList: [],
    attributeIdList: []
  }
}

export const initialState = {
  isLoading: false,
  isSubmitting: false,
  listTemplate: { ...listTemplate },
  templateDetail: { ...templateDetail },
  filter: {
    name: '',
    comnpanyId: ''
  },
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 100
  },
  error: null
}

function getTemplateRequest(state) {
  return updateObject(state, {
    listTemplate: {
      ...state.listTemplate,
      isLoading: true
    }
  })
}

function getTemplateSuccess(state, { payload }) {
  const { result, pagination, filter } = payload
  return updateObject(state, {
    listTemplate: {
      ...state.result,
      isLoading: false,
      result,
      pagination
    },
    filter
  })
}

function getTemplateFailure(state, { error }) {
  return updateObject(state, {
    listTemplate: {
      ...state.listTemplate,
      isLoading: false,
      error
    }
  })
}

function getTemplateDetailRequest(state) {
  return updateObject(state, {
    templateDetail: {
      ...state.templateDetail,
      isLoading: true
    }
  })
}

function getTemplateDetailSuccess(state, { payload }) {
  return updateObject(state, {
    templateDetail: {
      ...state.templateDetail,
      isLoading: false,
      dataTemplate: payload
    }
  })
}

function getTemplateDetailFailure(state, { error }) {
  return updateObject(state, {
    templateDetail: {
      ...state.templateDetail,
      isLoading: false,
      error
    }
  })
}

function resetState(state) {
  return updateObject(state, {
    listTemplate: { ...initialState.listTemplate },
    pagination: { ...initialState.pagination }
  })
}

export default createReducer(initialState, {
  [REQUEST(GET_LIST_TEMPLATE)]: getTemplateRequest,
  [SUCCESS(GET_LIST_TEMPLATE)]: getTemplateSuccess,
  [FAILURE(GET_LIST_TEMPLATE)]: getTemplateFailure,

  [REQUEST(GET_TEMPLATE_DETAIL)]: getTemplateDetailRequest,
  [SUCCESS(GET_TEMPLATE_DETAIL)]: getTemplateDetailSuccess,
  [FAILURE(GET_TEMPLATE_DETAIL)]: getTemplateDetailFailure,

  [REQUEST(RESET_LIST_TEMPLATE)]: resetState,

  [LOCATION_CHANGE]: resetState
})
