import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'

import { DEFAULT_PAG } from 'Utils'
import { LOAD_LIST_PAYMENT, RESET_LIST_PAYMENT } from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  listPaymentHistory: [],
  pagination: {
    ...DEFAULT_PAG,
    total: 0
  },
  filter: {},
  isSubmitting: false
}

function loadPaymentHistoryList(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function paymentHistoryListLoaded(state, { payload }) {
  const { listPaymentHistory, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    listPaymentHistory,
    pagination,
    filter
  })
}

function paymentHistoryListLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

function resetListPayment() {
  return updateObject({
    listPaymentHistory: [...initialState.listPaymentHistory],
    pagination: { ...initialState.pagination }
  })
}

export default createReducer(initialState, {
  [REQUEST(LOAD_LIST_PAYMENT)]: loadPaymentHistoryList,
  [SUCCESS(LOAD_LIST_PAYMENT)]: paymentHistoryListLoaded,
  [FAILURE(LOAD_LIST_PAYMENT)]: paymentHistoryListLoadingError,

  [REQUEST(RESET_LIST_PAYMENT)]: resetListPayment,
  [LOCATION_CHANGE]: resetState
})
