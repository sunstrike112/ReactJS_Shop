import { REQUEST } from 'Stores'
import {
  ADD_DOMAIN,
  DELETE_DOMAIN,
  LOAD_DOMAINS
} from './constants'

export function loadDomains(payload) {
  return {
    type: REQUEST(LOAD_DOMAINS),
    payload
  }
}

export function addDomain(payload) {
  return {
    type: REQUEST(ADD_DOMAIN),
    payload
  }
}

export function deleteDomain(payload) {
  return {
    type: REQUEST(DELETE_DOMAIN),
    payload
  }
}
