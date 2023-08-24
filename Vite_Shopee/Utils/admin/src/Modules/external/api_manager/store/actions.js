import { REQUEST } from 'Stores'
import {
  ADD_API_MANAGER,
  DELETE_API_MANAGER,
  GET_APIS,
  GET_APIS_MANAGER
} from './constants'

export function getExternalApisManager(payload) {
  return {
    type: REQUEST(GET_APIS_MANAGER),
    payload
  }
}

export function getExternalApis(payload) {
  return {
    type: REQUEST(GET_APIS),
    payload
  }
}

export function addExternalApiManager(payload) {
  return {
    type: REQUEST(ADD_API_MANAGER),
    payload
  }
}

export function deleteExternalApiManager(payload) {
  return {
    type: REQUEST(DELETE_API_MANAGER),
    payload
  }
}
