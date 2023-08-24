import { REQUEST } from 'Stores'
import {
  CREATE_SEMINAR,
  DELETE_SEMINAR,
  LOAD_LIST_SEMINAR,
  LOAD_DETAIL_SEMINAR,
  EDIT_SEMINAR,
  LOAD_ALL_COMPANY
} from './constants'

export function loadListSeminar(payload) {
  return {
    type: REQUEST(LOAD_LIST_SEMINAR),
    payload
  }
}

export function createSeminar(payload) {
  return {
    type: REQUEST(CREATE_SEMINAR),
    payload
  }
}

export function deleteSeminar(payload) {
  return {
    type: REQUEST(DELETE_SEMINAR),
    payload
  }
}

export function editSeminar(payload) {
  return {
    type: REQUEST(EDIT_SEMINAR),
    payload
  }
}

export function loadDetailSeminar(payload) {
  return {
    type: REQUEST(LOAD_DETAIL_SEMINAR),
    payload
  }
}

export function loadCompanies(payload) {
  return {
    type: REQUEST(LOAD_ALL_COMPANY),
    payload
  }
}
