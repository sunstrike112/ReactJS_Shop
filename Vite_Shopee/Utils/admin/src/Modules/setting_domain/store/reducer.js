/* eslint-disable no-unused-vars */
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  DELETE_DOMAIN,
  LOAD_DOMAINS,
  ADD_DOMAIN
} from './constants'

export const initialState = {
  isLoading: false,
  isAdding: false,
  isDeleting: false,
  domains: [],
  pagination: {},
  error: null
}

function loadDomains(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadDomainsSuccess(state, { payload }) {
  const { domains, pagination } = payload
  return updateObject(state, {
    isLoading: false,
    domains,
    pagination
  })
}

function loadDomainsFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function addDomain(state) {
  return updateObject(state, {
    isAdding: true
  })
}

function addDomainSuccess(state) {
  return updateObject(state, {
    isAdding: false
  })
}

function addDomainFailure(state, { error }) {
  return updateObject(state, {
    isAdding: false,
    error
  })
}

function deleteDomain(state) {
  return updateObject(state, {
    isDeleting: true
  })
}

function deleteDomainSuccess(state) {
  return updateObject(state, {
    isDeleting: false
  })
}

function deleteDomainFailure(state, { error }) {
  return updateObject(state, {
    isDeleting: false,
    error
  })
}

// Slice reducer
export default createReducer(initialState, {

  [REQUEST(LOAD_DOMAINS)]: loadDomains,
  [SUCCESS(LOAD_DOMAINS)]: loadDomainsSuccess,
  [FAILURE(LOAD_DOMAINS)]: loadDomainsFailure,

  [REQUEST(ADD_DOMAIN)]: addDomain,
  [SUCCESS(ADD_DOMAIN)]: addDomainSuccess,
  [FAILURE(ADD_DOMAIN)]: addDomainFailure,

  [REQUEST(DELETE_DOMAIN)]: deleteDomain,
  [SUCCESS(DELETE_DOMAIN)]: deleteDomainSuccess,
  [FAILURE(DELETE_DOMAIN)]: deleteDomainFailure

})
