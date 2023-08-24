import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'

import { LOAD_ATTRIBUTES, LOAD_GROUPS, LOAD_RECEIVER_EMAIL, LOAD_RECEIVER_EMAIL_SELECTED, SEND_EMAIL } from './constants'

const groups = {
  isLoading: false,
  data: [],
  error: null
}

const attributes = {
  isLoading: false,
  data: [],
  error: null
}

const receiverEmail = {
  isLoading: false,
  data: [],
  pagination: {},
  filter: {},
  sort: {},
  error: null
}

const receiverEmailSelected = {
  isLoading: false,
  data: [],
  pagination: {},
  error: null
}

export const initialState = {
  isLoading: false,
  isSubmitting: false,
  error: null,
  groups: { ...groups },
  attributes: { ...attributes },
  receiverEmail: { ...receiverEmail },
  receiverEmailSelected: { ...receiverEmailSelected }
}

function loadGroups(state) {
  return updateObject(state, {
    groups: {
      ...state.groups,
      isLoading: true
    }
  })
}

function loadGroupsSuccess(state, { data }) {
  return updateObject(state, {
    groups: {
      ...state.groups,
      isLoading: false,
      data
    }
  })
}

function loadGroupsError(state, { error }) {
  return updateObject(state, {
    groups: {
      ...state.groups,
      isLoading: false,
      error
    }
  })
}

function loadAttributes(state) {
  return updateObject(state, {
    attributes: {
      ...state.attributes,
      isLoading: true
    }
  })
}

function loadAttributesSuccess(state, { data }) {
  return updateObject(state, {
    attributes: {
      ...state.attributes,
      isLoading: false,
      data
    }
  })
}

function loadAttributesError(state, { error }) {
  return updateObject(state, {
    attributes: {
      ...state.attributes,
      isLoading: false,
      error
    }
  })
}

function loadReceiverEmail(state) {
  return updateObject(state, {
    receiverEmail: {
      ...state.receiverEmail,
      isLoading: true
    }
  })
}

function loadReceiverEmailSuccess(state, { payload }) {
  const { data, pagination, filter, sort } = payload
  return updateObject(state, {
    receiverEmail: {
      ...state.receiverEmail,
      isLoading: false,
      data,
      pagination,
      filter,
      sort
    }
  })
}

function loadReceiverEmailError(state, { error }) {
  return updateObject(state, {
    receiverEmail: {
      ...state.receiverEmail,
      isLoading: false,
      error
    }
  })
}

function loadReceiverEmailSelected(state) {
  return updateObject(state, {
    receiverEmailSelected: {
      ...state.receiverEmailSelected,
      isLoading: true
    }
  })
}

function loadReceiverEmailSelectedSuccess(state, { payload }) {
  const { data, pagination } = payload
  return updateObject(state, {
    receiverEmailSelected: {
      ...state.receiverEmailSelected,
      isLoading: false,
      data,
      pagination
    }
  })
}

function loadReceiverEmailSelectedError(state, { error }) {
  return updateObject(state, {
    receiverEmailSelected: {
      ...state.receiverEmailSelected,
      isLoading: false,
      error
    }
  })
}

function sendEmail(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function sendEmailSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isSubmitting: true
  })
}

function sendEmailError(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState,
    isSubmitting: false
  })
}

export default createReducer(initialState, {
  [REQUEST(LOAD_GROUPS)]: loadGroups,
  [SUCCESS(LOAD_GROUPS)]: loadGroupsSuccess,
  [FAILURE(LOAD_GROUPS)]: loadGroupsError,

  [REQUEST(LOAD_ATTRIBUTES)]: loadAttributes,
  [SUCCESS(LOAD_ATTRIBUTES)]: loadAttributesSuccess,
  [FAILURE(LOAD_ATTRIBUTES)]: loadAttributesError,

  [REQUEST(LOAD_RECEIVER_EMAIL)]: loadReceiverEmail,
  [SUCCESS(LOAD_RECEIVER_EMAIL)]: loadReceiverEmailSuccess,
  [FAILURE(LOAD_RECEIVER_EMAIL)]: loadReceiverEmailError,

  [REQUEST(LOAD_RECEIVER_EMAIL_SELECTED)]: loadReceiverEmailSelected,
  [SUCCESS(LOAD_RECEIVER_EMAIL_SELECTED)]: loadReceiverEmailSelectedSuccess,
  [FAILURE(LOAD_RECEIVER_EMAIL_SELECTED)]: loadReceiverEmailSelectedError,

  [REQUEST(SEND_EMAIL)]: sendEmail,
  [SUCCESS(SEND_EMAIL)]: sendEmailSuccess,
  [FAILURE(SEND_EMAIL)]: sendEmailError,

  [LOCATION_CHANGE]: resetState
})
